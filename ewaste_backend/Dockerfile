# Use Eclipse Temurin 17 image as the base image for building your project
FROM eclipse-temurin:17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml and the source code into the container
COPY pom.xml /app/
COPY src /app/src

# Copy the Maven Wrapper script into the container
COPY .mvn /app/.mvn
COPY mvnw /app/

# Run Maven to build the project and create the .jar file
RUN ./mvnw clean package -DskipTests

# Use Eclipse Temurin 17 image for runtime (without slim)
FROM eclipse-temurin:17-jre

# Set the working directory in the container
WORKDIR /app

# Copy the .jar file from the build stage
COPY --from=build /app/target/ewaste-backend-0.0.1-SNAPSHOT.jar /app/ewaste-backend.jar

# Expose the port that Spring Boot is running on (default is 8080)
EXPOSE 8080

# Command to run the Spring Boot application
CMD ["java", "-jar", "/app/ewaste-backend.jar"]