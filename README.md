# Spinning Prize Wheel

[Demo](https://kennarddh.github.io/spinning-prize-wheel/)

## Install

```bash
npm i @kennarddh/spinning-prize-wheel
```

## Guide

### Ref Handle

-   Reset {function} = Reset to 0 position
-   Rotate {function} = Rotate the wheel

### Props

-   rotateDuration {number} = Rotate duration in second
-   rarityGroups {array} = Rarity groups
-   choices {array} = Choices
-   onEndRotate {function} = On end rotate callback
-   onStartRotate {function} = On start rotate callback
-   onReset {function} = On reset callback
-   withoutArrow {boolean} = Remove default arrow
-   fullRotationAddBeforeDestination {number|numberFactory} = How many times should wheel full spin before stop
-   counterClockwise {boolean} = Rotate wheel counter clockwise
-   groupColorByRarity {boolean} = Should group color by rarity
-   resetRotateDuration {number} = Reset rotate duration in second
-   shuffleChoices {boolean} = Shuffle choices
-   size {number} = Wheel size
-   fontSize {number} = Content font size,
-   needReset {boolean} = Need reset before another spin

### Example

```typescriptreact
import { FC, useRef, useState } from 'react'

import LuckyWheel, {
	IRarityGroups,
	IChoices,
	ILuckyWheel,
} from 'spinning-prize-wheel'

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
```
