pipeline{
    agent{
        docker{
            image 'node:20-bookworm'
            reuseNode true
        }
    }

    stages{
        stage("checkout"){
            steps{
                checkout scm
            }
        }

        stage("Node.js CI"){
            steps{
                sh '''docker run --rm "$WORKSPACE:/app" \
            -w /app \
            node:20-bookworm \
            sh -c ' npm run ci &&
            npm run lint &&
            npm run typecheck &&
            npm run test 
            '
            '''
            }
        }
    }

    post{
        success{
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