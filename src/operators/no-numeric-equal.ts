/* eslint-disable class-methods-use-this */
import { Operator } from './abstract';

class NonNumericEqual extends Operator {
  constructor(private fieldName:string, private value:string) {
    super('eq');
  }

  exec() {
    return `${this.fieldName} : "${this.value}"`;
  }

  validate() {
    return true;
  }
}

export default NonNumericEqual;
