pipeline {
    agent any
    stages {
        stage('Build') {
            agent {
                docker { image 'node:16-alpine' }
            }
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