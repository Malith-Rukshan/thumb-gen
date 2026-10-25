<p style="text-align:center;" align="center">
  <img align="center" src="https://raw.githubusercontent.com/Malith-Rukshan/thumb-gen/refs/heads/main/public/logo-promo.png" alt="ThumbGen" width="300px" height="300px"/>
</p>
<h1 align="center">ThumbGen</h1>
<div align='center'>

[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?logo=vue.js&logoColor=white&style=flat)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-01CC1D?logo=docker&style=flat)](https://hub.docker.com/r/malithrukshan/thumb-gen)
</div>

<h4 align="center">✨ Generate beautiful thumbnails from videos, animations, images, and text — all in your browser! 🚀</h4>

<div align="center">
  - A modern, privacy-first thumbnail generation tool with zero server dependencies -
  <br/>
  <sup><sub>Powered by Canvas API and modern web technologies ツ</sub></sup>
</div>

## ✨ Features

- 🎬 **Video Thumbnail Generator** - Extract perfect frames from MP4, WebM, and OGG videos
- 🎨 **Lottie/TGS Thumbnail Generator** - Generate thumbnails from Lottie animations and Telegram stickers
- 🔗 **Base64 Image Converter** - Create tiny placeholders for progressive loading
- ✍️ **Text Thumbnail Generator** - Design custom text-based thumbnails with fonts and backgrounds
- 🛡️ **Watermark Tool** - Add text or image watermarks with batch processing
- 🔒 **100% Private** - All processing happens in your browser, no data uploaded
- 🚀 **Zero Dependencies** - No registration, no login, no tracking
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🎯 **Batch Processing** - Process multiple files at once with ZIP export
- 🌐 **PWA Ready** - Works offline after first visit

## 🛠️ Tools Overview

### Video Thumbnail Generator
Extract frames from video files with precise control:
- **Supported formats**: MP4, WebM, OGG
- **Frame selection**: Seekbar navigation with frame-by-frame control
- **Batch capture**: Capture multiple frames and export as ZIP
- **Custom sizing**: Adjustable output dimensions and quality
- **Perfect for**: YouTube thumbnails, video previews, course materials

### Lottie/TGS Thumbnail Generator
Generate static images from animated content:
- **Supported formats**: Lottie JSON, TGS stickers
- **Frame extraction**: Pick any frame from the animation
- **High quality**: Vector-based rendering for crisp output
- **Perfect for**: Animation portfolios, sticker previews, UI documentation

### Base64 Image Converter
Create ultra-light image placeholders:
- **Tiny sizes**: 2px to 32px preview generation
- **Progressive loading**: Smooth transition effects
- **Code generation**: HTML, CSS, React, Vue snippets
- **Size optimization**: See exact byte savings
- **Perfect for**: Website performance, blur-up effects, email templates

### Text Thumbnail Generator
Design custom text-based graphics:
- **Canvas control**: Custom dimensions with social media presets
- **Typography**: Multiple fonts, sizes, weights, and effects
- **Backgrounds**: Solid colors, gradients, or custom images
- **Text effects**: Shadows, strokes, and positioning controls
- **Perfect for**: Social media posts, blog headers, quote cards

### Watermark Tool
Protect and brand your images:
- **Dual support**: Text and image watermarks
- **Positioning**: 9 preset positions plus custom placement
- **Styling**: Opacity, rotation, and size controls
- **Batch processing**: Watermark multiple images at once
- **Perfect for**: Photography protection, brand placement, content marking

## 🚀 Quick Start

### Online Usage

![thumb-gen-ss](https://github.com/user-attachments/assets/ab939a57-791b-4f62-a436-dbadd6a6fbe3)

<div align="center">
Demo : <a href="https://thumb-gen.malith.dev">thumb-gen.malith.dev</a>
</div>

## 📦 Deployment Options

### 🚀 One-Click Deployments

Deploy instantly to popular platforms:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Malith-Rukshan/thumb-gen)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Malith-Rukshan/thumb-gen)

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.app/template/iV-Ljt)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Malith-Rukshan/thumb-gen)

