DESIGN.md — Shared Product Design System
Version: 1.0 · Style: Refined, editorial minimalism · Scope: Websites, SaaS dashboards, desktop apps, and mobile products

For AI agents (Codex, Claude Code, Cursor, Copilot): Read this entire file before making UI changes. Treat it as the default visual design contract across projects. Respect an existing project's brand and workflows. If a project-specific design file conflicts with this file, the project-specific requirement wins. Never sacrifice functionality to make an interface look minimal.

0. Intent
Build products that feel considered, calm, contemporary, and distinctly crafted. Establish a coherent visual language through refined typography, restrained color, precise spacing, carefully designed buttons, and consistent interaction patterns.

The shared identity comes from typography, spacing, geometry, contrast, and interaction quality, not from forcing all products to use the same logo, accent color, layout, or personality.
Five principles
1. Typography does the heavy lifting. Use confident headings, readable body text, and a small number of deliberate weights.
2. Buttons are designed, not default. Every control has intentional dimensions, alignment, surface treatment, and feedback.
3. Quiet surfaces, strong hierarchy. Neutrals carry the interface; color appears only when it has a role.
4. Clarity over decoration. No unnecessary gradients, glows, floating stickers, or ornamental helper copy.
5. Polish without losing capability. Preserve advanced workflows, dense data, and existing features. Simplify presentation, not the underlying product.
1. How to apply this system to another product
The system has two layers:
Layer	Shared across products	Product-specific
Foundations	Type scale, spacing, radii, borders, motion, control behavior, accessibility	Brand fonts only when justified
Semantic tokens	background, surface, text, border, action, focus, etc.	Actual accent hues and optional visual personality
Components	Button sizes, input behavior, menus, tabs, dialogs, states	Which components and density each feature needs
Layout	Alignment, rhythm, responsive logic	Navigation, editor/dashboard layout, content density
Brand	Quality bar and visual restraint	Logo, illustration, icon treatment, imagery, voice


At the start of each project: inspect the existing codebase and identify its actual fonts, brand colors, component system, and product requirements. Create a small PROJECT_THEME.md (suggested template at the end) to record justified deviations. Do not blindly overwrite existing tokens or replace working component libraries.
Priority order
1. Accessibility, safety, platform conventions, and usability
2. Existing functionality and explicit user/product requirements
3. Project-specific brand rules (PROJECT_THEME.md, if present)
4. This shared DESIGN.md
5. Library/framework defaults
2. Typography
Typography should feel crisp, confident, and quietly expressive—not futuristic, cartoonish, or overly corporate.
Font stack
- Primary UI + marketing: Geist, or Inter if Geist is unavailable. Pick one per project and use it consistently.
- Optional display alternative: Inter Tight for large editorial headlines only, if the product's identity benefits from it. Do not mix fonts merely for variety.
- Monospace: Geist Mono, SFMono-Regular, or equivalent for timestamps, code, timecodes, keyboard shortcuts, and technical measurements only.
- Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif.
- Self-host only fonts you are authorized to use. Respect system fonts where native platform conventions matter.
Type scale (desktop defaults)
Role	Size	Weight	Line-height	Letter-spacing	Usage
Display	clamp(44px, 5.5vw, 80px)	600–700	0.98–1.06	-0.055em to -0.04em	Marketing hero only
H1	clamp(32px, 4vw, 52px)	600–700	1.08–1.14	-0.045em	Page opening
H2	28px	600	1.18	-0.035em	Major section
H3	22px	600	1.24	-0.025em	Subsection
H4	18px	600	1.35	-0.018em	Panel heading
Body large	16px	400	1.6	-0.01em	Explanatory copy
Body	14px	400	1.5	-0.005em	Application content
UI	13px	500	1.35	0	Buttons, inputs, menus
Caption	12px	400–500	1.4	0	Secondary metadata
Micro	11px	500–600	1.3	0.01em	Dense indicators only


