
import BaseValidator from './BaseValidator'


export default class StringValidator extends BaseValidator
{
    constructor(owner, options)
    {
        super(owner, options)
        this.strict = options?.strict ?? true
        this.length = options?.length ?? null
        this.min = null
        this.max = null
        this.message  = options?.message ?? '{property} должен быть строкой'
        this.tooShort = null
        this.tooLong  = null
        this.notEqual = null
        
        if (Array.isArray(this.length)) {
            if (this.length[0]) {
                this.min = this.length[0]
            }
            if (this.length[1]) {
                this.max = this.length[1]
            }
            this.length = null
        }

        if (this.min === null && options?.min) {
            this.min = options?.min
        }

        if (this.max === null && options?.max) {
            this.max = options?.max
        }

        if (this.min != null) {
            this.tooShort = options?.tooShort ?? '{property} должен содержать минимум {min} символов'
        }

        if (this.max != null) {
            this.tooLong = options?.tooLong ?? '{property} должен содержать максимум {max} символов'
        }

        if (this.length != null && !this.notEqual) {
            this.notEqual = options?.notEqual ?? '{property} должен cодержать {length} символов'
        }
    }

    _validateProperty(property, value) 
    {
        if (this.strict && typeof value === 'number') {
            value = '' + value
        }

        if (typeof value !== 'string') {
            this.addError(property, this.message.replace('{property}', property))
            return
        }

        const length = value.length
        if (this.min !== null && length < this.min) {
            this.addError(property, this.tooShort
                .replace('{property}', property)
                .replace('{min}', this.min)
            )
            return
        }
        if (this.max !== null && length > this.max) {
            this.addError(property, this.tooLong
                .replace('{property}', property)
                .replace('{max}', this.max)
            )
            return
        }
        if (this.length !== null && length !== this.length) {
            this.addError(property, this.notEqual
                .replace('{property}', property)
                .replace('{length}', this.length)
            )
            return
        }
    }
}