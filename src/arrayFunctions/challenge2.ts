import { newId } from './_util/newId'
import { Sequence } from './types'

/**
 * complete the following functions so that all tests pass.
 * - DO NOT modify the incoming arguments
 * - DO write efficient algorithms, one of the tests is the running time of the test
 * - DO NOT import any external libraries
 * - USE imported newId function for generating new id
 *
 * There is no need to use typescript, but feel free to use it if you like
 */

/**
 * Make a deep clone of the incoming object but replace used Id's with new ones,
 * also keep in mind that id's are used in another object as reference
 *
 * Here is an exception, systemId in the SequenceChannel & anything inside the state
 * shouldn't be changed after clone process
 *
 * @param sequence is an object which should be cloned. See ./types for person description
 */
export function cloneWithNewIds(sequences: Sequence[]): Sequence[] {

	return sequences
}