### 🐳 Docker

Run [ThumbGen](https://hub.docker.com/r/malithrukshan/thumb-gen) in a container:

```bash
# Pull and run
docker pull malithrukshan/thumb-gen
docker run -p 3000:3000 malithrukshan/thumb-gen
```

Visit http://localhost:3000

#### Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  thumb-gen:
    image: malithrukshan/thumb-gen
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

#### Building Docker Image Locally

```bash
# Build the image
docker build -t thumb-gen .

# Run the container
docker run -p 3000:3000 thumb-gen
```

### Local Development

#### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 22.12+
- Git

#### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Malith-Rukshan/thumb-gen.git
   cd thumb-gen
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start development server**
   ```bash
   bun run dev
   ```

4. **Open your browser**
   ```
   Visit http://localhost:3000
   ```

#### Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production
bun run preview      # Preview production build

# Testing
bun run test         # Run tests in watch mode
bun run test:run     # Run tests once
bun run test:ui      # Run tests with UI
bun run test:coverage # Run tests with coverage

# Code Quality
bun run format       # Format code with Prettier
bun run type-check   # Check TypeScript types
```
<details>
    <summary>Click to view Results</summary>
<img src="https://github.com/user-attachments/assets/59f6955c-3ae7-40d7-b529-f9a748d6854d" alt="Vitest UI">
<img src="https://github.com/user-attachments/assets/19694324-498b-4795-b1b2-6228b7523de1" alt="Vitest CLI">
</br>
Test with : https://vitest.dev/
</details>

### ☁️ Platform-Specific Deployment

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Heroku
```bash
# Install Heroku CLI and login
git push heroku main
```

## 🧪 Testing

ThumbGen includes comprehensive test coverage:

```bash
# Run all tests
bun run test

# Run tests with coverage
bun run test:coverage

# Run tests with UI
bun run test:ui
```

## 🌐 Use Cases

- **Content Creation**: Generate thumbnails for YouTube videos, blog posts, and social media
- **Web Development**: Create base64 placeholders for better loading experiences
- **Design Workflows**: Quickly prototype text-based graphics and layouts
- **Brand Protection**: Add watermarks to images for copyright protection
- **Educational Content**: Extract frames from video tutorials and presentations
- **Marketing Materials**: Design eye-catching graphics for campaigns

## 🔧 Technology Stack

- **Framework**: Vue.js 3 with Composition API
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS 4 for modern UI
- **Routing**: Vue Router 4 for SPA navigation
- **State Management**: Pinia for reactive state
- **Build Tool**: Vite for fast development and building
- **Testing**: Vitest with Vue Test Utils
- **Package Manager**: Bun for fast dependency management

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** for new functionality
5. **Run the test suite**
   ```bash
   bun run test
   bun run type-check
   ```
6. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
7. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

### Development Guidelines

- Write tests for new features
- Follow the existing code style
- Use TypeScript for type safety
- Add JSDoc comments for complex functions
- Update documentation for API changes

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔧 Acknowledgements

- Built with [Vue.js](https://vuejs.org/) and [TypeScript](https://www.typescriptlang.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Animations powered by [Lottie Web](https://github.com/airbnb/lottie-web)
- File compression with [JSZip](https://stuk.github.io/jszip/)

## 🌟 Support

If you found ThumbGen helpful, please:

- ⭐ **Star this repository** on GitHub
- 🐛 **Report bugs** via GitHub Issues
- 💡 **Suggest features** via GitHub Discussions
- 🤝 **Contribute** by opening Pull Requests

## 📬 Contact
- **Email**: [hello@malith.dev](mailto:hello@malith.dev)
- **GitHub**: [Malith-Rukshan](https://github.com/Malith-Rukshan)
- **Live Demo**: [thumb-gen.malith.dev](https://thumb-gen.malith.dev)

---

<div align="center">
🧑‍💻 Built with 💖 by <a href="https://malith.dev">Malith Rukshan</a>
</div>
