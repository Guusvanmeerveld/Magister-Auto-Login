const d = document.getElementById.bind(document);
const qAll = document.querySelectorAll.bind(document);

d("save").addEventListener("click", save);

qAll(".login").forEach(s => {
    s.addEventListener("keydown", e => {
        if (e.key == "Enter") {
            if (e.target.id == "school") {
                d("number").focus()
            };
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

    var school = d("school").value;
    var number = d("number").value;
    var password = d("password").value;
    
    try {
        chrome.storage.sync.set({
            "school": school,
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
    chrome.storage.sync.get(['school', 'number', 'password'], function (result) {
        if (result.school !== undefined) {

            d("school").value = result.school
        };

        if (result.number !== undefined){
            
            d("number").value = result.number
        };

        if (result.password !== undefined) {
            d("password").value = result.password
        };
    });

    chrome.storage.sync.get(['enabled'], function (result) {
        d("switch").checked = result.enabled
    });

    chrome.storage.sync.get(['darkmode'], function (result) {
        d("dark-mode").checked = result.darkmode
        d("dark-link").disabled = d("dark-mode").checked ? false : true
    });

    d("switch").addEventListener("click", toggle)
    d("dark-mode").addEventListener("click", darkMode)
};

function toggle() {
    var checked = d("switch").checked;
    chrome.storage.sync.set({
        "enabled": checked
    });

    chrome.browserAction.setBadgeText({ 
        text: checked ? "ON" : "OFF"
    });
};

function darkMode() {
    chrome.storage.sync.set({
        "darkmode": d("dark-mode").checked
    });

    console.log(!d("dark-mode").checked);
    
    d("dark-link").disabled = d("dark-mode").checked ? false : true

}

onLoad()