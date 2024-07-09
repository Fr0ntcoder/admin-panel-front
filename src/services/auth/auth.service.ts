import { IAuthFormData, IUser } from '@/types/types'

import { axiosDefault, instance } from '@/api/axios'

import {
	removeFromStorage,
	saveTokenStorage
} from '@/services/auth/auth.helper'

interface IAuthResponse {
	accessToken: string
	user: IUser
}

class AuthService {
	private base = '/auth'

	async main(type: 'login' | 'register', data: IAuthFormData) {
		const response = await axiosDefault.post<IAuthResponse>(
			`${this.base}/${type}`
		)

		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken)
		}

		return response
	}

	async getNewToken() {
		const response = await axiosDefault.post<IAuthResponse>(
			`${this.base}/login/access-token`
		)

		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken)
		}

		return response
	}

	async getNewTokensByRefresh(refreshToken: string) {
		const response = await axiosDefault.post<IAuthResponse>(
			`${this.base}/login/access-token`,
			{},
			{
				headers: {
					Cookie: `refreshToken=${refreshToken}`
				}
			}
		)

		return response.data
	}

	async logout() {
		const response = await axiosDefault.post<boolean>(`${this.base}/logout`)

		if (response.data) {
			removeFromStorage()
		}

		return response
	}

	async profile() {
		return instance.get<IUser>(`${this.base}/profile`)
	}
}

export default new AuthService()
