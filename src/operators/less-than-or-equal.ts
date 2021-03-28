/* eslint-disable class-methods-use-this */
import NumericOperator from './abstract/numeric-operator';

class LessThanOrEqualOperator extends NumericOperator {
  constructor(protected fieldName: string, protected value: number) {
    super(fieldName, value, '<=');
  }

  exec() {
    return `${this.fieldName} <= ${this.value}`;
  }
}

export default LessThanOrEqualOperator;
