import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Practice Test Automation - Login Validation', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC-01: Successful login with valid credentials', async () => {
    await loginPage.login('student', 'Password123');
    await loginPage.verifySuccessMessage('Logged In Successfully');
  });

  test('TC-02: Verification of post-login navigation URL', async ({ page }) => {
    await loginPage.login('student', 'Password123');
    await page.waitForURL('**/logged-in-successfully/');
  });

  test('TC-06: Unsuccessful login with incorrect username', async () => {
    await loginPage.login('invalidUser', 'Password123');
    await loginPage.verifyErrorMessage('Your username is invalid!');
  });

  test('TC-07: Unsuccessful login with incorrect password', async () => {
    await loginPage.login('student', 'WrongPassword');
    await loginPage.verifyErrorMessage('Your password is invalid!');
  });
});
