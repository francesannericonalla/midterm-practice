export default function Navbar() {

    return (
         <nav class="sticky top-0 z-10 border-b border-stone-200 bg-white">
    <div class="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#top" class="font-semibold">Juan dela Cruz</a>
      <div class="flex gap-6 text-sm text-stone-600">
        <a href="#about" class="hover:text-stone-900">About</a>
        <a href="#skills" class="hover:text-stone-900">Skills</a>
        <a href="#projects" class="hover:text-stone-900">Projects</a>
        <a href="#experience" class="hover:text-stone-900">Experience</a>
        <a href="#contact" class="hover:text-stone-900">Contact</a>
      </div>
    </div>
  </nav>  
    )
     
}