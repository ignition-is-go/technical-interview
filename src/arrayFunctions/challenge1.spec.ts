// tslint:disable: no-console
import * as R from 'ramda'
import { allCodersWhoKnowTypescript, codersSortedByNetWorth, objectWithCountsOfNumberOfDevelopersWhoKnowEachLanguage, objectWithPeopleByCity } from './challenge'
import { Person } from './types'

const people = require('./data/people.json') as Person[]

describe('all coders who know typescript', () => {
	let func, safePeople
	beforeEach(() => {
		safePeople = R.clone(people)
		func = () => allCodersWhoKnowTypescript(safePeople)
	})

	it('returns an array with the correct answer', () => {
		const result = func()

		expect(Array.isArray(result)).toBeTruthy()
		expect(result.length).toBeGreaterThan(0)

		expect(result).toMatchSnapshot()
		result.forEach(p => {
			expect(p.coder).toBeTruthy()
			expect(p.languages).toContain('typescript')
		})
	})

	it('runs quickly', () => {
		expect(time(func)).toBeLessThan(.2)
	})

	it('does not throw errors', () => {
		expect(func).not.toThrow()
	})

	it('does not modify its arguments', () => {
		func()
		expect(safePeople).toMatchObject(people)
	})
})

describe('object with people by city', () => {
	let func, safePeople
	beforeEach(() => {
		safePeople = R.clone(people)
		func = () => objectWithPeopleByCity(safePeople)
	})

	it('returns an array with the correct answer', () => {
		const result = func()
		expect(typeof result).toBe('object')
		expect(result).toMatchSnapshot()
		Reflect.ownKeys(result).forEach((city) => {
			const cityPeople = result[city]
			cityPeople.forEach(p => expect(p.city).toMatch(city as string))
		})
	})

	it('runs quickly', () => {
		expect(time(func)).toBeLessThan(1)
	})

	it('does not throw errors', () => {
		expect(func).not.toThrow()
	})

	it('does not modify its arguments', () => {
		func()
		expect(safePeople).toMatchObject(people)
	})
})

describe('object with counts of nubmer of developers who know each language', () => {
	let func, safePeople
	beforeEach(() => {
		safePeople = R.clone(people)
		func = () => objectWithCountsOfNumberOfDevelopersWhoKnowEachLanguage(safePeople)
	})

	it('returns an array with the correct answer', () => {
		const result = func()
		expect(typeof result).toBe('object')
		expect(result).toMatchSnapshot()
		Reflect.ownKeys(result).forEach((language) => {
			const count = result[language]
			expect(typeof count).toBe('number')
		})
	})

	it('runs quickly', () => {
		expect(time(func)).toBeLessThan(.2)
	})

	it('does not throw errors', () => {
		expect(func).not.toThrow()
	})

	it('does not modify its arguments', () => {
		func()
		expect(safePeople).toMatchObject(people)
	})
})

describe('codersSortedByNetWorth', () => {
	let func, safePeople
	beforeEach(() => {
		safePeople = R.clone(people)
		func = () => codersSortedByNetWorth(safePeople)
	})

	it('returns an array with the correct answer', () => {
		const result = func()
		expect(Array.isArray(result)).toBeTruthy()
		expect(result).toMatchSnapshot()
		result.forEach((coder: Person, idx) => {
			expect(coder.coder).toBeTruthy()
			if (idx > 0) {
				expect(coder.netWorth).toBeGreaterThanOrEqual(result[idx - 1].netWorth)
			}
			if (idx < result.length - 1) {
				expect(coder.netWorth).toBeLessThan(result[idx + 1].netWorth)
			}
		})
	})

	it('runs quickly', () => {
		expect(time(func)).toBeLessThan(.2)
	})

	it('does not throw errors', () => {
		expect(func).not.toThrow()
	})

	it('does not modify its arguments', () => {
		func()
		expect(safePeople).toMatchObject(people)
	})
})

const time = (func: () => any) => {
	const start = process.hrtime()
	func()
	return process.hrtime(start)[1] / 1000000
}
