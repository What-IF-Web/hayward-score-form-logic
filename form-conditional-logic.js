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
    const basementLooksLikeWrapper = document.getElementById(
      "basement-looks-like"
    );
    const basementWetDampDryWrapper = document.getElementById(
      "basement-wet-damp-dry"
    );
    const radioNo = document.getElementById("General-home----basement---no");
    const radioYes = document.getElementById("General-home----basement---yes");

    // Make the basement radio buttons required (set on one, applies to the group)
    if (radioNo) radioNo.setAttribute("required", "required");
    if (radioYes) radioYes.setAttribute("required", "required");

    // Hide both wrappers by default
    if (basementLooksLikeWrapper)
      basementLooksLikeWrapper.style.display = "none";
    if (basementWetDampDryWrapper)
      basementWetDampDryWrapper.style.display = "none";

    // Helper function to validate basement fields when "yes" is selected
    function validateBasementFields() {
      if (!basementLooksLikeWrapper || !basementWetDampDryWrapper) return true;

      const requiredFields = [
        ...basementLooksLikeWrapper.querySelectorAll(
          "input[required], select[required], textarea[required]"
        ),
        ...basementWetDampDryWrapper.querySelectorAll(
          "input[required], select[required], textarea[required]"
        ),
      ];

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

    function updateBasementVisibility() {
      const noChecked = radioNo && radioNo.checked;
      const yesChecked = radioYes && radioYes.checked;

      // Helper function to update required attributes for all form fields in a wrapper
      function updateRequiredFields(wrapper, isRequired) {
        if (!wrapper) return;
        const fields = wrapper.querySelectorAll("input, select, textarea");
        fields.forEach((field) => {
          if (isRequired) {
            field.setAttribute("required", "required");
          } else {
            field.removeAttribute("required");
          }
        });
      }

      if (noChecked) {
        // "No" selected: hide both fields and remove required
        if (basementLooksLikeWrapper) {
          basementLooksLikeWrapper.style.display = "none";
          updateRequiredFields(basementLooksLikeWrapper, false);
        }
        if (basementWetDampDryWrapper) {
          basementWetDampDryWrapper.style.display = "none";
          updateRequiredFields(basementWetDampDryWrapper, false);
        }
      } else if (yesChecked) {
        // "Yes" selected: show both fields and make them required
        if (basementLooksLikeWrapper) {
          basementLooksLikeWrapper.style.display = "block";
          updateRequiredFields(basementLooksLikeWrapper, true);
        }
        if (basementWetDampDryWrapper) {
          basementWetDampDryWrapper.style.display = "block";
          updateRequiredFields(basementWetDampDryWrapper, true);
        }
      } else {
        // Neither selected: hide both fields and remove required
        if (basementLooksLikeWrapper) {
          basementLooksLikeWrapper.style.display = "none";
          updateRequiredFields(basementLooksLikeWrapper, false);
        }
        if (basementWetDampDryWrapper) {
          basementWetDampDryWrapper.style.display = "none";
          updateRequiredFields(basementWetDampDryWrapper, false);
        }
      }
    }

    // Listen for clicks/changes on both radios
    if (radioNo) radioNo.addEventListener("click", updateBasementVisibility);
    if (radioYes) radioYes.addEventListener("click", updateBasementVisibility);

    // Listen for changes in basement fields to validate in real-time when "yes" is selected
    if (basementLooksLikeWrapper) {
      basementLooksLikeWrapper.addEventListener("input", function () {
        if (radioYes && radioYes.checked) {
          validateBasementFields();
        }
      });
      basementLooksLikeWrapper.addEventListener("change", function () {
        if (radioYes && radioYes.checked) {
          validateBasementFields();
        }
      });
    }
    if (basementWetDampDryWrapper) {
      basementWetDampDryWrapper.addEventListener("input", function () {
        if (radioYes && radioYes.checked) {
          validateBasementFields();
        }
      });
      basementWetDampDryWrapper.addEventListener("change", function () {
        if (radioYes && radioYes.checked) {
          validateBasementFields();
        }
      });
    }

    // Add form validation to prevent submission when "yes" is selected but fields aren't filled
    function setupFormValidation() {
      // Find the form - try multiple approaches
      let form = null;
      if (radioNo) {
        form = radioNo.closest("form");
      }
      if (!form && radioYes) {
        form = radioYes.closest("form");
      }
      if (!form) {
        // Try to find form by common selectors
        form = document.querySelector("form");
      }

      if (form) {
        form.addEventListener("submit", function (event) {
          const yesChecked = radioYes && radioYes.checked;

          if (yesChecked) {
            const isValid = validateBasementFields();
            if (!isValid) {
              event.preventDefault();
              event.stopPropagation();

              // Trigger HTML5 validation on the first invalid field
              const requiredFields = [
                ...(basementLooksLikeWrapper
                  ? basementLooksLikeWrapper.querySelectorAll(
                      "input[required], select[required], textarea[required]"
                    )
                  : []),
                ...(basementWetDampDryWrapper
                  ? basementWetDampDryWrapper.querySelectorAll(
                      "input[required], select[required], textarea[required]"
                    )
                  : []),
              ];

              // Find and report the first invalid field
              for (let field of requiredFields) {
                if (field.type === "checkbox" || field.type === "radio") {
                  const name = field.name;
                  if (name) {
                    const groupChecked = document.querySelector(
                      `input[name="${name}"]:checked`
                    );
                    if (!groupChecked) {
                      field.reportValidity();
                      break;
                    }
                  } else if (!field.checked) {
                    field.reportValidity();
                    break;
                  }
                } else {
                  if (!field.value || field.value.trim() === "") {
                    field.reportValidity();
                    field.focus();
                    break;
                  }
                }
              }

              return false;
            }
          }
        });
      }

      // Also handle button clicks (in case the form uses a button instead of submit)
      const submitButton = document.querySelector(
        'button[type="submit"], input[type="submit"], .score-form_button'
      );
      if (submitButton) {
        submitButton.addEventListener("click", function (event) {
          const yesChecked = radioYes && radioYes.checked;

          if (yesChecked) {
            const isValid = validateBasementFields();
            if (!isValid) {
              event.preventDefault();
              event.stopPropagation();

              // Trigger HTML5 validation
              const requiredFields = [
                ...(basementLooksLikeWrapper
                  ? basementLooksLikeWrapper.querySelectorAll(
                      "input[required], select[required], textarea[required]"
                    )
                  : []),
                ...(basementWetDampDryWrapper
                  ? basementWetDampDryWrapper.querySelectorAll(
                      "input[required], select[required], textarea[required]"
                    )
                  : []),
              ];

              for (let field of requiredFields) {
                if (field.type === "checkbox" || field.type === "radio") {
                  const name = field.name;
                  if (name) {
                    const groupChecked = document.querySelector(
                      `input[name="${name}"]:checked`
                    );
                    if (!groupChecked) {
                      field.reportValidity();
                      break;
                    }
                  } else if (!field.checked) {
                    field.reportValidity();
                    break;
                  }
                } else {
                  if (!field.value || field.value.trim() === "") {
                    field.reportValidity();
                    field.focus();
                    break;
                  }
                }
              }

              return false;
            }
          }
        });
      }
    }

    // Setup form validation
    setupFormValidation();

    // Run once immediately (in case one was pre-selected on page load)
    updateBasementVisibility();
  })();
  // ============================================
  // House Stories Logic
  // ============================================
  (function initHouseStoriesLogic() {
    const stories = document.getElementById("house-stories");
    const lowRiseOption = document.getElementById(
      "Multi-unit-low-rise-3-stories-or-more"
    );
    const highRiseOption = document.getElementById(
      "Multi-unit-high-rise-4-stories-or-more"
    );

    if (!stories) return;

    function showAllStories() {
      // Show & enable ALL options by finding them by ID (story-1 through story-9)
      for (let i = 1; i <= 9; i++) {
        const option = document.getElementById(`story-${i}`);
        if (option) {
          option.disabled = false;
          option.style.display = "";
          option.removeAttribute("hidden");
        }
      }
    }

    function restrictToLowRise() {
      showAllStories();

      // Hide stories 4 to 9
      for (let i = 4; i <= 9; i++) {
        // Try to find by ID first, then by value
        let option = document.getElementById(`story-${i}`);
        if (!option) {
          // Fallback: find by value attribute
          option = stories.querySelector(`option[value="${i}"]`);
        }
        if (!option) {
          // Fallback: find by iterating through options and matching ID or value
          option = Array.from(stories.options).find(
            (opt) =>
              opt.id === `story-${i}` ||
              opt.value === i.toString() ||
              opt.value === `story-${i}` ||
              (opt.value &&
                opt.value.toString().startsWith(i.toString()) &&
                !opt.value.toString().includes("-"))
          );
        }
        if (option) {
          option.disabled = true;
          option.style.display = "none";
        }
      }

      // Clear selection if it was 4–9
      const current = stories.value;
      if (current && parseInt(current, 10) >= 4) {
        stories.value = "";
      }
    }

    function restrictToHighRise() {
      showAllStories();

      // Hide stories 1 to 3
      for (let i = 1; i <= 3; i++) {
        // Try to find by ID first, then by value
        let option = document.getElementById(`story-${i}`);
        if (!option) {
          // Fallback: find by value attribute
          option = stories.querySelector(`option[value="${i}"]`);
        }
        if (!option) {
          // Fallback: find by iterating through options and matching ID or value
          option = Array.from(stories.options).find(
            (opt) =>
              opt.id === `story-${i}` ||
              opt.value === i.toString() ||
              opt.value === `story-${i}` ||
              (opt.value &&
                opt.value.toString().startsWith(i.toString()) &&
                !opt.value.toString().includes("-"))
          );
        }
        if (option) {
          option.disabled = true;
          option.style.display = "none";
        }
      }

      // Clear selection if it was 1–3
      const current = stories.value;
      if (current && parseInt(current, 10) <= 3) {
        stories.value = "";
      }
    }

    function updateStoriesBasedOnSelection(event) {
      // Always use a delay to ensure radio button state is fully updated
      const checkState = () => {
        // Check the current state of all relevant options
        const lowChecked = lowRiseOption && lowRiseOption.checked;
        const highChecked = highRiseOption && highRiseOption.checked;
        const mobileManufacturedOption = document.getElementById(
          "Mobile-manufactured-home"
        );
        const singleFamilyOption = document.getElementById(
          "Single-family-detached"
        );
        const mobileChecked =
          mobileManufacturedOption && mobileManufacturedOption.checked;
        const singleFamilyChecked =
          singleFamilyOption && singleFamilyOption.checked;

        // If low-rise is selected, restrict to 1-3
        if (lowChecked) {
          restrictToLowRise();
        }
        // If high-rise is selected, restrict to 4-9
        else if (highChecked) {
          restrictToHighRise();
        }
        // If Mobile/manufactured home or Single family detached is selected, show all stories
        else if (mobileChecked || singleFamilyChecked) {
          showAllStories();
        }
        // If neither is selected (any other option), show all stories
        else {
          showAllStories();
        }
      };

      // Use a longer delay to ensure radio button state is fully updated
      // This is especially important when switching from one option to another
      setTimeout(checkState, 50);
    }

    // Listen for clicks/changes on the low-rise option
    if (lowRiseOption) {
      lowRiseOption.addEventListener("click", (e) =>
        updateStoriesBasedOnSelection(e)
      );
      lowRiseOption.addEventListener("change", (e) =>
        updateStoriesBasedOnSelection(e)
      );
    }

    // Listen for clicks/changes on the high-rise option
    if (highRiseOption) {
      highRiseOption.addEventListener("click", (e) =>
        updateStoriesBasedOnSelection(e)
      );
      highRiseOption.addEventListener("change", (e) =>
        updateStoriesBasedOnSelection(e)
      );
    }

    // Listen for clicks/changes on Mobile/manufactured home option
    const mobileManufacturedOption = document.getElementById(
      "Mobile-manufactured-home"
    );
    if (mobileManufacturedOption) {
      mobileManufacturedOption.addEventListener("click", (e) =>
        updateStoriesBasedOnSelection(e)
      );
      mobileManufacturedOption.addEventListener("change", (e) =>
        updateStoriesBasedOnSelection(e)
      );
    }

    // Listen for clicks/changes on Single family detached option
    const singleFamilyOption = document.getElementById(
      "Single-family-detached"
    );
    if (singleFamilyOption) {
      singleFamilyOption.addEventListener("click", (e) =>
        updateStoriesBasedOnSelection(e)
      );
      singleFamilyOption.addEventListener("change", (e) =>
        updateStoriesBasedOnSelection(e)
      );
    }

    // Find the parent container or all related home type options
    // Try to find a common parent or all radio buttons in the same group
    let homeTypeContainer = null;
    if (lowRiseOption) {
      homeTypeContainer =
        lowRiseOption.closest("fieldset") ||
        lowRiseOption.closest(".score-form_radio-group") ||
        lowRiseOption.closest(".score-form_checkbox-group") ||
        lowRiseOption.parentElement;
    }

    // Use event delegation to listen for changes on any option in the group
    if (homeTypeContainer) {
      homeTypeContainer.addEventListener("change", function (event) {
        // Only react to radio/checkbox changes
        if (event.target.type === "radio" || event.target.type === "checkbox") {
          updateStoriesBasedOnSelection(event);
        }
      });
      homeTypeContainer.addEventListener("click", function (event) {
        // Only react to radio/checkbox clicks
        if (event.target.type === "radio" || event.target.type === "checkbox") {
          updateStoriesBasedOnSelection(event);
        }
      });
    }

    // Run once on page load to set initial state
    updateStoriesBasedOnSelection();

    console.log("Script fully loaded and listening!");
  })();

  // ============================================
  // General Home Information - Heating Units Logic
  // ============================================
  (function initGeneralHomeInformationLogic() {
    const heatingUnitsDontKnow = document.getElementById(
      "General-Home-Information----Heating-Units-I-don-t-know"
    );

    if (!heatingUnitsDontKnow) {
      return;
    }

    function updateSiblingCheckboxes() {
      const isChecked = heatingUnitsDontKnow.checked;

      // Find the parent container (likely the checkbox wrapper)
      const currentWrapper = heatingUnitsDontKnow.closest(
        ".score-form_checkbox-wrapper"
      );
      if (!currentWrapper || !currentWrapper.parentElement) return;

      // Find the common parent container
      const parentContainer = currentWrapper.parentElement;

      // Find all siblings with both classes "score-form_checkbox-wrapper" and "is-small"
      const siblings = Array.from(parentContainer.children).filter(
        (child) =>
          child !== currentWrapper &&
          child.classList.contains("score-form_checkbox-wrapper") &&
          child.classList.contains("is-small")
      );

      siblings.forEach((sibling) => {
        if (isChecked) {
          sibling.classList.add("pointer-events-none");
        } else {
          sibling.classList.remove("pointer-events-none");
        }
      });
    }

    // Listen for clicks/changes on the checkbox
    heatingUnitsDontKnow.addEventListener("click", updateSiblingCheckboxes);
    heatingUnitsDontKnow.addEventListener("change", updateSiblingCheckboxes);

    // Run once immediately (in case it was pre-selected on page load)
    updateSiblingCheckboxes();
  })();

  // ============================================
  // Features N/A Logic
  //============================================
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

      // Find siblings with class score-form_checkbox-wrapper.is-row
      const currentWrapper = naCheckbox.closest(".score-form_checkbox-wrapper");
      if (currentWrapper && currentWrapper.parentElement) {
        const parentContainer = currentWrapper.parentElement;
        const siblings = Array.from(parentContainer.children).filter(
          (child) =>
            child !== currentWrapper &&
            child.classList.contains("score-form_checkbox-wrapper") &&
            child.classList.contains("is-row")
        );

        siblings.forEach((sibling) => {
          if (isChecked) {
            sibling.classList.add("pointer-events-none");
          } else {
            sibling.classList.remove("pointer-events-none");
          }
        });
      }
    }

    // Listen for clicks/changes on the checkbox
    naCheckbox.addEventListener("click", updateFeaturesGreyState);
    naCheckbox.addEventListener("change", updateFeaturesGreyState);

    // Run once immediately (in case it was pre-selected on page load)
    updateFeaturesGreyState();
  })();

  // ============================================
  // Features Conditional Required Fields Logic
  // ============================================
  (function initFeaturesRequiredFieldsLogic() {
    const wallToWallCarpetCheckbox = document.getElementById(
      "General-Home-Information----Features----Wall-to-wall-carpet-house"
    );
    const crawlspaceCheckbox = document.getElementById(
      "General-Home-Information----Features----Crawlspace"
    );
    const cementSlabCheckbox = document.getElementById(
      "General-Home-Information----Features----Cement-slab-on-grade"
    );

    const wallToWallCarpetField = document.getElementById(
      "wall-to-wall-carpet-field"
    );
    const crawlField = document.getElementById("crawl-field");
    const slabField = document.getElementById("slab-field");

    // Helper function to update required attributes for all form fields in a wrapper
    function updateRequiredFields(wrapper, isRequired) {
      if (!wrapper) return;
      const fields = wrapper.querySelectorAll("input, select, textarea");
      fields.forEach((field) => {
        if (isRequired) {
          field.setAttribute("required", "required");
        } else {
          field.removeAttribute("required");
        }
      });
    }

    // Wall-to-wall carpet logic
    if (wallToWallCarpetCheckbox && wallToWallCarpetField) {
      function updateWallToWallCarpetRequired() {
        const isChecked = wallToWallCarpetCheckbox.checked;
        updateRequiredFields(wallToWallCarpetField, isChecked);
      }

      wallToWallCarpetCheckbox.addEventListener(
        "click",
        updateWallToWallCarpetRequired
      );
      wallToWallCarpetCheckbox.addEventListener(
        "change",
        updateWallToWallCarpetRequired
      );
      updateWallToWallCarpetRequired();
    }

    // Crawlspace logic
    if (crawlspaceCheckbox && crawlField) {
      function updateCrawlspaceRequired() {
        const isChecked = crawlspaceCheckbox.checked;
        updateRequiredFields(crawlField, isChecked);
      }

      crawlspaceCheckbox.addEventListener("click", updateCrawlspaceRequired);
      crawlspaceCheckbox.addEventListener("change", updateCrawlspaceRequired);
      updateCrawlspaceRequired();
    }

    // Cement slab logic
    if (cementSlabCheckbox && slabField) {
      function updateCementSlabRequired() {
        const isChecked = cementSlabCheckbox.checked;
        updateRequiredFields(slabField, isChecked);
      }

      cementSlabCheckbox.addEventListener("click", updateCementSlabRequired);
      cementSlabCheckbox.addEventListener("change", updateCementSlabRequired);
      updateCementSlabRequired();
    }
  })();

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

    // Make the mold radio buttons required (set on one, applies to the group)
    if (radioNo) radioNo.setAttribute("required", "required");
    if (radioYes) radioYes.setAttribute("required", "required");

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
        moldDropdown.style.display = noChecked ? "block" : "none";
        console.log(`mold-dropdown display: ${moldDropdown.style.display}`);
      }
    }

    // Listen for clicks/changes on both radios
    if (radioNo) radioNo.addEventListener("click", updateMoldVisibility);
    if (radioYes) radioYes.addEventListener("click", updateMoldVisibility);

    // Add form validation to prevent submission when neither is selected
    function setupFormValidation() {
      // Find the form - try multiple approaches
      let form = null;
      if (radioNo) {
        form = radioNo.closest("form");
      }
      if (!form && radioYes) {
        form = radioYes.closest("form");
      }
      if (!form) {
        // Try to find form by common selectors
        form = document.querySelector("form");
      }

      if (form) {
        form.addEventListener("submit", function (event) {
          const noChecked = radioNo && radioNo.checked;
          const yesChecked = radioYes && radioYes.checked;

          if (!noChecked && !yesChecked) {
            event.preventDefault();
            event.stopPropagation();

            // Trigger HTML5 validation on the first radio button
            if (radioNo) {
              radioNo.reportValidity();
            } else if (radioYes) {
              radioYes.reportValidity();
            }

            return false;
          }
        });
      }

      // Also handle button clicks (in case the form uses a button instead of submit)
      const submitButton = document.querySelector(
        'button[type="submit"], input[type="submit"], .score-form_button'
      );
      if (submitButton) {
        submitButton.addEventListener("click", function (event) {
          const noChecked = radioNo && radioNo.checked;
          const yesChecked = radioYes && radioYes.checked;

          if (!noChecked && !yesChecked) {
            event.preventDefault();
            event.stopPropagation();

            // Trigger HTML5 validation
            if (radioNo) {
              radioNo.reportValidity();
            } else if (radioYes) {
              radioYes.reportValidity();
            }

            return false;
          }
        });
      }
    }

    // Setup form validation
    setupFormValidation();

    // Run once immediately (in case one was pre-selected on page load)
    updateMoldVisibility();

    console.log("Mold logic fully loaded and listening!");
  })();

  // ============================================
  // Proximity Logic
  // ============================================
  (function initProximityLogic() {
    const proximityNACheckbox = document.getElementById(
      "Proximity----Smell-in-home----Not-applicable"
    );
    const proximityMileNACheckbox = document.getElementById(
      "Proximity----Do-You-Live-Within-1-2-Mile-Of-Any-Of-The-Following-Not-applicable"
    );

    // Handle first checkbox: Smell-in-home----Not-applicable
    if (proximityNACheckbox) {
      function updateProximitySiblings() {
        const isChecked = proximityNACheckbox.checked;

        // Find the current wrapper
        const currentWrapper = proximityNACheckbox.closest(
          ".score-form_checkbox-wrapper"
        );
        if (!currentWrapper || !currentWrapper.parentElement) return;

        // Find the parent container
        const parentContainer = currentWrapper.parentElement;

        // Find all siblings with both classes "score-form_checkbox-wrapper" and "is-dropdown"
        const siblings = Array.from(parentContainer.children).filter(
          (child) =>
            child !== currentWrapper &&
            child.classList.contains("score-form_checkbox-wrapper") &&
            child.classList.contains("is-dropdown")
        );

        siblings.forEach((sibling) => {
          if (isChecked) {
            sibling.classList.add("pointer-events-none");
          } else {
            sibling.classList.remove("pointer-events-none");
          }
        });
      }

      // Listen for clicks/changes on the checkbox
      proximityNACheckbox.addEventListener("click", updateProximitySiblings);
      proximityNACheckbox.addEventListener("change", updateProximitySiblings);

      // Run once immediately (in case it was pre-selected on page load)
      updateProximitySiblings();
    }

    // Handle second checkbox: Do-You-Live-Within-1-2-Mile-Of-Any-Of-The-Following-Not-applicable
    if (proximityMileNACheckbox) {
      function updateProximityMileSiblings() {
        const isChecked = proximityMileNACheckbox.checked;

        // Find the current wrapper
        const currentWrapper = proximityMileNACheckbox.closest(
          ".score-form_checkbox-wrapper"
        );
        if (!currentWrapper || !currentWrapper.parentElement) return;

        // Find the parent container
        const parentContainer = currentWrapper.parentElement;

        // Find all siblings with classes "score-form_checkbox-wrapper", "is-large", and "is-margin-bottom"
        const siblings = Array.from(parentContainer.children).filter(
          (child) =>
            child !== currentWrapper &&
            child.classList.contains("score-form_checkbox-wrapper") &&
            child.classList.contains("is-large") &&
            child.classList.contains("is-margin-bottom")
        );

        siblings.forEach((sibling) => {
          if (isChecked) {
            sibling.classList.add("pointer-events-none");
          } else {
            sibling.classList.remove("pointer-events-none");
          }
        });
      }

      // Listen for clicks/changes on the checkbox
      proximityMileNACheckbox.addEventListener(
        "click",
        updateProximityMileSiblings
      );
      proximityMileNACheckbox.addEventListener(
        "change",
        updateProximityMileSiblings
      );

      // Run once immediately (in case it was pre-selected on page load)
      updateProximityMileSiblings();
    }
  })();

  // ============================================
  // Indoor Conditions Logic
  // ============================================
  (function initIndoorConditionsLogic() {
    const cleaningSuppliesNACheckbox = document.getElementById(
      "Indoor-Conditions----Cleaning-supplies-N-A"
    );
    const personalCareSuppliesNACheckbox = document.getElementById(
      "Indoor-Conditions----Personal-care-supplies-N-A"
    );
    const artSuppliesNACheckbox = document.getElementById(
      "Indoor-Conditions----Art-Supplies-N-A"
    );
    const fertiliserPesticidesNACheckbox = document.getElementById(
      "Indoor-Conditions----Fertiliser-and-pesticides-N-A"
    );

    // Helper function to update siblings for a checkbox
    function updateSiblingsForCheckbox(checkbox) {
      if (!checkbox) return;

      function updateSiblings() {
        const isChecked = checkbox.checked;

        // Find the current wrapper
        const currentWrapper = checkbox.closest(".score-form_checkbox-wrapper");
        if (!currentWrapper || !currentWrapper.parentElement) return;

        // Find the parent container
        const parentContainer = currentWrapper.parentElement;

        // Find all siblings with both classes "score-form_checkbox-wrapper" and "is-small"
        const siblings = Array.from(parentContainer.children).filter(
          (child) =>
            child !== currentWrapper &&
            child.classList.contains("score-form_checkbox-wrapper") &&
            child.classList.contains("is-small")
        );

        siblings.forEach((sibling) => {
          if (isChecked) {
            sibling.classList.add("pointer-events-none");
          } else {
            sibling.classList.remove("pointer-events-none");
          }
        });
      }

      // Listen for clicks/changes on the checkbox
      checkbox.addEventListener("click", updateSiblings);
      checkbox.addEventListener("change", updateSiblings);

      // Run once immediately (in case it was pre-selected on page load)
      updateSiblings();
    }

    // Setup for each checkbox
    updateSiblingsForCheckbox(cleaningSuppliesNACheckbox);
    updateSiblingsForCheckbox(personalCareSuppliesNACheckbox);
    updateSiblingsForCheckbox(artSuppliesNACheckbox);
    updateSiblingsForCheckbox(fertiliserPesticidesNACheckbox);
  })();

  // ============================================
  // Moisture Logic
  // ============================================
  (function initMoistureLogic() {
    const moistureDontKnowCheckbox = document.getElementById(
      "Moisture----Are-the-following-outside-your-home----I-don-t-know"
    );
    const moistureNACheckbox = document.getElementById(
      "Moisture----Are-the-following-outside-your-home----INot-applicable"
    );

    // Helper function to update siblings for a checkbox
    function updateSiblingsForCheckbox(checkbox) {
      if (!checkbox) return;

      function updateSiblings() {
        const isChecked = checkbox.checked;

        // Find the current wrapper
        const currentWrapper = checkbox.closest(".score-form_checkbox-wrapper");
        if (!currentWrapper || !currentWrapper.parentElement) return;

        // Find the parent container
        const parentContainer = currentWrapper.parentElement;

        // Find all siblings with classes "score-form_checkbox-wrapper", "is-large", and "is-margin-bottom"
        const siblings = Array.from(parentContainer.children).filter(
          (child) =>
            child !== currentWrapper &&
            child.classList.contains("score-form_checkbox-wrapper") &&
            child.classList.contains("is-large") &&
            child.classList.contains("is-margin-bottom")
        );

        siblings.forEach((sibling) => {
          if (isChecked) {
            sibling.classList.add("pointer-events-none");
          } else {
            sibling.classList.remove("pointer-events-none");
          }
        });
      }

      // Listen for clicks/changes on the checkbox
      checkbox.addEventListener("click", updateSiblings);
      checkbox.addEventListener("change", updateSiblings);

      // Run once immediately (in case it was pre-selected on page load)
      updateSiblings();
    }

    // Setup for each checkbox
    updateSiblingsForCheckbox(moistureDontKnowCheckbox);
    updateSiblingsForCheckbox(moistureNACheckbox);
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
    const fleasField = document.getElementById("fleas-field");
    const radioNo = document.getElementById(
      "Pests----Do-you-treat-for-fleas-no"
    );
    const radioYes = document.getElementById(
      "Pests----Do-you-treat-for-fleas-yes"
    );
    const pestsNACheckbox = document.getElementById("Pests----N-A");

    // Make the fleas radio buttons required (set on one, applies to the group)
    if (radioNo) radioNo.setAttribute("required", "required");
    if (radioYes) radioYes.setAttribute("required", "required");

    // Hide fleas-field by default
    if (fleasField) fleasField.style.display = "none";

    // Helper function to update required attributes for all form fields in a wrapper
    function updateRequiredFields(wrapper, isRequired) {
      if (!wrapper) return;
      const fields = wrapper.querySelectorAll("input, select, textarea");
      fields.forEach((field) => {
        if (isRequired) {
          field.setAttribute("required", "required");
        } else {
          field.removeAttribute("required");
        }
      });
    }

    function updateFleasVisibility() {
      const noChecked = radioNo && radioNo.checked;
      const yesChecked = radioYes && radioYes.checked;

      if (noChecked) {
        // "No" selected: hide fleas-field and remove required
        if (fleasField) {
          fleasField.style.display = "none";
          updateRequiredFields(fleasField, false);
        }
      } else if (yesChecked) {
        // "Yes" selected: show fleas-field and make it required
        if (fleasField) {
          fleasField.style.display = "block";
          updateRequiredFields(fleasField, true);
        }
      } else {
        // Neither selected: hide fleas-field and remove required
        if (fleasField) {
          fleasField.style.display = "none";
          updateRequiredFields(fleasField, false);
        }
      }
    }

    // Listen for clicks/changes on both radios
    if (radioNo) radioNo.addEventListener("click", updateFleasVisibility);
    if (radioYes) radioYes.addEventListener("click", updateFleasVisibility);

    // Run once immediately (in case one was pre-selected on page load)
    updateFleasVisibility();

    // Handle N/A checkbox: add pointer-events-none to siblings
    if (pestsNACheckbox) {
      function updatePestsNASiblings() {
        const isChecked = pestsNACheckbox.checked;

        // Find the current wrapper
        const currentWrapper = pestsNACheckbox.closest(
          ".score-form_checkbox-wrapper"
        );
        if (!currentWrapper || !currentWrapper.parentElement) return;

        // Find the parent container
        const parentContainer = currentWrapper.parentElement;

        // Find all siblings with classes "score-form_checkbox-wrapper", "is-large", and "is-margin-bottom"
        const siblings = Array.from(parentContainer.children).filter(
          (child) =>
            child !== currentWrapper &&
            child.classList.contains("score-form_checkbox-wrapper") &&
            child.classList.contains("is-large") &&
            child.classList.contains("is-margin-bottom")
        );

        siblings.forEach((sibling) => {
          if (isChecked) {
            sibling.classList.add("pointer-events-none");
          } else {
            sibling.classList.remove("pointer-events-none");
          }
        });
      }

      // Listen for clicks/changes on the checkbox
      pestsNACheckbox.addEventListener("click", updatePestsNASiblings);
      pestsNACheckbox.addEventListener("change", updatePestsNASiblings);

      // Run once immediately (in case it was pre-selected on page load)
      updatePestsNASiblings();
    }
  })();

  // ============================================
  // Health Symptoms Logic
  // ============================================
  (function initHealthSymptomsLogic() {
    const symptomsAfterOtherCheckbox = document.getElementById(
      "symptoms-after-other"
    );
    const symptomsDuringOtherCheckbox = document.getElementById(
      "symptoms-during-other"
    );

    const gotWorseAfterOtherField = document.getElementById(
      "Health-Symptoms----Got-worse-after----Other-2"
    );
    const symptomsDuringOrAfterOtherField = document.getElementById(
      "Health-Symptoms---Symptoms-During-or-After----Other-2"
    );

    // Helper function to update required attributes for a field
    function updateRequiredField(field, isRequired) {
      if (!field) return;
      if (isRequired) {
        field.setAttribute("required", "required");
      } else {
        field.removeAttribute("required");
      }
    }

    // Symptoms after other logic
    if (symptomsAfterOtherCheckbox && gotWorseAfterOtherField) {
      function updateSymptomsAfterOtherRequired() {
        const isChecked = symptomsAfterOtherCheckbox.checked;
        updateRequiredField(gotWorseAfterOtherField, isChecked);
      }

      symptomsAfterOtherCheckbox.addEventListener(
        "click",
        updateSymptomsAfterOtherRequired
      );
      symptomsAfterOtherCheckbox.addEventListener(
        "change",
        updateSymptomsAfterOtherRequired
      );
      updateSymptomsAfterOtherRequired();
    }

    // Symptoms during other logic
    if (symptomsDuringOtherCheckbox && symptomsDuringOrAfterOtherField) {
      function updateSymptomsDuringOtherRequired() {
        const isChecked = symptomsDuringOtherCheckbox.checked;
        updateRequiredField(symptomsDuringOrAfterOtherField, isChecked);
      }

      symptomsDuringOtherCheckbox.addEventListener(
        "click",
        updateSymptomsDuringOtherRequired
      );
      symptomsDuringOtherCheckbox.addEventListener(
        "change",
        updateSymptomsDuringOtherRequired
      );
      updateSymptomsDuringOtherRequired();
    }
  })();
});
