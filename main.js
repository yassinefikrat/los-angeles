const Actor = require('./Actor.js')

const book = {}

// const names = ['guy', 'man', 'dude', 'pal']
// const names = ['guy', 'man']

// names.forEach(name => {
// 	book[name] = new Actor(name)
// 	// console.log(book)
// })

// for(let i=0; i<7; i++) {
// 	console.log(book[names[0]].send('hello' + (i+1)))
// 	if (i===4) book[names[0]].shutdown()
// }

const dudeContract = require('./actors/dude.actor')

const dude = new Actor(dudeContract.name, dudeContract.behavior)
const GREET = dudeContract.instructions[0]

for(let i=0; i<7; i++) {
	console.log(dude.send(GREET, 'Bob' + (i+1)))
	if (i===4) dude.shutdown()
}