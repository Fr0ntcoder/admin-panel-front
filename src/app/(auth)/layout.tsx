import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

import { ROUTE } from '@/constants/route.constants'

import { getServerAuth } from '@/utils/get-server-auth'

export default async function Layout({ children }: PropsWithChildren<unknown>) {
	const user = await getServerAuth()

	if (user?.isLoggedIn) {
		return redirect(user.isAdmin ? ROUTE.DEFAULT : ROUTE.DEFAULT)
	}

	return children
}
