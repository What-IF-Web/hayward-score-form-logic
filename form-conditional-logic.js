// Run when the page loads
document.addEventListener("DOMContentLoaded", function () {
  // Get the elements
  const wrapperRentOrOwn = document.getElementById("rent-or-own");
  const wrapperMilitaryHousing = document.getElementById("military-housing");

  const checkboxNo = document.getElementById(
    "Occupants----active-military---no"
  );
  const checkboxYes = document.getElementById(
    "Occupants----active-military---yes"
  );

  // Initially hide both wrappers
  if (wrapperRentOrOwn) wrapperRentOrOwn.style.display = "none";
  if (wrapperMilitaryHousing) wrapperMilitaryHousing.style.display = "none";

  // Function to update visibility
  function updateHousingFields() {
    if (!checkboxNo || !checkboxYes) return;

    const isYesChecked = checkboxYes.checked;
    const isNoChecked = checkboxNo.checked;

    // Show/hide based on which radio is selected
    if (wrapperRentOrOwn) {
      wrapperRentOrOwn.style.display = isNoChecked ? "block" : "none"; // or 'flex', 'grid', etc. depending on your layout
    }
    if (wrapperMilitaryHousing) {
      wrapperMilitaryHousing.style.display = isYesChecked ? "block" : "none";
    }
  }

  // Listen to changes on both checkboxes (in case they are radio buttons or actual checkboxes)
  if (checkboxNo) checkboxNo.addEventListener("change", updateHousingFields);
  if (checkboxYes) checkboxYes.addEventListener("change", updateHousingFields);

  // Run once on load in case one is pre-checked (e.g. from a previous form submission)
  updateHousingFields();
});
