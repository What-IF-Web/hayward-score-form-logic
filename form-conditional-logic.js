document.addEventListener("DOMContentLoaded", function () {
  console.log("[debug] DOMContentLoaded");

  // Targets to show/hide
  const rentOrOwn = document.getElementById("rent-or-own");
  const militaryHousing = document.getElementById("military-housing");
  console.log("[debug] rent-or-own element:", rentOrOwn);
  console.log("[debug] military-housing element:", militaryHousing);

  // Try to find checkboxes by the IDs you gave.
  let checkboxNo = document.getElementById("Occupants----active-military---no");
  let checkboxYes = document.getElementById(
    "Occupants----active-military---yes"
  );

  // If not found, try some fallbacks (name or partial id match)
  if (!checkboxNo || !checkboxYes) {
    console.log(
      "[debug] One or both checkboxes not found by ID — attempting fallbacks"
    );

    // fallback by name containing "active-military" (common pattern)
    const byName = document.querySelectorAll('input[type="checkbox"][name]');
    const matched = Array.from(byName).filter(
      (c) =>
        (c.id && c.id.includes("active-military")) ||
        (c.name && c.name.includes("active-military"))
    );

    console.log("[debug] checkboxes matched by fallback:", matched);

    if (matched.length >= 2) {
      // Heuristic: choose first as "no" and second as "yes" if IDs missing
      checkboxNo = checkboxNo || matched[0];
      checkboxYes = checkboxYes || matched[1];
    }
  }

  console.log("[debug] checkboxNo:", checkboxNo);
  console.log("[debug] checkboxYes:", checkboxYes);

  // If the show/hide targets are missing, warn and stop
  if (!rentOrOwn || !militaryHousing) {
    console.warn(
      "[debug] Missing one of the target elements (#rent-or-own or #military-housing). Aborting UI toggles."
    );
    return;
  }

  // Ensure checkboxes exist before binding
  if (!checkboxNo || !checkboxYes) {
    console.warn(
      "[debug] Checkboxes not found. Make sure IDs are correct or that they are present in the DOM."
    );
    return;
  }

  // Hide both by default (use style.display so Webflow doesn't fight it)
  rentOrOwn.style.display = "none";
  militaryHousing.style.display = "none";
  console.log("[debug] Both sections hidden by default");

  function updateVisibility(trigger) {
    console.log(
      "[debug] updateVisibility fired. trigger:",
      trigger && (trigger.id || trigger.name)
    );
    console.log(
      "[debug] radioNo.checked:",
      radioNo.checked,
      "radioYes.checked:",
      radioYes.checked
    );

    if (radioNo.checked) {
      console.log("[debug] Showing rent-or-own, hiding military-housing");
      rentOrOwn.style.display = "block";
      rentOrOwn.style.visibility = "visible";
      rentOrOwn.style.opacity = "1";
      militaryHousing.style.display = "none";
      militaryHousing.style.visibility = "hidden";
      militaryHousing.style.opacity = "0";
      console.log(
        "[debug] rentOrOwn computed display:",
        window.getComputedStyle(rentOrOwn).display
      );
      console.log(
        "[debug] militaryHousing computed display:",
        window.getComputedStyle(militaryHousing).display
      );
      return;
    }

    if (radioYes.checked) {
      console.log("[debug] Showing military-housing, hiding rent-or-own");
      militaryHousing.style.display = "block";
      militaryHousing.style.visibility = "visible";
      militaryHousing.style.opacity = "1";
      rentOrOwn.style.display = "none";
      rentOrOwn.style.visibility = "hidden";
      rentOrOwn.style.opacity = "0";
      console.log(
        "[debug] rentOrOwn computed display:",
        window.getComputedStyle(rentOrOwn).display
      );
      console.log(
        "[debug] militaryHousing computed display:",
        window.getComputedStyle(militaryHousing).display
      );
      return;
    }

    // Neither checked (shouldn't happen with radios, but defensive)
    console.log("[debug] Neither radio checked — hiding both");
    rentOrOwn.style.display = "none";
    militaryHousing.style.display = "none";
  }

  // Bind listeners. Also bind to the parent container in case radios are dynamically inserted later.
  radioNo.addEventListener("change", function (e) {
    console.log("[debug] radioNo change event", e);
    updateVisibility(e.target);
  });

  radioYes.addEventListener("change", function (e) {
    console.log("[debug] radioYes change event", e);
    updateVisibility(e.target);
  });

  // Initial run in case one is preselected
  console.log("[debug] Running initial updateVisibility check");
  updateVisibility();

  // Extra: monitor clicks (sometimes Webflow wires custom widgets)
  // Since radios have different names, manually ensure mutual exclusivity
  radioNo.addEventListener("click", function (e) {
    console.log("[debug] radioNo clicked");
    // Explicitly check this radio and uncheck the other
    radioNo.checked = true;
    radioYes.checked = false;
    console.log(
      "[debug] After setting: radioNo.checked =",
      radioNo.checked,
      "radioYes.checked =",
      radioYes.checked
    );
    // Use setTimeout to ensure checked state is updated after click
    setTimeout(() => {
      console.log("[debug] In setTimeout: radioNo.checked =", radioNo.checked);
      updateVisibility(e.target);
      console.log(
        "[debug] rentOrOwn.style.display after update:",
        rentOrOwn.style.display
      );
      console.log(
        "[debug] militaryHousing.style.display after update:",
        militaryHousing.style.display
      );
    }, 10);
  });
  radioYes.addEventListener("click", function (e) {
    console.log("[debug] radioYes clicked");
    // Explicitly check this radio and uncheck the other
    radioYes.checked = true;
    radioNo.checked = false;
    console.log(
      "[debug] After setting: radioNo.checked =",
      radioNo.checked,
      "radioYes.checked =",
      radioYes.checked
    );
    // Use setTimeout to ensure checked state is updated after click
    setTimeout(() => {
      console.log(
        "[debug] In setTimeout: radioYes.checked =",
        radioYes.checked
      );
      updateVisibility(e.target);
      console.log(
        "[debug] rentOrOwn.style.display after update:",
        rentOrOwn.style.display
      );
      console.log(
        "[debug] militaryHousing.style.display after update:",
        militaryHousing.style.display
      );
    }, 10);
  });

  // If you want to inspect the whole form area quickly:
  const formContent = document.querySelector(".score-form_form-content");
  console.log("[debug] .score-form_form-content element:", formContent);
});
