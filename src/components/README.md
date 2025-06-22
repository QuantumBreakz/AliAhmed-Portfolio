# Components Documentation

This directory contains all React components for Ali Ahmed's portfolio website. Each component is designed to be modular, reusable, and maintainable.

## 📁 Component Structure

```
components/
├── Character/           # 3D character and animations
│   ├── Scene.tsx       # Main 3D scene component
│   └── utils/          # Character utility functions
├── styles/             # Component-specific CSS files
├── utils/              # Utility functions and helpers
├── About.tsx           # About me section
├── Career.tsx          # Work experience timeline
├── Contact.tsx         # Contact information
├── Cursor.tsx          # Custom cursor
├── HoverLinks.tsx      # Hover link component
├── Landing.tsx         # Hero section
├── Loading.tsx         # Loading screen
├── MainContainer.tsx   # Main layout container
├── Navbar.tsx          # Navigation header
├── SocialIcons.tsx     # Social media icons
├── TechStack.tsx       # Technology stack showcase
├── WhatIDo.tsx         # Skills and expertise
├── Work.tsx            # Project portfolio
└── WorkImage.tsx       # Project image component
```

## 🧩 Component Details

### **Page Components**

#### `Landing.tsx`
**Purpose**: Hero section with professional introduction
```typescript
interface PropsWithChildren {
  children?: React.ReactNode;
}
```
**Features**:
- Professional greeting animation
- Role display with cycling text
- Profile picture integration
- Responsive design
**Styling**: `styles/Landing.css`
**Dependencies**: React, CSS modules

#### `About.tsx`
**Purpose**: Professional summary section
```typescript
// No props required
```
**Features**:
- Concise two-line professional summary
- Clean typography
- Responsive layout
**Content**: Professional background and expertise
**Styling**: `styles/About.css`

#### `Career.tsx`
**Purpose**: Work experience timeline
```typescript
// No props required
```
**Features**:
- Chronological experience display
- Company and role information
- Detailed job descriptions
- Timeline visualization
**Data Structure**:
```typescript
interface CareerItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
}
```
**Styling**: `styles/Career.css`

#### `Work.tsx`
**Purpose**: Project portfolio showcase
```typescript
// No props required
```
**Features**:
- Project grid layout
- Technology stack display
- Stock images integration
- Horizontal scrolling
**Data Structure**:
```typescript
interface Project {
  id: number;
  name: string;
  category: string;
  tools: string;
  description: string;
  image: string;
}
```
**Styling**: `styles/Work.css`
**Dependencies**: GSAP, ScrollTrigger

#### `Contact.tsx`
**Purpose**: Contact information and social links
```typescript
// No props required
```
**Features**:
- Professional contact details
- Social media links
- Technology stack display
- Languages section
**Links**: GitHub, LinkedIn, Email, Phone
**Styling**: `styles/Contact.css`

#### `WhatIDo.tsx`
**Purpose**: Skills and expertise showcase
```typescript
// No props required
```
**Features**:
- Interactive skill cards
- Technology categorization
- Hover animations
- Responsive design
**Categories**: Development, AI & ML
**Styling**: `styles/WhatIDo.css`
**Dependencies**: GSAP, ScrollTrigger

### **Navigation Components**

#### `Navbar.tsx`
**Purpose**: Navigation header
```typescript
// No props required
```
**Features**:
- Smooth scrolling navigation
- Logo display (AA)
- Contact email integration
- Responsive design
**Navigation Items**: About, Work, Contact
**Styling**: `styles/Navbar.css`
**Dependencies**: GSAP, ScrollTrigger

#### `SocialIcons.tsx`
**Purpose**: Social media icons
```typescript
// No props required
```
**Features**:
- Interactive hover effects
- Mouse tracking animations
- Professional social links
- Smooth transitions
**Icons**: GitHub, LinkedIn, X, Instagram
**Styling**: `styles/SocialIcons.css`
**Dependencies**: React Icons, GSAP

### **Interactive Components**

#### `Cursor.tsx`
**Purpose**: Custom cursor implementation
```typescript
// No props required
```
**Features**:
- Smooth cursor following
- Hover state changes
- Interactive elements
- Performance optimized
**Styling**: `styles/Cursor.css`
**Dependencies**: GSAP

#### `Loading.tsx`
**Purpose**: Loading screen
```typescript
interface LoadingProps {
  percent: number;
}
```
**Features**:
- Progress animation
- Professional branding
- Smooth transitions
- Interactive elements
**Styling**: `styles/Loading.css`
**Dependencies**: GSAP, React Fast Marquee

#### `HoverLinks.tsx`
**Purpose**: Hover link component
```typescript
interface HoverLinksProps {
  text: string;
}
```
**Features**:
- Text hover effects
- Smooth animations
- Reusable component
**Styling**: Inline styles
**Dependencies**: GSAP

### **3D Character Components**

#### `Character/Scene.tsx`
**Purpose**: 3D character scene management
```typescript
// No props required
```
**Features**:
- Three.js scene setup
- Character loading and animation
- Mouse interaction
- Performance optimization
**Dependencies**: Three.js, GSAP, React Three Fiber
**Styling**: Character-specific CSS

#### `Character/utils/`
**Purpose**: Character utility functions

