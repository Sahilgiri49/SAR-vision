document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");
  const outputPreview = document.getElementById("outputPreview");
  const processImageBtn = document.getElementById("processImage");
  const darkModeToggle = document.getElementById("darkModeToggle");

  // Prevent form submission if inside form
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form submission from refreshing the page
    });
  }

  // Dark Mode handling (no changes needed here)
  const setDarkMode = (isDarkMode) => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    darkModeToggle.textContent = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
  };

  const savedDarkMode = localStorage.getItem("darkMode");
  if (savedDarkMode === "enabled") {
    setDarkMode(true);
  }

  darkModeToggle.addEventListener("click", () => {
    const isDarkMode = document.body.classList.contains("dark-mode");
    setDarkMode(!isDarkMode);
  });

  // Image Preview handling (no changes needed here)
  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.maxWidth = "100%";
        img.style.maxHeight = "300px";
        imagePreview.innerHTML = "";
        imagePreview.appendChild(img);
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.textContent = "Invalid file. Please upload an image.";
    }
  });

  // Process Image Button handling
  processImageBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default behavior (e.g., page reload)
    const file = imageInput.files[0];
    if (!file) {
      outputPreview.textContent = "Please upload a valid image first.";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      processImageBtn.disabled = true;
      processImageBtn.textContent = "Processing...";

      const response = await fetch("http://127.0.0.1:5000/process-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const colorizedImageUrl = data.output_url;

        const img = document.createElement("img");
        img.src = `http://127.0.0.1:5000${colorizedImageUrl}`;
        img.alt = "Colorized Image";
        img.style.maxWidth = "100%";
        img.style.maxHeight = "300px";

        outputPreview.innerHTML = "";
        outputPreview.appendChild(img);
      } else {
        outputPreview.textContent = "Error: Unable to process the image.";
      }
    } catch (err) {
      outputPreview.textContent = "An error occurred while processing the image.";
    } finally {
      processImageBtn.disabled = false;
      processImageBtn.textContent = "Process Image";
    }
  });
});
