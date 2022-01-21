
import BaseValidator from './BaseValidator'


export default class UrlValidator extends BaseValidator
{
    pattern = '/^{schemes}:\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(?::\d{1,5})?(?:$|[?\/#])/i'

    constructor(owner, options)
    {
        super(owner, options)
        this.validSchemes  = options?.validSchemes ?? ['http', 'https']
        this.defaultScheme = options?.defaultScheme
        this.message       = options?.message ?? '{property} не является правильным URL'
    }

    validate(property, value)
    {
        if (typeof value === 'string' && value.length < 2000) {
            if (this.defaultScheme != null && !value.includes('://')) {
                value = `${this.defaultScheme}://${value}`
            }

            let pattern = this.pattern.toString()

            if (this.pattern.toString().includes('{schemes}')) {
                pattern = pattern.replace('{schemes}', `(${this.validSchemes.join('|')})`)
            }

            pattern = new RegExp(pattern.substring(1, pattern.length - 1))

            if (pattern.test(value)) {
                return
            }
        }

        this.addError(property, this.message.replace('{property}', property))
    }
}