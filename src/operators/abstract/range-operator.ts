/* eslint-disable class-methods-use-this */
import Operator from './base';

abstract class RangeOperator extends Operator {
  constructor(protected fieldName: string, protected value: [number, number], operator:string) {
    super(operator);
  }

  public validate() {
    const allAreNumeric = this.value.every((number) => typeof number === 'number');

    if (!allAreNumeric) throw new Error(`The ${this.operator} accepts only array of numeric values`);
  }
}

export default RangeOperator;
