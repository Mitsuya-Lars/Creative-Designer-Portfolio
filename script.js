// DOM Elements
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const navbar = document.getElementById("navbar")

// Mobile Navigation Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 70 // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Add click event listeners to navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const sectionId = link.getAttribute("data-section")
    scrollToSection(sectionId)
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = ["home", "about", "skills", "projects", "contact"]
  const scrollPosition = window.scrollY + 100

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId)
    const navLink = document.querySelector(`[data-section="${sectionId}"]`)

    if (section && navLink) {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"))
        navLink.classList.add("active")
      }
    }
  })
}

window.addEventListener("scroll", updateActiveNavLink)

// Create animated stars in hero section
function createStars() {
  const starsContainer = document.getElementById("stars")
  const numberOfStars = 50

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div")
    star.className = "star"
    star.style.left = Math.random() * 100 + "%"
    star.style.top = Math.random() * 100 + "%"
    star.style.animationDelay = Math.random() * 3 + "s"
    starsContainer.appendChild(star)
  }
}

// Animated counter for statistics
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// Animate skill progress bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".progress-bar")

  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width")
    setTimeout(() => {
      bar.style.width = width + "%"
    }, 500)
  })
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")

      // Trigger specific animations based on section
      if (entry.target.id === "about") {
        setTimeout(animateCounters, 500)
      }

      if (entry.target.id === "skills") {
        setTimeout(animateSkillBars, 500)
      }
    }
  })
}, observerOptions)

// Add scroll animations to elements
function addScrollAnimations() {
  // Add fade-in animation to section headers
  const sectionHeaders = document.querySelectorAll(".section-header")
  sectionHeaders.forEach((header) => {
    header.classList.add("fade-in")
    observer.observe(header)
  })

  // Add animations to skill cards
  const skillCards = document.querySelectorAll(".skill-card")
  skillCards.forEach((card, index) => {
    card.classList.add("fade-in")
    card.style.transitionDelay = `${index * 0.1}s`
    observer.observe(card)
  })

  // Add animations to project cards
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card, index) => {
    card.classList.add("fade-in")
    card.style.transitionDelay = `${index * 0.1}s`
    observer.observe(card)
  })

  // Add animations to about section
  const aboutImage = document.querySelector(".about-image")
  const aboutText = document.querySelector(".about-text")

  if (aboutImage && aboutText) {
    aboutImage.classList.add("slide-in-left")
    aboutText.classList.add("slide-in-right")
    observer.observe(aboutImage)
    observer.observe(aboutText)
  }

  // Add animations to contact section
  const contactInfo = document.querySelector(".contact-info")
  const contactForm = document.querySelector(".contact-form")

  if (contactInfo && contactForm) {
    contactInfo.classList.add("slide-in-left")
    contactForm.classList.add("slide-in-right")
    observer.observe(contactInfo)
    observer.observe(contactForm)
  }

  // Observe sections for counter and skill bar animations
  const aboutSection = document.getElementById("about")
  const skillsSection = document.getElementById("skills")

  if (aboutSection) observer.observe(aboutSection)
  if (skillsSection) observer.observe(skillsSection)
}

// Contact form handling
function handleContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const email = formData.get("email")
      const message = formData.get("message")

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all fields")
        return
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitBtn.disabled = true

      setTimeout(() => {
        alert("Message sent successfully!")
        contactForm.reset()
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }
}

// Parallax effect for hero section
function addParallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".hero-background")

    parallaxElements.forEach((element) => {
      const speed = 0.5
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })
}

// Add hover effects to project cards
function addProjectHoverEffects() {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Add typing effect to hero title
function addTypingEffect() {
  const heroTitle = document.querySelector(".hero-title")
  if (!heroTitle) return

  const text1 = "Creative"
  const text2 = "Designer"
  let index1 = 0
  let index2 = 0

  const span1 = heroTitle.querySelector(".gradient-text")
  const span2 = heroTitle.querySelector(".white-text")

  if (span1 && span2) {
    span1.textContent = ""
    span2.textContent = ""

    function typeText1() {
      if (index1 < text1.length) {
        span1.textContent += text1.charAt(index1)
        index1++
        setTimeout(typeText1, 100)
      } else {
        setTimeout(typeText2, 200)
      }
    }

    function typeText2() {
      if (index2 < text2.length) {
        span2.textContent += text2.charAt(index2)
        index2++
        setTimeout(typeText2, 100)
      }
    }

    setTimeout(typeText1, 1000)
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  createStars()
  addScrollAnimations()
  handleContactForm()
  addParallaxEffect()
  addProjectHoverEffects()
  addTypingEffect()

  // Initial call to set active nav link
  updateActiveNavLink()
})

// Add smooth reveal animation on page load
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Add custom cursor effect (optional)
function addCustomCursor() {
  const cursor = document.createElement("div")
  cursor.className = "custom-cursor"
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
    `

  document.body.appendChild(cursor)

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX - 10 + "px"
    cursor.style.top = e.clientY - 10 + "px"
    cursor.style.opacity = "1"
  })

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1"
  })

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0"
  })

  // Scale cursor on hover over interactive elements
  const interactiveElements = document.querySelectorAll("a, button, .project-card, .skill-card")

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(1.5)"
    })

    element.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)"
    })
  })
}

// Uncomment the line below to enable custom cursor
// addCustomCursor();
