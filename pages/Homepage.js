const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.loader = page.locator('#loader'); 
    this.mainContent = page.locator('#main'); 
    this.myDreamsButton = page.getByText('My Dreams'); 
  }

  async navigate() {
    await this.page.goto('https://arjitnigam.github.io/myDreams/');
  }

  async verifyLoadingAnimation() {
    console.log('Verifying loading animation...');
    await expect(this.loader).toBeVisible();
    await this.page.waitForTimeout(3500); 
    await expect(this.loader).toBeHidden();
    console.log('Loading animation verified.');
  }

  async verifyMainContent() {
    console.log('Verifying main content and button...');
    await expect(this.mainContent).toBeVisible();
    await expect(this.myDreamsButton).toBeVisible();
    console.log('Main content verified.');
  }

  async clickMyDreams() {
    console.log('Clicking "My Dreams" button...');
    const [diaryPage, totalPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.context().waitForEvent('page'),
      this.myDreamsButton.click(),
    ]);
    await diaryPage.waitForLoadState('load');
    await totalPage.waitForLoadState('load');
    console.log('New tabs opened.');
    return { diaryPage, totalPage };
  }
}

module.exports = HomePage;
