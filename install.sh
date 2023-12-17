#!/bin/bash

(cd iot-manager-view && npm install);

(cd iot-manager-view && npm start) &
(cd backend &&  php -S 127.0.0.1:8000 api.php)