Rules
- Prefer sentence case. Avoid shouting in uppercase for ordinary labels.
- Use bold selectively; visual hierarchy should not depend on bolding everything.
- Use short, purposeful headings. Avoid repeating a heading as a paragraph underneath.
- Body copy generally stays 14–16px; avoid forcing tiny text to make a dashboard look sophisticated.
- Long-form reading can use 16–18px / ~1.6 line-height and a 60–72 character text measure.
- App headings are intentionally smaller than marketing headings. Never place a 72px marketing headline inside an editor panel.
- Use tabular numerals for KPIs, prices, timestamps, and timeline positions (font-variant-numeric: tabular-nums).
- Avoid artificially spaced-out headline letters, excessive gradient text, and mixed font families without purpose.
3. Color philosophy and semantic tokens
Default palette: warm neutral in light mode; neutral graphite in dark mode. Each product may set its own accent, but must preserve readable contrast. Accent colors are for selected states, high-priority actions, links, and focus when appropriate—not background decoration.
Baseline token palette
Semantic token	Light	Dark	Purpose
--bg	#FAFAF8	#101113	App / page canvas
--surface	#FFFFFF	#17181B	Primary cards, panels
--surface-2	#F3F3F0	#202125	Grouped controls, secondary panels
--surface-hover	#EEEEEA	#2A2C30	Hovered neutral controls
--surface-pressed	#E6E6E1	#32343A	Pressed controls
--text	#181818	#F5F5F3	Main foreground
--text-muted	#666762	#ACADB0	Secondary content
--text-subtle	#858681	#898C90	Tertiary metadata; verify contrast
--border	#E5E5E1	#313238	Hairline separators
--border-strong	#C9C9C3	#505159	Active outlines
--action	#181818	#F4F4F1	Neutral primary actions
--action-text	#FFFFFF	#17181B	Label on primary action
--danger	#B42318	#F97066	Destructive / error
--success	#19724B	#52C593	Success / confirmation
--warning	#946200	#F5BC59	Caution
--focus	#4F78C7	#A5BEFF	Accessible focus indicator; not a brand accent


Brand accents
- No global mandatory brand hue. Define --brand, --brand-hover, --on-brand, and --brand-soft in the project theme.
- Do not add gold, purple, electric blue, or gradients by default.
- A brand-colored button is only appropriate where that color belongs to the product's identity.
- Semantic status colors (danger, warning, success) must not be repurposed as decoration.
- Verify actual contrast for every brand override. Aim for WCAG 2.2 AA: 4.5:1 for normal text; 3:1 for large text and non-text control boundaries/indicators where applicable.
Dark mode
- Use layered graphite, not pure black everywhere.
- Panels must separate through subtle surface differences and borders, not harsh shadows.
- Keep muted text legible. Dark mode should not mean everything becomes low contrast.
- Respect the user's system theme unless the project explicitly has a saved preference.
- Match states across both themes; don't design light mode and auto-invert it.
4. Spacing, density, and layout
Use a 4px base grid, with an 8px rhythm for most layouts.
Token	Size	Common use
--space-1	4px	Icon gap, tight grouping
--space-2	8px	Small gaps
--space-3	12px	Related controls
--space-4	16px	Standard component padding
--space-5	20px	Panel content
--space-6	24px	Section gaps
--space-8	32px	Large content groups
--space-10	40px	Spacious page sections
--space-12	48px	Major separation
--space-16	64px	Marketing sections
--space-24	96px	Hero / editorial sections


Layout rules
- Align content to a consistent grid. Random horizontal padding is prohibited.
- Marketing: generous whitespace, constrained reading widths, larger headings.
- SaaS dashboards: practical density, clear grouping, usually 20–24px panel padding.
- Editors / professional software: compact controls, high information density, clear separation of work regions. Do not introduce empty space that harms productivity.
- Mobile: preserve legible type and comfortable touch targets (normally at least 44×44px for touch controls; follow platform standards where stricter).
- Use responsive layouts, not arbitrary viewport-specific hacks.
- Use maximum widths based on content purpose; don't force every page into a narrow marketing column.
- Prefer spacing and alignment over adding divider lines to everything.
5. Shape, borders, elevation, and glass
Radius system
Token	Radius	Use
--radius-xs	6px	Dense chips / compact controls
--radius-sm	8px	Inputs, utility buttons
--radius-md	10px	Standard interactive controls
--radius-lg	14px	Dialogs, cards, grouped surfaces
--radius-xl	18px	Prominent floating panels
--radius-pill	999px	Primary CTAs, intentional pill controls


