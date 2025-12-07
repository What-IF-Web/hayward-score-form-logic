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
