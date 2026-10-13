# KeyRec companion website

This is a buildless HTML/CSS/JavaScript project page. No Node.js, Python, Ubuntu, or WSL is needed to view the downloadable GitHub Pages package: unzip it and double-click `index.html`.

## GitHub Pages（Windows 可操作）

下载包中 `index.html`、`style.css`、`app.js`、`assets/` 放在同一级目录。将这些文件及 `.nojekyll` 上传到你的网站 GitHub 仓库根目录，保留 assets 文件夹结构。

1. 打开仓库 Settings → Pages。
2. Source 选择 Deploy from a branch。
3. Branch 选择 main，目录选择 /(root)，点击 Save。
4. 等待 GitHub Pages 部署完成；在 Pages 设置页打开显示的网址。

官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

The hosted source checkout keeps those same public files under `dist/`; the ZIP flattens `dist/` into the package root for GitHub Pages. `.openai/` is specific to the hosted preview and is excluded from the ZIP.


## 编辑文件

- dist/index.html：内容、链接、作者、视频区域。
- dist/style.css：响应式排版、字体、色彩。
- dist/app.js：结果数据、benchmark 切换、五档路由动画。
- dist/assets/：论文 PDF 和提取的原始图。

No external fonts, JavaScript frameworks, CDNs, analytics, or model APIs are required. The site works under a GitHub Pages subpath because all asset references are relative.

## Validation

Local asset and anchor resolution, JavaScript syntax, 15-setting data coverage, tied-best counting, and five router allocations checked. Browser-based screenshot/layout testing was unavailable in this environment; desktop/mobile CSS is implemented but not browser-verified.
