var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');
var notifications = require("sdk/notifications");
var asin = []

//Button definitions
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

//On click, parse URL to find Amazon ASIN (Product ID) and open new tab
//with all prices listed for that ASIN
function handleClick(state) {
  var url = tabs.activeTab.url;
  var regex = new RegExp("https://www.amazon.com/([\\w-]+/)?(dp|gp/product)/(\\w+/)?(\\w{10})");
  asin = url.match(regex);
  if (asin) {
    tabs.open("https://www.amazon.com/gp/offer-listing/" + asin[4]);
  }
  else {
    notifications.notify({
      text: "Sorry, no price information found!",
    });
  }
}
