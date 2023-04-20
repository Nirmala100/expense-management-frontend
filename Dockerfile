FROM node:12.18.1 AS build
ENV NODE_ENV=production 
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM joseluisq/static-web-server:2
COPY --from=build /app/build /app
EXPOSE 6001
CMD ["--port", "6001", "--root", "/app", "--page-fallback", "/app/index.html"]
