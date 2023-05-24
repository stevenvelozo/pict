# Pict

Behaviors and access to Retold stuff in the browser.

Uses browserify to generate dist/pict.* and such from node modules.

## Luxury Code

This module is rife with luxury code.  If you have docker installed,
you can code, run, debug and manage the library from a browser with
working debugger breakpoints.  This requires docker and node.js to 
function.

First build the docker container for our code-server service by running:

`npm run docker-dev-build`

Secondly, create a running instance of the docker container by running:

`npm run docker-dev-run`

The container will create itself locally with the container name `retold-pict-dev` and 
map a couple ports:

| Port | Service |
| ------------- | ------------- |
| 60000 | Browser-based Visual Studio Code Server  |
| 63306 | MariaDB Server (for unit tests) |
| 60086 | Example meadow-endpoints API service (for unit tests using MariaDB) |

This means in a browser on your computer you can go to http://localhost:6000/ and login 
with the password `luxury` to begin editing code with browser-based visual studio.  If
you want, you can edit code locally and just use the docker environment for unit tests.

An easy shortcut to shell into the docker environment is provided, giving you a quick
bash terminal to the instance:
`npm run docker-dev-shell`

# Unit Tests

The unit tests require a one-time data import operation, so they can request records
from REST endpoints.  Steps to prepare the data within the Docker container (either 
via the visual studio code terminal in the browser, or, the docker-dev-shell command 
above):

```
cd retold-harness
npm i
./Bookstore-Import-Books.sh
```

These commands do the following:

1. install dependencies for the API server harness
2. import the books database (this is not idempotent yet, and multiple runs will cause some unit tests to fail)

## Constant running of API endpoints

It is annoying to keep the terminal running to have API endpoints.  An easy and very,
extremely, awesomely stable way to run it in the background within the docker container
is through the tmux command.

```
tmux
cd retold-harness
npm i
node bookstore-serve-meadow-endpoint-apis-run.js
```

Then you can press [ctrl-b] and then [d] to detach from the tmux terminal.  If you
ever want to go back and watch the REST logs, or, restart the service, you can run
`tmux attach` to reattach to the running sessions.

If the docker container restarts, the tmux will no longer be running.

## Running the Tests

You can either execute the unit tests through the visual studio code test running
interface via the browser (allowing you to leverage breakpoints for each test)
or within the Docker terminal by running (from the pict folder):

`npm test`

# Building

These commands build and package the minified and nonminified versions into `dist/` with 
source maps.

```
npm run build
npm run build-compatible
```

# A Manifesto for Anti-Frameworks in Service of Patterns

(more to come)
