import { expect } from 'chai';
import AlgoliaQueryParser from '../src/query-parser';

describe('Operators', () => {
  describe('Custom fields', () => {
    it('A custom field can be equal to number', () => {
      const queryParser = new AlgoliaQueryParser({
        field: 3,
      });

      const query = queryParser.exec();
      expect(query).to.eq('field = 3');
    });

    it('A custom field can be equal to string', () => {
      const queryParser = new AlgoliaQueryParser({
        field: 'str',
      });

      const query = queryParser.exec();
      expect(query).to.eq('field : "str"');
    });

    it('A custom field can be equal to an object', () => {
      const queryParser = new AlgoliaQueryParser({
        field: { lt: 3, gt: 1 },
      });

      const query = queryParser.exec();
      expect(query).to.eq('field < 3 AND field > 1');
    });

    it('A custom field can be equal to an object and contain a not', () => {
      const queryParser = new AlgoliaQueryParser({
        field: { not: { eq: 5 }, gt: 1 },
      });

      const query = queryParser.exec();
      expect(query).to.eq('(NOT field = 5) AND field > 1');
    });
  });

  describe('Conjunction and disjunction', () => {
    it('An and can contain multiple fields each equal to an object', () => {
      const queryParser = new AlgoliaQueryParser({
        and: [
          { field1: { gt: 1, lt: 3 } },
          { field2: { gt: 1, lt: 3 } },
        ],
      });

      const query = queryParser.exec();
      expect(query).to.eq('field1 > 1 AND field1 < 3 AND field2 > 1 AND field2 < 3');
    });

    it('An or can contain multiple fields each equal to an object', () => {
      const queryParser = new AlgoliaQueryParser({
        or: [
          { field1: { gt: 1 } },
          { field2: { gt: 1 } },
        ],
      });

      const query = queryParser.exec();
      expect(query).to.eq('( field1 > 1 OR field2 > 1 )');
    });

    it('An and can contain an or', () => {
      const queryParser = new AlgoliaQueryParser({
        and: [
          { field1: { gt: 1, lt: 3 } },
          { or: [{ field2: 3 }, { field3: 3 }] },
        ],
      });

      const query = queryParser.exec();
      expect(query).to.eq('field1 > 1 AND field1 < 3 AND ( field2 = 3 OR field3 = 3 )');
    });
  });
});
