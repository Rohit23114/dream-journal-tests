# dream-journal-tests
# Dream Journaling Website Test Automation

Automates functional testing for https://arjitnigam.github.io/myDreams/ using Playwright (JS) with POM.

## Features
- Covers all required pages and validations.
- Bonus: AI classification via OpenAI API, screenshots, potential Allure reporting.

## Setup
1. `npm install`
2. `npx playwright install`
3. For AI: Export `OPENAI_API_KEY=your_key_here`
4. For Allure: `npm install -D allure-playwright`, update config reporter.

## Running Tests
- `npx playwright test`
- View HTML report: `npx playwright show-report`
- Allure: `npx playwright test --reporter=allure-playwright`, then `allure serve`

## Notes
- Tests run in non-headless mode for visibility; change in config.
- Screenshots saved in `/screenshots` folder.
- Adjust selectors if site HTML changes (based on assumptions from task).

For issues, contact via GitHub.
