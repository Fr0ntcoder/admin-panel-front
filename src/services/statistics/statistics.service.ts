import { instance } from '@/api/axios'

export interface IUserRegistrationByMonth {
	month: string
	year: string
	count: number
}

export interface ICountryCount {
	country: string
	count: number
}

class StatisticsService {
	private base = '/statistics'

	async getRegistrationByMonth() {
		return instance.get<IUserRegistrationByMonth[]>(
			`${this.base}/registrations-by-month`
		)
	}

	async getNumbers() {
		return instance.get<{ name: string; value: string }[]>(
			`${this.base}/numbers`
		)
	}

	async getCountByCountry() {
		return instance.get<ICountryCount[]>(`${this.base}/count-by-country`)
	}
}

export default new StatisticsService()
