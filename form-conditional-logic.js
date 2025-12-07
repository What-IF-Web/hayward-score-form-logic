document.addEventListener("DOMContentLoaded", function () {
  const rentOrOwn = document.getElementById("rent-or-own");
  const militaryHousing = document.getElementById("military-housing");

  // Hide both by default
  if (rentOrOwn) rentOrOwn.style.display = "none";
  if (militaryHousing) militaryHousing.style.display = "none";

  function update() {
    const checkedValue = document.querySelector(
      'input[name="active-military"]:checked'
    )?.value;

    if (rentOrOwn)
      rentOrOwn.style.display = checkedValue === "no" ? "block" : "none";
    if (militaryHousing)
      militaryHousing.style.display = checkedValue === "yes" ? "block" : "none";
  }

  // Normal change event works perfectly now
  document.addEventListener("change", update);
  update(); // run once on load
});
