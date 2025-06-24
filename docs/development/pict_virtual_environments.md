# Virtual Environments

Pict was designed primarily to build browser and command-line applications.  So mostly its job is generating strings from complexity and assigning them somewhere (either the console or to some address on the DOM).  To provide a good abstraction for application logic, there are simple virtual environments.  They leverage pict's underlying architectural concept of environment, and allow us to test for stable behaviors without needing to initialize a DOM or deal with a window.

What does this mean in practice?  You can write unit tests that make sure your application and/or view does what you expect with the data, context and conditions you expect within a unit test without needing to load it in a browser.

This is not meant to replace browser testing; it is another tool for business/behavior-oriented testing.

## Creating a Custom Virtual Environment
