#!/bin/bash
BUILD_JAR=$(ls /home/ubuntu/action/server/danim/build/libs/danim-0.0.1-SNAPSHOT.jar)
JAR_NAME=$(basename $BUILD_JAR)

RDB_URL=$(env | grep RDS_URL | cut -c 9-59)
RDS_USERNAME=$(env | grep RDS_USERNAME | cut -c 14-20)
RDS_PASSWORD=$(env | grep RDS_PASSWORD | cut -c 14-25)
RDS_PORT=$(env | grep RDS_PORT | cut -c 10-13)
BUCKET_NAME=$(env | grep BUCKET_NAME | cut -c 13-27)
AWS_ACCESS_KEY=$(env | grep AWS_ACCESS_KEY | cut -c 16-35)
AWS_SECRET_ACCESS_KEY=$(env | grep AWS_SECRET_ACCESS_KEY | cut -c 23-62)
JWT_SECRET_KEY=$(env | grep JWT_SECRET_KEY | cut -c 16-77)
echo "> $RDS_URL" >> /home/ubuntu/action/scripts/deploy.log
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
sudo nohup java -jar $BUILD_JAR --RDS_URL=${RDS_URL} --RDS_USERNAME=${RDS_USERNAME} --RDS_PASSWORD=${RDS_PASSWORD} --RDS_PORT=${RDS_PORT} --AWS_ACCESS_KEY=${AWS_ACCESS_KEY} --AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} --BUCKET_NAME=${BUCKET_NAME} --JWT_SECRET_KEY=${JWT_SECRET_KEY} &
