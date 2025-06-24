# Building Pict

These commands build and package the minified and nonminified versions into `dist/` with
source maps.

```shell
npm run build
npm run build-compatible
```

## Typescript Types

Pict is built in pure javascript, and therefore does not have native typescript types.  It is documented with jsdoc, so can generate types though and help with autocomplete and modern type check linting features of most code editors.

To build types, simply run the following from the root of the repository:

```shell
npm run types
```

## Testing Pict

To test the entirety of pict, a REST api server on port 8086 is expected locally.  There is a demo database of 10,000 books with connections to their authors, for exercising Entity and graph get functions.

Once you have this local API service operational, the following command executes the unit tests:

```shell
npm test
```

If you prefer to execute a single test (or a matching set of tests) you could run the following:

```shell
npm tests -- "Singleton providers"
```

This is shorthand; the test executions are just using Mocha business test suites.

## Generating Test Coverage

To generate test coverage (both lcov and html reports) using nyc, run the following:

```shell
npm run coverage
```

The output will show up on the command line and files are generated in the `./coverage/` folder.  You can then open `./coverage/lcov-report/index.html` in your favorite browser to see where tests need improvement!
