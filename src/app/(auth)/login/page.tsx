import { Metadata } from 'next'

import { AuthForm } from '@/app/(auth)/auth-form'

import styles from './LoginPage.module.scss'

export const metadata: Metadata = {
	title: 'Войти'
}

export default function LoginPage() {
	return (
		<div className={styles.page}>
			<div className={styles.wrap}>
				<h2 className={styles.title}>Вход</h2>
				<AuthForm isLogin />
			</div>
		</div>
	)
}
