import { detailedDiff } from 'deep-object-diff'
import pointer from 'json-pointer'
import * as R from 'ramda'
import { cloneWithNewIds } from './challenge2'
import { Sequence } from './types'

const sequences = require('./data/sequence.json') as Sequence[]

describe('clone object with new ids', () => {
	let safeSequences: Sequence[]
	let func: () => ({ before: Sequence[], after: Sequence[] })

	beforeEach(() => {
		safeSequences = R.clone(sequences)
		func = () => {
			const before = cloneWithNewIds(safeSequences)
			const after = cloneWithNewIds(before)

			return {
				before,
				after,
			}
		}
	})

	it('checks original data consistency', () => {
		const allSequenceIds = sequences.map(x => x.id)
		const result = sequences.every(x => checkDataConsistency(x, allSequenceIds))

		expect(result).toBe(true)
	})

	it('checks that cloned object ids arn`t the same', () => {
		const { before, after } = func()

		expect(before).toHaveLength(sequences.length)
		expect(after).toHaveLength(before.length)

		before.forEach((_, i) => {
			const { added, updated }: any = detailedDiff(before[i], after[i])

			const original = R.toPairs(pointer.dict(sequences[i]))

			const addedDict = pointer.dict(added)
			const updatedDict = pointer.dict(updated)
			const changes = R.toPairs({ ...addedDict, ...updatedDict })

			const originalKeys = original
				.map(x => x[0].split('/'))
				.map(x => x[x.length - 1])
				.filter(filterOnlyIds)

			const keys = changes
				.map(x => x[0].split('/'))
				.map(x => x[x.length - 1])
				.filter(filterOnlyIds)

			expect(keys).toHaveLength(originalKeys.length)
		})
	})

	it('checks that only cloned objects ids changed', () => {
		const { before, after } = func()

		expect(before).toHaveLength(sequences.length)
		expect(after).toHaveLength(before.length)

		before.forEach((_, i) => {
			const { updated }: any = detailedDiff(before[i], after[i])

			const dict = pointer.dict(updated)
			const changes = R.toPairs(dict)

			const keys = changes
				.map(x => x[0].split('/'))
				.map(x => x[x.length - 1])

			const invalidKeys = keys.filter(x => !filterOnlyIds(x))

			expect(invalidKeys).toHaveLength(0)
		})
	})

	it('checks data consistency', () => {
		const { before: beforeSequences, after: afterSequences } = func()

		// check first iteration
		const allBeforeSequenceIds = beforeSequences.map(x => x.id)

		const result = beforeSequences.every(x => checkDataConsistency(x, allBeforeSequenceIds))

		expect(result).toBe(true)

		// check second iteration
		const allAfterSequenceIds = afterSequences.map(x => x.id)

		const result2 = afterSequences.every(x => checkDataConsistency(x, allAfterSequenceIds))

		expect(result2).toBe(true)
	})
})

function checkDataConsistency(sequence: Sequence, allSequenceIds: string[]) {
	const { cues, connections, states, drivers, sequenceChannels } = sequence

	// check cues
	const allCueIds = cues.map(x => x.id)

	const driverCueIds = drivers.map(x => x.startCueId)

	const checkCueIds = connections
		.flatMap(x => [x.startCueId, x.endCueId])
		.concat(driverCueIds)

	if (!checkCueIds.every(x => allCueIds.includes(x))) {
		console.log('check cues failed') // , checkCueIds, allCueIds)
		return false
	}

	// check states
	const allStateIds = states.map(x => x.id)

	const checkStateIds = cues
		.flatMap(x => R.toPairs(x.channels))
		.map(x => x[1])
		.flatMap(x => (x.type === 'STATE') ? [x.stateId] : [])

	if (!checkStateIds.every(x => allStateIds.includes(x))) {
		console.log('check states failed') // , checkStateIds, allStateIds)
		return false
	}

	// check sequences
	const checkSequenceIds = cues
		.flatMap(x => R.toPairs(x.channels))
		.map(x => x[1])
		.flatMap(x => (x.type === 'SEQUENCE') ? [x.sequenceId] : [])

	if (!checkSequenceIds.every(x => allSequenceIds.includes(x))) {
		console.log('check sequences failed') // , checkSequenceIds, allSequenceIds)
		return false
	}

	// check drivers
	const allDriverIds = drivers.map(x => x.id)

	const checkDriverIds = cues
		.flatMap(x => R.toPairs(x.channels))
		.map(x => x[1])
		.flatMap(x => (x.type === 'SEQUENCE') ? [x.driverId] : [])

	if (!checkDriverIds.every(x => allDriverIds.includes(x))) {
		console.log('check drivers failed') // , checkDriverIds, allDriverIds)
		return false
	}

	// check sequenceChannels
	const allSequenceChannelIds = sequenceChannels.map(x => x.id)

	const checkSequenceChannelIds = cues
		.flatMap(x => R.toPairs(x.channels))
		.map(x => x[0])

	if (!checkSequenceChannelIds.every(x => allSequenceChannelIds.includes(x))) {
		console.log('check sequenceChannels failed') // , checkSequenceChannelIds, allSequenceChannelIds)
		return false
	}

	return true
}

function filterOnlyIds(x: string) {
	const blackList = [
		'projectId',
		'sourceId',
		'systemId',
		'systemChannelId',
	]

	if (blackList.includes(x)) {
		return false
	}

	return (x === 'id') || x.endsWith('Id')
}
