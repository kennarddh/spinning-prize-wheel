import { FactoryOrValue } from 'Types'

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
	withoutArrow?: boolean
	fullRotationAddBeforeDestination?: FactoryOrValue<number> // Default 2 - 5 random
	onEndRotate: ((id: string) => void) | undefined
}

export interface ILuckyWheel {
	Rotate: () => void
	Reset: () => void
}
