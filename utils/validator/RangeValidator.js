
import BaseValidator from './BaseValidator'


export default class RangeValidator extends BaseValidator
{
    constructor(owner, options)
    {
        super(owner, options)
        // array or function
        this.range   = options?.range
        this.not     = options?.not ?? false
        this.strict  = options?.strict ?? false
        this.message = options?.message ?? '{property} имеет неправильное значение'

        if (!Array.isArray(this.range) && typeof this.range !== 'function') {
            throw new Error('Поле range должно быть либо массивом, либо функцией')
        }
    }

    _validateProperty(property, value) {
        if (typeof value === 'function') {
            this.range = this.range(property, value)

            if (!Array.isArray(this.range)) {
                throw new Error('Поле range должно быть массивом')
            }
        }

        let _in = false

        if (Array.isArray(value)) {
            _in = this._isSubset(value, this.strict)
        } else {
            _in = this._isIn(value, this.strict)
        }

        if (_in === this.not) {
            this.addError(property, this.message.replace('{property}', property))
        }
    }

    _isSubset(value, strict)
    {
        for (let _value of value) {
            if (!this._isIn(_value, strict)) {
                return false
            }
        }

        return value.length > 0
    }

    _isIn(value, strict)
    {
        let _in = false

        for (let rangeValue of this.range) {
            if (strict) {
                _in = value === rangeValue
            } else {
                _in = value == rangeValue
            }

            if (_in === true) {
                return true
            }
        }

        return _in
    }
}