# Menthetic Storefront

Customer-facing React storefront for Manthetic. The app covers product discovery, product detail browsing, cart and wishlist workflows, checkout, customer account settings, order history, policies, and AI-assisted product recommendations.

## Current Features

- Responsive storefront built with React, Vite, Tailwind CSS, and React Router.
- Home page with tablet-aware spacing, product sections, category browsing, and consistent brand typography.
- Product listing with filters, search-friendly layout, compact AI Style Finder, and responsive mobile/tablet/desktop spacing.
- Product detail page with balanced gallery/details columns, expandable description text, size/variant selection, wishlist, and cart actions.
- Cart page with product links back to product detail pages and polished responsive layout.
- Checkout flow for address, order summary, and order placement.
- Account settings with profile, password, orders, delivered orders, and reviews.
- Customer order cancellation from the Orders tab when the backend marks an order cancellable.
- Policy pages for shipping, returns, privacy, terms, cancellations, and other footer links.
- Scroll-to-top behavior on route changes.
- AI Style Finder that sends a customer prompt to the backend and renders recommended catalog products with AI reasons.

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- React Router 7
- TanStack Query 5
- Redux Toolkit
- Axios
- React Hook Form and Zod
- Framer Motion
- Lucide React
- React Hot Toast

## Requirements

- Node.js 18 or newer
- npm
- Manthetic backend API running locally or deployed

## Environment Variables

Create `.env` in this project root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

For production, point `VITE_API_BASE_URL` at the deployed backend API.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Project Structure

```text
src/
  components/
    Products/        Product filters, cards, and AI finder UI
    common/          Shared UI and route helpers
    home/            Home page sections
    layout/          Navbar, footer, and layout shell
    settings/        Account settings tabs
  hooks/             Query and feature hooks
  pages/             Route-level screens
  redux/             Auth and app state
  utils/             Constants and helpers
```

## AI Style Finder

The Products page includes a compact AI panel. It posts the shopper query and optional filters to:

```text
POST /api/ai/storefront/style-finder
```

The backend limits the AI context to catalog candidates, validates returned product and variant IDs, and the storefront renders matches using the existing product UI. Browsing still works if the AI request fails.

## Order Cancellation

Customer order rows use backend-provided fields:

- `canCancel`
- `cancelUntil`
- `cancelUnavailableReason`

Cancellation is confirmed in a dialog and sent to:

```text
PUT /api/order/:id/cancel
```

The backend enforces ownership, order status, and the 24-hour cancellation window.

## Verification

Before shipping storefront changes, run:

```bash
npm run lint
npm run build
```
