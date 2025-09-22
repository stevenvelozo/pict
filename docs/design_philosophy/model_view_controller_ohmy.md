# Writing Applications in the Model View Controller Pardigm

Pict provides a view class, which you can happily ignore and not use.  However.  The lifecycle benefits of views may make them worth considering!

And what is a view, in the pict parliance? The scope of what you make a view is up to you.  They are very lightweight classes with built-in lifecycle events that are managed automatically by the application.  In some cases, views are a whole screen or a specific piece of content.  Other times they are a specific UI control (good examples are maps and tabular data editors, which both really need their own lifecycle management).

## What is Model View Controller

Wow what a contentious question.  Just like Thanksgiving dinner.  Aaaanyway the pict framework doesn't care what you think Model-View-Controller (MVC) is; it lacks opinionation and is designed to work in odd circumstances.  Each tool can be used discretely, or, they just work together if you want to use them as designed.

### According to the original Inventor, Model-View-Controller means

Trygve Reenskaug, originator of MVC at PARC, has written that "MVC was conceived as a general solution to the problem of users controlling a large and complex data set."

### According to Wikipedia, Model-View-Controller means

Wikipedia being the acknowledged universal source of truth for humanity?  At least getting close to Hitchiker's Guide level of relevance...

> Model–view–controller (MVC) is a software design pattern[1] commonly used for developing user interfaces that divides the related program logic into three interconnected elements. These elements are the internal representations of information (the Model), the interface (the View) that presents information to and accepts it from the user, and the Controller software linking the two.
>
> Traditionally used for desktop graphical user interfaces (GUIs), this pattern became popular for designing web applications. Popular programming languages have MVC frameworks that facilitate the implementation of the pattern.

## According to Wikipedia a software Model is

> The central component of the pattern. It is the application's dynamic data structure, independent of the user interface.[14] It directly manages the data, logic and rules of the application. In Smalltalk-80, the design of a model type is left entirely to the programmer. With WebObjects, Rails, and Django, a model type typically represents a table in the application's database.

## According to Wikipedia software View is

> Any representation of information such as a chart, diagram or table. Multiple views of the same information are possible, such as a bar chart for management and a tabular view for accountants.
>
> In Smalltalk-80, a view is just a visual representation of a model, and does not handle user input. With WebObjects, a view represents a complete user interface element such as a menu or button, and does receive input from the user. In both Smalltalk-80 and WebObjects, however, views are meant to be general-purpose and composable.
>
> With Rails and Django, the role of the view is played by HTML templates, so in their scheme a view specifies an in-browser user interface rather than representing a user interface widget directly. (Django opts to call this kind of object a "template" in light of this.) This approach puts relatively less emphasis on small, composable views; a typical Rails view has a one-to-one relationship with a controller action.
>
> Smalltalk-80 views communicate with both a model and a controller, whereas with WebObjects, a view talks only to a controller, which then talks to a model. With Rails and Django, a view/template is used by a controller/view when preparing a response to the client.

## According to Wikipedia a software Controller is

> Accepts input and converts it to commands for the model or view.

## But then the Definitions get murky

Reading these, and finding great concrete examples is like going to a fortune teller.  There is enough definition that you can apply it to software.  Not enough that developers even agree on what it means.

## Okay, smarty, what does Model-View-Controller mean to pict

For pict, the model is well defined as application state that is in the `Bundle` and `AppData` properties of the pict instance itself.  By design, *state should not be in specific views or in the DOM*.  This is one of the most difficult disciplines to follow, as it is very different from many frameworks.

Views are meant to be ephemeral projections of application state.

It bears repeating though:

### Model is stored in the `Bundle` and `AppData` properties of pict

Best practice has the model being plain old JSON objects, preferably without loops.

## Views and Controllers

In the case of most applications, the `pict-application` acts as the higher level application controller.  As a developer, you can balance complexity between all three of applications, providers and views though.  Simple controller functions within a view make a lot of sense sometimes, to keep down complexity.

Because of the ubiquitous leveraging of templates and a consistent address space for the model, often times behavior management happens within the templates themselves.

It's possible to make a do what you want work with quick and dirty code, all in one place, and slowly refactor out complexity if necessary without rewriting the whole application.  This is by design!
