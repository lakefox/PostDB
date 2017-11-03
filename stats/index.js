function getPrices(cb) {
  fetch("https://api.cryptonator.com/api/ticker/xmr-usd").then((res) => {
    return res.json();
  }).then((data) => {
    cb(data.ticker.price);
  });
}
function getBal(name, cb) {
  fetch("http://cors-anywhere.herokuapp.com/https://api.coinhive.com/user/balance?secret=d84KMRMkZNc2Lq1ex4viQWozZlM0ffpi&name="+name).then((res) => {
    return res.json();
  }).then((data) => {
    cb(data.balance);
  });
}
function update(){
  getBal(window.location.hash.slice(1), (bal) => {
    getPrices((price) => {
      document.querySelector("#bal").innerHTML = "$"+(0.00016065*(bal/1000000))*price;
    });
  });
}
// As soon as possible load price
update();
