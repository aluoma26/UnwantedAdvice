
window.onload = function () {

    var dict = {
        1: "https://yesno.wtf/api/",
        2: "https://api.adviceslip.com/advice"
    };

    var dictRange = Object.keys(dict).length;

    var writeMessage = function (message, user) {

        var d = new Date().getTime();

        if (user == 1) {
            var parentDiv = document.createElement("div");
            var div = document.createElement("div");
            var br = document.createElement("br");

            parentDiv.setAttribute("id", d + "parent");
            parentDiv.style.display = "block";
            parentDiv.style.marginRight = "50%"
            parentDiv.style.minWidth = "50%";

            div.style.left = "0";
            div.style.display = "inline-block";
            div.style.wordBreak = "break-word";
            div.style.height = "auto";
            div.style.margin = "5px 0px 5px 0px";
            div.style.padding = "5px 5px 5px 5px";
            div.style.borderRadius = "5px";
            div.style.background = "#0074D9";
            div.style.fontFamily = "Arial, Helvetica, sans-serif";
            div.style.color = "white";
            div.innerHTML = message;

            document.getElementById("MessagingArea").appendChild(parentDiv);
            document.getElementById(d + "parent").appendChild(div);
            document.getElementById(d + "parent").appendChild(br);

            document.getElementById("MessageInput").value = "";

            var randomUrl = Math.floor((Math.random() * dictRange) + 1);

            if (message.endsWith("?")) {
                httpGetAsync(dict[1], handleYesNoMessage);
            }
            else {
                httpGetAsync(dict[randomUrl], handleAdviceMessage);
            }
        }
        else if (user == 2) {
            var parentDiv = document.createElement("div");
            var div = document.createElement("div");
            var br = document.createElement("br");

            parentDiv.setAttribute("id", d + "parent");
            parentDiv.style.display = "block";
            parentDiv.style.marginLeft = "50%"
            parentDiv.style.minWidth = "50%";

            div.style.left = "0";
            div.style.display = "inline-block";
            div.style.wordBreak = "break-word";
            div.style.height = "auto";
            div.style.margin = "5px 0px 5px 0px";
            div.style.padding = "5px 5px 5px 5px";
            div.style.borderRadius = "5px";
            div.style.background = "#2ECC40";
            div.style.fontFamily = "Arial, Helvetica, sans-serif";
            div.style.color = "white";
            div.innerHTML = message;

            document.getElementById("MessagingArea").appendChild(parentDiv);
            document.getElementById(d + "parent").appendChild(div);
            document.getElementById(d + "parent").appendChild(br);

            document.getElementById("MessageInput").value = "";
        }
    }

    var httpGetAsync = function (theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }

    //Handle different responses
    function handleYesNoMessage(responseText) {
        var response = JSON.parse(responseText);
        writeMessage(response.answer, 2);
    }

    function handleAdviceMessage(responseText) {
        var response = JSON.parse(responseText);
        writeMessage(response.slip.advice, 2);
    }

    document.getElementById("MessageInput").onkeydown = function (e) {
        switch (e.key) {
            case 'Enter':
                writeMessage(document.getElementById("MessageInput").value, 1);
                break;
            default:
        }
    };


}