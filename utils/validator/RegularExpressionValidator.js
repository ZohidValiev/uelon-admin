
import BaseValidator from './BaseValidator'


export default class RegularExpressionValidator extends BaseValidator
{
    constructor(owner, options) 
    {
        super(owner, options)
        this.pattern = options?.pattern
        this.not     = options?.not ?? false
        this.message = options?.message ?? '{property} имеет неправильное значение'

        if (!this.pattern) {
            throw new Error('Поле "pattern" должно быть установлено')
        }
    }

    _validateProperty(property, value)
    {
        let isValid = (value instanceof RegExp)
                        && ((!this.not && this.pattern.test(value)) 
                            || (this.not && !this.pattern.test(value)))

        if (!isValid) {
            this.addError(property, message.replace('{property}', property))
        }
    }
}