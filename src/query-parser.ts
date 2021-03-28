/* eslint-disable class-methods-use-this */
import { Operator } from './operators/abstract';
import {
  AndOperator,
  BetweenOperator,
  EqualFactory,
  GreaterThanOperator,
  GreaterThanOrEqualOperator,
  LessThanOperator,
  LessThanOrEqualOperator,
  NotEqualOperator,
  NotOperator,
  OrOperator,
} from './operators';

import { Query } from './types/query';
import InOperator from './operators/in';
import TagOperator from './operators/tag';

class AlgoliaQueryParser {
  private query:any;

  constructor(query:Query) {
    this.query = query;
  }

  private parseQuery(fieldName:string, value:any, parentFieldName?:any): Operator {
    switch (fieldName) {
      case 'and': {
        const operators = value.map((query:any) => {
          const queryKeys = Object.keys(query);
          return this.parseQuery(queryKeys[0], query[queryKeys[0]]);
        });

        return new AndOperator(operators);
      }

      case 'or': {
        const operators = value.map((query:any) => {
          const queryKeys = Object.keys(query);
          return this.parseQuery(queryKeys[0], query[queryKeys[0]]);
        });

        return new OrOperator(operators);
      }

      case 'not': {
        const objectKeys = Object.keys(value);

        const operators = objectKeys.map((key:any) => this.parseQuery(key, value[key], parentFieldName));

        return new NotOperator(operators);
      }

      case 'gte':
        return new GreaterThanOrEqualOperator(parentFieldName, value);

      case 'gt':
        return new GreaterThanOperator(parentFieldName, value);

      case 'lte':
        return new LessThanOrEqualOperator(parentFieldName, value);

      case 'lt':
        return new LessThanOperator(parentFieldName, value);

      case 'between':
        return new BetweenOperator(parentFieldName, value);

      case 'in': {
        const equalOperators = value.map((arrayValue:any) => EqualFactory(parentFieldName, arrayValue));
        return new InOperator(equalOperators);
      }

      case 'eq':
        return EqualFactory(parentFieldName, value);

      case 'ne':
        return new NotEqualOperator(parentFieldName, value);

      case '_tags':
        return new TagOperator(value);

        // The key is an attribute name not an operator
      default: {
        // Custom attributes can have either primitive or object data types
        if (typeof value !== 'object') {
          return EqualFactory(fieldName, value);
        }

        const queryKeys = Object.keys(value);

        const operations = queryKeys.map((operator) => this.parseQuery(operator, value[operator], fieldName));

        // if The operations size is one no need to wrap it inside and and operator
        if (operations.length === 1) return operations[0];

        return new AndOperator(operations);
      }
    }
  }

  private buildQueryTree() {
    const queryKeys = Object.keys(this.query);

    // Wrap the top level queries by an AND array, by default top level queries are AND-ed
    const topLevelQueries = queryKeys.map((key) => ({ [key]: this.query[key] }));

    return this.parseQuery('and', topLevelQueries);
  }

  public exec() {
    const rootOperator = this.buildQueryTree();
    rootOperator.validate();

    return rootOperator.exec();
  }
}

export default AlgoliaQueryParser;
