import { useQuery } from '@tanstack/react-query'
import {
	CategoryScale,
	ChartData,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip
} from 'chart.js'
import { Loader } from 'lucide-react'
import 'react-chartjs-2'
import { Line } from 'react-chartjs-2'

import statisticsService from '@/services/statistics/statistics.service'

import { COLORS } from '@/constants/color.constants'

import styles from './MainChart.module.scss'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

export function MainChart() {
	const { data, isPending } = useQuery({
		queryKey: ['main-chart'],
		queryFn: () => statisticsService.getRegistrationByMonth(),
		select({ data }): ChartData<'line', number[], string> {
			return {
				labels: data.map(item => item.month),
				datasets: [
					{
						label: 'Количество регистраций',
						data: data.map(item => item.count),
						borderColor: COLORS.primary,
						tension: 0.1
					}
				]
			}
		}
	})
	return isPending ? (
		<Loader />
	) : data ? (
		<Line data={data} className={styles.chart} />
	) : null
}
