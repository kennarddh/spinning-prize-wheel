/* eslint-disable security/detect-object-injection */
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'

import { Container, Wheel, TextContainer, Text, Triangle } from './Styles'

import RandomBetween from 'Utils/RandomBetween'
import WeightedRandom from 'Utils/WeightedRandom'

import { IRarityGroups, IChoice, IProps, ILuckyWheel } from './Types'

const LuckyWheel: React.ForwardRefRenderFunction<ILuckyWheel, IProps> = (
	{
		rotateDuration,
		rarityGroups,
		choice,
		onEndRotate,
		withoutArrow,
		fullRotationAddBeforeDestination,
	},
	ref
) => {
	const [Rotation, SetRotation] = useState(0)

	const [IsRotated, SetIsRotated] = useState(false)

	const GetRotationAdd = useCallback(() => {
		if (fullRotationAddBeforeDestination) {
			if (typeof fullRotationAddBeforeDestination === 'function') {
				return fullRotationAddBeforeDestination()
			} else {
				return fullRotationAddBeforeDestination
			}
		} else {
			return RandomBetween(2, 5)
		}
	}, [fullRotationAddBeforeDestination])

	const Rotate = useCallback(() => {
		if (IsRotated) return

		const rotationAdd = 360 * GetRotationAdd()

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

			if (onEndRotate) onEndRotate(choice[selectedIndex].id)
		}, rotateDuration * 1000)
	}, [
		GetRotationAdd,
		IsRotated,
		choice,
		onEndRotate,
		rarityGroups,
		rotateDuration,
	])

	const Reset = useCallback(() => {
		if (!IsRotated) return

		SetIsRotated(false)
		SetRotation(0)
	}, [IsRotated])

	useImperativeHandle(
		ref,
		() => ({
			Reset,
			Rotate,
		}),
		[Reset, Rotate]
	)

	return (
		<Container>
			{!withoutArrow ? <Triangle></Triangle> : null}
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
		</Container>
	)
}

export default forwardRef(LuckyWheel)

export type { IRarityGroups, IChoice, ILuckyWheel }
