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
  const homeTypeSelect = document.getElementById("home-type");
  const storiesSelect = document.getElementById("house-stories");

  function updateStoriesOptions() {
    const selectedValue = homeTypeSelect.value;
    const isLowRise = selectedValue === "multi-low"; // adjust this value if needed

    // Loop through all options in house-stories
    Array.from(storiesSelect.options).forEach((option) => {
      if (option.value === "" || !option.value) return; // keep the placeholder

      const stories = parseInt(option.value, 10);

      if (isLowRise && stories > 3) {
        option.disabled = true;
        option.style.display = "none"; // hide completely (optional)

        // If the currently selected value is now invalid, reset it
        if (storiesSelect.value === option.value) {
          storiesSelect.value = "";
        }
      } else {
        option.disabled = false;
        option.style.display = ""; // show again
      }
    });
  }

  // Run on page load (in case a value is pre-selected)
  updateStoriesOptions();

  // Run every time the home-type changes
  homeTypeSelect.addEventListener("change", updateStoriesOptions);
});
