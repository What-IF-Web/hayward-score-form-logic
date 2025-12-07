document.addEventListener("DOMContentLoaded", function () {
  console.log(
    "%c=== DEBUG START ===",
    "color: #ff6b6b; font-size: 16px; font-weight: bold"
  );

  // 1. Find the wrappers
  const rentOrOwn = document.getElementById("rent-or-own");
  const militaryHousing = document.getElementById("military-housing");

  console.log('Wrapper "rent-or-own":', rentOrOwn);
  console.log('Wrapper "military-housing":', militaryHousing);

  // Hide both by default
  if (rentOrOwn) rentOrOwn.style.display = "none";
  if (militaryHousing) militaryHousing.style.display = "none";

  // 2. Find the actual <input> radios
  const inputNo = document.getElementById("Occupants----active-military---no");
  const inputYes = document.getElementById(
    "Occupants----active-military---yes"
  );

  console.log("Radio NO input:", inputNo);
  console.log("Radio YES input:", inputYes);
  if (inputNo) console.log("NO currently checked?", inputNo.checked);
  if (inputYes) console.log("YES currently checked?", inputYes.checked);

  // Main function that shows/hides
  function updateFields() {
    const noChecked = inputNo ? inputNo.checked : false;
    const yesChecked = inputYes ? inputYes.checked : false;

    console.log(
      "%c→ updateFields() called",
      "color: #4ecdc4; font-weight: bold"
    );
    console.log("   • No checked  →", noChecked);
    console.log("   • Yes checked →", yesChecked);

    if (rentOrOwn) {
      rentOrOwn.style.display = noChecked ? "block" : "none";
      console.log("   → rent-or-own display set to:", rentOrOwn.style.display);
    }
    if (militaryHousing) {
      militaryHousing.style.display = yesChecked ? "block" : "none";
      console.log(
        "   → military-housing display set to:",
        militaryHousing.style.display
      );
    }
  }

  // 3. MutationObserver – this is what finally catches Webflow's weird timing
  const observer = new MutationObserver(function (mutations) {
    console.log(
      "%cMutationMutationObserver triggered!",
      "color: #f39c12; font-size: 14px; font-weight: bold",
      mutations
    );
    updateFields();
  });

  if (inputNo) {
    observer.observe(inputNo, {
      attributes: true,
      attributeFilter: ["checked"],
    });
    console.log("Observer attached to NO radio");
  }
  if (inputYes) {
    observer.observe(inputYes, {
      attributes: true,
      attributeFilter: ["checked"],
    });
    console.log("Observer attached to YES radio");
  }

  // 4. Fallback click listener (in case observer misses the very first click)
  document.addEventListener("click", function (e) {
    console.log(
      "%cDocument clicked – checking if it was one of our radios",
      "color: #95a5a6"
    );
    if (
      e.target.closest("#Occupants----active-military---no") ||
      e.target.closest("#Occupants----active-military---yes")
    ) {
      console.log(
        "→ Click was on one of the military radios – forcing update in 50ms"
      );
      setTimeout(updateFields, 50);
    }
  });

  // 5. Initial check
  console.log("Running first updateFields() in 200ms...");
  setTimeout(updateFields, 200);

  console.log(
    "%c=== DEBUG READY – NOW CLICK YOUR RADIOS ===",
    "color: #ff6b6b; font-size: 16px; font-weight: bold"
  );
});
