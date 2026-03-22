# Global
 
- - -

## Copilot Best Practices for Figma to Next.js Conversion

### I. General Constraints & Setup

*   **ADHERE** strictly to the provided Figma export for all visual specifications (colors, typography, spacing, dimensions).
*   **UTILIZE** the specified output path and component naming conventions from the prompt.
*   **UTILIZE** use React best practices for component structure and JSX.
*   **UTILIZE** ensure the final output is a pixel-perfect representation of the Figma design.
*   **UTILIZE** all text from figma file must be generated.
*   **UTILIZE** don't take any screenshot to execute this process.
*   **ENSURE** all generated code includes proper TypeScript interfaces and types.
*   **PRIORITIZE** responsive design, adapting components for various screen sizes (mobile, tablet, desktop) as defined in Figma or inferred intelligently.
*   **IMPLEMENT** accessibility features (WCAG compliance, ARIA attributes, keyboard navigation) by default where applicable.
*   **INTEGRATE** with Next.js specific features for routing, data fetching, and image optimization where appropriate (e.g., `next/image`, `next/link`).

### II. CSS Best Practices

*   **EMPLOY** the specified styling library (Tailwind CSS, Styled Components, Emotion, or plain CSS) consistently throughout the project.
*   **USE** CSS variables (custom properties) for common values like colors, spacing, and typography if not using a utility-first framework like Tailwind.
*   **OPT** for semantic CSS class names when using plain CSS, avoiding generic or presentational names.
*   **APPLY** utility classes from Tailwind CSS for granular styling, prioritizing them over custom CSS where suitable.
*   **ENSURE** proper BEM (Block, Element, Modifier) methodology for component-specific styling when using plain CSS or Styled Components for structure.
*   **IMPLEMENT** smooth CSS transitions for interactive elements (hover, focus, active states) with `transition-property`, `transition-duration`, and `transition-timing-function`.
*   **UTILIZE** CSS Grid and Flexbox for layout management, favoring them over older layout methods like floats or inline-block.
*   **OPTIMIZE** images with responsive `srcset` and `sizes` attributes or leverage `next/image` for automatic optimization.
*   **MINIMIZE** the use of `!important` declarations; refactor CSS specificity instead.
*   **MAINTAIN** a consistent order for CSS properties (e.g., layout, box model, typography, visual).
*   **ADD** fallbacks for modern CSS features for broader browser compatibility if explicitly required.

### III. JavaScript (React & Next.js) Code Generation Rules

*   **CREATE** functional components using React Hooks (e.g., `useState`, `useEffect`, `useCallback`, `useMemo`).
*   **DECOMPOSE** large Figma sections into smaller, reusable, and single-responsibility React components.
*   **PASS** data via props, defining clear TypeScript interfaces for each component's props.
*   **MANAGE** component-specific state using `useState`.
*   **HANDLE** asynchronous operations (e.g., API calls) using `useEffect` or Next.js data fetching methods (`getServerSideProps`, `getStaticProps`, `useSWR`).
*   **OPTIMIZE** performance using `React.memo` for pure components and `useCallback` / `useMemo` for preventing unnecessary re-renders of functions and values passed as props.
*   **UTILIZE** `next/link` for client-side navigation between pages, ensuring proper `href` attributes.
*   **USE** `next/image` for all images to leverage automatic image optimization, lazy loading, and responsive sizing.
*   **IMPLEMENT** error boundaries (`ErrorBoundary` component) to gracefully handle runtime errors within component trees.
*   **WRITE** clear, self-documenting code with meaningful variable and function names.
*   **INTEGRATE** forms with libraries like React Hook Form for efficient state management and validation.
*   **HANDLE** user interactions (clicks, hovers, inputs) with event handlers, ensuring accessibility (e.g., keyboard navigation).
*   **IMPLEMENT** loading states and skeleton UI for data-intensive components to improve user experience.
*   **ENFORCE** consistent import/export patterns.
*   **ENSURE** proper cleanup in `useEffect` hooks for subscriptions or timers.
*   **LEVERAGE** Context API or state management libraries (e.g., Zustand, Redux Toolkit) for global state, only when prop drilling becomes excessive.
*   **ADD** comments for complex logic or non-obvious implementations.
*   **STRUCTURE** the project logically, typically separating components, pages, hooks, utilities, and styles into distinct directories.