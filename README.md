# pixiv-node-client
提供最基础的图像搜索api，原是用于满足傻吊群友图像搜索需求的qq bot。主要解决了其他pixiv api库的两个问题，1.对境内开发者无法设置代理，2. 现有的使用用户名和密码登录的api被pixiv所限制，登录起来很麻烦，还不如直接使用cookie。
# 安装
```bash
yarn add pixiv-node-client
```
或者
```bash
npm install pixiv-node-client
```
# 例子
```ts
import * as fs from 'fs'
import { PixivClient } from 'pixiv-node-client'
const pixivClient = new PixivClient({
    headers: { cookie: process.env.PIXIV_COOKIE ?? '' }, // 如果没账号或者不是会员，可以忽略，主要影响是不是会员没排序
    requestConf: { proxy: { port: 10080, host: '127.0.0.1' } } // 在境外或者使用tun透明代理等可以忽略
})

// const pixivClient = new PixivClient() 满足上面的条件也可以这样

const main = async () => {
    {
        // 获取搜索结果
        const { illust } = await pixivClient.searchByKeyword({ word: 'miko' })
        // 下载并并保存缩略图
        const img = await pixivClient.getImgByPixivUrl(illust.data[0].url)
        fs.writeFileSync('miko.jpg', img)
        // 获取并保存源图
        const { urls } = await pixivClient.getIllust(illust.data[0].id)
        fs.writeFileSync('miko-original.jpg', await pixivClient.getImgByPixivUrl(urls.original))
    }
    {
        // 获取搜索结果
        const { illust } = await pixivClient.searchByKeyword({
            word: '秽翼的尤斯蒂娅',
            mode: 'safe', // 全年龄，默认所有图片
            order: 'popular_female_d', // 受女性欢迎排序，默认受欢迎程度,
            p: 2 // 第二页
        })
        const { urls } = await pixivClient.getIllust(illust.data[0].id)
        fs.writeFileSync('秽翼的尤斯蒂娅-original.jpg', await pixivClient.getImgByPixivUrl(urls.original))
    }
}
main()
```
