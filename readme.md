# Spinner

A lightweight, reusable SVG loading spinner for modern web applications.

## Features

- Zero runtime dependencies
- SVG-based spinner
- CSS animations
- Configurable size
- Configurable color
- Multiple independent spinner instances
- Simple start/stop API
- Framework-agnostic
- TypeScript support
- Explicit CSS import

## Installation

```bash
npm install spinner
```

## Quick Start

Import the spinner and its stylesheet:

```ts
import { createSpinner } from "spinner";
import "spinner/styles.css";
```

Create a spinner and mount it to an element:

```ts
const spinner = createSpinner();

spinner.mount(container);
spinner.start();
```

Stop it when the operation is complete:

```ts
spinner.stop();
```

## Configuration

```ts
const spinner = createSpinner({
  size: 32,
  color: "royalblue",
  variant: "pulse",
});
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `size` | `number \| string` | `24` | Spinner size. Numbers are treated as pixels. |
| `color` | `string` | `currentColor` | Any valid CSS color value. |
| `variant` | `pulse` | `pulse` | Spinner animation variant. |

### Size

Numbers are interpreted as pixels:

```ts
createSpinner({ size: 48 });
```

CSS values are also supported:

```ts
createSpinner({ size: "2rem" });
```

### Color

Any valid CSS color can be used:

```ts
createSpinner({ color: "#6366f1" });
```

```ts
createSpinner({ color: "royalblue" });
```

CSS variables are supported:

```ts
createSpinner({ color: "var(--primary-color)" });
```

## API

### `createSpinner(options?)`

Creates a new spinner instance.

```ts
const spinner = createSpinner();
```

### `start()`

Starts the spinner.

```ts
spinner.start();
```

Calling `start()` multiple times is safe.

### `stop()`

Stops and hides the spinner.

```ts
spinner.stop();
```

Calling `stop()` multiple times is safe.

`stop()` only controls the spinner. It does not indicate whether an operation succeeded or failed.

### `isRunning()`

Returns the current running state.

```ts
spinner.isRunning();
```

### `mount(container)`

Mounts the spinner into a DOM element.

```ts
spinner.mount(container);
```

### `unmount()`

Removes the spinner from the DOM.

```ts
spinner.unmount();
```

Unmounting preserves the current running state.

## Lifecycle

The spinner separates its operational state from its DOM lifecycle.

```text
start() / stop()
    ↓
controls loading state

mount() / unmount()
    ↓
controls DOM presence
```

Both of these usage patterns are supported:

```ts
spinner.mount(container);
spinner.start();
```

and:

```ts
spinner.start();
spinner.mount(container);
```

## Multiple Instances

Spinner instances are completely independent.

```ts
const spinnerA = createSpinner({
  color: "red",
});

const spinnerB = createSpinner({
  color: "blue",
});
```

Starting or stopping one instance does not affect another.

## React

The spinner can be used directly with React without a React-specific dependency.

```tsx
import { useEffect, useRef } from "react";
import { createSpinner } from "spinner";
import "spinner/styles.css";

function LoadingSpinner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const spinner = createSpinner({
      size: 32,
      color: "royalblue",
    });

    spinner.mount(containerRef.current);
    spinner.start();

    return () => {
      spinner.unmount();
    };
  }, []);

  return <div ref={containerRef} />;
}
```

The application remains responsible for deciding when loading starts and stops.

## Accessibility

The spinner is a visual loading indicator.

Applications should provide appropriate semantic loading information when required.

For example:

```html
<div aria-live="polite">
  Loading...
</div>
```

The consuming application is responsible for communicating the semantic state of an operation.

## CSS

The stylesheet is provided separately and must be imported:

```ts
import "spinner/styles.css";
```

The library does not inject styles into the document automatically.

## Current Variant

The initial release provides the `pulse` variant.

It renders a three-dot sequential loading animation.

```ts
const spinner = createSpinner({
  variant: "pulse",
});
```

`pulse` is currently the default variant.

## TypeScript

TypeScript declarations are included with the package.

The following types are exported:

```ts
SpinnerOptions
SpinnerController
MountableSpinner
SpinnerVariant
```

Example:

```ts
import {
  createSpinner,
  type SpinnerOptions,
} from "spinner";
```

## Browser Support

The library uses standard browser APIs:

- DOM
- SVG
- CSS animations
- ES modules

No runtime dependencies are required.

## Development

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Run tests once:

```bash
npm test -- --run
```

Build the package:

```bash
npm run build
```

## License

ISC