<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="UTF-8">
        <title>book_submit_complete</title>
        <link rel="stylesheet" href="CSS/book_style.css">
        <?php
        $pdo = new PDO('sqlite:SQL/bookdata.sqlite');
        $num = $pdo->query('select count(*) from bookdata')->fetchColumn();
        $add_num = $pdo->query('select * from add_information')->fetchColumn();
        $book_title = $_GET["book_title"];
        $book_writer = $_GET["book_writer"];
        $book_tag = $_GET["book_tag"];
        $book_day = $_GET["book_day"];
        $book_description = $_GET["book_description"];
        $book_number = $_GET["book_number"];
        $ISBN = $_GET["ISBN"];
        $bookshelfID = $_GET["bookshelfID"];
        $book_info = $pdo->prepare("insert into bookdata values(?,?,?,?,?,?,?,?)");
        $add_info =$pdo->prepare("insert into add_information values(?,?,?,?,?,?)");
        $book_info->execute([$num+1,$ISBN,$book_title,$book_writer,$book_day,$book_description,$book_tag, $bookshelfID]);
        $add_info->execute([$add_num+1, date("m.d.y"), $num + 1, $bookshelfID, $book_title, $book_writer]);
        ?>
    </head>
    <body>
        登録が完了しました<br><br>
        <a href="top.php">ホームヘ</a>
    </body>
</html>