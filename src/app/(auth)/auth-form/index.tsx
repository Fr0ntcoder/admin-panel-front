'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/buttons/button'
import { Field } from '@/components/ui/field'
import { Loader } from '@/components/ui/loader'

import authService from '@/services/auth/auth.service'

import { ROUTE } from '@/constants/route.constants'

import { IAuthFormData } from '@/types/types'

import styles from './AuthForm.module.scss'

interface Props {
	isLogin: boolean
}

export function AuthForm({ isLogin }: Props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IAuthFormData>()

	const router = useRouter()

	const { mutate: mutateLogin, isPending: isLoginPernding } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IAuthFormData) => authService.main('login', data),
		onSuccess() {
			reset()
			router.push(ROUTE.DEFAULT)
			toast.success('Вы успешно вошли!')
		}
	})

	const { mutate: mutateRegister, isPending: isRegisterPernding } = useMutation(
		{
			mutationKey: ['register'],
			mutationFn: (data: IAuthFormData) => authService.main('register', data),
			onSuccess() {
				reset()
				router.push(ROUTE.DEFAULT)
				toast.success('Вы успешно зарегистрировались]!')
			}
		}
	)

	const isPending = isLoginPernding || isRegisterPernding

	const onSumbit: SubmitHandler<IAuthFormData> = data => {
		isLogin ? mutateLogin(data) : mutateRegister(data)
	}

	return (
		<form onSubmit={handleSubmit(onSumbit)} className={styles.form}>
			<Field
				extra={styles.field}
				label='Email'
				type='email'
				placeholder='Введите email'
				{...register('email', { required: true })}
			/>
			{errors.email && (
				<span className={styles.error}>{errors.email?.message}</span>
			)}
			<Field
				extra={styles.field}
				label='Пароль'
				type='password'
				placeholder='Введите пароль'
				{...register('password', { required: true })}
			/>
			{errors.password && (
				<span className={styles.error}>{errors.password?.message}</span>
			)}

			<div className={styles.btn}>
				<Button
					variant={isLogin ? 'primary' : 'secondary'}
					disabled={isPending}
				>
					{isPending ? <Loader /> : isLogin ? 'Войти' : 'Зарегистрироваться'}
				</Button>
			</div>
		</form>
	)
}
