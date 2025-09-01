import { test, expect } from '@playwright/test';

test.describe('Piano Chord Charts', () => {
  test.beforeEach(async ({ page }) => {
    // Load the local HTML file
    await page.goto('file://' + process.cwd() + '/piano_chord_charts_a4 (3).html');
  });

  test('should display all chord sections', async ({ page }) => {
    const chordSections = page.locator('section.sheet');
    await expect(chordSections).toHaveCount(4);
    
    // Verify chord titles
    await expect(chordSections.nth(0).locator('h1')).toHaveText('C Major');
    await expect(chordSections.nth(1).locator('h1')).toHaveText('G Major');
    await expect(chordSections.nth(2).locator('h1')).toHaveText('D Major');
    await expect(chordSections.nth(3).locator('h1')).toHaveText('A Major');
  });

  test('should display correct notes for C Major chord', async ({ page }) => {
    const cMajorSection = page.locator('section.sheet').first();
    const notes = cMajorSection.locator('.note');
    
    await expect(notes).toHaveCount(3);
    await expect(notes.nth(0)).toHaveText('C');
    await expect(notes.nth(1)).toHaveText('E');
    await expect(notes.nth(2)).toHaveText('G');
    
    // Verify note colors (white keys)
    await expect(notes.nth(0)).toHaveCSS('color', 'rgb(0, 0, 0)');
    await expect(notes.nth(1)).toHaveCSS('color', 'rgb(0, 0, 0)');
    await expect(notes.nth(2)).toHaveCSS('color', 'rgb(0, 0, 0)');
    
    // Verify fill colors
    const fills = cMajorSection.locator('.fill');
    await expect(fills.nth(0)).toHaveCSS('background-color', 'rgb(204, 57, 188)');
  });

  test('should have proper ARIA labels for accessibility', async ({ page }) => {
    const cMajorKeyboard = page.locator('section.sheet').first().locator('.keyboard');
    await expect(cMajorKeyboard).toHaveAttribute('aria-label', 'C Major chord chart (root position, range F4-B5)');
    
    // Verify key labels
    const whiteKeys = cMajorKeyboard.locator('.white');
    await expect(whiteKeys.first()).toHaveAttribute('aria-label', 'F');
  });

  test('should have correct visual styling', async ({ page }) => {
    const cMajorSection = page.locator('section.sheet').first();
    
    // Verify section styling
    await expect(cMajorSection).toHaveCSS('border-color', 'rgb(204, 57, 188)');
    await expect(cMajorSection).toHaveCSS('background-color', 'rgb(250, 239, 249)');
    
    // Verify keyboard container
    const keyboardWrap = cMajorSection.locator('.keyboard-wrap');
    await expect(keyboardWrap).toHaveCSS('position', 'relative');
    await expect(keyboardWrap).toHaveCSS('width', '100%');
    
    // Take a screenshot for visual comparison
    await expect(cMajorSection).toHaveScreenshot('c-major-chord.png');
  });
});
