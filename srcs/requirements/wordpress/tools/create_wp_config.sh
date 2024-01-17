#!/bin/bash

config_file="/var/www/html/wp-config.php"

# Check if wp-config.php already exists
if [ -e "$config_file" ]; then
  echo "wp-config.php already exists. Starting php-fpm7.4."
  exec "$@"
fi

# Create wp-config.php with redis-cache plugin
cat <<EOF > $config_file
<?php
define('DB_NAME', '$MYSQL_DATABASE');
define('DB_USER', '$MYSQL_USER');
define('DB_PASSWORD', '$MYSQL_PASSWORD');
define('DB_HOST', '$MYSQL_HOSTNAME');
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');

define( 'WP_REDIS_HOST', 'redis' );
define( 'WP_REDIS_PORT', 6379 );
define( 'WP_REDIS_PREFIX', 'redincept' );
define( 'WP_REDIS_DATABASE', 0 ); // 0-15
define( 'WP_REDIS_TIMEOUT', 1 );
define( 'WP_REDIS_READ_TIMEOUT', 1 );

\$table_prefix = 'wp_';
define('WPLANG', '');
if ( !defined('ABSPATH') )
  define('ABSPATH', dirname(__FILE__) . '/');
require_once(ABSPATH . 'wp-settings.php');
EOF

echo "wp-config.php successfully created. Starting php-fpm7.4."
exec "$@"
