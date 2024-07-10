import { Metadata } from 'next'

import { AuthForm } from '../auth-form'

import styles from './RegisterPage.module.scss'

export const metadata: Metadata = {
	title: 'Регистрация'
}

export default function RegisterPage() {
	return (
		<div className={styles.page}>
			<div className={styles.wrap}>
				<h2 className={styles.title}>Регистрация</h2>
				<AuthForm isLogin={false} />
			</div>
		</div>
	)
}
