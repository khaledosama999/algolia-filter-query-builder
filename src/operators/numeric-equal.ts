/* eslint-disable class-methods-use-this */
import { NumericalOperator } from './abstract';

class NumericEqual extends NumericalOperator {
  constructor(fieldName:string, value: number) {
    super(fieldName, value, 'eq');
  }

  exec() {
    return `${this.fieldName} = ${this.value}`;
  }
}

export default NumericEqual;
