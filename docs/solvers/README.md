# Solvers in Pict

Pict includes an expression parser that can evaluate mathematical expressions and custom functions. Solvers allow you to perform calculations during the view lifecycle, keeping your computed values synchronized with state.

## What is a Solver?

A solver in pict is a mechanism for:

- Evaluating mathematical expressions
- Referencing values from the state address space
- Defining custom functions that resolve to data addresses
- Performing calculations before rendering

## The Expression Parser

Pict provides an expression parser service that evaluates mathematical expressions:

```javascript
const result = _Pict.expressionParser.evaluate('2 + 2');
// result = 4

const complex = _Pict.expressionParser.evaluate('(10 * 5) + (20 / 4)');
// complex = 55
```

## Using Solvers in Templates

### Solve Template Expression

The `{~Solve:...~}` template expression evaluates mathematical expressions:

```javascript
_Pict.AppData.Price = 100;
_Pict.AppData.Quantity = 5;

const total = _Pict.parseTemplate('{~Solve:100 * 5~}');
// total = "500"
```

### Solve By Reference

The `{~SBR:...~}` (Solve By Reference) template expression evaluates expressions stored in state:

```javascript
_Pict.AppData.Formula = 'Price * Quantity';
_Pict.AppData.Price = 100;
_Pict.AppData.Quantity = 5;

const result = _Pict.parseTemplate('{~SBR:AppData.Formula:AppData:AppData~}');
// Resolves the formula using AppData values
```

## Custom Solver Functions

You can define custom functions that reference data addresses:

```javascript
// Add a custom function
_Pict.addSolverFunction(
    _Pict.expressionParser,  // The expression parser
    'taxrate',               // Function name
    'AppData.TaxRate',       // Address of the value
    'Get the current tax rate'  // Description
);

// Use the function
_Pict.AppData.TaxRate = 0.08;
_Pict.AppData.Subtotal = 100;

const tax = _Pict.parseTemplate('{~Solve:100 * taxrate()~}');
// tax = "8"
```

### Function Naming

Function names are case-insensitive and should be lowercase:

```javascript
// Good
_Pict.addSolverFunction(parser, 'calculatetax', 'AppData.TaxRate', 'Tax rate');

// These all call the same function
'{~Solve:calculatetax()~}'
'{~Solve:CALCULATETAX()~}'
'{~Solve:CalculateTax()~}'
```

## Solving in Views

Views have an `onSolve()` lifecycle method that runs before rendering:

```javascript
class InvoiceView extends libPictView {
    onSolve() {
        const items = this.pict.AppData.LineItems || [];

        // Calculate subtotal
        this.pict.AppData.Subtotal = items.reduce(
            (sum, item) => sum + (item.price * item.quantity),
            0
        );

        // Calculate tax
        const taxRate = this.pict.AppData.TaxRate || 0.08;
        this.pict.AppData.Tax = this.pict.AppData.Subtotal * taxRate;

        // Calculate total
        this.pict.AppData.Total = this.pict.AppData.Subtotal + this.pict.AppData.Tax;
    }
}
```

## Supported Operations

The expression parser supports standard mathematical operations:

### Arithmetic Operators

| Operator | Description    | Example     |
| -------- | -------------- | ----------- |
| `+`      | Addition       | `5 + 3`     |
| `-`      | Subtraction    | `10 - 4`    |
| `*`      | Multiplication | `6 * 7`     |
| `/`      | Division       | `20 / 5`    |
| `%`      | Modulo         | `17 % 5`    |
| `^`      | Exponentiation | `2 ^ 3`     |

### Parentheses

Use parentheses to control order of operations:

```javascript
'{~Solve:(10 + 5) * 2~}'  // = 30
'{~Solve:10 + 5 * 2~}'    // = 20
```

## Practical Examples

### Shopping Cart Total

```javascript
class CartView extends libPictView {
    onSolve() {
        const cart = this.pict.AppData.Cart || { items: [] };

        // Sum item totals
        cart.subtotal = cart.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        // Apply discount
        const discountRate = cart.discountCode ? 0.10 : 0;
        cart.discount = cart.subtotal * discountRate;

        // Calculate tax
        cart.tax = (cart.subtotal - cart.discount) * 0.08;

        // Final total
        cart.total = cart.subtotal - cart.discount + cart.tax;
    }
}
```

### Dynamic Pricing

```javascript
// Define pricing functions
_Pict.addSolverFunction(parser, 'baseprice', 'AppData.Product.BasePrice', 'Base price');
_Pict.addSolverFunction(parser, 'markup', 'AppData.Config.MarkupRate', 'Markup rate');
_Pict.addSolverFunction(parser, 'discount', 'AppData.Customer.DiscountRate', 'Customer discount');

// Use in template
const priceTemplate = `
    Base: ${'{~D:AppData.Product.BasePrice~}'}
    With Markup: {~Solve:baseprice() * (1 + markup())~}
    Final Price: {~Solve:baseprice() * (1 + markup()) * (1 - discount())~}
`;
```

### Unit Conversion

```javascript
class MeasurementView extends libPictView {
    onInitialize() {
        // Add conversion functions
        _Pict.addSolverFunction(
            this.pict.expressionParser,
            'metersToFeet',
            'Bundle.ConversionFactors.MetersToFeet',
            'Meters to feet conversion'
        );

        this.pict.Bundle.ConversionFactors = {
            MetersToFeet: 3.28084
        };
    }

    onSolve() {
        const meters = this.pict.AppData.DistanceMeters;
        this.pict.AppData.DistanceFeet = meters * 3.28084;
    }
}
```

## Best Practices

### Keep Solve Logic Simple

The `onSolve()` method should focus on calculations, not side effects:

```javascript
// Good
onSolve() {
    this.pict.AppData.Total = this.pict.AppData.Price * this.pict.AppData.Qty;
}

// Avoid
onSolve() {
    this.pict.AppData.Total = this.pict.AppData.Price * this.pict.AppData.Qty;
    this.sendAnalytics(); // Side effect - put elsewhere
    this.updateDatabase(); // Side effect - put elsewhere
}
```

### Use Custom Functions for Reusable Values

If you need the same value in multiple places, define a function:

```javascript
// Define once
_Pict.addSolverFunction(parser, 'shippingrate', 'AppData.Config.ShippingRate', 'Shipping rate');

// Use anywhere
'{~Solve:subtotal * shippingrate()~}'
```

### Handle Missing Values

Always account for missing or undefined values:

```javascript
onSolve() {
    const price = this.pict.AppData.Price || 0;
    const quantity = this.pict.AppData.Quantity || 1;
    this.pict.AppData.Total = price * quantity;
}
```
