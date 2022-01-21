
import NumberValidator from "./NumberValidator";


export default class IntegerValidator extends NumberValidator
{
    constructor(owner, options)
    {
        super(owner, {...options, ...{ integerOnly: true }})
    }
}