/* eslint-disable constructor-super */
/* eslint-disable class-methods-use-this */
import { Operator } from './abstract';
import AndOperator from './and';

class InOperator extends Operator {
  constructor(private value: Operator[]) {
    super();
  }

  public exec() {
    // In operator resembles and and exactly
    const andOperator = new AndOperator(this.value);
    return andOperator.exec();
  }

  public validate() {
    return true;
  }
}

export default InOperator;
