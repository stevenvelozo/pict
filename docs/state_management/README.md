# State Management in Pict

State management in pict is intentionally simple and centralized. Rather than scattering state across components, the DOM, or various modules, pict provides dedicated locations for different categories of data.

## The State Address Space

Pict organizes application state into three primary containers:

### AppData

`AppData` is the primary location for application state - the data your application is actively working with. This includes user data, form values, loaded records, and any other state that represents what the application is currently doing.

```javascript
const _Pict = new libPict({ Product: 'MyApp' });

// Store application data
_Pict.AppData.CurrentUser = {
    id: 123,
    name: 'John Doe',
    email: 'john@example.com'
};

_Pict.AppData.Orders = [
    { id: 1, total: 150.00 },
    { id: 2, total: 75.50 }
];
```

### Bundle

`Bundle` is meant for transitory supporting data - lookup tables, reference data, cached values, or temporary data that supports the main application state but isn't the primary focus.

```javascript
// Store supporting data in Bundle
_Pict.Bundle.StatusCodes = {
    'PENDING': 'Pending Approval',
    'APPROVED': 'Approved',
    'REJECTED': 'Rejected'
};

_Pict.Bundle.CountryList = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' }
];
```

### TempData

`TempData` provides a space for truly ephemeral data - chart caches, intermediate calculation results, or any data that doesn't need to persist beyond the immediate operation.

```javascript
// Store temporary data
_Pict.TempData.ChartCache = { /* cached chart data */ };
_Pict.TempData.SearchResults = [ /* temporary search results */ ];
```

## Accessing State

Pict provides multiple ways to access state data:

### Direct Access

You can directly access state objects through the pict instance:

```javascript
// Read data
const userName = _Pict.AppData.CurrentUser.name;

// Write data
_Pict.AppData.CurrentUser.name = 'Jane Doe';
```

### Address-Based Access

The manifest service allows address-based access using dot notation:

```javascript
// Read using address
const name = _Pict.resolveStateFromAddress('AppData.CurrentUser.name');

// Set using address
_Pict.setStateValueAtAddress('AppData.CurrentUser.name', {}, 'Jane Doe');
```

### Template Access

Templates can directly access any state location:

```javascript
// Access AppData
const result = _Pict.parseTemplate('{~D:AppData.CurrentUser.name~}');

// Access Bundle
const status = _Pict.parseTemplate('{~D:Bundle.StatusCodes.PENDING~}');
```

## State in Templates

The consistent state locations make templating powerful. Templates can reference any data in the state address space:

```javascript
_Pict.AppData.User = { name: 'John', role: 'Admin' };
_Pict.Bundle.Permissions = { Admin: ['read', 'write', 'delete'] };

const template = `
    User: {~D:AppData.User.name~}
    Role: {~D:AppData.User.role~}
    Permissions: {~D:Bundle.Permissions.Admin~}
`;

const result = _Pict.parseTemplate(template);
```

## Initial State Configuration

You can configure default state when initializing pict:

```javascript
const _Pict = new libPict({
    Product: 'MyApp',
    DefaultAppData: {
        User: null,
        Settings: { theme: 'light' }
    },
    DefaultBundle: {
        Version: '1.0.0'
    }
});
```

## State and the Rendering Cycle

Views interact with state through a solve-render-marshal cycle:

1. **Solve** - Read state, perform calculations
2. **Render** - Generate output from state via templates
3. **Marshal** - Collect user input back into state

This cycle keeps state synchronized between the data model and the user interface.

## Best Practices

### Keep State Flat When Possible

Deeply nested state can be harder to work with:

```javascript
// Prefer this
_Pict.AppData.UserName = 'John';
_Pict.AppData.UserEmail = 'john@example.com';

// Over deeply nested structures when not necessary
_Pict.AppData.Data.User.Profile.Info.Name = 'John';
```

### Use Appropriate Containers

- `AppData` - Primary application state that represents what the user is working with
- `Bundle` - Supporting reference data, lookup tables
- `TempData` - Truly temporary, ephemeral data

### State Should Be Plain Objects

State objects should be plain JavaScript objects without methods or circular references. This ensures compatibility with templates and serialization:

```javascript
// Good - plain object
_Pict.AppData.User = { name: 'John', age: 30 };

// Avoid - objects with methods
_Pict.AppData.User = {
    name: 'John',
    getDisplayName() { return this.name; }  // Avoid
};
```
