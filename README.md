# Lune

An open-source solution for commerce management.

### Customizable at its core

Configure your Lune server just the way you need — flexible, modular, and ready to adapt.

```ts
import { LuneServer } from '@lune/core';

const luneServer = new LuneServer({
  port: 4000,
  databaseUrl: process.env.DATABASE_URL,
});

luneServer.start();
```

### Powerful interfaces for extension

Plug in your own storage, image processors, and more through well-designed interfaces.

```ts
const luneServer = new LuneServer({
  assets: {
    imageProcessor: new CloudImageProcessor(),
    storageProvider: new S3StorageProvider('https://cdn.yourdomain.com'),
  },
  payments: {
    handlers: [new StripePaymentHandler(), new PayPalPaymentHandler()],
  },
  shipping: {
    priceCalculators: [new FlatPriceCalculator(), new CountryPriceCalculator()],
  },
});
```

### Plugin-based architecture

Extend Lune effortlessly with server plugins — from asset handling to admin UI integration.

```ts
import { AssetServerPlugin, AdminUiServerPlugin } from '@lune/plugins';

const luneServer = new LuneServer({
  plugins: [new AssetServerPlugin(), new RatingsPlugin()],
});
```

### Composable Admin UI

Extend or customize your admin experience with the App component. Add pages or a custom brand feel effortlessly.

```ts
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@lune/admin-ui';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App
      pages={[{ path: '/orders', component: OrdersPage }]}
      brand={{ name: 'Lune Store', logo: '/logo.svg' }}
    />
  </StrictMode>
);
```

## Tech stack

- [Knex](https://knexjs.org/) and [Postgresql](https://postgresql.org/) for database management
- [Typescript](https://www.typescriptlang.org/) as the main language
- [ExpressJS](https://expressjs.com/) as backend framework
- [ReactJS](https://react.dev/) as frontend framework

## Theme

- Components: [shadcn](https://ui.shadcn.com/)
- Icons: [lucide icons](https://lucide.dev/)
- Guide style: [TailwindCSS](https://tailwindcss.com/)
