import { useQuery } from '@tanstack/react-query'
import {
	ChartData,
	Chart as ChartJS,
	ChartOptions,
	Filler,
	Legend,
	LineElement,
	PointElement,
	RadialLinearScale,
	Tooltip
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

import { Loader } from '@/components/ui/loader'

import statisticsService from '@/services/statistics/statistics.service'

import { COLORS } from '@/constants/color.constants'

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
)

const options: ChartOptions<'radar'> = {
	scales: {
		r: {
			ticks: {
				stepSize: 13,
				display: false
			},
			pointLabels: {
				font: {
					size: 14
				}
			}
		}
	},
	elements: {
		line: {
			borderWidth: 3
		}
	}
}
export function RadarChart() {
	const { data, isPending } = useQuery({
		queryKey: ['radar-chart'],
		queryFn: () => statisticsService.getCountByCountry(),
		select({ data }): ChartData<'radar', number[], string> {
			return {
				labels: data.map(item => item.country),
				datasets: [
					{
						label: 'Количество пользователей',
						data: data.map(item => item.count),
						fill: true,
						backgroundColor: 'rgba(255,99,132,0.2)',
						borderColor: COLORS.secondary,
						pointBackgroundColor: 'rgb(255,99,132)',
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: 'rgb(255,99,132)'
					}
				]
			}
		}
	})
	return isPending ? (
		<Loader />
	) : data ? (
		<Radar data={data} options={options} />
	) : null
}
