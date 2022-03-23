/* eslint-disable constructor-super */
/* eslint-disable class-methods-use-this */
import { Operator } from './abstract';
import OrOperator from './or';

class InOperator extends Operator {
  constructor(private value: Operator[]) {
    super('in');
  }

  public exec() {
    // In operator resembles and and exactly
    const orOperator = new OrOperator(this.value);
    return orOperator.exec();
  }

  public validate() {
    return true;
  }
}

export default InOperator;
