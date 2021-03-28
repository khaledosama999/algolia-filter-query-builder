import { expect } from 'chai';

import AlgoliaQueryParser from '../src/query-parser';

describe('query parser', () => {
  it('eq', () => {
    const queryParser = new AlgoliaQueryParser({
      field: { eq: 3 },
    });

    const query = queryParser.exec();
    expect(query).to.eq('field = 3');
  });

  it('ne', () => {
    const queryParser = new AlgoliaQueryParser({
      field: { ne: 3 },
    });

    const query = queryParser.exec();
    expect(query).to.eq('field != 3');
  });

  it('gt', () => {
    const queryParser = new AlgoliaQueryParser({
      field: { gt: 3 },
    });

    const query = queryParser.exec();
    expect(query).to.eq('field > 3');
  });

  it('gte', () => {
    const queryParser = new AlgoliaQueryParser({
      field: { gte: 3 },
    });

    const query = queryParser.exec();
    expect(query).to.eq('field >= 3');
  });

  it('lt', () => {
    const queryParser = new AlgoliaQueryParser({
      field: { lt: 3 },
    });

    const query = queryParser.exec();
    expect(query).to.eq('field < 3');
  });

  it('lte', () => {
    const queryParser = new AlgoliaQueryParser({
      field: { lte: 3 },
    });

    const query = queryParser.exec();
    expect(query).to.eq('field <= 3');
  });

  it('_tags', () => {
    const queryParser = new AlgoliaQueryParser({
      _tags: '123',
    });

    const query = queryParser.exec();
    expect(query).to.eq('_tags : "123"');
  });

  it('between', () => {
    const queryParser = new AlgoliaQueryParser({
      field: { between: [1, 2] },
    });

    const query = queryParser.exec();
    expect(query).to.eq('field: 1 TO 2');
  });

  it('not', () => {
    const queryParser = new AlgoliaQueryParser({
      field: { not: { eq: 3 } },
    });

    const query = queryParser.exec();
    expect(query).to.eq('(NOT field = 3)');
  });

  it('or', () => {
    const queryParser = new AlgoliaQueryParser({
      or: [
        { field1: { eq: 3 } },
        { field2: { eq: 4 } },
      ],
    });

    const query = queryParser.exec();
    expect(query).to.eq('( field1 = 3 OR field2 = 4 )');
  });

  it('and', () => {
    const queryParser = new AlgoliaQueryParser({
      and: [
        { field1: { eq: 3 } },
        { field2: { eq: 4 } },
      ],
    });

    const query = queryParser.exec();
    expect(query).to.eq('field1 = 3 AND field2 = 4');
  });

  it('in', () => {
    const queryParser = new AlgoliaQueryParser({
      field: { in: [1, 2] },
    });

    const query = queryParser.exec();
    expect(query).to.eq('field = 1 AND field = 2');
  });
});