Pill buttons are a signature treatment, not a requirement for every control. Marketing CTAs and prominent simple actions can be pill-shaped. Dense toolbars, timeline buttons, table actions, and inspector controls usually use 8–10px radii. Do not mix radically different shapes within the same control group.
Borders and shadows
- Prefer 1px low-contrast borders. Use --border-strong selectively to clarify active elements.
- Prefer subtle surface shifts to big drop shadows.
- Keep shadows scarce: popovers and floating dialogs only; avoid shadowing every card.
- Never add fake inset highlights or glowing outlines across the entire app.
- Dividers should reinforce a meaningful grouping—not appear between every item.
Glassmorphism
- Optional and restrained. Appropriate for overlays, command bars, and floating inspectors, especially over imagery/video.
- Default: translucent neutral surface, mild backdrop blur (8–16px), thin border, clear separation.
- Don't blur the main application shell, timeline tracks, data tables, or reading areas.
- Always provide a solid opaque fallback when blur/contrast makes content hard to read.
6. Buttons — signature component
Buttons deserve as much design care as headings. They should feel precise, tactile, calm, and confident. Small controls and prominent actions should share a coherent visual language while remaining appropriate to their context.
Sizes
Size	Height	Horizontal padding	Text	Radius	Example use
xs	28px	10px	12px / 500	8px	Dense desktop toolbar only
sm	32px	12px	12–13px / 500	8px	Table / inspector / menus
md	38px	16px	13px / 500–600	10px	Standard app actions
lg	44px	20px	14px / 600	Pill or 12px	Prominent actions
xl	48px	24px	14–15px / 600	Pill	Marketing CTAs


