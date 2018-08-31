const Actor = require('./Actor.js')

let book = []

const cast = (contract) => {
	return new Actor(
		contract.name, 
		contract.behavior, 
		(actor) => book.push(actor),	// callback so that the actor is added to our book after it's instantiated
		broadcast					// give the actor the ability to speak through the director's broadcast function
	)
}

const broadcast = (instruction, message) => {
	book.forEach((actor) => actor.send(instruction, message))
}

const purge = () => {
	book.forEach((actor) => actor.kill())
	book = []
}

module.exports = {

	book,
	
	cast,

	broadcast,

	purge,

}