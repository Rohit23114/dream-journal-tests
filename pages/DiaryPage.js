const { expect } = require('@playwright/test');

class DiaryPage {
  constructor(page) {
    this.page = page;
    this.tableRows = page.locator('table tr');
  }

  async verifyEntries() {
    console.log('Verifying dream entries...');
    const rowCount = await this.tableRows.count();
    await expect(rowCount - 1).toBe(10); 
    console.log('10 entries verified.');
  }

  async verifyRowData() {
    console.log('Verifying row data (types and filled columns)...');
    for (let i = 1; i <= 10; i++) {  
      const name = await this.tableRows.nth(i).locator('td').nth(0).innerText();
      const daysAgo = await this.tableRows.nth(i).locator('td').nth(1).innerText();
      const type = await this.tableRows.nth(i).locator('td').nth(2).innerText();

      expect(name).not.toBe('');
      expect(daysAgo).not.toBe('');
      expect(type).toBeOneOf(['Good', 'Bad']);
    }
    console.log('Row data verified.');
  }

  async getDreamNames() {
    const names = [];
    for (let i = 1; i <= 10; i++) {
      const name = await this.tableRows.nth(i).locator('td').nth(0).innerText();
      names.push(name);
    }
    return names;
  }

  async getDreamTypes() {
    const types = [];
    for (let i = 1; i <= 10; i++) {
      const type = await this.tableRows.nth(i).locator('td').nth(2).innerText();
      types.push(type);
    }
    return types;
  }
}

module.exports = DiaryPage;
