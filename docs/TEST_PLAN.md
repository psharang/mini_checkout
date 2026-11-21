# Test Plan – Mini Checkout

## 1. Objective
Verify checkout functionality, price calculations, input validation and duplicate submission prevention.

## 2. Scope
- Product addition and removal.
- Quantity updates.
- Line-total and order-total calculations.
- Customer name validation.
- Empty-cart validation.
- Order confirmation.
- Duplicate submission protection.

## 3. Testing Environment

| Component | Technology |
|---|---|
| OS | Windows |
| Language | JavaScript |
| Browser | Chromium |
| Framework | Playwright |
| Editor | VS Code |

## 4. Test Cases

| ID | Scenario | Expected Result | Priority |
|---|---|---|---|
| TC01 | Successful checkout | Confirmation and reference displayed | High |
| TC02 | Missing customer name | Validation message displayed | High |
| TC03 | Increase quantity to 3 | Total updated to ₹6,000 | High |
| MT01 | Checkout with empty cart | Checkout blocked | Critical |
| MT02 | Rapid double-click | Only one confirmation | Critical |

## 5. Entry Criteria
- Application is running.
- Dependencies are installed.
- Chromium is available.

## 6. Exit Criteria
- All automated tests executed.
- Manual tests completed.
- Results documented.
- Defects recorded, if found.

## 7. Risks
- Incorrect order calculations.
- Duplicate submissions.
- Missing validation.
- Incorrect cart updates.