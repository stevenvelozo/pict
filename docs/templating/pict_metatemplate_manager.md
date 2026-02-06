# The Pict Metatemplate Manager

The Metatemplate manager is a store of templates accessible within a specific pict instance. Templates can reference each other and interact with any data that's available in the state address space.

## Overview

The MetaTemplate service provides:

- Template registration and storage
- Template parsing with expression evaluation
- Support for nested template references
- Synchronous and asynchronous parsing

## Registering Templates

### Through the Template Provider

Templates can be registered through the TemplateProvider:

```javascript
// Register a single template
_Pict.TemplateProvider.addTemplate('UserCard', `
    <div class="user-card">
        <h3>{~D:Record.name~}</h3>
        <p>{~D:Record.email~}</p>
    </div>
`);

// Get a template
const template = _Pict.TemplateProvider.getTemplate('UserCard');
```

### Through View Configuration

Views automatically register their templates:

```javascript
const viewConfig = {
    Templates: [
        {
            Hash: "Header-Template",
            Template: "<header>{~D:AppData.Title~}</header>"
        },
        {
            Hash: "Content-Template",
            Template: "<main>{~D:AppData.Content~}</main>"
        }
    ]
};
```

## Parsing Templates

### parseTemplate

Parse a template string with data:

```javascript
_Pict.AppData.User = { name: 'John', email: 'john@example.com' };

const result = _Pict.parseTemplate(`
    Hello {~D:AppData.User.name~}!
    Email: {~D:AppData.User.email~}
`);
// result = "Hello John!\nEmail: john@example.com"
```

### parseTemplateByHash

Parse a registered template by its hash:

```javascript
_Pict.TemplateProvider.addTemplate('Greeting', 'Hello {~D:AppData.User.name~}!');

const result = _Pict.parseTemplateByHash('Greeting');
// result = "Hello John!"
```

### Async Parsing

For templates that require async operations:

```javascript
_Pict.parseTemplate(
    '{~Entity:User^AppData.UserId^UserCard~}',
    {},
    (error, result) => {
        if (error) {
            console.error('Parse error:', error);
            return;
        }
        console.log('Result:', result);
    }
);
```

## Template Sets

### parseTemplateSet

Parse a template for each item in a collection:

```javascript
_Pict.AppData.Users = [
    { name: 'John' },
    { name: 'Jane' },
    { name: 'Bob' }
];

const result = _Pict.parseTemplateSet(
    '<li>{~D:Record.name~}</li>',
    _Pict.AppData.Users
);
// result = "<li>John</li><li>Jane</li><li>Bob</li>"
```

### parseTemplateSetByHash

Parse a registered template for each item:

```javascript
_Pict.TemplateProvider.addTemplate('UserItem', '<li>{~D:Record.name~}</li>');

const result = _Pict.parseTemplateSetByHash('UserItem', _Pict.AppData.Users);
```

### Template Set with Payload

Pass additional payload data to each template iteration. Each record is wrapped as `{ Data: <item>, Payload: <payload> }` and passed as `Record`:

```javascript
const result = _Pict.parseTemplateSetWithPayload(
    '<li class="{~D:Record.Payload.className~}">{~D:Record.Data.name~}</li>',
    _Pict.AppData.Users,
    { className: 'user-item' }
);
```

## Context and Scope

### Context Array

Templates receive a context array for hierarchical data access:

```javascript
_Pict.parseTemplate(
    '{~D:Context[0].value~}',
    data,
    null,
    [{ value: 'First' }, { value: 'Second' }]  // Context array
);
```

### Scope

A sticky scope can carry state through template processing:

```javascript
_Pict.parseTemplate(
    '{~D:Scope.setting~}',
    data,
    null,
    null,  // Context array
    { setting: 'value' }  // Scope
);
```

## Address Resolution

The MetaTemplate system can resolve addresses from multiple locations:

| Prefix    | Location                 | Example                    |
| --------- | ------------------------ | -------------------------- |
| AppData   | Application data         | `AppData.User.name`        |
| Bundle    | Supporting data          | `Bundle.Config.theme`      |
| TempData  | Temporary data           | `TempData.Cache.results`   |
| Record    | Current record in a set  | `Record.id`                |
| Context   | Context array            | `Context[0].value`         |
| Scope     | Scope object             | `Scope.setting`            |
| Pict      | The pict instance        | `Pict.UUID`                |

## Nested Templates

Templates can reference other templates:

```javascript
_Pict.TemplateProvider.addTemplate('Wrapper', `
    <div class="wrapper">
        {~T:Content~}
    </div>
`);

_Pict.TemplateProvider.addTemplate('Content', `
    <p>Hello {~D:AppData.User.name~}</p>
`);

const result = _Pict.parseTemplateByHash('Wrapper');
// Wrapper includes Content's output
```

## Default Templates

The TemplateProvider supports default templates that are matched by prefix and postfix on the template hash. If a template is not found by hash, the default templates are checked:

```javascript
// Register a default template for any hash ending with "-ListRow"
_Pict.TemplateProvider.addDefaultTemplate('', '-ListRow', '<li>{~D:Record.Name~}</li>');

// Now any template hash ending in "-ListRow" will use this default
// e.g. "Users-ListRow", "Orders-ListRow", etc.
const result = _Pict.parseTemplate('{~TS:Products-ListRow:AppData.Products~}');
```

## Best Practices

### Keep Templates Simple

Break complex templates into smaller, reusable pieces:

```javascript
// Good: Small, focused templates
Templates: [
    { Hash: "UserAvatar", Template: '<img src="{~D:Record.avatar~}">' },
    { Hash: "UserName", Template: '<span>{~D:Record.name~}</span>' },
    { Hash: "UserCard", Template: '<div>{~T:UserAvatar~}{~T:UserName~}</div>' }
]
```

### Use Meaningful Hash Names

Choose descriptive names that indicate the template's purpose:

```javascript
// Good
{ Hash: "Invoice-LineItem-Row", Template: "..." }
{ Hash: "Navigation-Menu-Item", Template: "..." }

// Avoid
{ Hash: "Template1", Template: "..." }
{ Hash: "t", Template: "..." }
```

### Prefer Template Sets for Collections

Use `TemplateSet` for rendering collections rather than manual loops:

```javascript
// Good: Use TemplateSet
'{~TS:UserRow:AppData.Users~}'

// Avoid: Manual iteration in templates
```
