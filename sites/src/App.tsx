import { FC, useRef, useState } from 'react'

import LuckyWheel, {
	IRarityGroups,
	IChoices,
	ILuckyWheel,
} from '../../dist/spinning-prize-wheel.es.js'

import { Container } from './AppStyles'

const App: FC = () => {
	const [RarityGroups] = useState<IRarityGroups>({
		common: {
			label: 'Common',
			rarity: 89,
			color: '#f00',
		},
		uncommon: {
			label: 'Uncommon',
			rarity: 10,
			color: '#0f0',
		},
		rare: {
			label: 'Rare',
			rarity: 1,
			color: '#00f',
		},
	})

	const [Counter, SetCounter] = useState({ common: 0, uncommon: 0, rare: 0 })

	const [Choices] = useState<IChoices>(
		Array(8)
			.fill(null)
			.map((_, i) => {
				const rand = Math.random()

				let rarity = ''

				if (rand < 0.5) rarity = 'common'
				else if (rand < 0.8) rarity = 'uncommon'
				else rarity = 'rare'

				return {
					id: `${i}`,
					label: `${i}`,
					rarityGroup: rarity,
				}
			})
	)

	const OnEndRotate = (id: string) => {
		const choice = Choices.find(item => item.id === id)

		alert(
			`You get ${choice?.label} ${
				RarityGroups[choice?.rarityGroup ?? ''].label
			}`
		)

		const get = choice?.rarityGroup as 'common' | 'uncommon' | 'rare'

		SetCounter(prev => ({
			...prev,
			// eslint-disable-next-line security/detect-object-injection
			[get]: prev[get] + 1,
		}))
	}

	const LuckyWheelRef = useRef<ILuckyWheel>(null)

	const Rotate = () => {
		LuckyWheelRef.current?.Rotate()
	}

	const Reset = () => {
		LuckyWheelRef.current?.Reset()
	}

	console.log(Counter)

	return (
		<Container>
			<LuckyWheel
				rotateDuration={3}
				rarityGroups={RarityGroups}
				choices={Choices}
				onEndRotate={OnEndRotate}
				ref={LuckyWheelRef}
				groupColorByRarity
				size={400}
				fontSize={25}
				shuffleChoices
			/>
			<div>
				<button onClick={Rotate}>Rotate</button>
				<button onClick={Reset}>Reset</button>
			</div>
		</Container>
	)
}

export default App
