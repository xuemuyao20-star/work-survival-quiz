# 职场生存道具测评

一个中文、移动端优先的测评网站。前端使用原生 HTML、CSS、JavaScript；Supabase 提供安全的密码额度校验。

## 本地预览

本地静态预览可直接打开 `index.html`。该预览使用 `site-config.js` 中的演示密码 `SURVIVE2026`，并在当前浏览器里记录 5 次额度。要测试 Supabase 后端，需要先把项目配置到 `site-config.js`。

正式发布依赖 GitHub Actions，不需要在本机安装 Node、GitHub CLI 或 Supabase CLI。

## Supabase 后端

1. 在 Supabase 项目中运行 `supabase/migrations/202610110001_access_codes.sql`。
2. 部署 `supabase/functions/start-test` Edge Function，并关闭该函数的 JWT 校验（`supabase/config.toml` 已记录此设置）。函数通过 Supabase 服务端密钥访问数据库；该密钥绝不能放在网页或 GitHub Pages 配置里。
3. 创建密码时，只向 `private.access_codes` 插入哈希，不要把明文密码提交到代码仓库。示例 SQL（将占位文本替换成实际密码，在 Supabase SQL Editor 执行）：

   ```sql
   insert into private.access_codes (code_hash, uses_remaining)
   values (encode(extensions.digest(upper('换成你的密码'), 'sha256'), 'hex'), 5);
   ```

   每条记录有独立的 5 次额度。停用密码可将其 `disabled_at` 设为当前时间。

Supabase Free 项目在 7 天低活动后可能自动暂停。若要尽量保证长期随时可用，需要选择不会因不活跃自动暂停的付费计划；是否产生持续费用应由项目所有者确认。

## GitHub Pages 发布

1. 将当前目录推送到 GitHub 仓库的 `main` 分支。
2. 在仓库 **Settings → Secrets and variables → Actions → Variables** 添加：
   - `SUPABASE_URL`：Supabase 项目 URL。
   - `SUPABASE_PUBLISHABLE_KEY`：Supabase Publishable key（旧项目可用 anon public key）。这个浏览器端密钥本来就是公开的，数据库安全由 RLS 和 Edge Function 控制。
3. 在仓库 **Settings → Pages → Build and deployment** 将 Source 设为 **GitHub Actions**。
4. 推送到 `main` 或在 **Actions** 手动运行 `Deploy to GitHub Pages`。发布地址会显示在工作流结果和 Pages 设置页中。

```powershell
py -m http.server 8000
```

然后访问 `http://localhost:8000`。若电脑没有 Python，也可以把此目录部署到任意静态网站托管服务。

## 体验密码

当前体验密码：`SURVIVE2026`。可在 `app.js` 文件顶部修改 `ACCESS_CODE`。

## 功能

- 24 道工作情境题，支持上一题、修改答案和进度显示。
- 根据六项行为倾向匹配八种职场道具结果。
- 生成结果 PNG 长图，并可下载到手机或电脑。
- 复制带有结果数据的分享链接；链接打开后展示对应结果页。
- 本地演示每个密码最多答题五次（浏览器本地计数）；已部署版本通过 Supabase 数据库原子扣减每个密码的五次额度。
- “好评有礼”说明弹窗及移动端/桌面端自适应布局。

分享链接包含结果类型和六项汇总分数，不含密码或逐题答案。发布后复制的链接使用 GitHub Pages 正式地址。

题目参考工作要求—资源模型、工作重塑、角色清晰、建言与社会支持等概念设计，属于互动自我觉察内容，未经心理测量学信效度验证，不用于招聘筛选、绩效评估或心理诊断。

