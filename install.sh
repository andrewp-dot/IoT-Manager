#!/bin/bash

(cd iot-manager-view && npm install);

(cd WWW/iot-manager && npm start) &
php -S 127.0.0.1:8000 -t backend/api.php
