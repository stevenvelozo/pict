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
| 8086 | Example meadow-endpoints API service (for unit tests using MariaDB) |

This means in a browser on your computer you can go to http://localhost:60000/ and login 
with the password `luxury` to begin editing code with browser-based visual studio.  If
you want, you can edit code locally and just use the docker environment for unit tests.

An easy shortcut to shell into the docker environment is provided, giving you a quick
bash terminal to the instance:

`npm run docker-dev-shell`

## Unit Tests

The unit tests require a running API server with the retold-harness data in it.  The
luxury code docker image provides this for free, or you can use the scripts in the
`retold-harness` folder to run them locally.

```shell
npm install
npm run api-server-harness
```

You can test that the service is running by executing the following curl command:

```shell
curl localhost:8086/1.0/Author/1
```

Which should return the following JSON:
```json
{
    "IDAuthor": 1,
    "GUIDAuthor": "e499ded3-01ce-4944-9f5a-55497dd14479",
    "CreateDate": "2023-05-24T17:54:47.000Z",
    "CreatingIDUser": 99999,
    "UpdateDate": "2023-05-24T17:54:47.000Z",
    "UpdatingIDUser": 99999,
    "Deleted": 0,
    "DeleteDate": null,
    "DeletingIDUser": 0,
    "Name": "John Green"
}
```
If you are into using paw files to play around with API endpoints, there is a fairly
complete file in `retold-harness/model/bookstore-api-endpoint-exercises.paw` to 
navigate the meadow-endpoints.

It is annoying to keep the terminal running to have API endpoints.  An easy and very,
extremely, awesomely stable way to run it in the background within the docker container
is through the tmux command.

```shell
tmux
npm run api-server-harness
```

Then you can press [ctrl-b] and then [d] to detach from the tmux terminal.  If you
ever want to go back and watch the REST logs, or, restart the service, you can run
`tmux attach` to reattach to the running sessions.  Further documentation of tmux
can be found on the world wide web.

If your luxury code docker container restarts, the tmux will no longer be running.

### Running the Unit Tests

You can either execute the unit tests through the visual studio code test running
interface via the browser (allowing you to leverage breakpoints for each test)
or within the Docker terminal by running (from the pict folder):

`npm test`

## Building

These commands build and package the minified and nonminified versions into `dist/` with 
source maps.

```shell
npm run build
npm run build-compatible
```

## A Manifesto for Anti-Frameworks in Service of Patterns

(more to come)