Variants
1. Primary: --action fill, --action-text label, crisp contrast; optional brand-colored replacement through project theme.
2. Secondary: --surface fill, 1px --border, normal foreground. No exaggerated shadow.
3. Soft / tertiary: --surface-2 fill, no heavy border. Useful for grouped controls.
4. Ghost: transparent until hover; for toolbar or lower-emphasis actions.
5. Destructive: reserved for delete / irreversible operations; pair with confirmation when necessary.
6. Link-style: actual text link / subtle inline action, not a fake button.
Interaction requirements
- Hover: small but visible surface/contrast change; no dramatic scaling.
- Pressed: slightly deeper surface and/or subtle 1px visual depression; never jump the layout.
- Focus-visible: visible 2px focus ring, offset enough not to blend into borders.
- Disabled: lower emphasis but still recognizable; no confusing hover animation.
- Loading: replace or accompany label with spinner/progress without changing button width; prevent duplicate submissions.
- Success: show explicit feedback only when action outcome is confirmed.
- Icons: 16px for standard controls; 14px for compact controls; 18px for large buttons. Align optically, 6–8px from label.
- Copy: short, verb-led, specific. Examples: Create project, Export video, Import, Save changes. Avoid Let's get started on your exciting journey.
- Use actual <button> elements for actions; anchors for navigation. Maintain keyboard operation.
- No fake buttons without a meaningful action.
Icon buttons
- Standard app icon buttons: 32–38px square; subtle rounded rectangle.
- Touch contexts: at least 44×44px interactive target even if the glyph is smaller.
- Accessible label / tooltip required for icon-only actions.
- Tooltips are supplementary, not a replacement for accessible labels.
- Never mix filled, outlined, and multi-color icon sets indiscriminately.
Segmented controls (important)
A compact outer neutral track with clear, quiet selected-state styling:
- Outer container: --surface-2, 6px inner padding? No — use 3–4px inner padding.
- Gap: 2–4px; individual item height 28–32px desktop.
- Selected segment: --surface (light) or a visibly raised neutral surface (dark), small radius, optional extremely subtle border/shadow.
- Unselected segments: muted labels, transparent fill.
- No oversized capsules or giant sliding animations.
- For System / Light / Dark, selection must correctly reflect the actual theme.
- Distinguish tabs (navigate between views) from segmented controls (switch a related mode/filter). Use correct accessibility semantics.
7. Other core components
Inputs and textareas
- Standard height: 38–40px desktop; 44px+ where touch-first.
- 8–10px radius; 1px border; flat neutral background.
- Labels remain visible where the field's purpose may be unclear. Placeholder is an example, not a substitute for a label.
- Focus: --focus ring plus clear border state.
- Error: concise actionable message near the field; do not rely on color alone.
- Do not wrap every form control in multiple decorative containers.
Cards and panels
- Prefer a flat surface with subtle border; radius 10–14px.
- Use content hierarchy, not ornamental decoration, to differentiate cards.
- Do not make cards excessively rounded or float every panel on a giant shadow.
- App panels should feel integrated, especially in dense tools. Not every section must be a card.
Tabs, navigation, and sidebar
- Active state should be obvious through foreground and surface treatment, not an arbitrary bright pill on every item.
- 32–40px row height for desktop navigation; increase where touch is primary.
- Keep icons consistent and labels human-readable.
- Don't repeat navigation titles as unexplained decoration.
Menus and popovers
- Crisp borders, radius 10–12px, subtle elevation, compact 6–8px item padding.
- Consistent alignment for labels, shortcuts, icons, and selection indicators.
- Full keyboard support, Escape to dismiss, sensible focus handling.
- Respect viewport boundaries and safe areas.
Dialogs and sheets
- Clear title, compact explanation only when needed, obvious close path.
- One clear primary action and a distinct cancellation path for high-impact operations.
- Trap focus appropriately and restore it on close.
- Avoid unnecessary nested dialogs or glass-heavy backdrops.
Tables and dense data
- Use readable 12–14px type, aligned numeric columns, tabular numerals, restrained row separators.
- Preserve sort, filter, bulk action, and keyboard workflows if already present.
- Empty and loading states should not shift the entire layout unnecessarily.
- Do not replace useful tables with giant cards merely to look modern.
Feedback and system states
Define intentional UI for: default, hover, focus, active, selected, disabled, loading, empty, success, warning, error, and offline (where applicable).
- Empty states: explain what's missing and offer one relevant next action.
- Loading: skeletons or stable progress feedback rather than layout jumps; avoid unending decorative loaders.
- Errors: identify the failed action and useful recovery step without blaming the user.
- Toasts: short and situational. No celebrations for ordinary CRUD actions.
8. Icons, illustrations, and images
- Use one cohesive icon family per product (e.g. Lucide). Stroke usually ~1.75–2px, with consistent optical size.
- Icons support recognition; they do not decorate every heading or paragraph.
- No random emojis in application chrome unless the product intentionally uses them.
- Prefer genuine product screenshots and real imagery over synthetic stock-style illustrations.
- If an illustration is needed, it must match the product's art direction, not a generic glowing-gradient robot aesthetic.
9. Motion and microinteractions
Interaction	Duration	Easing
Button hover/press	120–160ms	ease-out
Surface / border transition	140–180ms	ease-out
Menu / popover entry	160–220ms	ease-out
Dialog entrance	180–240ms	ease-out
Layout shift / panel change	180–260ms	ease-in-out


