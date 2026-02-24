# Configurable UI Theme from Config File

## Context

The UI theme (colours, branding) is currently hardcoded in `theme.js`. The user wants to define theme colours, a logo URL, and an app title from the adapt-authoring config file (`conf/{NODE_ENV}.config.js`), so each deployment can be branded without code changes.

The infrastructure already exists: the config pipeline exposes properties marked `_adapt.isPublic` via `GET /api/config`, and the frontend loads this config before rendering. We just need to add theme properties to the schema and wire them into theme creation.

## Files to Modify

| File | Change |
|------|--------|
| `node_modules/adapt-authoring-ui2/conf/config.schema.json` | Add 4 theme properties |
| `node_modules/adapt-authoring-ui2/ui/theme.js` | Convert static export to factory function |
| `node_modules/adapt-authoring-ui2/ui/main.jsx` | Create theme dynamically after config loads |
| `node_modules/adapt-authoring-ui2/ui/pages/Login.jsx` | Show configurable logo and app title |
| `node_modules/adapt-authoring-ui2/ui/index.html` | Update static `<title>` fallback |

No backend code changes needed — adding `_adapt.isPublic` properties to the schema is sufficient.

## Steps

### 1. Add theme properties to config schema

**File**: `node_modules/adapt-authoring-ui2/conf/config.schema.json`

Add four new properties alongside existing `buildDir`/`srcDir`:

- `primaryColour` — hex string, default `"#1976d2"`, `_adapt.isPublic`
- `secondaryColour` — hex string, default `"#dc004e"`, `_adapt.isPublic`
- `logoUrl` — string, default `""`, `_adapt.isPublic`
- `appTitle` — string, default `"Adapt Authoring Tool"`, `_adapt.isPublic`

Colour properties will use `"pattern": "^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"` for validation.

### 2. Convert theme.js to a factory function

**File**: `node_modules/adapt-authoring-ui2/ui/theme.js`

Replace `export const theme = createTheme(...)` with:

```js
export function createAppTheme ({ primaryColour, secondaryColour } = {}) {
  return createTheme({
    palette: {
      primary: { main: primaryColour || '#1976d2' },
      secondary: { main: secondaryColour || '#dc004e' }
    },
    cssVariables: true
  })
}
```

### 3. Wire up dynamic theme creation in main.jsx

**File**: `node_modules/adapt-authoring-ui2/ui/main.jsx`

Inside the existing `loadConfig().then()` callback:
- Import `createAppTheme` instead of `theme`
- Import `getConfig` from `./utils/config`
- Call `createAppTheme()` with config values
- Set `document.title` from `appTitle` config

### 4. Add logo and title to Login page

**File**: `node_modules/adapt-authoring-ui2/ui/pages/Login.jsx`

- Import `getConfig` from `../utils/config`
- Conditionally render `<img>` above the form when `logoUrl` is set (max-height 64px)
- Replace hardcoded "Sign In" heading with `appTitle` (falling back to "Sign In")

### 5. Update HTML title fallback

**File**: `node_modules/adapt-authoring-ui2/ui/index.html`

Change `<title>My App</title>` to `<title>Adapt Authoring Tool</title>`.

## Example user configuration

In `conf/production.config.js`:
```js
"adapt-authoring-ui2": {
  "primaryColour": "#2e7d32",
  "secondaryColour": "#f57c00",
  "logoUrl": "/assets/my-company-logo.png",
  "appTitle": "My Company Learning Platform"
}
```

## Verification

1. Start the app with no theme config — should look identical to current (default colours, no logo, title "Adapt Authoring Tool")
2. Add theme config values to `conf/{NODE_ENV}.config.js` and restart
3. Verify `GET /api/config` returns the four new `adapt-authoring-ui2.*` keys
4. Verify the login page shows the configured logo, title, and colour scheme
5. Verify the browser tab title updates
6. Test with invalid hex colour — app should fail at startup with a schema validation error
