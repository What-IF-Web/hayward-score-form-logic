document.addEventListener("DOMContentLoaded", function () {
  // The two wrappers you want to show/hide
  const rentOrOwnWrapper = document.getElementById("rent-or-own");
  const militaryHousingWrapper = document.getElementById("military-housing");

  // Hide both by default
  if (rentOrOwnWrapper) rentOrOwnWrapper.classList.add("hide-field");
  if (militaryHousingWrapper)
    militaryHousingWrapper.classList.add("hide-field");

  // This function runs every time either radio is clicked
  function updateHousingFields() {
    // Webflow custom radios: the actual <input> is inside the label
    const noChecked =
      document.querySelector("#Occupants----active-military---no:checked") !==
      null;
    const yesChecked =
      document.querySelector("#Occupants----active-military---yes:checked") !==
      null;

    if (rentOrOwnWrapper) {
      rentOrOwnWrapper.classList.toggle("hide-field", !noChecked);
    }
    if (militaryHousingWrapper) {
      militaryHousingWrapper.classList.toggle("hide-field", !yesChecked);
    }
  }

  // Listen to clicks on the entire document – works reliably with Webflow custom radios
  document.addEventListener("click", function (e) {
    // Only react if the click was on one of our two radio labels/inputs
    if (
      e.target.closest("#Occupants----active-military---no") ||
      e.target.closest("#Occupants----active-military---yes")
    ) {
      // Tiny delay because Webflow updates the :checked state after the click handler
      setTimeout(updateHousingFields, 50);
    }
  });

  // Run once on page load (in case something was pre-selected)
  setTimeout(updateHousingFields, 100);
});
