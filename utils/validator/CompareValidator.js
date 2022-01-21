
import BaseValidator from './BaseValidator'


export default class CompareValidator extends BaseValidator
{
    static TYPE_STRING = 'string'
    static TYPE_NUMBER = 'number'


    constructor(owner, options)
    {
        super(owner, options)
        this.type = options?.type ?? CompareValidator.TYPE_STRING
        this.compareProperty = options?.compareProperty ?? null
        this.compareValue    = options?.compareValue ?? null
        this.operator        = options?.operator ?? '=='

        if (options?.message == null) {
            switch (this.operator) {
                case '==':
                    this.message = '{pproperty} должен быть равен {compareValueOrProperty}'
                    break
                case '===':
                    this.message = '{pproperty} должен быть равен {compareValueOrProperty}'
                    break
                case '!=':
                    this.message = '{property} не должен быть равен {compareValueOrProperty}'
                    break
                case '!==':
                    this.message = '{property} не должен быть равен {compareValueOrProperty}'
                    break
                case '>':
                    this.message = '{property} должен быть больше {compareValueOrProperty}'
                    break
                case '>=':
                    this.message = '{property} должен быть больше или равен {compareValueOrProperty}'
                    break
                case '<':
                    this.message = '{property} должен быть меньше {compareValueOrProperty}'
                    break
                case '<=':
                    this.message = '{property} должен быть меньше или равен {compareValueOrProperty}'
                    break
                default:
                    throw new Error(`Неизвестный оператор: ${this.operator}`)
            }
        }
    }

    _validateProperty(property, value)
    {
        if (Array.isArray(value)) {
            this.addError(property, `${property} имеет не правильное значение`)
            return;
        }

        let compareValue, compareProperty, compareValueOrProperty = null

        if (this.compareValue != null) {
            compareValue = compareProperty = compareValueOrProperty = this.compareValue
        } else {
            compareProperty = compareValueOrProperty = this.compareProperty ?? property + '_repeat'
            compareValue    = this.getValue(compareProperty)
        }

        if (!this._compareValues(this.operator, this.type, value, this.compareValue)) {
            this.addError(property, this.message
                    .replace('{compareProperty}', compareProperty)
                    .replace('{compareValue}', this.compareValue)
                    .replace('{compareValueOrProperty}', this.compareValueOrProperty)
            )
        }
    }

    _compareValues(operator, type, value, compareValue)
    {
        if (type === CompareValidator.TYPE_NUMBER) {
            value = +value
            compareValue = +compareValue
        } else {
            value = '' + value
            compareValue = '' + compareValue
        }

        switch (operator) {
            case '==':
                return value == compareValue
            case '===':
                return value === compareValue
            case '!=':
                return value != compareValue
            case '!==':
                return value !== compareValue
            case '>':
                return value > compareValue
            case '>=':
                return value >= compareValue
            case '<':
                return value < compareValue
            case '<=':
                return value <= compareValue
            default:
                return false
        }
    }
}