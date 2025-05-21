FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install tailwindcss-animate daisyui --save-dev

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 