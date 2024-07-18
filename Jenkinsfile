pipeline {
    // agent any
    agent {
        docker { image 'node:18-alpine' } 
    }
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
                // Ensure Docker is available
                sh 'docker --version'
                sh 'docker-compose --version'
                
                // Build and run the Docker image using docker-compose
                sh 'docker build -t react-vite-app .'
                sh 'docker-compose --env-file .env.prod up -d'
            }
        }
    }
}