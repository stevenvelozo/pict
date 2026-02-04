# Views in Pict

Views in pict are lightweight classes with built-in lifecycle events that are automatically managed by the application. They serve as the visual representation layer, connecting templates with DOM destinations.

## What is a View?

A view in pict is a container that:

- Holds template definitions
- Maps templates to DOM destinations (renderables)
- Has lifecycle methods for initialization, solving, rendering, and marshaling
- Can be configured entirely through JSON or extended with custom code

The scope of what you make a view is up to you. Views can be:

- An entire screen or page
- A specific content area
- An individual UI control (like a map or data grid)

## Creating a View

### Configuration-Only View

The simplest way to create a view is with a configuration object:

```javascript
const viewConfiguration = {
    ViewIdentifier: "UserProfile",

    DefaultRenderable: "UserProfile-Main",
    DefaultDestinationAddress: "#profile-container",

    Templates: [
        {
            Hash: "UserProfile-Main",
            Template: `
                <div class="profile">
                    <h1>{~D:AppData.User.name~}</h1>
                    <p>{~D:AppData.User.email~}</p>
                </div>
            `
        }
    ],

    Renderables: [
        {
            RenderableHash: "UserProfile-Main",
            TemplateHash: "UserProfile-Main",
            DestinationAddress: "#profile-container"
        }
    ]
};

const userView = _Pict.addView('UserProfile', viewConfiguration);
```

### Custom View Class

For more complex behavior, extend the PictView class:

```javascript
const libPictView = require('pict-view');

class UserProfileView extends libPictView {
    constructor(pFable, pOptions, pServiceHash) {
        super(pFable, pOptions, pServiceHash);

        // Custom initialization
        this.customProperty = 'value';
    }

    onInitialize() {
        // Called when the view initializes
        this.pict.log.info('UserProfileView initializing');
    }

    onSolve() {
        // Called before rendering to perform calculations
        this.pict.AppData.User.displayName =
            `${this.pict.AppData.User.firstName} ${this.pict.AppData.User.lastName}`;
    }

    onMarshal() {
        // Called to collect data from the DOM back to state
    }
}

const userView = _Pict.addView('UserProfile', viewConfiguration, UserProfileView);
```

## View Configuration Options

### ViewIdentifier

A unique identifier for the view:

```javascript
{ ViewIdentifier: "MyView" }
```

### Templates

An array of template definitions:

```javascript
{
    Templates: [
        {
            Hash: "Template-Name",
            Template: "<div>{~D:AppData.Value~}</div>"
        }
    ]
}
```

### Renderables

An array of renderable definitions that map templates to destinations:

```javascript
{
    Renderables: [
        {
            RenderableHash: "Renderable-Name",
            TemplateHash: "Template-Name",
            DestinationAddress: "#target-element"
        }
    ]
}
```

### DefaultRenderable and DefaultDestinationAddress

Specifies the default template and destination for the view:

```javascript
{
    DefaultRenderable: "Main-Content",
    DefaultDestinationAddress: "#app-container"
}
```

### RenderOnLoad

Whether to automatically render the view when the application loads:

```javascript
{ RenderOnLoad: true }
```

## View Lifecycle

Views progress through a defined lifecycle:

### 1. Construction

The view object is created with its configuration.

### 2. Initialization

The `onInitialize()` method is called. Templates are registered with the template provider.

```javascript
onInitialize() {
    // Load additional data
    // Set up event listeners
    // Configure the view
}
```

### 3. Solving

The `onSolve()` method is called before rendering to perform calculations.

```javascript
onSolve() {
    // Calculate derived values
    // Prepare data for display
    this.pict.AppData.Total = this.pict.AppData.Items.reduce(
        (sum, item) => sum + item.price, 0
    );
}
```

### 4. Rendering

The `render()` method processes templates and assigns content to DOM destinations.

```javascript
// Render the default renderable
view.render();

// Render a specific renderable
view.render('CustomRenderable');
```

### 5. Marshaling

The `onMarshal()` method collects data from the DOM back into state.

```javascript
onMarshal() {
    // Collect form values back to AppData
}
```

## Rendering Views

### Basic Rendering

```javascript
// Render using defaults
view.render();
```

### Rendering Specific Renderables

```javascript
// Render a specific renderable
view.render('Header-Renderable');
```

### Rendering from Templates

Views can be rendered within templates using the View template expression:

```javascript
const output = _Pict.parseTemplate('{~View:UserProfile~}');
```

## Multiple Renderables

A view can have multiple renderables to render different parts to different locations:

```javascript
const viewConfiguration = {
    ViewIdentifier: "Dashboard",

    Templates: [
        { Hash: "Header", Template: "<header>{~D:AppData.Title~}</header>" },
        { Hash: "Sidebar", Template: "<aside>{~D:AppData.Menu~}</aside>" },
        { Hash: "Content", Template: "<main>{~D:AppData.Content~}</main>" }
    ],

    Renderables: [
        { RenderableHash: "Header", TemplateHash: "Header", DestinationAddress: "#header" },
        { RenderableHash: "Sidebar", TemplateHash: "Sidebar", DestinationAddress: "#sidebar" },
        { RenderableHash: "Content", TemplateHash: "Content", DestinationAddress: "#main" }
    ]
};
```

## View Singletons

Use `addViewSingleton` to ensure only one instance of a view exists:

```javascript
// First call creates the view
const view1 = _Pict.addViewSingleton('SharedView', config);

// Subsequent calls return the existing view
const view2 = _Pict.addViewSingleton('SharedView', config);

// view1 === view2
```

## Accessing Views

Views are accessible through the `views` property:

```javascript
// Access a specific view
const userView = _Pict.views.UserProfile;

// Iterate over all views
Object.keys(_Pict.views).forEach(viewName => {
    console.log(`View: ${viewName}`);
});
```

## Best Practices

### Keep Views Focused

Each view should have a clear, single responsibility. Create multiple smaller views rather than one large view.

### Use Configuration for Simple Views

For views that just display data without complex logic, use configuration-only views.

### Extend for Complex Behavior

When you need custom lifecycle handling or methods, extend the PictView class.

### Separate Templates

For larger templates, consider loading them from separate files rather than embedding them in configuration.
