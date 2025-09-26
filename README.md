# ClickHouse - Demostración de uso
## Manual de usuario 

Los comandos descritos en este manual han sido verificados en un entorno basado en Ubuntu 20.04 LTS. Si bien se espera un comportamiento equivalente en otras distribuciones, pueden existir variaciones en sintaxis o dependencias requeridas.

## Instalación de Docker (y Docker Compose):
Para la instalación de la base de datos, se recomienda tener instalado el el equipo Docker. Para este caso de uso, se utilizó la versión 28.1.1. Ver la guía oficial de instalación de docker en https://docs.docker.com/engine/install/. 

En Ubuntu, para verificar que Docker se encuentre activo en el equipo, se puede usar el comando:
``` bash
$ sudo systemctl status docker
```

En caso de que sea necesario iniciar Docker, utilizar: 
``` bash
$ sudo systemctl start docker
```


## Configuración y ejecución de los contenedores con Docker Compose
Se utilizó la versión de Clickhouse 25.8.4.13-jammy (documentación en en https://hub.docker.com/_/clickhouse). A modo de interfaz gráfica, se utilizó el cliente web Tabix (documentación en https://hub.docker.com/r/spoonest/clickhouse-tabix-web-client). Para la construcción de la API, se usó Node.js 18 (documentación correspondiente en https://hub.docker.com/_/node). 

En lugar de instanciar manualmente los contenedores, se utilizó Docker Compose. Desde el directorio principal (carpeta donde se localiza el archivo docker-compose.yml), se debe ejecutar el comando:
``` bash
$ sudo docker compose up -d
```

El paso anterior levanta ClickHouse en el puerto 8123 (http://localhost:8123/),  Tabix en el puerto 8080 (http://localhost:8080/), y el servidor correspondiente a la API en el puerto 3001 (http://localhost:3001/). 

Para conectarse desde Tabix  a ClickHouse, se debe utilizar la siguiente configuración:
- host:port: http://clickhouse:8123 
- Login: user
- Password: 123

Si se prefiere, se puede utilizar la terminal incluida en el servidor de ClickHouse. Para esto, ingresar a http://clickhouse:8123, seleccionar la opción “Web SQL UI” y  realizar las consultas utilizando las credenciales anteriores. 

Si se quiere detener los contenedores, utilizar:
``` bash
$ sudo docker compose down 
```

## Ejemplos de uso
En la carpeta `ClickHouse_SQL`, se encuentran las consultas necesarias para poblar la base de datos con datos que simulan un sistema simple de facturación para un restaurante. Con estas consultas se pueden ejemplificar las principales diferencias entre el funcionamiento de ClickHouse y una base de datos SQL, las cuales están principalmente diseñadas para el manejo de transacciones y el cumplimiento de ACID. 

Asimismo, en la carpeta `DemoPostman` se encuentran ejemplos de consultas que se le pueden realizar a la API REST mediante Postman (u otro software similar) para los casos bases de GET, PUT, PATCH y DELETE,. 

 
