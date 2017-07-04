
import { isAlpha, isLength } from 'validator'

export default str => {
  return isAlpha(str) && isLength(str, { min: 3, max: undefined })
}
