# Key Concepts

Designed as a suite of tools as opposed to an opinionated framework, you can blend pict in with other types of tooling without damaging performance.  The key concepts for pict include:

1. State Management
1. Templating
1. Application Lifecycle Management
1. View Lifecycle Management
1. Renderables and Rendering
1. Provider Lifecycle Management
1. Mathematical and Other Types of Solving

Each of these come together to form a giant cat with ... alas, no.  But you can have configuration-only applications or highly customized workflows and flexibly switch between the two without having to rewrite your code.  And because of how state management works, you can easily reuse or migrate different components (templates, views, providers, etc.) around without rewriting all your code.

## State Management

State Management in pict is meant to be intentional about _categorization_.  This means, simply, having consistent "places" where types of state is stored.

In many software architectures, state is stored in small distributed modules (in a class, or in the DOM, or in a "shadow DOM", or in a function, or global).  This makes it difficult or even impossible to keep track of where and what state is for your application.

Pict has a plain javascript object in the root of the instantiated class called `AppData`.  This is an open ended space where any application state (_Application Data_) can go.

There is also locations for the `Bundle`, which is meant to be transitory supporting records and data for the application.

Having consistent locations for code to interact with application 

If you haven't read the incredible paper "Out of the Tar Pit", I highly encourage you to.  This paper fundamentally changed how I thought about state and state management in software.  This was one of those papers that changed my focus and prioritization for how we handle state in software development.

Having consistent locations for application state also simplifies core features like templating.

## Templating

So if pict has a consistent location to store application state, templating can be supercharged against this.

## Application Lifecycle Management

## View Lifecycle Management

## Provider Lifecycle Management

## Mathematical and Other Types of Solving

## Renderables and Rendering