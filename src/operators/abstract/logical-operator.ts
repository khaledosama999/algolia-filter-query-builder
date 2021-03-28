import Operator from './base';

abstract class LogicalOperator extends Operator {
  constructor(protected values: Operator [], operator: string) {
    super(operator);
  }

  public validate() {
    this.values.forEach((operator) => operator.validate());
  }
}

export default LogicalOperator;