**`character.ts`**:
```typescript
interface CharacterConfig {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
}
```

**`lighting.ts`**:
```typescript
interface LightingConfig {
  scene: THREE.Scene;
}
```

**`animationUtils.ts`**:
```typescript
interface AnimationConfig {
  gltf: GLTF;
  mixer: THREE.AnimationMixer;
}
```

**`mouseUtils.ts`**:
```typescript
interface MouseConfig {
  x: number;
  y: number;
  interpolation: { x: number; y: number };
}
```

**`resizeUtils.ts`**:
```typescript
interface ResizeConfig {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  canvasDiv: React.RefObject<HTMLDivElement>;
  character: THREE.Object3D;
}
```

### **Utility Components**

#### `WorkImage.tsx`
**Purpose**: Project image component
```typescript
interface WorkImageProps {
  image: string;
  alt: string;
}
```
**Features**:
- Image optimization
- Alt text support
- Responsive design
- Loading states

#### `TechStack.tsx`
**Purpose**: Technology stack showcase
```typescript
// No props required
```
**Features**:
- 3D technology spheres
- Interactive animations
- Physics simulation
- Responsive design
**Dependencies**: Three.js, React Three Fiber, React Three Rapier

### **Utility Functions**

#### `utils/splitText.ts`
**Purpose**: Text animation utilities
```typescript
export default function setSplitText(): void
```
**Features**:
- GSAP text animations
- Scroll-triggered effects
- Responsive text handling
- Performance optimization
**Dependencies**: GSAP, ScrollTrigger

#### `utils/initialFX.ts`
**Purpose**: Initial page animations
```typescript
export function initialFX(): void
```
**Features**:
- Landing page effects
- Text reveal animations
- Loading transitions
- Smooth interactions
**Dependencies**: GSAP

#### `utils/GsapScroll.ts`
**Purpose**: Scroll-based animations
```typescript
export function setCharTimeline(
  character: THREE.Object3D | null,
  camera: THREE.PerspectiveCamera
): void

export function setAllTimeline(): void
```
**Features**:
- Character timeline animations
- Career section effects
- Scroll-triggered interactions
- Performance optimization
**Dependencies**: GSAP, ScrollTrigger, Three.js

## 🎨 Styling System

### **CSS Architecture**
- Component-specific CSS files
- CSS variables for theming
- Responsive design patterns
- Performance optimization

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

### **Responsive Breakpoints**
```css
/* Mobile */
@media screen and (max-width: 768px) { }

/* Tablet */
@media screen and (min-width: 768px) and (max-width: 1024px) { }

/* Desktop */
@media screen and (min-width: 1024px) { }

/* Large Desktop */
@media screen and (min-width: 1600px) { }
```

## 🔧 Component Development

### **Creating New Components**
```typescript
import React from 'react';
import './styles/NewComponent.css';

interface NewComponentProps {
  // Define props
}

const NewComponent: React.FC<NewComponentProps> = ({ props }) => {
  // Component logic
  
  return (
    <div className="new-component">
      {/* JSX content */}
    </div>
  );
};

export default NewComponent;
```

### **Component Guidelines**
1. **TypeScript**: Use strict typing for all components
2. **Props Interface**: Define clear prop interfaces
3. **CSS Modules**: Use component-specific CSS files
4. **Performance**: Implement React.memo for expensive components
5. **Accessibility**: Include proper ARIA labels and semantic HTML
6. **Responsive**: Ensure mobile-first design
7. **Animation**: Use GSAP for complex animations

### **State Management**
- Use React hooks for local state
- Context API for global state
- Proper cleanup in useEffect
- Memoization for performance

### **Error Handling**
```typescript
const Component: React.FC = () => {
  const [error, setError] = useState<Error | null>(null);
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return <div>Component content</div>;
};
```

## 📊 Performance Optimization

### **Component Optimization**
- React.memo for expensive components
- useMemo for expensive calculations
- useCallback for function memoization
- Lazy loading for heavy components

### **Animation Performance**
- GSAP for smooth animations
- RequestAnimationFrame for custom animations
- Proper cleanup and disposal
- Reduced motion support

### **3D Performance**
- Level of detail (LOD) for 3D models
- Frustum culling
- Texture optimization
- Geometry instancing

## 🧪 Testing

### **Component Testing**
```typescript
import { render, screen } from '@testing-library/react';
import Component from './Component';

test('renders component', () => {
  render(<Component />);
  expect(screen.getByText('Component text')).toBeInTheDocument();
});
```

### **Integration Testing**
- Component interaction testing
- User flow testing
- Performance testing
- Accessibility testing

## 📈 Monitoring

### **Performance Metrics**
- Component render times
- Animation frame rates
- Memory usage
- Bundle size impact

### **Error Tracking**
- Error boundaries
- Console error monitoring
- User feedback collection
- Performance monitoring

## 🔍 Debugging

### **Development Tools**
- React Developer Tools
- Three.js Inspector
- GSAP DevTools
- Browser Performance Tools

### **Common Issues**
1. **Memory Leaks**: Proper cleanup in useEffect
2. **Animation Performance**: Optimize GSAP animations
3. **3D Performance**: Reduce polygon count and texture size
4. **Responsive Issues**: Test on multiple devices

---

**For more information, see the main [README.md](../../README.md) file.** 