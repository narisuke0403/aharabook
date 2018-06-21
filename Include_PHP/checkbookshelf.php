<?php
$pdo = new PDO('sqlite:../SQL/bookdata.sqlite');
//$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$info = $pdo->query("select * from bookshelf");
header('Content-Type: text/xml');
echo '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
echo '<response>';
echo '<length>' . $pdo->query("select count(*) from bookshelf")->fetchColumn() . '</length>';
foreach ($info as $i) {
    echo "  <id" . $i["bookshelfID"] . ">" . $i["bookshelfID"] . "</id" . $i["bookshelfID"] . ">";
    echo "  <posX" . $i["bookshelfID"] . ">" . $i["positionX"] . "</posX" . $i["bookshelfID"] . ">";
    echo "  <posY" . $i["bookshelfID"] . ">" . $i["positionY"] . "</posY" . $i["bookshelfID"] . ">";
    echo "  <rotate" . $i["bookshelfID"] . ">" . $i["count"] . "</rotate" . $i["bookshelfID"] . ">";
}
echo '</response>';
?>