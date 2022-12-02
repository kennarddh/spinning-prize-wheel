import { FactoryOrValue } from 'Types'

export interface IRarityGroups {
	[key: string]: {
		/**
		 * Human readable label
		 */
		label: string

		/**
		 * Percentage
		 * All rarity group sums must add up to 100
		 */
		rarity: number

		/**
		 * Random color will be used if color not specified
		 */
		color?: string
	}
}

export type IChoice = {
	id: string

	/**
	 * Human readable label
	 */
	label: string

	/**
	 * Random color will be used if color not specified
	 */
	color?: string

	/**
	 * One of rarity group
	 */
	rarityGroup: string
}

export type IChoices = IChoice[]

export interface IProps {
	/**
	 * Rotate duration
	 */
	rotateDuration: number

	/**
	 * Reset rotate duration
	 *
	 * @default 0
	 */
	resetRotateDuration?: number

	/**
	 * One of rarity key in rarity groups
	 */
	rarityGroups: IRarityGroups

	/**
	 * Available choices
	 */
	choices: IChoices

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

	/**
	 * Same color for every choice in same rarity group
	 *
	 * Choice color will be omitted
	 *
	 * Rarity groups color will be used
	 *
	 * Random color will be used if color not specified
	 */
	groupColorByRarity?: boolean

	/**
	 * Shuffle choices
	 */
	shuffleChoices?: boolean

	/**
	 * Wheel size
	 */
	size: number

	/**
	 * Font size
	 *
	 * Default 16px
	 */
	fontSize?: number
}

export interface ILuckyWheel {
	Rotate: () => void
	Reset: () => void
}
