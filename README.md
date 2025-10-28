# Hoy Barato（静态前端）

一个简单的静态站点，包含首页、产品列表、详情、订单、账户、聊天与隐私页面。

## 项目结构
- `index.html`：主入口
- `pages/`：子页面（`home.html`, `product-detail.html`, `orders.html`, `account.html`, `chat.html`, `privacy.html`）
- `css/styles.css`：全局样式
- `js/`：各页面脚本（`home.js`, `products.js`, `product-detail.js`, `orders.js`, `account.js`, `chat.js`, `language.js`）
- `images/`：图片资源

## 本地运行
已安装 Node 的情况下，可使用一个极简的 Node 静态服务器：
1. 在项目根目录创建 `server.js`（见本仓库样例）。
2. 运行 `node server.js`。
3. 打开浏览器访问 `http://localhost:8080/`，隐私页为 `http://localhost:8080/pages/privacy.html`。

（如本机有 Python3，也可 `python3 -m http.server 8000`，访问 `http://localhost:8000/`）

## 开发建议
- 新增页面放在 `pages/` 目录中，样式引用 `../css/styles.css`。
- 从 `pages/` 访问根目录资源时使用相对路径，例如 `../index.html`。

## GitHub Pages 部署
1. 在 GitHub 新建仓库。
2. 将 `HoyBarato/` 目录下全部文件推送到仓库（保持为仓库根）。
3. 进入仓库 Settings → Pages，选择部署来源为 `main` 分支和根目录。
4. 等待几分钟，GitHub Pages 会生成公开 URL。

## 许可证
个人/教学用途，可按需调整。