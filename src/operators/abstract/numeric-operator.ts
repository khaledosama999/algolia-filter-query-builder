/* eslint-disable class-methods-use-this */
import Operator from './base';

abstract class NumericOperator extends Operator {
  constructor(protected fieldName: string, protected value: number) {
    super();
  }

  public validate() {
    return true;
  }
}

export default NumericOperator;
