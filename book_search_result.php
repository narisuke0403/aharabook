<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>book_search_result</title>
    <link rel="stylesheet" href="CSS/book_style.css">
    <?php
    if(isset($_GET["book_search"])) $title = $_GET["book_search"];
    if (isset($_GET["tag_search"])) $tag = $_GET["tag_search"];
    if (isset($_GET["bookshelf"])) $bookshelf = (int)$_GET["bookshelf"];
    ?>
</head>

<body>
    <CENTER>
    <form action="book_search_result.php" method="GET">
        <p>書籍検索
            <input type="text" name="book_search" id="book_search">
            <script>
                var input = document.getElementById("book_search");
                input.value = <?php echo '"' . $title . '"' ?>;
            </script>
        </p>
        <p>タグ検索
            <input type="text" name="tag_search" id="tag_search">
            <script>
                var input = document.getElementById("tag_search");
                input.value = <?php echo '"' . $tag . '"' ?>;
            </script>
        </p>
        <input type ="submit" value="検索">
    </form>
    <div id="research_home"></div>
    <?php
    include 'Include_PHP/controlDB.php';
    if (isset($_GET["book_search"])) {
        $result = search_title($title);
    } elseif (isset($_GET["tag"])) {
        $result = search_tag($tag);
    } elseif(isset($_GET["bookshelf"])){
        $result = search_bookshelf($bookshelf);
    }
    echo '<div class = box1>';
    echo '<h3 id="day">検索結果</h3>';
    echo '<table>';
    echo '<tr>';
    echo '<td>タイトル</td>';
    echo '<td>作者</td>';
    echo '<td>発行年</td>';
    echo '<td></td>';
    echo '</tr>';
    echo '</div>';
    foreach ($result->fetchAll() as $row) {
        $url = "book_info.php?title=". $row['title']."&author=". $row['author']."&publish=". $row['publish']. "&description=".$row["description"];
        $url = "book_info.php?id=".$row['bookID'];
        echo '<tr>';
        echo '<td>' . htmlspecialchars($row['title']) . '</td>';
        echo '<td>' . htmlspecialchars($row['author']) . '</td>';
        echo '<td>' . htmlspecialchars($row['publish']) . '</td>';
        echo '<td><a href="' . $url . '">詳細</a></td>';
        echo '</tr>';
    }
    echo '</table>';
    ?>
    <br>
    <a href="top.php">ホームヘ</a>
    </CENTER>
</body>

</html>