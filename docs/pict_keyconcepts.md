# Key Concepts

Designed as a suite of tools as opposed to an opinionated framework, you can blend pict in with other types of tooling without damaging performance.  The key concepts for pict include:

1. State Management
1. Templating
1. Application Lifecycle Management
1. View Lifecycle Management
1. Renderables and Rendering
1. Provider Lifecycle Management
1. Mathematical and Other Types of Solving

Each of these come together to form a cohesive but non-opinionated toolkit. You can have configuration-only applications or highly customized workflows and flexibly switch between the two without having to rewrite your code. And because of how state management works, you can easily reuse or migrate different components (templates, views, providers, etc.) around without rewriting all your code.

## State Management

State Management in pict is meant to be intentional about _categorization_.  This means, simply, having consistent "places" where types of state is stored.

In many software architectures, state is stored in small distributed modules (in a class, or in the DOM, or in a "shadow DOM", or in a function, or global). This makes it difficult or even impossible to keep track of where and what state is for your application.

Pict has a plain javascript object in the root of the instantiated class called `AppData`.  This is an open ended space where any application state (_Application Data_) can go.

There is also a location for the `Bundle`, which is meant to be transitory supporting records and data for the application.

Additionally, `TempData` provides a space for truly ephemeral data like chart caches or intermediate calculations.

Having consistent locations for code to interact with application state simplifies development significantly:

```javascript
// All application state lives in predictable locations
_Pict.AppData.UserProfile = { name: 'John', email: 'john@example.com' };
_Pict.Bundle.SupportingData = { lookupTables: [...] };
_Pict.TempData.ChartCache = { ... };
```

If you haven't read the incredible paper "Out of the Tar Pit", I highly encourage you to.  This paper fundamentally changed how I thought about state and state management in software.  This was one of those papers that changed my focus and prioritization for how we handle state in software development.

Having consistent locations for application state also simplifies core features like templating.

## Templating

Pict has a consistent location to store application state, which means templating can be supercharged against this.

Pict uses "jellyfish templates" which look like this: `{~Data:AppData.User.Name~}`. These template expressions work similarly to mustache templates but are built around *addressable data*. They're called jellyfish templates because they look like jellyfish: `{~` ... and this shape was chosen so they could be used alongside other templating frameworks.

Template expressions can:

- Access data from any location in the state address space
- Format data (numbers, dates, currencies)
- Include conditional logic
- Reference other templates
- Iterate over data sets
- Call solvers for calculations

```javascript
// Simple data access
const result = _Pict.parseTemplate(`Hello {~D:AppData.User.Name~}!`);

// Iterating over a set
const list = _Pict.parseTemplate(`{~TS:ListItem-Template:AppData.Items~}`);

// Conditional rendering
const conditional = _Pict.parseTemplate(`{~TIf:ShowMessage:Record:Record.Visible^EQ^true~}`);
```

The MetaTemplate manager stores templates accessible within a specific pict instance, allowing templates to reference each other.

## Application Lifecycle Management

A `PictApplication` coordinates the overall lifecycle of your application, managing views, providers, and the initialization sequence.

The application lifecycle follows these phases:

1. **Construction** - The application object is created and configured
2. **Initialization** - Services, providers, and views are set up
3. **Provider Initialization** - All registered providers initialize
4. **View Initialization** - All registered views initialize
5. **Initial Solve** - Any mathematical solvers run their initial calculations
6. **Render** - The main viewport view renders to the DOM

```javascript
class MyApplication extends libPictApplication {
    constructor(pFable, pOptions, pServiceHash) {
        super(pFable, pOptions, pServiceHash);

        // Add views during construction
        this.pict.addView('MainView', viewOptions, libPictView);
        this.options.MainViewportViewIdentifier = 'MainView';
    }

    onInitialize() {
        // Custom initialization logic
        this.pict.log.info('Application initializing...');
    }
}
```

## View Lifecycle Management

Views in pict are lightweight classes with built-in lifecycle events managed automatically by the application. Views can represent entire screens, specific content areas, or individual UI controls.

The view lifecycle includes:

1. **Construction** - View object created with configuration
2. **Initialization** - `onInitialize()` called, templates registered
3. **Solving** - `onSolve()` for calculations before render
4. **Rendering** - `render()` outputs templates to destinations
5. **Marshaling** - `onMarshal()` collects data from the DOM back to state

```javascript
const viewConfiguration = {
    ViewIdentifier: "UserProfile",
    DefaultRenderable: "UserProfile-Main",
    DefaultDestinationAddress: "#profile-container",

    Templates: [
        { Hash: "UserProfile-Main", Template: "<div>{~D:AppData.User.Name~}</div>" }
    ],

    Renderables: [
        { RenderableHash: "UserProfile-Main", TemplateHash: "UserProfile-Main" }
    ]
};

let userView = _Pict.addView('UserProfile', viewConfiguration);
```

## Provider Lifecycle Management

Providers are services that supply data or functionality to views without directly participating in rendering. They follow a similar lifecycle to views but focus on data operations.

Common uses for providers include:

- Data fetching and caching
- Business logic encapsulation
- Cross-view coordination
- External service integration

```javascript
class DataProvider extends libPictProvider {
    constructor(pFable, pOptions, pServiceHash) {
        super(pFable, pOptions, pServiceHash);
    }

    fetchUserData(userId) {
        // Fetch and return user data
        return this.fable.RestClient.getJSON(`/api/users/${userId}`);
    }
}

_Pict.addProvider('UserDataProvider', {}, DataProvider);
```

## Renderables and Rendering

Renderables define how templates are rendered to specific DOM destinations. Each renderable maps a template to a destination address:

```javascript
{
    Renderables: [
        {
            RenderableHash: "Header-Content",
            TemplateHash: "Header-Template",
            DestinationAddress: "#header"
        },
        {
            RenderableHash: "Footer-Content",
            TemplateHash: "Footer-Template",
            DestinationAddress: "#footer"
        }
    ]
}
```

Pict's content assignment system handles the actual DOM manipulation, supporting various assignment modes (replace, append, prepend) and working with both browser environments and virtual DOM testing scenarios.

## Mathematical and Other Types of Solving

Pict includes an expression parser that can evaluate mathematical expressions and custom functions. Solvers can be triggered during the view lifecycle to perform calculations before rendering.

The solver system supports:

- Mathematical expressions with standard operators
- Custom function definitions that reference data addresses
- Chained calculations across views
- Automatic re-solving when data changes

```javascript
// Add a custom solver function
_Pict.addSolverFunction(
    _Pict.expressionParser,
    'calculatetax',
    'AppData.TaxRate',
    'Calculate tax based on the current tax rate'
);

// Use in a template
const result = _Pict.parseTemplate(`{~Solve:AppData.Price * calculatetax()~}`);
```

The solve-render-marshal cycle allows views to perform calculations, display results, and collect user input in a coordinated manner.
