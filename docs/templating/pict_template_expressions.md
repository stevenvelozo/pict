# Template Expressions

Pict uses "jellyfish templates" - template expressions wrapped in `{~` and `~}` delimiters. These expressions can access data, format values, render other templates, and perform logic.

## Data and Template Representation

### Data

Access data from the state address space using `Data` or the shorthand `D`:

```javascript
{~Data:AppData.User.name~}
{~D:AppData.User.name~}
```

Both forms are equivalent. The address can point to any location in the state:

```javascript
{~D:AppData.Settings.theme~}      // Application data
{~D:Bundle.Config.version~}       // Bundle data
{~D:Record.id~}                   // Current record in a set
{~D:Context[0].value~}            // Context array
```

### Data With Template Fallback

If the data is empty or undefined, render a fallback template instead:

```javascript
{~DataWithFallback:AppData.User.name:DefaultName-Template~}
{~DWF:AppData.User.name:DefaultName-Template~}
```

### Data With Absolute Fallback

If the data is empty, use a literal fallback value:

```javascript
{~DataWithAbsoluteFallback:AppData.User.name^Anonymous~}
{~DWAF:AppData.User.name^Anonymous~}
```

## Data Formatting

### Numbers

Format a value as a number with specified decimal places:

```javascript
{~Digits:AppData.Price:2~}    // "99.99"
{~Digits:AppData.Value:0~}    // "100"
```

### Dollars

Format a value as US currency:

```javascript
{~Dollars:AppData.Total~}     // "$1,234.56"
{~$:AppData.Total~}           // "$1,234.56"
```

### Date YYYYMMDD

Format a date in YYYYMMDD format:

```javascript
{~DateYMD:AppData.Date~}      // "20250615"
```

### Date and Time Format

Format a date and time:

```javascript
{~DateTimeFormat:AppData.Timestamp~}
```

### Date and Time in YMD Sortable Format

Format date/time in a sortable format:

```javascript
{~DateTimeYMD:AppData.Timestamp~}
```

### Generate a Pascal Case Browser-Safe Identifier from a Value

Convert a value to PascalCase for use as an identifier:

```javascript
{~PascalCaseIdentifier:AppData.Title~}
// "my product name" -> "MyProductName"
```

### Join a Set

Join array elements with a separator:

```javascript
{~Join:AppData.Tags:, ~}
// ["red", "green", "blue"] -> "red, green, blue"
```

### Join Unique Entries in a Set

Join only unique array elements:

```javascript
{~JoinUnique:AppData.Items:, ~}
// ["a", "b", "a", "c"] -> "a, b, c"
```

### Pluck a Value Set from an Array of Objects and Uniquify, then Join

Extract a property from each object, unique, then join:

```javascript
{~PluckJoinUnique:AppData.Users:name:, ~}
// [{name:"John"}, {name:"Jane"}, {name:"John"}] -> "John, Jane"
```

## HTML Formatting

### HTML Comment Start on Condition

Output `<!--` if a condition is falsy (to comment out content):

```javascript
{~HtmlCommentStart:AppData.ShowSection~}
{~HCS:AppData.ShowSection~}
```

### HTML Comment End on Condition

Output `-->` if a condition is falsy:

```javascript
{~HtmlCommentEnd:AppData.ShowSection~}
{~HCE:AppData.ShowSection~}
```

Usage example:

```html
{~HCS:AppData.ShowBanner~}
<div class="banner">Special Offer!</div>
{~HCE:AppData.ShowBanner~}
```

## Other Templates

### Template

Render another template by hash:

```javascript
{~Template:UserCard~}
{~T:UserCard~}
```

### Template By Data Address

Render a template whose hash is stored in data:

```javascript
{~TemplateByDataAddress:AppData.SelectedTemplate~}
{~TDA:AppData.SelectedTemplate~}
```

### Template By Reference

Render a template with data from an address:

```javascript
{~TemplateByReference:UserCard:AppData.CurrentUser~}
{~TBR:UserCard:AppData.CurrentUser~}
```

### Template From Map

Select a template based on a key from a map:

```javascript
{~TemplateFromMap:AppData.Status:StatusTemplates~}
{~TFM:AppData.Status:StatusTemplates~}
```

## Other Templates Multiplied by a Data Set

### Template Set

Render a template for each item in a collection:

```javascript
{~TemplateSet:UserRow:AppData.Users~}
{~TS:UserRow:AppData.Users~}
```

