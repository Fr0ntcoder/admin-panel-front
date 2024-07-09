import { PropsWithChildren } from 'react'

import styles from './Heading.module.scss'

export function Heading({ children }: PropsWithChildren) {
	return <h1 className={styles.heading}>{children}</h1>
}
