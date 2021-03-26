/* eslint-disable constructor-super */
/* eslint-disable class-methods-use-this */
import { Operator } from './abstract';

class NotOperator extends Operator {
  constructor(private values: Operator []) {
    super();
  }

  public exec() {
    const notQuery = this.values
      .map((operator) => operator.exec())
      .map((operatorQuery) => `(NOT ${operatorQuery})`)
      .join(' AND ');

    return notQuery;
  }

  public validate() {
    return true;
  }
}

export default NotOperator;
