# Inštalácia aplikácie:

Systémové požiadavky pre lokálne spustenie:

- mysql s minimálnou verziou 8.1.0
- PHP s minimálnou verziou 8.2.11
- npm s minimálnou verziou 10.2.5
- node s minimálnou verziou 20.8.1

## Spustenie aplikácie:

Pre spustenie aplikácie je nutné mať lokálne spustenú databázu mysql, v ktorej je vytvorená databáza iotdatabse a užívateľ 'localhost'@'iot-manager' s heslom 'pwd' a právami pre databázu iotdatabase.

Pre vytvorenie databázy je potom možné použiť script <code>iotdatabase.sql</code>
Ďalej je databázový server nutné spustiť.

Potom pre spustenie aplikácie je použiť priložený script <code>install.sh</code>
