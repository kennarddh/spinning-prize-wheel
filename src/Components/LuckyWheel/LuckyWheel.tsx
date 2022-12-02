/* eslint-disable security/detect-object-injection */
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from 'react'

import { Container, Wheel, TextContainer, Text, Triangle } from './Styles'

import RandomBetween from 'Utils/RandomBetween'
import WeightedRandom from 'Utils/WeightedRandom'
import RandomColor from 'Utils/RandomColor'

import { IRarityGroups, IChoice, IProps, ILuckyWheel, IChoices } from './Types'

const LuckyWheel: React.ForwardRefRenderFunction<ILuckyWheel, IProps> = (
	{
		rotateDuration,
		rarityGroups,
		choices,
		onEndRotate,
		withoutArrow,
		fullRotationAddBeforeDestination,
		counterClockwise,
		groupColorByRarity,
		resetRotateDuration = 0,
	},
	ref
) => {
	const [Rotation, SetRotation] = useState(0)
	const [RotateDuration, SetRotateDuration] = useState(rotateDuration)

	const [IsRotated, SetIsRotated] = useState(false)

	const GetRotationAdd = useCallback(() => {
		if (!fullRotationAddBeforeDestination) return RandomBetween(2, 5)

		if (
			fullRotationAddBeforeDestination &&
			typeof fullRotationAddBeforeDestination === 'function'
		) {
			return fullRotationAddBeforeDestination()
		}

		return fullRotationAddBeforeDestination
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

		const availableChoice = choices.filter(
			item => item.rarityGroup === selectedRarityGroup
		)

		const selectedAvailableIndex = RandomBetween(
			0,
			availableChoice.length - 1
		)

		const selectedIndex = choices.findIndex(
			item => item.id === availableChoice[selectedAvailableIndex].id
		)

		const rotationDirection = counterClockwise ? -1 : 1

		const selectedRotation =
			rotationDirection *
			-1 *
			((360 / choices.length) * selectedIndex + 360 / choices.length / 2)

		const missRotation = RandomBetween(0, (360 / choices.length) * 0.35)
		const missDir = Math.random() > 0.5 ? -1 : 1

		const targetRotation =
			rotationDirection *
			(selectedRotation + rotationAdd + missRotation * missDir)

		SetRotation(targetRotation)

		setTimeout(() => {
			SetIsRotated(true)

			if (onEndRotate) onEndRotate(choices[selectedIndex].id)
		}, rotateDuration * 1000)
	}, [
		GetRotationAdd,
		IsRotated,
		choices,
		counterClockwise,
		onEndRotate,
		rarityGroups,
		rotateDuration,
	])

	const Reset = useCallback(() => {
		if (!IsRotated) return

		SetIsRotated(false)
		SetRotateDuration(resetRotateDuration)
		SetRotation(0)

		// Wait next tick
		setTimeout(() => {
			SetRotateDuration(rotateDuration)
		}, 0)
	}, [IsRotated, resetRotateDuration, rotateDuration])

	useImperativeHandle(
		ref,
		() => ({
			Reset,
			Rotate,
		}),
		[Reset, Rotate]
	)

	useEffect(() => {
		if (new Set(choices.map(val => val.id)).size !== choices.length) {
			throw new Error('Choices id cannot be duplicate')
		}
	}, [choices])

	const groupColor = useMemo(() => {
		return Object.entries(rarityGroups).reduce<Record<string, string>>(
			(acc, [key, { color }]) => {
				acc[key] = color ? color : RandomColor()

				return acc
			},
			{}
		)
	}, [rarityGroups])

	return (
		<Container>
			{!withoutArrow ? <Triangle></Triangle> : null}
			<Wheel
				colors={choices.map(val => {
					if (groupColorByRarity) return groupColor[val.rarityGroup]

					return val.color ? val.color : RandomColor()
				})}
				duration={RotateDuration}
				rotation={Rotation}
			>
				{choices.map(({ label, id }, i) => (
					<TextContainer key={id}>
						<Text
							rotation={
								i * (360 / choices.length) +
								180 / choices.length
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

export type { IRarityGroups, IChoice, ILuckyWheel, IChoices }

export { RandomColor, WeightedRandom, RandomBetween }
