# AmphibiUI

AmphibiUI is a React and TypeScript dashboard component library with a sample
playground. The workspace uses Yarn 4 because the sample app consumes the
library through the `workspace:*` dependency protocol.

## Getting started

```sh
corepack yarn install
corepack yarn dev
```

The sample app is available at the Vite URL printed in the terminal. Use the
Dev Controls Panel to switch between Tailwind CSS and Bootstrap 5, and between
the eight included themes. Navigation state is kept while changing either
setting.

## Build and typecheck

```sh
corepack yarn build
corepack yarn typecheck
```

The `amphibiui` package exports components and types from `src/index.ts` and
ships its design-system CSS as `amphibiui/styles.css`. Consumers should load
that stylesheet and the stylesheet for their selected framework.

## Library usage

```tsx
import { AmphibiUIProvider, Button, Card } from "amphibiui";
import "amphibiui/styles.css";

export function Example() {
  return (
    <AmphibiUIProvider framework="tailwind" theme="sky-blue">
      <Card><Button>Continue</Button></Card>
    </AmphibiUIProvider>
  );
}
```

The provider accepts controlled `framework` and `theme` values. Pass state
setter callbacks through `setFramework` and `setTheme` when the application
needs to expose runtime controls.
