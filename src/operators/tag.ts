/* eslint-disable class-methods-use-this */
import { Operator } from './abstract';

class TagOperator extends Operator {
  constructor(private value:string | number) {
    super('_tags');
  }

  exec() {
    return `_tags : "${this.value}"`;
  }

  validate() {
    return true;
  }
}

export default TagOperator;
