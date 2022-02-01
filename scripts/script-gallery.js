// GALLERY PAGE
const createLightbox = function () {
  const lightboxes = document.querySelectorAll("[data-lightbox]");
  console.log(lightboxes);
  if (!!lightboxes[0]) {
    const stopWidth = 640;
    const stopHeight = 320;
    const PADDING_FOR_BUTTON = 180;
    let modal, modalImage;
    /* Add the showModal Event to each element with the [data-lightbox] attribute. */
    for (const lightbox of lightboxes) {
      lightbox.addEventListener("click", showModal);
    }
    /* Resize Event */
    window.addEventListener("resize", resizeLightbox);

    function showModal() {
      // Called from lightbox eventListenter: this = lightbox.
      let windowHeight = window.innerHeight;
      let windowWidth = window.innerWidth;
      if (windowWidth < stopWidth || windowHeight < stopHeight) return;
      /* modal will not exist until an image is selected. The modal will stay in the DOM until the vh is < 320px (stopHeight) or until the vw < 640px (stopWidth). 
      It is not common for users to constantly resize the window, but it is common enough to plan for.
      */
      createModal(!!modal);
      showLightBox(this);
    }
    const showLightBox = (selectedImage) => {
      modal.style.display = "flex";
      const img = document.createElement("img");
      img.src = "../gallery-img/" + selectedImage.dataset.originalSize;
      img.style.cursor = "initial";
      img.style.maxWidth = "670px";
      img.style.height = "auto";
      img.style.padding = "20px";
      setImageWidth(img);
      modal.appendChild(img);
    };
    function resizeLightbox() {
      if (!modalImage) return;
      if (window.innerWidth < stopWidth || window.innerHeight < stopHeight) {
        modal.remove();
        /* The line below will set the modal and the modalImage variables to undefined. */
        modal = modalImage = undefined;
      } else {
        setImageWidth(modalImage);
      }
    }
    function createModal(createModalBoolean) {
      if (!!createModalBoolean) return;
      const closeBtn = document.createElement("div");
      closeBtn.innerText = `X`;
      closeBtn.style.alignItems = "center";
      closeBtn.style.color = "#fff";
      closeBtn.style.display = "flex";
      closeBtn.style.fontFaimly = "monospace";
      closeBtn.style.fontSize = "30px";
      closeBtn.style.height = "50px";
      closeBtn.style.justifyContent = "center";
      closeBtn.style.pointerEvents = "none";
      closeBtn.style.position = "absolute";
      closeBtn.style.right = "20px";
      closeBtn.style.top = "20px";
      closeBtn.style.width = "50px";
      closeBtn.style.cursor = "pointer";
      modal = document.createElement("div");
      modal.classList.add("modal");
      modal.style.alignItems = "center";
      modal.style.background = "rgba(0, 0, 0, 0.85)";
      modal.style.cursor = "pointer";
      modal.style.height = "100%";
      modal.style.justifyContent = "center";
      modal.style.left = "0";
      modal.style.padding = `0px ${PADDING_FOR_BUTTON / 2}px`;
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.width = "100%";
      modal.appendChild(closeBtn);
      document.body.appendChild(modal);
      hideModalEvent(modal);
      // hideModalEvent(closeBtn); //not needed pointerEvent set to none
    }
    function setImageWidth(img) {
      let aspectRatio = img.height / img.width;
      //   LBImageWidth = is landscape ? landscapeWidth : portraitWidth;
      let LBImageWidth =
        aspectRatio > 1
          ? window.innerHeight * aspectRatio - 100
          : window.innerHeight * aspectRatio - 40;
      /* I am not happy with the line above but it works. */
      img.style.width = `${LBImageWidth}px`;
    }
    function hideModalEvent(element) {
      element.addEventListener("click", function (e) {
        /* If the element clicked is not the black background nothing will happen; the function will return. */
        if (e.target !== e.currentTarget) return;
        /* Consider the code below this line the else. */
        element.querySelector("img").remove();
        element.style.display = "none";
      });
    }
  }
};

createLightbox();
