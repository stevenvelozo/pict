# Applications in Pict

A `PictApplication` coordinates the overall lifecycle of your application. It manages views, providers, and orchestrates the initialization sequence to bring everything together.

## What is a PictApplication?

A PictApplication is the top-level controller that:

- Manages the collection of views and providers
- Coordinates initialization order
- Handles the main viewport rendering
- Provides lifecycle hooks for custom behavior

## Creating an Application

### Basic Application

The simplest way to create an application:

```javascript
const libPict = require('pict');

const _Pict = new libPict({ Product: 'MyApp', ProductVersion: '1.0.0' });

// Add views
_Pict.addView('MainView', {
    ViewIdentifier: 'MainView',
    DefaultRenderable: 'Main-Content',
    DefaultDestinationAddress: '#app-container',
    Templates: [
        { Hash: 'Main-Content', Template: '<h1>Hello World</h1>' }
    ],
    Renderables: [
        { RenderableHash: 'Main-Content', TemplateHash: 'Main-Content' }
    ]
});

// Create the application
const app = _Pict.instantiateServiceProvider('PictApplication', {
    MainViewportViewIdentifier: 'MainView',
    MainViewportRenderable: 'Main-Content',
    AutoRenderMainViewportView: true
});

// Initialize the application
app.initialize();
```

### Custom Application Class

For applications with custom behavior, extend the PictApplication class:

```javascript
const libPictApplication = require('pict-application');
const libPictView = require('pict-view');

class MyApplication extends libPictApplication {
    constructor(pFable, pOptions, pServiceHash) {
        super(pFable, pOptions, pServiceHash);

        // Add views during construction
        this.pict.addView('HeaderView', headerViewConfig, libPictView);
        this.pict.addView('MainView', mainViewConfig, libPictView);
        this.pict.addView('FooterView', footerViewConfig, libPictView);

        // Set the main viewport view
        this.options.MainViewportViewIdentifier = 'MainView';
    }

    onInitialize() {
        this.pict.log.info('Application initializing');
        // Custom initialization logic
    }

    onInitializeAsync(fCallback) {
        // Async initialization
        this.loadInitialData()
            .then(() => fCallback())
            .catch(err => fCallback(err));
    }

    async loadInitialData() {
        // Load data before rendering
        const userData = await this.pict.providers.UserData.fetchCurrentUser();
        this.pict.AppData.CurrentUser = userData;
    }
}

module.exports = MyApplication;
```

## Application Configuration Options

### MainViewportViewIdentifier

Specifies which view is the main viewport:

```javascript
{ MainViewportViewIdentifier: 'MainView' }
```

### MainViewportRenderable

Specifies which renderable to use for the main viewport:

```javascript
{ MainViewportRenderable: 'Main-Content' }
```

### MainViewportDefaultDataAddress

Specifies the default data address for the main viewport:

```javascript
{ MainViewportDefaultDataAddress: 'AppData.PageData' }
```

### AutoRenderMainViewportView

Whether to automatically render the main viewport after initialization:

```javascript
{ AutoRenderMainViewportView: true }
```

## Application Lifecycle

### 1. Construction

The application object is created and configured. Views and providers are added.

```javascript
constructor(pFable, pOptions, pServiceHash) {
    super(pFable, pOptions, pServiceHash);

    // Add views and providers here
    this.pict.addView('MyView', config);
    this.pict.addProvider('MyProvider', {}, ProviderClass);
}
```

### 2. Initialization

The `initialize()` method triggers the initialization sequence:

```javascript
app.initialize();
```

This calls:

1. `onBeforeInitialize()` - Before any initialization
2. `onInitialize()` - Synchronous initialization
3. `onInitializeAsync(callback)` - Async initialization
4. Provider initialization
5. View initialization
6. Initial solve
7. `onAfterInitialize()` - After initialization completes

### 3. Running

After initialization, the application is running and responding to user interaction.

## Lifecycle Hooks

### onBeforeInitialize

Called before initialization begins:

```javascript
onBeforeInitialize() {
    this.pict.log.info('About to initialize');
}
```

### onInitialize

Synchronous initialization:

```javascript
onInitialize() {
    // Set up application state
    this.pict.AppData.Settings = { theme: 'light' };
}
```

### onInitializeAsync

Async initialization - must call the callback when complete:

```javascript
onInitializeAsync(fCallback) {
    fetch('/api/config')
        .then(response => response.json())
        .then(config => {
            this.pict.AppData.Config = config;
            fCallback();
        })
        .catch(err => fCallback(err));
}
```

### onAfterInitialize

Called after all initialization is complete:

```javascript
onAfterInitialize() {
    this.pict.log.info('Application ready');
}
```

## Loading Applications in the Browser

Pict provides helper functions for loading applications in the browser:

### safeOnDocumentReady

Ensures code runs after the DOM is ready:

```javascript
Pict.safeOnDocumentReady(() => {
    // DOM is ready
});
```

### safeLoadPictApplication

Safely loads and initializes a pict application:

```javascript
Pict.safeOnDocumentReady(() => {
    Pict.safeLoadPictApplication(MyApplication, 0);
});
```

### HTML Setup

A typical HTML file for a pict application:

```html
<!doctype html>
<html lang="en">
<head>
    <title>My Pict App</title>
    <style id="PICT-CSS"></style>
    <script src="pict.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        Pict.safeOnDocumentReady(() => {
            Pict.safeLoadPictApplication(MyApp, 0);
        });
    </script>
</head>
<body>
    <div id="Application-Container"></div>
    <script src="my-app.min.js" type="text/javascript"></script>
</body>
</html>
```

## Accessing the Application

The current application is accessible via `_Pict.PictApplication`:

```javascript
// Access the application
const app = _Pict.PictApplication;

// Access views through the application
const mainView = _Pict.views.MainView;

// Access providers
const dataProvider = _Pict.providers.DataProvider;
```

## Best Practices

### Initialize Views in the Constructor

Add all views during application construction to ensure they're available before initialization:

```javascript
constructor(pFable, pOptions, pServiceHash) {
    super(pFable, pOptions, pServiceHash);

    // Good: Add views here
    this.pict.addView('HeaderView', headerConfig);
    this.pict.addView('MainView', mainConfig);
}
```

### Use Async Initialization for Data Loading

Load initial data in `onInitializeAsync` to ensure views render with data:

```javascript
onInitializeAsync(fCallback) {
    Promise.all([
        this.loadUserData(),
        this.loadConfig()
    ])
    .then(() => fCallback())
    .catch(err => fCallback(err));
}
```

### Keep Application Logic Focused

The application should coordinate, not contain all logic. Use providers for data and business logic, views for presentation.
