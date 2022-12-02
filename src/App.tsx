import { FC } from 'react'

import LuckyWheel from 'Components/LuckyWheel/LuckyWheel'

import { Container } from './AppStyles'

const App: FC = () => {
	return (
		<Container>
			<LuckyWheel rotateDuration={1} />
		</Container>
	)
}

export default App
