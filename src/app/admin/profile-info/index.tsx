import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import authService from '@/services/auth/auth.service'

import { ROUTE } from '@/constants/route.constants'

import { useProfile } from '@/hooks/useProfile'

import styles from './ProfileInfo.module.scss'

export function ProfileInfo() {
	const { push } = useRouter()
	const { user } = useProfile()

	const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			push(ROUTE.LOGIN)
		}
	})
	return (
		user && (
			<div className={styles.root}>
				{user.avatarUrl && (
					<Image src={user.avatarUrl} alt='Аватарка' width={100} height={100} />
				)}
				<div className={styles.content}>
					<h2 className={styles.title}>Добрый день!</h2>
					<p className={styles.text}>{user.email}</p>
					<p className={styles.text}>{user.role}</p>
					<button onClick={() => mutateLogout()} disabled={isLogoutPending}>
						<LogOut />
					</button>
				</div>
			</div>
		)
	)
}
