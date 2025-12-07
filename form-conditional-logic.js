document.addEventListener("DOMContentLoaded", function () {
  const rentOrOwn = document.getElementById("rent-or-own");
  const militaryHousing = document.getElementById("military-housing");

  // Hide both at start
  if (rentOrOwn) rentOrOwn.style.display = "none";
  if (militaryHousing) militaryHousing.style.display = "none";

  // This runs every time ANYTHING is clicked on the page
  document.addEventListener("click", function () {
    // Webflow updates the real <input> a few ms AFTER the click
    setTimeout(function () {
      const noChecked = document.getElementById(
        "Occupants----active-military---no"
      ).checked;
      const yesChecked = document.getElementById(
        "Occupants----active-military---yes"
      ).checked;

      if (rentOrOwn) rentOrOwn.style.display = noChecked ? "block" : "none";
      if (militaryHousing)
        militaryHousing.style.display = yesChecked ? "block" : "none";
    }, 10); // 10ms is enough — 50 was overkill
  });

  // Run once on load (in case one was pre-checked)
  setTimeout(function () {
    const noChecked = document.getElementById(
      "Occupants----active-military---no"
    ).checked;
    const yesChecked = document.getElementById(
      "Occupants----active-military---yes"
    ).checked;

    if (rentOrOwn) rentOrOwn.style.display = noChecked ? "block" : "none";
    if (militaryHousing)
      militaryHousing.style.display = yesChecked ? "block" : "none";
  }, 100);
});
