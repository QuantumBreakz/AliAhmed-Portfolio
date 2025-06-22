# Source Code Documentation

This directory contains all the source code for Ali Ahmed's portfolio website. The codebase is built with React, TypeScript, and modern web technologies.

## 📁 Directory Structure

```
src/
├── components/          # React components
│   ├── Character/       # 3D character and animations
│   ├── styles/          # Component-specific CSS files
│   └── utils/           # Utility functions and helpers
├── context/             # React context providers
├── data/                # Static data and configuration
├── assets/              # Source assets and images
├── App.tsx              # Main application component
├── App.css              # Global application styles
├── main.tsx             # Application entry point
├── index.css            # Global CSS and variables
└── vite-env.d.ts        # Vite environment types
```

## 🧩 Components

### **Core Components**

#### `App.tsx`
- **Purpose**: Main application component
- **Features**: 
  - Lazy loading for performance optimization
  - Loading provider context
  - Character model integration
- **Dependencies**: React, LoadingProvider, CharacterModel

#### `MainContainer.tsx`
- **Purpose**: Main layout container
- **Features**:
  - Responsive design handling
  - Component organization
  - Split text animations
- **Components**: Landing, About, WhatIDo, Career, Work, Contact

### **Page Components**

#### `Landing.tsx`
- **Purpose**: Hero section with introduction
- **Features**:
  - Professional greeting
  - Role display with animations
  - Profile picture integration
- **Props**: PropsWithChildren
- **Styling**: `styles/Landing.css`

#### `About.tsx`
- **Purpose**: Professional summary section
- **Features**:
  - Concise personal description
  - Professional background
- **Content**: Two-line professional summary
- **Styling**: `styles/About.css`

#### `Career.tsx`
- **Purpose**: Work experience timeline
- **Features**:
  - Chronological experience display
  - Company and role information
  - Detailed job descriptions
- **Data**: Work history from 2023-2025
- **Styling**: `styles/Career.css`

#### `Work.tsx`
- **Purpose**: Project portfolio showcase
- **Features**:
  - Project grid layout
  - Technology stack display
  - Stock images for projects
- **Projects**: 6 featured projects
- **Styling**: `styles/Work.css`

#### `Contact.tsx`
- **Purpose**: Contact information and social links
- **Features**:
  - Professional contact details
  - Social media links
  - Technology stack display
- **Links**: GitHub, LinkedIn, Email, Phone
- **Styling**: `styles/Contact.css`

#### `WhatIDo.tsx`
- **Purpose**: Skills and expertise showcase
- **Features**:
  - Interactive skill cards
  - Technology categorization
  - Hover animations
- **Categories**: Development, AI & ML
- **Styling**: `styles/WhatIDo.css`

### **Interactive Components**

#### `Navbar.tsx`
- **Purpose**: Navigation header
- **Features**:
  - Smooth scrolling navigation
  - Logo display
  - Contact email
- **Links**: About, Work, Contact
- **Styling**: `styles/Navbar.css`

#### `SocialIcons.tsx`
- **Purpose**: Social media icons
- **Features**:
  - Interactive hover effects
  - Mouse tracking animations
  - Professional social links
- **Icons**: GitHub, LinkedIn, X, Instagram
- **Styling**: `styles/SocialIcons.css`

#### `Cursor.tsx`
- **Purpose**: Custom cursor implementation
- **Features**:
  - Smooth cursor following
  - Hover state changes
  - Interactive elements
- **Styling**: `styles/Cursor.css`

#### `Loading.tsx`
- **Purpose**: Loading screen
- **Features**:
  - Progress animation
  - Professional branding
  - Smooth transitions
- **Animation**: GSAP-powered
- **Styling**: `styles/Loading.css`

### **3D Character Components**

#### `Character/Scene.tsx`
- **Purpose**: 3D character scene management
- **Features**:
  - Three.js scene setup
  - Character loading and animation
  - Mouse interaction
- **Dependencies**: Three.js, GSAP
- **Styling**: Character-specific CSS

