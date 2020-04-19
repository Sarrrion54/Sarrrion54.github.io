
var drawingCanvas = document.getElementById('pointCanvas');
var context = drawingCanvas.getContext('2d');
drawingCanvas.width = drawingCanvas.offsetWidth;
drawingCanvas.height = drawingCanvas.offsetHeight;
var img = new Image();
img.src = 'CSS/Image/South_America2.jpg';
img.onload = function () {
    context.drawImage(img, 0, 0, drawingCanvas.width, drawingCanvas.height);
}
drawingCanvas.addEventListener('mouseup', function (e) {
    var x = e.pageX - e.target.offsetLeft,
        y = e.pageY - e.target.offsetTop;
    console.log(x);
    console.log(y);
});
var pointer = new Image();
pointer.src = "CSS/Image/map.png";
var requestURL = 'JS/JSON/place.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
pointer.onload = function () {
    document.getElementById('preloader_malc').style.display = "none";
    let a = drawingCanvas.width / 569;
    let b = drawingCanvas.height / 693;
    let mainPlace = request.response;
    let place = mainPlace['defaultPlace'];
    for (var i = 0; i < place.length; i++) {
        let Place_Name = place[i].name;
        let Place_CoordinateX = (place[i].coordinateX * a) - 20;
        let Place_CoordinateY = (place[i].coordinateY * b) - 40;
        let Place_Country = place[i].country;
        let Place_Discoverer = place[i].discoverer;
        let Place_Interesting = place[i].interesting;
        console.log(place.length);
        console.log(place[i].coordinateY);
        // console.log(Place_CoordinateX);
        //console.log(Place_CoordinateY);
        if (Place_Discoverer == undefined)
            Place_Discoverer = "Не известно";
        if (Place_Name == undefined)
            Place_Name = "Не известно";
        context.drawImage(pointer, Place_CoordinateX, Place_CoordinateY, 40, 40);
        pointer.id = i;
        document.getElementById("m_info").innerHTML = "<div id=" + i + "><h1>" + Place_Name + "</h1><h2>Страна:</h2><span>" + Place_Country + "</span><h2>Первооткрыватель:</h2><span>" + Place_Discoverer + "</span><h2>Интересное:</h2><span>" + Place_Interesting + "</span></div>";
        //document.body.style.backgroundImage = "url(CSS/Image/Fon_Place/Амазонка.jpg)";
        //document.body.style.transitionDuration = "2s";
    }
}

function Beautiful() {
    document.getElementById("menu").style.display = "block";
    //document.getElementById("body_main").style.display = "none";
    // document.getElementById("body_main").style.transitionDuration = "2s";
}