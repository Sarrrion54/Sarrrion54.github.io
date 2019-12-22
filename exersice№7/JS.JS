function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xhttp.open("GET", "vine.xml", true);
    xhttp.send();
}
function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("WINE");
    let wine_content = "";
    for (i = 0; i < x.length; i++) {
        var WINE_NAME = x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue;
        var WINE_IMG = x[i].getElementsByTagName("IMG")[0].childNodes[0].nodeValue;
        var WINE_STYLE = x[i].getElementsByTagName("STYLE")[0].childNodes[0].nodeValue;
        var WINE_CHARACTERISTIC = x[i].getElementsByTagName("CHARACTERISTIC")[0].childNodes[0].nodeValue;
        var WINE_GASTRONOMY = x[i].getElementsByTagName("GASTRONOMY")[0].childNodes[0].nodeValue;
        var WINE_VINEYARDS = x[i].getElementsByTagName("VINEYARDS")[0].childNodes[0].nodeValue;
        var WINE_EXTRACTION = x[i].getElementsByTagName("EXTRACTION")[0].childNodes[0].nodeValue;
        var WINE_ID = x[i].getElementsByTagName("ANCHOR")[0].childNodes[0].nodeValue;

        var vine = "<div class='wine_field'><br><h2 id=" + WINE_ID + ">" + WINE_NAME +
            "</h2><br><p><img class='vine' src='" + WINE_IMG +
            "' alt='Chianti classico'><span class='information'>Стилистика вина:</span><br>"
            + WINE_STYLE + "<br><span class='information'>Дегустационные характеристики:</span><br>" +
            WINE_CHARACTERISTIC + "<br><span class='information'>Гастрономия:</span><br>" +
            WINE_GASTRONOMY + "<br><span class='information'>Виноградники:</span><br>" +
            WINE_VINEYARDS + "<br><span class='information'>Способ выдержки:</span><br>" +
            WINE_EXTRACTION + "<br><br></p></div>";

        wine_content += vine;
    }

    document.getElementById('main_informatio').innerHTML = wine_content;
}
