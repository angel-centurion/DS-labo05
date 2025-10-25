Para poder inicializar el programa debemos primero compilar el archivo en springboot:
mvn compile

luego corremos el backend en springboot:
mvn spring-boot:run

luego tenemos que habilitar otro puerto para el frontend, aunque tambien se puede inicializar otro
servidor con python (como se hizo en esta instancia):

py -m http.server 3000
