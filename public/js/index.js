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