Within the template, `Record` refers to the current item.

### Template Set From Map

Render templates from a map for each item:

```javascript
{~TemplateSetFromMap:AppData.Items:TypeTemplates~}
{~TSFM:AppData.Items:TypeTemplates~}
```

### Template Set With Payload

Render a template set with additional payload data:

```javascript
{~TemplateSetWithPayload:ItemRow:AppData.Items:AppData.Config~}
{~TSWP:ItemRow:AppData.Items:AppData.Config~}
```

Within the template:
- `Data` refers to the current item
- `Payload` refers to the payload object

### Template Value Set

Render a template for each value in an object:

```javascript
{~TemplateValueSet:PropertyRow:AppData.Settings~}
{~TVS:PropertyRow:AppData.Settings~}
```

## Logic

### Show Content if Truthy

Render literal content if a value is truthy:

```javascript
{~NotEmpty:AppData.HasPermission^<button>Delete</button>~}
{~NE:AppData.HasPermission^<button>Delete</button>~}
```

### Conditional If

Conditionally render a template based on a comparison:

```javascript
{~TemplateIf:SuccessMessage:Record:AppData.Status^EQ^success~}
{~TIf:SuccessMessage:Record:AppData.Status^EQ^success~}
```

Available operators:
- `EQ` - Equal
- `NE` - Not equal
- `GT` - Greater than
- `GE` - Greater than or equal
- `LT` - Less than
- `LE` - Less than or equal

### Conditional If with Absolute Value

Compare against a literal value:

```javascript
{~TemplateIfAbsolute:AdminPanel:Record:AppData.UserRole^EQ^admin~}
{~TIfAbs:AdminPanel:Record:AppData.UserRole^EQ^admin~}
```

## Meadow Entities

### Entity

Load and render an entity from the entity provider:

```javascript
{~Entity:Book^AppData.BookID^BookCard~}
{~E:Book^AppData.BookID^BookCard~}
```

Format: `Entity:EntityType^IDAddress^TemplateHash`

## Pict Classes

### Pict Self Reference

Get the browser address for the pict instance:

```javascript
{~Pict~}
{~P~}
// Returns something like "window._Pict"
```

### View

Render a view's default renderable:

```javascript
{~View:UserProfile~}
{~V:UserProfile~}
```

## Solver

### Solve

Evaluate a mathematical expression:

```javascript
{~Solve:10 * 5~}
{~S:10 * 5~}
```

### Solve By Reference

Evaluate an expression stored in data:

```javascript
{~SolveByReference:AppData.Formula:AppData:AppData~}
{~SBR:AppData.Formula:AppData:AppData~}
```

## Debugging

### Set a Javascript Breakpoint

Insert a debugger statement:

```javascript
{~Breakpoint~}
{~BP~}
```

### Output a Data Value Tree

Output a JSON representation of a data tree:

```javascript
{~DataValueTree:AppData.User~}
{~DVT:AppData.User~}
```

### Log a Hard-Coded Debugger Statement

Log a static message:

```javascript
{~LogStatement:Processing user data~}
{~LS:Processing user data~}
```

### Log a Value

Log a value to the console:

```javascript
{~LogValue:AppData.User.name~}
{~LV:AppData.User.name~}
```

### Log a Value Tree

Log an entire object tree:

```javascript
{~LogValueTree:AppData.User~}
{~LVT:AppData.User~}
```

## Quick Reference

| Expression | Shorthand | Description |
| ---------- | --------- | ----------- |
| `Data` | `D` | Access data by address |
| `DataWithFallback` | `DWF` | Data with template fallback |
| `DataWithAbsoluteFallback` | `DWAF` | Data with literal fallback |
| `Template` | `T` | Render template by hash |
| `TemplateSet` | `TS` | Render template for each item |
| `TemplateIf` | `TIf` | Conditional template |
| `TemplateIfAbsolute` | `TIfAbs` | Conditional with literal compare |
| `NotEmpty` | `NE` | Show content if truthy |
| `Digits` | - | Format as number |
| `Dollars` | `$` | Format as currency |
| `Join` | - | Join array |
| `Entity` | `E` | Load and render entity |
| `View` | `V` | Render view |
| `Solve` | `S` | Evaluate expression |
| `Breakpoint` | `BP` | Insert debugger |
| `LogValue` | `LV` | Log value to console |
