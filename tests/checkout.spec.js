
const { test, expect } = require('@playwright/test');

// =====================================
// TEST 1: SUCCESSFUL CHECKOUT
// =====================================

test('TC01 - Successful checkout displays confirmation', async ({ page }) => {

    await page.goto('/');

    // Add headphones

    await page.getByRole('button', {
        name: 'Add Wireless Headphones'
    }).click();

    // Enter customer name

    await page.getByLabel('Customer Name').fill('John');

    // Place order

    await page.getByRole('button', {
        name: 'Place Order'
    }).click();

    // Verify confirmation

    await expect(
        page.getByRole('status')
    ).toBeVisible();

    await expect(
        page.getByText('Order placed successfully!')
    ).toBeVisible();

    // Verify order reference

    const reference = page.getByTestId('order-reference');

    await expect(reference).toHaveText(/^ORD-\d+-\d+$/);

    // Verify button is disabled after order

    await expect(
        page.getByRole('button', {
            name: 'Order Placed'
        })
    ).toBeDisabled();

});


// =====================================
// TEST 2: MISSING CUSTOMER NAME
// =====================================

test('TC02 - Checkout blocks missing customer name', async ({ page }) => {

    await page.goto('/');

    // Add wireless mouse

    await page.getByRole('button', {
        name: 'Add Wireless Mouse'
    }).click();

    // Leave customer name blank

    // Click Place Order

    await page.getByRole('button', {
        name: 'Place Order'
    }).click();

    // Verify validation message

    await expect(
        page.getByRole('alert')
    ).toHaveText('Please enter your name.');

    // Verify cart is preserved

    await expect(
        page.getByTestId('cart-item')
    ).toBeVisible();

    // Verify no confirmation

    await expect(
        page.getByRole('status')
    ).toBeHidden();

    // Verify button remains enabled

    await expect(
        page.getByRole('button', {
            name: 'Place Order'
        })
    ).toBeEnabled();

});


// =====================================
// TEST 3: QUANTITY AND TOTAL
// =====================================

test('TC03 - Quantity update calculates exact total', async ({ page }) => {

    await page.goto('/');

    // Add headphones

    await page.getByRole('button', {
        name: 'Add Wireless Headphones'
    }).click();

    // Initial quantity = 1
    // Increase quantity to 3

    await page.getByRole('button', {
        name: 'Increase quantity'
    }).click();

    await page.getByRole('button', {
        name: 'Increase quantity'
    }).click();

    // Verify quantity

    await expect(
        page.getByTestId('quantity')
    ).toHaveText('3');

    // Verify line total

    await expect(
        page.getByTestId('line-total')
    ).toHaveText('₹6,000');

    // Verify order total

    await expect(
        page.getByTestId('order-total')
    ).toHaveText('₹6,000');

});
