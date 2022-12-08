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
import { Shuffle } from 'Utils/Array'

import { IRarityGroups, IChoice, IProps, ILuckyWheel, IChoices } from './Types'

const LuckyWheel: React.ForwardRefRenderFunction<ILuckyWheel, IProps> = (
	{
		rotateDuration,
		rarityGroups,
		choices,
		onEndRotate,
		onStartRotate,
		onReset,
		withoutArrow,
		fullRotationAddBeforeDestination,
		counterClockwise,
		groupColorByRarity,
		resetRotateDuration = 0,
		shuffleChoices,
		size,
		fontSize = 16,
		needReset,
	},
	ref
) => {
	const [Rotation, SetRotation] = useState(0)
	const [RotateDuration, SetRotateDuration] = useState(rotateDuration)
	const [IsRotated, SetIsRotated] = useState(false)

	const [Choices, SetChoices] = useState<IChoices>([])

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

		const availableChoice = Choices.filter(
			item => item.rarityGroup === selectedRarityGroup
		)

		const selectedAvailableIndex = RandomBetween(
			0,
			availableChoice.length - 1
		)

		const selectedIndex = Choices.findIndex(
			item => item.id === availableChoice[selectedAvailableIndex].id
		)

		const rotationDirection = counterClockwise ? -1 : 1

		const selectedRotation =
			rotationDirection *
			-1 *
			((360 / Choices.length) * selectedIndex + 360 / Choices.length / 2)

		const missRotation = RandomBetween(0, (360 / Choices.length) * 0.35)
		const missDir = Math.random() > 0.5 ? -1 : 1

		const targetRotation =
			rotationDirection *
			(selectedRotation + rotationAdd + missRotation * missDir)

		if (onStartRotate) onStartRotate(Choices[selectedIndex].id)

		SetRotation(targetRotation)

		if (rotateDuration !== 0)
			setTimeout(() => {
				SetIsRotated(true)

				if (onEndRotate) onEndRotate(Choices[selectedIndex].id)
			}, rotateDuration * 1000)
		else {
			if (needReset) SetIsRotated(true)

			if (onEndRotate) onEndRotate(Choices[selectedIndex].id)
		}
	}, [
		IsRotated,
		GetRotationAdd,
		rarityGroups,
		Choices,
		counterClockwise,
		onStartRotate,
		rotateDuration,
		onEndRotate,
		needReset,
	])

	const Reset = useCallback(() => {
		if (!IsRotated) return

		SetIsRotated(false)
		SetRotateDuration(resetRotateDuration)
		SetRotation(0)

		if (onReset) onReset()

		// Wait next tick
		setTimeout(() => {
			SetRotateDuration(rotateDuration)
		}, 0)
	}, [IsRotated, onReset, resetRotateDuration, rotateDuration])

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

		SetChoices(shuffleChoices ? Shuffle(choices) : choices)
	}, [choices, shuffleChoices])

	useEffect(() => {
		let sum = 0

		for (const data of Object.values(rarityGroups)) {
			if (data.rarity < 0)
				throw new Error('Rarity must not be smaller than 0')

			sum += data.rarity
		}

		if (sum !== 100) throw new Error('Sum of rarities must be equal to 100')
	}, [rarityGroups])

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
				colors={Choices.map(val => {
					if (groupColorByRarity) return groupColor[val.rarityGroup]

					return val.color ? val.color : RandomColor()
				})}
				duration={RotateDuration}
				rotation={Rotation}
				size={size}
			>
				{Choices.map(({ label, id }, i) => (
					<TextContainer key={id}>
						<Text
							rotation={
								i * (360 / Choices.length) +
								180 / Choices.length
							}
							fontSize={fontSize}
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
