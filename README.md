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

## 内容来源与待补充内容

- 标题、方法、结果和案例以本次提供的 Visual_Token_Selection__ICLR_2027_(2).pdf 为准。
- 图 1 和图 8 从论文提取；首页帧图及小图也来自图 8。
- `app.js` 中的 15 行数据来自该 PDF 的 Table 1。原 ZIP 的 results/paper/reported_results.yaml 数值与当前 PDF 有差异，未使用旧 YAML。
- 主结果 readout ≈10%；persistent candidate memory ≈20%。页面没有将 10% 称为总存储或总算力比例。
- 路由动画采用 Table 11 的 Gemma streaming 参数：224-token readout，每事件16 tokens；五档事件数是 0、2、4、12、14。动画是方法说明，不是模型在线运行或实测时序轨迹。
- 内存表来自 Table 2，不是新增实验结果。
- 论文当前匿名，因此作者栏保留 Anonymous authors。补充作者和单位时编辑 index.html 的 authors 段。
- 正式 GitHub URL 确认后，将 Code repository 占位替换成链接。目前不生成猜测的仓库地址。
- 论文链接指向包内 PDF，可随时替换为 arXiv 或正式版本。
- Citation 保留待补，避免编造作者或 arXiv ID。

## 替换视频占位

将 MP4 放进 assets/，在 index.html 中找到 class="video-placeholder"，替换内部示意区为：

```html
<video controls playsinline preload="metadata" poster="assets/video-poster.jpg" style="width:100%;border-radius:8px">
  <source src="assets/keyrec-demo.mp4" type="video/mp4">
  Your browser does not support embedded video.
</video>
```

同时移除 COMING SOON 字样，并用实测案例说明替换占位说明；poster 文件可省略。支持 HTML5 的 Windows 浏览器可以本地播放。

## 编辑文件

- dist/index.html：内容、链接、作者、视频区域。
- dist/style.css：响应式排版、字体、色彩。
- dist/app.js：结果数据、benchmark 切换、五档路由动画。
- dist/assets/：论文 PDF 和提取的原始图。

No external fonts, JavaScript frameworks, CDNs, analytics, or model APIs are required. The site works under a GitHub Pages subpath because all asset references are relative.

## Validation

Local asset and anchor resolution, JavaScript syntax, 15-setting data coverage, tied-best counting, and five router allocations checked. Browser-based screenshot/layout testing was unavailable in this environment; desktop/mobile CSS is implemented but not browser-verified.
