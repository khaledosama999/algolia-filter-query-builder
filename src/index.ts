/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import AlgoliaQueryParser from './query-parser';
import {
  Query,
} from './types/query';

class AlgoliaQueryBuilder {
    private algoliaQueryParser: AlgoliaQueryParser

    constructor(query:Query) {
      this.algoliaQueryParser = new AlgoliaQueryParser(query);
    }

    public exec() {
      return this.algoliaQueryParser.exec();
    }
}

export default AlgoliaQueryBuilder;
