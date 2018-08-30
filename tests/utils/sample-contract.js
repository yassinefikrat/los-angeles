const jargon = ['GREET']

module.exports = {

	name: 'sample guy',

	instructions: jargon,

	behavior: (instruction, message) => {
		if (instruction === jargon[0]) console.log('hello ' + message)
		else console.log('did not understand')
	},

	options: {}

}