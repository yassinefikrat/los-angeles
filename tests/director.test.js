const director = require('../director.js')

afterEach(() => {
 	director.purge()
})

test('director should spawn an actor from a contract and put it in his book', () => {

	const contract = require('./utils/sample-contract.js')

	director.cast(contract)

	expect(director.book.length).toBe(1)
	expect(director.book[0].name).toBe('sample guy')

})

test('director should send a message to all actors when told to', (done) => {

	const instruction = 'TEST'
	const message = 'THIS'

	const regularContract = require('./utils/sample-contract.js')

	const specialContract = {
		name:'test ninja',
		behavior: (i, m) => {
			expect(i).toBe(instruction)
			expect(m).toBe(message)
			done()
		}
	}

	director.cast(regularContract)
	director.cast(specialContract)

	director.broadcast(instruction, message)

})
