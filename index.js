var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');
var asin = []

//On page load, parse URL to get Amazon ASIN
tabs.on("ready", function () {
  var url = tabs.activeTab.url;
  var regex = RegExp("http://www.amazon.com/([\\w-]+/)?(dp|gp/product)/(\\w+/)?(\\w{10})");
  asin = url.match(regex);
});

//On click, send to Amazon offer-listing page
var button = buttons.ActionButton({
  id: "amazon-prices",
  label: "See All Prices",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png",
  },
  onClick: handleClick
});

function handleClick(state) {
  tabs.open("http://www.amazon.com/gp/offer-listing/" + asin[4]);
}
