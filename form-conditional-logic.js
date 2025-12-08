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
  /*============================================
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
  */

  // ============================================
  // Mold Logic
  // ============================================
  (function initMoldLogic() {
    console.log("Mold logic started – looking for elements...");

    const moldDropdown = document.getElementById("mold-dropdown");
    const radioNo = document.getElementById(
      "Indoor-Conditions----Any-visible-mold-on-walls-and-or-ceilings-no"
    );
    const radioYes = document.getElementById(
      "Indoor-Conditions----Any-visible-mold-on-walls-and-or-ceilings-yes"
    );

    console.log("mold-dropdown:", moldDropdown);
    console.log("mold---no radio:", radioNo);
    console.log("mold---yes radio:", radioYes);

    // Hide dropdown by default
    if (moldDropdown) moldDropdown.style.display = "none";

    function updateMoldVisibility() {
      const noChecked = radioNo && radioNo.checked;
      const yesChecked = radioYes && radioYes.checked;

      console.log(
        "Updating mold visibility – no:",
        noChecked,
        "yes:",
        yesChecked
      );

      if (moldDropdown) {
        moldDropdown.style.display = yesChecked ? "block" : "none";
        console.log(`mold-dropdown display: ${moldDropdown.style.display}`);
      }
    }

    // Listen for clicks/changes on both radios
    if (radioNo) radioNo.addEventListener("click", updateMoldVisibility);
    if (radioYes) radioYes.addEventListener("click", updateMoldVisibility);

    // Run once immediately (in case one was pre-selected on page load)
    updateMoldVisibility();

    console.log("Mold logic fully loaded and listening!");
  })();

  // ============================================
  // Renovation Logic
  // ============================================
  (function initRenovationLogic() {
    console.log("Renovation logic started – looking for elements...");

    const lastRemodelRenovationOne = document.getElementById(
      "last-remodel-renovation-one"
    );
    const radioOne = document.getElementById("yes-major-renovation-one");
    const radioTwo = document.getElementById("yes-major-renovation-two");

    console.log("last-remodel-renovation-one:", lastRemodelRenovationOne);
    console.log("yes-major-renovation-one radio:", radioOne);
    console.log("yes-major-renovation-two radio:", radioTwo);

    // Hide element by default
    if (lastRemodelRenovationOne)
      lastRemodelRenovationOne.style.display = "none";

    function updateRenovationVisibility() {
      const oneChecked = radioOne && radioOne.checked;
      const twoChecked = radioTwo && radioTwo.checked;

      console.log(
        "Updating renovation visibility – one:",
        oneChecked,
        "two:",
        twoChecked
      );

      if (lastRemodelRenovationOne) {
        lastRemodelRenovationOne.style.display =
          oneChecked || twoChecked ? "block" : "none";
        console.log(
          `last-remodel-renovation-one display: ${lastRemodelRenovationOne.style.display}`
        );
      }
    }

    // Listen for clicks/changes on both radios
    if (radioOne)
      radioOne.addEventListener("click", updateRenovationVisibility);
    if (radioTwo)
      radioTwo.addEventListener("click", updateRenovationVisibility);

    // Run once immediately (in case one was pre-selected on page load)
    updateRenovationVisibility();

    console.log("Renovation logic fully loaded and listening!");
  })();

  // ============================================
  // Pests Logic
  // ============================================
  (function initPestsLogic() {
    console.log("Pests logic started – looking for elements...");

    const fleasField = document.getElementById("fleas-field");
    const scoreFormButton = document.querySelector(".score-form_button");
    const radioNo = document.getElementById(
      "Pests----Do-you-treat-for-fleas-no"
    );
    const radioYes = document.getElementById(
      "Pests----Do-you-treat-for-fleas-yes"
    );

    console.log("fleas-field:", fleasField);
    console.log("score-form_button:", scoreFormButton);
    console.log("fleas---no radio:", radioNo);
    console.log("fleas---yes radio:", radioYes);

    // Hide fleas-field by default
    if (fleasField) fleasField.style.display = "none";

    function validateFleasField() {
      if (!fleasField) return true;

      // Find all required fields within fleas-field
      const requiredFields = fleasField.querySelectorAll(
        "input[required], select[required], textarea[required]"
      );

      // Check if all required fields are filled
      let allFilled = true;
      requiredFields.forEach((field) => {
        if (field.type === "checkbox" || field.type === "radio") {
          // For checkboxes/radios, check if at least one in the group is checked
          const name = field.name;
          if (name) {
            const groupChecked = document.querySelector(
              `input[name="${name}"]:checked`
            );
            if (!groupChecked) allFilled = false;
          } else if (!field.checked) {
            allFilled = false;
          }
        } else {
          // For text inputs, selects, textareas
          if (!field.value || field.value.trim() === "") {
            allFilled = false;
          }
        }
      });

      return allFilled;
    }

    function updatePestsVisibility() {
      const noChecked = radioNo && radioNo.checked;
      const yesChecked = radioYes && radioYes.checked;

      console.log(
        "Updating pests visibility – no:",
        noChecked,
        "yes:",
        yesChecked
      );

      if (fleasField) {
        fleasField.style.display = yesChecked ? "block" : "none";
        console.log(`fleas-field display: ${fleasField.style.display}`);
      }

      // Update button state
      if (scoreFormButton) {
        if (noChecked) {
          // "No" selected: enable button
          scoreFormButton.disabled = false;
          scoreFormButton.style.pointerEvents = "";
          console.log("Button enabled (no fleas treatment)");
        } else if (yesChecked) {
          // "Yes" selected: check if required fields are filled
          const isValid = validateFleasField();
          scoreFormButton.disabled = !isValid;
          scoreFormButton.style.pointerEvents = isValid ? "" : "none";
          console.log(
            `Button ${isValid ? "enabled" : "disabled"} (fleas treatment: ${
              isValid ? "valid" : "invalid"
            })`
          );
        } else {
          // Neither selected: disable button
          scoreFormButton.disabled = true;
          scoreFormButton.style.pointerEvents = "none";
          console.log("Button disabled (no selection)");
        }
      }
    }

    // Listen for clicks/changes on both radios
    if (radioNo) radioNo.addEventListener("click", updatePestsVisibility);
    if (radioYes) radioYes.addEventListener("click", updatePestsVisibility);

    // Listen for changes in fleas-field to validate in real-time
    if (fleasField) {
      fleasField.addEventListener("input", updatePestsVisibility);
      fleasField.addEventListener("change", updatePestsVisibility);
    }

    // Run once immediately (in case one was pre-selected on page load)
    updatePestsVisibility();

    console.log("Pests logic fully loaded and listening!");
  })();
});
