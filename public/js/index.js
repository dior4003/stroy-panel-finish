// const forms = document.querySelector("#myForm");
// forms.addEventListener("submit", (e) => {
//   e.preventDefault();
//   e.stopPropagation();
//   console.log(e);
//   let name = forms.querySelector("[name]"),
//     email = forms.querySelector("[email]"),
//     msg = forms.querySelector("[message]"),
//     succes = forms.querySelector(".u-form-send-success"),
//     error = s.querySelector(".u-form-send-error");
//   console.log(name.value);
// });
// window.addEventListener("DOMContentLoaded", (e) => {

//  });
// --- Released as KarmaWare by Pete Rai - http://pete.rai.org.uk/

// --- various fiddle bit - have a play

const OVERLAP = 0.25; // of width
const ROTATION = 45; // degrees
const DELAY = 250; // milliseconds - for various animations
const SCALE = 1.7; // for when card flips to back
const SWIPE = 75; // pixels - min swipe length

// --- globals

var content = [...document.querySelectorAll("div.content")];
var index = Math.floor(content.length / 2);

// --- flips an item over

function action_flip(show) {
  let current = content[index];
  let shown = current.classList.contains("selected");
  let change = false;

  if (show && !shown) {
    change = true;
    current.classList.add("selected");
    current.style.transform = `rotateY(180deg) rotateZ(90deg) scale(${SCALE})`;
  } else if (shown && !show) {
    change = true;
    current.style.transform = "rotateY(0deg)";
    setTimeout(() => {
      current.classList.remove("selected");
    }, DELAY);
  }

  return change;
}

// --- move to previous item

function action_prev() {
  if (index) {
    index--;
    action_flow();
  }
}

// --- move to next item

function action_next() {
  if (content.length > index + 1) {
    index++;
    action_flow();
  }
}

// --- jump to specified item

function action_goto(i) {
  if (index !== i) {
    index = i;
    action_flow();
  }
}

// --- reflow the items

function action_flow() {
  content.forEach((c, i) => {
    let transform = "";
    let zindex = "";
    let offset = c.clientWidth * OVERLAP;

    if (i < index) {
      transform = `translateX(-${
        offset * (index - i)
      }%) rotateY(${ROTATION}deg)`;
      zindex = i;
    } else if (i === index) {
      transform = "rotateY(0deg) translateZ(140px)";
      zindex = content.length;
    } /* if (i > index) */ else {
      transform = `translateX(${
        offset * (i - index)
      }%) rotateY(-${ROTATION}deg)`;
      zindex = content.length - i;
    }

    c.style.transform = transform;
    c.style.zIndex = zindex;
    c.classList.remove("current");
  });

  setTimeout(() => {
    content[index].classList.add("current");
  }, DELAY);
}

// --- state management

function state(event, context) {
  if (event === "left") {
    action_flip(false) || action_prev();
  } else if (event === "right") {
    action_flip(false) || action_next();
  } else if (event === "select") {
    context === index
      ? action_flip(true)
      : action_flip(false) || action_goto(context);
  } else if (event === "submit") {
    action_flip(true);
  } else if (event === "dismiss") {
    action_flip(false);
  } else {
    // do nothing here
  }
}

// --- event management

