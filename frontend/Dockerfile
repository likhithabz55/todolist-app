FROM node:18-alpine as builder

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Step 2: Serve the build output using `serve`
FROM node:18-alpine

WORKDIR /frontend
RUN npm install -g serve

#ENV REACT_APP_USER_SERVICE_URL=$REACT_APP_USER_SERVICE_URL
#ENV REACT_APP_TASK_SERVICE_URL=$REACT_APP_TASK_SERVICE_URL
# Copy built assets from builder
COPY --from=builder /frontend/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]