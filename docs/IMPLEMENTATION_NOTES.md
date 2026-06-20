# Storefront Implementation Notes

## Recent UI/UX Work

- Tablet horizontal padding was reduced across the main storefront pages so the layout no longer feels over-spaced on medium screens.
- The navbar brand font now matches the admin brand font.
- Product listing controls and AI finder panels use smaller radii for a more grounded product UI.
- Product detail pages avoid an internal right-panel scrollbar. Long descriptions are compressed with a Show more / Show less control.
- Cart, checkout, settings, profile, policy, about, and product detail pages were tuned for responsive behavior and consistent spacing.

## Feature Notes

- Route changes scroll the viewport to the top through a shared `ScrollToTop` component.
- Product links from cart items navigate to the matching product detail page.
- Policy footer links resolve to real pages rather than placeholder anchors.
- Customer order cancellation appears only when the backend returns `canCancel: true`.

## AI Notes

The AI Style Finder is intentionally simple for v1:

- No embeddings or vector database.
- No customer private data is sent.
- Product IDs returned by the model are validated against real candidates before display.
- A clear button resets generated AI results without affecting normal product browsing.
