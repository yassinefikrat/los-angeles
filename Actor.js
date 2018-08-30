class Actor {

	constructor(name, behavior, callback, respondFunction) {
		this.name = name
		this.id = '123456789'
		this.verbose = false
		this.ephemere = true

		this._queue = []
		this._life = 10
		this._closing = false
		this._log = (message) => console.log(this.name + ' says it\'s ' + message)
		this._sendOut = respondFunction

		// Actor tells the creator it has been successfully created.
		if (callback) callback(this)

		// We define the loop that make an actor work. This is where the actor takes from the pile and uses its defined behavior.
		const loop = () => {
			if (this.ephemere) this._life--
			if (this._queue.length) {
				const {instruction, message} = this._queue.shift()
				this.verbose && this._log('responding to ' + message)
				const response = behavior(instruction, message)
				if (response) this._sendOut(response.instruction, response.message) 
			} else if (this._closing) {
				this.kill()
			} else {
				this.verbose && this._log('doing nothing')
			}
			if (this._life > 0) setTimeout(loop, 1)
		}

		// Let's start the first loop iteration!
		loop()
	}

	send(instruction, message) {
		if(this._closing) return {error: 'shutting down', errorDescription: 'This actor can\'t receive messages, it\'s shutting down.'}
		this._queue.push({instruction, message})
		return {estimatedQueuePosition: this._queue.length}
	}

	shutdown() {
		this._closing = true
	}

	kill() {
		this._life = 0
	}

}

module.exports = Actor