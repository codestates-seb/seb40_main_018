#!/bin/bash
BUILD_JAR=$(ls /home/ubuntu/action/server/danim/build/libs/danim-0.0.1-SNAPSHOT.jar)
JAR_NAME=$(basename $BUILD_JAR)

AWS_ACCESS_KEY=$(env | grep AWS_ACCESS_KEY | cut -c 16-35)
AWS_SECRET_ACCESS_KEY=$(env | grep AWS_SECRET_ACCESS_KEY | cut -c 23-62)

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
sudo nohup java -jar $BUILD_JAR --cloud.aws.credentials.access-key=${AWS_ACCESS_KEY} --cloud.aws.credentials.secret-key=${AWS_SECRET_ACCESS_KEY} &
