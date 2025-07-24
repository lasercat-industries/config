# @lasercat/config

Shared configuration for ESLint, TypeScript, and Prettier used across Lasercat projects.

## Installation

```bash
npm install --save-dev @lasercat/config
```

## Usage

### ESLint

Create an `eslint.config.js` file in your project:

```javascript
import baseConfig from '@lasercat/config/eslint.config.js';

export default [
  ...baseConfig,
  // Your custom rules here
];
```

### TypeScript

Create a `tsconfig.json` file in your project:

```json
{
  "extends": "@lasercat/config/tsconfig.json",
  "compilerOptions": {
    // Your custom options here
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

For build configurations, you can also extend the build config:

```json
{
  "extends": "@lasercat/config/tsconfig.build.json",
  "compilerOptions": {
    // Your custom build options here
  }
}
```

### Prettier

Create a `.prettierrc.json` file in your project:

```json
{
  "extends": "@lasercat/config/.prettierrc.json"
}
```

Or in your `package.json`:

```json
{
  "prettier": "@lasercat/config/.prettierrc.json"
}
```

## What's Included

### ESLint Configuration
- Modern ESLint v9 flat config
- TypeScript support with @typescript-eslint
- Plugins: import, promise, unicorn, eslint-comments, regexp, security, unused-imports
- Sensible defaults for Node.js and browser environments

### TypeScript Configuration
- Strict mode enabled
- Modern ES2024 target
- ESNext modules
- Path mapping support
- Optimized for bundlers

### Prettier Configuration
- Single quotes
- Semicolons
- Trailing commas
- 100 character line width
- Consistent formatting rules

## License

MIT