Git commands are in [docs/git-cheatsheet](docs/git-cheatsheet/README.md).

# CSIT340 React Setup and HTML-to-React Conversion Guide

This guide takes you from an empty folder to a finished React page built from components. It follows your teacher's cheat sheet (Vite, Tailwind with `@tailwindcss/vite`, Git) and the Lab 2 instructions, with every step spelled out. The file names below were checked against a fresh Vite project, so what you see on your screen should match.

## Part 0. Before you start

**Tools you need installed:** Node.js (LTS version), Git, and VS Code.

**Check them.** Open a terminal and run each line. Each should print a version number.

```bash
node -v
npm -v
git --version
```

If one says `is not recognized`, install that tool, then close and reopen the terminal.

**Which terminal.** Use Command Prompt or Git Bash. Do not use PowerShell.

**Where to keep the project.** Keep it on the C: drive. A simple, short path works best.

```bash
cd C:\
mkdir csit340
cd csit340
```

## Part 1. Create the React project

1. Inside `C:\csit340`, run the create command. Replace the name with your repository name from the assignment post.

   ```bash
   npm create vite@latest CSIT340-Lab3-LastName
   ```

2. Answer the prompts with the arrow keys and Enter. The exact questions change between Vite versions, but the answers are always the same idea:
   - Framework: **React**
   - Variant: **JavaScript** (not TypeScript)
   - If it asks about an experimental or rolldown version: **No**
   - If it asks "Install with npm and start now?": **No** (you will do it yourself next)

3. Go into the project folder and install the packages.

   ```bash
   cd CSIT340-Lab3-LastName
   npm install
   ```

   `npm install` creates the `node_modules` folder. It is large and you never edit it.

4. Start the development server.

   ```bash
   npm run dev
   ```

5. Open the address it prints (usually `http://localhost:5173`) in your browser. You should see the default Vite and React page with a counter button.

6. Stop the server any time with `Ctrl + C`.

7. Open the folder in VS Code: run `code .` in the terminal, or use File, then Open Folder.

### What the files are

| File or folder | What it does | Do you edit it? |
| --- | --- | --- |
| `index.html` | The one HTML page. Has an empty `<div id="root">`. | Yes, only the title and the icon line |
| `src/main.jsx` | Finds the root div and tells React to render App inside it | No |
| `src/App.jsx` | Your top-level component | Yes |
| `src/index.css` | Global styles. Tailwind goes here. | Yes, once |
| `vite.config.js` | Vite settings. Tailwind plugin goes here. | Yes, once |
| `package.json` | List of installed packages and the `npm run` commands | No (npm edits it) |
| `.gitignore` | Tells Git to skip `node_modules` and `dist` | No |
| `node_modules/` | Installed packages | Never |

## Part 2. Delete the files you do not need

The default page uses a logo, images, icons, and a stylesheet. You are replacing that page, so remove them.

**Delete these:**

| Path | Why |
| --- | --- |
| `src/App.css` | Default page styles. Tailwind replaces them. |
| `src/assets/` (the whole folder) | Holds `hero.png`, `react.svg`, `vite.svg` for the demo page |
| `public/favicon.svg` | Demo icon |
| `public/icons.svg` | Icons used only by the demo page |

**Keep these:** `.gitignore`, `.oxlintrc.json`, `README.md`, `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`.

Command Prompt:

```bash
del src\App.css
rmdir /s /q src\assets
del public\favicon.svg
del public\icons.svg
```

Git Bash:

```bash
rm src/App.css
rm -r src/assets
rm public/favicon.svg public/icons.svg
```

Or in VS Code: right-click the file or folder in the Explorer panel, then Delete.

Your template version may list slightly different files. The rule is: delete whatever only the demo page uses (its images, its icons, and `App.css`).

The browser will now show an error, because `App.jsx` still imports the deleted files. Part 4 fixes that.

## Part 3. Install and set up Tailwind CSS

1. Stop the server with `Ctrl + C`, then install:

   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```

2. Replace the whole content of `vite.config.js` with:

   ```js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import tailwindcss from '@tailwindcss/vite'

   export default defineConfig({
     plugins: [react(), tailwindcss()],
   })
   ```

3. Replace the whole content of `src/index.css` with this single line:

   ```css
   @import "tailwindcss";
   ```

4. Ignore any online guide that mentions `postcss`, `autoprefixer`, `tailwind.config.js`, or `npx tailwindcss init -p`. Those are for old versions and will break this setup.

After any change to `vite.config.js`, restart the server (`Ctrl + C`, then `npm run dev`).

## Part 4. Clear the generated code

`src/App.jsx` - delete everything and write a tiny test:

```jsx
function App() {
  return <h1 className="text-3xl font-bold underline">Hello Tailwind</h1>
}

