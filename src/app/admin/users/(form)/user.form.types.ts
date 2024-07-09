import type { SubmitHandler } from 'react-hook-form'

import { IUser } from '@/types/types'

export interface IUserFormState extends Omit<IUser, 'id'> {
	password?: string
}

export type TypeUserForm = 'create' | 'edit' | 'update-profile'

export interface IQueriesResult {
	data?: Omit<IUser, 'password'>
	isLoading?: boolean
	initialUserLoading?: boolean
	isNeedResetForm?: boolean
	onSubmit: SubmitHandler<IUserFormState>
}

export interface IUserForm {
	type: TypeUserForm
	id?: string
	queriesResult: IQueriesResult
}
