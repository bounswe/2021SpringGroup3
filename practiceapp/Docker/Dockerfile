FROM openjdk:11
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} practiceapp.jar
ENTRYPOINT ["java","-jar","practiceapp.jar"]
ADD ./practiceapp .