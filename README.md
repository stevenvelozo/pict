# Pict

Behaviors and access to Retold stuff in the browser.

Uses browserify to generate dist/pict.* and such from node modules.

Currently relies on Fable-Settings but may change.

## Building
```
gulp minified
gulp debug
```

(or)

`gulp build`


# A PICT Web Application

There is a main controller, the PICT Controller, which handles brokerage between the data
sources and the view data.

Eventually we will want to add a mechanism for persisting ViewData and ViewConfig pairs, as
well as in isolate.  We've used the term Project to describe these, but, it is so generic
and we already use that term elsewhere in the HeadLight ecosystem.


                   +-----------------------+
                   |                       |
        +--------->+    Pict Controller    +<--------+
        |          |                       |         |
        |          +-----------------------+         |
        |                                            |
        |                                            |
        |                                            |
+-------+--------+                           +-------+------+
|                |                           |              |
|   DataSource   |                           |   ViewData   +--------------------->+
|                |                           |              |                      |
+----------------+                           +--------------+                      |
                                                     ^                             |
                                                     |                             |
                                                     |                             |
                                                     |                             |
                                                     |                             |
                                                     |                             |
                                                     |                             |
                                            +----------------+           +---------+--------+
                                            |                |           |                  |
                                            |   ViewConfig   +---------->+       View       |
                                            |                |           |                  |
                                            +----------------+           +---------+--------+
                                                                                   |
                                                                                   |
                                                                                   |
                                                                                   |
                                                                                   |
                                                                          +--------+--------+
                                                                          |                 |
                                                                          |  View Renderer  |
                                                                          |                 |
                                                                          +-----------------+


# Notes:

If when you try to `gulp build` or `gulp debug` you get the following error:

```
Error: Node Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime (93)
```

You can run this simple command to fix it: 

```
npm rebuild node-sass
```