export default App
```

`index.html` - two small edits:

1. Delete the line `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`. The file it points to is gone, and leaving it causes a missing-file error in the console.
2. Change `<title>` to something real, such as your name.

`src/main.jsx` - leave it alone. It already imports `./index.css`, which is how Tailwind reaches the page.

**Check it works:**

```bash
npm run dev
```

You should see big, bold, underlined text. If the text is small and plain, Tailwind is not connected. See Part 8.

The project is now clean. This is a good moment for your first commit (see the [Git cheat sheet](docs/git-cheatsheet/README.md)).

## Part 5. The HTML-to-JSX rules

JSX looks like HTML but is JavaScript. Most conversion errors come from forgetting one of these rules.

| In HTML | In JSX | Why |
| --- | --- | --- |
| `class="..."` | `className="..."` | `class` is a reserved word in JavaScript |
| `for="..."` | `htmlFor="..."` | `for` is also reserved |
| `<br>`, `<img ...>`, `<input ...>` | `<br />`, `<img ... />`, `<input ... />` | Every tag must be closed |
| `<!-- comment -->` | `{/* comment */}` | HTML comments are not valid JSX |
| Two tags side by side at the top | Wrap them in a parent tag or a fragment `<> ... </>` | A return gives back one element |
| Fixed text | `{variable}` for a changing value | Braces insert the value of a JavaScript expression |
| `href="#about"` (fixed) | `href={link}` (from a prop) | No quotes around braces |
| `<navbar>` | `<Navbar />` | Capital letter means component. Lowercase means a plain HTML tag. |

**What to copy from the HTML file.** Copy only what is inside `<body>`. Do not copy `<!DOCTYPE>`, `<html>`, `<head>`, or `<body>`, because `index.html` already has them. Do not copy `<script src="https://cdn.tailwindcss.com"></script>`. Tailwind comes from the plugin now. Ignore the `<!--[if gte mso 9]>` block in the teacher's file. It is leftover Word metadata.

## Part 6. Convert the page step by step

Do this in small steps and check the browser after every step. If the page breaks, you know the last step caused it.

### Step 6.1. Move everything into App first (no components yet)

1. Open the given `portfolio.html` in VS Code.
2. Copy everything between `<body>` and `</body>` (leave out the tags themselves).
3. In `App.jsx`, paste it inside a fragment:

   ```jsx
   function App() {
     return (
       <>
         {/* paste the body content here */}
       </>
     )
   }

   export default App
   ```

4. Replace `class="` with `className="`. In VS Code press `Ctrl + H`, type `class="` in the first box and `className="` in the second, then choose Replace All. Turn on Match Case so you do not touch other words.
5. Fix anything the editor underlines in red. Usually a tag needs closing.
6. Compare with `portfolio.html` open in another tab. They must look identical.

This is a safe checkpoint. Commit it.

### Step 6.2. Split into components, outside in

Start with the easy ones that need no props: `Footer`, `Navbar`, `Hero`.

1. Create the folder `src/components/`.
2. Create `src/components/Footer.jsx`.
3. Cut the `<footer>...</footer>` block out of `App.jsx` and put it in the new file:

   ```jsx
   function Footer() {
     return (
       <footer className="border-t border-stone-200">
         {/* everything that was inside the footer */}
       </footer>
     )
   }

   export default Footer
   ```

4. In `App.jsx`, import it at the top and use it where the footer was:

   ```jsx
   import Footer from './components/Footer.jsx'

   // inside the return:
   <Footer />
   ```

5. Save and check the browser. Nothing should look different.

**Rules for every component file:**

- File name equals component name: `Footer.jsx` holds `function Footer()`.
- The name starts with a capital letter.
- The file ends with `export default Footer`.
- The file that uses it imports it with the `.jsx` extension.

### Step 6.3. Add props to remove repetition (NavLink)

The navbar has several nearly identical links. Only two things change between them: the address and the words.

Before (repeated in the navbar):

```jsx
<a href="#about" className="hover:text-stone-900">About</a>
<a href="#skills" className="hover:text-stone-900">Skills</a>
```

Create `src/components/NavLink.jsx`:

```jsx
function NavLink({ href, label }) {
  return (
    <a href={href} className="hover:text-stone-900">{label}</a>
  )
}

export default NavLink
```

- `({ href, label })` is destructuring. It pulls `href` and `label` out of the props object, so you write `label` instead of `props.label`.
- `{href}` and `{label}` insert the values.

Use it in `Navbar.jsx`:

```jsx
import NavLink from './NavLink.jsx'

