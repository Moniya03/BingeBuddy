# BingeBuddy Project Instructions & Guidelines

## Project Context

BingeBuddy is a modern, aesthetic, and educational web application for discovering trending movies and series. Users can search for content, view detailed information, and enjoy a beautiful, dark-themed UI. This project is designed to help you learn React, TypeScript, and modern frontend best practices while building a portfolio-worthy site.

---

## Tech Stack

- **Vite** (React + TypeScript)
- **Tailwind CSS** (for utility-first styling)
- **shadcn/ui** (for accessible, beautiful UI components)
- **Lucide React** (for icons)
- **TMDB API** (for all movie/series data)

---

## General Guidelines

1. **Component Installation**
   - Always install UI components from shadcn using **npm** (not pnpm or yarn).
   - For icons, use **lucide-react** package.

2. **Styling**
   - Use **Tailwind CSS** for all custom styles.
   - The site must always be in **dark mode** with a blue accent color.
   - Ensure the UI is visually appealing and modern—think resume-worthy!

3. **API Usage**
   - All data must be fetched from the **TMDB API**.
   - Double-check TMDB endpoints for correctness. If unsure, ask the project owner to verify or provide the correct endpoint.

4. **Code Quality & Comments**
   - Write **simple, easy-to-read code**. Avoid unnecessary complexity.
   - Add **detailed comments** for every part of the code, even if it seems obvious.
   - Prefix all educational comments with `LEARN:` and explain what/why, especially for React, TypeScript, or UI/UX concepts.
   - Example:
     ```tsx
     // LEARN: This useEffect runs once when the component mounts, similar to componentDidMount in class components.
     useEffect(() => { ... }, []);
     ```

5. **UI/UX**
   - Prioritize a clean, modern, and cool look.
   - Use shadcn/ui components for consistency and accessibility.
   - Use Lucide icons for all icon needs.
   - Ensure the site is always in dark mode with a blue accent color.

6. **Project Structure**
   - Organize components in `src/components/`.
   - Place utility functions in `src/lib/`.
   - Keep files and functions small and focused.

7. **Learning Focus**
   - This project is for learning—**no comment is too obvious**.
   - If you introduce a new React, TypeScript, or UI/UX concept, explain it with a `LEARN:` comment.

8. **Resume-Ready**
   - The final product should be visually impressive and demonstrate best practices.
   - Focus on polish, accessibility, and responsiveness.

---

## Example LLM Prompt

> "Create a movie card component for BingeBuddy. Use shadcn/ui Card, Tailwind for styling, Lucide icons for any icons, and fetch movie data from the TMDB API. Add detailed comments with `LEARN:` prefix explaining all React and TypeScript concepts. Ensure the card looks modern, is in dark mode with blue accents, and is easy to read. Install any required shadcn/ui components using npm."

---

## Summary Checklist

- [ ] Use Vite + React + TypeScript
- [ ] Use Tailwind CSS for all styling
- [ ] Use shadcn/ui components (install via npm)
- [ ] Use Lucide React for icons
- [ ] Fetch all data from TMDB API (verify endpoints)
- [ ] Write simple, readable code
- [ ] Add detailed, educational comments (prefix: `LEARN:`)
- [ ] Ensure dark mode with blue accent
- [ ] Make the UI modern, aesthetic, and resume-worthy

---

## Questions?
If you are unsure about a TMDB endpoint or any project guideline, ask the project owner for clarification or documentation. 