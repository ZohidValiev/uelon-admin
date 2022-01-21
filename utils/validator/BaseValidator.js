
export default class BaseValidator
{
    constructor(owner, options)
    {
        this.owner       = owner
        this.skipOnEmpty = options?.skipOnEmpty ?? false
        this.isEmpty     = options?.isEmpty ?? null
        this.skipOnError = options?.skipOnError ?? true
        this.when        = options?.when ?? null
    }

    addError(property, message)
    {
        this.owner.addError(property, message)
    }

    getValue(property) 
    {
        return this.owner.getValue(property)
    }

    hasErrors(property)
    {
        return this.owner.hasErrors(property)
    }

    validate(property, value) 
    {
        if (this.skipOnEmpty && this._isEmpty(value) || this.skipOnError && this.hasErrors(property)) {
            return
        }

        if (typeof this.when === 'function' && !this.when(property, value, this)) {
            return
        }

        this._validateProperty(property, value)
    }

    _validateProperty(property, value)
    {
        throw new Error('Метод не поддерживатся')
    }

    _isEmpty(value)
    {
        if (typeof this.isEmpty === 'function') {
            return this.isEmpty.call(this, property, value)
        }

        return value === null 
            || value === undefined 
            || (Array.isArray(value) && value.length === 0) 
            || value === ''
    }
}