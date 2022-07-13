// Adicionado o Scroll suave
function scrollSuave() {
  const navMenu = document.querySelectorAll('.js-menu a[href^="#"]');
  function scrollMenu(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const menu = document.querySelector(href);
    menu.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  navMenu.forEach((link) => {
    link.addEventListener("click", scrollMenu);
  });
}
scrollSuave();

// Adicionado animação ao iniciar
function initAnimacaoScroll() {
  const sectionScroll = document.querySelectorAll(".js-scroll");
  if (sectionScroll.length) {
    const windowMetade = innerHeight * 0.6;
    function animaScroll() {
      sectionScroll.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionInvisible = sectionTop - windowMetade < 0;
        if (sectionInvisible) section.classList.add("ativo");
        else section.classList.remove("ativo");
      });
    }
    window.addEventListener("scroll", animaScroll);
  }
}
initAnimacaoScroll();
