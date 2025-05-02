FROM eclipse-temurin:21-jdk

WORKDIR /taskview-service

COPY target/taskview-service-0.0.1-SNAPSHOT.jar /taskview-service/taskview-service.jar

EXPOSE 8082

CMD ["java", "-jar", "taskview-service.jar"]