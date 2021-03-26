/* eslint-disable class-methods-use-this */
import Operator from './base';

abstract class RangeOperator extends Operator {
  constructor(protected fieldName: string, protected value: [number, number]) {
    super();
  }

  public validate() {
    return true;
  }
}

export default RangeOperator;
