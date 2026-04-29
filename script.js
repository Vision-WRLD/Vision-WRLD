const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(element => revealObserver.observe(element));

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  emailjs.init({
    publicKey: "SgSvoVyvuqYNxmcyx"
  });

  const formStatus = document.getElementById("form-status");
  const submitButton = contactForm.querySelector("button[type='submit']");

  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      company: document.getElementById("company").value,
      service: document.getElementById("service").value,
      budget: document.getElementById("budget").value,
      timeline: document.getElementById("timeline").value,
      details: document.getElementById("details").value
    };

    submitButton.classList.add("loading");
    submitButton.disabled = true;
    formStatus.textContent = "Sending your request...";

    emailjs.send("service_b0se7r7", "template_zj02gm3", formData)
      .then(() => {
        formStatus.textContent = "Request sent successfully.";
        contactForm.reset();
      })
      .catch(error => {
        console.error("EmailJS Error:", error);
        formStatus.textContent = "Something went wrong. Please try again.";
      })
      .finally(() => {
        submitButton.classList.remove("loading");
        submitButton.disabled = false;
      });
  });
}
