/* eslint-disable security/detect-object-injection */
import { FC, useState } from 'react'

import { Container, Wheel, TextContainer, Text, Triangle } from './Styles'

import RandomBetween from 'Utils/RandomBetween'
import WeightedRandom from 'Utils/WeightedRandom'

import { IRarityGroups, IChoice, IProps } from './Types'

const LuckyWheel: FC<IProps> = ({ rotateDuration, rarityGroups, choice }) => {
	const [Rotation, SetRotation] = useState(0)

	const [IsRotated, SetIsRotated] = useState(false)

	const OnRotate = () => {
		if (IsRotated) return

		const rotationAdd = 360 * RandomBetween(2, 5)

		const selectedRarityGroup = WeightedRandom(
			Object.entries(rarityGroups).reduce<Record<string, number>>(
				(acc, [key, value]) => {
					acc[key] = value.rarity

					return acc
				},
				{}
			)
		)

		const availableChoice = choice.filter(
			item => item.rarityGroup === selectedRarityGroup
		)

		const selectedAvailableIndex = RandomBetween(
			0,
			availableChoice.length - 1
		)

		const selectedIndex = choice.findIndex(
			item => item.id === availableChoice[selectedAvailableIndex].id
		)

		const selectedRotation =
			(360 / choice.length) * selectedIndex + 360 / choice.length / 2

		const missRotation = RandomBetween(0, (360 / choice.length) * 0.35)
		const missDir = Math.random() > 0.5 ? -1 : 1

		const targetRotation =
			-1 * (selectedRotation + rotationAdd + missRotation * missDir)

		SetRotation(targetRotation)

		setTimeout(() => {
			SetIsRotated(true)
			// eslint-disable-next-line security/detect-object-injection
			alert(
				`You get ${choice[selectedIndex].label} ${
					rarityGroups[selectedRarityGroup ?? ''].label
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
				colors={choice.map(val => val.color)}
				duration={rotateDuration}
				rotation={Rotation}
			>
				{choice.map(({ label, id }, i) => (
					<TextContainer key={id}>
						<Text
							rotation={
								i * (360 / choice.length) + 180 / choice.length
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

export type { IRarityGroups, IChoice }
