import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

import { EnumTokens } from '@/services/auth/auth.helper'
import authService from '@/services/auth/auth.service'
import { ITokenInside } from '@/services/auth/auth.types'

import { ROUTE } from '@/constants/route.constants'

import { UserRole } from '@/types/types'

export async function middleware(request: NextRequest, response: NextResponse) {
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	let accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value
	const isAdminPage = request.url.includes(ROUTE.DEFAULT)

	if (!refreshToken) {
		request.cookies.delete(EnumTokens.ACCESS_TOKEN)
		return redirectToLogin(isAdminPage, request)
	}

	if (!accessToken) {
		try {
			const data = await authService.getNewTokensByRefresh(refreshToken)
			accessToken = data.accessToken
		} catch (error) {
			request.cookies.delete(EnumTokens.ACCESS_TOKEN)
			return redirectToLogin(isAdminPage, request)
		}
	}

	try {
		const { payload }: { payload: ITokenInside } = await jwtVerify(
			accessToken,
			new TextEncoder().encode(`${process.env.JWT_SECRET}`)
		)

		if (payload?.role === UserRole.Admin) return NextResponse.next()

		if (isAdminPage) {
			return NextResponse.redirect(new URL(ROUTE.NOT_FOUND, request.url))
		}

		return NextResponse.next()
	} catch (error) {
		if (
			error instanceof Error &&
			error.message.includes('exp claim timestamp check failed')
		) {
			console.log('Ваш токен истек')
			return redirectToLogin(isAdminPage, request)
		}

		console.log('Ошибка при верификации токена', error)
		return redirectToLogin(isAdminPage, request)
	}
}

export const config = {
	matcher: [`${ROUTE.ADMIN}/:path*`, `${ROUTE.PROFILE}/:path*`]
}
const redirectToLogin = (isAdminPage: boolean, request: NextRequest) => {
	return NextResponse.redirect(
		new URL(isAdminPage ? ROUTE.NOT_FOUND : ROUTE.LOGIN, request.url)
	)
}
