const d = document.getElementById.bind(document);
const qAll = document.querySelectorAll.bind(document);

d("save").addEventListener("click", save);

qAll(".login").forEach(s => {
    s.addEventListener("keydown", e => {
        if (e.key == "Enter") {
            if (e.target.id == "number") {
                d("password").focus()
            };
            if (e.target.id == "password") {
                save()
            };
        }
    });
});

function save() {

    var number = d("number").value;
    var password = d("password").value;
    
    try {
        browser.storage.sync.set({
        "number": number,
        "password": password
        });

        d("save").innerHTML = "Saved!"
    } catch (e) {
        d("save").innerHTML = "Error"
        d("save").className = "btn btn-danger float-right"
    }
};

function onLoad() {
    browser.storage.sync.get(['number', 'password'], function (result) {
        if (result.number !== undefined){
            
            d("number").value = result.number
        };

        if (result.password !== undefined) {
            d("password").value = result.password
        };
    });

    browser.storage.sync.get(['enabled'], function (result) {
        d("switch").checked = result.enabled
    });

    browser.storage.sync.get(['darkmode'], function (result) {
        d("dark-mode").checked = result.darkmode
        d("dark-link").disabled = d("dark-mode").checked ? false : true
    });

    d("switch").addEventListener("click", toggle)
    d("dark-mode").addEventListener("click", darkMode)
};

function toggle() {
    var checked = d("switch").checked;
    browser.storage.sync.set({
        "enabled": checked
    });

    browser.browserAction.setBadgeText({ 
        text: checked ? "ON" : "OFF"
    });
};

function darkMode() {
    browser.storage.sync.set({
        "darkmode": d("dark-mode").checked
    });

    console.log(!d("dark-mode").checked);
    
    d("dark-link").disabled = d("dark-mode").checked ? false : true

}

onLoad()