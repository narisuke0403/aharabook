<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="UTF-8">
        <title>book_info</title>
        <link rel="stylesheet" href="CSS/book_info_style.css">
        
        <style>
        canvas {
            border-style: solid;
            border-color: red;
        }
    </style>
        <?php
        $ID = $_GET["id"];
        $pdo = new PDO('sqlite:SQL/bookdata.sqlite');
        $info = $pdo->query("select * from bookdata where bookid=" . $ID)->fetch();
        $title = $info["title"];
        $author = $info["author"];
        $publish = $info["publish"];
        $description = $info["description"];
        $bookshelfID = $info["bookshelfID"];
        ?>
        <script>
            var d=<?php echo $bookshelfID ?>;
        </script>
    </head>
    <body>
        <a href="top.php">戻る</a><br>
        <center>
        <h3 id="day">本棚</h3>
        <canvas id="canvas_1"></canvas>
        <script src="Canvas/control_bookshelf.js"></script>
        </center>
        <span></span>
        <table summary="概要">
            <tr>
                <td class="t_top" id="author">作者：</td>
                <script>
                    var input = document.getElementById("author");
                    input.innerText = <?php echo '"作者：' . $author . '"'; ?>
                </script>
            </tr>
            <tr>
                <td id="title">タイトル：</td>
                <script>
                    var input = document.getElementById("title");
                    input.innerText += <?php echo '"' . $title . '"'; ?>
                </script>
            </tr>
            <tr>
                <td id="publish">出版日：</td>
                <script>
                    var input = document.getElementById("publish");
                    input.innerText += <?php echo '"' . $publish . '"'; ?>
                </script>
            </tr>
            <tr>
                <td id="description">書籍説明：</td>
                <script>
                    var input = document.getElementById("description");
                    input.innerText += <?php echo '"' . $description . '"'; ?>
                </script>
            </tr>
        </table><br>
        <a href="top.php">ホームヘ</a>
    </body>
</html>