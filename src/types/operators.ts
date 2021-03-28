/* eslint-disable no-use-before-define */
// Numeric operations

export type Equal = {
    /**
     * Used to match **numeric** values with given field
     *
     *  ```json
     *  { field: { eq: 3 } }
     *  ```
     *  OR
     * ```json
     *  { field: 3 }
     * ```
     */
    'eq': Number
};

export type NotEqual = {
    /**
     * Used to find documents withe the provided field **not equal** to the provided **numeric** value
     *
     *  ```json
     *  { field: { ne: 3 } }
     *  ```
     */
    'ne': Number
};

export type GreaterThan = {
    /**
     * Used to find documents with the provided field **greater than** the provided **numeric** value
     *
     *  ```json
     *  { field: { gt: 3 } }
     *  ```
     */
    'gt': Number
}

export type GreaterThanOrEqual = {
    /**
     * Used to find documents with the provided field **greater than or equal** the provided **numeric** value
     *
     *  ```json
     *  { field: { gte: 3 } }
     *  ```
     */
    'gte': Number
};

export type SmallerThan = {
    /**
     * Used to find documents with the provided field **smaller than** the provided **numeric** value
     *
     *  ```json
     *  { field: { lt: 3 } }
     *  ```
     */
    'lt': Number
};

export type SmallerThanOrEqual = {
    /**
     * Used to find documents with the provided field **smaller than or equal** the provided **numeric** value
     *
     *  ```json
     *  { field: { lte: 3 } }
     *  ```
     */
    'lte': Number
};

export type NumericOperation = Equal | NotEqual | GreaterThan | GreaterThanOrEqual | SmallerThan | SmallerThanOrEqual;

export type NonNumericEqual = {
    /**
     * Used to find documents with the provided field **equal** the provided **string** value
     *
     *  ```json
     *  { field: { eq: "string" } }
     *  ```
     */
    'eq':string
};

// Range operations
export type Between = {
    /**
     * Used to find documents with the provided field **between** the provided **numeric** pair of values
     *
     *  ```json
     *  { field: { between: [1,10] } }
     *  ```
     */
    'between':[Number, Number]
};

export type In = {
    /**
     * Used to find documents with the provided field **in** the provided **numeric** values
     *
     *  ```json
     *  { field: { in: [1,2,3] } }
     *  ```
     */
    'in':(number | string)[]
}

export type FieldOperations = NumericOperation | Between | In | NonNumericEqual;

// Inversion
export type Not = {
    /**
     * Used to find documents that **don't match** the provided query
     *
     *  ```json
     *  { field: { not: { eq: 3 } } }
     *  ```
     *
     * ### Notes
     * - Cannot negate a disjunction or conjunction of a group of queries:
     * ```json
     * { field: { not: { or: [{ eq: 1 }, { eq: 2 } ] } } }
     * ```
     *
     * Check this [link](https://www.algolia.com/doc/api-reference/api-parameters/filters/)
     * for more info about algolia filter constraints
     */
    'not':FieldOperations
};

export type FieldsObjectQuery = { [key:string]: FieldOperations | Not | String | Number}

// Conjunction and disjunction
export type Or = {
    /**
     * Used to find documents that **match at least one** of the provided queries
     *
     *  ```json
     *  { or: [ { field1: 3 }, {field2: 4} ] }
     *  ```
     *
     * ### Notes
     * - Cannot mix between facet, numeric and tags filters
     * ```json
     * {
     *   or :
     *    [
     *      { field1: 3 }, // numeric query
     *      { field2: "string"}, // facet query
     *      { _tags:"tag" }, // tag query
     *    ]
     * }
     * ```
     * Check this [link](https://www.algolia.com/doc/api-reference/api-parameters/filters/)
     * for more info about algolia filter constraints
     */
    'or': FieldsObjectQuery []
};

export type And = {
    /**
     * Used to find documents that **match all** of the provided queries
     *
     *  ```json
     *  { and: [ { field1: 3 }, {field2: 4} ] }
     *  ```
     */
    'and': (FieldsObjectQuery | Or) []
};
