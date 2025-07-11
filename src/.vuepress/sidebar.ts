import { sidebar } from "vuepress-theme-hope";

import {getNestedSidebar } from './utils/autoSidebar.js'

export default sidebar({
    '/SecondBrain/': getNestedSidebar('SecondBrain')
});
