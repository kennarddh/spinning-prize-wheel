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
}

export type IChoices = IChoice[]

export interface IProps {
	/**
	 * Rotate duration
	 */
	rotateDuration: number

	/**
	 * One of rarity key in rarity groups
	 */
	rarityGroups: IRarityGroups

	/**
	 * Avaliavle choices
	 */
	choice: IChoice

	/**
	 * Remove default arrow
	 */
	withoutArrow?: boolean

	/**
	 * Full rotation count before rotate to destination can be given as factory or value
	 *
	 * Default 2 - 5 rotation randomized
	 */

	fullRotationAddBeforeDestination?: FactoryOrValue<number>

	/**
	 * Change rotate direction to counter clockwise
	 */
	counterClockwise?: boolean

	/**
	 * Callback that called when rotation completed
	 *
	 * @param {string} id - Choosed id
	 */
	onEndRotate: ((id: string) => void) | undefined
}

export interface ILuckyWheel {
	Rotate: () => void
	Reset: () => void
}