#### `Character/utils/`
- **Purpose**: Character utility functions
- **Files**:
  - `character.ts`: Character loading logic
  - `lighting.ts`: Scene lighting setup
  - `animationUtils.ts`: Animation management
  - `mouseUtils.ts`: Mouse interaction
  - `resizeUtils.ts`: Responsive handling

### **Utility Components**

#### `utils/splitText.ts`
- **Purpose**: Text animation utilities
- **Features**:
  - GSAP text animations
  - Scroll-triggered effects
  - Responsive text handling
- **Dependencies**: GSAP, ScrollTrigger

#### `utils/initialFX.ts`
- **Purpose**: Initial page animations
- **Features**:
  - Landing page effects
  - Text reveal animations
  - Loading transitions
- **Dependencies**: GSAP

#### `utils/GsapScroll.ts`
- **Purpose**: Scroll-based animations
- **Features**:
  - Character timeline animations
  - Career section effects
  - Scroll-triggered interactions
- **Dependencies**: GSAP, ScrollTrigger

## 🎨 Styling

### **Global Styles**
- `index.css`: Global CSS variables and base styles
- `App.css`: Application-wide styles
- CSS Variables for consistent theming

### **Component Styles**
All component styles are located in `components/styles/`:
- Modular CSS approach
- Component-specific styling
- Responsive design patterns

### **CSS Variables**
```css
:root {
  --accentColor: #c2a4ff;
  --backgroundColor: #0b080c;
  --vh: 100vh;
  --cWidth: calc(100% - 30px);
  --cMaxWidth: 1920px;
}
```

## 📊 Data Management

### **Static Data**
- `data/boneData.ts`: 3D character bone definitions
- Component-specific data in respective files
- Configuration objects for animations

### **Context Providers**
- `context/LoadingProvider.tsx`: Loading state management
- Global state for application-wide data

## 🔧 Development Guidelines

### **Component Structure**
```typescript
import React from 'react';
import './styles/ComponentName.css';

interface ComponentProps {
  // Define props interface
}

const ComponentName: React.FC<ComponentProps> = ({ props }) => {
  // Component logic
  
  return (
    <div className="component-class">
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

### **Styling Conventions**
- Use CSS modules or component-specific CSS files
- Follow BEM methodology for class naming
- Use CSS variables for consistent theming
- Implement responsive design patterns

### **Animation Guidelines**
- Use GSAP for complex animations
- Implement scroll-triggered effects
- Ensure smooth performance
- Provide fallbacks for reduced motion

### **Performance Optimization**
- Lazy load heavy components
- Optimize images and assets
- Use React.memo for expensive components
- Implement proper cleanup in useEffect

## 🚀 Build Process

### **Development**
```bash
npm run dev
```
- Hot module replacement
- Fast refresh
- Development optimizations

### **Production**
```bash
npm run build
```
- Code splitting
- Tree shaking
- Asset optimization
- Minification

## 📱 Responsive Design

### **Breakpoints**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1600px

### **Mobile Considerations**
- Touch-friendly interactions
- Optimized 3D performance
- Simplified animations
- Responsive typography

## 🔍 Code Quality

### **TypeScript**
- Strict type checking
- Interface definitions
- Type safety for all components
- Proper error handling

### **ESLint Configuration**
- React-specific rules
- TypeScript integration
- Code style enforcement
- Best practices validation

## 📈 Performance Metrics

### **Optimization Targets**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

### **Monitoring**
- Bundle size analysis
- Performance profiling
- Lighthouse audits
- Real user metrics

## 🛠️ Troubleshooting

### **Common Issues**
1. **3D Model Loading**: Check file paths and compression
2. **Animation Performance**: Optimize GSAP animations
3. **Responsive Issues**: Verify breakpoint implementations
4. **Build Errors**: Check TypeScript and ESLint configurations

### **Debug Tools**
- React Developer Tools
- Three.js Inspector
- GSAP DevTools
- Browser Performance Tools

---

**For more information, see the main [README.md](../README.md) file.** 