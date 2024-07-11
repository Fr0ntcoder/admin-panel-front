import youtubeService from '@/services/yotube/youtube.service'

export async function GET() {
	const result = await youtubeService.parseFirstVideo('leagueoflegends')

	return Response.json(result)
}
