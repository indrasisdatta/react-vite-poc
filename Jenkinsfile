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
                echo 'Test stage'
            }
        }
    }
}