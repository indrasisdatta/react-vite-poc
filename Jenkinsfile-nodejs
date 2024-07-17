pipeline {
    agent any
    tools { nodejs "NodeJS" }
    stages {
        stage('Build') {
            steps {
                echo 'Install npm packages...'
                sh 'npm install'
            }
        }
        stage ('Test') {
            steps {
                echo 'Run unit tests...'
                sh 'npm run test-check:unit'
                echo 'Run integration tests...'
                sh 'npm run test-check:integration'
            }
        }
    }
}