function onWebNav(details) {
    if (details.frameId === 0) {
        // Top-level frame
        chrome.pageAction.show(details.tabId);
    }
}
var filter = {
    url: [{
        hostContains: 'amazon.com'
    }]
};
chrome.webNavigation.onCommitted.addListener(onWebNav, filter);
chrome.webNavigation.onHistoryStateUpdated.addListener(onWebNav, filter);

chrome.pageAction.onClicked.addListener(function(activeTab) {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log(url);

    var regex = new RegExp("https://www.amazon.com/([\\w-]+/)?(dp|gp/product)/(\\w+/)?(\\w{10})");

    asin = url.match(regex);

    if (asin) {
      chrome.tabs.create({url: "https://www.amazon.com/gp/offer-listing/" + asin[4]});
    }
    else {
      notifications.notify({
        text: "Sorry, no price information found!",
      });
    };
  });
});
