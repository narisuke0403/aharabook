<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>book_submit</title>
    <link rel="stylesheet" href="CSS/book_style.css">
    <style>
        canvas {
            border-style: solid;
            border-color: red;
        }
    </style>
    <?php
    include 'Include_PHP/controlDB.php';
    $exist = search_ISBN($_GET["ISBN"]);
    ?>
</head>

<body id="body">
    <a href="top.php">戻る</a>
    <h2>確認ページ</h2>
    <form action="book_submit_complete.php" method="get" id="form">
        タイトル
        <p>
            <input type="text" name="book_title" id="book_title">
            <script>
                var input = document.getElementById("book_title");
                input.value = <?php echo '"' . $_GET["book_title"] . '"' ?>;
            </script>
        </p>
        作者名
        <p>
            <input type="text" name="book_writer" id="book_writer">
            <script>
                var input = document.getElementById("book_writer");
                input.value = <?php echo '"' . $_GET["book_writer"] . '"' ?>;
            </script>
        </p>
        登録タグ
        <p>
            <input type="text" name="book_tag" id="book_tag">
            <script>
                var input = document.getElementById("book_tag");
                input.value = <?php echo '"' . $_GET["book_tag"] . '"' ?>;
            </script>
        </p>
        出版日
        <p>
            <input type="text" name="book_day" id="book_day">
            <script>
                var input = document.getElementById("book_day");
                input.value = <?php echo '"' . $_GET["book_day"] . '"' ?>;
            </script>
        </p>
        書籍説明
        <p>
            <textarea name="book_description" id="book_description"></textarea>
            <script>
                var input = document.getElementById("book_description");
                input.value = <?php echo '"' . $_GET["book_description"] . '"' ?>;
            </script>
        </p>
        冊数
        <p>
            <select name="book_number">
                <option value=1>1冊</option>
                <option value=2>2冊</option>
                <option value=3>3冊</option>
                <option value=4>4冊</option>
                <option value=5>5冊</option>
                <option value=6>6冊</option>
                <option value=7>7冊</option>
                <option value=8>8冊</option>
                <option value=9>9冊</option>
                <option value=10>10冊</option>
            </select>
        </p>
        <input type="hidden" name="ISBN" id="ISBN">
        <script>
            var input = document.getElementById("ISBN");
            input.value = <?php echo $_GET["ISBN"] ?>;
        </script>
        本棚の場所
        <br>
        <canvas id="canvas_1"></canvas>
        <script src="Canvas/control_bookshelf.js"></script>
        <script src="Canvas/check.js"></script>
        <br>
        <input type="button" value="登録" id="register" onClick="regi()">
        <script>
            function regi() {
                var form = document.forms["form"];
                var register = document.getElementById("register");
                var input = form.children[0].children[0];
                if (input.value == "" || input.value == null) {
                    var err = document.createElement("p");
                    err.innerHTML = "タイトルが入力されていません";
                    err.style.color = "red";
                    form.appendChild(err);
                } else {
                    form.submit();
                }
            }
        </script>
    </form>
    <script>
        /*
                var exist = <?php echo $exist; ?>;
                if(exist == 1){
                        body = document.getElementById("body");
                        console.log(body);
                        body.textContent = null;
                    }
                    */
    </script>
</body>

</html>