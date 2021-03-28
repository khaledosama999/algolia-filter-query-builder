# Algolia Filters Query Builder 

A parser for having a structured way for querying algolia similar to well known ODMs or ORMS.

## Installation
```
npm i algolia-search-builder
```
  - [Installation](#installation)
  - [Motivation](#motivation)
  - [Usage](#usage)
  - [Operators](#operators)
    - [Numeric](#numeric)
      * [eq](#eq)
      * [ne](#ne)
      * [gt](#gt)
      * [gte](#gte)
      * [lt](#lt)
      * [lte](#lte)
      * [between](#between)
      * [in](#in)
    - [Logical](#logical)
      * [not](#not)
      * [or](#or)
      * [and](#and)
  - [Advanced Usage Examples](#advanced-usage-examples)
  - [General Notes](#general-notes)

## Motivation

Currently Algolia supports **string format only** for filtering the search results, which doesn't seem very functional for making complex dynamic queries (probably by string concatenation), which requires you to memorize the built in algolia operators. Using the algolia query builder making dynamic filter queries is easier and similar to sequelize and mongoose.

## Usage

```js
const algoliaQueryBuilder = new AlgoliaQueryBuilder({
   x:{lt:3, gte:1},
   y:{between:[1,2]} 
});

const filterQuery = algoliaQueryBuilder.exec(); // 'x < 3 AND x >= 1 AND y: 1 TO 2'

const results = algoliaIndex.search("str",{
    filters: filterQuery
});

```
## Operators
- ### Numeric 
  Operators used with **numeric** values only
   - #### eq 
    
     Checks if a field equals to the given value
    ```json
    { x: { eq: 3 } }
    ```
   - #### ne 
    
     Checks if a field is not equal to the given value
    ```json
    { x: { ne: 3 } }
    ```
   - #### gt  
    Checks if a field is greater than the given value
    ```json
    { x: { gt: 3 } }
    ```
   - #### gte
    Checks if a field is greater than or equal the given value
    ```json
    { x: { gt: 3 } }
    ```
   - #### lt  
    Checks if a field is less than the given value
    ```json
    { x: { lt: 3 } }
    ```
   - #### lte
    Checks if a field is less than or equal the given value
    ```json
    { x: { lt: 3 } }
    ```
   - #### between
    Checks if a field is between the two given values (inclusive)
    ```json
    { x: { between: [1,2] } }
    ```
****   - #### in 
    Checks if a field is in the array of given values (can contain strings or number)
    ```json
    { x: { in: [1,2,3] } }
    ```
- ### Logical 
   - #### not
    Negates the given query 
   ```json
   { x: { not: { between:[ 1 , 2] } } }
   ``` 
   - #### or
   returns results that satisfy at least one of the given conditions
   ```json
   { or:
    [
       { x: { eq:1 } }, 
       { y: { eq:2 } }, 
    ]
   }
   ```  
   - #### and
   returns results that satisfy at all of the given conditions
   ```json
   { and:
    [
       { x: { eq:1 } }, 
       { y: { eq:2 } }, 
    ]
   }
   ```
### Advanced Usage Examples

   ```js
    // Field don't have to use operators they can be equal to a value right away
    const algoliaQueryBuilder1 = new AlgoliaQueryBuilder({ x:3, y: "str" });

    // An and can contain an or 
    const algoliaQueryBuilder2 = new AlgoliaQueryBuilder({
        and:[
            {x:3},
            {or:[{y:4},{z:5}]}
        ]
    });

    // By default all the provided field queries are anded
     const algoliaQueryBuilder2 = new AlgoliaQueryBuilder({
         x:{
             gt:3,
             lt:6
         }
     }); // Return results with x greater than 3 and less than 6
   ```
     
### General Notes

- The query builder validates the query after parsing and before returning the query string the limitations and constraints of the query builder are mostly related to the limitations given by [algolia](https://www.algolia.com/doc/api-reference/api-parameters/filters/#boolean-operators)
  
- To use `_tags` for filtering just add the a custom field with name `_tags` and pass it the value
  ```json
  {_tags:"published"}
  ```