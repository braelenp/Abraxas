# Mobile-First Responsive Design Guide

## Overview

Raido is built with a **mobile-first** approach using Tailwind CSS. All components are optimized for mobile devices first, with progressive enhancements for larger screens.

## Breakpoints

```
Base (Mobile)    |  sm: 640px  |  md: 768px  |  lg: 1024px  |  xl: 1280px
================|=============|=============|==============|==============
```

## Responsive Patterns

### Text Sizing

Use scaling text sizes for hierarchy:

```tsx
// Mobile → Tablet → Desktop
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Heading
</h1>

<p className="text-xs md:text-sm lg:text-base">
  Body text
</p>
```

### Spacing

Stack on mobile, spread on desktop:

```tsx
// Mobile stack, desktop row
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
  {/* items */}
</div>

// Flexible flex direction
<div className="flex flex-col md:flex-row gap-4">
  {/* items */}
</div>
```

### Touch Targets

Ensure tappable elements are at least 44px:

```tsx
// Good
<button className="px-4 md:px-6 py-3 md:py-4 rounded-lg">
  Button
</button>

// Avoid small targets
<button className="px-2 py-1">
  Too small
</button>
```

### Navigation

Responsive header with mobile menu:

```tsx
// Desktop nav always visible
<nav className="hidden md:flex gap-8">
  {/* menu items */}
</nav>

// Mobile menu hidden by default
{mobileMenuOpen && (
  <div className="md:hidden">
    {/* mobile menu */}
  </div>
)}
```

## Component Examples

### Alert/Card on Mobile

```tsx
<div className="bg-raido-deep-blue-accent rounded-lg p-4 md:p-6 lg:p-8">
  {/* Mobile: p-4, Tablet: p-6, Desktop: p-8 */}
</div>
```

### Multi-Column Layout

```tsx
<div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8">
  {/* 1 column on mobile */}
  {/* Auto columns on md+ based on grid-cols-{n} */}
  <div className="md:col-span-2 lg:col-span-3">
    Full width
  </div>
</div>
```

### Image Scaling

```tsx
<img 
  src="image.svg" 
  alt="Raidho Rune"
  className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
/>
```

## Testing Mobile Responsiveness

### Browser DevTools

1. **Chrome/Edge:**
   - F12 → Toggle Device Toolbar (Ctrl+Shift+M)
   - Test at: 375px, 768px, 1024px, 1440px

2. **Firefox:**
   - F12 → Responsive Design Mode (Ctrl+Shift+M)

### Test Scenarios

#### Mobile (< 640px)
- iPhone 12/13/14: 390px width
- Pixel 6/7: 412px width
- Fold devices: 550px+ when unfolded
- Landscape: 800x600+

#### Tablet (640px - 1024px)
- iPad Mini: 768x1024
- iPad Air: 820x1180
- iPad Pro: 1024x1366

#### Desktop (> 1024px)
- 1920x1080
- 2560x1440
- 3840x2160 (4K)

### Performance Testing

1. Run `npm run build`
2. Check bundle size: `npm run preview`
3. Test on actual devices when possible
4. Use Chrome DevTools Performance tab
5. Monitor particle effects at lower-end devices

## Common Issues

### Text Overflow
```tsx
// ✗ Fixed width truncation
<div className="w-full font-bold">Very long text</div>

// ✓ Responsive with truncation
<div className="w-full font-bold truncate">
  Very long text
</div>

// ✓ Responsive sizing
<h2 className="text-lg md:text-2xl xl:text-3xl">
  Responsive heading
</h2>
```

### Touch Spacing
```tsx
// ✗ Too close on mobile
<div className="flex gap-1">
  <button>A</button>
  <button>B</button>
</div>

// ✓ Better spacing
<div className="flex gap-2 md:gap-4">
  <button>A</button>
  <button>B</button>
</div>
```

### Modal/Overlay
```tsx
{isOpen && (
  <div className="fixed inset-0 z-50 p-4 md:p-0 flex items-center justify-center">
    <div className="w-full md:w-1/2 lg:w-1/3 max-w-lg">
      {/* Full width on mobile, centered on desktop */}
    </div>
  </div>
)}
```

## Accessibility on Mobile

- Touch targets: 44x44px minimum
- Enough padding between interactive elements
- Text contrast ratios meet WCAG AA (4.5:1)
- Readable font sizes (minimum 16px on input fields)
- Tap feedback (visual state change)

## Performance Optimization

### For Mobile Devices

1. Reduce particle intensity for low-end devices
2. Disable heavy animations on slow connections
3. Lazy load heavy components
4. Optimize images (SVG for icons)
5. Use CSS transforms for better performance

```tsx
// Reduce effects for mobile
<ParticleBackground 
  intensity={window.innerWidth < 640 ? 0.2 : 0.5}
/>
```

## Testing Checklist

- [ ] Test on actual mobile devices
- [ ] Verify touch targets are 44px+
- [ ] Check text is readable without zoom
- [ ] Verify no horizontal scroll
- [ ] Test orientation changes (portrait/landscape)
- [ ] Verify modal/overlay behavior
- [ ] Check navigation accessibility
- [ ] Test with various network speeds
- [ ] Verify animations don't cause jank
- [ ] Check battery impact of particle effects

---

**Mobile-first ensures great experience for everyone. ✓**
