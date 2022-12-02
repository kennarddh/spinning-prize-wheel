/* eslint-disable security/detect-object-injection */
const WeightedRandom = (rarity: Record<string, number>) => {
	const rnd = Math.random() * 100000

	const percent = rnd / 1000

	const { result } = Object.entries(rarity).reduce<{
		acc: number
		result: null | string
	}>(
		(acc, [key, value]) => {
			if (acc.result === null && percent > 100 - value - acc.acc) {
				acc.result = key
			}

			acc.acc += value

			return acc
		},
		{ acc: 0, result: null }
	)

	return result
}

export default WeightedRandom
