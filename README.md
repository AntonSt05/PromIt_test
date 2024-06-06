# Конвертер Валют

Это простое приложение для конвертации валют, созданное с использованием React, TypeScript и SCSS. Приложение позволяет пользователям конвертировать суммы между различными валютами с использованием актуальных курсов валют, получаемых через API ExchangeRate-API.

## Возможности

- Конвертация сумм между различными валютами.
- Обмен местами базовой и целевой валют.
- Адаптивный дизайн.
- Курсы валют обновляются раз в час для оптимизации запросов и соблюдения ограничений бесплатного API.

## Начало работы

### Предварительные требования

Перед началом убедитесь, что у вас установлены следующие компоненты:

- Node.js и npm.
- Бесплатный API ключ от [ExchangeRate-API](https://www.exchangerate-api.com/).

### Установка

1. Клонируйте репозиторий

2. Установите зависимости

    ```sh
    npm install
    ```


3. Запустите сервер разработки:

    ```sh
    npm run dev
    ```

4. Откройте браузер и перейдите по адресу `http://127.0.0.1:5173/`.

## Использование

1. Введите сумму в поле ввода.
2. Выберите базовую валюту из выпадающего списка.
3. Выберите целевую валюту из выпадающего списка.
4. Конвертированная сумма отобразится во втором поле ввода.
5. Используйте кнопку обмена для смены базовой и целевой валют.

## Используемые технологии

- React
- TypeScript
- SCSS
- ExchangeRate-API

## Заметки

- Курсы валют обновляются раз в час для оптимизации запросов и соблюдения ограничений бесплатного API.
- Приложение использует кешированные данные для всех последующих вычислений после первоначального запроса к API.