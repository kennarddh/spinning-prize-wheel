export interface IRarityGroups {
	[key: string]: {
		label: string
		rarity: number
	}
}

export type IChoice = {
	id: string
	label: string
	color: string
	rarityGroup: string
}[]

export interface IProps {
	rotateDuration: number
	rarityGroups: IRarityGroups
	choice: IChoice
	onEndRotate: ((id: string) => void) | undefined
}
