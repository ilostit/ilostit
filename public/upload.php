<?php
const DIRECTORY_SEPARATOR = '/';

$ds = DIRECTORY_SEPARATOR;
$storeFolder = 'uploads';

if (!empty($_FILES)) {

    $tempFile = $_FILES['file']['tmp_name'];

    $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;

    $targetFile =  $targetPath. $_FILES['file']['name'];

    readwritefile_chunked($tempFile, $targetFile);
}

function readwritefile_chunked($src_name, $des_name){
    $handle_open = fopen($src_name, 'rb');
    $handle_write = fopen($des_name, 'a');
    if($handle_open === false || $handle_write === false){
        return false;
    }

    $chunksize = 1*(512*1024); // how many bytes per chunk
    while (!feof($handle_open)) {
            $buffer = fread($handle_open, $chunksize);
            fwrite($handle_write, $buffer);
    }

    fclose($handle_open);
    fclose($handle_write);
}
?>