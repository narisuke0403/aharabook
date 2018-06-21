<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="UTF-8">
        <title>book_shelf</title>
        <link rel="stylesheet" href="CSS/book_style.css">
        <style>
            canvas {
                border-style: solid;
                border-color: red;
            }
        </style>
        <?php
        $pdo = new PDO('sqlite:SQL/bookdata.sqlite');
        //$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        if (isset($_GET["length"])) {
            $length = $_GET["length"];
        } else {
            $length = 0;
        }
        for ($i = 0; $i < $length; $i++) {
            if ($pdo->query("select count(*) from bookshelf where bookshelfID=" . $_GET["id" . $i])->fetchColumn() > 0) {
                $add = $pdo->prepare("update bookshelf set positionX = ?,positionY = ?,count=? where bookshelfID=" . $_GET["id" . $i]);
                $add->execute([$_GET["posX" . $i], $_GET["posY" . $i], $_GET["rotate".$i]]);
            } else {
                $add = $pdo->prepare("insert into bookshelf values(?,?,?,?)");
                $add->execute([$_GET["id" . $i], $_GET["posX" . $i], $_GET["posY" . $i], $_GET["rotate".$i]]);
            }
        }
        ?>
    </head>
    
    <body>
    <CENTER>
        <a href="top.php">戻る</a><br>
        <h2>本棚ページ</h2><br>
        <canvas id="canvas_1"></canvas>
        <script src="Canvas/control_bookshelf.js"></script>
        <input type="button" value="編集" onclick="change()">
        <form id="base" action="book_shelf.php" method = "get"></form>
        </CENTER>
    </body>
</html>