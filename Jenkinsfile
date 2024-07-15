pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Install npm packages...'
                sh 'npm install'
            }
        }
        stage ('Test') {
            steps {
                echo 'Test'
            }
        }
    }
}