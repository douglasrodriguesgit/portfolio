export default function initCurrentYear() {
  const years = document.querySelectorAll(".js_current_year");
  const currentYear = new Date().getFullYear();

  years.forEach((year) => {
    year.textContent = currentYear;
  });
}
