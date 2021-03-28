/* eslint-disable class-methods-use-this */
import { RangeOperator } from './abstract';

class BetweenOperator extends RangeOperator {
  constructor(protected fieldName: string, protected value: [number, number]) {
    super(fieldName, value, 'between');
  }

  exec() {
    return `${this.fieldName}: ${this.value[0]} TO ${this.value[1]}`;
  }
}

export default BetweenOperator;
