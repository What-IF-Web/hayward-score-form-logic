// Form Conditional Logic
document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // Active Military Housing Logic
  // ============================================
  (function initMilitaryHousingLogic() {
    const rentOrOwnWrapper = document.getElementById("rent-or-own");
    const militaryHousingWrapper = document.getElementById("military-housing");
    const radioNo = document.getElementById(
      "Occupants----active-military---no"
    );
    const radioYes = document.getElementById(
      "Occupants----active-military---yes"
    );

    // Hide both wrappers by default
    if (rentOrOwnWrapper) rentOrOwnWrapper.style.display = "none";
    if (militaryHousingWrapper) militaryHousingWrapper.style.display = "none";

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
  })();

  // ============================================
  // Basement Logic
  // ============================================
  (function initBasementLogic() {
    console.log("Basement logic started – looking for elements...");

    const basementLooksLikeWrapper = document.getElementById(
      "basement-looks-like"
    );
    const basementWetDampDryWrapper = document.getElementById(
      "basement-wet-damp-dry"
    );
    const radioNo = document.getElementById("General-home----basement---no");
    const radioYes = document.getElementById("General-home----basement---yes");

    console.log("basement-looks-like wrapper:", basementLooksLikeWrapper);
    console.log("basement-wet-damp-dry wrapper:", basementWetDampDryWrapper);
    console.log("basement---no radio:", radioNo);
    console.log("basement---yes radio:", radioYes);

    // Hide both wrappers by default
    if (basementLooksLikeWrapper)
      basementLooksLikeWrapper.style.display = "none";
    if (basementWetDampDryWrapper)
      basementWetDampDryWrapper.style.display = "none";

    function updateBasementVisibility() {
      const noChecked = radioNo && radioNo.checked;
      const yesChecked = radioYes && radioYes.checked;

      console.log(
        "Updating basement visibility – no:",
        noChecked,
        "yes:",
        yesChecked
      );

      if (basementLooksLikeWrapper) {
        basementLooksLikeWrapper.style.display = noChecked ? "block" : "none";
        console.log(
          `basement-looks-like display: ${basementLooksLikeWrapper.style.display}`
        );
      }
      if (basementWetDampDryWrapper) {
        basementWetDampDryWrapper.style.display = yesChecked ? "block" : "none";
        console.log(
          `basement-wet-damp-dry display: ${basementWetDampDryWrapper.style.display}`
        );
      }
    }

    // Listen for clicks/changes on both radios
    if (radioNo) radioNo.addEventListener("click", updateBasementVisibility);
    if (radioYes) radioYes.addEventListener("click", updateBasementVisibility);

    // Run once immediately (in case one was pre-selected on page load)
    updateBasementVisibility();

    console.log("Basement logic fully loaded and listening!");
  })();

  // ============================================
  // House Stories Logic
  // ============================================
  (function initHouseStoriesLogic() {
    console.log("Script started – looking for elements...");

    const homeType = document.getElementById("home-type");
    const stories = document.getElementById("house-stories");

    if (!homeType) return console.error("home-type select NOT found!");
    if (!stories) return console.error("house-stories select NOT found!");

    console.log("Both dropdowns found!");

    function restrictStories() {
      // Try multiple ways to get the value
      let type = "";
      if (homeType.value) {
        type = homeType.value.trim();
      } else if (homeType.selectedOptions && homeType.selectedOptions[0]) {
        type = homeType.selectedOptions[0].textContent.trim();
      } else if (homeType.options && homeType.selectedIndex >= 0) {
        type = homeType.options[homeType.selectedIndex].textContent.trim();
      }

      console.log("Home type selected:", type);
      console.log("Home type value:", homeType.value);
      console.log("Home type element:", homeType);

      // Step 1: Show & enable ALL options first
      stories.querySelectorAll("option").forEach((opt) => {
        opt.disabled = false;
        opt.style.display = "";
        opt.removeAttribute("hidden");
      });

      // Step 2: Decide what to hide (check if value contains "low-rise" or "high-rise")
      const isLowRise = type.toLowerCase().includes("low-rise");
      const isHighRise = type.toLowerCase().includes("high-rise");

      if (isLowRise) {
        console.log("→ LOW-RISE selected: hiding stories 4 to 9");
        for (let i = 4; i <= 9; i++) {
          const option =
            document.getElementById(`${i}-3`) ||
            document.getElementById(`${i}-2`);
          if (option) {
            option.disabled = true;
            option.style.display = "none";
            console.log(
              `   Hidden & disabled: #${
                option.id
              } (${option.textContent.trim()})`
            );
          }
        }

        // Clear selection if it was 4–9
        const current = stories.value;
        if (current && parseInt(current, 10) >= 4) {
          console.log("Clearing invalid selection:", current);
          stories.value = "";
        }
      } else if (isHighRise) {
        console.log("→ HIGH-RISE selected: hiding stories 1 to 3");
        for (let i = 1; i <= 3; i++) {
          const option =
            document.getElementById(`${i}-2`) ||
            document.getElementById(`${i}-3`);
          if (option) {
            option.disabled = true;
            option.style.display = "none";
            console.log(
              `   Hidden & disabled: #${
                option.id
              } (${option.textContent.trim()})`
            );
          }
        }

        // Clear selection if it was 1–3
        const current = stories.value;
        if (current && parseInt(current, 10) <= 3) {
          console.log("Clearing invalid selection:", current);
          stories.value = "";
        }
      } else {
        console.log("→ Other type or empty – showing all 1–9");
      }
    }

    // Run when home-type changes
    homeType.addEventListener("change", restrictStories);

    // Run once on page load
    restrictStories();

    console.log("Script fully loaded and listening!");
  })();

  // ============================================
  // Features N/A Logic
  // ============================================
  (function initFeaturesNALogic() {
    const naCheckbox = document.getElementById(
      "General-Home-Information----Features----N-A"
    );

    if (!naCheckbox) {
      console.log("Features N/A checkbox not found");
      return;
    }

    function updateFeaturesGreyState() {
      const isChecked = naCheckbox.checked;
      const targetDivs = document.querySelectorAll(
        ".score-form_checkbox-group.home-features div.score-form_checkbox-wrapper.is-row"
      );

      targetDivs.forEach((div) => {
        if (isChecked) {
          div.classList.add("has-greyed");
        } else {
          div.classList.remove("has-greyed");
        }
      });
    }

    // Listen for clicks/changes on the checkbox
    naCheckbox.addEventListener("click", updateFeaturesGreyState);
    naCheckbox.addEventListener("change", updateFeaturesGreyState);

    // Run once immediately (in case it was pre-selected on page load)
    updateFeaturesGreyState();
  })();
});
