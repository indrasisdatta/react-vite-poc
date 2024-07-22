pipeline {
    agent any
    stages {
        stage('Build image') {
            steps {                
                // Build the Docker image using the Dockerfile in the repository
                sh 'docker build -t react-vite-app .'
                // sh 'docker-compose --env-file .env.prod up -d'
            }
        }
        stage('Install') {
            steps {
                echo 'Install npm packages...'
                sh 'docker run --rm react-vite-app  npm install'
            }
        }
        // stage ('Test') {
        //     steps {
        //         echo 'Run unit tests...'
        //         sh 'npm run test-check:unit'
        //         echo 'Run integration tests...'
        //         sh 'npm run test-check:integration'
        //     }
        // }
        // stage('Build') {
        //     steps {
        //         sh 'npm run build'
        //     }
        // }       
    }
}