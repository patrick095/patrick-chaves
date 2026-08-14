import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const routes = ['/', '/projetos/apexlap-coach'] as const;
const languageStorageKey = 'patrick-chaves.language';
const viewports = [
  { name: 'mobile-320', width: 320, height: 700 },
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-430', width: 430, height: 932 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'notebook', width: 1024, height: 700 },
  { name: 'desktop-boundary', width: 1280, height: 800 },
  { name: 'full-hd', width: 1920, height: 1080 },
  { name: 'large', width: 2560, height: 1440 },
] as const;

test.beforeEach(async ({ page }) => {
  await page.addInitScript((storageKey) => {
    try {
      localStorage.setItem(storageKey, 'pt-BR');
    } catch {
      // The script can also run in an opaque initial document.
    }
  }, languageStorageKey);
});

function collectRuntimeErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (message) => {
    const text = message.text();
    if (
      message.type() === 'error' ||
      /NG05\d{2}|hydration (?:error|mismatch|failed)|missing translation/i.test(text)
    ) {
      errors.push(`console ${message.type()}: ${text}`);
    }
  });
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  return errors;
}

for (const viewport of viewports) {
  for (const route of routes) {
    test(`${route} reflows without overflow at ${viewport.name}`, async ({ page }) => {
      const runtimeErrors = collectRuntimeErrors(page);
      await page.setViewportSize(viewport);
      await page.goto(route);
      await expect(page.locator('main')).toBeVisible();

      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);

      const protrudingElements = await page.locator('body *').evaluateAll((elements) =>
        elements.flatMap((element) => {
          const htmlElement = element as HTMLElement;
          const style = getComputedStyle(htmlElement);
          const rect = htmlElement.getBoundingClientRect();
          const isRendered =
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            rect.width > 1 &&
            rect.height > 1;
          const protrudes = rect.left < -1 || rect.right > window.innerWidth + 1;
          return isRendered && protrudes
            ? [`${htmlElement.tagName.toLowerCase()}.${htmlElement.className}: ${rect.left}/${rect.right}`]
            : [];
        }),
      );
      expect(protrudingElements).toEqual([]);
      expect(runtimeErrors).toEqual([]);
    });
  }
}

for (const route of routes) {
  test(`${route} passes axe WCAG 2.2 AA`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test(`${route} exposes coherent landmarks, headings, images and links`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.locator('header').first()).toBeVisible();
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);

    const headingLevels = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((headings) =>
      headings.map((heading) => Number(heading.tagName.slice(1))),
    );
    expect(headingLevels[0]).toBe(1);
    for (let index = 1; index < headingLevels.length; index += 1) {
      expect(headingLevels[index] - headingLevels[index - 1]).toBeLessThanOrEqual(1);
    }

    for (const image of await page.locator('img').all()) {
      await expect(image).toHaveAttribute('alt', /\S+/);
      await expect(image).toHaveAttribute('width', /^[1-9]\d*$/);
      await expect(image).toHaveAttribute('height', /^[1-9]\d*$/);
    }

    const invalidLinks = await page.locator('a').evaluateAll((links) =>
      links.flatMap((link) => {
        const href = link.getAttribute('href') ?? '';
        return href === '' || href === '#' || /^javascript:/i.test(href) ? [href] : [];
      }),
    );
    expect(invalidLinks).toEqual([]);

    const unannouncedBlankLinks = await page.locator('a[target="_blank"]').evaluateAll((links) =>
      links.flatMap((link) =>
        link.textContent?.includes('abre em nova aba') ? [] : [link.textContent?.trim() ?? ''],
      ),
    );
    expect(unannouncedBlankLinks).toEqual([]);
  });
}

for (const viewport of [
  { name: 'mobile', width: 320, height: 700 },
  { name: 'desktop', width: 1440, height: 900 },
]) {
  test(`header remains pinned while scrolling on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const header = page.locator('app-site-header');
    await expect(header).toBeVisible();

    expect(await header.evaluate((element) => getComputedStyle(element).position)).toBe('sticky');

    await page.evaluate(() => {
      const maximumScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, Math.min(1200, maximumScroll));
    });

    await expect
      .poll(() => header.evaluate((element) => element.getBoundingClientRect().top))
      .toBeGreaterThanOrEqual(-1);
    await expect
      .poll(() => header.evaluate((element) => element.getBoundingClientRect().top))
      .toBeLessThanOrEqual(1);
  });
}

test('skip link is first, visible on focus and moves focus to main', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await expect(page.locator('.skip-link')).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

test('mobile dialog manages keyboard, Escape, navigation and focus restoration', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Abrir menu' });
  const dialog = page.getByRole('dialog', { name: 'Navegação' });

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('link').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');

  await toggle.click();
  await dialog.getByRole('link', { name: 'Projetos' }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#projetos$/);
});

test('mobile primary controls meet the 44px touch target', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  for (const route of routes) {
    await page.goto(route);
    const undersized = await page.locator('a:visible, button:visible').evaluateAll((controls) =>
      controls.flatMap((control) => {
        const rect = control.getBoundingClientRect();
        return rect.width + 0.1 < 44 || rect.height + 0.1 < 44
          ? [`${control.textContent?.trim() || control.getAttribute('aria-label')}: ${rect.width}x${rect.height}`]
          : [];
      }),
    );
    expect(undersized, route).toEqual([]);
  }
});

test('reduced motion removes non-essential transitions and transforms', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const motion = await page.locator('app-button-link a').first().evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      animationDuration: style.animationDuration,
      transitionDuration: style.transitionDuration,
      transform: style.transform,
    };
  });
  expect(Number.parseFloat(motion.animationDuration)).toBeLessThanOrEqual(0.00001);
  for (const duration of motion.transitionDuration.split(',')) {
    expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.00001);
  }
  expect(motion.transform).toBe('none');
});
