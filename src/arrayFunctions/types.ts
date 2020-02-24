// challenge 1
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

// challenge 2
type ID = string

export interface Sequence {
	id: ID
	name: string
	projectId: ID
	sequenceChannels: SequenceChannel[]
	states: State[]

	drivers: SequenceDriver[]

	cues: Cue[]

	connections: Connection[]
}

export interface SequenceDriver {
	id: ID
	startCueId: ID
}

export type CueChannelValueType =
	CueChannelStateValue |
	CueChannelSequenceValue

export interface CueChannelStateValue {
	type: 'STATE',
	stateId: ID,
}

export interface CueChannelSequenceValue {
	type: 'SEQUENCE',
	sequenceId: ID,
	driverId: ID,
}

export interface Cue {
	id: ID
	name: string
	block: Block

	channels: CueChannels

	hasTimeTrigger: Boolean
	timeTrigger?: CueTime
}

export interface CueTime {
	hour: number,
	minute: number,
	second: number
}

export interface CueChannels {
	[sequenceChannelId: string]: CueChannelValueType
}

export interface Block {
	id: ID
	name: string
}

// connection
export interface Connection {
	id: ID
	startCueId: ID
	endCueId: ID
	priority: number | null
}

export interface SequenceChannel {
	id: ID
	name: string
	systemId: ID
}

export interface State {
	id: ID
	name: string
	description: string

	sourceId: string
	data: any

	bindings: StateBinding[]
}

export interface StateBinding {
	mode: StateBindingMode
	stateDataFieldId: ID // the field in the state data object, (format: json pointer string)
	inputSequenceChannelId: ID
	inputDataFieldId: ID // format: dot separated string
}

export const enum StateBindingMode {
	STREAMING = 'STREAMING',
	STATEFUL = 'STATEFUL',
}
