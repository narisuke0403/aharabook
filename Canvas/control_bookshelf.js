/*
注意事項
グローバル変数はこれ以上は増やさずに作業すること
もしどうしても必要な場合は、必ずどこかに明記しておくこと
参考サイト：
クラスに関すること：https://qiita.com/jooex/items/981824f9fb494b448a08
canvasに関すること：https://qiita.com/kyrieleison/items/a3ebf7c55295c3e7d8f0
ドラッグ等の操作に関すること：https://qiita.com/kyrieleison/items/26fcfb3a1d94bc92c596
配列に関すること：https://qiita.com/takeharu/items/d75f96f81ff83680013f
*/

var canvas_1 = document.getElementById("canvas_1"); //本棚用のキャンバスidは"canvas_1"と定義する
canvas_1.width = 640;
canvas_1.height = 480;
var ctx = canvas_1.getContext('2d');
ctx.strokeStyle = '#666';
ctx.lineWidth = 10;
var xmlhttp = new XMLHttpRequest();
var now_num;
var response;
var now_edit = false;
var bookshelf_list = []; //本棚を格納するための変数

class Bookshelf {
  constructor(id, posX, posY, rotate = 1) {
    //本棚の長さは自由に変えても大丈夫
    this.lengthX = 100.0; //描画する本棚のx成分の長さ
    this.lengthY = 50.0; //描画する本棚のy成分の長さ
    this.dragging = false;
    this.cover = false;
    this.id = id;
    this.posX = posX;
    this.posY = posY;
    this.relX = 0; //オブジェクトとマウス座標との差分
    this.relY = 0; //オブジェクトとマウス座標との差分
    this.rotate = rotate;
  }
}

//この下は関数
function bookshelf_init(res) {
  /*
  DBからの情報をbookshelfに格納するための関数
  まだ、触らない
  */
  canvas_1 = document.getElementById("canvas_1"); //本棚用のキャンバスidは"canvas_1"と定義する
  canvas_1.width = 640;
  canvas_1.height = 480;
  ctx = canvas_1.getContext('2d');
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 10;
  var length = res.getElementsByTagName('length')[0].firstChild.data;
  for (var i = 0; i < length; i++) {
    bookshelf_list.push(new Bookshelf(Number(res.getElementsByTagName('id' + i)[0].firstChild.data), Number(res.getElementsByTagName('posX' + i)[0].firstChild.data), Number(res.getElementsByTagName('posY' + i)[0].firstChild.data), Number(res.getElementsByTagName('rotate' + i)[0].firstChild.data)));
  } 
  if (location.pathname == "/bookshelf_html/book_info.php") {
    canvas_1.removeEventListener('mousedown', jump_bookshelf, false);
  }
  draw();
}
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    response = this.responseXML.documentElement;
    bookshelf_init(response);
  }
}


function draw() {
  ctx.clearRect(0, 0, canvas_1.width, canvas_1.height);
  (function () {
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 40);
    ctx.closePath();
    ctx.stroke();
  })();
  (function () {
    ctx.beginPath();
    ctx.moveTo(540, 0);
    ctx.lineTo(540, 40);
    ctx.closePath();
    ctx.stroke();
  })();
  (function () {
    ctx.font = "36px serif";
    ctx.fillText("ドア", 5, 35);
  })();
  (function () {
    ctx.font = "36px serif";
    ctx.fillText("ドア", 545, 35);
  })();
  for (var i = 0; i < bookshelf_list.length; i++) {
    if (now_num == i) {
      ctx.fillStyle = 'rgb(192, 80, 77)';
    } else {
      ctx.fillStyle = 'rgb(0,0,0)';
    }
    try {
      if (i == d) {
        ctx.fillStyle = 'rgb(192, 80, 77)';
      }
    }catch(e){}
    if(bookshelf_list[i].rotate == -1){
      bookshelf_list[i].lengthX = 50;
      bookshelf_list[i].lengthY = 100;
    }
    ctx.fillRect(bookshelf_list[i].posX, bookshelf_list[i].posY, bookshelf_list[i].lengthX, bookshelf_list[i].lengthY);
  }
}

function create_bookshelf() {
  /*
  仕様：htmlのinputがクリックされた時に呼び出す関数
  bookshelfクラスを宣言して、インスタンスをbookshelf_listの末尾に格納する
  宣言する際のidは0から順番につける(実装方法はbookshelf_listの長さを利用する)
  同上のbook_idはnull値を指定する
  インスタンスのイベントをcanvas_1.addEventList()で追加する(on_mouse()を'mousedown'、drag()を'mousemove'、up_mouse()を'mouseup'で追加)
  */
  var num = bookshelf_list.length;
  bookshelf_list.push(new Bookshelf(num, 120 + num * 30, 60 + num * 30, 1));
  draw();
}

function delete_bookshelf() {
  bookshelf_list.splice(now_num, 1);
  draw();
}

function down_mouse(e) {
  var offsetX = canvas_1.getBoundingClientRect().left;
  var offsetY = canvas_1.getBoundingClientRect().top;
  var x = e.clientX - offsetX;
  var y = e.clientY - offsetY;

  for (var i = 0; i < bookshelf_list.length; i++) {
    if (bookshelf_list[i].posX < x && (bookshelf_list[i].posX + bookshelf_list[i].lengthX) > x && bookshelf_list[i].posY < y && (bookshelf_list[i].posY + bookshelf_list[i].lengthY) > y) {
      now_num = bookshelf_list[i].id;
      bookshelf_list[i].dragging = true;
      bookshelf_list[i].relX = bookshelf_list[i].posX - x;
      bookshelf_list[i].relY = bookshelf_list[i].posY - y;
    }
  }
  draw();
}

