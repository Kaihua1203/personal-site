# 项目样式指南 (Project Style Guide)

## 1. 概述
本项目使用 **Astro** 结合 **TailwindCSS** 进行样式开发。站点具备双语（中文和英文）支持，并提供流畅的明暗模式（Light / Dark mode）切换机制。

## 2. 色彩与主题
站点使用通过 `@property`（Tailwind v4 语法）注册的 CSS 自定义属性来管理色彩。基于 `[data-theme='dark']` 属性，系统会自动切换 CSS 变量。

### 亮色模式 (Light Theme)
- **全局背景** (`--color-global-bg`): `#f7f4ee` (柔和、温暖的米白色)
- **全局文本** (`--color-global-text`): `#26231f` (深碳色，近乎黑色)
- **弱化文本** (`--color-muted`): `#756f66` (暖灰色)
- **链接/强调色** (`--color-link` / `--color-accent`): `#8a5a2b` (大地棕/橘色)
- **次级强调色** (`--color-accent-2`): `#efe1cf` (暖米色)
- **引用块背景** (`--color-quote`): `#e3d8c8`

### 暗色模式 (Dark Theme)
- **全局背景** (`--color-global-bg`): `#151311` (极深的灰/棕色)
- **全局文本** (`--color-global-text`): `#eee7dc` (柔和的奶油色)
- **弱化文本** (`--color-muted`): `#b8ad9f` (柔和的米色)
- **链接/强调色** (`--color-link` / `--color-accent`): `#d6a15f` (浅大地橘/沙色)
- **次级强调色** (`--color-accent-2`): `#3a2a1a` (深棕色)
- **引用块背景** (`--color-quote`): `#3a332d`

## 3. 排版与字体
核心字体栈针对中英文的易读性进行了专门优化：
`"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", system-ui, -apple-system, sans-serif`

Tailwind 的排版插件 (`@tailwindcss/typography`) 负责处理 Markdown (`prose`) 样式，并结合自定义覆盖规则以匹配站点的色彩调色板。

## 4. UI 组件与布局
- **链接 (`.cactus-link`)**: 带有偏移的下划线，悬停 (hover) 时会改变装饰线颜色。
- **标题 (`.title`)**: 加粗 (`font-semibold`)，在特定上下文中使用 `accent-2` 颜色，并支持响应式尺寸（从 `text-[2.1rem]` 到 `sm:text-[2.55rem]`）。
- **代码块**: 由 `astro-expressive-code` 处理，亮色模式使用 `github-light` 主题，暗色模式使用 `dracula` 主题。
- **过渡动画**: 背景、文本、链接和强调色在切换颜色模式时，具有平滑的 `300ms ease-in-out` 过渡效果。启用了 View Transitions API 以支持丝滑的导航切换 (`navigation: auto`)。

## 5. 编码规范
- 确保使用通过 Tailwind 的 `@theme` 映射的 `CSS Variables` (CSS 变量)，以保证暗色模式的正常工作。
- 将 Markdown 代码块的样式交由 `astro-expressive-code` 处理。
- 尽可能遵循现有的 Tailwind Typography 覆盖规则（位于 `tailwind.config.ts` 中），避免直接编写原生的 CSS 来为 Markdown 设置样式。
