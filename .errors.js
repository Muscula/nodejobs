module.exports = {
	"notUnique":{
		message:'The property "%s" is not unique. The value "%s" already exists.',
		args:['propertyName', 'propertyValue'],
		http:400
	},
	"propertyNotDefined":{
		message:'The property named "%s" should be defined',
		args:['propertyName'],
		http:400
	},
	"propertyMalformed":{
		message:'The property "%s" with the value "%s" is malformed.',
		args:['propertyName', 'propertyValue'],
		http:400
	},
	"unAuthorized":{
		message: 'You are not authorized for this',
		http: 401
	},
	"notFound":{
		message: 'The entity was not found',
		http: 400
	},
	jsonError:{
		message: 'Error parsing json: %s.',
		args:['jsonError', 'dataPassed'],
		http:400
	},
	"propertyNotFound":{
		message: 'The property %s with the value %s was not found',
		args:['propertyName', 'propertyValue'],
		http: 400
	}
};