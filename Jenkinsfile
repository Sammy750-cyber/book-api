pipeline{
    agent any

    stages{
        stage("checkout"){
            steps{
                checkout scm
            }
        }

        stage("install dependencies"){
            steps{
                echo "Installing dependencies..."
                sh "npm ci"
            }
        }

        stage("run lint"){
            steps{
                echo "Running linter..."
                sh "npm run lint"
            }
        }

        stage("run typecheck"){
            steps{
                echo "Running typecheck"
                sh "npm run typecheck"
            }
        }

        stage("Run test"){
            steps{
                echo "Running test"
                sh "npm run test"
            }
        }
    }
}