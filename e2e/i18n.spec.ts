import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator, type Page } from "@playwright/test";

const languageStorageKey = "patrick-chaves.language";

const localeCopy = {
    "pt-BR": {
        home: {
            h1: "Desenvolvedor Full Stack Sênior e Tech Lead",
            title: "Patrick Chaves | Desenvolvedor Full Stack Sênior e Tech Lead",
            description:
                "Portfólio de Patrick Chaves, Desenvolvedor Full Stack Sênior e Tech Lead com mais de 6 anos de experiência em Angular, Java, Quarkus, Node.js e NestJS.",
        },
        caseStudy: {
            h1: "ApexLap Coach: telemetria transformada em orientação de pilotagem",
            title: "ApexLap Coach | Estudo de caso | Patrick Chaves",
            description:
                "Estudo técnico do ApexLap Coach, aplicativo desktop que compara telemetria do iRacing e organiza feedback de voz após curvas.",
            structuredDescription:
                "Aplicativo para iRacing que compara telemetria de uma volta com uma referência compatível e organiza feedback de voz após as curvas.",
        },
        ogLocale: "pt_BR",
        languageSelectorLabel: "Selecionar idioma",
        openMenu: "Abrir menu",
        mobileNavigation: "Navegação",
        firstMobileLink: "Sobre",
        jobTitle: "Desenvolvedor Full Stack Sênior e Tech Lead",
        resumeLabel: "Baixar currículo",
        resumeHref: "/pdfs/curriculo-patrick-chaves.pdf",
        resumeFilename: "Currículo - Patrick Chaves.pdf",
        opensInNewTab: "abre em nova aba",
    },
    en: {
        home: {
            h1: "Senior Full Stack Developer & Tech Lead",
            title: "Patrick Chaves | Senior Full Stack Developer & Tech Lead",
            description:
                "Patrick Chaves's portfolio: a Senior Full Stack Developer and Tech Lead with 6+ years of experience in Angular, Java, Quarkus, Node.js, and NestJS.",
        },
        caseStudy: {
            h1: "ApexLap Coach: turning telemetry into driving guidance",
            title: "ApexLap Coach | Case study | Patrick Chaves",
            description:
                "Technical case study of ApexLap Coach, a desktop application that compares iRacing telemetry and organizes voice feedback after corners.",
            structuredDescription:
                "An iRacing application that compares lap telemetry with a compatible reference and organizes voice feedback after each corner.",
        },
        ogLocale: "en_US",
        languageSelectorLabel: "Select language",
        openMenu: "Open menu",
        mobileNavigation: "Navigation",
        firstMobileLink: "About",
        jobTitle: "Senior Full Stack Developer & Tech Lead",
        resumeLabel: "Download resume",
        resumeHref: "/pdfs/Resume%20-%20Patrick%20Chaves.pdf",
        resumeFilename: "Resume - Patrick Chaves.pdf",
        opensInNewTab: "opens in a new tab",
    },
} as const;

type SupportedLanguage = keyof typeof localeCopy;

const routes = ["/", "/projetos/apexlap-coach"] as const;
const viewports = [
    { name: "mobile-320", width: 320, height: 700 },
    { name: "mobile-375", width: 375, height: 812 },
    { name: "mobile-390", width: 390, height: 844 },
    { name: "mobile-430", width: 430, height: 932 },
    { name: "tablet-portrait", width: 768, height: 1024 },
    { name: "tablet-landscape", width: 1024, height: 768 },
    { name: "notebook", width: 1024, height: 700 },
    { name: "desktop-boundary", width: 1280, height: 800 },
    { name: "full-hd", width: 1920, height: 1080 },
    { name: "large", width: 2560, height: 1440 },
] as const;

function collectRuntimeErrors(page: Page): string[] {
    const errors: string[] = [];
    page.on("console", (message) => {
        const text = message.text();
        if (
            message.type() === "error" ||
            /NG05\d{2}|hydration (?:error|mismatch|failed)|missing translation/i.test(
                text,
            )
        ) {
            errors.push(`console ${message.type()}: ${text}`);
        }
    });
    page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
    return errors;
}

async function initializeStorage(
    page: Page,
    language: SupportedLanguage | null,
): Promise<void> {
    await page.addInitScript(
        ({ key, value }) => {
            try {
                if (value === null) localStorage.removeItem(key);
                else if (localStorage.getItem(key) === null)
                    localStorage.setItem(key, value);
            } catch {
                // The script can also run in an opaque initial document.
            }
        },
        { key: languageStorageKey, value: language },
    );
}

