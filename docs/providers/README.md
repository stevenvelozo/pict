# Providers in Pict

Providers are services that supply data or functionality to your application without directly participating in rendering. They follow a similar lifecycle to views but focus on data operations, business logic, and cross-view coordination.

## What is a Provider?

A provider in pict is a service class that:

- Encapsulates business logic
- Manages data fetching and caching
- Coordinates between multiple views
- Integrates with external services

Providers act as the "backend" layer within your pict application, keeping data concerns separate from presentation concerns.

## Creating a Provider

### Basic Provider

The simplest way to create a provider:

```javascript
const _Pict = new libPict({ Product: 'MyApp' });

// Create a basic provider
const myProvider = _Pict.addProvider('DataProvider', {
    customOption: 'value'
});
```

### Custom Provider Class

For providers with custom functionality, extend the PictProvider class:

```javascript
const libPictProvider = require('pict-provider');

class UserDataProvider extends libPictProvider {
    constructor(pFable, pOptions, pServiceHash) {
        super(pFable, pOptions, pServiceHash);

        this.serviceType = 'UserDataProvider';
        this.userCache = {};
    }

    async fetchUser(userId) {
        // Check cache first
        if (this.userCache[userId]) {
            return this.userCache[userId];
        }

        // Fetch from API
        const user = await this.fable.RestClient.getJSON(`/api/users/${userId}`);

        // Cache the result
        this.userCache[userId] = user;

        // Store in AppData
        this.pict.AppData.CurrentUser = user;

        return user;
    }

    clearCache() {
        this.userCache = {};
    }
}

const userProvider = _Pict.addProvider('UserData', {}, UserDataProvider);
```

## Provider Lifecycle

Providers have lifecycle methods similar to views:

### Construction

The provider object is created with its configuration and options.

### Initialization

The `onInitialize()` method is called when the application initializes:

```javascript
class DataProvider extends libPictProvider {
    onInitialize() {
        this.pict.log.info('DataProvider initializing');
        // Set up connections, load initial data, etc.
    }
}
```

## Common Provider Patterns

### Data Fetching Provider

```javascript
class APIProvider extends libPictProvider {
    async fetchOrders() {
        const orders = await this.fable.RestClient.getJSON('/api/orders');
        this.pict.AppData.Orders = orders;
        return orders;
    }

    async createOrder(orderData) {
        const result = await this.fable.RestClient.postJSON('/api/orders', orderData);
        await this.fetchOrders(); // Refresh the list
        return result;
    }

    async deleteOrder(orderId) {
        await this.fable.RestClient.del(`/api/orders/${orderId}`);
        await this.fetchOrders();
    }
}
```

### Caching Provider

```javascript
class CacheProvider extends libPictProvider {
    constructor(pFable, pOptions, pServiceHash) {
        super(pFable, pOptions, pServiceHash);
        this.cache = new Map();
        this.ttl = pOptions.ttl || 60000; // Default 1 minute
    }

    get(key) {
        const entry = this.cache.get(key);
        if (!entry) return null;

        if (Date.now() > entry.expires) {
            this.cache.delete(key);
            return null;
        }

        return entry.value;
    }

    set(key, value) {
        this.cache.set(key, {
            value: value,
            expires: Date.now() + this.ttl
        });
    }

    clear() {
        this.cache.clear();
    }
}
```

### Validation Provider

```javascript
class ValidationProvider extends libPictProvider {
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateRequired(value) {
        return value !== null && value !== undefined && value !== '';
    }

    validateForm(formData, rules) {
        const errors = {};

        Object.keys(rules).forEach(field => {
            const rule = rules[field];
            const value = formData[field];

            if (rule.required && !this.validateRequired(value)) {
                errors[field] = 'This field is required';
            }

            if (rule.email && value && !this.validateEmail(value)) {
                errors[field] = 'Invalid email address';
            }
        });

        return {
            valid: Object.keys(errors).length === 0,
            errors: errors
        };
    }
}
```

## Accessing Providers

Providers are accessible through the `providers` property:

```javascript
// Access a specific provider
const userProvider = _Pict.providers.UserData;

// Use the provider
const user = await userProvider.fetchUser(123);
```

## Provider Singletons

Use `addProviderSingleton` to ensure only one instance of a provider exists:

```javascript
// First call creates the provider
const provider1 = _Pict.addProviderSingleton('SharedProvider', {}, MyProvider);

// Subsequent calls return the existing provider
const provider2 = _Pict.addProviderSingleton('SharedProvider', {}, MyProvider);

// provider1 === provider2
```

This is useful for providers that maintain state or connections that should be shared across the application.

## Built-in Providers

Pict includes several built-in providers:

### FilterManager

Manages data filtering operations:

```javascript
const filterManager = _Pict.providers.FilterManager;
```

### DataBroker

Handles data brokering between components:

```javascript
const dataBroker = _Pict.providers.DataBroker;
```

## Provider vs View

When should you use a provider versus a view?

**Use a Provider when:**

- You need to fetch or manage data
- You're implementing business logic
- You need to coordinate between multiple views
- The functionality doesn't have a visual representation

**Use a View when:**

- You're rendering content to the DOM
- You have templates to display
- You need the render/marshal lifecycle

## Best Practices

### Keep Providers Focused

Each provider should have a single responsibility. Create separate providers for different concerns:

```javascript
// Good: Separate providers
_Pict.addProvider('UserData', {}, UserDataProvider);
_Pict.addProvider('OrderData', {}, OrderDataProvider);
_Pict.addProvider('Validation', {}, ValidationProvider);

// Avoid: One giant provider doing everything
_Pict.addProvider('Everything', {}, EverythingProvider);
```

### Use Providers for Shared Logic

If multiple views need the same functionality, put it in a provider:

```javascript
class FormattingProvider extends libPictProvider {
    formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }

    formatDate(date) {
        return new Intl.DateTimeFormat('en-US').format(new Date(date));
    }
}
```

### Document Provider APIs

Since providers are used by other parts of your application, document their methods clearly:

```javascript
class UserProvider extends libPictProvider {
    /**
     * Fetch a user by ID
     * @param {number} userId - The user ID to fetch
     * @returns {Promise<Object>} The user object
     */
    async fetchUser(userId) {
        // Implementation
    }
}
```
