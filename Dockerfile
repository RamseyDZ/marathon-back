# Application Docker file Configuration
# Visit https://docs.docker.com/engine/reference/builder/
# Using multi stage build

# Prepare the image when build
# also use to minimize the docker image
FROM node:18.19-alpine as builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./
RUN npm install
COPY . .
RUN npm run build


# Build the image as production
# So we can minimize the size
# FROM node:18.19-alpine
FROM node:18.19-alpine

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
ENV PORT=4000
ENV NODE_ENV=Developpment
RUN npm install
COPY --from=builder /app/dist ./dist
EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]