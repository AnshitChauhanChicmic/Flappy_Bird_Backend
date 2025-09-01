const schemaValidation = {};

schemaValidation.registerUser = {
    body: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'password'],
        properties: {
            firstName: {
                type: 'string',
                minLength: 2,
                maxLength: 20
            },
            lastName: {
                type: 'string',
                minLength: 2,
                maxLength: 20
            },
            email: {
                type: 'string',
                format: 'email'
            },
            password: {
                type: 'string',
                minLength: 8,
                pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,}$'
            }
        }
    }
}


schemaValidation.loginUser = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: {
                type: 'string',
                format: 'email'
            },
            password: {
                type: 'string',
                minLength: 8,
                pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,}$'
            }
        }
    }
}

module.exports = schemaValidation