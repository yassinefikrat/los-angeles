const Actor = require('../Actor.js')

test('actor uses correct behavior', () => {

	const mockInstruction = 'DO NOTHING'
	const mockMessage = 'HELLO THERE'

	const mockBehavior = jest.fn()

	const actor = new Actor('random dude', mockBehavior)

	actor.send(mockInstruction, mockMessage)

	setTimeout(() => {
		expect(mockBehavior.mock.calls[0][0]).toBe(mockInstruction)
		expect(mockBehavior.mock.calls[0][1]).toBe(mockMessage)
	}, 100)

})

test('actor calls back with himself as an argument after being instantiated', () => {

	const mockBehavior = () => {}

	new Actor('some fella', mockBehavior, (actor) => expect(actor).toBeDefined())

})

test('actor has an id that is different everytime', () => {

	const mockBehavior = jest.fn()

	let ids = []

	const actor0 = new Actor('0', mockBehavior, (actor) => ids.push(actor.id))
	const actor1 = new Actor('1', mockBehavior, (actor) => ids.push(actor.id))
	const actor2 = new Actor('2', mockBehavior, (actor) => ids.push(actor.id))

	setTimeout(() => {
		const duplicatesRemoved = ids.filter((v, i, a) => a.indexOf(v) === i)
		expect(duplicatesRemoved.length).toBe(ids.length)
	}, 100)

})

// test('actor that has no behavior works anyway')
