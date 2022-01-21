
import BaseValidator from './BaseValidator'


export default class BooleanValidator extends BaseValidator
{
    constructor(owner, options)
    {
        super(owner, options)
        this.trueValue  = options?.trueValue ?? '1'
        this.falseValue = options?.falseValue ?? '0'
        this.strict     = options?.strict ?? false
        this.message    = options?.message ?? '{property} должен быть либо {true} либо {false}'
    }

    _validateProperty(property, value)
    {
        let valid

        if (this.strict) {
            valid = value === this.trueValue || value === this.falseValue
        } else {
            valid = value == this.trueValue || value == this.falseValue
        }

        if (!valid) {
            this.addError('property', this.message
                .replace('{property}', property)
                .replace('{true}', this.trueValue === true ? 'true' : this.trueValue)
                .replace('{false}', this.falseValue === false ? 'false' : this.falseValue)
            )
        }
    }
}