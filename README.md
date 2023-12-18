# Inštalácia aplikácie:

Systémové požiadavky pre lokálne spustenie:

- mysql s minimálnou verziou 8.1.0
- PHP s minimálnou verziou 8.2.11
- npm s minimálnou verziou 10.2.5
- node s minimálnou verziou 20.8.1

## Spustenie aplikácie:

Pre lokálne spustenie aplikácie je nutné mať lokálne spustenú databázu mysql, v ktorej je vytvorená databáza iotdatabse a užívateľ 'iot-manager'@'localhost' s heslom 'pwd' a právami pre databázu iotdatabase. Pre vytovernie databázy z príkazovej riadky je potrebné sa príhlasiť do mysql ako root. Po prihlásení je potrebné zadať nasledujúce príkazy:

<code>CREATE USER 'iot-manager'@'localhost' IDENTIFIED BY 'pwd';</code>

A pridať práva na databázu iotdatabase:

<code>GRANT ALL PRIVILEGES ON iotdatabse.\* TO 'iot-manager'@'localhost';</code>

<code>FLUSH PRIVILEGES;</code>

Vytvorenie databázy:

<code>CREATE DATABSE iotdatabase;</code>

Alebo použiť už vytvorený datábazový script
<code>installIotdatabase.sql</code>.

Pre vytvorenie obsahu databázy je potom možné použiť script <code>iotdatabase.sql</code>

Ďalej je databázový server nutné spustiť. Všetky spomenuté databázové scripty sa nachádzajú v zložke <code>backend/database</code>.

<code>mysql -u root -p < backend/database/installIotdatabase.sql</code>

Manuálne spustenie z príkazovej riadky v systémoch typu UNIX (z root zložky projektu):

Webová aplikácia:

Inštalácia node modulov (iba pri prvom spustení)
<code>npm --prefix ./iot-manager-view install ./iot-manager-view</code>

<code>npm --prefix ./iot-manager-view start ./iot-manager-view</code>

Backend api:

<code>(cd backend && php -S 127.0.0.1:8000 api.php)</code>

### Použité knižnice:

React js:
https://react.dev/

Ikony:
https://fontawesome.com/icons

### Licencie:
React js:
https://github.com/facebook/react/blob/main/LICENSE

FontAwesome: https://fontawesome.com/v4/license/
