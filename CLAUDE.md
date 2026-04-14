# Additiv3 — Project Context for Claude

## What this project is
**Additiv3** is a Next.js website for a 3D manufacturing/printing service company. The site markets rapid prototyping, small batch manufacturing, and engineering-grade material printing.

## Tech stack
| Layer | Tech |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI library | Ant Design (antd) |
| Animation | GSAP + @gsap/react, ScrollTrigger |
| Smooth scroll | Lenis (`useLenis` hook) |
| Email | Resend |
| Theming | next-themes |

## Directory layout
```
src/
  app/                  # Next.js App Router pages
    page.tsx            # Homepage — assembles all section components
    layout.tsx          # Root layout
    materials/          # Materials catalogue page
    services/           # Services detail page
    quote/              # Quote request page
    api/contact/        # Contact form API route (Resend)
    api/quote/          # Quote form API route
  components/
    layout/
      MainHeader.tsx    # Global navigation (desktop dropdown + mobile hamburger)
      MobileMenu.tsx    # Slide-in mobile menu
      MainFooter.tsx
    sections/           # Homepage sections (rendered in page.tsx)
      HeroSection.tsx
      TrustSection.tsx        # "Trusted by builders…" section + icon cards
      ServicesSection.tsx     # "Manufacturing Built for…" horizontal scroll cards
      ProcessSection.tsx
      MaterialsSection.tsx
      FinalCTASection.tsx
      ContactSection.tsx
      FAQSection.tsx          # FAQ accordion inside MotionModal
    common/
      MotionModal.tsx   # Animated modal wrapper (used by FAQ & Contact)
    materials/          # Components for /materials page
    quote/              # Components for /quote page
    SmoothScrolling.tsx # Lenis provider + useLenis hook
  data/
    materials.ts        # Material definitions for catalogue
  theme/
    themeConfig.tsx     # Ant Design token overrides
```

## Navigation wiring
`MainHeader` receives optional callbacks from `page.tsx`:
- `onFAQClick` — opens FAQModal
- `onContactClick` — opens ContactSection modal
- `onStartProjectClick` — opens Quote modal

## Copy / content rules (updated)
- CTA button label: **"Get a Quote!"** (was "Start your Project")
- Contact nav link: **"Contact Us"** (capital U)
- "R and D" is always written **"R&D"**
- **"small manufacturers" / "Small Manufacturers"** is removed from all copy and icon cards

## FAQ content (FAQSection.tsx)
Six Q&A items rendered with Ant Design `<Collapse>`. To change questions/answers, edit the `faqItems` array at the top of the file.

## Patterns to follow
- Inline styles are the norm — no separate CSS files for components.
- Breakpoints use Ant Design's `Grid.useBreakpoint()` hook (`screens.md`, `screens.xl`).
- GSAP animations are scoped to a `sectionRef` via `useGSAP({ scope: sectionRef })`.
- All client components have `'use client'` at the top.
