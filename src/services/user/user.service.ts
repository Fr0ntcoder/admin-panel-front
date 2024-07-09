export interface IPaginattionResponse<T> {
	items: T[]
	isHasMore: boolean
}

export interface IPaginationParams {
	skip?: number
	take?: number
	searchTerm?: string
}

class UserService {
	private base = '/users'
}

export default new UserService()
