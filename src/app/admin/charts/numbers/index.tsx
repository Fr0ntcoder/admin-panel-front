import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { AreaChart, BarChart3 } from 'lucide-react'

import {
	ROTATE_CARD,
	containerVariants,
	itemVariants
} from '@/app/admin/charts/numbers/numbers-animation'

import { Loader } from '@/components/ui/loader'

import statisticsService from '@/services/statistics/statistics.service'

import { COLORS } from '@/constants/color.constants'

import styles from './Numbers.module.scss'

export function Numbers() {
	const { data, isPending } = useQuery({
		queryKey: ['numbers'],
		queryFn: () => statisticsService.getNumbers()
	})
	const list = data?.data.map((number, index) => (
		<motion.div
			className={styles.item}
			key={number.name}
			variants={itemVariants}
			whileHover={ROTATE_CARD.whileHover}
			transition={ROTATE_CARD.transition}
		>
			<div className={styles.text}>
				<p>{number.name}</p>
				<p className={styles.value}>{number.value}</p>
			</div>
			<div className={styles.chart}>
				{index % 2 === 0 ? (
					<AreaChart color={COLORS.primary} size={45} />
				) : (
					<BarChart3 color={COLORS.secondary} size={45} />
				)}
			</div>
		</motion.div>
	))

	return isPending ? (
		<Loader />
	) : data?.data.length ? (
		<motion.div
			className={styles.list}
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			{list}
		</motion.div>
	) : null
}
