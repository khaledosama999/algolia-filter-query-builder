# Npm Package Template

A template for creating npm packages that work for both node and the browser.

### Rollup 
Uses rollup to bundle the code for it to be executed in both the browser and node js 

### Husky
Has pre commit hooks for linting and running tests before any commits

### Commitizen
Uses commitizen for creating conventional commits

### Conventional Changelog
Automatic change log generation

### Eslint 
Uses the famous airbnb rules for linting

### Github workflows
Includes the appropriate workflows for running CI/CD for running tests and automatic publishing to npm.
Add repo secret `NPM_TOKEN` which should be equal to your npm token

### Scripts

- test: For running all the test files inside of the `tests` folder
- build: Building and bundling your package
- git-cz": Create a conventional commit
- release:major: Bump the major version of your package
- release:minor: Bump the minor version of your package
- release:path: Bump the patch version of your package