/**
 * complete the following functions so that all tests pass.
 * - DO NOT modify the incoming arguments
 * - DO write efficient algorithms, one of the tests is the running time of the test
 * - DO NOT import any external libraries
 *
 * There is no need to use typescript, but feel free to use it if you like
 */

import { Person } from './types'

/**
 * Return an array of all the people in the provided array who know typescript
 *
 * @param people an array of Person type objects. See ./types for person description
 */
export function allCodersWhoKnowTypescript(people: Person[]): Person[] {

	return people
}

/**
 * Return an object where the keys are city names, and the values are arrays of the
 * people from that city
 *
 * @param people an array of Person type objects. See ./types for person description
 */
export function objectWithPeopleByCity(people: Person[]): object {

	return {}
}

/**
 * Return an object where the keys are the language names known by coders in the list,
 * and the values are the number of developers who know that language
 *
 * @param people an array of Person type objects. See ./types for person description
 */
export function objectWithCountsOfNumberOfDevelopersWhoKnowEachLanguage(people: Person[]): object {

	return {}
}

/**
 * Return an array of coders, sorted by net worth, ascending.
 * @param people an array of Person type objects. See ./types for person description
 */
export function codersSortedByNetWorth(people: Person[]): Person[] {
	return people
}
