const director = require('../director.js')

afterEach(() => {
 	director.purge()
})

test('films handler should start correctly', () => {

	const contract = require('../actors/filmsHandler.actor')

	director.cast(contract)

	expect(director.book.length).toBe(1)
	expect(director.book[0].name).toBe('filmsHandler')

})

test('films handler should send all films when asked', (done) => {

	const regularContract = require('../actors/filmsHandler.actor')

	const eavesdropperContract = {
		name: 'Eve',
		behavior: (i, m) => {
			if (i === 'RE:GET ALL FILMS') {
				expect(m.success).toBeTruthy()
				expect(Array.isArray(m.films)).toBeTruthy()
				done()
			}
		}
	}

	director.cast(regularContract)
	director.cast(eavesdropperContract)

	director.broadcast('GET ALL FILMS', {replyTo: 'tester'})

})
