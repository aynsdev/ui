# Component verification

Run from the repository root:

```sh
npm run registry:build
npm run typecheck
npm run test:components
npm run build:docs
npm run build
```

`test:components` covers calendar leap-year and century boundaries, duplicate/invalid contribution data, fixed intensity thresholds, cutoff exclusion, date localization, invalid configurations, field description/error associations, and registry dependency integrity. Vite loads the actual TypeScript modules; no copied implementations are tested.

## Browser matrix

Start `npm run dev`. Visit the corresponding `#/components/<name>` page.

Repeat visual checks in light and dark themes at 360, 390, 768, 1024 and 1440px. Check long labels, 200% zoom, visible focus, readable text, and no page-level horizontal overflow. Tables and year calendars may scroll within their named regions. Test coarse-pointer controls on a touch device; small close icons must retain 44px hit targets. Restore temporary viewport and theme settings afterward.

| Surface | Exercise | Expected result |
| --- | --- | --- |
| Segmented control | Click selected item; select another; press Space on it | Selection is retained, including uncontrolled examples |
| Popover | Open, toggle checkbox, Escape / Done | Popup is named and focus returns to trigger |
| Alert dialog | Open, Tab / Shift+Tab, cancel, confirm sample archive | Cancel has initial focus; focus stays contained; outside clicks do not confirm; sample can be restored |
| Sheet | Open form, enter name, save; open bottom variant | Associated field, contained focus, successful save feedback, usable mobile edges |
| Combobox | Type `web`, ArrowDown, Enter; type a missing value | Website selected; no-match message visible; disabled option cannot be selected |
| Date picker | Enter date segments, open calendar, navigate arrows, select, Escape | Values update, popup stays in viewport, focus returns; readonly/disabled states remain unchanged |
| Date range | Select two dates, including reverse order and a month boundary | Range is normalized and both date inputs update |
| Input group | Type in each input; show/hide password | Group focus is visible; label remains associated; toggle retains value and updates accessible name |
| Data table | Numeric sort, select page, change page, filter and search | Sort compares numbers; selection persists; select-all affects only visible page; page resets on filter/sort |
| Table states | Loading, Error → Try again, Empty → Add sample record | Stale rows hidden; retry and first-use actions work; status is announced |
| Field | Submit empty project name; then type a value | Error and helper IDs resolve; aria-invalid and error reference disappear when valid |
| Activity feed | Read list and timestamps with long content | Ordered list, readable ISO-backed timestamps, natural wrapping |
| Contribution grid | Year selector, daily counts, year-to-date example | Leap day appears in 2024; daily values accessible; unavailable cells dashed and excluded from totals |

## Motion and touch

In browser developer tools, emulate `prefers-reduced-motion: reduce`. Check button press, accordion, dialog, dropdown menu, tooltip, spinner and skeleton: animation is disabled and content still opens/closes correctly. Switch thumb position should still update immediately. Component motion utilities are shipped with each registry item, including important reduced-motion overrides for state-specific animations.

Shared React timing tokens live in `scripts/build-registry.mjs`: `--motion-fast` (150ms), `--motion-base` (180ms), and `--motion-slow` (200ms). Regenerate the registry after changing them. Do not hand-edit `registry/theme.css` or `public/r/*.json`.

The new popover, alert dialog, sheet, combobox and date picker introduce no entrance animations.

## Latest implementation check

Automated checks and browser interactions were run during implementation. Browser checks covered combobox keyboard selection and no matches, date and range selection, table sorting/filtering/selection/paging/retry, field associations, password visibility, segmented selection retention, overlay focus restoration, sheet saving, and representative light/dark layouts. Page overflow was checked at all five matrix widths; calendar and bottom-sheet popups were visually inspected on narrow screens.

This is not a substitute for a full screen-reader, physical touch-device, or cross-browser audit. The matrix above is the repeatable release checklist for those environments.
