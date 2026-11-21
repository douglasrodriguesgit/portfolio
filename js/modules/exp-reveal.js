export default function initExpReveal() {
  const cards = document.querySelectorAll(".exp_item_reveal");
  if (!cards.length) return;

  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("is_visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is_visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.45, rootMargin: "0px 0px -8%" }
  );

  cards.forEach((card) => observer.observe(card));
}
