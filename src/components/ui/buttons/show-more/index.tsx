import { Button } from '@/components/ui/buttons/button'
import { Loader } from '@/components/ui/loader'

import styles from './ShowMore.module.scss'

interface Props {
	onLoadMore: () => void
	isLoading: boolean
}

export function ShowMore({ isLoading, onLoadMore }: Props) {
	return (
		<div className={styles.show_more}>
			<Button variant='secondary' onClick={onLoadMore} disabled={isLoading}>
				{isLoading ? <Loader /> : 'Показать ещё'}
			</Button>
		</div>
	)
}
