# Этап сборки
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем все файлы проекта
COPY . .

# Устанавливаем зависимости
RUN npm install

# Проверяем наличие файлов
RUN ls -la public/
RUN cat public/index.html

# Собираем приложение
RUN npm run build

# Этап production
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 