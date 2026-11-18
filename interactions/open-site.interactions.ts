import { test, expect , Page } from '@playwright/test';



const openSite = async(page:Page)=>{
    await page.goto('https://delta.ir/', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
});
}

export default openSite