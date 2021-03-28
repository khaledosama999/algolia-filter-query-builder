/* eslint-disable constructor-super */
/* eslint-disable class-methods-use-this */
import { LogicalOperator, Operator } from './abstract';
import NumericOperator from './abstract/numeric-operator';
import AndOperator from './and';
import BetweenOperator from './between';
import InOperator from './in';
import NonNumericEqual from './no-numeric-equal';
import TagOperator from './tag';

class OrOperator extends LogicalOperator {
  constructor(protected values: Operator []) {
    super(values, 'or');
  }

  public exec() {
    const orQuery = this.values
      .map((operator) => operator.exec())
      .join(' OR ');

    // Brackets are added to added higher priority when included with and
    return `( ${orQuery} )`;
  }

  public validate() {
    // So far algolia doesn't support ands inside of ors
    const hasAnd = this.values.some((value) => value instanceof AndOperator);
    if (hasAnd) throw new Error(`The ${this.operator} can not contain an and operator`);

    // A list of or-ed commands cannot have mix of tags, facet search and numeric operators
    const numericOperationsBucket = [NumericOperator, InOperator, BetweenOperator];
    const facetOperationsBucket = [NonNumericEqual];
    const tagsOperationsBucket = [TagOperator];

    const operationsBuckets = [numericOperationsBucket, facetOperationsBucket, tagsOperationsBucket];

    const operationsBucketSet = new Set();

    this.values.forEach((operator) => {
      operationsBuckets.forEach((bucket) => {
        bucket.forEach((operatorType:any) => {
          if (operator instanceof operatorType) operationsBucketSet.add(bucket);
        });
      });
    });

    if (operationsBucketSet.size > 1) {
      throw new Error(`The ${this.operator} cannot contain a mix of numeric, facet and tags operations`);
    }

    super.validate();
  }
}

export default OrOperator;
