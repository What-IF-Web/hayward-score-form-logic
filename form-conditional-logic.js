document.addEventListener("DOMContentLoaded", function () {
  const rentOrOwn = document.getElementById("rent-or-own");
  const militaryHousing = document.getElementById("military-housing");

  // Hide both at start
  if (rentOrOwn) rentOrOwn.style.display = "none";
  if (militaryHousing) militaryHousing.style.display = "none";

  // This runs on EVERY click anywhere on the page
  document.addEventListener("click", function () {
    // Wait long enough for Webflow to finally set the checked property
    setTimeout(function () {
      const noChecked = document.getElementById(
        "Occupants----active-military---no"
      ).checked;
      const yesChecked = document.getElementById(
        "Occupants----active-military---yes"
      ).checked;

      console.log("Checked state → No:", noChecked, "Yes:", yesChecked);

      if (rentOrOwn) rentOrOwn.style.display = noChecked ? "block" : "none";
      if (militaryHousing)
        militaryHousing.style.display = yesChecked ? "block" : "none";
    }, 300); // 300ms is the magic number that finally works every time
  });

  // Initial run
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
  }, 400);
});
