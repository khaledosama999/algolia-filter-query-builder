import { expect } from 'chai';
import AlgoliaQueryBuilder from '../src/index';

describe('Operators', () => {
  it('eq', () => {
    const queryBuilder = new AlgoliaQueryBuilder({
      field: { eq: 3 },
    });

    const query = queryBuilder.exec();
    expect(query).to.eq('field = 3');
  });

  it('ne', () => {
    const queryBuilder = new AlgoliaQueryBuilder({
      field: { ne: 3 },
    });

    const query = queryBuilder.exec();
    expect(query).to.eq('field != 3');
  });

  it('gt', () => {
    const queryBuilder = new AlgoliaQueryBuilder({
      field: { gt: 3 },
    });

    const query = queryBuilder.exec();
    expect(query).to.eq('field > 3');
  });

  it('gte', () => {
    const queryBuilder = new AlgoliaQueryBuilder({
      field: { gte: 3 },
    });

    const query = queryBuilder.exec();
    expect(query).to.eq('field >= 3');
  });

  it('lt', () => {
    const queryBuilder = new AlgoliaQueryBuilder({
      field: { lt: 3 },
    });

    const query = queryBuilder.exec();
    expect(query).to.eq('field < 3');
  });

  it('lte', () => {
    const queryBuilder = new AlgoliaQueryBuilder({
      field: { lte: 3 },
    });

    const query = queryBuilder.exec();
    expect(query).to.eq('field <= 3');
  });

  it('between', () => {
    const queryBuilder = new AlgoliaQueryBuilder({
      field: { between: [1, 2] },
    });

    const query = queryBuilder.exec();
    expect(query).to.eq('field: 1 TO 2');
  });

  it('not', () => {
    const queryBuilder = new AlgoliaQueryBuilder({
      field: { not: { eq: 3 } },
    });

    const query = queryBuilder.exec();
    expect(query).to.eq('(NOT field = 3)');
  });

  it('or', () => {
    const queryBuilder = new AlgoliaQueryBuilder({
      or: [
        { field1: { eq: 3 } },
        { field2: { eq: 4 } },
      ],
    });

    const query = queryBuilder.exec();
    expect(query).to.eq('(field1 = 3 OR field2 = 4)');
  });

  it('and', () => {
    const queryBuilder = new AlgoliaQueryBuilder({
      and: [
        { field1: { eq: 3 } },
        { field2: { eq: 4 } },
      ],
    });

    const query = queryBuilder.exec();
    expect(query).to.eq('field1 = 3 AND field2 = 4');
  });
});
