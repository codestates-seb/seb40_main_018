#!/bin/bash
BUILD_JAR=$(ls /home/ubuntu/action/server/danim/build/libs/danim-0.0.1-SNAPSHOT.jar)
JAR_NAME=$(basename $BUILD_JAR)

RDS_FORTH=jdbc:mysql://
RDS_BACK=/danim?useSSL=false&characterEncoding=UTF-8&serverTimezone=UTC&reconnect=true
DB_URL=$(env | grep RDS_URL | cut -c 9-59)
HALF_URL=$RDS_FORTH$DB_URL
RDS_URL=$HALF_URL$RDS_BACK

RDS_USERNAME=$(env | grep RDS_USERNAME | cut -c 14-20)
RDS_PASSWORD=$(env | grep RDS_PASSWORD | cut -c 14-25)
RDS_PORT=$(env | grep RDS_PORT | cut -c 10-13)
BUCKET_NAME=$(env | grep BUCKET_NAME | cut -c 13-27)
AWS_ACCESS_KEY=$(env | grep AWS_ACCESS_KEY | cut -c 16-35)
AWS_SECRET_ACCESS_KEY=$(env | grep AWS_SECRET_ACCESS_KEY | cut -c 23-62)
JWT_SECRET_KEY=$(env | grep JWT_SECRET_KEY | cut -c 16-77)

echo "> 현재 시간: $(date)" >> /home/ubuntu/action/deploy.log

echo "> build 파일명: $JAR_NAME" >> /home/ubuntu/action/deploy.log

echo "> 현재 실행중인 애플리케이션 pid 확인" >> /home/ubuntu/action/deploy.log
CURRENT_PID=$(pgrep -f $JAR_NAME)

if [ -z $CURRENT_PID ]
then
  echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다." >> /home/ubuntu/action/deploy.log
else
  echo "> kill -9 $CURRENT_PID" >> /home/ubuntu/action/deploy.log
  sudo kill -9 $CURRENT_PID
  sleep 5
fi

echo "> DEPLOY_JAR 배포 $BUILD_JAR"    >> /home/ubuntu/action/deploy.log
sudo nohup java -jar $BUILD_JAR --srping.datasource.url=${RDS_URL} --spring.datasource.username=${RDS_USERNAME} --spring.datasource.password=${RDS_PASSWORD} --spring.datasource.port=${RDS_PORT} --cloud.aws.credentials.access-key=${AWS_ACCESS_KEY} --cloud.aws.credentials.secret-key=${AWS_SECRET_ACCESS_KEY} --cloud.aws.s3.bucket=${BUCKET_NAME} --jwt.secret-key=${JWT_SECRET_KEY} &
