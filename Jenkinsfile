pipeline {
    agent any
    stages {
        stage('Install') {
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
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Build image') {
            steps {
                sh 'docker-compose --env-file .env.prod up -d'
            }
        }
    }
}