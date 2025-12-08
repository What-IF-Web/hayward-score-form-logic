//Active military housing logic
document.addEventListener("DOMContentLoaded", function () {
  // The two wrappers you want to show/hide
  const rentOrOwnWrapper = document.getElementById("rent-or-own");
  const militaryHousingWrapper = document.getElementById("military-housing");

  // Your two radio buttons
  const radioNo = document.getElementById("Occupants----active-military---no");
  const radioYes = document.getElementById(
    "Occupants----active-military---yes"
  );

  // Hide both wrappers by default
  if (rentOrOwnWrapper) rentOrOwnWrapper.style.display = "none";
  if (militaryHousingWrapper) militaryHousingWrapper.style.display = "none";

  // Main function that shows the correct field
  function updateHousingVisibility() {
    const noChecked = radioNo && radioNo.checked;
    const yesChecked = radioYes && radioYes.checked;

    if (rentOrOwnWrapper) {
      rentOrOwnWrapper.style.display = noChecked ? "block" : "none";
    }
    if (militaryHousingWrapper) {
      militaryHousingWrapper.style.display = yesChecked ? "block" : "none";
    }
  }

  // Listen for clicks/changes on both radios
  if (radioNo) radioNo.addEventListener("click", updateHousingVisibility);
  if (radioYes) radioYes.addEventListener("click", updateHousingVisibility);

  // Run once immediately (in case one was pre-selected on page load)
  updateHousingVisibility();
});

//house stories logic
document.addEventListener("DOMContentLoaded", function () {
  const homeType = document.getElementById("home-type");
  const stories = document.getElementById("house-stories");

  function restrictStories() {
    const type = homeType.value;

    // First, enable and show all options
    stories.querySelectorAll("option").forEach((opt) => {
      opt.disabled = false;
      opt.style.display = "";
    });

    // Reset selection if it's about to become invalid
    const currentValue = parseInt(stories.value, 10);

    if (type === "low-rise") {
      // Hide & disable 4–9
      for (let i = 4; i <= 9; i++) {
        const opt = stories.querySelector(`option[value="${i}"]`);
        if (opt) {
          opt.disabled = true;
          opt.style.display = "none";
        }
      }
      // If user had selected 4+, clear it
      if (currentValue > 3) stories.value = "";
    } else if (type === "high-rise") {
      // Hide & disable 1–3
      for (let i = 1; i <= 3; i++) {
        const opt = stories.querySelector(`option[value="${i}"]`);
        if (opt) {
          opt.disabled = true;
          opt.style.display = "none";
        }
      }
      // If user had selected 1–3, clear it
      if (currentValue <= 3 && currentValue >= 1) stories.value = "";
    }
    // For all other types (single-family, etc.) → show all 1–9
  }

  // Run when home type changes
  homeType.addEventListener("change", restrictStories);

  // Run on page load (in case form is pre-filled)
  restrictStories();
});
