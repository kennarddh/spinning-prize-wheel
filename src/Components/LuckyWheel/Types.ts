export interface IRarityGroups {
	[key: string]: {
		label: string
		rarity: number
	}
}

export type IPartData = {
	id: string
	label: string
	color: string
	rarityGroup: string
}[]

export interface IProps {
	rotateDuration: number
}
