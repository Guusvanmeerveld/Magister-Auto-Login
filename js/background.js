chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    chrome.tabs.executeScript(tab.ib, {
      file: 'js/login.js'
    });
  }
});

chrome.runtime.onInstalled.addListener(function () {
  // open options.html
  window.open('/options/index.html', '_blank');

  chrome.storage.sync.set({
    "enabled": true
  });
  chrome.browserAction.setBadgeText({ 
    text: 'ON' 
  });
});