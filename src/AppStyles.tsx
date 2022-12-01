import styled from 'styled-components'

export const Container = styled.div`
	width: 100vh;
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: center;
`

export const Wheel = styled.div<{
	rotation: number
	duration: number
	colors: string[]
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

	width: 200px;
	height: 200px;

	border-radius: 50%;

	position: relative;

	display: flex;
	justify-content: center;
	align-items: center;

	transition: rotate ${({ duration }) => duration}s ease-out;

	rotate: ${({ rotation }) => rotation}deg;
`

export const TextContainer = styled.div`
	width: 150px;
	height: 150px;

	position: absolute;

	display: flex;
	justify-content: center;
`

export const Text = styled.p<{ rotation: number }>`
	rotate: ${({ rotation }) => rotation}deg;

	width: fit-content;
`
