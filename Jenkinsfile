pipeline {
    agent any
    stages {
        stage("Setup") {
            steps {
                sh "lerna bootstrap"
            }
        }
        stage("Unit Test") {
            steps {
                sh "lerna run test:unit"
            }
        }
    }
}