# A Day in the Life of a Pict Web Application

This document walks through the typical lifecycle of a pict web application, from configuration through ongoing user interaction.

## Application Configuration

Before a pict application runs, it needs to be configured. This typically happens in the application class constructor.

### Adding Services, Providers and Views

During construction, you register all the components your application needs:

```javascript
class MyApplication extends libPictApplication {
    constructor(pFable, pOptions, pServiceHash) {
        super(pFable, pOptions, pServiceHash);

        // Add providers for data and business logic
        this.pict.addProvider('UserData', {}, UserDataProvider);
        this.pict.addProvider('OrderData', {}, OrderDataProvider);
        this.pict.addProvider('Validation', {}, ValidationProvider);

        // Add views for UI components
        this.pict.addView('HeaderView', headerConfig);
        this.pict.addView('NavigationView', navConfig);
        this.pict.addView('MainContentView', mainConfig);
        this.pict.addView('FooterView', footerConfig);

        // Configure the main viewport
        this.options.MainViewportViewIdentifier = 'MainContentView';
        this.options.AutoRenderMainViewportView = true;
    }
}
```

#### Configuration for Dependent Components

Components often depend on each other. Configure them in the right order:

```javascript
constructor(pFable, pOptions, pServiceHash) {
    super(pFable, pOptions, pServiceHash);

    // 1. Add providers first (views may depend on them)
    this.pict.addProvider('DataProvider', {}, DataProvider);

    // 2. Add views that depend on providers
    this.pict.addView('DataView', {
        // View can reference the provider
        dataProviderHash: 'DataProvider'
    });
}
```

## Application Initialization

When `initialize()` is called (or the browser loads the app), the initialization sequence begins.

### Provider Initialization

All registered providers have their `onInitialize()` method called:

```javascript
class UserDataProvider extends libPictProvider {
    onInitialize() {
        this.pict.log.info('UserDataProvider initializing');

        // Set up caches
        this.userCache = new Map();

        // Configure API endpoints
        this.apiBase = this.pict.settings.APIEndpoint || '/api';
    }
}
```

Providers initialize in registration order. If Provider B depends on Provider A, register A first.

### View Initialization

After providers, all views have their `onInitialize()` method called:

```javascript
class MainContentView extends libPictView {
    onInitialize() {
        this.pict.log.info('MainContentView initializing');

        // Access providers (they're initialized by now)
        this.dataProvider = this.pict.providers.DataProvider;

        // Register any additional templates
        this.pict.TemplateProvider.addTemplate('CustomTemplate', '...');
    }
}
```

### Initial Solve

After initialization, views perform their initial solve:

```javascript
class DashboardView extends libPictView {
    onSolve() {
        // Calculate summary data
        const orders = this.pict.AppData.Orders || [];

        this.pict.AppData.Dashboard = {
            totalOrders: orders.length,
            totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
            averageOrder: orders.length > 0
                ? orders.reduce((sum, o) => sum + o.total, 0) / orders.length
                : 0
        };
    }
}
```

### Automatic Initial Render

If `AutoRenderMainViewportView` is true, the main viewport view renders automatically:

```javascript
// This happens automatically after initialization
this.pict.views[this.options.MainViewportViewIdentifier].render();
```

The view's templates are processed, and content is assigned to DOM destinations.

## Ongoing "Events"

After initialization, the application responds to user interaction through the solve-render-marshal cycle.

### Marshaling Data

When users interact with the UI (filling forms, clicking buttons), data is marshaled from the DOM back to state:

```javascript
class FormView extends libPictView {
    onMarshal() {
        // Collect form data from DOM to AppData
        const form = document.getElementById('user-form');

        this.pict.AppData.FormData = {
            name: form.querySelector('[name="name"]').value,
            email: form.querySelector('[name="email"]').value,
            phone: form.querySelector('[name="phone"]').value
        };
    }
}
```

Marshaling can be triggered by:

- User clicking a button that calls `view.marshal()`
- Event listeners on form inputs
- Custom code responding to user actions

### Solving Views

After marshaling, views typically solve to update calculated values:

```javascript
class OrderView extends libPictView {
    onSolve() {
        const items = this.pict.AppData.OrderItems || [];

        // Calculate totals
        this.pict.AppData.OrderSummary = {
            subtotal: items.reduce((sum, item) => sum + (item.price * item.qty), 0),
            tax: 0, // Will be calculated
            total: 0 // Will be calculated
        };

        // Apply tax
        const taxRate = this.pict.Bundle.TaxRate || 0.08;
        this.pict.AppData.OrderSummary.tax =
            this.pict.AppData.OrderSummary.subtotal * taxRate;

        // Calculate total
        this.pict.AppData.OrderSummary.total =
            this.pict.AppData.OrderSummary.subtotal +
            this.pict.AppData.OrderSummary.tax;
    }
}
```

### The Complete Cycle

A typical user interaction follows this cycle:

1. **User Action** - User clicks, types, or interacts
2. **Marshal** - Collect data from DOM to state
3. **Solve** - Calculate derived values
4. **Render** - Update the display

```javascript
// Example: User adds item to cart
handleAddToCart(itemId) {
    // 1. Marshal - Get item from UI
    const quantity = parseInt(document.getElementById(`qty-${itemId}`).value);

    // 2. Update state
    this.pict.AppData.Cart.items.push({
        id: itemId,
        quantity: quantity,
        price: this.getItemPrice(itemId)
    });

    // 3. Solve - Calculate new totals
    this.pict.views.CartView.solve();

    // 4. Render - Update the display
    this.pict.views.CartView.render();
}
```

## Summary

A pict application flows through these phases:

1. **Configuration** - Register providers and views
2. **Initialization** - Providers then views initialize
3. **Initial Solve** - Calculate initial values
4. **Initial Render** - Display initial state
5. **Running** - Respond to user actions via marshal-solve-render

This predictable lifecycle makes it easy to understand where to put your code and when it will execute.
