pipeline{
    agent{
        docker{
            image: 'node:20-bookworm'
            reuseNode: true
        }
    }

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

    post{
        succes{
            echo "CI pipeline completed succefully."
        }

        failure{
            echo "CI pipeline failed. Check the stage log."
        }

        always{
            echo "CI pipeline execution completed."
        }
    }
}