var Twit = require("twit");
var fetch = require('node-fetch');

var T = new Twit({
  consumer_secret: "YHQNZCwstfYXZFtksmP9yidDBEp3aTMZX47JOw0Q4OCE75PmJD",
  consumer_key: "Iu4VcvOwbcb7HWN1nNs7JBin6",
  access_token: "919317965190737920-ckHrC1raRAmAFx74k6JcEZB7naaIqYU",
  access_token_secret: "cSBaLjDc8rlGxHwxQ4ZsbRFoxe5sqLOTyY9DsMPh81Wpm"
});
var postedUrls = [];
setInterval(post, (1000*60*10));
function post() {
  fetch("https://www.reddit.com/r/Art/top.json").then((resp) => {
    console.log("1");
    return resp.json();
  }).then((data) => {
    console.log("2");
    var i = 0;
    var notFound = true;
    var posts = data.data.children;
    var url,title;
    while (notFound) {
      i++;
      var post = posts[i].data;
      title = post.title;
      switch (post.post_hint) {
				case "image":
						if (post.url) {
							url = post.url;
						}
						break;
				case "rich:video":
						if (post.url.indexOf("https://gfycat.com/") != -1) {
							url ="https://giant."+post.url.slice(8)+".gif";
						}
						break;
				default: ;
			}
      if (url) {
        if (postedUrls.indexOf(url) == -1) {
          notFound = false;
        }
      }
    }
    postedUrls.push(url);
    console.log(title,"\n",url);
    return [title, url];
  }).then((data) => {
    var title = data[0];
    var url = "http://postdb.io/#";
    fetch("http://api.bit.ly/v3/shorten?login=o_5qog1opc6f&apiKey=R_d8a21a8680b4409eb00add64f3fb9d4c&longUrl="+data[1]+"&format=json").then((res) => {
      return res.json();
    }).then((data) => {
      url += data.data.hash;
      T.post('statuses/update', { status: title+"\n"+url }, function(err, data, response) {
        if (!err) {
          console.log("Tweeted");
        } else {
          console.log(err);
        }
      });
    });
  });
}
console.log("Started");
post();
