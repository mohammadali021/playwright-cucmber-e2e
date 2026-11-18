import { Given, Then } from '@cucumber/cucumber';
import openSite from "../interactions/open-site.interactions";
import openDelta from "../task/open-delta.tasks"
import checkTextOnPage from "../task/check-text-on-page.task"

Given('I open the website',async()=>{
    await openDelta();
});


Then('the text should be visible in page {string}', async(text:string)=>{
    await checkTextOnPage(text)
});