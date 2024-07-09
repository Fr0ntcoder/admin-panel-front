import { instance } from '@/api/axios'

interface IFileResponse {
	url: string
	name: string
}

class FileService {
	async upload(file: FormData, folder?: string) {
		return instance.post<IFileResponse[]>(`/media`, file, {
			params: { folder },
			headers: { 'Content-Type': 'mulipart/form-data' }
		})
	}
}

export default new FileService()
