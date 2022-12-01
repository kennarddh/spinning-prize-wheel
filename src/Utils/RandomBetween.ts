const RandomBetween = (min: number, max: number) => {
	// min and max inclusive
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export default RandomBetween