function events() {
  document.addEventListener("keydown", (event) => {
    const EVENTS = {
      ArrowLeft: "left",
      ArrowRight: "right",
      Enter: "submit",
      Backspace: "dismiss",
      Escape: "dismiss",
    };

    state(EVENTS[event.key]);
  });

  document.addEventListener("mouseup", (event) => {
    if (event.target.classList.contains("coverflow")) state("dismiss");
  });

  let touched = 0;

  document.addEventListener("touchstart", (event) => {
    touched = event.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (event) => {
    let moved = touched - event.changedTouches[0].screenX;
    if (moved < 0 && Math.abs(moved) > SWIPE) state("left");
    if (moved > 0 && Math.abs(moved) > SWIPE) state("right");
  });

  addEventListener("resize", (event) => {
    action_flow();
  });
}

// --- initialisation

function init() {
  content.forEach((c, i) => {
    c.onclick = () => {
      state("select", i);
    };
    c.style.zIndex = index === i ? 1 : 0;
  });

  setTimeout(() => {
    action_flow();
  }, DELAY);
  events();
}

init();

setTimeout(() => {
  document.querySelector("#loaders").classList.add("none");
  console.log(document.querySelector("#loaders"));
}, 3000);
document.querySelector(".admin_icon").addEventListener("click", (e) => {
  document.querySelector(".list_item").classList.toggle("none");
  e.stopImmediatePropagation();
  // console.log("ddddd");
});
document.querySelector(".list_item").addEventListener("click", (e) => {
  e.stopPropagation();
});
window.addEventListener("click", (e) => {
  if (document.querySelector(".list_item").classList[1] === undefined) {
    document.querySelector(".list_item").classList.add("none");
  }

  console.log("1");
});
function clock() {
  // We create a new Date object and assign it to a variable called "time".
  var time = new Date(),
    // Access the "getHours" method on the Date object with the dot accessor.
    hours = time.getHours(),
    // Access the "getMinutes" method with the dot accessor.
    minutes = time.getMinutes(),
    seconds = time.getSeconds();

  document.querySelector(".clock").textContent =
    harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);

  function harold(standIn) {
    if (standIn < 10) {
      standIn = "0" + standIn;
    }
    return standIn;
  }
}
setInterval(clock, 1000);
const imgInp = document.querySelector("#imgInp");
const blah = document.querySelector("#blah");
blah.style.dislay = "none";
imgInp.onchange = (evt) => {
  const [file] = imgInp.files;
  if (file) {
    blah.style.dislay = "block";

    blah.src = URL.createObjectURL(file);
  }
};

// $(document).ready(function() {
//   $(".owl-carousel").owlCarousel({
//     loop: true,
//     items: 3,
//     responsive: {
//       0: {
//         items: 1,
//         mouseDrag: true,
//         touchDrag: true,
//       },
//       800: {
//         items: 2,
//         mouseDrag: true,
//         touchDrag: true,
//       },
//       1200: {
//         items: 3,
//         mouseDrag: true,
//         touchDrag: true,
//       },
//     },
//   });
// });

