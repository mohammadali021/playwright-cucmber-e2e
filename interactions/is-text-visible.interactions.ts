import{Page} from '@playwright/test'

const isTextVisible = async(page:Page , text:string)=>{
    const isVisible = await page.getByText("text").isVisible();
    return isVisible;
}
export default isTextVisible;