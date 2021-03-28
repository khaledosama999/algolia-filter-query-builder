import { expect } from 'chai';

import AlgoliaQueryBuilder from '../src';

describe('query validation', () => {
  it('numeric operators only accept numeric values', () => {
    const randomString:any = '13';

    const algoliaQueryBuilder = new AlgoliaQueryBuilder({
      x: { gte: randomString },
    });

    expect(() => algoliaQueryBuilder.exec()).to.throw();
  });

  it('Not does not accept and operator', () => {
    const xOperations:any = { not: { and: [{ y: 3 }] } };

    const algoliaQueryBuilder = new AlgoliaQueryBuilder({
      x: xOperations,
    });

    expect(() => algoliaQueryBuilder.exec()).to.throw();
  });

  it('Not does not accept or operator', () => {
    const xOperations:any = { not: { or: [{ y: 3 }] } };

    const algoliaQueryBuilder = new AlgoliaQueryBuilder({
      x: xOperations,
    });

    expect(() => algoliaQueryBuilder.exec()).to.throw();
  });

  it('Or does not accept and operator', () => {
    const orOperations:any = [{ and: [{ x: 3 }] }];

    const algoliaQueryBuilder = new AlgoliaQueryBuilder({
      or: orOperations,
    });

    expect(() => algoliaQueryBuilder.exec()).to.throw();
  });

  it('Or does not accept and operator', () => {
    const orOperations:any = [{ and: [{ x: 3 }] }];

    const algoliaQueryBuilder = new AlgoliaQueryBuilder({
      or: orOperations,
    });

    expect(() => algoliaQueryBuilder.exec()).to.throw();
  });

  it('Or does not accept mix of numeric and tags operator', () => {
    const orOperations:any = [{ _tags: '1123' }, { x: { gte: 3 } }];

    const algoliaQueryBuilder = new AlgoliaQueryBuilder({
      or: orOperations,
    });

    expect(() => algoliaQueryBuilder.exec()).to.throw();
  });

  it('Or does not accept mix of numeric and facet operator', () => {
    const orOperations:any = [{ y: '1123' }, { x: { gte: 3 } }];

    const algoliaQueryBuilder = new AlgoliaQueryBuilder({
      or: orOperations,
    });

    expect(() => algoliaQueryBuilder.exec()).to.throw();
  });

  it('Or does not accept mix of tags and facet operator', () => {
    const orOperations:any = [{ _tags: '1123' }, { x: '123' }];

    const algoliaQueryBuilder = new AlgoliaQueryBuilder({
      or: orOperations,
    });

    expect(() => algoliaQueryBuilder.exec()).to.throw();
  });
});
