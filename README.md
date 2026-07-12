# ReviewTap Store

ReviewTap Store is a responsive, dependency-free static single-page application for a business selling customizable NFC Google Review cards, stands, stickers, keychains, and bundles. It is designed as a polished storefront and interactive product demo that can be hosted on any static web server, including GitHub Pages.

## Run locally

No package installation or build step is required. For reliable routing, uploads, and browser security behavior, serve the project over HTTP instead of opening `index.html` directly.

From the `reviewtap-store` directory, run either:

```powershell
py -m http.server 8080
```

or:

```powershell
python -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

You may also use any editor-provided static server, such as Live Server. Because this project has no runtime dependencies, there is no `npm install` or build command.

## Deploy to GitHub Pages

1. Create a GitHub repository and place the contents of this folder at the repository root.
2. Commit and push the files to the `main` branch.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then save.
6. Wait for the Pages deployment to finish and open the URL shown by GitHub.

Keep asset paths relative if the site is hosted at a project URL such as `https://username.github.io/reviewtap-store/`. If you connect a custom domain, configure it in the same Pages settings and enable HTTPS.

## Edit store content

Most store content and settings are kept in `assets/data.js` so routine updates do not require changing the application logic. Edit that file to update items such as:

- Product names, descriptions, prices, images, ratings, options, and stock levels
- Product templates and customization choices
- Shipping prices, estimated production and delivery times, and quantity discounts
- FAQ entries, testimonials, policy copy, and site-wide text
- Contact details, business hours, and social links

After editing, reload the page and test the affected product, cart, checkout, and mobile views. Prices shown in the browser are presentation data only until a trusted server becomes the source of truth.

## Included features

- Responsive storefront with sticky desktop and mobile navigation
- Product catalogue, design templates, and business-type sections
- Detailed customization flow with logo upload, link testing, QR options, and live preview
- Persistent cart with quantity controls, removal, discount entry, shipping, and totals
- Validated demo checkout that never requests or stores card details
- Order confirmation and order-tracking demonstrations
- Customer design approval and change-request demonstration
- FAQ, policy notice, testimonials, contact form, cookie consent, and 404 state
- Admin demonstration for orders, products, stock, discounts, shipping, messages, and CSV export
- Accessible labels, status messages, loading/empty states, SEO metadata, and structured product data

Cart, checkout, order, approval, contact, upload, and admin behavior in this static version runs in the browser. Browser storage can be cleared by the visitor and must not be treated as a database.

## Checkout and payments

Checkout is a **demo only**. No real payment provider is connected, no charge is made, and the site must not collect real card or bank details. The payment-method controls represent future integrations such as Stripe, Klarna, PayPal, Apple Pay, Google Pay, Shopify Payments, or another hosted provider.

For production, payment collection should be redirected to or embedded from a certified payment provider. The server must calculate the authoritative order total and confirm payment from signed provider webhooks before accepting an order as paid.

## Demo admin access

The current admin area is a client-side demonstration and is **not secure authentication**. The placeholder credentials, to be confirmed before the demo is shared, are:

- Email: `admin@reviewtap.se`
- Password: `ReviewTapDemo!`

Do not reuse these credentials anywhere else, do not store production customer information in this demo, and do not publish a production admin dashboard with credentials embedded in front-end files.

## Production-readiness checklist

This static application is suitable for design review and workflow demonstrations. Before accepting real orders or customer files, complete the following work:

- [ ] Replace client-only demo authentication with hosted server authentication, secure sessions, password recovery, rate limiting, and role-based access control (RBAC).
- [ ] Move all trust-sensitive validation to the server; validate file type and size, scan uploads for malware, store files privately, and provide expiring authorized download links.
- [ ] Add a real database for products, customers, orders, order status history, design approvals, discounts, inventory, and contact messages.
- [ ] Integrate a secure payment provider and verify signed webhooks server-side; calculate prices, taxes, shipping, discounts, and payment status on the server.
- [ ] Connect an email provider for order confirmations, design approval requests, status updates, shipping notifications, and support messages.
- [ ] Configure privacy-compliant cookie consent and analytics for the actual services and jurisdictions used; do not load optional analytics before consent where consent is required.
- [ ] Replace placeholder contact details, social links, opening hours, testimonials, product photography, delivery estimates, and business identity information.
- [ ] Have the shipping, returns, privacy, cookie, and terms policies reviewed and replace every placeholder with policies that match the real business and applicable law.
- [ ] Add server-side logging, monitoring, backups, audit trails, error reporting, and an incident response process.
- [ ] Test accessibility, supported browsers and devices, NFC/QR destinations, email deliverability, payment failure/refund flows, inventory conflicts, taxes, and end-to-end order fulfillment.
- [ ] Store secrets only in protected server environment variables—never in `data.js`, browser storage, or committed front-end code.

## Important review-policy reminder

ReviewTap helps customers access a business's review page. Businesses should not offer rewards only for positive reviews, block negative feedback, or mislead customers. Every customer should be allowed to leave honest feedback.

## License and ownership

Add the business's chosen license and final copyright information before public distribution.
