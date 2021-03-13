/* eslint-disable no-use-before-define */
// Numeric operations
export type Equal = {'eq': Number};
export type NotEqual = {'ne': Number};

export type GreaterThan = {'gt': Number}
export type GreaterThanOrEqual = {'gte': Number}

export type SmallerThan = {'lt': Number}
export type SmallerThanOrEqual = {'lte': Number}

export type NumericOperation = Equal | NotEqual | GreaterThan | GreaterThanOrEqual | SmallerThan | SmallerThanOrEqual;

// Range operations
export type Between = {'between':[Number, Number]}

export type FieldOperations = NumericOperation | Between;

// Inversion
export type Not = {'not':FieldOperations}

export type FieldsObjectQuery = {[key:string]: FieldOperations | Not | String | Number}

// Conjunction and disjunction
export type Or = {'or': FieldsObjectQuery [] };
export type And = {'and': (FieldsObjectQuery | Or) [] };
