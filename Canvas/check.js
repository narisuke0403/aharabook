canvas_1.removeEventListener('mousedown', jump_bookshelf, false);
var input0 = document.createElement("input");
var form = document.getElementById("form");
input0.name = "bookshelfID";
input0.type = "hidden";
form.appendChild(input0);
function check_bookshelf(e) {
    var offsetX = canvas_1.getBoundingClientRect().left;
    var offsetY = canvas_1.getBoundingClientRect().top;
    var x = e.clientX - offsetX;
    var y = e.clientY - offsetY;
    for (var i = 0; i < bookshelf_list.length; i++) {
        now_num = null;
        if (bookshelf_list[i].posX < x && (bookshelf_list[i].posX + bookshelf_list[i].lengthX) > x &&
            bookshelf_list[i].posY < y && (bookshelf_list[i].posY + bookshelf_list[i].lengthY) > y) {
            now_num = bookshelf_list[i].id;
            break;
        }
    }
    draw();
    input0.value = now_num;
}
canvas_1.addEventListener("mousedown", check_bookshelf, false);