FROM tmt-web-base as builder
RUN mkdir /opt/app -p
WORKDIR /opt/app

# 拷贝代码
COPY . .

# 编译vue
RUN npm install && npm run build

FROM nginx:1.17

RUN mkdir /opt/app -p
WORKDIR /opt/app

# 拷贝node生产的静态文件
COPY --from=builder /opt/app/dist /opt/app/dist
COPY --from=builder /opt/app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
