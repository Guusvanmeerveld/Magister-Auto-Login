browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    browser.tabs.executeScript(tab.ib, {
      file: 'js/login.js'
    });
  }
});

browser.runtime.onInstalled.addListener(function () {
  // open options.html
  window.open('/options/index.html', '_blank');

  browser.storage.sync.set({
    "enabled": true
  });
  browser.browserAction.setBadgeText({ 
    text: 'ON' 
  });
});