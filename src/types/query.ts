import {
  And,
  Or,
  FieldsObjectQuery,
} from './operators';

export type Query = And | Or | FieldsObjectQuery;
