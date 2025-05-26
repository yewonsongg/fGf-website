document.addEventListener("DOMContentLoaded", function () {
  // ------------------- Essay Form -------------------
  const form = document.getElementById("essayForm");
  const otherInput = document.getElementById("otherInput");
  const otherCheckbox = document.getElementById("otherCheckbox");
  const checkboxes = document.querySelectorAll('input[name="question2"][type="checkbox"]');
  const errorMessage = document.getElementById("errorMessage");
  const messageBox = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let selected = [];
      let otherValue = otherInput.value.trim();
      errorMessage.textContent = "";

      checkboxes.forEach(cb => {
        if (cb.checked && cb.value !== "Other") {
          selected.push(cb.value);
        }
      });

      if (otherCheckbox.checked) {
        if (otherValue === "") {
          errorMessage.textContent = "Please specify";
          return;
        }
        selected.push(otherValue);
      }

      const formData = new FormData(form);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            messageBox.textContent = "Your submission was successful!";
            messageBox.style.color = "green";
            form.reset();
            otherInput.disabled = true;
          } else {
            messageBox.textContent = "Submission failed. Please try again.";
            messageBox.style.color = "red";
          }
        })
        .catch(() => {
          messageBox.textContent = "Network error. Please try again.";
          messageBox.style.color = "red";
        });
    });

    otherCheckbox.addEventListener("change", function () {
      otherInput.disabled = !this.checked;
      if (!this.checked) {
        otherInput.value = "";
      }
    });
  }

  // ------------------- Join Us Form -------------------
  const joinForm = document.getElementById("joinForm");
  const joinMessage = document.getElementById("joinMessage");

  if (joinForm) {
    joinForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(joinForm);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            joinMessage.textContent = "Thanks! Your application has been received.";
            joinMessage.style.color = "green";
            joinForm.reset();
          } else {
            joinMessage.textContent = "Something went wrong. Please try again.";
            joinMessage.style.color = "red";
          }
        })
        .catch(() => {
          joinMessage.textContent = "Network error. Please try again.";
          joinMessage.style.color = "red";
        });
    });
  }
});

  // Fix scroll behavior after offcanvas closes
  document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.offcanvas .nav-link');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        // get the href target (e.g., #submit-yours)
        const targetId = link.getAttribute('href');

        // wait for offcanvas to close before scrolling
        const offcanvasEl = document.querySelector('.offcanvas.show');
        if (offcanvasEl) {
          const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
          bsOffcanvas.hide();

          // delay scrolling slightly to allow offcanvas to close first
          setTimeout(() => {
            const target = document.querySelector(targetId);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 300); // matches offcanvas close animation
        }
      });
    });
  });