async function expectMetadata(
    page: Page,
    language: SupportedLanguage,
    route: "home" | "caseStudy",
): Promise<void> {
    const copy = localeCopy[language];
    const pageCopy = copy[route];

    await expect(page.locator("html")).toHaveAttribute("lang", language);
    await expect(page).toHaveTitle(pageCopy.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        pageCopy.description,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
        "content",
        pageCopy.title,
    );
    await expect(
        page.locator('meta[property="og:description"]'),
    ).toHaveAttribute("content", pageCopy.description);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
        "content",
        copy.ogLocale,
    );
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
        "content",
        pageCopy.title,
    );
    await expect(
        page.locator('meta[name="twitter:description"]'),
    ).toHaveAttribute("content", pageCopy.description);
}

async function readStructuredData(
    locator: Locator,
): Promise<Record<string, unknown>> {
    await expect(locator).toHaveCount(1);
    return JSON.parse((await locator.textContent()) ?? "{}") as Record<
        string,
        unknown
    >;
}

async function expectHomeLocale(
    page: Page,
    language: SupportedLanguage,
): Promise<void> {
    const copy = localeCopy[language];
    await expect(
        page.getByRole("heading", { level: 1, name: copy.home.h1 }),
    ).toBeVisible();
    await expectMetadata(page, language, "home");

    const person = await readStructuredData(
        page.locator("#person-structured-data"),
    );
    const website = await readStructuredData(
        page.locator("#website-structured-data"),
    );
    expect(person["inLanguage"]).toBe(language);
    expect(person["jobTitle"]).toEqual([copy.jobTitle]);
    expect(website["inLanguage"]).toBe(language);
    await expect(page.locator("#inteligencia-artificial")).toHaveCount(0);
    await expect(page.getByText(/\bRAG\b/)).toHaveCount(0);
    await expect(page.locator("#experiencia")).toHaveCount(1);
}

async function expectCaseLocale(
    page: Page,
    language: SupportedLanguage,
): Promise<void> {
    const copy = localeCopy[language];
    await expect(
        page.getByRole("heading", { level: 1, name: copy.caseStudy.h1 }),
    ).toBeVisible();
    await expectMetadata(page, language, "caseStudy");

    const software = await readStructuredData(
        page.locator("#software-structured-data"),
    );
    expect(software["inLanguage"]).toBe(language);
    expect(software["description"]).toBe(copy.caseStudy.structuredDescription);
}

async function expectLanguageOptions(select: Locator): Promise<void> {
    await expect(select.locator("option")).toHaveText([
        "🇧🇷 Português",
        "🇺🇸 English",
    ]);
}

async function expectExternalLinksAnnounced(
    page: Page,
    language: SupportedLanguage,
): Promise<void> {
    const unexpected = await page
        .locator('a[target="_blank"]')
        .evaluateAll(
            (links, announcement) =>
                links.flatMap((link) =>
                    link.textContent?.includes(announcement as string)
                        ? []
                        : [link.textContent?.trim() ?? ""],
                ),
            localeCopy[language].opensInNewTab,
        );
    expect(unexpected).toEqual([]);
}

test.describe("browser language detection", () => {
    test.describe("Portuguese browser locale", () => {
        test.use({ locale: "pt-PT" });

        test("maps navigator pt* locales to pt-BR without persisting detection", async ({
            page,
        }) => {
            const runtimeErrors = collectRuntimeErrors(page);
            await page.setViewportSize({ width: 1440, height: 900 });
            await initializeStorage(page, null);
            await page.goto("/");

            expect(
                (
                    await page.evaluate(() => navigator.languages[0])
                ).toLowerCase(),
            ).toContain("pt");
            await expectHomeLocale(page, "pt-BR");
            const select = page.locator(
                ".desktop-actions select.language-select",
            );
            await expect(select).toHaveValue("pt-BR");
            await expect(select).toHaveAttribute(
                "aria-label",
                "Selecionar idioma",
            );
            await expectLanguageOptions(select);
            expect(
                await page.evaluate(
                    (key) => localStorage.getItem(key),
                    languageStorageKey,
                ),
            ).toBeNull();
            expect(runtimeErrors).toEqual([]);
        });
    });

    test.describe("non-Portuguese browser locale", () => {
        test.use({ locale: "fr-FR" });

        test("uses English as the fallback for every other browser language", async ({
            page,
        }) => {
            const runtimeErrors = collectRuntimeErrors(page);
            await page.setViewportSize({ width: 1440, height: 900 });
            await initializeStorage(page, null);
            await page.goto("/");

            expect(
                (
                    await page.evaluate(() => navigator.languages[0])
                ).toLowerCase(),
            ).toContain("fr");
            await expectHomeLocale(page, "en");
            const select = page.locator(
                ".desktop-actions select.language-select",
            );
            await expect(select).toHaveValue("en");
            await expect(select).toHaveAttribute(
                "aria-label",
                "Select language",
            );
            await expectLanguageOptions(select);
            expect(runtimeErrors).toEqual([]);
        });
    });
});

