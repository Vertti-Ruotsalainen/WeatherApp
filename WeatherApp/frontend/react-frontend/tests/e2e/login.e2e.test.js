import { test, expect } from '@playwright/test';

test('käyttäjä voi kirjautua ja nähdä sääsivun', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Sähköposti').fill('uusi@example.com');
  await page.getByPlaceholder('Salasana').fill('salasana123');
  await page.getByRole('button', { name: 'Kirjaudu' }).click();

  await expect(page.locator('text=Sääsovellus')).toBeVisible();
});
