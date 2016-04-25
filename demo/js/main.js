var validator = new FormValidator({
	form:    '#form',
	context: this,
	fields: {
		email: {
			rules: {
				'required': true,
				type: 'email',
				'max-length': 2
			},
			'messages': {
				type: 'Correo incorrecto'
			}
		}
	}
})
.change(function(field, error) {
	console.log(error);
})
.success(function() {
	console.log(arguments);
})
.fail(function() {
	console.log(arguments);
});
