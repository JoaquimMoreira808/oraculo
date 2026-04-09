docker-compose.yml:

services:
  app:
    build: .
    container_name: omni-integration
    ports:
      - "8004:80"
    restart: unless-stopped
    env_file:
      - ./panel/.env
    depends_on:
      - redis

  redis:
    image: redis:alpine
    container_name: omni-integration-redis
    restart: unless-stopped


dockerfile:

FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    git \
    curl \
    libzip-dev \
    && docker-php-ext-install zip pdo pdo_mysql mysqli \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

# Apache configuration
COPY docker/000-default.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

WORKDIR /var/www/html
COPY ./panel .

RUN composer install --no-dev --optimize-autoloader

# Setup logs and permissions
RUN chown -R www-data:www-data storage bootstrap/cache vendor \
    && chmod -R 775 storage bootstrap/cache vendor

EXPOSE 80

CMD ["apache2-foreground"]
    