# Sử dụng môi trường Node.js nhẹ nhất
FROM node:18-alpine AS base
WORKDIR /app

# Copy các file quản lý thư viện vào trước để cài đặt
COPY package.json package-lock.json* ./
RUN npm install

# Copy toàn bộ source code vào
COPY . .

# Build Next.js
RUN npm run build

# Mở cổng 3000 để Google Cloud trỏ traffic vào
EXPOSE 3000
ENV PORT=3000

# Lệnh chạy app khi đưa lên Cloud
CMD ["node", ".next/standalone/server.js"]