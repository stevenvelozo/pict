# Pict

> A flexible MVC framework for building applications with text-based UI

Pict is a non-opinionated suite of tools implementing Model, View, and Controller patterns for web, console, and other applications. The technology was designed to not require development to be fully invested in a framework to use, providing flexible and composable components that work with the Fable service provider architecture.

## Features

- **Non-Opinionated Design** - Works in diverse environments without forcing a specific architecture
- **View Lifecycle Management** - Complete initialization, rendering, and solving lifecycles
- **MetaTemplate System** - Powerful templating with data interpolation and iteration
- **State Management** - Centralized AppData store with two-way data binding
- **Provider Architecture** - Extensible service providers for data and functionality
- **Browser & Node.js** - Works seamlessly in both environments

## Quick Start

```javascript
const libPict = require('pict');

// Create a Pict instance with configuration
const _Pict = new libPict({
    Product: 'MyApplication',
    ProductVersion: '1.0.0'
});

// Access built-in services
_Pict.log.trace('Application started');

// Use the template system
const template = _Pict.parseTemplate('Hello {~Data:Name~}!');
const result = _Pict.parseTemplateByHash(template, { Name: 'World' });
```

## Installation

```bash
npm install pict
```

## Core Concepts

### Views
Views are the primary unit of UI composition in Pict. Each view manages one or more renderables and their associated templates.

### Providers
Providers are services that participate in the application lifecycle, handling data loading, saving, and transformation.

### Applications
Applications coordinate views and providers, managing the overall lifecycle and state of your application.

### Templates
Templates use Pict's template syntax to generate dynamic content from data, supporting interpolation, iteration, and conditionals.

## Documentation

- [Quickstart](pict_quickstart.md) - Getting started guide
- [Key Concepts](pict_keyconcepts.md) - Understanding Pict fundamentals
- [State Management](state_management/README.md) - Working with AppData
- [Views](views/README.md) - Building views
- [Providers](providers/README.md) - Creating providers

## Related Packages

- [pict-view](https://github.com/stevenvelozo/pict-view) - View base class
- [pict-application](https://github.com/stevenvelozo/pict-application) - Application base class
- [pict-provider](https://github.com/stevenvelozo/pict-provider) - Provider base class
- [fable](https://github.com/stevenvelozo/fable) - Service provider framework
