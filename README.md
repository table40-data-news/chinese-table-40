# 中国人的餐桌40年

一个面向数据新闻展示的互动网页原型，使用 React + Vite 构建。

## 本地预览

```bash
pnpm install
pnpm run dev
```

## 发布到 GitHub Pages

1. 在 GitHub 新建一个仓库，例如 `chinese-table-40`.
2. 把本项目推送到仓库的 `main` 分支。
3. 打开仓库 `Settings` -> `Pages`。
4. 在 `Build and deployment` 里选择 `Deploy from a branch`。
5. Branch 选择 `gh-pages` 和 `/ (root)`。
6. 等待 Actions 跑完，页面会发布到：

```text
https://你的用户名.github.io/仓库名/
```

本项目已经包含 `.github/workflows/deploy.yml`，推送到 `main` 后会自动构建并更新 `gh-pages` 发布分支。
