# Mini Checkout and Browser Test Suite

## Overview
A simple e-commerce checkout application with automated browser testing using Playwright.

## Features
- Add and remove products.
- Increase and decrease quantities.
- Automatic line-total and order-total calculation.
- Customer name validation.
- Empty-cart validation.
- Order confirmation with a unique reference.
- Duplicate submission prevention.

## Technologies
HTML, CSS, JavaScript, Node.js, Playwright, Chromium and Python.

## Installation

Install dependencies:

```bash
npm install
npx playwright install chromium
```

## Run Application

```bash
python -m http.server 4173
```

Open: http://127.0.0.1:4173

## Run Automated Tests

```bash
npm test
```

Run tests with a visible browser:

```bash
npm run test:headed
```

View the report:

```bash
npm run test:report
```

## Automated Test Cases

| ID | Test Scenario |
|---|---|
| TC01 | Successful checkout |
| TC02 | Missing customer name |
| TC03 | Quantity and total calculation |

## Manual Testing
- Empty-cart checkout.
- Rapid double-click on Place Order.

## Limitations
No backend, database, payment gateway or external services are used.