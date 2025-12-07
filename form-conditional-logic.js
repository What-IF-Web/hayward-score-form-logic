document.addEventListener("DOMContentLoaded", function () {
  const rentOrOwn = document.getElementById("rent-or-own");
  const militaryHousing = document.getElementById("military-housing");

  // Hide both wrappers by default
  if (rentOrOwn) rentOrOwn.style.display = "none";
  if (militaryHousing) militaryHousing.style.display = "none";

  function updateFields() {
    const noChecked = document.getElementById(
      "Occupants----active-military---no"
    ).checked;
    const yesChecked = document.getElementById(
      "Occupants----active-military---yes"
    ).checked;

    if (rentOrOwn) rentOrOwn.style.display = noChecked ? "block" : "none";
    if (militaryHousing)
      militaryHousing.style.display = yesChecked ? "block" : "none";
  }

  // This is the trick that makes it work reliably with Webflow’s custom radios
  const observer = new MutationObserver(updateFields);

  const inputNo = document.getElementById("Occupants----active-military---no");
  const inputYes = document.getElementById(
    "Occupants----active-military---yes"
  );

  if (inputNo)
    observer.observe(inputNo, {
      attributes: true,
      attributeFilter: ["checked"],
    });
  if (inputYes)
    observer.observe(inputYes, {
      attributes: true,
      attributeFilter: ["checked"],
    });

  // Fallback click listener (covers the very first click before MutationObserver kicks in)
  document.body.addEventListener("click", function checkNow() {
    setTimeout(updateFields, 10);
  });

  // Initial check in case something is pre-selected
  setTimeout(updateFields, 150);
});
