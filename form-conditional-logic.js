document.addEventListener("DOMContentLoaded", function () {
  console.log("[debug] DOMContentLoaded");

  // Targets to show/hide
  const rentOrOwn = document.getElementById("rent-or-own");
  const militaryHousing = document.getElementById("military-housing");
  console.log("[debug] rent-or-own element:", rentOrOwn);
  console.log("[debug] military-housing element:", militaryHousing);

  // Try to find radios by the IDs you gave.
  let radioNo = document.getElementById("Occupants----active-military---no");
  let radioYes = document.getElementById("Occupants----active-military---yes");

  // If not found, try some fallbacks (name or partial id match)
  if (!radioNo || !radioYes) {
    console.log(
      "[debug] One or both radios not found by ID — attempting fallbacks"
    );

    // fallback by name containing "active-military" (common pattern)
    const byName = document.querySelectorAll('input[type="radio"][name]');
    const matched = Array.from(byName).filter(
      (r) =>
        (r.id && r.id.includes("active-military")) ||
        (r.name && r.name.includes("active-military"))
    );

    console.log("[debug] radios matched by fallback:", matched);

    if (matched.length >= 2) {
      // Heuristic: choose first as "no" and second as "yes" if IDs missing
      radioNo = radioNo || matched[0];
      radioYes = radioYes || matched[1];
    }
  }

  console.log("[debug] radioNo:", radioNo);
  console.log("[debug] radioYes:", radioYes);

  // If the show/hide targets are missing, warn and stop
  if (!rentOrOwn || !militaryHousing) {
    console.warn(
      "[debug] Missing one of the target elements (#rent-or-own or #military-housing). Aborting UI toggles."
    );
    return;
  }

  // Ensure radios exist before binding
  if (!radioNo || !radioYes) {
    console.warn(
      "[debug] Radio buttons not found. Make sure IDs are correct or that they are present in the DOM."
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
      militaryHousing.style.display = "none";
      return;
    }

    if (radioYes.checked) {
      console.log("[debug] Showing military-housing, hiding rent-or-own");
      militaryHousing.style.display = "block";
      rentOrOwn.style.display = "none";
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
    // Uncheck the other radio since they're not in the same group
    if (radioYes.checked) {
      radioYes.checked = false;
    }
    // Use setTimeout to ensure checked state is updated after click
    setTimeout(() => updateVisibility(e.target), 0);
  });
  radioYes.addEventListener("click", function (e) {
    console.log("[debug] radioYes clicked");
    // Uncheck the other radio since they're not in the same group
    if (radioNo.checked) {
      radioNo.checked = false;
    }
    // Use setTimeout to ensure checked state is updated after click
    setTimeout(() => updateVisibility(e.target), 0);
  });

  // If you want to inspect the whole form area quickly:
  const formContent = document.querySelector(".score-form_form-content");
  console.log("[debug] .score-form_form-content element:", formContent);
});