- Prefer opacity, color, and subtle transform transitions; never animate the entire app for decoration.
- Keep motion functional and predictable. No spring-bounce on normal business controls.
- Respect prefers-reduced-motion; disable nonessential transformations and movement.
- Avoid animations that change interaction targets during fast repeated actions.
10. Responsive and accessible by default
- Test at 360px, 390px, 768px, 1024px, and 1440px widths, plus the application's important window sizes.
- Design for content reflow; prevent horizontal overflow of pages and dialogs.
- If a desktop-only feature exists (e.g. advanced editing timeline), use a deliberate compact layout rather than a broken mobile imitation.
- Ensure full keyboard access; logical focus order; visible focus; readable zoom up to 200% where applicable.
- Associate labels with controls and expose statuses to assistive technology appropriately.
- Text and non-text contrast should meet WCAG AA thresholds where applicable; do not rely solely on opacity values.
- Avoid tiny click targets; add accessible hit areas when dense desktop UI makes visual controls smaller.
- Do not communicate state using color alone: pair with text, icon, pattern, or clear structural change.
- Avoid light-weight text on low-contrast surfaces.
11. Copywriting and visual-content rules
This design system has a clear, quiet voice:
- Say what matters. Use concise, plain-English labels and natural product terminology.
- Do not auto-generate filler subtitles, inspirational phrases, or explanations under every heading.
- Avoid marketing language inside working tools unless it serves the workflow.
- Do not invent capabilities, statistics, testimonials, or technical trust claims.
- Avoid gratuitous eyebrow labels like YOUR CREATIVE JOURNEY STARTS HERE.
- Prefer New project to Let's create something amazing.
- Important helper text is welcome when it solves real ambiguity. Clarity beats minimalism.
12. What NOT to build (anti-patterns)
Reject these patterns unless explicitly required by the project:
- Generic “AI SaaS” appearance: neon-purple/blue gradients, glowing blobs, floating glass cards everywhere.
- Large empty dashboards with hidden functionality for the sake of aesthetics.
- Excessive nesting of cards inside cards, particularly with rounded corners and shadows at every level.
- Random font sizes, arbitrary spacing, inconsistent radii, and unplanned icon sizes.
- A different button treatment on each screen.
- Pill-shaped everything: text inputs, toolbars, menus, entire panels, and data tables.
- Low-contrast text falsely presented as sophistication.
- Hero-scale typography in dense application panels.
- Decorative labels, unrequested onboarding prompts, fake content, or unexplained tooltips.
- Animations that delay work or draw attention to ordinary actions.
- Replacing working advanced features with simplified mockups.
- Rebuilding a functioning app from scratch when only its visual language needs improving.
13. Implementation contract for coding agents
When asked to “apply DESIGN.md,” use this order:
1. Audit first. Identify framework, design library, existing tokens, current component implementations, screens, brand assets, and functional requirements.
2. Create a short map. Note existing inconsistencies and the smallest shared foundation that solves them.
3. Set semantic tokens. Centralize type, color, spacing, radius, elevation, and motion. Use product theme overrides instead of arbitrary colors in components.
4. Refine primitives. Update buttons, icon buttons, inputs, segmented controls, focus states, menus, and popovers before redesigning pages.
5. Migrate incrementally. Apply the system screen by screen, keeping existing business logic and layout behavior stable.
6. Verify real states. Check hover/pressed/focus/disabled/loading/errors, both themes, mobile, keyboard navigation, and text overflow.
7. Review and clean up. Remove duplicated styles and redundant design tokens only after replacements are verified.
Explicit non-goals
- Do not remove, hide, or disable features merely to reduce visual complexity.
- Do not change application routes, APIs, business logic, persistence, permissions, or data models unless required and separately approved.
- Do not remove power-user tools, panel resize behaviors, keyboard shortcuts, drag-and-drop, or other interactions.
- Do not introduce large new dependencies for cosmetic reasons without justification.
- Do not rewrite all CSS/component code at once if a safe incremental migration is possible.
- Do not alter the project's logo or accent palette without an explicit branding request.
- Do not declare visual work complete without testing the actual interface in its working states.
Component acceptance checklist
- [ ] Uses semantic tokens rather than scattered hard-coded color/spacing values.
- [ ] Typography follows the scale and clear content hierarchy.
- [ ] Buttons use defined variants, heights, padding, and icon alignment.
- [ ] Default, hover, pressed, focus, disabled, and loading states work.
- [ ] Light and dark appearances are intentionally designed and legible.
- [ ] Keyboard, screen reader labeling, and visible focus are supported.
- [ ] Real content, long text, empty/error states, and small windows are handled.
- [ ] No functional regressions or removed advanced capabilities.
- [ ] UI does not introduce generic AI-style decoration or filler copy.
- [ ] Shared components are reused instead of one-off near-duplicates.
14. Starter CSS tokens (adapt to your framework)
These variables are baseline values. Use the same semantic naming whether the project uses Tailwind, CSS Modules, SwiftUI, React Native, or another system. For native platforms, translate the concepts into platform-native tokens and conventions.
:root,
[data-theme="light"] {
  color-scheme: light;

  /* Typography */
  --font-ui: "Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "Geist Mono", "SFMono-Regular", ui-monospace, monospace;

  /* Light foundations */
  --bg: #fafaf8;
  --surface: #ffffff;
  --surface-2: #f3f3f0;
  --surface-hover: #eeeeea;
  --surface-pressed: #e6e6e1;
  --text: #181818;
  --text-muted: #666762;
  --text-subtle: #858681;
  --border: #e5e5e1;
  --border-strong: #c9c9c3;
  --action: #181818;
  --action-text: #ffffff;
  --danger: #b42318;
  --success: #19724b;
  --warning: #946200;
  --focus: #4f78c7;

  /* Brand: must be supplied by the project */
  /* --brand: ...; --on-brand: ...; --brand-hover: ...; --brand-soft: ...; */

  /* Shape */
  --radius-xs: 6px;
  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;
  --radius-pill: 999px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  /* Motion */
  --motion-fast: 140ms;
  --motion-base: 180ms;
  --motion-slow: 240ms;
  --ease-ui: cubic-bezier(0.2, 0.8, 0.2, 1);
}

