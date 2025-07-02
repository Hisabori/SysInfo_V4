// 파일 이름: Jenkinsfile

pipeline {
    // agent any: Jenkins가 가진 아무 작업 머신에서나 실행
    agent any

    // environment: 이 파이프라인 전체에서 사용할 환경 변수 설정
    environment {
        // 우리가 nvm으로 설치한 Node.js의 경로를 알려줘서, Jenkins가 npm, node 명령어를 찾을 수 있게 함
        PATH = "/home/ubuntu/.nvm/versions/node/v22.17.0/bin:${env.PATH}"
    }

    // stages: 작업 단계들의 묶음
    stages {
        // stage: 각각의 작업 단계
        stage('Install Frontend Dependencies') {
            steps {
                // dir: 특정 폴더로 이동해서 다음 명령어를 실행
                dir('frontend') {
                    // sh: 셸 스크립트 명령어 실행
                    sh 'npm install'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        stage('Restart Backend Server') {
            steps {
                dir('backend') {
                    // pm2를 직접 실행. ||는 왼쪽 명령어가 실패하면 오른쪽을 실행하라는 뜻
                    sh './node_modules/.bin/pm2 restart sysinfo-backend || ./node_modules/.bin/pm2 start server.js --name "sysinfo-backend"'
                    sh './node_modules/.bin/pm2 save'
                }
            }
        }
        stage('Restart Nginx') {
            steps {
                // Nginx 재시작은 관리자 권한이 필요
                sh 'sudo systemctl restart nginx'
            }
        }
    }
}