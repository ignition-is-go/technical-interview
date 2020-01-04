export interface Person {
	name: string,
	netWorth: number,
	coder?: boolean,
	us?: boolean
	city: string,
	languages: string[]
}

export const cities = ['nyc', 'sf', 'la']
export const languages = [
	'javascript',
	'typescript',
	'html',
	'css',
	'c#',
	'python',
	'ruby',
]
