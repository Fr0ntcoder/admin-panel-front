'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/buttons/button'
import { Field } from '@/components/ui/field'
import { Loader } from '@/components/ui/loader'

export default function Home() {
	return (
		<div>
			<Button variant='secondary'>Click</Button>
			<Field label='Имя' placeholder='Введите ваше имя' />
			<Badge color='blue' value={5} maxValue={10}></Badge>
			<Loader />
		</div>
	)
}
