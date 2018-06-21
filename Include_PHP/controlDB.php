<?php

function h($str)
{
  return htmlspecialchars($str, ENT_QUOTES, "UTF-8");
}

function search_title($word)
{
  $db = new PDO("sqlite:SQL/bookdata.sqlite");
  //$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  if ($db->query("SELECT count(*) FROM bookdata WHERE title LIKE '%$word%'")->fetchColumn() > 0) {
    $result = $db->query("SELECT * FROM bookdata WHERE title LIKE '%$word%'");
    return $result;
  } else {
    return 0;
  }
}

function search_ISBN($ISBN)
{
  $db = new PDO("sqlite:SQL/bookdata.sqlite");
  //$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  if ($ISBN == $db->query("SELECT ISBN FROM bookdata WHERE ISBN='$ISBN'")->fetchColumn()) {
    return 1;
  } else {
    return 0;
  }
}

function search_tag($word_tag)
{
  $db = new PDO("sqlite:SQL/bookdata.sqlite");
  //$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $tag_s = double_explode(" ", "　", $word_tag);
  for ($i = 0; $i < count($tag_s); $i++) {
    if ($db->query("SELECT count(*) FROM bookdata WHERE tags LIKE '%$word_tag%'")->fetchColumn() > 0) {
      return $result = $db->query("SELECT * FROM bookdata WHERE tags LIKE '%$word_tag%'");
    } else {
      return false;
    }
  }
}

function search_bookshelf($bookshelf)
{
  $db = new PDO("sqlite:SQL/bookdata.sqlite");
  //$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return $db->query(("select * from bookdata where bookshelfID=".$bookshelf));
}

function double_explode($word1, $word2, $str)
{
  $return = array();

    //分割文字その1で文字列を分割
  $array = explode($word1, $str);

    //各配列を分割文字その2で分割して結合していく
  foreach ($array as $value) {
    $return = array_merge($return, explode($word2, $value));
  }
  return $return;
}
?>