<NavLink href="#about" label="About" />
<NavLink href="#skills" label="Skills" />
```

Each tag becomes a separate call with its own props, so each one shows different text.

**Method for any repeated block:**

1. Find the repeated block.
2. Write down which parts differ. Those become props.
3. Replace each differing part with `{propName}`.
4. Put the prop names in the parentheses with braces: `({ a, b })`.
5. Replace each original block with `<Component a="..." b="..." />`.

### Step 6.4. Two tags in one return (SectionHeading)

The heading and the line under it are two sibling tags, so wrap them in a fragment:

```jsx
function SectionHeading({ title, subtitle }) {
  return (
    <>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 text-stone-600">{subtitle}</p>
    </>
  )
}

export default SectionHeading
```

A fragment adds no extra element to the page, so the layout does not change.

### Step 6.5. Components inside components

A section component holds the pieces. Example pattern for `AboutSection.jsx`:

```jsx
import SectionHeading from './SectionHeading.jsx'
import Fact from './Fact.jsx'

function AboutSection() {
  return (
    <section id="about" className="...same classes as the HTML...">
      <SectionHeading title="About" subtitle="A little about who I am." />
      {/* paragraph stays here */}
      <dl className="...">
        <Fact label="Course" value="BS Information Technology" />
        {/* more Fact tags */}
      </dl>
    </section>
  )
}

export default AboutSection
```

The `<section>` tag, its `id`, and its classes stay in the section component. Only the repeated or reusable parts move out.

### Step 6.6. A card with several props (ProjectCard)

```jsx
function ProjectCard({ year, title, description, tech, link }) {
  return (
    <article className="...same classes...">
      <p className="...">{year}</p>
      <h3 className="...">{title}</h3>
      <p className="...">{description}</p>
      <p className="...">{tech}</p>
      <a href={link} className="...">View on GitHub</a>
    </article>
  )
}

export default ProjectCard
```

Use it like this, one tag per project:

```jsx
<ProjectCard
  year="2026"
  title="My Project"
  description="One sentence about it."
  tech="React · Tailwind CSS"
  link="https://github.com/yourname/your-repo"
/>
```

Fixed text such as "View on GitHub" stays inside the component. Only the parts that change per card become props.

### Step 6.7. Finish App.jsx

When all components exist, `App.jsx` only imports and arranges, nothing else:

```jsx
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
// ...one import per section
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <main>
        {/* the five section components, in order */}
      </main>
      <Footer />
    </>
  )
}

export default App
```

### Step 6.8. Replace the text with your own

Only now change names, schools, projects, and links. Do not change classes or structure. A project link points to that project's repository, or to your GitHub profile if it has none.

### Final checklist before you push

- The page loads with no error screen, and the browser console (F12) is clean.
- Side by side with the original, the layout is identical.
- `src/components/` has exactly the files in the lab table, no more and no fewer.
- Every component file has `export default`, and every component with props uses destructuring.
- Item counts match the instructions (nav links, facts, skill tags, projects, timeline items, contact links).
- No images. No leftover demo code. `App.css` and `assets/` are gone.
- Every piece of text is about you.

## Part 7. Convert vanilla JavaScript into React state

Some pages have a `<script>` that changes the page when something happens. In React you do not touch the page directly. You change state, and React redraws.

### Why a normal variable does not work

A component is a function, and React calls it again to redraw. Every call declares its local variables again from their starting values. A value that must survive between calls cannot be stored inside the call. State is stored by React outside the call. When the setter changes it, React calls the component again.

### Worked example

Vanilla version:

```html
<button id="like-btn">Likes: 0</button>
<script>
  let likes = 0;
  const btn = document.getElementById("like-btn");
  btn.addEventListener("click", function () {
    likes = likes + 1;
    btn.textContent = "Likes: " + likes;
  });
</script>
```

React version (`LikeButton.jsx`):

```jsx
import { useState } from 'react'

function LikeButton() {
  const [likes, setLikes] = useState(0)

  function handleClick() {
    setLikes(likes + 1)
  }

  return (
    <button onClick={handleClick}>Likes: {likes}</button>
  )
}

