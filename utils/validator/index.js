
import Validator from './Validator'
import EmptyValidator from './EmptyValidator'
import NotEmptyValidator from './NotEmptyValidator'
import BooleanValidator from './BooleanValidator'
import EmailValidator from './EmailValidator'
import NumberValidator from './NumberValidator'
import IntegerValidator from './IntegerValidator'
import RangeValidator from './RangeValidator'
import CompareValidator from './CompareValidator'
import StringValidator from './StringValidator'
import RegularExpressionValidator from './RegularExpressionValidator'
import UrlValidator from './UrlValidator'


Validator
    .addValidator('empty', EmptyValidator)
    .addValidator('notEmpty', NotEmptyValidator)
    .addValidator('boolean', BooleanValidator)
    .addValidator('email', EmailValidator)
    .addValidator('number', NumberValidator)
    .addValidator('integer', IntegerValidator)
    .addValidator('range', RangeValidator)
    .addValidator('compare', CompareValidator)
    .addValidator('string', StringValidator)
    .addValidator('mutch', RegularExpressionValidator)
    .addValidator('url', UrlValidator)

export default Validator