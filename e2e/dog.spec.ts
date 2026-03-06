import { test, expect } from '@playwright/test';

test.describe('Dog App E2E Tests', () => {
  
  test('Test 3: Dog image loads on page load', async ({ page }) => {
    // Go to the page
    await page.goto('/');
    
    // Wait for the image to load
    const image = page.locator('img[alt="Random dog"]');
    await image.waitFor({ state: 'visible' });
    
    // Check that image has source value
    const src = await image.getAttribute('src');
    expect(src).toBeTruthy();
    
    // Check that source starts with https://
    expect(src).toMatch(/^https:\/\//);
  });

});
