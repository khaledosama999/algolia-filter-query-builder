/* eslint-disable constructor-super */
/* eslint-disable class-methods-use-this */
import { LogicalOperator, Operator } from './abstract';

class NotOperator extends Operator {
  constructor(private values: Operator []) {
    super('not');
  }

  public exec() {
    const notQuery = this.values
      .map((operator) => operator.exec())
      .map((operatorQuery) => `(NOT ${operatorQuery})`)
      .join(' AND ');

    return notQuery;
  }

  public validate() {
    const hasLogicalOperator = this.values.some((operator) => operator instanceof LogicalOperator);

    if (hasLogicalOperator) throw new Error(`The ${this.operator} can not contain logical operators (and, or)`);
  }
}

export default NotOperator;