function drag(e) {
  console.log(bookshelf_list[now_num].dragging);
  var offsetX = canvas_1.getBoundingClientRect().left;
  var offsetY = canvas_1.getBoundingClientRect().top;
  var x = e.clientX - offsetX;
  var y = e.clientY - offsetY;
  if (bookshelf_list[now_num].dragging) {
    for (var i = 0; i < bookshelf_list.length; i++) {
      if (bookshelf_list[i].id == bookshelf_list[now_num].id) continue;
      if (x + bookshelf_list[now_num].relX < bookshelf_list[i].posX + bookshelf_list[i].lengthX && x + bookshelf_list[now_num].relX + bookshelf_list[now_num].lengthX > bookshelf_list[i].posX &&
        y + bookshelf_list[now_num].relY < bookshelf_list[i].posY + bookshelf_list[i].lengthY && y + bookshelf_list[now_num].relY + bookshelf_list[now_num].lengthY > bookshelf_list[i].posY) {
        return;
      }
    }
    bookshelf_list[now_num].posX = x + bookshelf_list[now_num].relX;
    bookshelf_list[now_num].posY = y + bookshelf_list[now_num].relY;
    draw();
  }
}

function up_mouse(e) {
  bookshelf_list[now_num].dragging = false;
}

function change() {
  var base = document.getElementById("base");
  if (now_edit == false) {
    now_edit = true;
    var base = document.getElementById("base");
    input = document.createElement("input");
    input.value = "本棚を追加";
    input.setAttribute("onclick", "create_bookshelf()");
    input.type = "button";
    base.appendChild(input);
    input1 = document.createElement("input");
    input1.value = "本棚を削除";
    input1.setAttribute("onclick", "delete_bookshelf()");
    input1.type = "button";
    base.appendChild(input1);
    input3 = document.createElement("input");
    input3.value = "回転";
    input3.type = "button";
    input3.setAttribute("onclick", "rotation()");
    base.appendChild(input3);
    input2 = document.createElement("input");
    input2.value = "完了";
    input2.type = "button";
    input2.setAttribute("onclick", "send_data()");
    base.appendChild(input2);
    canvas_1.removeEventListener('mousedown', jump_bookshelf, false);
    canvas_1.addEventListener('mousedown', down_mouse, false);
    canvas_1.addEventListener('mousemove', drag, false);
    canvas_1.addEventListener('mouseup', up_mouse, false);
  } else {
    now_edit = false;
    canvas_1.addEventListener('mousedown', jump_bookshelf, false);
    canvas_1.removeEventListener('mousedown', down_mouse, false);
    canvas_1.removeEventListener('mousemove', drag, false);
    canvas_1.removeEventListener('mouseup', up_mouse, false);
    base.textContent = null;
  }
}

function send_data() {
  var base = document.forms["base"];
  base.action = "book_shelf.php";
  input = document.createElement("input");
  input.type = "hidden";
  input.name = "length";
  input.value = bookshelf_list.length;
  base.appendChild(input);
  for (let i = 0; i < bookshelf_list.length; i++) {
    input0 = document.createElement("input");
    input0.type = "hidden";
    input0.name = "id" + i;
    input0.value = bookshelf_list[i].id;
    input1 = document.createElement("input");
    input1.type = "hidden";
    input1.name = "posX" + i;
    input1.value = bookshelf_list[i].posX;
    input2 = document.createElement("input");
    input2.type = "hidden";
    input2.name = "posY" + i;
    input2.value = bookshelf_list[i].posY;
    input3 = document.createElement("input");
    input3.type = "hidden";
    input3.name = "posY" + i;
    input3.value = bookshelf_list[i].posY;
    input3 = document.createElement("input");
    input3.type = "hidden";
    input3.name = "rotate" + i;
    input3.value = bookshelf_list[i].rotate;
    base.appendChild(input0);
    base.appendChild(input1);
    base.appendChild(input2);
    base.appendChild(input3);
  }
  base.submit();
}

(window.onload = function () {
  xmlhttp.open('get', "Include_PHP/control_bookshelf_DB.php", true);
  xmlhttp.send();
  canvas_1.addEventListener('mousedown', jump_bookshelf, false);
})();

function jump_bookshelf(e) {
  var offsetX = canvas_1.getBoundingClientRect().left;
  var offsetY = canvas_1.getBoundingClientRect().top;
  var x = e.clientX - offsetX;
  var y = e.clientY - offsetY;
  for (var i = 0; i < bookshelf_list.length; i++) {
    now_num = null;
    if (bookshelf_list[i].posX < x && (bookshelf_list[i].posX + bookshelf_list[i].lengthX) > x && bookshelf_list[i].posY < y && (bookshelf_list[i].posY + bookshelf_list[i].lengthY) > y) {
      now_num = bookshelf_list[i].id;
      break;
    }
  }
  draw();
  if (now_num != null) {
    var form = document.forms["base"];
    form.method = "get";
    form.action = "book_search_result.php";
    form.target = "_blank";
    input1 = document.createElement("input");
    input1.setAttribute('type', 'hidden');
    input1.setAttribute('name', 'bookshelf');
    input1.setAttribute('value', now_num);
    form.appendChild(input1);
    form.submit();
    form.textContent = null;
  }
}

function rotation(){
  var i = bookshelf_list[now_num].lengthX;
  bookshelf_list[now_num].lengthX = bookshelf_list[now_num].lengthY;
  bookshelf_list[now_num].lengthY = i;
  bookshelf_list[now_num].rotate *= -1;
  draw();
}