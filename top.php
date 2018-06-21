<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>AharaBook</title>
    <link rel="stylesheet" href="CSS/book_style.css">
</head>

<body>
    <CENTER>
    <h1>AharaBook</h1>
    <input type="button" value="本棚ページ" onClick="location.href='book_shelf.php'">
    <input type="button" value="書籍登録ページ" onClick="location.href='book_registor.html'"
    <br>
    <form action="book_search_result.php" method="get">
        書籍検索
        <input type="text" name="book_search"> <br>
        タグ検索
        <input type="text" name="tag_search"><br>
        <input type="submit" value="検索">
    </form>
    <span id="news_feed"><h2 id="news_feed">☆新着書籍☆</h2></span>
    <?php
    $pdo = new PDO('sqlite:SQL/bookdata.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $info = $pdo->prepare("SELECT * FROM add_information where ID >= ?");
    $info->execute([0]);

    foreach ($info as $i) {
        echo '<div class = box1>';
        echo '<h3 id="day">' . htmlspecialchars($i['day']) . '</h3>';
        echo '<h3>' . htmlspecialchars($i['title']) . '</h3>' ;
        echo '(作:' . htmlspecialchars($i['author']) . ',';
        echo '本棚番号:' . htmlspecialchars($i['bookshelfID']) . ')';
        echo '</div>';
    }
    ?>
    </CENTER>
</body>

</html>