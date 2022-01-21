
import BaseValidator from './BaseValidator'


export default class NotEmptyValidator extends BaseValidator
{
    constructor(owner, options)
    {
        super(owner, options)
        this.message = options?.message ?? '{property} не должно быть пустым значением'
    }

    _validateProperty(property, value) 
    {
        let message = null

        if (Array.isArray(value) && value.length === 0) {
            message = this.message
        } else if (typeof value === 'string' && value.length === 0) {
            message = this.message
        } else if (value === undefined || value === null) {
            message = this.message
        }

       if (message !== null) {
           this.addError(property, message.replace('{property}', property))
       }
    }
}