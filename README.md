# Стартовый проект Wordpress + Jade + Stylus
## Разметка
Сборка .jade шаблонов осуществляется с помощью [gulp-jade-php](https://www.npmjs.com/package/gulp-jade-php), который работает на основе [php-jade](https://www.npmjs.com/package/phpjade)

## Команды для запуска

### Запуск с отслеживанием изменений
```
npm start
```

### Создание нового блока
Для создания нескольких блоков, названия нужно указывать через пробел.
```
npm run make-block [имя-блока] [имя-блока]
```

### Сборка в папку `dist`
```
npm run build
```

### Production cборка в папку `dist`
```
npm run production
```

### Локальный сервер на другом порте
```
PORT=9000 npm start
```

### Уведомления об ошибках `ESLint`
```
NOTIFY=true npm start
```

### Расшарить локальный сервер
```
TUNNEL=true npm start
```

### Открыть ссылку в браузере по умолчанию
```
OPEN=true npm start
```

### Собрать архив из папки `dist`
```
npm run zip
```

### Очистка папки `dist`
```
npm run clean
```

### Деплой всего содержимого папки `dist` в ветку `dist`
```
npm run deploy
```
## Мультиязычность
```
В tasks/i18n.js указать имена файлов с переводами в формате {[код языка](https://www.gnu.org/savannah-checkouts/gnu/gettext/manual/gettext.html#Language-Codes)}_{[код страны](https://www.gnu.org/savannah-checkouts/gnu/gettext/manual/gettext.html#Country-Codes)}. Например: 'ru_RU','en_GB' и т.п.
Файлы с переводом в сборке лежат в папке languages.
```
