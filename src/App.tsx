import { FC, useState } from 'react'

import { Container, Wheel, TextContainer, Text } from './AppStyles'

const GenerateRandomColor = () => `hsla(${Math.random() * 360}, 100%, 50%, 1)`

const App: FC = () => {
	const [Rotation, SetRotation] = useState(0)
	const [RotateDuration] = useState(1)

	const [PartData] = useState([
		{
			id: 'e22d86e0-6d5e-4af0-a5e2-cd70ad9122cf',
			label: '1',
			color: GenerateRandomColor(),
		},
		{
			id: 'fd83eeb0-343a-47c2-94ea-1f1539c69731',
			label: '2',
			color: GenerateRandomColor(),
		},
		{
			id: 'ec11ce67-e628-449a-9812-afe86a1ef302',
			label: '3',
			color: GenerateRandomColor(),
		},
		{
			id: '5f9d35e1-3668-4dd1-8cae-34d35176609e',
			label: '4',
			color: GenerateRandomColor(),
		},
		{
			id: 'cdb9c6c4-c153-4e89-992a-b1daa8365456',
			label: '5',
			color: GenerateRandomColor(),
		},
		{
			id: 'bff94f05-7a34-4e20-b997-7e70475fe2fc',
			label: '6',
			color: GenerateRandomColor(),
		},
		{
			id: 'ef6071e7-f925-480e-8897-0fadffff5549',
			label: '7',
			color: GenerateRandomColor(),
		},
		{
			id: '5630b628-4fda-4264-b593-40b2dc9750e6',
			label: '9',
			color: GenerateRandomColor(),
		},
		{
			id: '29b1593f-8327-4a0b-9d6f-26dbd4eda4a3',
			label: '10',
			color: GenerateRandomColor(),
		},
	])

	const [IsRotated, SetIsRotated] = useState(false)

	const RandBetween = (min: number, max: number) => {
		// min and max inclusive
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	const OnRotate = () => {
		if (IsRotated) return

		const rotationAdd = 360 * RandBetween(2, 5)

		const selectedIndex = RandBetween(0, PartData.length - 1)

		const selectedRotation = (360 / PartData.length) * selectedIndex + 45

		const missRotation = RandBetween(0, (360 / PartData.length) * 0.35)
		const missDir = Math.random() > 0.5 ? -1 : 1

		const targetRotation =
			-1 * (selectedRotation + rotationAdd + missRotation * missDir)

		SetRotation(targetRotation)

		setTimeout(() => {
			SetIsRotated(true)
			// eslint-disable-next-line security/detect-object-injection
			alert(`You get ${PartData[selectedIndex].label}`)
		}, RotateDuration * 1000)
	}

	const PlayAgain = () => {
		if (!IsRotated) return

		SetIsRotated(false)
		SetRotation(0)
	}

	return (
		<Container>
			<button onClick={OnRotate}>Rotate</button>
			<button onClick={PlayAgain}>Play Again</button>
			<Wheel
				colors={PartData.map(val => val.color)}
				duration={RotateDuration}
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
		</Container>
	)
}

export default App
