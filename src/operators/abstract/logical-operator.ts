import Operator from './base';

abstract class LogicalOperator extends Operator {
  constructor(protected values: Operator []) {
    super();
  }
}

export default LogicalOperator;
