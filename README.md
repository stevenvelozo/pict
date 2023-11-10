# Pict

Pict is a non-opinionated set of tools to provide the disparate parts of Model, View and Controller patterns to web, console and other applications where the UI is primarily represented as text strings.


## What is Model-View-Controller

Wow what a contentious question.  Just like Thanksgiving dinner.  Aaaanyway the pict framework doesn't care what you think Model-View-Controller (MVC) is; it lacks opinionation and is designed to work in odd circumstances.  Each tool can be used discretely, or, they just work together if you want to use them as designed.


### According to the original Inventor, Model-View-Controller is:

Trygve Reenskaug, originator of MVC at PARC, has written that "MVC was conceived as a general solution to the problem of users controlling a large and complex data set."


### According to Wikipedia, Model-View-Controller is:

_(Wikipedia being the acknowledged universal source of truth for humanity?)_

> Model–view–controller (MVC) is a software design pattern[1] commonly used for developing user interfaces that divides the related program logic into three interconnected elements. These elements are the internal representations of information (the Model), the interface (the View) that presents information to and accepts it from the user, and the Controller software linking the two.

> Traditionally used for desktop graphical user interfaces (GUIs), this pattern became popular for designing web applications. Popular programming languages have MVC frameworks that facilitate the implementation of the pattern.


## A software Model is:

_(according to Wikipedia)_

> The central component of the pattern. It is the application's dynamic data structure, independent of the user interface.[14] It directly manages the data, logic and rules of the application. In Smalltalk-80, the design of a model type is left entirely to the programmer. With WebObjects, Rails, and Django, a model type typically represents a table in the application's database.


## A software View is:

_(according to Wikipedia)_

> Any representation of information such as a chart, diagram or table. Multiple views of the same information are possible, such as a bar chart for management and a tabular view for accountants.
> 
> In Smalltalk-80, a view is just a visual representation of a model, and does not handle user input. With WebObjects, a view represents a complete user interface element such as a menu or button, and does receive input from the user. In both Smalltalk-80 and WebObjects, however, views are meant to be general-purpose and composable.
> 
> With Rails and Django, the role of the view is played by HTML templates, so in their scheme a view specifies an in-browser user interface rather than representing a user interface widget directly. (Django opts to call this kind of object a "template" in light of this.) This approach puts relatively less emphasis on small, composable views; a typical Rails view has a one-to-one relationship with a controller action.
> 
> Smalltalk-80 views communicate with both a model and a controller, whereas with WebObjects, a view talks only to a controller, which then talks to a model. With Rails and Django, a view/template is used by a controller/view when preparing a response to the client.


## A software Controller is

_(according to Wikipedia)_:

> Accepts input and converts it to commands for the model or view.

... and then a bunch of deviance 


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
