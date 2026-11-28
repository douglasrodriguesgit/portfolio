export default function initProjectsSlider() {
  const slider = document.querySelector(".js_projects_slider");
  if (!slider) return;

  const stage = slider.querySelector(".projects_stage");
  const slides = [...slider.querySelectorAll(".project_slide")];
  const details = slider.querySelector(".js_projects_details");
  const progress = slider.querySelector(".js_projects_progress");
  const prev = slider.querySelector(".js_projects_prev");
  const next = slider.querySelector(".js_projects_next");
  const current = document.querySelector(".js_projects_current");
  const total = document.querySelector(".js_projects_total");
  const pad = (n) => String(n).padStart(2, "0");
  const count = slides.length;
  if (!count) return;

  let active = 0;
  let detailsTimer;

  if (total) total.textContent = pad(count);

  // Numeração automática: basta adicionar um novo <li class="project_slide">
  slides.forEach((slide, i) => {
    const index = slide.querySelector(".project_index");
    if (index) index.textContent = pad(i + 1);
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${i + 1} de ${count}`);
  });

  const dots = slides.map((slide, i) => {
    const dot = document.createElement("button");
    const name = slide.querySelector(".project_name");
    dot.type = "button";
    dot.setAttribute(
      "aria-label",
      `Ver projeto ${i + 1}${name ? `: ${name.textContent.trim()}` : ""}`
    );
    dot.addEventListener("click", () => goTo(i));
    progress.appendChild(dot);
    return dot;
  });

  function renderDetails(animate) {
    const info = slides[active].querySelector(".project_info");
    clearTimeout(detailsTimer);

    const swap = () => {
      details.innerHTML = info ? info.outerHTML : "";
      // força reflow para reiniciar a transição de entrada
      void details.offsetWidth;
      details.classList.add("is_in");
    };

    if (!animate) return swap();
    details.classList.remove("is_in");
    detailsTimer = setTimeout(swap, 280);
  }

  function render(animate = true) {
    slides.forEach((slide, i) => {
      const pos = (i - active + count) % count;
      let state = "hidden";
      if (pos === 0) state = "0";
      else if (pos === 1 || pos === 2) state = String(pos);
      if (pos === count - 1 && count > 3) state = "out";

      slide.dataset.pos = state;
      slide.setAttribute("aria-hidden", String(pos !== 0));
    });

    dots.forEach((dot, i) =>
      dot.setAttribute("aria-current", String(i === active))
    );
    if (current) current.textContent = pad(active + 1);
    renderDetails(animate);
  }

  function goTo(index) {
    const target = (index + count) % count;
    if (target === active) return;
    active = target;
    render();
  }

  prev.addEventListener("click", () => goTo(active - 1));
  next.addEventListener("click", () => goTo(active + 1));

  // clique nas cartas de trás traz a carta para frente
  stage.addEventListener("click", (event) => {
    const slide = event.target.closest(".project_slide");
    if (!slide || slide.dataset.pos === "0") return;
    event.preventDefault();
    goTo(slides.indexOf(slide));
  });

  slider.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") goTo(active + 1);
    else if (event.key === "ArrowLeft") goTo(active - 1);
    else return;
    event.preventDefault();
  });

  // swipe / arrastar
  let startX = 0;
  let deltaX = 0;
  let dragging = false;
  let moved = false;

  stage.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging = true;
    moved = false;
    startX = event.clientX;
    deltaX = 0;
  });

  stage.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    deltaX = event.clientX - startX;
    if (Math.abs(deltaX) < 8) return;
    if (!moved) stage.setPointerCapture(event.pointerId);
    moved = true;
    stage.classList.add("is_dragging");
    const front = slides[active];
    front.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 40}deg)`;
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove("is_dragging");
    slides[active].style.transform = "";
    if (Math.abs(deltaX) > 60) goTo(deltaX < 0 ? active + 1 : active - 1);
  }

  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);

  // evita abrir o link ao soltar depois de arrastar
  stage.addEventListener(
    "click",
    (event) => {
      if (!moved) return;
      event.preventDefault();
      event.stopPropagation();
      moved = false;
    },
    true
  );

  stage.addEventListener("dragstart", (event) => event.preventDefault());

  render(false);
}
