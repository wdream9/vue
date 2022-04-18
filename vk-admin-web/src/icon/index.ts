import type { App } from 'vue';
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'
// 全局注册矢量图标

export default function setupIcon(app: App<Element>) {
    Object.keys(Icons).forEach((key) => {
        app.component(key, Icons[key as keyof typeof Icons])
    });
}