test("a valid saved preference wins over the browser language in both directions", async ({
    browser,
    baseURL,
}) => {
    const scenarios = [
        { browserLocale: "en-US", savedLanguage: "pt-BR" },
        { browserLocale: "pt-BR", savedLanguage: "en" },
    ] as const;

    for (const scenario of scenarios) {
        const context = await browser.newContext({
            baseURL: baseURL ?? "http://127.0.0.1:4200",
            locale: scenario.browserLocale,
        });
        const page = await context.newPage();
        const runtimeErrors = collectRuntimeErrors(page);
        await initializeStorage(page, scenario.savedLanguage);
        await page.goto("/");

        await expectHomeLocale(page, scenario.savedLanguage);
        expect(
            await page.evaluate(
                (key) => localStorage.getItem(key),
                languageStorageKey,
            ),
        ).toBe(scenario.savedLanguage);
        expect(runtimeErrors).toEqual([]);
        await context.close();
    }
});

test("manual selection updates the whole home atomically, persists, and never reloads", async ({
    page,
}) => {
    const runtimeErrors = collectRuntimeErrors(page);
    const documentRequests: string[] = [];
    page.on("request", (request) => {
        if (request.resourceType() === "document")
            documentRequests.push(request.url());
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await initializeStorage(page, "pt-BR");
    await page.goto("/");
    await expectHomeLocale(page, "pt-BR");

    const select = page.locator(".desktop-actions select.language-select");
    await select.selectOption("en");
    await expectHomeLocale(page, "en");
    await expect(select).toHaveValue("en");
    expect(documentRequests).toHaveLength(1);
    expect(
        await page.evaluate(
            (key) => localStorage.getItem(key),
            languageStorageKey,
        ),
    ).toBe("en");
    await expectExternalLinksAnnounced(page, "en");

    await page.reload();
    await expectHomeLocale(page, "en");
    expect(
        await page.evaluate(
            (key) => localStorage.getItem(key),
            languageStorageKey,
        ),
    ).toBe("en");

    await select.selectOption("pt-BR");
    await expectHomeLocale(page, "pt-BR");
    expect(
        await page.evaluate(
            (key) => localStorage.getItem(key),
            languageStorageKey,
        ),
    ).toBe("pt-BR");
    expect(runtimeErrors).toEqual([]);
});

test("the lazy case study, its accessible copy, and SEO switch without navigation", async ({
    page,
}) => {
    const runtimeErrors = collectRuntimeErrors(page);
    const documentRequests: string[] = [];
    page.on("request", (request) => {
        if (request.resourceType() === "document")
            documentRequests.push(request.url());
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await initializeStorage(page, "en");
    await page.goto("/projetos/apexlap-coach");

    await expectCaseLocale(page, "en");
    await expectExternalLinksAnnounced(page, "en");
    const select = page.locator(".desktop-actions select.language-select");
    await select.selectOption("pt-BR");
    await expectCaseLocale(page, "pt-BR");
    await expectExternalLinksAnnounced(page, "pt-BR");
    expect(documentRequests).toHaveLength(1);
    expect(runtimeErrors).toEqual([]);
});

test("both localized résumé links serve real PDFs with the requested filenames", async ({
    page,
}) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await initializeStorage(page, "pt-BR");
    await page.goto("/");

    for (const language of ["pt-BR", "en"] as const) {
        if (language === "en") {
            await page
                .locator(".desktop-actions select.language-select")
                .selectOption(language);
            await expect(page.locator("html")).toHaveAttribute(
                "lang",
                language,
            );
        }

        const copy = localeCopy[language];
        const link = page.locator(".desktop-actions .resume-link");
        await expect(link).toHaveText(copy.resumeLabel);
        await expect(link).toHaveAttribute("href", copy.resumeHref);
        await expect(link).toHaveAttribute("download", copy.resumeFilename);

        const response = await page.request.get(copy.resumeHref);
        expect(response.ok()).toBe(true);
        expect(response.headers()["content-type"]).toContain("application/pdf");
        expect((await response.body()).subarray(0, 4).toString()).toBe("%PDF");

        const downloadPromise = page.waitForEvent("download");
        await link.click();
        const download = await downloadPromise;
        expect(download.suggestedFilename()).toBe(copy.resumeFilename);
        expect(await download.failure()).toBeNull();
        await download.delete();
    }
});

for (const language of ["pt-BR", "en"] as const) {
    test(`mobile header remains accessible and localized in ${language}`, async ({
        page,
    }) => {
        const copy = localeCopy[language];
        const runtimeErrors = collectRuntimeErrors(page);
        await page.setViewportSize({ width: 320, height: 700 });
        await initializeStorage(page, language);
        await page.goto("/");

        const toggle = page.getByRole("button", { name: copy.openMenu });
        await toggle.click();
        const dialog = page.getByRole("dialog", {
            name: copy.mobileNavigation,
        });
        await expect(dialog).toBeVisible();
        await expect(
            dialog.getByRole("link", { name: copy.firstMobileLink }),
        ).toBeFocused();

        const select = dialog.getByRole("combobox", {
            name: copy.languageSelectorLabel,
        });
        await expect(select).toHaveValue(language);
        await expectLanguageOptions(select);

        const resume = dialog.locator(".mobile-resume");
        await expect(resume).toHaveText(copy.resumeLabel);
        await expect(resume).toHaveAttribute("href", copy.resumeHref);
        await expect(resume).toHaveAttribute("download", copy.resumeFilename);

        for (const control of [select, resume]) {
            const box = await control.boundingBox();
            expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
            expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
        }

        const axe = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
            .analyze();
        expect(axe.violations).toEqual([]);

        await page.keyboard.press("Escape");
        await expect(dialog).not.toBeVisible();
        await expect(toggle).toBeFocused();
        expect(runtimeErrors).toEqual([]);
    });
}

for (const viewport of viewports) {
    for (const route of routes) {
        test(`English ${route} reflows without overflow at ${viewport.name}`, async ({
            page,
        }) => {
            const runtimeErrors = collectRuntimeErrors(page);
            await page.setViewportSize(viewport);
            await initializeStorage(page, "en");
            await page.goto(route);
            await expect(page.locator("html")).toHaveAttribute("lang", "en");
            await expect(page.locator("main")).toBeVisible();

            const dimensions = await page.evaluate(() => ({
                clientWidth: document.documentElement.clientWidth,
                scrollWidth: document.documentElement.scrollWidth,
            }));
            expect(dimensions.scrollWidth).toBeLessThanOrEqual(
                dimensions.clientWidth + 1,
            );

            const protrudingElements = await page
                .locator("body *")
                .evaluateAll((elements) =>
                    elements.flatMap((element) => {
                        const htmlElement = element as HTMLElement;
                        const style = getComputedStyle(htmlElement);
                        const rect = htmlElement.getBoundingClientRect();
                        const isRendered =
                            style.display !== "none" &&
                            style.visibility !== "hidden" &&
                            rect.width > 1 &&
                            rect.height > 1;
                        const protrudes =
                            rect.left < -1 ||
                            rect.right > window.innerWidth + 1;
                        return isRendered && protrudes
                            ? [
                                  `${htmlElement.tagName.toLowerCase()}.${htmlElement.className}: ${rect.left}/${rect.right}`,
                              ]
                            : [];
                    }),
                );
            expect(protrudingElements).toEqual([]);
            expect(runtimeErrors).toEqual([]);
        });
    }
}

for (const route of routes) {
    test(`English ${route} passes axe WCAG 2.2 AA`, async ({ page }) => {
        await initializeStorage(page, "en");
        await page.goto(route);
        await expect(page.locator("html")).toHaveAttribute("lang", "en");
        const results = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
            .analyze();
        expect(results.violations).toEqual([]);
    });
}
