// Form Conditional Logic
document.addEventListener("DOMContentLoaded", function () {
  // Helper function to style radio buttons when selected
  function setupRadioButtonStyles(radioNo, radioYes) {
    // Check if these radios belong to the protected groups (by parent container ID)
    const protectedContainerIds = [
      "private-well-water-system",
      "changes-in-tap-water-appearance",
    ];

    function getProtectedContainerId(radio) {
      if (!radio) return null;
      // Return the ID of the protected container this radio is in, or null
      for (let id of protectedContainerIds) {
        const container = document.getElementById(id);
        if (container && container.contains(radio)) {
          return id;
        }
      }
      return null;
    }

    const radioNoContainerId = getProtectedContainerId(radioNo);
    const radioYesContainerId = getProtectedContainerId(radioYes);
    const isProtectedPair =
      radioNoContainerId !== null || radioYesContainerId !== null;

    function updateRadioStyles(radio) {
      if (!radio) return;

      // Find the label or wrapper element (try multiple selectors)
      const label =
        radio.closest("label") ||
        radio.closest(".score-form_radio-wrapper") ||
        radio.closest(".score-form_checkbox-wrapper") ||
        radio.parentElement;

      if (label) {
        if (radio.checked) {
          // Apply selected styles
          label.style.backgroundColor = "#313794";
          label.style.color = "#ffffff";
          // Also apply color to child elements (spans, divs, etc.)
          const textElements = label.querySelectorAll(
            "span, div, p, label, .score-form_radio-label-new"
          );
          textElements.forEach((el) => {
            el.style.color = "#ffffff";
            el.style.setProperty("color", "#ffffff", "important");
          });
        } else {
          // Revert to original styles ONLY if:
          // 1. Not protected at all, OR
          // 2. Protected AND in the same container as the current pair
          const radioContainerId = getProtectedContainerId(radio);
          const inSameContainer =
            radioContainerId === radioNoContainerId &&
            radioContainerId === radioYesContainerId;
          const shouldRevert = !isProtectedPair || inSameContainer;

          if (shouldRevert) {
            label.style.backgroundColor = "";
            label.style.color = "";
            // Revert child element colors
            const textElements = label.querySelectorAll(
              "span, div, p, label, .score-form_radio-label-new"
            );
            textElements.forEach((el) => {
              el.style.color = "";
              el.style.removeProperty("color");
            });
          }
        }
      }
    }

    function updateBothRadioStyles() {
      updateRadioStyles(radioNo);
      updateRadioStyles(radioYes);
    }

    // Listen for changes on both radios
    if (radioNo) {
      radioNo.addEventListener("click", updateBothRadioStyles);
      radioNo.addEventListener("change", updateBothRadioStyles);
    }
    if (radioYes) {
      radioYes.addEventListener("click", updateBothRadioStyles);
      radioYes.addEventListener("change", updateBothRadioStyles);
    }

    // Apply initial styles
    updateBothRadioStyles();
  }

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

    // Setup radio button styles
    setupRadioButtonStyles(radioNo, radioYes);

    // Run once immediately (in case one was pre-selected on page load)
    updateHousingVisibility();
  })();

  // ============================================
  // Cooking & Range Hood Radio Button Styles
  // ============================================
  (function initCookingRangeHoodStyles() {
    // Cook with steamer
    const cookSteamerNo = document.querySelector(
      'input[name="cook-with-steamer"][value="no"], input[name="cook-with-steamer"][id*="no"]'
    );
    const cookSteamerYes = document.querySelector(
      'input[name="cook-with-steamer"][value="yes"], input[name="cook-with-steamer"][id*="yes"]'
    );
    if (cookSteamerNo && cookSteamerYes) {
      setupRadioButtonStyles(cookSteamerNo, cookSteamerYes);
    }

    // Boil simmer wok
    const boilSimmerNo = document.querySelector(
      'input[name="boil-simmer-wok"][value="no"], input[name="boil-simmer-wok"][id*="no"]'
    );
    const boilSimmerYes = document.querySelector(
      'input[name="boil-simmer-wok"][value="yes"], input[name="boil-simmer-wok"][id*="yes"]'
    );
    if (boilSimmerNo && boilSimmerYes) {
      setupRadioButtonStyles(boilSimmerNo, boilSimmerYes);
    }

    // Cook with gas
    const cookGasNo = document.querySelector(
      'input[name="cook-with-gas"][value="no"], input[name="cook-with-gas"][id*="no"]'
    );
    const cookGasYes = document.querySelector(
      'input[name="cook-with-gas"][value="yes"], input[name="cook-with-gas"][id*="yes"]'
    );
    if (cookGasNo && cookGasYes) {
      setupRadioButtonStyles(cookGasNo, cookGasYes);
    }

    // Range hood fan
    const rangeHoodFanNo = document.querySelector(
      'input[name="range-hood-fan"][value="no"], input[name="range-hood-fan"][id*="no"]'
    );
    const rangeHoodFanYes = document.querySelector(
      'input[name="range-hood-fan"][value="yes"], input[name="range-hood-fan"][id*="yes"]'
    );
    if (rangeHoodFanNo && rangeHoodFanYes) {
      setupRadioButtonStyles(rangeHoodFanNo, rangeHoodFanYes);
    }

    // Range hood cooking
    const rangeHoodCookingNo = document.querySelector(
      'input[name="range-hood-cooking"][value="no"], input[name="range-hood-cooking"][id*="no"]'
    );
    const rangeHoodCookingYes = document.querySelector(
      'input[name="range-hood-cooking"][value="yes"], input[name="range-hood-cooking"][id*="yes"]'
    );
    if (rangeHoodCookingNo && rangeHoodCookingYes) {
      setupRadioButtonStyles(rangeHoodCookingNo, rangeHoodCookingYes);
    }

    // Range hood kitchen
    const rangeHoodKitchenNo = document.querySelector(
      'input[name="range-hood-kitchen"][value="no"], input[name="range-hood-kitchen"][id*="no"]'
    );
    const rangeHoodKitchenYes = document.querySelector(
      'input[name="range-hood-kitchen"][value="yes"], input[name="range-hood-kitchen"][id*="yes"]'
    );
    if (rangeHoodKitchenNo && rangeHoodKitchenYes) {
      setupRadioButtonStyles(rangeHoodKitchenNo, rangeHoodKitchenYes);
    }
  })();

  // ============================================
  // Bathroom & Moisture Radio Button Styles
  // ============================================
  (function initBathroomMoistureStyles() {
    // Bath fan while showering
    const bathFanNo = document.querySelector(
      'input[name="bath-fan-while-showering"][value="no"], input[name="bath-fan-while-showering"][id*="no"]'
    );
    const bathFanYes = document.querySelector(
      'input[name="bath-fan-while-showering"][value="yes"], input[name="bath-fan-while-showering"][id*="yes"]'
    );
    if (bathFanNo && bathFanYes) {
      setupRadioButtonStyles(bathFanNo, bathFanYes);
    }

    // Steam nozzle
    const steamNozzleNo = document.querySelector(
      'input[name="steam-nozzle"][value="no"], input[name="steam-nozzle"][id*="no"]'
    );
    const steamNozzleYes = document.querySelector(
      'input[name="steam-nozzle"][value="yes"], input[name="steam-nozzle"][id*="yes"]'
    );
    if (steamNozzleNo && steamNozzleYes) {
      setupRadioButtonStyles(steamNozzleNo, steamNozzleYes);
    }

    // Indoor jacuzzi
    const indoorJacuzziNo = document.querySelector(
      'input[name="indoor-jacuzzi"][value="no"], input[name="indoor-jacuzzi"][id*="no"]'
    );
    const indoorJacuzziYes = document.querySelector(
      'input[name="indoor-jacuzzi"][value="yes"], input[name="indoor-jacuzzi"][id*="yes"]'
    );
    if (indoorJacuzziNo && indoorJacuzziYes) {
      setupRadioButtonStyles(indoorJacuzziNo, indoorJacuzziYes);
    }

    // Condensation walls ceiling
    const condensationWallsNo = document.querySelector(
      'input[name="condensation-walls-ceiling"][value="no"], input[name="condensation-walls-ceiling"][id*="no"]'
    );
    const condensationWallsYes = document.querySelector(
      'input[name="condensation-walls-ceiling"][value="yes"], input[name="condensation-walls-ceiling"][id*="yes"]'
    );
    if (condensationWallsNo && condensationWallsYes) {
      setupRadioButtonStyles(condensationWallsNo, condensationWallsYes);
    }

    // Condensation laundry
    const condensationLaundryNo = document.querySelector(
      'input[name="condensation-laundry"][value="no"], input[name="condensation-laundry"][id*="no"]'
    );
    const condensationLaundryYes = document.querySelector(
      'input[name="condensation-laundry"][value="yes"], input[name="condensation-laundry"][id*="yes"]'
    );
    if (condensationLaundryNo && condensationLaundryYes) {
      setupRadioButtonStyles(condensationLaundryNo, condensationLaundryYes);
    }

    // Humidifier one or more
    const humidifierNo = document.querySelector(
      'input[name="humidifier-one-or-more"][value="no"], input[name="humidifier-one-or-more"][id*="no"]'
    );
    const humidifierYes = document.querySelector(
      'input[name="humidifier-one-or-more"][value="yes"], input[name="humidifier-one-or-more"][id*="yes"]'
    );
    if (humidifierNo && humidifierYes) {
      setupRadioButtonStyles(humidifierNo, humidifierYes);
    }
  })();

  // ============================================
  // Indoor Cleanliness Radio Button Styles
  // ============================================
  (function initIndoorCleanlinessStyles() {
    // Musty odors
    const mustyOdorsNo = document.querySelector(
      'input[name="musty-odors"][value="no"], input[name="musty-odors"][id*="no"]'
    );
    const mustyOdorsYes = document.querySelector(
      'input[name="musty-odors"][value="yes"], input[name="musty-odors"][id*="yes"]'
    );
    if (mustyOdorsNo && mustyOdorsYes) {
      setupRadioButtonStyles(mustyOdorsNo, mustyOdorsYes);
    }

    // Dust on surfaces
    const dustSurfacesNo = document.querySelector(
      'input[name="dust-on-surfaces"][value="no"], input[name="dust-on-surfaces"][id*="no"]'
    );
    const dustSurfacesYes = document.querySelector(
      'input[name="dust-on-surfaces"][value="yes"], input[name="dust-on-surfaces"][id*="yes"]'
    );
    if (dustSurfacesNo && dustSurfacesYes) {
      setupRadioButtonStyles(dustSurfacesNo, dustSurfacesYes);
    }

    // Dirt or dust on windowsills
    const dirtWindowsillsNo = document.querySelector(
      'input[name="dirt-or-dust-on-windowsills"][value="no"], input[name="dirt-or-dust-on-windowsills"][id*="no"]'
    );
    const dirtWindowsillsYes = document.querySelector(
      'input[name="dirt-or-dust-on-windowsills"][value="yes"], input[name="dirt-or-dust-on-windowsills"][id*="yes"]'
    );
    if (dirtWindowsillsNo && dirtWindowsillsYes) {
      setupRadioButtonStyles(dirtWindowsillsNo, dirtWindowsillsYes);
    }

    // Water stains wall ceiling
    const waterStainsNo = document.querySelector(
      'input[name="water-stains-wall-ceiling"][value="no"], input[name="water-stains-wall-ceiling"][id*="no"]'
    );
    const waterStainsYes = document.querySelector(
      'input[name="water-stains-wall-ceiling"][value="yes"], input[name="water-stains-wall-ceiling"][id*="yes"]'
    );
    if (waterStainsNo && waterStainsYes) {
      setupRadioButtonStyles(waterStainsNo, waterStainsYes);
    }
  })();

  // ============================================
  // Household Habits Radio Button Styles
  // ============================================
  (function initHouseholdHabitsStyles() {
    // Shoes off
    const shoesOffNo = document.querySelector(
      'input[name="shoes-off"][value="no"], input[name="shoes-off"][id*="no"]'
    );
    const shoesOffYes = document.querySelector(
      'input[name="shoes-off"][value="yes"], input[name="shoes-off"][id*="yes"]'
    );
    if (shoesOffNo && shoesOffYes) {
      setupRadioButtonStyles(shoesOffNo, shoesOffYes);
    }

    // Smoke tobacco home
    const smokeTobaccoNo = document.querySelector(
      'input[name="smoke-tobacco-home"][value="no"], input[name="smoke-tobacco-home"][id*="no"]'
    );
    const smokeTobaccoYes = document.querySelector(
      'input[name="smoke-tobacco-home"][value="yes"], input[name="smoke-tobacco-home"][id*="yes"]'
    );
    if (smokeTobaccoNo && smokeTobaccoYes) {
      setupRadioButtonStyles(smokeTobaccoNo, smokeTobaccoYes);
    }
  })();

  // ============================================
  // Water Quality Radio Button Styles (Protected Groups)
  // ============================================
  (function initWaterQualityStyles() {
    // Changes in tap water appearance - Apply styles to all 5 radio options
    const tapWaterRadios = [
      document.getElementById("Never-3"),
      document.getElementById("2-3-times-week"),
      document.getElementById("2-3-times-month"),
      document.getElementById("Every-few-months"),
      document.getElementById("1-2-times-year"),
    ].filter((radio) => radio !== null);

    tapWaterRadios.forEach((radio) => {
      if (radio) {
        radio.addEventListener("click", function () {
          tapWaterRadios.forEach((r) => {
            const label =
              r.closest("label") ||
              r.closest(".score-form_radio-wrapper") ||
              r.closest(".score-form_checkbox-wrapper") ||
              r.parentElement;
            if (label) {
              if (r.checked) {
                label.style.backgroundColor = "#313794";
                label.style.color = "#ffffff";
                const textElements = label.querySelectorAll(
                  "span, div, p, label, .score-form_radio-label-new"
                );
                textElements.forEach((el) => {
                  el.style.color = "#ffffff";
                  el.style.setProperty("color", "#ffffff", "important");
                });
              } else {
                label.style.backgroundColor = "";
                label.style.color = "";
                const textElements = label.querySelectorAll(
                  "span, div, p, label, .score-form_radio-label-new"
                );
                textElements.forEach((el) => {
                  el.style.color = "";
                  el.style.removeProperty("color");
                });
              }
            }
          });
        });
      }
    });

    // Private well water system - Apply styles to No/Yes options
    const wellSystemNo = document.getElementById("No-7");
    const wellSystemYes = document.getElementById("Yes-5");
    if (wellSystemNo && wellSystemYes) {
      setupRadioButtonStyles(wellSystemNo, wellSystemYes);
    }
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

    // Setup radio button styles
    setupRadioButtonStyles(radioNo, radioYes);

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
  })();

  // ============================================
  // General Home Information - Heating Units Logic
  // ============================================
  (function initGeneralHomeInformationLogic() {
    const heatingUnitsDontKnow = document.getElementById(
      "General-Home-Information----Heating-Units-I-don-t-know"
    );
    const coolingUnitsDontKnow = document.getElementById(
      "General-Home-Information----Cooling-Units-I-Dont-Know"
    );

    // Helper function to update siblings for a checkbox
    function updateSiblingCheckboxes(checkbox) {
      if (!checkbox) return;

      function updateSiblings() {
        const isChecked = checkbox.checked;

        // Find the parent container (likely the checkbox wrapper)
        const currentWrapper = checkbox.closest(".score-form_checkbox-wrapper");
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
            // Uncheck all checkboxes within this sibling
            const checkboxes = sibling.querySelectorAll(
              'input[type="checkbox"]'
            );
            checkboxes.forEach((checkbox) => {
              if (checkbox.checked) {
                checkbox.checked = false;
                // Trigger change event in case there's custom form logic
                checkbox.dispatchEvent(new Event("change", { bubbles: true }));
                checkbox.dispatchEvent(new Event("input", { bubbles: true }));
              }
            });
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

    // Setup for heating units
    updateSiblingCheckboxes(heatingUnitsDontKnow);

    // Setup for cooling units
    updateSiblingCheckboxes(coolingUnitsDontKnow);
  })();

  // ============================================
  // General Home Information - Home Built Year Dropdown Filter
  // ============================================
  (function initHomeBuiltYearDropdownFilter() {
    const homeBuiltYearField = document.getElementById(
      "General-Home-Information----Approximately-when-was-your-home-built"
    );
    const ageDropdownInput = document.getElementById("house-living-age");

    if (!homeBuiltYearField) {
      console.log("Home built year field not found");
      return;
    }

    if (!ageDropdownInput) {
      console.log("house-living-age dropdown input not found");
      return;
    }

    console.log("Found both year field and dropdown input");

    // Find the dropdown container and list
    const ageDropdownContainer = ageDropdownInput.closest(".w-dropdown");
    if (!ageDropdownContainer) {
      console.log("Dropdown container (.w-dropdown) not found");
      return;
    }

    const ageDropdownList =
      ageDropdownContainer.querySelector(".w-dropdown-list");
    if (!ageDropdownList) {
      console.log("Dropdown list (.w-dropdown-list) not found");
      return;
    }

    // Get all option elements - try nav first, then direct children
    let allOptions = Array.from(ageDropdownList.querySelectorAll("nav"));
    if (allOptions.length === 0) {
      allOptions = Array.from(ageDropdownList.children);
      console.log(
        "Using dropdown list children:",
        allOptions.length,
        "elements"
      );
    } else {
      console.log("Using nav elements:", allOptions.length, "elements");
    }

    if (allOptions.length === 0) {
      console.log("No options found in dropdown");
      return;
    }

    console.log(
      "Setup complete! First 3 options:",
      allOptions.slice(0, 3).map((opt) => ({
        id: opt.id,
        text: opt.textContent.trim(),
      }))
    );

    function filterDropdownOptions() {
      const yearBuilt = parseInt(homeBuiltYearField.value, 10);
      const currentYear = new Date().getFullYear();

      console.log(
        "Filter triggered - Year:",
        yearBuilt,
        "Current year:",
        currentYear
      );

      if (!yearBuilt || isNaN(yearBuilt) || yearBuilt > currentYear) {
        // If no valid year entered, show all options
        console.log("Invalid/empty year - showing all options");
        allOptions.forEach((option) => {
          option.style.display = "";
        });
        return;
      }

      // Calculate the age of the home in years
      const homeAge = currentYear - yearBuilt;
      const homeAgeInMonths = homeAge * 12;

      console.log("Home age:", homeAge, "years (", homeAgeInMonths, "months)");

      // Define the ranges for each option (using flexible matching)
      const ageRanges = [
        {
          keywords: ["Less-than-6", "less than 6", "6 months"],
          minMonths: 0,
          maxMonths: 5,
        },
        {
          keywords: ["7 - 12 months", "7-12-months", "7-12", "7 to 12"],
          minMonths: 7,
          maxMonths: 12,
        },
        {
          keywords: ["13 - 24 months", "13-24-months", "13-24", "13 to 24"],
          minMonths: 13,
          maxMonths: 24,
        },
        {
          keywords: ["2 - 4 years", "2-4-years", "2-4 years"],
          minYears: 2,
          maxYears: 4,
        },
        {
          keywords: ["5 - 9 years", "5-9-years", "5-9 years"],
          minYears: 5,
          maxYears: 9,
        },
        {
          keywords: ["10 - 14 years", "10---14", "10-14", "10 to 14"],
          minYears: 10,
          maxYears: 14,
        },
        {
          keywords: ["More-than-15", "more than 15", "15 years"],
          minYears: 15,
          maxYears: Infinity,
        },
      ];

      // Filter options based on home age
      allOptions.forEach((option) => {
        // Try to match the option by ID or text content
        let matchedRange = null;

        for (const range of ageRanges) {
          const matches = range.keywords.some(
            (keyword) =>
              option.id.includes(keyword) ||
              option.textContent.toLowerCase().includes(keyword.toLowerCase())
          );

          if (matches) {
            matchedRange = range;
            break;
          }
        }

        if (!matchedRange) {
          // Can't determine the range for this option, show it
          console.log(
            "No match for option:",
            option.id,
            option.textContent.trim()
          );
          option.style.display = "";
          return;
        }

        let shouldShow = false;

        // Show option if its range maximum is <= the home's age
        // (Home could have been built anytime during that year)
        if (
          matchedRange.minMonths !== undefined &&
          matchedRange.maxMonths !== undefined
        ) {
          // Range is in months - show if the range's max is <= home's age in months
          shouldShow = matchedRange.maxMonths <= homeAgeInMonths;
        } else if (
          matchedRange.minYears !== undefined &&
          matchedRange.maxYears !== undefined
        ) {
          // Range is in years - convert max to months for comparison
          // Show only if the entire range maximum is <= home's age
          const rangeMaxMonths = matchedRange.maxYears * 12;
          shouldShow = rangeMaxMonths <= homeAgeInMonths;
        }

        // Show or hide the option
        console.log(
          "Option:",
          option.textContent.trim(),
          "- Show:",
          shouldShow
        );
        if (shouldShow) {
          option.style.display = "";
        } else {
          option.style.display = "none";
        }
      });

      console.log("Filtering complete!");
    }

    // Listen for changes on the home built year field
    homeBuiltYearField.addEventListener("input", filterDropdownOptions);
    homeBuiltYearField.addEventListener("change", filterDropdownOptions);
    homeBuiltYearField.addEventListener("blur", filterDropdownOptions);

    // Run once immediately (in case there's a pre-filled value)
    filterDropdownOptions();
  })();

  // ============================================
  // Features N/A Logic
  //============================================
  (function initFeaturesNALogic() {
    const naCheckbox = document.getElementById(
      "General-Home-Information----Features----N-A"
    );

    if (!naCheckbox) {
      return;
    }

    function updateFeaturesGreyState() {
      const isChecked = naCheckbox.checked;
      const targetDivs = document.querySelectorAll(
        ".score-form_checkbox-group.home-features div.score-form_checkbox-wrapper.is-row"
      );

      // List of specific feature checkbox IDs to uncheck when N/A is checked
      const featureCheckboxIds = [
        "General-Home-Information----Features----Wall-to-wall-carpet-house",
        "General-Home-Information----Features----Wall-To-Wall-Carpet-bedrooms-only",
        "General-Home-Information----Features----Attached-or-underground-garage",
        "General-Home-Information----Features----Attic",
        "General-Home-Information----Features----Crawlspace",
        "General-Home-Information----Features----Cement-slab-on-grade",
        "General-Home-Information----Features----Fireplace",
        "General-Home-Information----Features----Room-Portable-air-purifiers",
        "General-Home-Information----Features----Built-on-stilts-posts-poles",
      ];

      // Uncheck all specific feature checkboxes when N/A is checked
      if (isChecked) {
        featureCheckboxIds.forEach((id) => {
          const checkbox = document.getElementById(id);
          if (checkbox) {
            if (checkbox.checked) {
              checkbox.checked = false;
              // Trigger change event in case there's custom form logic
              checkbox.dispatchEvent(new Event("change", { bubbles: true }));
              checkbox.dispatchEvent(new Event("input", { bubbles: true }));
            }
          }
        });
      }

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
    const moldDropdown = document.getElementById("mold-dropdown");
    const radioNo = document.getElementById(
      "Indoor-Conditions----Any-visible-mold-on-walls-and-or-ceilings-no"
    );
    const radioYes = document.getElementById(
      "Indoor-Conditions----Any-visible-mold-on-walls-and-or-ceilings-yes"
    );

    // Make the mold radio buttons required (set on one, applies to the group)
    if (radioNo) radioNo.setAttribute("required", "required");
    if (radioYes) radioYes.setAttribute("required", "required");

    // Hide dropdown by default
    if (moldDropdown) moldDropdown.style.display = "none";

    function updateMoldVisibility() {
      const noChecked = radioNo && radioNo.checked;
      const yesChecked = radioYes && radioYes.checked;

      if (moldDropdown) {
        moldDropdown.style.display = noChecked ? "block" : "none";
      }
    }

    // Listen for clicks/changes on both radios
    if (radioNo) radioNo.addEventListener("click", updateMoldVisibility);
    if (radioYes) radioYes.addEventListener("click", updateMoldVisibility);

    // Setup radio button styles
    setupRadioButtonStyles(radioNo, radioYes);

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
    const proximityLiveWithinMileNACheckbox = document.getElementById(
      "Proximity----Live-within-1-2-mile----Not-applicable"
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
            // Uncheck all checkboxes within this sibling
            const checkboxes = sibling.querySelectorAll(
              'input[type="checkbox"]'
            );
            checkboxes.forEach((checkbox) => {
              if (checkbox.checked) {
                checkbox.checked = false;
                // Trigger change event in case there's custom form logic
                checkbox.dispatchEvent(new Event("change", { bubbles: true }));
                checkbox.dispatchEvent(new Event("input", { bubbles: true }));
              }
            });
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
            // Uncheck all checkboxes within this sibling
            const checkboxes = sibling.querySelectorAll(
              'input[type="checkbox"]'
            );
            checkboxes.forEach((checkbox) => {
              if (checkbox.checked) {
                checkbox.checked = false;
                // Trigger change event in case there's custom form logic
                checkbox.dispatchEvent(new Event("change", { bubbles: true }));
                checkbox.dispatchEvent(new Event("input", { bubbles: true }));
              }
            });
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

    // Handle third checkbox: Live-within-1-2-mile----Not-applicable
    if (proximityLiveWithinMileNACheckbox) {
      function updateProximityLiveWithinMileSiblings() {
        const isChecked = proximityLiveWithinMileNACheckbox.checked;

        // Find the current wrapper
        const currentWrapper = proximityLiveWithinMileNACheckbox.closest(
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
            // Uncheck all checkboxes within this sibling
            const checkboxes = sibling.querySelectorAll(
              'input[type="checkbox"]'
            );
            checkboxes.forEach((checkbox) => {
              if (checkbox.checked) {
                checkbox.checked = false;
                // Trigger change event in case there's custom form logic
                checkbox.dispatchEvent(new Event("change", { bubbles: true }));
                checkbox.dispatchEvent(new Event("input", { bubbles: true }));
              }
            });
            sibling.classList.add("pointer-events-none");
          } else {
            sibling.classList.remove("pointer-events-none");
          }
        });
      }

      // Listen for clicks/changes on the checkbox
      proximityLiveWithinMileNACheckbox.addEventListener(
        "click",
        updateProximityLiveWithinMileSiblings
      );
      proximityLiveWithinMileNACheckbox.addEventListener(
        "change",
        updateProximityLiveWithinMileSiblings
      );

      // Run once immediately (in case it was pre-selected on page load)
      updateProximityLiveWithinMileSiblings();
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
            // Uncheck the sibling checkbox
            const siblingCheckbox = sibling.querySelector(
              'input[type="checkbox"]'
            );
            if (siblingCheckbox && siblingCheckbox.checked) {
              siblingCheckbox.checked = false;
              // Trigger change event in case other logic depends on it
              siblingCheckbox.dispatchEvent(
                new Event("change", { bubbles: true })
              );
            }
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
    const lastRemodelRenovationOne = document.getElementById(
      "last-remodel-renovation-one"
    );
    const lastRemodelRenovationTwo = document.getElementById(
      "last-remodel-renovation-two"
    );
    const yesMajorRadio = document.getElementById("Yes-Major");
    const majorRenovationYesRadio = document.getElementById(
      "major-renovation-Yes"
    );

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

    // Hide both fields by default
    if (lastRemodelRenovationOne)
      lastRemodelRenovationOne.style.display = "none";
    if (lastRemodelRenovationTwo)
      lastRemodelRenovationTwo.style.display = "none";

    function updateRenovationVisibility() {
      const yesMajorChecked = yesMajorRadio && yesMajorRadio.checked;
      const majorRenovationYesChecked =
        majorRenovationYesRadio && majorRenovationYesRadio.checked;

      // Handle last-remodel-renovation-one (shown when Yes-Major is clicked)
      if (lastRemodelRenovationOne) {
        if (yesMajorChecked) {
          lastRemodelRenovationOne.style.display = "block";
          updateRequiredFields(lastRemodelRenovationOne, true);
        } else {
          lastRemodelRenovationOne.style.display = "none";
          updateRequiredFields(lastRemodelRenovationOne, false);
        }
      }

      // Handle last-remodel-renovation-two (shown when major-renovation-Yes is clicked)
      if (lastRemodelRenovationTwo) {
        if (majorRenovationYesChecked) {
          lastRemodelRenovationTwo.style.display = "block";
          updateRequiredFields(lastRemodelRenovationTwo, true);
        } else {
          lastRemodelRenovationTwo.style.display = "none";
          updateRequiredFields(lastRemodelRenovationTwo, false);
        }
      }
    }

    // Find and setup sibling radio buttons to hide fields when clicked
    // For Yes-Major radio (controls lastRemodelRenovationOne)
    if (yesMajorRadio) {
      const radioName = yesMajorRadio.getAttribute("name");
      if (radioName) {
        // Find all radio buttons in the same group
        const siblingRadios = document.querySelectorAll(
          `input[type="radio"][name="${radioName}"]`
        );

        siblingRadios.forEach((sibling) => {
          // Skip Yes-Major itself
          if (sibling !== yesMajorRadio) {
            // When any sibling is clicked, the browser automatically unchecks Yes-Major
            // So we just need to trigger the visibility update
            sibling.addEventListener("click", function () {
              // Use setTimeout to ensure the radio state is fully updated
              setTimeout(() => {
                updateRenovationVisibility();
              }, 0);
            });
            sibling.addEventListener("change", function () {
              updateRenovationVisibility();
            });
          }
        });
      }
    }

    // For major-renovation-Yes radio (controls lastRemodelRenovationTwo)
    if (majorRenovationYesRadio) {
      const radioName = majorRenovationYesRadio.getAttribute("name");
      if (radioName) {
        // Find all radio buttons in the same group
        const siblingRadios = document.querySelectorAll(
          `input[type="radio"][name="${radioName}"]`
        );

        siblingRadios.forEach((sibling) => {
          // Skip major-renovation-Yes itself
          if (sibling !== majorRenovationYesRadio) {
            // When any sibling is clicked, the browser automatically unchecks major-renovation-Yes
            // So we just need to trigger the visibility update
            sibling.addEventListener("click", function () {
              // Use setTimeout to ensure the radio state is fully updated
              setTimeout(() => {
                updateRenovationVisibility();
              }, 0);
            });
            sibling.addEventListener("change", function () {
              updateRenovationVisibility();
            });
          }
        });
      }
    }

    // Listen for clicks/changes on both radios
    if (yesMajorRadio) {
      yesMajorRadio.addEventListener("click", updateRenovationVisibility);
      yesMajorRadio.addEventListener("change", updateRenovationVisibility);
    }
    if (majorRenovationYesRadio) {
      majorRenovationYesRadio.addEventListener(
        "click",
        updateRenovationVisibility
      );
      majorRenovationYesRadio.addEventListener(
        "change",
        updateRenovationVisibility
      );
    }

    // Run once immediately (in case one was pre-selected on page load)
    updateRenovationVisibility();
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
    if (radioNo) {
      radioNo.addEventListener("click", updateFleasVisibility);
      radioNo.addEventListener("change", updateFleasVisibility);
    }
    if (radioYes) {
      radioYes.addEventListener("click", updateFleasVisibility);
      radioYes.addEventListener("change", updateFleasVisibility);
    }

    // Setup radio button styles
    setupRadioButtonStyles(radioNo, radioYes);

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
          const naChecked = pestsNACheckbox && pestsNACheckbox.checked;

          // Only require selection if N/A is not checked
          if (!naChecked && !noChecked && !yesChecked) {
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
          const naChecked = pestsNACheckbox && pestsNACheckbox.checked;

          // Only require selection if N/A is not checked
          if (!naChecked && !noChecked && !yesChecked) {
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
    updateFleasVisibility();

    // Handle N/A checkbox: uncheck and disable siblings, and remove required from radios
    if (pestsNACheckbox) {
      function updatePestsNASiblings() {
        const isChecked = pestsNACheckbox.checked;

        // Handle radio button required attributes
        if (isChecked) {
          // Remove required when N/A is checked
          if (radioNo) radioNo.removeAttribute("required");
          if (radioYes) radioYes.removeAttribute("required");
          // Uncheck radio buttons
          if (radioNo && radioNo.checked) radioNo.checked = false;
          if (radioYes && radioYes.checked) radioYes.checked = false;
          // Update fleas visibility
          updateFleasVisibility();
        } else {
          // Add required back when N/A is unchecked
          if (radioNo) radioNo.setAttribute("required", "required");
          if (radioYes) radioYes.setAttribute("required", "required");
        }

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
            // Uncheck all checkboxes within this sibling
            const checkboxes = sibling.querySelectorAll(
              'input[type="checkbox"]'
            );
            checkboxes.forEach((checkbox) => {
              if (checkbox.checked) {
                checkbox.checked = false;
                // Trigger change event in case there's custom form logic
                checkbox.dispatchEvent(new Event("change", { bubbles: true }));
                checkbox.dispatchEvent(new Event("input", { bubbles: true }));
              }
            });
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
    // Do you feel sick radio buttons
    const radioNo = document.getElementById(
      "health-symptoms-do-you-feel-sick-no"
    );
    const radioYes = document.getElementById(
      "health-symptoms-do-you-feel-sick-yes"
    );

    // Setup radio button styles
    if (radioNo && radioYes) {
      setupRadioButtonStyles(radioNo, radioYes);
    }

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

  // ============================================
  // Type of Walls - Cladding Other Logic
  // ============================================
  (function initCladdingOtherLogic() {
    const claddingOtherCheckbox = document.getElementById(
      "General-Home-Information----Type-of-Walls----Cladding-Other"
    );
    const claddingOtherField = document.getElementById(
      "exterior-wall-cladding-other"
    );

    // Hide cladding-other-field by default
    if (claddingOtherField) claddingOtherField.style.display = "none";

    // Helper function to update required attributes for a field
    function updateRequiredField(field, isRequired) {
      if (!field) return;
      if (isRequired) {
        field.setAttribute("required", "required");
      } else {
        field.removeAttribute("required");
      }
    }

    function updateCladdingOtherVisibility() {
      if (!claddingOtherCheckbox || !claddingOtherField) return;

      const isChecked = claddingOtherCheckbox.checked;

      if (isChecked) {
        // Show the field and make it required
        claddingOtherField.style.display = "block";
        updateRequiredField(claddingOtherField, true);
      } else {
        // Hide the field and remove required
        claddingOtherField.style.display = "none";
        updateRequiredField(claddingOtherField, false);
      }
    }

    // Listen for clicks/changes on the checkbox
    if (claddingOtherCheckbox) {
      claddingOtherCheckbox.addEventListener(
        "click",
        updateCladdingOtherVisibility
      );
      claddingOtherCheckbox.addEventListener(
        "change",
        updateCladdingOtherVisibility
      );
    }

    // Run once immediately (in case it was pre-selected on page load)
    updateCladdingOtherVisibility();
  })();
});
