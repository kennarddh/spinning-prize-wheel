/* eslint-disable security/detect-object-injection */
import { FC, useState } from 'react'

import { Container, Wheel, TextContainer, Text, Triangle } from './Styles'

import RandomColor from 'Utils/RandomColor'
import RandomBetween from 'Utils/RandomBetween'
import WeightedRandom from 'Utils/WeightedRandom'

import { IRarityGroups, IPartData, IProps } from './Types'

const LuckyWheel: FC<IProps> = ({ rotateDuration }) => {
	const [Rotation, SetRotation] = useState(0)

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

	const [PartData] = useState<IPartData>([
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

	const [IsRotated, SetIsRotated] = useState(false)

	const OnRotate = () => {
		if (IsRotated) return

		const rotationAdd = 360 * RandomBetween(2, 5)

		const selectedRarityGroup = WeightedRandom(
			Object.entries(RarityGroups).reduce<Record<string, number>>(
				(acc, [key, value]) => {
					acc[key] = value.rarity

					return acc
				},
				{}
			)
		)

		const availableChoice = PartData.filter(
			item => item.rarityGroup === selectedRarityGroup
		)

		const selectedAvailableIndex = RandomBetween(
			0,
			availableChoice.length - 1
		)

		const selectedIndex = PartData.findIndex(
			item => item.id === availableChoice[selectedAvailableIndex].id
		)

		const selectedRotation =
			(360 / PartData.length) * selectedIndex + 360 / PartData.length / 2

		const missRotation = RandomBetween(0, (360 / PartData.length) * 0.35)
		const missDir = Math.random() > 0.5 ? -1 : 1

		const targetRotation =
			-1 * (selectedRotation + rotationAdd + missRotation * missDir)

		SetRotation(targetRotation)

		setTimeout(() => {
			SetIsRotated(true)
			// eslint-disable-next-line security/detect-object-injection
			alert(
				`You get ${PartData[selectedIndex].label} ${
					RarityGroups[selectedRarityGroup ?? ''].label
				}`
			)
		}, rotateDuration * 1000)
	}

	const PlayAgain = () => {
		if (!IsRotated) return

		SetIsRotated(false)
		SetRotation(0)
	}

	return (
		<Container>
			<Triangle></Triangle>
			<Wheel
				colors={PartData.map(val => val.color)}
				duration={rotateDuration}
				rotation={Rotation}
			>
				{PartData.map(({ label, id }, i) => (
					<TextContainer key={id}>
						<Text
							rotation={
								i * (360 / PartData.length) +
								180 / PartData.length
							}
						>
							{label}
						</Text>
					</TextContainer>
				))}
			</Wheel>
			<div>
				<button onClick={OnRotate}>Rotate</button>
				<button onClick={PlayAgain}>Play Again</button>
			</div>
		</Container>
	)
}

export default LuckyWheel
