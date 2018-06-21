var ISBN = document.getElementById("ISBN");
var base = document.forms["form"];
var xmlhttp = new XMLHttpRequest();
var xmlhttp2 = new XMLHttpRequest();


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
        send_data(wordlist, bookdata);
    }
}

function registor(){
    var url = 'https://www.googleapis.com/books/v1/volumes?q=' + ISBN.value;
    xmlhttp.open('get', url, true);
    xmlhttp.send();
}