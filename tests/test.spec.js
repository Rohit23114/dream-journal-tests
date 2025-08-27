const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const DiaryPage = require('../pages/DiaryPage');
const TotalPage = require('../pages/TotalPage');

test.describe('Core UI Functional Tests', () => {
  test('Verify home page and navigation', async ({ page, context }) => {
    const home = new HomePage(page);
    await home.navigate();
    await home.verifyLoadingAnimation();
    await home.verifyMainContent();
    const { diaryPage, totalPage } = await home.clickMyDreams();

    // Verify diary
    const diary = new DiaryPage(diaryPage);
    await diary.verifyEntries();
    await diary.verifyRowData();

    // Recurring logic from diary
    const names = await diary.getDreamNames();
    const nameCount = new Map();
    names.forEach((name) => {
      nameCount.set(name, (nameCount.get(name) || 0) + 1);
    });
    const recurringCount = [...nameCount.values()].filter((c) => c > 1).length;
    expect(recurringCount).toBe(2);
    expect(nameCount.get('Flying over mountains')).toBeGreaterThan(1);
    expect(nameCount.get('Lost in maze')).toBeGreaterThan(1);
    console.log('Recurring dreams verified.');

    // Verify total
    const total = new TotalPage(totalPage);
    await total.verifyStats();

    // Screenshots (bonus)
    await page.screenshot({ path: 'screenshots/home.png' });
    await diaryPage.screenshot({ path: 'screenshots/diary.png' });
    await totalPage.screenshot({ path: 'screenshots/total.png' });
  });
});

test.describe('Bonus: AI-Based Validation', () => {
  async function classifyDream(name) {
    console.log(`Classifying dream: ${name}`);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `Classify this dream name as "Good" or "Bad": "${name}". Respond only with "Good" or "Bad".` }],
        temperature: 0,
      }),
    });
    const data = await response.json();
    return data.choices[0].message.content.trim();
  }

  test('Validate dream types with AI', async ({ page, context }) => {
    const home = new HomePage(page);
    await home.navigate();
    await home.verifyLoadingAnimation();
    await home.verifyMainContent();
    const { diaryPage } = await home.clickMyDreams(); 

    const diary = new DiaryPage(diaryPage);
    const names = await diary.getDreamNames();
    const types = await diary.getDreamTypes();

    for (let i = 0; i < names.length; i++) {
      const aiType = await classifyDream(names[i]);
      expect(aiType).toBe(types[i]);
      console.log(`AI classification for "${names[i]}": ${aiType} (matches table: ${types[i]})`);
    }
  });
});
