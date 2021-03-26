/* eslint-disable class-methods-use-this */
import NumericOperator from './abstract/numeric-operator';

class GreaterThanOrEqualOperator extends NumericOperator {
  exec() {
    return `${this.fieldName} >= ${this.value}`;
  }
}

export default GreaterThanOrEqualOperator;
