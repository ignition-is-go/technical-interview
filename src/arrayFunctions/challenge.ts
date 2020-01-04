import { Person } from './types'

/**
 * Return an array of all the people in the provided array who know typescript
 * @param people an array of Person type objects. See ./types for person description
 */

export function allCodersWhoKnowTypescript(people: Person[]): Person[] {

	return people.filter(p => p.languages.includes('typescript'))
}

export function objectWithPeopleByCity(people: Person[]): object {

	return people.reduce((cities, person) => {
		return {
			...cities,
			[person.city]: [
				...(Reflect.has(cities, person.city) ? cities[person.city] : []),
				person,
			],
		}
	}, {})
}

export function objectWithCountsOfNumberOfDevelopersWhoKnowEachLanguage(people: Person[]): object {

	return people.reduce((languages, person) => {
		person.languages.forEach(l => languages[l] ? languages[l] += 1 : languages[l] = 1)
		return languages
	}, {})
}

export function codersSortedByNetWorth(people: Person[]): Person[] {
	return people.filter(p => p.coder).sort((a, b) => a.netWorth - b.netWorth)
}
