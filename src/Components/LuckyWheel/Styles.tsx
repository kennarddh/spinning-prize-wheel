import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`

export const Triangle = styled.div`
	width: 50px;
	height: 50px;

	border: 10px solid black;
	border-top: none;
	border-left: none;

	rotate: 45deg;

	translate: 0 -50%;
`

export const Wheel = styled.div<{
	rotation: number
	duration: number
	colors: string[]
	size: number
}>`
	background: conic-gradient(
		${({ colors }) =>
			colors
				.map(
					(color, i) =>
						`${color} ${(i / colors.length) * 100}% ${
							(i / colors.length) * 100 +
							(1 / colors.length) * 100
						}%`
				)
				.join(',')}
	);

	width: ${({ size }) => size}px;
	height: ${({ size }) => size}px;

	border-radius: 50%;

	position: relative;

	display: flex;
	justify-content: center;
	align-items: center;

	transition: rotate cubic-bezier(0, -0.14, 0, 1)
		${({ duration }) => duration}s;

	rotate: ${({ rotation }) => rotation}deg;
`

export const TextContainer = styled.div`
	width: 75%;
	height: 75%;

	position: absolute;

	display: flex;
	justify-content: center;
`

export const Text = styled.p<{ rotation: number; fontSize: number }>`
	rotate: ${({ rotation }) => rotation}deg;

	font-size: ${({ fontSize }) => fontSize}px;

	width: fit-content;
`
