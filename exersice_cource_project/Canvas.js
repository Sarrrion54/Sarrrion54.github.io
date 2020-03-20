var drawingCanvas = document.getElementById('pointCanvas');
var context = drawingCanvas.getContext('2d');
var img = new Image();
img.src = 'South_America.jpg';
img.onload = function () {
    context.drawImage(img, this.x, this.y, 800, 1200);
}

drawingCanvas.addEventListener('mouseup', function (e) {
    var x = e.pageX - e.target.offsetLeft,
        y = e.pageY - e.target.offsetTop;
    console.log(x);
    console.log(y);
});
