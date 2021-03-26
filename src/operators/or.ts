/* eslint-disable constructor-super */
/* eslint-disable class-methods-use-this */
import { LogicalOperator } from './abstract';

class OrOperator extends LogicalOperator {
  public exec() {
    const orQuery = this.values
      .map((operator) => operator.exec())
      .join(' OR ');

    // Brackets are added to added higher priority when included with and
    return `( ${orQuery} )`;
  }

  public validate() {
    return true;
  }
}

export default OrOperator;
