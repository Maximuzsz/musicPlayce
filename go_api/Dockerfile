# Estágio 1: Builder
FROM golang:1.24-alpine AS builder
WORKDIR /app

COPY go.mod go.sum ./
COPY vendor ./vendor
COPY . .

# Instala swag
RUN go install github.com/swaggo/swag/cmd/swag@latest

# Gera a pasta docs
RUN swag init -g main.go -o ./docs

# Compila
RUN CGO_ENABLED=0 go build -mod=vendor -o /server .

# Estágio 2: Final
FROM alpine:latest
COPY --from=builder /server /server
COPY --from=builder /app/docs /docs
EXPOSE 8081
CMD ["/server"]
