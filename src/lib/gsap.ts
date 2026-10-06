import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Mobile browsers resize the viewport as the address bar shows and hides.
// Without this, every pinned section would re measure on each of those.
ScrollTrigger.config({ ignoreMobileResize: true })
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
