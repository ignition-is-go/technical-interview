import { writeFileSync } from 'fs'
import readFile from 'fs-readfile-promise'
import { mock } from 'intermock'
import { join } from 'path'
import { inspect } from 'util'
import { cities, languages } from '../types'

export const data = async () => Promise.all(Array(100).fill({}).map(async () => mock({
	files: await readFiles([join(__dirname, '..', 'types.ts')]),
	interfaces: ['Person'],
	output: 'object',
	isFixedMode: false,
}))).then(list => (list as any[]).map(person => {
	const set = new Set(pick(languages, Math.floor(Math.random() * languages.length)))
	return {
		...person.Person,
		city: pick(cities, 1)[0],
		languages: person.Person.coder ? Array.from(set) : [],
	}
}))

export type FileTuple = [string, string]
export type FileTuples = FileTuple[]

export function readFiles(files: string[]): Promise<FileTuples> {
	const filePromises = files.map(file => readFile(file))
	return new Promise((resolve) => {
		Promise.all(filePromises).then(buffers => {
			const contents: string[][] = []
			buffers.forEach(
				(buffer, index) => contents.push([files[index], buffer.toString()]))
			resolve(contents as FileTuples)
		})
	})
}

const pick = <T>(arr: T[], count = 1): T[] => {
	const len = arr.length
	const res = Array(count).fill('').map(() => {
		const idx = Math.ceil(Math.random() * (len - 1))
		return arr[idx]
	})
	return res
}

const run = async () => {
	const d = await data()
	console.log(inspect(d, false, 10, true))
	writeFileSync(join(__dirname, '..', 'data', 'people.json'), JSON.stringify(d, undefined, 2))
}
run()
