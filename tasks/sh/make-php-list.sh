# Список всех файлов php для перевода в файл tmp/php-list
rm tmp/php-list
mkdir tmp
find ./dist/ -iname "*.php" > tmp/php-list

