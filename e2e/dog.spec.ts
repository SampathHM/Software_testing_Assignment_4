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

  test('Test 4: Dog image loads when button is clicked', async ({ page }) => {
    // Go to the page
    await page.goto('/');
    
    // Wait for the initial image to load
    const image = page.locator('img[alt="Random dog"]');
    await image.waitFor({ state: 'visible' });
    
    // Get initial image source
    const initialSrc = await image.getAttribute('src');
    
    // Click the button to get another dog
    const button = page.locator('button.fetch-button');
    await button.click();
    
    // Wait for the API call to finish and new image to load
    await page.waitForTimeout(2000);
    
    // Get new image source
    const newSrc = await image.getAttribute('src');
    
    // Check that image has source value
    expect(newSrc).toBeTruthy();
    
    // Check that source starts with https://
    expect(newSrc).toMatch(/^https:\/\//);
  });

});
