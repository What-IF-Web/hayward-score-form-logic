document.addEventListener("DOMContentLoaded", function () {
  const rentOrOwn = document.getElementById("rent-or-own");
  const militaryHousing = document.getElementById("military-housing");

  // Hide both by default
  if (rentOrOwn) rentOrOwn.style.display = "none";
  if (militaryHousing) militaryHousing.style.display = "none";

  // This is the nuclear-proof version
  document.addEventListener("click", function () {
    setTimeout(function () {
      requestAnimationFrame(function () {
        const noChecked = document.getElementById(
          "Occupants----active-military---no"
        ).checked;
        const yesChecked = document.getElementById(
          "Occupants----active-military---yes"
        ).checked;

        if (rentOrOwn) rentOrOwn.style.display = noChecked ? "block" : "none";
        if (militaryHousing)
          militaryHousing.style.display = yesChecked ? "block" : "none";
      });
    }, 20);
  });

  // Initial run
  setTimeout(function () {
    requestAnimationFrame(function () {
      const noChecked = document.getElementById(
        "Occupants----active-military---no"
      ).checked;
      const yesChecked = document.getElementById(
        "Occupants----active-military---yes"
      ).checked;
      if (rentOrOwn) rentOrOwn.style.display = noChecked ? "block" : "none";
      if (militaryHousing)
        militaryHousing.style.display = yesChecked ? "block" : "none";
    });
  }, 100);
});
