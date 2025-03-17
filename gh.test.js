let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const expected =
      "GitHub · Build and ship software on a single, collaborative platform · GitHub";
    const actual = await page.title();
    expect(actual).toEqual(expected);
  }, 20000);

  test("The first link attribute", async () => {
    const expected = "#start-of-content";
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual(expected);
  }, 25000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const expected = "Get started with Team";
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain(expected); //фактический результат содержит ожидаемый
  }, 20000);
});

describe("Second task: add 3 tests", () => {
  test("Blog", async () => {
    await page.goto("https://github.blog");
    const expected = "Home - The GitHub Blog";
    const actual = await page.title();
    expect(actual).toContain(expected);
  });

  test("Text is h1", async () => {
    await page.goto("https://github.com/features/security");
    const expected = "Security at every step";
    const h4Span = await "#hero-section-brand-heading";
    const actual = await page.$eval(h4Span, (el) => el.textContent);
    expect(actual).toEqual(expected);
  });

  test("Check title", async () => {
    await page.goto("https://github.com/pricing");
    const expected = "Pricing · Plans for every developer · GitHub";
    const actual = await page.title();
    expect(actual).toContain(expected);
  });
});
