var flag = 1;
var s = -1;
var str = "1111111211111111101010000001000110101011110101011000000100010101111110111100010110001001111111011010001100001001111011111111001110101001300111111010101111010001100000101101010111110110010101011001011010000101110000001111110111010100000000011111111111111111";
var row, cell;
var END_row, END_cell;
let nx = 16, ny = 16;
var Victory = false;
function Tablica() {
    var NotMyTable = document.getElementById("Table1");
    NotMyTable.innerHTML = "";
    Array_Table = new Array(nx);
    for (let i = 0; i < nx; ++i) {
        Array_Table[i] = new Array(ny);
        let NewLine = document.createElement("tr");
        for (let j = 0; j < ny; ++j) {
            let NewColumn = document.createElement("td");
            switch (str[++s]) {
                case '1':
                    NewColumn.className = "border";
                    break;
                case '2':
                    NewColumn.className = "player";
                    row = i;
                    cell = j;
                    break;
                case '3':
                    NewColumn.className = "Victory";
                    END_row = i;
                    END_cell = j;
                    break;
                default:
                    NewColumn.className = "empty";
                    break;
            }
            Array_Table[i][j] = NewColumn;
            NewLine.appendChild(NewColumn);
        }
        NotMyTable.appendChild(NewLine);
    }

}


window.onload = function () {
    Tablica();
    addEventListener("keydown", cellKeyboardDown);

    function cellKeyboardDown(e) {
        if (Victory) return;
        switch (e.key) {
            case "w":
            case "ц":
                if (Array_Table[row - 1][cell].className != "border") {
                    Array_Table[row - 1][cell].className = "player";
                    Array_Table[row][cell].className = "empty";
                    row--;
                }
                break;
            case "a":
            case "ф":
                if (Array_Table[row][cell - 1].className != "border") {
                    Array_Table[row][cell - 1].className = "player";
                    Array_Table[row][cell].className = "empty";
                    cell--;
                }
                break;
            case "d":
            case "в":
                if (Array_Table[row][cell + 1].className != "border") {
                    Array_Table[row][cell + 1].className = "player";
                    Array_Table[row][cell].className = "empty";
                    cell++;
                }
                break;
            case "s":
            case "ы":
                if (Array_Table[row + 1][cell].className != "border") {
                    Array_Table[row + 1][cell].className = "player";
                    Array_Table[row][cell].className = "empty";
                    row++;
                }
                break;
        }
        if ((row == END_row) && (cell == END_cell)) Victory = true;
        if (Victory) {
            document.getElementById("exercise").innerHTML = "ПОБЕДА!";
        }
    }
}
