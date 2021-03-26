/* eslint-disable class-methods-use-this */
import { Operator } from './abstract';

class EqualOperator extends Operator {
  constructor(private fieldName:string, private value:string | number) {
    super();
  }

  exec() {
    // The equal operator "=" is only allowed with number else ":" should be used
    const [operator, newValue] = typeof this.value === 'number' ? ['=', this.value] : [':', `"${this.value}"`];

    return `${this.fieldName} ${operator} ${newValue}`;
  }

  validate() {
    return true;
  }
}

export default EqualOperator;
