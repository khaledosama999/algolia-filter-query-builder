/* eslint-disable constructor-super */
/* eslint-disable class-methods-use-this */
import { LogicalOperator } from './abstract';

class AndOperator extends LogicalOperator {
  public exec() {
    return this.values
      .map((operator) => operator.exec())
      .join(' AND ');
  }

  public validate() {
    return true;
  }
}

export default AndOperator;
