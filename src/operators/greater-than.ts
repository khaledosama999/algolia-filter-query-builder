/* eslint-disable class-methods-use-this */
import NumericOperator from './abstract/numeric-operator';

class GreaterThanOperator extends NumericOperator {
  exec() {
    return `${this.fieldName} > ${this.value}`;
  }
}

export default GreaterThanOperator;
