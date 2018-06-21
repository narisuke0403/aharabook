/*
  バーコード関連をまとめたAPI
  <div id = "which_device"> </div> 
  <script type = "text/javascript"src = "barcode_reader/zbar-main.js"> </script>
  上記のコードをコピーして貼り付ける
*/

//デバイスによって認証方法を変えるためのタグ生成
//PCならwebカメラ、スマホなら
var which = document.getElementById("which_device");
var bookdata
if (_ua.PC === true) {
  var entry = document.createElement('video');
  entry.autoplay = true;
  var entry1 = document.createElement('div');
  entry1.id = "inner";
  var entry2 = document.createElement('div');
  entry2.id = "redline";
  var entry3 = document.createElement('canvas');
  entry3.setAttribute("style", "display: none");
  which.appendChild(entry);
  which.appendChild(entry1);
  which.appendChild(entry2);
  which.appendChild(entry3);
} else if (_ua.Mobile === true || _ua.Tablet === true) {
  var entry = document.createElement('input');
  entry.setAttribute("type", "file");
  entry.id = "take-picture";
  entry.setAttribute("accept", "image/*");
  entry.setAttribute("style", "visibility: hidden");
  entry.capture = true;
  var entry1 = document.createElement('button');
  entry1.id = "scan";
  entry2.onclick = 'scan()';
  which.appendChild(entry);
  which.appendChild(entry1);
}

var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var localMediaStream = null;
var worker = new Worker('barcode_reader/zbar-processor.js');
var xmlhttp = new XMLHttpRequest();
var xmlhttp2 = new XMLHttpRequest();
var ISBN;

worker.onmessage = function (event) {
  if (event.data.length == 0) return;
  var d = event.data[0];
  if (d[2] <= 9780000000000) return;
  ISBN = d[2];
  var url = 'https://www.googleapis.com/books/v1/volumes?q=' + d[2];
  xmlhttp.open('get', url, true);
  xmlhttp.send();
};

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    bookdata = JSON.parse(this.responseText);
    var _title = bookdata.items[0].volumeInfo.title;
    var title = _title.replace(/ /, "");
    var url = "http://jlp.yahooapis.jp/MAService/V1/parse?appid=dj00aiZpPUpqSFNLR3dNQ3F1SiZzPWNvbnN1bWVyc2VjcmV0Jng9ODc-&sentence=" + title;
    var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + url + '"') + '&format=xml';
    xmlhttp2.open('get', yql, true);
    xmlhttp2.send();
  }
}

xmlhttp2.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var domDoc = this.responseXML;
    var wordlist = analysis_title(domDoc);
    send_data(wordlist,bookdata);
  }
}

function analysis_title(data) {
  var word = data.querySelectorAll("surface");
  var pos = data.querySelectorAll("pos");
  var wordlist = [];
  for (let i = 0; i < word.length; i++) {
    if (pos[i].textContent === "名詞") {
      wordlist.push(word[i].textContent);
    }
  }
  return wordlist;
}

function snapshot() {
  if (localMediaStream === null) return;
  var k = (320 + 240) / (video.videoWidth + video.videoHeight);
  canvas.width = Math.ceil(video.videoWidth * k);
  canvas.height = Math.ceil(video.videoHeight * k);
  var ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
    0, 0, canvas.width, canvas.height);
  var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  worker.postMessage(data.data);
};

if (_ua.PC === true) {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
  if (navigator.getUserMedia) {
    navigator.getUserMedia({
        video: true
      },
      function (stream) { // success callback
        if (video.mozSrcObject !== undefined) {
          video.mozSrcObject = stream;
        } else {
          video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
        }
        localMediaStream = true;
      },
      function (error) {
        console.error(error);
      });
  } else {}
  setInterval(snapshot, 500);
} else if (_ua.Mobile[0] === true) {
  header.textContent = "Mobile";
}

function send_data(wordlist, _bookdata = bookdata) {
  var book_title = _bookdata.items[0].volumeInfo.title;
  var book_writer = function () {
    var d = '';
    for (var i = 0; i < _bookdata.items[0].volumeInfo.authors.length; i++) {
      d += ' ' + _bookdata.items[0].volumeInfo.authors[i];
    }
    return d;
  }();
  var book_tag = function () {
    var d = '';
    for (var i = 0; i < wordlist.length; i++) {
      d += ' ' + wordlist[i];
    }
    return d;
  }();
  var book_day = _bookdata.items[0].volumeInfo.publishedDate;
  var book_description = _bookdata.items[0].volumeInfo.description;
  var form = document.forms["myform"]
  form.method = "get";
  form.action = "book_submit.php";
  form.target = "_blank";
  input1 = document.createElement("input");
  input1.setAttribute('type','hidden');
  input1.setAttribute('name','book_title');
  input1.setAttribute('value',book_title);
  form.appendChild(input1);
  input2 = document.createElement("input");
  input2.setAttribute('type', 'hidden');
  input2.setAttribute('name', 'book_writer');
  input2.setAttribute('value', book_writer);
  form.appendChild(input2);
  input3 = document.createElement("input");
  input3.setAttribute('type', 'hidden');
  input3.setAttribute('name', 'book_tag');
  input3.setAttribute('value', book_tag);
  form.appendChild(input3);
  input4 = document.createElement("input");
  input4.setAttribute('type', 'hidden');
  input4.setAttribute('name', 'book_day');
  input4.setAttribute('value', book_day);
  form.appendChild(input4);
  input5 = document.createElement("input");
  input5.setAttribute('type', 'hidden');
  input5.setAttribute('name', 'book_description');
  input5.setAttribute('value', book_description);
  form.appendChild(input5);
  input6 = document.createElement("input");
  input6.setAttribute('type', 'hidden');
  input6.setAttribute('name', 'ISBN');
  input6.setAttribute('value', ISBN);
  form.appendChild(input6);
  form.submit();
  window.close();
}