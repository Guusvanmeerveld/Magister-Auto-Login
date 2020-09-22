const d = document.getElementById.bind(document);
const q = document.querySelector.bind(document);

// user object moet gemaakt worden vanuit chrome.storage.sync

var snooze = ms => new Promise(res => setTimeout(res, ms));
function login() {
    chrome.storage.sync.get(['school','number', 'password'], async function (result) {

        if (d("scholenkiezer_value")) {
            await waitForSel("#scholenkiezer_value");
    
            if (d("scholenkiezer_value") && result.number) {
                d("scholenkiezer_value").value = result.school;
                d("scholenkiezer_value").dispatchEvent(new Event("input"));
            };
    
            await waitForSel(".selected");
    
            if (q(".selected")) {
                q(".selected").click();
            }
        }
        
        await waitForSel("#username");

        if (d("username") && result.number) {
            d("username").value = result.number;
            d("username").dispatchEvent(new Event("input"));
        };

        await waitForSel("#username_submit")
        if (d("username_submit")) {
            d("username_submit").click();
        };

        await waitForSel("#rswp_password")

        if (d("rswp_password") && result.password) {
            d("rswp_password").value = result.password;
            d("rswp_password").dispatchEvent(new Event("input"));
        };

        await waitForSel("[id*=_submit]")
        if (d("rswp_submit")) {
            d("rswp_submit").click();
        };
    });
}

function waitForSel(s) {
    return new Promise(res => {
        setInterval(() => {
            if (q(s)) {
                res()
            }
        }, 10);
    });
};

chrome.storage.sync.get(['enabled'], function (result){
    if(result.enabled){
        login();
    };
});



