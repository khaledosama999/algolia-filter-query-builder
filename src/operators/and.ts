/* eslint-disable constructor-super */
/* eslint-disable class-methods-use-this */
import { LogicalOperator, Operator } from './abstract';

class AndOperator extends LogicalOperator {
  constructor(protected values: Operator []) {
    super(values, 'and');
  }

  public exec() {
    return this.values
      .map((operator) => operator.exec())
      .join(' AND ');
  }
}

export default AndOperator;