[data-theme="dark"] {
  color-scheme: dark;
  --bg: #101113;
  --surface: #17181b;
  --surface-2: #202125;
  --surface-hover: #2a2c30;
  --surface-pressed: #32343a;
  --text: #f5f5f3;
  --text-muted: #acadb0;
  --text-subtle: #898c90;
  --border: #313238;
  --border-strong: #505159;
  --action: #f4f4f1;
  --action-text: #17181b;
  --danger: #f97066;
  --success: #52c593;
  --warning: #f5bc59;
  --focus: #a5beff;
}

/* Example component: a neutral, precise, reusable button */
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 16px;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: var(--action);
  color: var(--action-text);
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background var(--motion-fast) var(--ease-ui),
              border-color var(--motion-fast) var(--ease-ui),
              box-shadow var(--motion-fast) var(--ease-ui),
              opacity var(--motion-fast) var(--ease-ui);
}
.ui-button:hover:not(:disabled) { opacity: 0.88; }
.ui-button:active:not(:disabled) { opacity: 0.76; }
.ui-button:focus-visible { outline: 2px solid var(--focus); outline-offset: 3px; }
.ui-button:disabled { opacity: 0.48; cursor: not-allowed; }
.ui-button--pill { border-radius: var(--radius-pill); }
.ui-button--secondary {
  background: var(--surface);
  color: var(--text);
  border-color: var(--border);
}
.ui-button--secondary:hover:not(:disabled) { background: var(--surface-2); opacity: 1; }
.ui-button--soft { background: var(--surface-2); color: var(--text); }
.ui-button--soft:hover:not(:disabled) { background: var(--surface-hover); opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .ui-button { transition: none; }
}
Implementation note: data-theme="dark" is explicit. If a project offers a System mode, use JavaScript or native system APIs to resolve the preferred theme and apply the corresponding theme tokens. Do not accidentally lock System to light mode because :root contains light defaults.

15. Template: PROJECT_THEME.md
Each project may add this small override file next to DESIGN.md:
# PROJECT_THEME.md — [Product Name]

## Brand
- Product name:
- Brand personality (3 words):
- Existing logo / assets (paths):
- Primary accent color:
- On-accent foreground color:
- Accent hover and soft variants:
- Font override (only if necessary):

## Product context
- Platform(s): web / desktop / iOS / Android
- Main theme: light / dark / system
- Density: spacious marketing / standard SaaS / compact professional tool
- Must-preserve features and workflows:
- Existing component library / theme location:

## Overrides
- Approved deviations from DESIGN.md and why:
- Areas that should not be visually changed:

## Verification
- Key routes/screens to test:
- Keyboard / accessibility-critical interactions:
16. Definition of done
A design-system implementation succeeds when the product looks coherent without calling attention to its styling: typography feels deliberate, buttons and controls feel satisfying, light/dark modes feel equally considered, dense workflows remain efficient, and the app still does everything it did before.

The goal is not “more minimalist.” It is “more intentional.”