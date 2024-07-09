import cn from 'clsx'

import styles from './Badge.module.scss'

interface Props {
	value: number
	maxValue: number
	color: 'blue' | 'red'
}

export function Badge({ value, maxValue, color }: Props) {
	return (
		<div
			className={cn(styles.badge, {
				[styles.blue]: color === 'blue',
				[styles.red]: color === 'red'
			})}
		>
			{value}/{maxValue}
		</div>
	)
}
