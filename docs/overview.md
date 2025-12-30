# Lune Overview

Lune is an open-source, modular commerce management system built with TypeScript. It provides a foundation for building headless e-commerce applications with a focus on extensibility, multi-tenancy, and developer experience.

## What is Lune?

Lune is a backend-first e-commerce framework that exposes **GraphQL APIs** for both admin and storefront operations. Unlike monolithic e-commerce platforms, Lune is designed as a set of building blocks that developers can assemble and extend to meet their specific business requirements.

Think of Lune as the commerce engine that powers your store — you bring the frontend, Lune handles the commerce logic.

## Design Philosophy

Lune is built around these core principles:

### Modularity Over Monolith

Every major capability (payments, shipping, discounts, storage) is implemented through **handlers** and **strategies** that can be swapped, extended, or replaced without modifying core code.

### Convention Over Configuration

Lune follows established patterns throughout the codebase. Once you learn how one service, repository, or resolver works, you understand them all.

### Multi-Tenancy First

Built-in support for multiple shops with PostgreSQL Row-Level Security (RLS) ensures data isolation at the database level.

### Type Safety End-to-End

From database entities to GraphQL resolvers, everything is fully typed with TypeScript, reducing runtime errors and improving developer experience.

## Architecture

Lune follows a clean layered architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                      GraphQL APIs                           │
│   ┌─────────────────┐          ┌─────────────────────────┐  │
│   │   Admin API     │          │    Storefront API       │  │
│   │  /admin-api     │          │    /storefront-api      │  │
│   └─────────────────┘          └─────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                      Business Layer                         │
│   Services containing domain logic and validation           │
│   (OrderService, ProductService, CustomerService, etc.)     │
├─────────────────────────────────────────────────────────────┤
│                    Persistence Layer                        │
│   Repositories, Entities, Serializers, Filters              │
│   Knex.js + PostgreSQL with Row-Level Security              │
├─────────────────────────────────────────────────────────────┤
│                    Plugin System                            │
│   Extend APIs, add routes, inject configuration             │
└─────────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

| Layer                 | Purpose                                                  |
| --------------------- | -------------------------------------------------------- |
| **API Layer**         | GraphQL schemas, resolvers, guards, and authentication   |
| **Business Layer**    | Domain services with business logic and validation       |
| **Persistence Layer** | Data access with repositories, entities, and serializers |
| **Plugin System**     | Extension points for custom functionality                |

## Core Concepts

### Shop (Multi-Tenancy)

A **Shop** represents a store or merchant. Lune supports multiple shops in a single deployment, with automatic data isolation via PostgreSQL RLS. Each shop has its own products, orders, customers, and configuration.

### Products & Variants

Products represent sellable goods. Each product can have multiple **variants** (e.g., size, color) with their own prices, stock, and SKUs. Products support:

- Translations for internationalization
- Custom fields for extended data
- Tags and collections for organization
- Asset management for images

### Orders & Fulfillment

Orders track customer purchases through a defined lifecycle:

```
Modifying → Placed → Processing → Partially Fulfilled → Fulfilled → Completed
                                                                  ↓
                                                              Canceled
```

Orders support multiple **fulfillments** (partial shipping), multiple **payments**, and various **delivery methods** (shipping or in-store pickup).

### Customers

Customers can authenticate via credentials or external providers. They have addresses, order history, and can be managed through the admin API.

### Discounts

Flexible discount system supporting:

- **Order-level discounts** (e.g., percentage off entire order)
- **Product/line-level discounts** (e.g., buy X get Y)
- **Delivery method discounts** (e.g., free shipping)

### Custom Data: Custom Fields & Custom Objects

Lune provides a flexible system for extending your data model without modifying the core schema.

#### Custom Fields

Custom Fields allow you to attach additional data to existing entities. They support multiple field types and internationalization.

**Available Field Types:**

| Type                      | Description                        |
| ------------------------- | ---------------------------------- |
| `single_line_text`        | Short text input                   |
| `multi_line_text`         | Long text / textarea               |
| `link`                    | URL field                          |
| `color`                   | Color picker (hex)                 |
| `integer`                 | Whole numbers                      |
| `decimal`                 | Decimal numbers                    |
| `money`                   | Price/currency values              |
| `date`                    | Date picker                        |
| `boolean`                 | True/false toggle                  |
| `image`                   | Image asset reference              |
| `product_reference`       | Reference to a Product             |
| `collection_reference`    | Reference to a Collection          |
| `custom_object_reference` | Reference to a Custom Object Entry |

Custom Fields can also be configured as **lists** to store multiple values.

#### Custom Objects

Custom Objects let you define entirely new data structures tailored to your business needs. They act as content types or "meta-objects" that you can query and manage through the API.

**Structure:**

- **Custom Object Definition**: The schema/blueprint (name, key, fields)
- **Custom Object Entry**: An instance of the definition with actual values
- **Entry Values**: The field values for each entry, with translation support

**Use Cases:**

- Store locator with custom attributes
- FAQ sections
- Brand information pages
- Size guides
- Promotional banners
- Any structured content your storefront needs

**Example Flow:**

```
1. Create a Custom Object Definition: "Store Location"
   └── Fields: name, address, coordinates, hours, image

2. Create Custom Object Entries:
   └── Entry 1: "Downtown Store" → { name: "...", address: "...", ... }
   └── Entry 2: "Mall Location"  → { name: "...", address: "...", ... }

3. Query entries via GraphQL for your storefront
```

Both Custom Fields and Custom Objects support **translations**, allowing you to localize values for different languages while keeping the same structure.

## Extensibility Points

Lune provides multiple ways to extend functionality:

### 1. Handlers

Implement business logic for shipping, payments, and discounts:

```typescript
// Custom shipping calculator
const MyShippingHandler: ShippingHandler = {
  name: 'Weight-based Shipping',
  code: 'weight-based',
  args: {
    pricePerKg: { type: 'price', label: 'Price per kg' },
  },
  calculatePrice: async (order, args, ctx) => {
    const weight = calculateOrderWeight(order);
    return weight * Number(args.pricePerKg);
  },
  getPricePreview: (args) => -1, // Dynamic pricing
};
```

### 2. Strategies

Customize code generation for orders and fulfillments:

```typescript
// Custom order code strategy
class MyOrderCodeStrategy implements OrderCodeStrategy {
  generate(): string {
    return `ORD-${Date.now()}-${nanoid(6)}`;
  }
}
```

### 3. Plugins

Extend the entire application with the plugin system:

```typescript
class MyPlugin extends LunePlugin {
  // Modify configuration before bootstrap
  configure(config: LuneConfig): LuneConfig {
    return { ...config /* modifications */ };
  }

  // Register routes, middleware, webhooks
  register(app: express.Application, db: Database): void {
    app.post('/webhooks/stripe', stripeWebhookHandler);
  }

  // Extend the Admin GraphQL API
  adminApiExtension = {
    typePaths: [path.join(__dirname, 'schema.gql')],
    resolvers: [MyCustomResolver],
  };

  // Extend the Storefront GraphQL API
  storefrontApiExtension = {
    typePaths: [path.join(__dirname, 'storefront-schema.gql')],
    resolvers: [MyStorefrontResolver],
  };
}
```

## Getting Started

Ready to build with Lune? Check out the [Setup Guide](./getting-started.md) for step-by-step installation instructions.
