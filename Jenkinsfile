pipeline {
    agent {
        docker { image 'node:20.15.1-alpine3.20' }
    }
    stages {
        stage('Build') {
            steps {
                echo 'Install npm packages...'
                sh 'npm install'
            }
        }
        stage ('Test') {
            steps {
                echo 'Test stage'
            }
        }
    }
}