import LuckyWheel from './Components/LuckyWheel/LuckyWheel'
import { Pick, PickUnique, Shuffle } from './Utils/Array'
import RandomBetween from './Utils/RandomBetween'
import RandomColor from './Utils/RandomColor'
import WeightedRandom from './Utils/WeightedRandom'
import type {
	ILuckyWheel,
	IChoices,
	IChoice,
	IRarityGroups,
} from './Components/LuckyWheel/Types'

export default LuckyWheel

const Utils = {
	Array: {
		Pick,
		PickUnique,
		Shuffle,
	},
	Random: {
		RandomBetween,
		RandomColor,
		WeightedRandom,
	},
}

export { Utils }

export type { ILuckyWheel, IChoices, IChoice, IRarityGroups }
