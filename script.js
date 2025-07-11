const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzljv8auDxfa1m1DaL8hXp7pfCjDyo2SiSxx2S5ciO3JCyWGI1eHDKduv0AEO-4BBNg/exec";

const form  = document.getElementById("notify-form");
const email = document.getElementById("email");
const toast = document.getElementById("toast");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const value = email.value.trim();

  if (!emailRegex.test(value)) {
    showToast("Please enter a valid e‑mail address.");
    return;
  }

  const data = new FormData();
  data.append("email", value);

  try {
    await fetch(ENDPOINT, { method: "POST", body: data });
    showToast("Thanks! We'll keep you posted. ✅");
    form.reset();
  } catch (err) {
    console.error(err);
    showToast("Oops – couldn't submit. Please try again later.");
  }
});

toast.addEventListener("click", () => toast.classList.remove("show"));

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1000); // auto‑dismiss after 1 s
}
