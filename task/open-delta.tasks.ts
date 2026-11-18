import openSite from "../interactions/open-site.interactions";
import { test, expect , Page } from '@playwright/test';
import { getWorld } from '../supports/world-instance';
import { World } from "../supports/worlds";




const openDelta= async()=>{
    await openSite(getWorld().page);
    await getWorld().page.waitForTimeout(10000);


}
export default openDelta