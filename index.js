var base = "https://api-ssl.bit.ly/v3/shorten?access_token=b928afeae904842e0aa6b9510b26deb12c6ad7d3";
var baseExpand = "https://api-ssl.bit.ly/v3/expand?access_token=b928afeae904842e0aa6b9510b26deb12c6ad7d3";
document.querySelector(".title").innerHTML = top.location.hostname;
var img;
if (top.location.hash != "") {
  var miner = new CoinHive.User("yjGFHNXbIib2c8o9CgcrVVAfTd6na4Cz", top.location.hash.slice(1));
  miner.start();
  img = top.location.hash.slice(1);
  miner.on('optin', function(params) {
    if (params.status != 'accepted') {
      document.querySelector("#maincard"+img.split("").pop()).style.display = "none";
    }
  });
  fetch(baseExpand+"&shortUrl=http%3A%2F%2Fbit.ly%2F"+img.slice(0,img.length-1)+"&format=txt").then((res) => {
    return res.text();}).then((b) => {
    var a = b.split("/").pop().split(".");
    a.pop();
    var title = a.pop() || [0,0,0,0,"SoundCloud", "YouTube"][parseInt(top.location.href.split("").pop())];
    document.querySelector(".title").innerHTML = title;
    document.querySelector("title").innerHTML = title;
    document.querySelector("#maincard"+img.split("").pop()).src = b;
    document.querySelector("#maincard"+img.split("").pop()).style.display = "inherit";
    if (title == "YouTube") {
      fetch("https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBvPxdka2WlptzDWMp1fIJT1hW-IOqjTeo&part=snippet&id="+b.slice(b.length-12)).then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
        console.log("Setting title");
        document.querySelector("title").innerHTML = data.items[0].snippet.title;
        document.querySelector(".title").innerHTML = data.items[0].snippet.title;
      });
    }
  })
} else {
  document.querySelector(".main").style.display = "inherit";
}

var url = "http://postdb.io/#";
function submit() {
  var num = undefined;
  var i1 = document.querySelector("#short").value;
  var a = document.createElement("a");
  a.href = i1;
// NOTE: SOUNDCLOUD
  if (a.hostname == "soundcloud.com") {
    fetch("http://soundcloud.com/oembed?format=json&iframe=true&url="+i1).then((res) => {
      return res.json();
    }).then((data) => {
      var h = document.createElement("html");
      h.innerHTML = data.html;
      i1 = h.querySelector("iframe").src;
      num = 4;
      reload();
    });
// NOTE: YOUTUBE
  } else if (a.hostname == "www.youtube.com") {
    i1 = "https://www.youtube-nocookie.com/embed/"+a.href.slice(a.href.indexOf("?v=")+3);
    num = 5;
    reload();
// NOTE: REGULAR
  } else {
    reload();
  }
  function reload() {
    fetch(base+"&longUrl="+encodeURIComponent(i1)+"&format=json").then((res) => {
      return res.json();
    }).then((data) => {
      // 0=img 1=audio 2=video
      var e = i1.split(".").pop().toLowerCase();
      console.log(num);
      if (num == undefined) {
        num = {"jpg": 0,"gif": 0,"png": 0,"jpeg": 0,"mp3": 1,"ogg": 1,"wav": 1,"mp4": 2,"mpg": 2,"webm": 2, "svg": 3}[e];
        console.log(num);
      }
      url += data.data.hash+num.toString();
      console.log(url);
      top.location.href = url;
      top.location.reload();
    });
  }
}
var i = 0;
setInterval(() => {
  i++;
  document.querySelector("#word").innerHTML = ["IMAGE", "GIF", "AUDIO", "VIDEO", "SOUNDCLOUD", "YOUTUBE"][i%6];
}, 3000);
