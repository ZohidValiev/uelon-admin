
import BaseValidator from './BaseValidator.js'

export default class NumberValidator extends BaseValidator
{
    min      = null
    max      = null
    tooSmall = ''
    tooBig   = ''
    integerPattern = /^\s*[+-]?\d+\s*$/
    numberPattern  = /^\s*[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?\s*$/


    constructor(owner, options) 
    {
        super(owner, options)

        this.integerOnly = options?.integerOnly ?? true
        this.message = options?.message ?? (this.integerOnly 
            ? '{property} должно быть целым числом' 
            : '{property} должно быть числом'
        )
        if (this.min != null && this.tooSmall == null) {
            this.tooSmall = options?.tooSmall ?? '{property} не должно быть меньше {min}'
        }
        if (this.max != null && this.tooBig == null) {
            this.tooBig = options?.tooBig ?? '{property} не должно быть больше {max}'
        }
    }

    _validateProperty(property, value) 
    {
        if (this._isNotNumber(value)) {
            this.addError(property, this.message.replace('{property}', property))
            return
        }

        const pattern = this.integerOnly ? this.integerPattern : this.numberPattern
        if (!pattern.test(value)) {
            this.addError(property, this.message.replace('{property}', property))
        }
        
        if (this.min != null && value < this.min) {
            this.addError(property, this.tooSmall
                .replace('{property}', property)
                .replace('{min}', this.min)
            )
        }

        if (this.max != null && value > this.max) {
            this.addError(property, this.tooBig
                .replace('{property}', property)
                .replace('{max}', this.max)
            )
        }
    }

    _isNotNumber(value)
    {
        return isNaN(+value)
    }
}