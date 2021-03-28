/* eslint-disable class-methods-use-this */
import Operator from './base';

abstract class NumericOperator extends Operator {
  constructor(protected fieldName: string, protected value: number, operator:string) {
    super(operator);
  }

  public validate() {
    if (typeof this.value !== 'number') { throw new Error(`The ${this.operator} accepts numeric values only`); }
  }
}

export default NumericOperator;
