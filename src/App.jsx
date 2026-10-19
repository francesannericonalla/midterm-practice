import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Navlink from "./components/Navlink"

function App() {
  return(
    <>
    


  

  <main>

    <section id="about" class="max-w-4xl mx-auto px-6 py-16 border-t border-stone-200 scroll-mt-16">
      <h2 class="text-2xl font-semibold tracking-tight">About</h2>
      <p class="mt-2 text-stone-600">A little about who I am.</p>
      <p class="mt-6 max-w-2xl leading-relaxed text-stone-700">
        I grew up in Talisay and moved to Cebu City for college. I picked IT because I
        wanted to build things people actually open. So far my favorite part is the moment
        something finally runs.
      </p>
      <dl class="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
        <div>
          <dt class="text-sm text-stone-500">Course</dt>
          <dd class="mt-1 font-medium">BS Information Technology</dd>
        </div>
        <div>
          <dt class="text-sm text-stone-500">Year level</dt>
          <dd class="mt-1 font-medium">Third year</dd>
        </div>
        <div>
          <dt class="text-sm text-stone-500">School</dt>
          <dd class="mt-1 font-medium">CIT-U</dd>
        </div>
        <div>
          <dt class="text-sm text-stone-500">Based in</dt>
          <dd class="mt-1 font-medium">Cebu City</dd>
        </div>
      </dl>
    </section>

    <section id="skills" class="max-w-4xl mx-auto px-6 py-16 border-t border-stone-200 scroll-mt-16">
      <h2 class="text-2xl font-semibold tracking-tight">Skills</h2>
      <p class="mt-2 text-stone-600">What I work with.</p>
      <div class="mt-8 grid gap-8 sm:grid-cols-3">
        <div>
          <h3 class="text-sm font-medium text-stone-500">Languages</h3>
          <div class="mt-3 flex flex-wrap gap-2">
            <span class="rounded-full border border-stone-300 px-3 py-1 text-sm">HTML</span>
            <span class="rounded-full border border-stone-300 px-3 py-1 text-sm">CSS</span>
            <span class="rounded-full border border-stone-300 px-3 py-1 text-sm">JavaScript</span>
            <span class="rounded-full border border-stone-300 px-3 py-1 text-sm">Java</span>
          </div>
        </div>
        <div>
          <h3 class="text-sm font-medium text-stone-500">Frameworks</h3>
          <div class="mt-3 flex flex-wrap gap-2">
            <span class="rounded-full border border-stone-300 px-3 py-1 text-sm">React</span>
            <span class="rounded-full border border-stone-300 px-3 py-1 text-sm">Tailwind CSS</span>
            <span class="rounded-full border border-stone-300 px-3 py-1 text-sm">Bootstrap</span>
          </div>
        </div>
        <div>
          <h3 class="text-sm font-medium text-stone-500">Tools</h3>
          <div class="mt-3 flex flex-wrap gap-2">
            <span class="rounded-full border border-stone-300 px-3 py-1 text-sm">Git</span>
            <span class="rounded-full border border-stone-300 px-3 py-1 text-sm">VS Code</span>
            <span class="rounded-full border border-stone-300 px-3 py-1 text-sm">MySQL</span>
            <span class="rounded-full border border-stone-300 px-3 py-1 text-sm">Figma</span>
          </div>
        </div>
      </div>
    </section>

    <section id="projects" class="max-w-4xl mx-auto px-6 py-16 border-t border-stone-200 scroll-mt-16">
      <h2 class="text-2xl font-semibold tracking-tight">Projects</h2>
      <p class="mt-2 text-stone-600">Things I have built.</p>
      <div class="mt-8 grid gap-6 sm:grid-cols-2">
        <article class="rounded-lg border border-stone-200 p-6 hover:border-stone-400">
          <p class="text-xs font-medium uppercase tracking-wide text-stone-500">2026</p>
          <h3 class="mt-2 text-lg font-semibold">About Me in React</h3>
          <p class="mt-2 text-sm leading-relaxed text-stone-600">My first React project, rebuilt from a plain HTML page.</p>
          <p class="mt-4 text-sm text-stone-500">React · Tailwind CSS</p>
          <a href="https://github.com/juandelacruz/CSIT340-Lab1-DelaCruz" class="mt-4 inline-block text-sm font-medium underline underline-offset-4 hover:text-stone-600">View on GitHub</a>
        </article>
        <article class="rounded-lg border border-stone-200 p-6 hover:border-stone-400">
          <p class="text-xs font-medium uppercase tracking-wide text-stone-500">2025</p>
          <h3 class="mt-2 text-lg font-semibold">Canteen Queue</h3>
          <p class="mt-2 text-sm leading-relaxed text-stone-600">A page that shows how long the canteen line is so students can decide when to go.</p>
          <p class="mt-4 text-sm text-stone-500">HTML · CSS · JavaScript</p>
          <a href="https://github.com/juandelacruz/canteen-queue" class="mt-4 inline-block text-sm font-medium underline underline-offset-4 hover:text-stone-600">View on GitHub</a>
        </article>
        <article class="rounded-lg border border-stone-200 p-6 hover:border-stone-400">
          <p class="text-xs font-medium uppercase tracking-wide text-stone-500">2025</p>
          <h3 class="mt-2 text-lg font-semibold">Clinic Records</h3>
          <p class="mt-2 text-sm leading-relaxed text-stone-600">A desktop app for our database class that keeps visit records for a small clinic.</p>
          <p class="mt-4 text-sm text-stone-500">Java · MySQL</p>
          <a href="https://github.com/juandelacruz/clinic-records" class="mt-4 inline-block text-sm font-medium underline underline-offset-4 hover:text-stone-600">View on GitHub</a>
        </article>
        <article class="rounded-lg border border-stone-200 p-6 hover:border-stone-400">
          <p class="text-xs font-medium uppercase tracking-wide text-stone-500">2024</p>
          <h3 class="mt-2 text-lg font-semibold">Org Event Page</h3>
          <p class="mt-2 text-sm leading-relaxed text-stone-600">A one-page site for our org's freshman orientation, with the schedule and venue.</p>
          <p class="mt-4 text-sm text-stone-500">HTML · Bootstrap</p>
          <a href="https://github.com/juandelacruz/org-event-page" class="mt-4 inline-block text-sm font-medium underline underline-offset-4 hover:text-stone-600">View on GitHub</a>
        </article>
      </div>
    </section>

    <section id="experience" class="max-w-4xl mx-auto px-6 py-16 border-t border-stone-200 scroll-mt-16">
      <h2 class="text-2xl font-semibold tracking-tight">Experience</h2>
      <p class="mt-2 text-stone-600">Where I have learned and worked.</p>
      <ol class="mt-8 space-y-8 border-l border-stone-200">
        <li class="pl-6">
          <p class="text-sm text-stone-500">2024 – Present</p>
          <h3 class="mt-1 font-semibold">BS Information Technology</h3>
          <p class="text-sm text-stone-600">Cebu Institute of Technology – University</p>
          <p class="mt-2 text-sm leading-relaxed text-stone-600">Taking up web development, databases, and systems analysis.</p>
        </li>
        <li class="pl-6">
          <p class="text-sm text-stone-500">2025</p>
          <h3 class="mt-1 font-semibold">Student Assistant</h3>
          <p class="text-sm text-stone-600">CCS Computer Laboratory</p>
          <p class="mt-2 text-sm leading-relaxed text-stone-600">Set up lab machines and helped students with software installs.</p>
        </li>
        <li class="pl-6">
          <p class="text-sm text-stone-500">2022 – 2024</p>
          <h3 class="mt-1 font-semibold">Senior High School, ICT Strand</h3>
          <p class="text-sm text-stone-600">Talisay City National High School</p>
          <p class="mt-2 text-sm leading-relaxed text-stone-600">Built my first web page and got hooked.</p>
        </li>
      </ol>
    </section>

    <section id="contact" class="max-w-4xl mx-auto px-6 py-16 border-t border-stone-200 scroll-mt-16">
      <h2 class="text-2xl font-semibold tracking-tight">Contact</h2>
      <p class="mt-2 text-stone-600">Say hi.</p>
      <ul class="mt-8 space-y-3">
        <li>
          <span class="inline-block w-24 text-sm text-stone-500">Email</span>
          <a href="mailto:juan.delacruz@cit.edu" class="font-medium hover:underline">juan.delacruz@cit.edu</a>
        </li>
        <li>
          <span class="inline-block w-24 text-sm text-stone-500">GitHub</span>
          <a href="https://github.com/juandelacruz" class="font-medium hover:underline">github.com/juandelacruz</a>
        </li>
        <li>
          <span class="inline-block w-24 text-sm text-stone-500">LinkedIn</span>
          <a href="https://linkedin.com/in/juandelacruz" class="font-medium hover:underline">linkedin.com/in/juandelacruz</a>
        </li>
      </ul>
    </section>

  </main>



    </>

  )

}

export default App
