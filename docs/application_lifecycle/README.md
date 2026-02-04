# Application Lifecycle

The pict application lifecycle defines the ordered sequence of events from application construction through initialization and into the running state. Understanding this lifecycle helps you know when and where to add custom logic.

## Lifecycle Overview

```
┌─────────────────┐
│  Construction   │ ─── Application object created, views/providers added
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Initialization  │ ─── initialize() called
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ onBeforeInit    │ ─── Pre-initialization hook
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   onInitialize  │ ─── Synchronous initialization
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│onInitializeAsync│ ─── Async initialization (data loading)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Provider Init   │ ─── All providers initialize
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   View Init     │ ─── All views initialize
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Initial Solve  │ ─── Views perform initial calculations
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Initial Render  │ ─── Main viewport view renders (if AutoRender)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ onAfterInit     │ ─── Post-initialization hook
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Running      │ ─── Application is active
└─────────────────┘
```

## Detailed Lifecycle Phases

### 1. Construction

During construction, the application object is created and configured. This is where you add views and providers:

```javascript
class MyApplication extends libPictApplication {
    constructor(pFable, pOptions, pServiceHash) {
        super(pFable, pOptions, pServiceHash);

        // Add providers
        this.pict.addProvider('DataProvider', {}, DataProvider);

        // Add views
        this.pict.addView('HeaderView', headerConfig);
        this.pict.addView('MainView', mainConfig);
        this.pict.addView('FooterView', footerConfig);

        // Configure the main viewport
        this.options.MainViewportViewIdentifier = 'MainView';
        this.options.AutoRenderMainViewportView = true;
    }
}
```

**What to do here:**

- Add all views and providers
- Configure application options
- Set up the main viewport

**What NOT to do here:**

- Access the DOM (it may not be ready)
- Make async calls (use onInitializeAsync instead)
- Access views before they're fully initialized

### 2. Initialization Triggered

Initialization begins when `initialize()` is called:

```javascript
const app = _Pict.instantiateServiceProvider('PictApplication', options);
app.initialize();
```

Or in the browser:

```javascript
Pict.safeOnDocumentReady(() => {
    Pict.safeLoadPictApplication(MyApplication, 0);
});
```

### 3. onBeforeInitialize

Called before any initialization logic runs:

```javascript
onBeforeInitialize() {
    this.pict.log.info('Starting initialization');

    // Good for:
    // - Logging
    // - Setting up monitoring
    // - Pre-initialization checks
}
```

### 4. onInitialize

Synchronous initialization for setup that doesn't require async operations:

```javascript
onInitialize() {
    // Set up default state
    this.pict.AppData.Settings = {
        theme: 'light',
        language: 'en'
    };

    // Configure services
    this.pict.LogNoisiness = 2;

    // Add event listeners (if DOM is ready)
    if (this.pict.isBrowser()) {
        window.addEventListener('resize', this.handleResize.bind(this));
    }
}
```

### 5. onInitializeAsync

Async initialization for data loading and API calls:

```javascript
onInitializeAsync(fCallback) {
    // Load required data before rendering
    Promise.all([
        this.loadUserProfile(),
        this.loadApplicationConfig(),
        this.loadInitialData()
    ])
    .then(() => {
        this.pict.log.info('Async initialization complete');
        fCallback(); // MUST call callback when done
    })
    .catch(error => {
        this.pict.log.error('Initialization failed', error);
        fCallback(error);
    });
}

async loadUserProfile() {
    const user = await fetch('/api/user').then(r => r.json());
    this.pict.AppData.CurrentUser = user;
}
```

**Important:** Always call `fCallback()` when async initialization completes, even if there's an error.

### 6. Provider Initialization

All registered providers have their `onInitialize()` method called:

```javascript
class DataProvider extends libPictProvider {
    onInitialize() {
        this.pict.log.info('DataProvider initializing');
        // Provider-specific initialization
    }
}
```

Providers initialize in the order they were registered.

### 7. View Initialization

All registered views have their `onInitialize()` method called:

```javascript
class MainView extends libPictView {
    onInitialize() {
        this.pict.log.info('MainView initializing');
        // Register templates
        // Set up view-specific state
    }
}
```

Views initialize in the order they were registered.

### 8. Initial Solve

Views perform their initial solve calculations:

```javascript
class CalculatorView extends libPictView {
    onSolve() {
        // Calculate derived values
        const items = this.pict.AppData.Items || [];
        this.pict.AppData.TotalPrice = items.reduce(
            (sum, item) => sum + item.price, 0
        );
    }
}
```

### 9. Initial Render

If `AutoRenderMainViewportView` is true, the main viewport view renders:

```javascript
// This happens automatically if configured
this.options.AutoRenderMainViewportView = true;
```

You can also trigger rendering manually in `onAfterInitialize`:

```javascript
onAfterInitialize() {
    // Render additional views
    this.pict.views.HeaderView.render();
    this.pict.views.FooterView.render();
}
```

### 10. onAfterInitialize

Called after all initialization is complete:

```javascript
onAfterInitialize() {
    this.pict.log.info('Application fully initialized and ready');

    // Good for:
    // - Starting background processes
    // - Enabling user interaction
    // - Triggering initial animations
    // - Hiding loading indicators
}
```

### 11. Running

The application is now running and ready for user interaction.

## The Solve-Render-Marshal Cycle

During the running state, views operate in a solve-render-marshal cycle:

```
┌──────────┐
│   Solve  │ ◄─── Calculate values from state
└────┬─────┘
     │
     ▼
┌──────────┐
│  Render  │ ◄─── Generate output from templates
└────┬─────┘
     │
     ▼
┌──────────┐
│ Marshal  │ ◄─── Collect user input back to state
└────┬─────┘
     │
     └──────────► (back to Solve on state change)
```

### Solve Phase

Views calculate derived values and prepare data for display:

```javascript
onSolve() {
    // Calculate totals, format data, etc.
}
```

### Render Phase

Templates are processed and content is assigned to DOM destinations:

```javascript
view.render();
// or
view.render('SpecificRenderable');
```

### Marshal Phase

User input is collected from the DOM and stored back in state:

```javascript
onMarshal() {
    // Read form values, update AppData
}
```

## Lifecycle Best Practices

### 1. Load Data in onInitializeAsync

```javascript
onInitializeAsync(fCallback) {
    // Load data before rendering
    this.loadData().then(() => fCallback());
}
```

### 2. Keep onInitialize Synchronous

```javascript
onInitialize() {
    // Only synchronous operations here
    this.pict.AppData.Ready = false;
}
```

### 3. Use onAfterInitialize for Post-Load Actions

```javascript
onAfterInitialize() {
    // Safe to access DOM and views here
    this.hideLoadingIndicator();
    this.enableUserInteraction();
}
```

### 4. Handle Errors in Async Initialization

```javascript
onInitializeAsync(fCallback) {
    this.loadData()
        .then(() => fCallback())
        .catch(error => {
            this.pict.log.error('Failed to load data', error);
            this.showErrorMessage();
            fCallback(error);
        });
}
```
