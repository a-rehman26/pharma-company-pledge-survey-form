const photoArea = document.getElementById("photoArea");
const uploadInput = document.getElementById("uploadPhoto");
const downloadBtn = document.getElementById("downloadBtn");
const card = document.getElementById("pledgeCard");
let cropper;

// -------------------- PHOTO UPLOAD & CROP --------------------
uploadInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    const cropImage = document.getElementById("cropImage");
    const modalEl = document.getElementById("cropModal");
    const cropBtn = document.getElementById("cropBtn");
    cropImage.src = ev.target.result;

    if (cropper) cropper.destroy();

    const modal = new bootstrap.Modal(modalEl);
    modal.show();

    cropper = new Cropper(cropImage, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: "move",
      background: false,
      movable: true,
      zoomable: true,
      cropBoxResizable: true,
      ready() {
        cropper.setCropBoxData({ width: 250, height: 250 });
      },
    });

    const modalBody = modalEl.querySelector(".modal-body");
    const controlUI = document.createElement("div");
    controlUI.className = "extra-ui";
    controlUI.innerHTML = `
      <p style="margin-top:10px;font-size:13px;color:#555;">
        Drag karein ya scroll se zoom karein apni photo adjust karne ke liye.
      </p>
      <div style="margin-top:8px;">
        <button id="zoomIn" class="btn btn-sm btn-outline-primary me-2">Zoom +</button>
        <button id="zoomOut" class="btn btn-sm btn-outline-primary">Zoom −</button>
      </div>
      <div style="margin-top:10px;">
        <span style="font-size:12px;color:#777;">Preview:</span>
        <div id="cropPreview" style="width:100px;height:100px;overflow:hidden;border-radius:50%;margin:auto;border:2px solid #ccc;"></div>
      </div>
    `;
    modalBody.appendChild(controlUI);

    const previewBox = controlUI.querySelector("#cropPreview");
    cropImage.addEventListener("crop", () => {
      const canvas = cropper.getCroppedCanvas({ width: 100, height: 100 });
      if (canvas) {
        previewBox.innerHTML = "";
        previewBox.appendChild(canvas);
      }
    });

    controlUI.querySelector("#zoomIn").onclick = () => cropper.zoom(0.1);
    controlUI.querySelector("#zoomOut").onclick = () => cropper.zoom(-0.1);

    cropBtn.onclick = () => {
      const canvas = cropper.getCroppedCanvas({
        width: 400,
        height: 400,
        imageSmoothingQuality: "high",
      });
      if (!canvas) {
        Swal.fire({
          icon: "warning",
          title: "No Crop",
          text: "Please adjust your image before saving.",
        });
        return;
      }

      const croppedURL = canvas.toDataURL("image/jpeg", 1.0);
      photoArea.innerHTML = `<div class="upload-img-wrapper"><img src="${croppedURL}" alt="photo"></div>`;
      document.getElementById("croppedPhoto").value = croppedURL;
      bootstrap.Modal.getInstance(modalEl).hide();
      cropper.destroy();
      cropper = null;
      modalBody.querySelectorAll(".extra-ui").forEach((el) => el.remove());
    };
  };
  reader.readAsDataURL(file);
});

// -------------------- DOWNLOAD BUTTON --------------------
downloadBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const designation = document.getElementById("designation").value.trim();
  const pledge = document.getElementById("pledge").value;
  const croppedPhoto = document.getElementById("croppedPhoto")?.value;

  // validation
  if (!croppedPhoto || !name || !designation || !pledge) {
    Swal.fire({
      icon: "warning",
      title: "Incomplete Details",
      text: "Please upload your photo and fill all fields.",
    });
    return;
  }

  // ensure colors visible in jpeg
  document.getElementById("name").style.color = "#004aad";
  document.getElementById("designation").style.color = "#e60000";
  document.getElementById("pledge").style.color = "#000";

  // ✅ STEP 1: Show immediate success SweetAlert
  await Swal.fire({
    icon: "success",
    title: "Pledge Submitted!",
    text: "Preparing your pledge image...",
    showConfirmButton: false,
    timer: 2000, // show for 2 sec only
  });

  // ✅ STEP 2: Generate JPEG after SweetAlert disappears
  try {
    const canvas = await html2canvas(card, { scale: 2, useCORS: true, backgroundColor: "#fff" });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg", 1.0);
    link.download = "World_Diabetes_Day_Pledge.jpeg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // ✅ STEP 3: After 10 sec show final SweetAlert
    setTimeout(() => {
      Swal.fire({
        icon: "info",
        title: "Download Complete!",
        text: "Thank you for taking the pledge.",
        confirmButtonText: "OK",
      });
    }, 10000);

    // ✅ (Optional) Auto submit form after 2 sec
    setTimeout(() => {
      document.querySelector("form").submit();
    }, 2000);

  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Failed to create JPEG image.",
    });
  }
});

