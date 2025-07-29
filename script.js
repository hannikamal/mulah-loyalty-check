// script.js

document.addEventListener("DOMContentLoaded", function () {
  // ========================
  // Page 1: Phone Validation
  // ========================
  const phoneInput = document.getElementById("phone");
  const checkBtn = document.getElementById("checkBtn");

  if (phoneInput && checkBtn) {
    phoneInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, '');
    });

    checkBtn.addEventListener("click", function () {
      const phone = phoneInput.value.trim();
      const fullNumber = "+60" + phone;

      if (fullNumber === "+60173527250") {
        localStorage.setItem("phone", fullNumber);
        window.location.href = "page2.html";
      } else {
        alert("Only +60173527250 is allowed for this test.");
      }
    });
  }

  // ========================
  // Page 2: Registration Form
  // ========================
  const registrationForm = document.getElementById("registrationForm");

  if (registrationForm) {
    const nameInput = document.getElementById("name");
    const ddInput = document.getElementById("dd");
    const mmInput = document.getElementById("mm");
    const yyyyInput = document.getElementById("yyyy");
    const emailInput = document.getElementById("email");
    const noEmailCheckbox = document.getElementById("noEmail");

    const nameError = document.getElementById("nameError");
    const birthdayError = document.getElementById("birthdayError");
    const emailError = document.getElementById("emailError");

    noEmailCheckbox.addEventListener("change", function () {
      if (this.checked) {
        emailInput.disabled = true;
        emailInput.value = "";
      } else {
        emailInput.disabled = false;
      }
    });

    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Reset errors
      nameError.style.display = "none";
      birthdayError.style.display = "none";
      emailError.style.display = "none";

      let valid = true;

      const name = nameInput.value.trim();
      const dd = ddInput.value;
      const mm = mmInput.value;
      const yyyy = yyyyInput.value;
      const birthday = `${dd}/${mm}/${yyyy}`;
      const email = emailInput.value;
      const noEmail = noEmailCheckbox.checked;

      if (name === "") {
        nameError.style.display = "block";
        valid = false;
      }

      if (!dd || !mm || !yyyy) {
        birthdayError.style.display = "block";
        valid = false;
      }

      if (!noEmail && email === "") {
        emailError.style.display = "block";
        valid = false;
      }

      if (valid) {
        localStorage.setItem("name", name);
        localStorage.setItem("birthday", birthday);
        localStorage.setItem("email", noEmail ? "No email address" : email);
        window.location.href = "page3.html";
      }
    });
  }

  // ========================
  // Page 3: Display Info
  // ========================
  const output = document.getElementById("output");

  if (output) {
    const phone = localStorage.getItem("phone") || "-";
    const name = localStorage.getItem("name") || "-";
    const birthday = localStorage.getItem("birthday") || "-";
    const email = localStorage.getItem("email") || "-";

    output.innerHTML = `
      <h2>Your Info</h2>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Birthday:</strong> ${birthday}</p>
      <p><strong>Email:</strong> ${email}</p>
    `;
  }
});
