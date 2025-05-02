#FROM openjdk:21
FROM eclipse-temurin:21-jdk

WORKDIR /user-service

COPY target/user-service-0.0.1-SNAPSHOT.jar /user-service/user-service.jar

EXPOSE 8081

CMD ["java", "-jar", "user-service.jar"]


#LABEL authors="likhitha"

#ENTRYPOINT ["top", "-b"]