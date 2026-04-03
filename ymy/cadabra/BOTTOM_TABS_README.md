# Cadabra Bottom Tabs

Sticky bottom navigation tabs styled after Abraxas, tailored for Cadabra's social and meme economy features.

## Features

- **6 Navigation Tabs**: Mirror (Home), Search, Trending, Create, Market, Identity
- **Cyan Glow Effects**: Active tabs display characteristic cyan-400 drop shadow
- **Sticky Positioning**: Always visible at bottom while scrolling content
- **Responsive Design**: Hidden on mobile/tablet, visible on desktop (lg and up)
- **Smooth Transitions**: All state changes animate smoothly (300ms)
- **Meme Economy Ready**: Tab names reflect Cadabra's social tokenization focus

## Component Structure

### BottomTabs Component

Located at: `src/components/BottomTabs.tsx`

```typescript
interface BottomTabsProps {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

type Tab = 'home' | 'explore' | 'post' | 'trending' | 'marketplace' | 'profile'
```

### Tab Definitions

| Tab | Icon | Label | Symbol | Purpose |
|-----|------|-------|--------|---------|
| home | ◇ | Mirror | HOME | Timeline and network feed |
| explore | 🔍 | Search | FIND | Search and discovery |
| trending | ⚡ | Trending | TREND | Real-time trending topics |
| post | ✨ | Create | MAKE | Create posts and content |
| marketplace | 👥 | Market | KOLS | KOL marketplace |
| profile | 👤 | Identity | SELF | User profile and holdings |

## Usage

### Basic Integration

```typescript
import { useState } from 'react'
import { BottomTabs } from '@/components/BottomTabs'

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')

  return (
    <div className="min-h-screen">
      {/* Main content */}
      <MainContent activeTab={activeTab} />
      
      {/* Bottom tabs sticky footer */}
      <BottomTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
```

### With Routing

```typescript
import { useNavigate } from 'react-router-dom'
import { BottomTabs } from '@/components/BottomTabs'

export function Layout() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('home')

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    navigate(`/${tab}`)
  }

  return (
    <>
      <MainContent />
      <BottomTabs activeTab={activeTab} setActiveTab={handleTabChange} />
    </>
  )
}
```

## Styling

### CSS Classes

Key utility classes from `src/styles/bottom-tabs.css`:

- `.smooth-transition` - Smooth 300ms transitions
- `.glow-cyan` - Full cyan glow effect (12px shadow)
- `.glow-cyan-subtle` - Subtle glow (8px shadow)
- `.tab-active` - Active tab styling
- `.tab-inactive` - Inactive tab styling
- `.bottom-tabs-container` - Container styling
- `.pulse-glow` - Pulsing glow animation
- `.slide-up` - Slide-up entrance animation

### Tailwind Configuration

Ensure your `tailwind.config` includes:

```javascript
theme: {
  extend: {
    colors: {
      cyan: {
        // Ensure cyan-300, cyan-400 are available
      },
      slate: {
        // Ensure slate-950, slate-600, slate-700 are available
      },
    },
    backdropBlur: {
      xl: '16px', // For backdrop-blur-xl
    },
  },
}
```

## Customization

### Changing Tab Labels

Edit the `tabs` array in `src/components/BottomTabs.tsx`:

```typescript
const tabs: Array<{ id: Tab; label: string; icon: string; symbol: string }> = [
  { id: 'home', label: 'Your Custom Label', icon: '🔮', symbol: 'CUSTOM' },
  // ...
]
```

### Modifying Colors

Update Tailwind classes in the component:

- Active text: `text-cyan-300` → your color
- Glow shadow: `rgba(0,217,255,0.8)` → your RGB
- Border: `border-cyan-400/15` → your color

### Adjusting Spacing

Modify padding and gaps:

```typescript
<nav className="... px-6 py-4"> {/* Change px/py */}
  <div className="flex gap-4"> {/* Change gap */}
```

### Auto-Hide on Scroll

Add scroll-hide functionality:

```typescript
const [isScrolling, setIsScrolling] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    setIsScrolling(window.scrollY > 100)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

// In JSX:
<nav className={`${isScrolling ? 'opacity-50' : 'opacity-100'} transition-opacity`}>
```

## Demo Page

View the tabs in action at `src/pages/BottomTabsDemo.tsx`

Features:
- Interactive tab switching
- Live content preview
- Feature highlights
- Tab descriptions

To integrate into routing:

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomTabsDemo from '@/pages/BottomTabsDemo'

export function Router() {
  return (
    <Routes>
      <Route path="/demo/bottom-tabs" element={<BottomTabsDemo />} />
    </Routes>
  )
}
```

## Responsive Behavior

- **Mobile/Tablet** (< lg): Hidden
- **Desktop** (lg and up): Visible at bottom
- **Extra Large** (2xl): Max-width container keeps tabs aligned

Adjust responsive display:

```typescript
// Change from 'hidden lg:flex' to always visible:
<nav className="fixed bottom-0 ... flex justify-center">
```

## Performance Considerations

- Tabs use CSS transitions (GPU accelerated)
- No heavy re-renders on tab switch
- Backdrop blur is supported in modern browsers
- Fixed positioning doesn't affect layout flow

### Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (with vendor prefix for backdrop-blur)
- IE11: No support (backdrop-blur, CSS grid)

## Integration Checklist

- [ ] Import `BottomTabs` component
- [ ] Import `bottom-tabs.css` in main CSS
- [ ] Set up state for active tab
- [ ] Connect tabs to routing or content switching
- [ ] Test on desktop (lg breakpoint minimum)
- [ ] Customize tab colors/labels if needed
- [ ] Test interactions and transitions

## Example: Full Integration

```typescript
// src/App.tsx
import { useState } from 'react'
import { BottomTabs } from '@/components/BottomTabs'
import '@/styles/bottom-tabs.css'

type Tab = 'home' | 'explore' | 'post' | 'trending' | 'marketplace' | 'profile'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <MirrorFeed />
      case 'explore':
        return <SearchPage />
      case 'trending':
        return <TrendingPage />
      case 'post':
        return <CreatePage />
      case 'marketplace':
        return <MarketplacePage />
      case 'profile':
        return <ProfilePage />
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {renderContent()}
      <BottomTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
```

## Troubleshooting

### Tabs not showing
- Check breakpoint: tabs only show on `lg` and up
- Verify `z-40` allows visibility over other elements
- Ensure CSS file is imported

### Colors look wrong
- Verify Tailwind cyan-300, cyan-400 colors in config
- Check browser supports `backdrop-blur-xl`
- Test in different themes (light/dark)

### Transitions not smooth
- Ensure no `pointer-events: none` blocking clicks
- Check `duration-300` in Tailwind config
- Verify CSS transitions not disabled globally

### Safe area issues on notch devices
- Add safe area constraints:
  ```typescript
  <nav className="... pb-[env(safe-area-inset-bottom)]">
  ```

## Related Components

- Sidebar (left navigation)
- MobileNav (mobile navigation)
- Navigation (top bar if applicable)

## Future Enhancements

- [ ] Badge notifications on tabs
- [ ] Sub-menu per tab
- [ ] Tab customization panel
- [ ] Quick actions menu
- [ ] Keyboard shortcuts (1-6 for tabs)
- [ ] Voice commands integration
- [ ] Gesture support (swipe)
