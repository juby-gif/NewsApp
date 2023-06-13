# Base image
FROM php:8.1-fpm

# Set the working directory
WORKDIR /app/news-aggregator-backend

# Install dependencies
RUN apt-get update \
    && apt-get install -y \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    git

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath opcache zip

# Install Composer
COPY --from=composer:2.1 /usr/bin/composer /usr/bin/composer

# Copy project files
COPY . .

# Install composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --optimize-autoloader --no-dev

# Set up permissions
RUN chown -R www-data:www-data storage bootstrap/cache

# Generate application key
RUN php artisan key:generate

# Expose port 8000
EXPOSE 8000

# Set the command to run the application
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0
