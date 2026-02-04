# Consistent Lifecycle Coupling

Pict components (applications, providers, and views) share a consistent lifecycle pattern. This consistency makes it easy to understand how any component behaves and when your code will execute.

## Instantiation

Instantiation is when the JavaScript object is created. At this point:

- The object exists in memory
- Constructor code runs
- The object is not yet registered or initialized

```javascript
// Instantiation happens here
const view = _Pict.addView('MyView', config, MyViewClass);
```

During instantiation, avoid:

- Accessing the DOM
- Making async calls
- Depending on other components being ready

## Construction

Construction is the code that runs in the `constructor()` method:

```javascript
class MyView extends libPictView {
    constructor(pFable, pOptions, pServiceHash) {
        super(pFable, pOptions, pServiceHash);

        // Construction code runs here
        this.customProperty = 'value';
        this.state = { initialized: false };
    }
}
```

During construction:

- The parent class (`super()`) must be called first
- Basic properties can be set
- Configuration is available via `this.options`
- The pict instance is available via `this.pict`

Best practices for construction:

- Keep it simple and synchronous
- Set up instance properties
- Avoid side effects

## Initialization

Initialization happens when `onInitialize()` is called during the application startup sequence:

```javascript
class MyView extends libPictView {
    onInitialize() {
        this.pict.log.info('MyView initializing');

        // Safe to access other components
        this.dataProvider = this.pict.providers.DataProvider;

        // Safe to register templates
        this.registerTemplates();

        // Safe to set up state
        this.pict.AppData.ViewState = {
            ready: true
        };
    }
}
```

During initialization:

- Other providers are available (they initialize first)
- The DOM may or may not be ready (use caution)
- Templates can be registered
- State can be configured

For async initialization, use `onInitializeAsync`:

```javascript
onInitializeAsync(fCallback) {
    this.loadInitialData()
        .then(() => fCallback())
        .catch(err => fCallback(err));
}
```

## Solving

Solving is when views calculate derived values from state. The `onSolve()` method runs before rendering:

```javascript
class InvoiceView extends libPictView {
    onSolve() {
        const items = this.pict.AppData.InvoiceItems || [];

        // Calculate derived values
        this.pict.AppData.InvoiceSummary = {
            itemCount: items.length,
            subtotal: items.reduce((sum, item) => sum + item.amount, 0),
            tax: 0,
            total: 0
        };

        // Calculate tax
        const taxRate = this.pict.Bundle.TaxRate || 0.0825;
        this.pict.AppData.InvoiceSummary.tax =
            this.pict.AppData.InvoiceSummary.subtotal * taxRate;

        // Calculate total
        this.pict.AppData.InvoiceSummary.total =
            this.pict.AppData.InvoiceSummary.subtotal +
            this.pict.AppData.InvoiceSummary.tax;
    }
}
```

Solving best practices:

- Keep solve logic pure (no side effects)
- Only read and write to state
- Don't access the DOM
- Don't make async calls

## Rendering

Rendering is when templates are processed and content is assigned to DOM destinations:

```javascript
// Render the default renderable
view.render();

// Render a specific renderable
view.render('Header-Content');
```

During rendering:

1. Templates are retrieved from the template provider
2. Template expressions are evaluated against state
3. Content is assigned to DOM destinations

The rendering process is typically synchronous, but can be async when templates include async operations (like entity loading).

Custom render behavior can be added:

```javascript
class MyView extends libPictView {
    onBeforeRender() {
        this.pict.log.info('About to render');
    }

    onAfterRender() {
        this.pict.log.info('Finished rendering');
        // Safe to interact with rendered DOM
        this.attachEventListeners();
    }
}
```

## Marshaling

Marshaling is collecting data from the DOM back into state. The `onMarshal()` method handles this:

```javascript
class FormView extends libPictView {
    onMarshal() {
        // Collect form values
        const form = document.getElementById('contact-form');

        this.pict.AppData.ContactForm = {
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            message: form.querySelector('#message').value
        };

        // Validate
        this.validateForm();
    }

    validateForm() {
        const data = this.pict.AppData.ContactForm;
        this.pict.AppData.FormErrors = {};

        if (!data.name) {
            this.pict.AppData.FormErrors.name = 'Name is required';
        }
        if (!data.email || !data.email.includes('@')) {
            this.pict.AppData.FormErrors.email = 'Valid email is required';
        }
    }
}
```

Marshaling is typically triggered by:

- User clicking a button
- Form submission
- Custom event handlers

## The Complete Cycle

Components move through the lifecycle in this order:

```
┌─────────────────┐
│  Instantiation  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Construction   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Initialization  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Solving      │◄──────────┐
└────────┬────────┘           │
         │                    │
         ▼                    │
┌─────────────────┐           │
│   Rendering     │           │
└────────┬────────┘           │
         │                    │
         ▼                    │
┌─────────────────┐           │
│   Marshaling    │───────────┘
└─────────────────┘    (on user action)
```

## Coupling State with Lifecycle

The key insight of pict is that state and lifecycle are intentionally coupled:

1. **State lives in known locations** - `AppData`, `Bundle`, `TempData`
2. **Lifecycle methods operate on state** - Solve reads/writes, Render reads, Marshal writes
3. **Templates bind to state** - Expressions reference the state address space

This coupling provides:

- **Predictability** - You always know where to find data
- **Debuggability** - State is inspectable at any point
- **Testability** - Components can be tested by setting state
- **Reusability** - Templates work with any compatible state shape

```javascript
// Example: Testing a view without a DOM
const _Pict = new libPict({ Product: 'Test' });
const env = new libPict.EnvironmentLog(_Pict);

// Set up state
_Pict.AppData.User = { name: 'Test User', role: 'admin' };

// Add and render view
const view = _Pict.addView('TestView', config);
const output = _Pict.parseTemplate('{~View:TestView~}');

// Assert on output
expect(output).to.contain('Test User');
```
