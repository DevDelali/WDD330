const REGISTRATION_PROMPT_KEY = "so-registration-prompt-seen";

function registrationPromptTemplate() {
  return `
    <div class="registration-prompt" role="presentation">
      <section class="registration-prompt__dialog" role="dialog" aria-modal="true" aria-labelledby="registration-prompt-title">
        <button class="registration-prompt__close" type="button" aria-label="Close registration offer">&times;</button>
        <p class="registration-prompt__eyebrow">Sleep Outside Giveaway</p>
        <h2 id="registration-prompt-title">Register and enter to win $100 in outdoor gear</h2>
        <p>Create a free Sleep Outside account for faster checkout, saved favorites, and a chance to win our gear giveaway.</p>
        <form class="registration-prompt__form">
          <label for="registration-email">Email address</label>
          <input id="registration-email" name="email" type="email" autocomplete="email" required />
          <button type="submit">Register &amp; Enter Giveaway</button>
        </form>
        <p class="registration-prompt__details">No purchase necessary. One entry per email address.</p>
      </section>
    </div>`;
}

function markPromptSeen() {
  localStorage.setItem(REGISTRATION_PROMPT_KEY, "true");
}

function closePrompt(prompt) {
  markPromptSeen();
  document.body.classList.remove("modal-open");
  prompt.remove();
}

export function showRegistrationPrompt() {
  if (localStorage.getItem(REGISTRATION_PROMPT_KEY)) return;

  document.body.insertAdjacentHTML("beforeend", registrationPromptTemplate());
  const prompt = document.querySelector(".registration-prompt");
  const closeButton = prompt.querySelector(".registration-prompt__close");
  const form = prompt.querySelector(".registration-prompt__form");
  const emailInput = prompt.querySelector("#registration-email");

  document.body.classList.add("modal-open");
  emailInput.focus();

  closeButton.addEventListener("click", () => closePrompt(prompt));
  prompt.addEventListener("click", (event) => {
    if (event.target === prompt) closePrompt(prompt);
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.setItem("so-registration-email", emailInput.value);
    closePrompt(prompt);
  });
}
