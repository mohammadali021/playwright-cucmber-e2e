import { getWorld } from "../supports/world-instance";
import{expect} from "@playwright/test"
import isTextVisible from '../interactions/is-text-visible.interactions';



const checkTextOnPage=async(text:string)=>{
    const page = await getWorld().page;
    
    let mm = await isTextVisible(page , text);
    await expect(mm).toBe("اولین سایت تخصصی ملکی ایران");

}
export default checkTextOnPage;