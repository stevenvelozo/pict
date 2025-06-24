# Luxury Code

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
