
import BaseValidator from './BaseValidator.js'


export default class EmailValidator extends BaseValidator
{
    pattern = /^[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/
    
    constructor(owner, options) 
    {
        super(owner, options)
        this.message = options?.message ?? '{property} не является правильным email адресом'
    }

    _validateProperty(property, value)
    {
        if (!this.pattern.test(value)) {
            this.addError(property, this.message.replace('{property}', property))
        }
    }
}