
export default class Validator
{
    static _validators = new Map()

    _rules  = new Map()
    _errors = new Map()
    _values = new Map()

    static addValidator(name, validator)
    {
        Validator._validators.set(name, validator)
        return Validator
    }

    validate(...properties)
    {
        this.clearErrors()

        if (properties.length === 0) {
            properties = this._values.keys()
        }

        let isValid = true
        for (let property of properties) {
            isValid = this._validateProperty(property) && isValid
        }

        return isValid
    }

    _validateProperty(property)
    {
        const value      = this.getValue(property)
        const rules      = this.getRule(property)
        const validators = []

        for (let [ruleName, options] of Object.entries(rules)) {
            const validator = this._createValidator(ruleName, options)
            validators.push(validator)
        }

        for (const validator of validators) {
            validator.validate(property, value)
        }

        return !this.hasErrors(property)
    }

    _createValidator(ruleName, options)
    {
        const validatorClass = Validator._validators.get(ruleName)
        
        if (validatorClass == undefined) {
            throw new Error(`Валидатор ${ruleName} не найден`)
        }

        return new validatorClass(this, options)
    }

    hasErrors(property) 
    {
        if (property == undefined) {
            return this._errors.size > 0
        }

        return this._errors.has(property)
    }

    clearErrors()
    {
        this._errors.clear()

        return this
    }

    getFirstError(property)
    {
        if (this._errors.has(property)) {
            return this._errors.get(property)[0]
        }

        return undefined
    }

    getFirstErrors()
    {
        const errors = {}

        this._errors.forEach((messages, property) => {
            errors[property] = messages[0]
        })

        return errors
    }

    getErrors()
    {
        const errors = {};

        this._errors.forEach((messages, property) => {
            errors[property] = [...messages]
        })

        return errors
    }

    addError(property, message)
    {
        if (!this._errors.has(property)) {
            this._errors.set(property, [])
        }

        this._errors.get(property).push(message)

        return this
    }

    hasProperty(property) {
        return this._values.has(property)
    }

    deleteProperty(property) {
        this._values.delete(property)
        this._rules.delete(property)
        this._errors.delete(property)
        return this;
    }

    deleteProperties(...properties) {
        for (let property of properties) {
            this.deleteProperty(property)
        }
        return this
    }   

    getValue(property)
    {
        if (this._values.has(property)) {
            return this._values.get(property)()
        }
        
        throw new Error(`Аргмент property со значением "${property}" не существует`)
    }

    setValue(property, callback)
    {
        if (typeof property !== 'string' || property.trim() === '') {
            throw new Error('Аргумент property должен быть не пустой строкой')
        }

        if (typeof callback !== 'function') {
            throw new Error('Аргумент callback должен быть функцией')
        }

        this._values.set(property, callback)
        this._errors.delete(property)

        return this
    }

    setValues(values) 
    {
        if (this._isEmptyObject(values)) {
            throw new Error('Аргумент values не должен быть пустым обектом')
        }

        for (let [property, value] of Object.entries(values)) {
            this.setValue(property, value)
        }

        return this;
    }

    getRule(property) {
        if (this._rules.has(property)) {
            return this._rules.get(property)
        }

        throw new Error(`Аргумент property со значением "${property}"" не существует`)
    }

    setRule(property, rules)
    {
        if (typeof property !== 'string' || property.trim() === '') {
            throw new Error('Аргумент property не должен быть пустой строкой')
        }

        if (this._isEmptyObject(rules)) {
            throw new Error('Аргумент rules не должен быть пустым обектом')
        }

        this._rules.set(property, rules)
        this._errors.delete(property)

        return this
    }

    setRules(rules)
    {
        if (this._isEmptyObject(rules)) {
            throw new Error('Аргумент rules не должен быть пустым обектом')
        }

        for (let [_property, _rules] of Object.entries(rules)) {
            this.setRule(_property, _rules)
        }

        return this
    }

    _isEmptyObject(value) {
        for (let v in value) {
            return false
        }
        return true;
    }
}