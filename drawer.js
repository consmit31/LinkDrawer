document.addEventListener("DOMContentLoaded", () => {
  const linkInput = document.getElementById("linkInput");
  const saveButton = document.getElementById("saveButton");
  const dropdown = document.getElementById("dropdown");

  // Load saved links on startup
  browser.storage.local.get("links").then((data) => {
    const links = data.links || [];
    links.forEach((link) => addOptionToDropdown(link));
  });

  // Save the entered link
  saveButton.addEventListener("click", () => {
    const link = linkInput.value.trim();
    if (link) {
      browser.storage.local.get("links").then((data) => {
        const links = data.links || [];
        links.push(link);
        browser.storage.local.set({ links }).then(() => {
          addOptionToDropdown(link);
          linkInput.value = ""; // Clear input
        });
      });
    }
  });

  // Add an option to the dropdown
  function addOptionToDropdown(link) {
    const option = document.createElement("option");
    option.textContent = link;
    dropdown.appendChild(option);
  }
});
