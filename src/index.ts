/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import {
  Query,
} from './types/query';

class AlgoliaQueryBuilder {
    private query:any;

    constructor(query:Query) {
      this.query = query;
    }

    private buildEqual(fieldName:string, value:Number) {
      return `${fieldName} = ${value}`;
    }

    private buildNotEqual(fieldName:string, value:Number) {
      return `${fieldName} != ${value}`;
    }

    private buildSmallerThan(fieldName:string, value:Number) {
      return `${fieldName} < ${value}`;
    }

    private buildSmallerThanOrEqual(fieldName:string, value:Number) {
      return `${fieldName} <= ${value}`;
    }

    private buildGreaterThan(fieldName:string, value:Number) {
      return `${fieldName} > ${value}`;
    }

    private buildGreaterThanOrEqual(fieldName:string, value:Number) {
      return `${fieldName} >= ${value}`;
    }

    private buildBetween(fieldName:string, value:[Number, Number]) {
      return `${fieldName}: ${value[0]} TO ${value[1]}`;
    }

    private buildQuery(fieldName:string, value:any, parentFieldName?:any): string {
      let parsedQuery:string;

      switch (fieldName) {
        case 'and':
          parsedQuery = value
            .map((query:any) => {
              const queryKeys = Object.keys(query);
              return this.buildQuery(queryKeys[0], query[queryKeys[0]]);
            })
            .join(' AND ');
          break;

        case 'or':
          parsedQuery = value
            .map((query:any) => {
              const queryKeys = Object.keys(query);
              return this.buildQuery(queryKeys[0], query[queryKeys[0]]);
            })
            .join(' OR ');

          parsedQuery = `(${parsedQuery})`;
          break;

        case 'not': {
          const objectKeys = Object.keys(value);

          parsedQuery = objectKeys
            .map((key:any) => {
              const queryString = this.buildQuery(key, value[key], parentFieldName);

              return `NOT ${queryString}`;
            })
            .join(' AND ');

          parsedQuery = `(${parsedQuery})`;
          break;
        }

        case 'gte':
          parsedQuery = this.buildGreaterThanOrEqual(parentFieldName, value);
          break;

        case 'gt':
          parsedQuery = this.buildGreaterThan(parentFieldName, value);
          break;

        case 'lte':
          parsedQuery = this.buildSmallerThanOrEqual(parentFieldName, value);
          break;

        case 'lt':
          parsedQuery = this.buildSmallerThan(parentFieldName, value);
          break;

        case 'between':
          parsedQuery = this.buildBetween(parentFieldName, value);
          break;

        case 'eq':
          parsedQuery = this.buildEqual(parentFieldName, value);
          break;

        case 'ne':
          parsedQuery = this.buildNotEqual(parentFieldName, value);
          break;

          // The key is an attribute name not an operator
        default: {
          // Custom attributes can have either primitive or object data types
          if (typeof value !== 'object') {
            parsedQuery = `${fieldName} : ${value}`;
            break;
          }

          const queryKeys = Object.keys(value);

          parsedQuery = queryKeys
            .map((operator) => this.buildQuery(operator, value[operator], fieldName))
            .join(' AND ');

          break;
        }
      }

      return parsedQuery;
    }

    public exec() {
      const queryKeys = Object.keys(this.query);

      // Wrap the top level queries by an AND array, by default top level queries are AND-ed
      const topLevelQueries = queryKeys.map((key) => ({ [key]: this.query[key] }));

      return this.buildQuery('AND', topLevelQueries);
    }
}

export default AlgoliaQueryBuilder;
