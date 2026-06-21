# StanceBeam Minimal Splash Screen

## Overview
Clean, minimal, and premium splash screen using the StanceBeam logo with a white background. Inspired by Apple, Linear, and Notion's launch experiences.

**Total Duration**: 1.8 seconds  
**Feeling**: Confident and minimal, not trying to impress with effects

---

## Design Principles

### **Visual**
- White background (#FFFFFF)
- StanceBeam logo perfectly centered
- Clean and minimal
- No gradients, no particles, no complex motion
- Generous whitespace
- Respect logo proportions

### **Motion**
- Very subtle scale animation (95% → 100%)
- Smooth fade in/out
- Apple-like smoothness
- Ease out animation
- Premium and understated

---

## Animation Timeline

### **Stage 1: Fade In (0-400ms)**
- White screen appears
- Logo fades in from 0 to 1 opacity
- Logo scales from 95% to 100%
- Ease out cubic animation
- Smooth and confident entrance

### **Stage 2: Hold (400-1400ms = 1 second)**
- Logo remains at full opacity
- No movement
- Brand moment
- User recognizes StanceBeam

### **Stage 3: Fade Out (1400-1800ms)**
- Logo fades out from 1 to 0 opacity
- Ease out cubic animation
- Clean exit

### **Stage 4: Transition (1800ms)**
- Complete transition
- Dashboard loads seamlessly

---

## Technical Implementation

### **Animation Function**
```typescript
easeOut = (t) => 1 - (1 - t)³
```

### **Scale Range**
- Start: 95% (0.95)
- End: 100% (1.0)
- Range: 5% (very subtle)

### **Opacity Range**
- Fade in: 0 → 1
- Fade out: 1 → 0

### **Duration Breakdown**
```
Total: 1800ms (1.8 seconds)
├─ Fade in: 400ms
├─ Hold: 1000ms (1 second)
└─ Fade out: 400ms
```

---

## Logo Implementation

### **Source**
- Uses provided StanceBeam logo image
- Located: `/public/stancebeam-logo.png`
- Original: `/Images/Stance Beam logo.png`

### **Display**
- Height: 120px
- Width: Auto (maintains aspect ratio)
- Object fit: Contain
- Perfectly centered vertically and horizontally

---

## Design References

### **Apple**
- Minimal and confident
- No unnecessary effects
- Focus on brand mark
- Clean white background

### **Linear**
- Fast and efficient
- Premium feeling without flash
- Subtle motion
- Understated elegance

### **Notion**
- Clean and modern
- Simple fade animations
- Brand-focused
- Professional appearance

---

## What Makes It Premium

✅ **Restraint** - No flashy effects  
✅ **Confidence** - Logo speaks for itself  
✅ **Smoothness** - Apple-quality easing  
✅ **Timing** - Perfect balance (not too slow, not too fast)  
✅ **Simplicity** - Nothing unnecessary  
✅ **Brand Focus** - Pure StanceBeam identity  

---

## What Was Avoided

❌ Gradients  
❌ Cricket illustrations  
❌ Particles  
❌ Complex motion graphics  
❌ Loading spinners  
❌ AI-style animations  
❌ Excessive glows  
❌ Multiple elements  
❌ Distracting effects  

---

## User Experience

### **First Impression**
- Clean and professional
- Confident brand presence
- Premium app quality
- Modern and minimal

### **Emotional Response**
- "This feels polished"
- "This is professional software"
- "Clean and modern"
- "I trust this brand"

### **Duration Balance**
- 1.8 seconds total
- Fast enough not to annoy
- Slow enough to register brand
- Perfect for daily use

---

## Integration

### **Component Usage**
```tsx
import SplashScreen from "@/components/sb/SplashScreen"

<SplashScreen onComplete={() => {
  setShowSplash(false)
}} />
```

### **Automatic Integration**
```tsx
import AppWithSplash from "@/components/sb/AppWithSplash"

<AppWithSplash />
```

---

## File Structure

```
/app
  /components
    /sb
      SplashScreen.tsx     (Minimal splash component)
      AppWithSplash.tsx    (Wrapper with state)
      JourneyScreen.tsx    (Main dashboard)
  /public
    stancebeam-logo.png    (Logo image)
  /Images
    Stance Beam logo.png   (Original logo)
```

---

## Future Considerations

### **Dark Mode Support**
```typescript
// Could detect system preference
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const bgColor = isDark ? "#000000" : "#FFFFFF"
```

### **Reduced Motion**
```typescript
// Respect accessibility preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const duration = prefersReducedMotion ? 100 : 400
```

### **Logo Variants**
- Light mode: Current logo
- Dark mode: White/light logo variant
- Could swap based on theme

---

## Performance

- **Lightweight**: Simple fade + scale only
- **Smooth**: 60fps animation via requestAnimationFrame
- **No jank**: GPU-accelerated transforms
- **Fast load**: Single image asset
- **No dependencies**: Pure CSS transforms

---

## Conclusion

This splash screen achieves:

✅ **Minimal and clean** - White background, centered logo  
✅ **Premium feeling** - Apple-like smoothness  
✅ **Brand focused** - Logo is the hero  
✅ **Confident** - Not trying to impress  
✅ **Professional** - Establishes quality immediately  
✅ **Fast** - 1.8 seconds total  
✅ **Accessible** - Simple and clear  

**Result**: A launch experience that immediately establishes the StanceBeam brand with confidence and restraint, exactly as requested.

