import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { IYoutubeResponse } from '@/services/yotube/youtube.service'

import styles from './RecentVideo.module.scss'

export function RecentVideo() {
	const { data } = useQuery({
		queryKey: ['recent-video'],
		queryFn: () => axios.get<IYoutubeResponse>('/api/youtube'),
		select: ({ data }) => data
	})

	return data ? (
		<div className={styles.wrap}>
			<h3 className={styles.title}>Последнее видео</h3>
			<a
				href={`https://youtu.be/${data.videoId}`}
				target='_blank'
				rel='noreferrer'
				className={styles.link}
			>
				<img src={data.thumbnail} alt={data.title} width={70} />
				<span>{data.title}</span>
			</a>
		</div>
	) : null
}
