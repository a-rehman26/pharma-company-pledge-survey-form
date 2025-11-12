const photoArea = document.getElementById("photoArea");
const uploadInput = document.getElementById("uploadPhoto");
const downloadBtn = document.getElementById("downloadBtn");
const card = document.getElementById("pledgeCard");
const quoteBox = document.getElementById("quoteBox");

// 📸 Upload logic
function setupUploadListener(inputElement) {
    inputElement.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            photoArea.innerHTML = `
        <div class="upload-img-wrapper">
          <img src="${ev.target.result}" alt="photo">
        </div>
        <input type="file" id="uploadPhoto" accept="image/*"
          style="opacity:0;position:absolute;inset:0;cursor:pointer;">
      `;
            setupUploadListener(photoArea.querySelector("#uploadPhoto"));
        };
        reader.readAsDataURL(file);
    });
}
setupUploadListener(uploadInput);

// 💾 Download logic
downloadBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const designation = document.getElementById("designation").value.trim();
    const pledge = document.getElementById("pledge").value;

    if (!name || !designation || !pledge) {
        Swal.fire({
            icon: "warning",
            title: "Incomplete Details",
            text: "Please fill all fields before downloading.",
        });
        return;
    }

    const preview = document.createElement("div");
    preview.classList.add("final-preview");
    preview.style.fontFamily = "'Poppins', sans-serif";
    preview.innerHTML = `
  <p class="name" style="margin:0;font-size:20px;color:#004aad;font-weight:700;">${name}</p>
  <p class="designation" style="margin:4px 0 10px 0;font-size:15px;color:#e60000;font-weight:600;">${designation}</p>
  <p class="pledge" style="margin:0;font-size:16px;color:#000;">I pledge to ${pledge}</p>
`;
    quoteBox.replaceWith(preview);

    Swal.fire({
        icon: "success",
        title: "Pledge Submitted!",
        text: "Your pledge has been recorded successfully.",
        showConfirmButton: false,
        timer: 1200,
    });

    // ✅ Enlarge circle just before capture
    photoArea.classList.add("expanded");

    setTimeout(() => {
        html2canvas(card, {
            scale: window.devicePixelRatio, // use actual device scale
            useCORS: true,
            backgroundColor: "#ffffff",
            imageSmoothingEnabled: true,
            imageSmoothingQuality: "high",
        }).then((canvas) => {
            const link = document.createElement("a");
            link.download = "World_Diabetes_Day_Pledge.jpeg";
            link.href = canvas.toDataURL("image/jpeg", 1.0);
            link.click();
            window.location.reload(true);
        });
    }, 1300);
});
