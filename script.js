window.addEventListener("load", function (e) {
  history.pushState("", "", window.location.pathname);

  const logo = document.querySelectorAll("#logo path");

  //Find the length of each stroke
  for (let i = 0; i < logo.length; i++) {
    // console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
  }

  //Loader
  const loader = document.querySelector(".preloader");

  loader.style.overflow = "hidden";

  setTimeout(function () {
    loader.style.display = "none";
    document.querySelector("body").style.overflow = "unset";
  }, 4000);

  // window.stop()

  // hamburger menu
  const hamburger = document.querySelector("#check");
  const menu = document.querySelector(".mob-menu");
  const blur = document.querySelector(".bg-blur");

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
  

  //GSAP ANIMATION

  let tl = new TimelineMax({ onUpdate: updatePercentage });
  const controller = new ScrollMagic.Controller();

  const blueDesign = document.querySelector(".bl-design");
  const message = document.querySelector(".message-container");

  const introText = message.innerText;

  message.innerText = "";

  const splitIntro = introText.split(" ");

  splitIntro.forEach((word) => {
    const div = document.createElement("div");
    div.innerHTML = word + "&nbsp;";
    message.appendChild(div);
    div.style.fontSize = "50px";
  });


  const smth = document.querySelectorAll(".message-container div");

  tl.staggerTo(
    smth,
    0.5,
    {
      x: 100,
      y: 300,
      opacity: 0,
    },
    -0.1
  );

  const scene = new ScrollMagic.Scene({
    triggerElement: "#showcase",
    triggerHook: "onLeave",
    duration: "100%",
  })
    .setTween(tl)
    .addTo(controller);

  function updatePercentage() {
    tl.progress();
  }

  //move on mouse gradient-container
  const gradientAnimation = document.querySelector(".gradient-animation");
  const gradientContainer = document.querySelector(".gradient-container");
  const contactFlex = document.querySelector(".contact-flex");
  // console.log(contactFlex.offsetWidth);
  // contactFlex.addEventListener("mousemove", parallax);
  //  function parallax(event) {
  //    let mouseX = 0;
  //    let mouseY = 0;
  //    let targetX = 0;
  //    let targetY = 0;
  //    const windowX = contactFlex.offsetWidth / 2;
  //    const windowY = contactFlex.offsetHeight / 2;

  //      mouseX = event.clientX - windowX;
  //      mouseY = event.clientY - windowY;
  //     TweenMax.to(gradientAnimation, 1, {
  //       css: {
  //         transform:
  //           "translateX(" + mouseX + "px) translateY(" + mouseY  + "px)",
  //         transformStyle: "preserve-3d"
  //       },
  //       ease: Expo.easeOut,
  //     });
  //  }

  // (function ($) {
  //   "use strict";




  // FORM VALIDATION

  //   /*==================================================================
  //     [ Validate after type ]*/
  $(".validate-input .input100").each(function () {
    $(this).on("blur", function () {
      if (validate(this) == false) {
        showValidate(this);
      } else {
        $(this).parent().addClass("true-validate");
      }
    });
  });

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $(".validate-form").on("submit", function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
      $(this).parent().removeClass("true-validate");
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");

    $(thisAlert).append(
      '<span class="btn-hide-validate"><i class="fas fa-times"></i></span>'
    );
    $(".btn-hide-validate").each(function () {
      $(this).on("click", function () {
        hideValidate(this);
      });
    });
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass("alert-validate");
    $(thisAlert).find(".btn-hide-validate").remove();
  }

  $("#desktop-item-contact").on("click", (event) => {
    event.preventDefault();
    document.getElementById("contact").scrollIntoView(true);
  });

  menu.querySelectorAll("a").forEach((element) => {
    element.addEventListener("click", function (e) {
      // e.preventDefault();
      hamburger.checked = false;
      menu.classList.remove("open");
      blur.classList.remove("blur");

      if ($(this).data("is-contact")) {
        document.getElementById("contact").scrollIntoView(true);
      }
    });
  });

  // $(menu)
  //   .find("a")
  //   .on("click", (event) => {
  //     console.log("here");
  //     event.preventDefault();
  //     hamburger.checked = false;
  //     menu.classList.remove("open");
  //     blur.classList.remove("blur");
  //     console.log($(this).data());
  //     if ($(this).data("is-contact")) {
  //       document.getElementById("contact").scrollIntoView(true);
  //     }
  //   });
  // })(jQuery);
});
