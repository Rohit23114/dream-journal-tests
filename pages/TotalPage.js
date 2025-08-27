const { expect } = require('@playwright/test');

class TotalPage {
  constructor(page) {
    this.page = page;
    this.tableRows = page.locator('table tr');
  }

  async verifyStats() {
    console.log('Verifying summary stats...');
    const good = await this.tableRows.nth(1).locator('td').nth(1).innerText(); 
    const bad = await this.tableRows.nth(2).locator('td').nth(1).innerText();   
    const total = await this.tableRows.nth(3).locator('td').nth(1).innerText(); 
    const recurring = await this.tableRows.nth(5).locator('td').nth(1).innerText(); 

    await expect(good).toBe('6');
    await expect(bad).toBe('4');
    await expect(total).toBe('10');
    await expect(recurring).toBe('2');
    console.log('Stats verified.');
  }
}

module.exports = TotalPage;