$(function () {
  /* Settings */
  var rotateSlider = {
    slideHeight: 360,
    slideWidth: 480,
  };

  /* Do Math and set properties */
  rotateSlider.slideCount = $(".rotate-slider .slides li").length;
  rotateSlider.slideAngle = 360 / $(".rotate-slider .slides li").length;
  rotateSlider.sliderElement = $(".rotate-slider");
  rotateSlider.slides = $(".rotate-slider .slides li");
  rotateSlider.slidesContainer = $(".rotate-slider .slides");
  rotateSlider.slideAngle = 360 / rotateSlider.slideCount;
  rotateSlider.halfAngleRad = ((rotateSlider.slideAngle / 2) * Math.PI) / 180;
  rotateSlider.innerRadius =
    ((1 / Math.tan(rotateSlider.halfAngleRad)) * rotateSlider.slideWidth) / 2;
  rotateSlider.outerRadius = Math.sqrt(
    Math.pow(rotateSlider.innerRadius + rotateSlider.slideHeight, 2) +
      Math.pow(rotateSlider.slideWidth / 2, 2)
  );
  rotateSlider.upperArcHeight =
    rotateSlider.outerRadius -
    (rotateSlider.innerRadius + rotateSlider.slideHeight);
  rotateSlider.lowerArcHeight =
    rotateSlider.innerRadius -
    rotateSlider.innerRadius * Math.cos(rotateSlider.halfAngleRad);
  rotateSlider.slideFullWidth =
    Math.sin(rotateSlider.halfAngleRad) * rotateSlider.outerRadius * 2;
  rotateSlider.slideFullHeight =
    rotateSlider.upperArcHeight +
    rotateSlider.slideHeight +
    rotateSlider.lowerArcHeight;
  rotateSlider.slideSidePadding =
    (rotateSlider.slideFullWidth - rotateSlider.slideWidth) / 2;
  rotateSlider.fullArcHeight =
    rotateSlider.outerRadius -
    rotateSlider.outerRadius * Math.cos(rotateSlider.halfAngleRad);
  rotateSlider.lowerArcOffset =
    (rotateSlider.slideFullWidth -
      Math.sin(rotateSlider.halfAngleRad) * rotateSlider.innerRadius * 2) /
    2;

  /* Set height and width of slider element */
  rotateSlider.sliderElement.css("height", rotateSlider.slideHeight + "px");
  rotateSlider.sliderElement.css("width", rotateSlider.slideWidth + "px");

  /* Set height and width of slides container and offset width*/
  rotateSlider.slidesContainer.css(
    "height",
    rotateSlider.outerRadius * 2 + "px"
  );
  rotateSlider.slidesContainer.css(
    "width",
    rotateSlider.outerRadius * 2 + "px"
  );

  /* Offset width and arc height */
  rotateSlider.slidesContainer.css("transform", "translateX(-50%)");
  rotateSlider.slidesContainer.css(
    "top",
    "-" + rotateSlider.upperArcHeight + "px"
  );

  /* Generate path for slide clipping */
  var pathCoords = "M 0 " + rotateSlider.fullArcHeight;
  pathCoords +=
    " A " +
    rotateSlider.outerRadius +
    " " +
    rotateSlider.outerRadius +
    " 0 0 1 " +
    rotateSlider.slideFullWidth +
    " " +
    rotateSlider.fullArcHeight;
  pathCoords +=
    " L " +
    (rotateSlider.slideFullWidth - rotateSlider.lowerArcOffset) +
    " " +
    rotateSlider.slideFullHeight;
  pathCoords +=
    " A " +
    rotateSlider.innerRadius +
    " " +
    rotateSlider.innerRadius +
    " 0 0 0 " +
    rotateSlider.lowerArcOffset +
    " " +
    rotateSlider.slideFullHeight +
    " Z";
  $("#slideClip").find("path").attr("d", pathCoords);

  /* Apply styles to each slide */
  var i = 0;
  rotateSlider.slides.each(function () {
    /* Set distance from point of rotation */
    $(this).css(
      "transform-origin",
      "center " + (rotateSlider.innerRadius + rotateSlider.slideHeight) + "px"
    );

    /* Set slide Height and Width */
    $(this).css("height", rotateSlider.slideHeight + "px");
    $(this).css("width", rotateSlider.slideWidth + "px");

    /* Set calculated padding for width, upper arc height, and lower arc height */
    $(this).css(
      "padding",
      rotateSlider.upperArcHeight +
        "px " +
        rotateSlider.slideSidePadding +
        "px " +
        rotateSlider.lowerArcHeight +
        "px " +
        rotateSlider.slideSidePadding +
        "px "
    );

    /* Offset container Arc Height */
    $(this).css("top", rotateSlider.upperArcHeight + "px");

    /* Offset Width, then Rotate Slide, then offset individual Top Arcs  */
    $(this).css(
      "transform",
      "translateX(-50%) rotate(" +
        rotateSlider.slideAngle * i +
        "deg) translateY(-" +
        rotateSlider.upperArcHeight +
        "px)"
    );

    /* Add clipping path  */
    $(this).css("-webkit-clip-path", "url(#slideClip)");
    $(this).css("clip-path", "url(#slideClip)");

    i++;
  });

  /* Set Interval to rotate */
  var currentRotation = 0;
  var rotateInterval = window.setInterval(function () {
    if (!rotateSlider.slidesContainer.hasClass("animate")) {
      rotateSlider.slidesContainer.addClass("animate");
    }
    currentRotation = currentRotation - rotateSlider.slideAngle;
    rotateSlider.slidesContainer.css(
      "transform",
      "translateX(-50%) rotate(" + currentRotation + "deg)"
    );
  }, 4000);
});
