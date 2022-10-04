import { Browser, Page } from 'puppeteer';

// browser, pageの型定義を追加して、globalで使用できるようにする。
declare global {
  const browser: Browser;
  const page: Page;
}