export default LikeButton
```

### Line-by-line translation

| Vanilla JavaScript | React |
| --- | --- |
| `let likes = 0;` | `const [likes, setLikes] = useState(0)` |
| `document.getElementById("like-btn")` | Not needed. You do not look up elements. |
| `btn.addEventListener("click", fn)` | `onClick={handleClick}` on the button tag |
| `likes = likes + 1;` | `setLikes(likes + 1)` |
| `btn.textContent = "Likes: " + likes;` | `Likes: {likes}` written in the JSX |
| The whole `<script>` tag | Deleted. The logic lives in the component. |
| `id="like-btn"` | Not needed unless CSS or a link uses it |

### Rules to remember

1. Import it: `import { useState } from 'react'`.
2. `useState(0)` returns an array of two items: the current value and the setter. `const [likes, setLikes]` names them by position (array destructuring). The setter is named `set` plus the value name.
3. The number inside `useState(0)` is used on the first call only.
4. Call `useState` at the top of the component function, not inside an `if`, a loop, or another function.
5. The state variable is a `const`. Never write `likes = likes + 1` or `likes++`. That throws an error. Only the setter changes state.
6. Pass the function, do not call it: `onClick={handleClick}`. Writing `onClick={handleClick()}` runs it during drawing and causes an infinite loop.
7. Each tag of a component has its own state. Two `<LikeButton />` tags count separately.
8. Inside one click, the state variable is a fixed snapshot. Calling `setLikes(likes + 1)` three times adds 1, not 3, because all three use the same snapshot. React waits for the handler to finish, then redraws once (batching).
9. Text and a braced value side by side, as in `Likes: {likes}`, are fine. React shows them as one line.

### Passing a label as a prop plus state

Props and state work together. The label comes from outside, the count lives inside:

```jsx
function LikeButton({ label }) {
  const [likes, setLikes] = useState(0)
  // ...
  return <button onClick={handleClick}>{label} · {likes}</button>
}

// used as:
<LikeButton label="Like this page" />
```

Props are read-only. A component never changes its own props, so anything that must change goes in state.

## Part 8. Troubleshooting

| What you see | Likely cause | Fix |
| --- | --- | --- |
| `'npm' is not recognized` | Node not installed, or terminal opened before installing | Install Node, reopen the terminal |
| `npm run dev` says missing script or cannot find `package.json` | Wrong folder | `cd` into the folder that contains `package.json` |
| Red text about scripts being disabled | You are in PowerShell | Use Command Prompt or Git Bash |
| Page is plain, Tailwind classes do nothing | Missing `@import "tailwindcss";`, plugin missing in `vite.config.js`, or server not restarted | Recheck Part 3, restart the server |
| `Failed to resolve import ./components/X.jsx` | Wrong file name, wrong folder, or different capitalization | Match the name exactly, including the `.jsx` |
| `X is not defined` | You used a component but did not import it | Add the import line |
| `Adjacent JSX elements must be wrapped` | Two top-level tags in one return | Wrap in `<> ... </>` |
| `Expected corresponding JSX closing tag` | A tag was never closed | Close it, or make it self-closing `<br />` |
| `Warning: Invalid DOM property class` | Left `class` somewhere | Change to `className` |
| A component shows nothing, or the console mentions an unknown element | Lowercase name such as `<navbar />` | Capitalize: `<Navbar />` |
| Blank white page after an edit | A JavaScript error | Press F12, read the first red line in the Console |
| Button count never changes | Used a normal variable instead of state | Use `useState` and the setter |
| Count jumps wildly or the page freezes | `onClick={handleClick()}` with parentheses | Remove the parentheses |
| `Cannot assign to "count" because it is a constant` | Wrote `count = ...` or `count++` | Use `setCount(...)` |
| Port already in use | An older server is still running | Close the old terminal, or accept the new port Vite offers |

## Part 9. Push to GitHub

1. On github.com create a new empty repository named exactly as your assignment says. Do not tick README, `.gitignore`, or license.
2. In your project folder run:

   ```bash
   git init
   git add .
   git commit -m "Complete portfolio components"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```

3. Later changes need only `git add .`, `git commit -m "message"`, and `git push`.
4. Open the repository link in a private browser window to confirm it works, then submit that link in MS Teams.

The full command list, including undo commands, is in the separate [Git cheat sheet](docs/git-cheatsheet/README.md).

**Naming note.** Your lab file is named "lab2" but its submission section asks for `CSIT340-Lab3-LastName`. Use whatever name the posted Teams assignment says, and ask your teacher if the two disagree.

## Part 10. Using the practice kit

The practice kit has a different page for you to convert, with one component that uses state.

1. Open `portfolio-practice.html` in your browser. Click the button at the bottom to see what it does.
2. Read `practice-lab-instructions.md`. It has the same format as Lab 2.
3. Create a fresh project (Parts 1 to 4) and convert the page yourself.
4. Only after trying, compare with the answer key in `practice-solution.zip`.
5. Try the three stretch questions at the bottom of the practice instructions. They test snapshots and isolated state, which are the likely exam topics.
