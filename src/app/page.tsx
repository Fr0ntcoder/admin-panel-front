'use client'

import { MainChart } from '@/app/admin/charts/main-chart'
import { Numbers } from '@/app/admin/charts/numbers'
import { RadarChart } from '@/app/admin/charts/radar-chart'
import { ProfileInfo } from '@/app/admin/profile-info'
import { RecentVideo } from '@/app/admin/recent-video'

import { Loader } from '@/components/ui/loader'

import { useProfile } from '@/hooks/useProfile'

export default function Home() {
	const { user, isLoading } = useProfile()
	return isLoading ? (
		<div className='w-screen h-screen flex items-center justify-center'>
			<Loader />
		</div>
	) : (
		<main className='w-1/2 min-h-screen p-6'>
			<ProfileInfo />
			{!user.isAdmin ? (
				'Вы не являетесь администратором'
			) : (
				<div>
					<MainChart />
					<Numbers />
					<div>
						<RadarChart />
						<RecentVideo />
					</div>
				</div>
			)}
		</main>
	)
}
