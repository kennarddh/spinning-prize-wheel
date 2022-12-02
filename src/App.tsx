import { FC, useState } from 'react'

import RandomColor from 'Utils/RandomColor'

import LuckyWheel, {
	IRarityGroups,
	IChoice,
} from 'Components/LuckyWheel/LuckyWheel'

import { Container } from './AppStyles'

const App: FC = () => {
	const [RarityGroups] = useState<IRarityGroups>({
		common: {
			label: 'Common',
			rarity: 50,
		},
		uncommon: {
			label: 'Uncommon',
			rarity: 40,
		},
		rare: {
			label: 'Rare',
			rarity: 10,
		},
	})

	const [Choice] = useState<IChoice>([
		{
			id: 'e22d86e0-6d5e-4af0-a5e2-cd70ad9122cf',
			label: '1',
			color: RandomColor(),
			rarityGroup: 'common',
		},
		{
			id: 'fd83eeb0-343a-47c2-94ea-1f1539c69731',
			label: '2',
			color: RandomColor(),
			rarityGroup: 'common',
		},
		{
			id: 'ec11ce67-e628-449a-9812-afe86a1ef302',
			label: '3',
			color: RandomColor(),
			rarityGroup: 'common',
		},
		{
			id: '5f9d35e1-3668-4dd1-8cae-34d35176609e',
			label: '4',
			color: RandomColor(),
			rarityGroup: 'common',
		},
		{
			id: 'cdb9c6c4-c153-4e89-992a-b1daa8365456',
			label: '5',
			color: RandomColor(),
			rarityGroup: 'uncommon',
		},
		{
			id: 'bff94f05-7a34-4e20-b997-7e70475fe2fc',
			label: '6',
			color: RandomColor(),
			rarityGroup: 'uncommon',
		},
		{
			id: 'ef6071e7-f925-480e-8897-0fadffff5549',
			label: '7',
			color: RandomColor(),
			rarityGroup: 'uncommon',
		},
		{
			id: '5630b628-4fda-4264-b593-40b2dc9750e6',
			label: '9',
			color: RandomColor(),
			rarityGroup: 'rare',
		},
		{
			id: '29b1593f-8327-4a0b-9d6f-26dbd4eda4a3',
			label: '10',
			color: RandomColor(),
			rarityGroup: 'rare',
		},
	])
	const OnEndRotate = (id: string) => {
		const choice = Choice.find(item => item.id === id)

		alert(
			`You get ${choice?.label} ${
				RarityGroups[choice?.rarityGroup ?? ''].label
			}`
		)
	}

	return (
		<Container>
			<LuckyWheel
				rotateDuration={1}
				rarityGroups={RarityGroups}
				choice={Choice}
				onEndRotate={OnEndRotate}
			/>
		</Container>
	)
}

export default App
