# Portfolio in Components: Step-by-Step Guide

This guide picks up **after** your setup is done (Vite project created, Tailwind installed, starter files deleted). It walks you from the plain `portfolio.html` to a finished React page made of 15 components, one small step at a time.

> **One rule for the whole activity:** never convert everything at once. Move one piece, save, check the browser, then move the next piece. If the page breaks, you know the last step caused it.

---

## Contents

1. [The idea in plain words](#1-the-idea-in-plain-words)
2. [Step 1: Put the whole page into App.jsx](#2-step-1-put-the-whole-page-into-appjsx)
3. [The routine you repeat for every component](#3-the-routine-you-repeat-for-every-component)
4. [Step 2: Navbar and NavLink](#4-step-2-navbar-and-navlink)
5. [Step 3: Hero](#5-step-3-hero)
6. [Step 4: AboutSection, SectionHeading and Fact](#6-step-4-aboutsection-sectionheading-and-fact)
7. [Step 5: SkillsSection and SkillTag](#7-step-5-skillssection-and-skilltag)
8. [Step 6: ProjectsSection and ProjectCard](#8-step-6-projectssection-and-projectcard)
9. [Step 7: ExperienceSection and TimelineItem](#9-step-7-experiencesection-and-timelineitem)
10. [Step 8: ContactSection and ContactLink](#10-step-8-contactsection-and-contactlink)
11. [Step 9: Footer](#11-step-9-footer)
12. [Step 10: The final App.jsx](#12-step-10-the-final-appjsx)
13. [Step 11: Replace the text with your own](#13-step-11-replace-the-text-with-your-own)
14. [Final checklist](#14-final-checklist)
15. [Push to GitHub](#15-push-to-github)
16. [When something breaks](#16-when-something-breaks)
17. [Exam cheat sheet](#17-exam-cheat-sheet)

---

## 1. The idea in plain words

**Component** = a function that returns a piece of HTML. You write it once, and then you can use it as a tag.

**Props** = the blanks in that piece of HTML. You fill the blanks in each time you use the tag.

Example. These two blocks are the same except for two words:

```html
<a href="#about" class="hover:text-stone-900">About</a>
<a href="#skills" class="hover:text-stone-900">Skills</a>
```

So you write the block once, with blanks:

```jsx
export default function NavLink({ href, label }) {
  return (
    <a href={href} className="hover:text-stone-900">{label}</a>
  )
}
```

And use it with the blanks filled in:

```jsx
<NavLink href="#about" label="About" />
<NavLink href="#skills" label="Skills" />
```

That is the entire lab. You do this 15 times.

### How to tell what is a component

- Lowercase tag = plain HTML: `<nav>`, `<div>`, `<a>`.
- **Capital letter tag = your component:** `<Navbar />`, `<Fact />`.
- The lab instructions have a table that lists every component. **Anything not in the table stays as plain HTML.** Do not make extra components.

### The 15 components

| Component | Props | It is |
|---|---|---|
| `Navbar` | none | the `<nav>` tag and everything inside it |
| `NavLink` | `href`, `label` | each `<a>` in the nav **except the first one** (your name) |
| `Hero` | none | the `<header>` tag and everything inside it |
| `SectionHeading` | `title`, `subtitle` | the `<h2>` and the `<p>` right below it, in every section |
| `AboutSection` | none | `<section id="about">` and everything inside |
| `Fact` | `label`, `value` | each `<div>` inside the `<dl>` |
| `SkillsSection` | none | `<section id="skills">` and everything inside |
| `SkillTag` | `name` | each `<span>` in the skills section |
| `ProjectsSection` | none | `<section id="projects">` and everything inside |
| `ProjectCard` | `year`, `title`, `description`, `tech`, `link` | each `<article>` |
| `ExperienceSection` | none | `<section id="experience">` and everything inside |
| `TimelineItem` | `period`, `title`, `place`, `description` | each `<li>` inside the `<ol>` |
| `ContactSection` | none | `<section id="contact">` and everything inside |
| `ContactLink` | `label`, `href`, `text` | each `<li>` inside the `<ul>` |
| `Footer` | none | the `<footer>` tag and everything inside it |

### What your folder will look like at the end

```
src/
├── App.jsx
├── index.css
├── main.jsx
└── components/
    ├── Navbar.jsx
    ├── NavLink.jsx
    ├── Hero.jsx
    ├── AboutSection.jsx
    ├── SectionHeading.jsx
    ├── Fact.jsx
    ├── SkillsSection.jsx
    ├── SkillTag.jsx
    ├── ProjectsSection.jsx
    ├── ProjectCard.jsx
    ├── ExperienceSection.jsx
    ├── TimelineItem.jsx
    ├── ContactSection.jsx
    ├── ContactLink.jsx
    └── Footer.jsx
```

Every component is **one file** in `src/components/`, named exactly like the component, with a capital first letter.

---

## 2. Step 1: Put the whole page into App.jsx

Before making any component, get the full page showing in React.

### 2.1 Set up App.jsx

Open `src/App.jsx`, delete everything, and write this:

```jsx
function App() {
  return (
    <>

    </>
  )
}

export default App
```

Two things to notice:

- The `(` right after `return` is required. If you write `return` and then start your HTML on the next line without the `(`, JavaScript returns nothing and you get a blank page.
- `<>` and `</>` is an empty wrapper (a **fragment**). A component can only return one top-level thing, and your page has many (`<nav>`, `<header>`, `<main>`, `<footer>`), so the fragment wraps them into one.

### 2.2 Copy the page

1. Open `portfolio.html` in VS Code.
2. Select everything from `<nav` (around line 25) down to `</footer>` (around line 198).
3. Do **not** copy `<body>`, `</body>`, `<html>`, `<head>`, or any `<script>`. `index.html` already has the page skeleton, and Tailwind now comes from the plugin.
4. Copy it, go to `App.jsx`, and paste it between `<>` and `</>`.

### 2.3 Change class to className

JSX uses `className` because `class` is a reserved word in JavaScript.

1. Press `Ctrl + H` (Replace).
2. In the top box type: `class="`
3. In the bottom box type: `className="`
4. Turn on **Match Case**, then click **Replace All**.

### 2.4 Check

Run `npm run dev` and open `localhost:5173`. It should look the same as `portfolio.html`. Compare them side by side.

**This is a safe checkpoint. Commit it** (`git add .` then `git commit -m "Move page into App"`).

---

## 3. The routine you repeat for every component

Almost every step below is these five moves:

1. **Find** the tag in `App.jsx` (or in the parent component's file).
2. **Cut** it out (`Ctrl + X`).
3. **Create** a new file in `src/components/` with the component's name.
4. **Wrap** it in a function: `export default function Name() { return ( ...paste here... ) }`
5. **Put the tag back** in the parent as `<Name />` and add the `import` line at the top of the parent file.

Then save and check the browser. It must look exactly the same as before.

### VS Code tips for cutting

- To select a whole tag fast, click the small arrow next to the line number to **fold** (collapse) the tag, click the folded line, and press `Ctrl + X`. The whole block comes with it.
- If the indentation looks messy after pasting, press `Shift + Alt + F` to format the file.
- Use `Ctrl + Z` if you cut the wrong thing.

### Import path rule

- From `App.jsx`: `import Hero from './components/Hero.jsx'`
- From one file inside `components/` to another: `import Fact from './Fact.jsx'`

The name after `import` and the file name must match exactly, including capitals.

### Two passes for sections

For sections (About, Skills, Projects, Experience, Contact), do it in two passes:

- **Pass 1:** cut the whole `<section>` into its own file, exactly like in the routine above. The file still has all the long HTML inside. Check the browser.
- **Pass 2:** inside that file, replace the repeated blocks with smaller components that use props. Check the browser again.

The same two-pass idea applies to `Navbar` (pass 2 is `NavLink`).

---

## 4. Step 2: Navbar and NavLink

### 4.1 Pass 1: Navbar

In `App.jsx` find the `<nav ...>` and select down to its `</nav>`. Cut it. Create `src/components/Navbar.jsx` and write:

```jsx
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 border-b border-stone-200 bg-white">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-semibold">Juan dela Cruz</a>
        <div className="flex gap-6 text-sm text-stone-600">
          <a href="#about" className="hover:text-stone-900">About</a>
          <a href="#skills" className="hover:text-stone-900">Skills</a>
          <a href="#projects" className="hover:text-stone-900">Projects</a>
          <a href="#experience" className="hover:text-stone-900">Experience</a>
          <a href="#contact" className="hover:text-stone-900">Contact</a>
        </div>
      </div>
    </nav>
  )
}
```

In `App.jsx`, put `<Navbar />` where the nav was, and add at the top:

```jsx
import Navbar from './components/Navbar.jsx'
```

Check the browser. Nothing should look different.

### 4.2 Pass 2: NavLink

Look at the five links. They are identical except for two things:

- the address (`#about`, `#skills`, ...) → prop `href`
- the word (`About`, `Skills`, ...) → prop `label`

**The first `<a>` (your name) does not become a NavLink.** It has different classes, appears only once, and the lab table says "except the first one". It stays as a plain `<a>` with `className`.

Create `src/components/NavLink.jsx`:

```jsx
export default function NavLink({ href, label }) {
  return (
    <a href={href} className="hover:text-stone-900">{label}</a>
  )
}
```

Compare with the original link: `href="#about"` became `href={href}` and `About` became `{label}`. The classes did not change.

`({ href, label })` is called **destructuring**. React gives your component one object of props, and the braces pull `href` and `label` out of it so you can write `label` instead of `props.label`.

Now edit `Navbar.jsx`. Add the import at the top and replace the five `<a>` lines:

```jsx
import NavLink from './NavLink.jsx'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 border-b border-stone-200 bg-white">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-semibold">Juan dela Cruz</a>
        <div className="flex gap-6 text-sm text-stone-600">
          <NavLink href="#about" label="About" />
          <NavLink href="#skills" label="Skills" />
          <NavLink href="#projects" label="Projects" />
          <NavLink href="#experience" label="Experience" />
          <NavLink href="#contact" label="Contact" />
        </div>
      </div>
    </nav>
  )
}
```

Check the browser. The navbar must look and work exactly as before. Exactly **5** NavLinks.

---

## 5. Step 3: Hero

The `<header>` is a normal component with no props. Nothing inside it is in the lab table, so the two buttons stay as plain `<a>` tags.

Cut `<header id="top" ...>` down to `</header>` from `App.jsx`. Create `src/components/Hero.jsx`:

```jsx
export default function Hero() {
  return (
    <header id="top" className="max-w-4xl mx-auto px-6 pt-20 pb-16 scroll-mt-16">
      <p className="text-sm font-medium text-stone-500">Hi, I'm</p>
      <h1 className="mt-2 text-5xl font-semibold tracking-tight">Juan dela Cruz</h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone-600">
        A third year IT student who builds small web apps for the people around me.
      </p>
      <div className="mt-8 flex gap-3">
        <a href="#projects" className="rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-700">See my projects</a>
        <a href="#contact" className="rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-medium hover:bg-stone-50">Contact me</a>
      </div>
    </header>
  )
}
```

In `App.jsx`, put `<Hero />` where the header was and add:

```jsx
import Hero from './components/Hero.jsx'
```

Check the browser.

---

## 6. Step 4: AboutSection, SectionHeading and Fact

### 6.1 Pass 1: AboutSection

In `App.jsx` the sections live inside `<main>`. Find `<section id="about" ...>` down to its `</section>` and cut it. Create `src/components/AboutSection.jsx`:

```jsx
export default function AboutSection() {
  return (
    <section id="about" className="max-w-4xl mx-auto px-6 py-16 border-t border-stone-200 scroll-mt-16">
      <h2 className="text-2xl font-semibold tracking-tight">About</h2>
      <p className="mt-2 text-stone-600">A little about who I am.</p>
      <p className="mt-6 max-w-2xl leading-relaxed text-stone-700">
        I grew up in Talisay and moved to Cebu City for college. I picked IT because I
        wanted to build things people actually open. So far my favorite part is the moment
        something finally runs.
      </p>
      <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
        <div>
          <dt className="text-sm text-stone-500">Course</dt>
          <dd className="mt-1 font-medium">BS Information Technology</dd>
        </div>
        <div>
          <dt className="text-sm text-stone-500">Year level</dt>
          <dd className="mt-1 font-medium">Third year</dd>
        </div>
        <div>
          <dt className="text-sm text-stone-500">School</dt>
          <dd className="mt-1 font-medium">CIT-U</dd>
        </div>
        <div>
          <dt className="text-sm text-stone-500">Based in</dt>
          <dd className="mt-1 font-medium">Cebu City</dd>
        </div>
      </dl>
    </section>
  )
}
```

In `App.jsx`, put `<AboutSection />` inside `<main>` where the section was, and add:

```jsx
import AboutSection from './components/AboutSection.jsx'
```

Check the browser.

### 6.2 Pass 2a: SectionHeading

Every section starts with the same two tags: an `<h2>` and a `<p>` right below it. Only the words change, so the props are `title` and `subtitle`.

These are two tags side by side, so the component needs a fragment `<> </>` to wrap them.

Create `src/components/SectionHeading.jsx`:

```jsx
export default function SectionHeading({ title, subtitle }) {
  return (
    <>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 text-stone-600">{subtitle}</p>
    </>
  )
}
```

In `AboutSection.jsx`, add the import and replace the `<h2>` and the `<p>` under it:

```jsx
import SectionHeading from './SectionHeading.jsx'
```

```jsx
<SectionHeading title="About" subtitle="A little about who I am." />
```

You will do the same replacement in every other section as you get to it.

### 6.3 Pass 2b: Fact

The four `<div>` blocks inside the `<dl>` are identical except for the label and the value. Props: `label` and `value`.

Create `src/components/Fact.jsx`:

```jsx
export default function Fact({ label, value }) {
  return (
    <div>
      <dt className="text-sm text-stone-500">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  )
}
```

Now `AboutSection.jsx` becomes:

```jsx
import Fact from './Fact.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function AboutSection() {
  return (
    <section id="about" className="max-w-4xl mx-auto px-6 py-16 border-t border-stone-200 scroll-mt-16">
      <SectionHeading title="About" subtitle="A little about who I am." />
      <p className="mt-6 max-w-2xl leading-relaxed text-stone-700">
        I grew up in Talisay and moved to Cebu City for college. I picked IT because I
        wanted to build things people actually open. So far my favorite part is the moment
        something finally runs.
      </p>
      <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
        <Fact label="Course" value="BS Information Technology" />
        <Fact label="Year level" value="Third year" />
        <Fact label="School" value="CIT-U" />
        <Fact label="Based in" value="Cebu City" />
      </dl>
    </section>
  )
}
```

Note that the `<section>`, its `id`, and its classes stay in `AboutSection`. The paragraph stays too. Only the repeated or reusable parts moved out.

Check the browser. Exactly **4** Facts.

---

## 7. Step 5: SkillsSection and SkillTag

### 7.1 Pass 1: SkillsSection

Cut `<section id="skills" ...>` down to `</section>` from `App.jsx` and create `src/components/SkillsSection.jsx`. Paste it inside the function, with `class` changed to `className`:

```jsx
export default function SkillsSection() {
  return (
    <section id="skills" className="max-w-4xl mx-auto px-6 py-16 border-t border-stone-200 scroll-mt-16">
      <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
      <p className="mt-2 text-stone-600">What I work with.</p>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <div>
          <h3 className="text-sm font-medium text-stone-500">Languages</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-stone-300 px-3 py-1 text-sm">HTML</span>
            <span className="rounded-full border border-stone-300 px-3 py-1 text-sm">CSS</span>
            <span className="rounded-full border border-stone-300 px-3 py-1 text-sm">JavaScript</span>
            <span className="rounded-full border border-stone-300 px-3 py-1 text-sm">Java</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-stone-500">Frameworks</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-stone-300 px-3 py-1 text-sm">React</span>
            <span className="rounded-full border border-stone-300 px-3 py-1 text-sm">Tailwind CSS</span>
            <span className="rounded-full border border-stone-300 px-3 py-1 text-sm">Bootstrap</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-stone-500">Tools</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-stone-300 px-3 py-1 text-sm">Git</span>
            <span className="rounded-full border border-stone-300 px-3 py-1 text-sm">VS Code</span>
            <span className="rounded-full border border-stone-300 px-3 py-1 text-sm">MySQL</span>
            <span className="rounded-full border border-stone-300 px-3 py-1 text-sm">Figma</span>
          </div>
        </div>
      </div>
    </section>
  )
}
```

Put `<SkillsSection />` in `<main>` after `<AboutSection />` and add the import in `App.jsx`. Check the browser.

### 7.2 Pass 2: SkillTag and SectionHeading

Every `<span>` is the same except for the word. Prop: `name`.

Create `src/components/SkillTag.jsx`:

```jsx
export default function SkillTag({ name }) {
  return (
    <span className="rounded-full border border-stone-300 px-3 py-1 text-sm">{name}</span>
  )
}
```

Then edit `SkillsSection.jsx`. Replace the `<h2>` and `<p>` with `<SectionHeading />` and each `<span>` with `<SkillTag />`:

```jsx
import SectionHeading from './SectionHeading.jsx'
import SkillTag from './SkillTag.jsx'

export default function SkillsSection() {
  return (
    <section id="skills" className="max-w-4xl mx-auto px-6 py-16 border-t border-stone-200 scroll-mt-16">
      <SectionHeading title="Skills" subtitle="What I work with." />
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <div>
          <h3 className="text-sm font-medium text-stone-500">Languages</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <SkillTag name="HTML" />
            <SkillTag name="CSS" />
            <SkillTag name="JavaScript" />
            <SkillTag name="Java" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-stone-500">Frameworks</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <SkillTag name="React" />
            <SkillTag name="Tailwind CSS" />
            <SkillTag name="Bootstrap" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-stone-500">Tools</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <SkillTag name="Git" />
            <SkillTag name="VS Code" />
            <SkillTag name="MySQL" />
            <SkillTag name="Figma" />
          </div>
        </div>
      </div>
    </section>
  )
}
```

The three `<h3>` headings (Languages, Frameworks, Tools) are **not** in the component table, so they stay as plain HTML. Check the browser. Exactly **4 + 3 + 4** SkillTags.

---

## 8. Step 6: ProjectsSection and ProjectCard

### 8.1 Pass 1: ProjectsSection

Cut `<section id="projects" ...>` down to `</section>`, create `ProjectsSection.jsx` the same way, with `class` changed to `className`, put `<ProjectsSection />` in `<main>` and add the import. Check the browser.

### 8.2 Pass 2: ProjectCard and SectionHeading

Every `<article>` has the same shape. These five things change, so they are the props: `year`, `title`, `description`, `tech`, `link`.

Fixed text such as "View on GitHub" stays inside the component. Only the parts that change per card become props.

Create `src/components/ProjectCard.jsx`:

```jsx
export default function ProjectCard({ year, title, description, tech, link }) {
  return (
    <article className="rounded-lg border border-stone-200 p-6 hover:border-stone-400">
      <p className="text-xs font-medium uppercase tracking-wide text-stone-500">{year}</p>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">{description}</p>
      <p className="mt-4 text-sm text-stone-500">{tech}</p>
      <a href={link} className="mt-4 inline-block text-sm font-medium underline underline-offset-4 hover:text-stone-600">View on GitHub</a>
    </article>
  )
}
```

Then `ProjectsSection.jsx` becomes:

```jsx
import ProjectCard from './ProjectCard.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function ProjectsSection() {
  return (
    <section id="projects" className="max-w-4xl mx-auto px-6 py-16 border-t border-stone-200 scroll-mt-16">
      <SectionHeading title="Projects" subtitle="Things I have built." />
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <ProjectCard
          year="2026"
          title="About Me in React"
          description="My first React project, rebuilt from a plain HTML page."
          tech="React · Tailwind CSS"
          link="https://github.com/juandelacruz/CSIT340-Lab1-DelaCruz"
        />
        <ProjectCard
          year="2025"
          title="Canteen Queue"
          description="A page that shows how long the canteen line is so students can decide when to go."
          tech="HTML · CSS · JavaScript"
          link="https://github.com/juandelacruz/canteen-queue"
        />
        <ProjectCard
          year="2025"
          title="Clinic Records"
          description="A desktop app for our database class that keeps visit records for a small clinic."
          tech="Java · MySQL"
          link="https://github.com/juandelacruz/clinic-records"
        />
        <ProjectCard
          year="2024"
          title="Org Event Page"
          description="A one-page site for our org's freshman orientation, with the schedule and venue."
          tech="HTML · Bootstrap"
          link="https://github.com/juandelacruz/org-event-page"
        />
      </div>
    </section>
  )
}
```

Writing one prop per line, as above, is just for readability. Check the browser. Exactly **4** ProjectCards.

---

## 9. Step 7: ExperienceSection and TimelineItem

### 9.1 Pass 1: ExperienceSection

Cut `<section id="experience" ...>` down to `</section>`, create `ExperienceSection.jsx`, put `<ExperienceSection />` in `<main>`, add the import, and check the browser.

### 9.2 Pass 2: TimelineItem and SectionHeading

Each `<li>` inside the `<ol>` has four things that change: `period`, `title`, `place`, `description`.

Create `src/components/TimelineItem.jsx`:

```jsx
export default function TimelineItem({ period, title, place, description }) {
  return (
    <li className="pl-6">
      <p className="text-sm text-stone-500">{period}</p>
      <h3 className="mt-1 font-semibold">{title}</h3>
      <p className="text-sm text-stone-600">{place}</p>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">{description}</p>
    </li>
  )
}
```

`ExperienceSection.jsx` becomes:

```jsx
import SectionHeading from './SectionHeading.jsx'
import TimelineItem from './TimelineItem.jsx'

export default function ExperienceSection() {
  return (
    <section id="experience" className="max-w-4xl mx-auto px-6 py-16 border-t border-stone-200 scroll-mt-16">
      <SectionHeading title="Experience" subtitle="Where I have learned and worked." />
      <ol className="mt-8 space-y-8 border-l border-stone-200">
        <TimelineItem
          period="2024 – Present"
          title="BS Information Technology"
          place="Cebu Institute of Technology – University"
          description="Taking up web development, databases, and systems analysis."
        />
        <TimelineItem
          period="2025"
          title="Student Assistant"
          place="CCS Computer Laboratory"
          description="Set up lab machines and helped students with software installs."
        />
        <TimelineItem
          period="2022 – 2024"
          title="Senior High School, ICT Strand"
          place="Talisay City National High School"
          description="Built my first web page and got hooked."
        />
      </ol>
    </section>
  )
}
```

The `<ol>` stays as plain HTML. Only the `<li>` blocks became components. Check the browser. Exactly **3** TimelineItems.

---

## 10. Step 8: ContactSection and ContactLink

### 10.1 Pass 1: ContactSection

Cut `<section id="contact" ...>` down to `</section>`, create `ContactSection.jsx`, put `<ContactSection />` in `<main>` (it is the last one), add the import, and check the browser.

### 10.2 Pass 2: ContactLink and SectionHeading

Each `<li>` has three things that change: `label` (the grey word), `href` (where the link goes), and `text` (the words shown on the link).

Create `src/components/ContactLink.jsx`:

```jsx
export default function ContactLink({ label, href, text }) {
  return (
    <li>
      <span className="inline-block w-24 text-sm text-stone-500">{label}</span>
      <a href={href} className="font-medium hover:underline">{text}</a>
    </li>
  )
}
```

`ContactSection.jsx` becomes:

```jsx
import ContactLink from './ContactLink.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function ContactSection() {
  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 py-16 border-t border-stone-200 scroll-mt-16">
      <SectionHeading title="Contact" subtitle="Say hi." />
      <ul className="mt-8 space-y-3">
        <ContactLink
          label="Email"
          href="mailto:juan.delacruz@cit.edu"
          text="juan.delacruz@cit.edu"
        />
        <ContactLink
          label="GitHub"
          href="https://github.com/juandelacruz"
          text="github.com/juandelacruz"
        />
        <ContactLink
          label="LinkedIn"
          href="https://linkedin.com/in/juandelacruz"
          text="linkedin.com/in/juandelacruz"
        />
      </ul>
    </section>
  )
}
```

Check the browser. Exactly **3** ContactLinks.

---

## 11. Step 9: Footer

Footer has no props and nothing inside it repeats. It is the simplest one.

Cut `<footer ...>` down to `</footer>` from `App.jsx` and create `src/components/Footer.jsx`:

```jsx
export default function Footer() {
  return (
    <footer className="border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-6 py-8 text-sm text-stone-500">
        © 2026 Juan dela Cruz. Built with React and Tailwind CSS for CSIT340.
      </div>
    </footer>
  )
}
```

In `App.jsx`, put `<Footer />` after `</main>` (outside it) and add the import. Check the browser.

---

## 12. Step 10: The final App.jsx

By now `App.jsx` should have nothing but imports and the arrangement. No leftover HTML:

```jsx
import AboutSection from './components/AboutSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import ExperienceSection from './components/ExperienceSection.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Navbar from './components/Navbar.jsx'
import ProjectsSection from './components/ProjectsSection.jsx'
import SkillsSection from './components/SkillsSection.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <main>
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
```

Notice where things sit: `Navbar`, `Hero` and `Footer` are **outside** `<main>`. Only the five sections are inside it, in this order: About, Skills, Projects, Experience, Contact.

**Check:** the page must look identical to `portfolio.html`. Commit this: `git add .` then `git commit -m "Convert page to components"`.

---

## 13. Step 11: Replace the text with your own

Only now do you change content. Go file by file:

| File | Change |
|---|---|
| `Navbar.jsx` | your name in the first `<a>` |
| `Hero.jsx` | your name and your one-sentence intro |
| `AboutSection.jsx` | your paragraph and the 4 facts |
| `SkillsSection.jsx` | your skills (keep 4 + 3 + 4) |
| `ProjectsSection.jsx` | your 4 projects. A link points to that project's repository, or to your GitHub profile if it has none |
| `ExperienceSection.jsx` | your 3 timeline items |
| `ContactSection.jsx` | your email, GitHub, LinkedIn |
| `Footer.jsx` | your name |
| `index.html` | the `<title>` |

**Do not change** the class names, the structure, the number of items, or the order. Only text and links change.

---

## 14. Final checklist

- The page loads with no error screen, and the browser console (F12) is clean.
- Side by side with the original, the layout is identical.
- `src/components/` has exactly **15** files, no more and no fewer.
- Every component file ends with `export default`.
- Every component with props uses destructured props, like `({ label, value })`.
- Counts: **5** nav links, **4** facts, **4 + 3 + 4** skill tags, **4** projects, **3** timeline items, **3** contact links.
- No images. `App.css`, the `assets` folder, and the demo icons are deleted.
- Every piece of text is about you.

---

## 15. Push to GitHub

On github.com create a new **empty** repository named exactly `CSIT340-Lab3-LastName` (use your own last name; follow the name in the Teams assignment if it differs). Do not tick README, .gitignore, or license. Then in your project folder:

```bash
git init
git add .
git commit -m "Complete portfolio components"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

Later changes only need:

```bash
git add .
git commit -m "message"
git push
```

Open the repository link in a private (incognito) window to confirm your teacher can see it, then submit the link in MS Teams.

---

## 16. When something breaks

| What you see | Likely cause | Fix |
|---|---|---|
| Blank white page | A JavaScript error, or `return` without `(` | Press F12, read the first red line in the Console |
| `Failed to resolve import ./components/X.jsx` | Wrong file name, wrong folder, or wrong capitals | Match the file name exactly, including `.jsx` |
| `X is not defined` | You used `<X />` but did not import it | Add the `import` line at the top |
| Component shows nothing | Lowercase tag like `<navbar />` | Capitalize: `<Navbar />` |
| `Adjacent JSX elements must be wrapped` | Two top-level tags in one `return` | Wrap them in `<> ... </>` |
| `Expected corresponding JSX closing tag` | A tag was never closed | Close it, or self-close like `<br />` |
| `Invalid DOM property class` | A `class` is left somewhere | Change it to `className` |
| The prop text does not show | You wrote the word instead of `{label}` | Use curly braces, no quotes: `{label}` |
| The link goes nowhere | `href="{href}"` with quotes | Remove the quotes: `href={href}` |
| Page is plain, Tailwind does nothing | Plugin or `@import` missing, or server not restarted | Recheck `vite.config.js` and `index.css`, then restart `npm run dev` |

---

## 17. Exam cheat sheet

### The method for any HTML block

1. Is it in the component table, or does it repeat? If not, leave it as plain HTML.
2. Look at the repeated blocks. **Which parts are different?** Those are the props.
3. Write the file: `export default function Name({ propA, propB }) { return ( ... ) }`
4. Replace each different part with `{propA}`, `{propB}`.
5. Change every `class` to `className`.
6. Use it: `<Name propA="..." propB="..." />` and add the `import`.

### HTML to JSX rules

| In HTML | In JSX | Why |
|---|---|---|
| `class="..."` | `className="..."` | `class` is reserved in JavaScript |
| `for="..."` | `htmlFor="..."` | `for` is reserved too |
| `<br>`, `<img ...>` | `<br />`, `<img ... />` | Every tag must be closed |
| `<!-- comment -->` | `{/* comment */}` | HTML comments are not valid JSX |
| Two tags side by side at the top | Wrap in `<> ... </>` | A return gives back one element |
| Fixed text | `{variable}` for a changing value | Braces insert a JavaScript value |
| `href="#about"` | `href={href}` (from a prop) | No quotes around braces |
| `<navbar>` | `<Navbar />` | Capital letter means component |

### Remember

- One component = one file = one capital-letter name.
- `export default` at the end of every component, or the import will fail.
- `({ a, b })` pulls props out of the props object (destructuring).
- A component with no props is written `Name()` with empty parentheses and used as `<Name />`.
- Props are read-only. A component never changes its own props.
- Files in `components/` import each other with `./`; `App.jsx` imports with `./components/`.

### Self-test

Cover the code above and try to answer:

1. Which tags in the portfolio become components with **props**, and what are the props of each?
2. Why is the first `<a>` in the nav not a `NavLink`?
3. Why does `SectionHeading` return `<> ... </>`?
4. Where do `Navbar`, `Hero` and `Footer` go in `App.jsx` compared to `<main>`?
5. What happens if you write `<navbar />` instead of `<Navbar />`?
