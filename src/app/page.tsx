'use client'

import { ProfileInfo } from '@/app/admin/profile-info'

import { Loader } from '@/components/ui/loader'

import { useProfile } from '@/hooks/useProfile'

export default function Home() {
	const { user, isLoading } = useProfile()
	return isLoading ? (
		<div className='w-screen h-screen flex items-center justify-center'>
			<Loader />
		</div>
	) : (
		<main className='min-h-screen p-6'>
			<ProfileInfo />
			{!user.isAdmin ? 'Вы не являетесь администратором' : <></>}
		</main>
	)
}
