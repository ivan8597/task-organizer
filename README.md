







# Task Organizer

Приложение для организации задач на React с TypeScript.

## Установка и запуск

### Локальная разработка

1. Клонировать репозиторий:
```bash
git clone https://github.com/ivan8597/task-organizer.git
cd task-organizer
```

2. Установить зависимости:
```bash
npm install
```

3. Подключить шрифт Roboto в `public/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600&display=swap" rel="stylesheet">
```

4. Запустить приложение:
```bash
npm start
```

Приложение будет доступно по адресу: http://localhost:3000

### Docker

1. Запуск через Docker Compose:
```bash
docker-compose up --build
```

2. Остановка контейнеров:
```bash
docker-compose down
```

## Тестирование

```bash
npm test
```

## Storybook

```bash
npm run storybook
```

Storybook доступен по адресу: http://localhost:6006

## Технологии

- React + TypeScript
- React Query для управления состоянием
- Jest для тестирования
- Storybook для документации компонентов
- Docker для контейнеризации
- CSS для стилизации (с использованием Roboto font)

## Структура проекта

```
task-organizer/
├── src/
│   ├── styles/
│   │   └── App.css          # Стили приложения
│   ├── stories/
│   │   └── App.stories.tsx  # Истории Storybook
│   ├── __mocks__/
│   │   └── api.ts          # Моки для тестов
│   ├── App.tsx             # Основной компонент
│   ├── App.test.tsx        # Тесты
│   └── setupTests.ts       # Настройка тестов
├── public/
│   └── index.html          # HTML шаблон
├── .storybook/            # Конфигурация Storybook
├── docker-compose.yml     # Docker Compose конфигурация
├── Dockerfile             # Docker конфигурация
├── jest.config.js         # Конфигурация Jest
└── README.md
```

## Доступные скрипты

- `npm start` - запуск в режиме разработки
- `npm test` - запуск тестов
- `npm run build` - сборка проекта
- `npm run storybook` - запуск Storybook
- `npm run build-storybook` - сборка Storybook

## Лицензия

MIT
```
