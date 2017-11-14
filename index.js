(() => {
  var last = window.scrollY;
  var direction = true;
  document.addEventListener("scroll",(e) => {
    if (window.scrollY < last) {
      direction = false;
    } else {
      direction = true;
    }
    last = window.scrollY;
    var s = window.scrollY%window.innerHeight;
    if (s+70 > window.innerHeight && direction) {
      var to = (Math.floor(window.scrollY/window.innerHeight)*window.innerHeight)+window.innerHeight;
      window.scrollTo(0,to);
    }
  });
})()
function media(e) {
  var action = e.innerHTML.trim();
  var movies = document.querySelector(".movies");
  var show = document.querySelector(".show");
  if (action == "NEXT" && show.nextElementSibling) {
    show.nextElementSibling.setAttribute("class", "movie show");
    show.setAttribute("class", "movie");
  } else if (action == "PREV" && show.previousElementSibling) {
    show.previousElementSibling.setAttribute("class", "movie show");
    show.setAttribute("class", "movie");
  } else if (action == "PLAY") {
    document.querySelector(".show").querySelector("a").click();
  }
}
