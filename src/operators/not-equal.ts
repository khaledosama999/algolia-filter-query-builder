/* eslint-disable class-methods-use-this */
import NumericOperator from './abstract/numeric-operator';

class NotEqualOperator extends NumericOperator {
  exec() {
    return `${this.fieldName} != ${this.value}`;
  }
}

export default NotEqualOperator;
