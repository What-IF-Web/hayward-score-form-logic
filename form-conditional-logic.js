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

  function updateStoriesOptions() {
    const selected = homeType.value;

    // Enable all options first
    stories.querySelectorAll("option").forEach((opt) => {
      opt.disabled = false;
      opt.style.display = "";
    });

    // If "low-rise" is selected → hide/disable 4+
    if (selected === "low-rise") {
      stories.querySelectorAll("option").forEach((opt) => {
        const value = parseInt(opt.value, 10);
        if (value > 3) {
          opt.disabled = true;
          opt.style.display = "none"; // completely hides from dropdown
        }
      });

      // If current selection is now invalid, clear it
      if (stories.value && parseInt(stories.value, 10) > 3) {
        stories.value = "";
      }
    }
    // If "high-rise" is selected → hide/disable 1–3? (optional)
    else if (selected === "high-rise") {
      stories.querySelectorAll("option").forEach((opt) => {
        const value = parseInt(opt.value, 10);
        if (value > 0 && value <= 3) {
          opt.disabled = true;
          opt.style.display = "none";
        }
      });

      if (stories.value && parseInt(stories.value, 10) <= 3) {
        stories.value = "";
      }
    }
  }

  // Run on change and on page load
  homeType.addEventListener("change", updateStoriesOptions);
  updateStoriesOptions(); // in case of pre-filled values
});
