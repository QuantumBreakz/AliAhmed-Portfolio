# Ali Ahmed - Portfolio Website

A modern, responsive portfolio website showcasing Ali Ahmed's work as a Software and AI Engineer. Built with React, TypeScript, and GSAP for smooth animations and professional presentation.

## 🌟 Features

### **Professional Design**
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Responsive Layout**: Fully responsive across all devices and screen sizes
- **Dark Theme**: Elegant dark theme with purple accent colors
- **Smooth Scrolling**: GSAP-powered smooth scrolling and animations

### **Interactive Elements**
- **3D Character Model**: Interactive 3D character with animations
- **Hover Effects**: Advanced hover animations and cursor effects
- **Loading Screen**: Professional loading screen with progress animation
- **Social Icons**: Interactive social media icons with mouse tracking

### **Content Sections**
- **Hero Section**: Professional introduction with profile picture
- **About Me**: Concise professional summary
- **Skills & Expertise**: Detailed breakdown of technical skills
- **Work Experience**: Comprehensive career timeline
- **Projects Portfolio**: Showcase of key projects with images
- **Contact Information**: Professional contact details and social links
- **Technology Stack**: Complete list of programming languages and tools

## 🛠️ Technologies Used

### **Frontend Framework**
- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript 5.5.3**: Type-safe development
- **Vite 5.4.1**: Fast build tool and development server

### **Styling & Animation**
- **GSAP 3.12.7**: Professional animations and scroll triggers
- **CSS3**: Custom styling with modern CSS features
- **React Icons**: Professional icon library

### **3D & Graphics**
- **Three.js**: 3D character model and animations
- **React Three Fiber**: React integration for Three.js
- **React Three Drei**: Useful helpers for Three.js

### **Development Tools**
- **ESLint**: Code linting and quality assurance
- **TypeScript ESLint**: TypeScript-specific linting rules

## 📁 Project Structure

```
ali-ahmed-portfolio/
├── public/                 # Static assets
│   ├── images/            # Project images and assets
│   │   ├── models/        # 3D model files
│   │   └── profilepic.jpg # Profile picture
│   ├── draco/             # Draco compression files
│   └── assets/            # Source assets
├── src/
│   ├── components/        # React components
│   │   ├── Character/     # 3D character components
│   │   ├── styles/        # Component-specific CSS
│   │   └── utils/         # Utility functions
│   ├── context/           # React context providers
│   ├── data/              # Static data files
│   └── assets/            # Source assets
├── dist/                  # Build output
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/QuantumBreakz/AliAhmed-Portfolio.git
   cd AliAhmed-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### **Build for Production**

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 📋 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## 🎨 Customization

### **Personal Information**
Update the following files to customize personal information:
- `src/components/Landing.tsx` - Hero section content
- `src/components/About.tsx` - About me section
- `src/components/Career.tsx` - Work experience
- `src/components/Work.tsx` - Project portfolio
- `src/components/Contact.tsx` - Contact information

### **Styling**
- `src/index.css` - Global styles and CSS variables
- `src/components/styles/` - Component-specific styles
- CSS variables in `:root` for easy theme customization

### **3D Character**
- `public/models/` - 3D model files
- `src/components/Character/` - Character animation and interaction logic

## 🔧 Configuration

### **Environment Variables**
Create a `.env` file for environment-specific configuration:
```env
VITE_APP_TITLE=Ali Ahmed Portfolio
VITE_APP_DESCRIPTION=Software & AI Engineer Portfolio
```

### **Build Configuration**
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1600px

## 🎯 Performance Optimization

- **Code Splitting**: Lazy loading for heavy components
- **Image Optimization**: Optimized images and assets
- **Bundle Optimization**: Tree shaking and minification
- **3D Model Compression**: Draco compression for 3D assets

## 🔒 Security

- **Content Security Policy**: Configured for secure content loading
- **External Links**: `rel="noopener noreferrer"` for security
- **Input Validation**: TypeScript for type safety

## 📈 Analytics & SEO

- **Meta Tags**: Optimized for search engines
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD for rich snippets

## 🚀 Deployment

### **Netlify**
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### **Vercel**
1. Import your GitHub repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### **GitHub Pages**
1. Enable GitHub Pages in repository settings
2. Set source to GitHub Actions
3. Use the provided workflow for automatic deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ali Ahmed**
- **GitHub**: [@QuantumBreakz](https://github.com/QuantumBreakz)
- **LinkedIn**: [Ali Ahmed](https://linkedin.com/in/ali-ahmed-hustletothemax92)
- **Email**: ali.ahmed.work.dev@gmail.com

## 🙏 Acknowledgments

- **GSAP**: For amazing animation capabilities
- **Three.js**: For 3D graphics and animations
- **React Community**: For excellent documentation and support
- **Vite**: For fast development experience

## 📞 Support

If you have any questions or need support:
- Create an issue on GitHub
- Contact via email: ali.ahmed.work.dev@gmail.com
- Connect on LinkedIn: [Ali Ahmed](https://linkedin.com/in/ali-ahmed-hustletothemax92)

---

**Built with ❤️ by Ali Ahmed**
