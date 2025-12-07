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

  // Find the wrapper elements for styling
  const radioNoWrapper = radioNo
    ? radioNo.closest(".score-form_radio-wrapper-new")
    : null;
  const radioYesWrapper = radioYes
    ? radioYes.closest(".score-form_radio-wrapper-new")
    : null;

  // Hide both wrappers by default
  if (rentOrOwnWrapper) rentOrOwnWrapper.style.display = "none";
  if (militaryHousingWrapper) militaryHousingWrapper.style.display = "none";

  // Function to update radio wrapper styling
  function updateRadioStyling() {
    // Update radioNo wrapper
    if (radioNoWrapper) {
      if (radioNo && radioNo.checked) {
        radioNoWrapper.style.backgroundColor =
          "var(--qeesi-medium-underline-color)";
        radioNoWrapper.style.color = "var(--secondary)";
      } else {
        radioNoWrapper.style.backgroundColor = "";
        radioNoWrapper.style.color = "";
      }
    }

    // Update radioYes wrapper
    if (radioYesWrapper) {
      if (radioYes && radioYes.checked) {
        radioYesWrapper.style.backgroundColor =
          "var(--qeesi-medium-underline-color)";
        radioYesWrapper.style.color = "var(--secondary)";
      } else {
        radioYesWrapper.style.backgroundColor = "";
        radioYesWrapper.style.color = "";
      }
    }
  }

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

    // Update radio styling
    updateRadioStyling();
  }

  // Listen for clicks/changes on both radios
  if (radioNo) radioNo.addEventListener("click", updateHousingVisibility);
  if (radioYes) radioYes.addEventListener("click", updateHousingVisibility);

  // Run once immediately (in case one was pre-selected on page load)
  updateHousingVisibility();
});
