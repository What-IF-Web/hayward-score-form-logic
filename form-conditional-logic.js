document.addEventListener("DOMContentLoaded", function () {
  const rentOrOwn = document.getElementById("rent-or-own");
  const militaryHousing = document.getElementById("military-housing");
  const radioNo = document.getElementById("Occupants----active-military---no");
  const radioYes = document.getElementById(
    "Occupants----active-military---yes"
  );

  // Hide both by default
  if (rentOrOwn) rentOrOwn.style.display = "none";
  if (militaryHousing) militaryHousing.style.display = "none";

  // This single function does everything
  function checkMilitaryStatus() {
    const showRentOrOwn = radioNo && radioNo.checked;
    const showMilitary = radioYes && radioYes.checked;

    console.log(
      "checkMilitaryStatus → No:",
      showRentOrOwn,
      "Yes:",
      showMilitary
    );

    if (rentOrOwn) rentOrOwn.style.display = showRentOrOwn ? "block" : "none";
    if (militaryHousing)
      militaryHousing.style.display = showMilitary ? "block" : "none";
  }

  // THE ONLY THING THAT RELIABLY WORKS with Webflow custom radios:
  // Listen for clicks on the entire document and check 50ms later
  document.addEventListener("click", function () {
    setTimeout(checkMilitaryStatus, 50);
  });

  // Also run on page load (in case one is pre-selected)
  setTimeout(checkMilitaryStatus, 100);
});
