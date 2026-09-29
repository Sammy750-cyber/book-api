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

        stage('Create Test Network') {
            steps {
                sh '''
                    docker network create ci-test-network || true
                '''
            }
        }

        stage('Start PostgreSQL') {
            steps {
                sh '''
                    docker run -d \
                      --name ci-postgres \
                      --network ci-test-network \
                      -e POSTGRES_DB=book_api \
                      -e POSTGRES_USER=postgres \
                      -e POSTGRES_PASSWORD=postgres \
                      postgres:16
                '''
            }
        }

        stage('Wait for PostgreSQL') {
            steps {
                sh '''
                    until docker exec ci-postgres pg_isready \
                        -U testuser \
                        -d testdb; do
                        sleep 2
                    done
                '''
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
                sh '''
                    docker run --rm \
                      --network ci-test-network \
                      -e DB_HOST=ci-postgres \
                      -e DB_PORT=5432 \
                      -e DB_NAME=book_api \
                      -e DB_USER=postgres \
                      -e DB_PASSWORD=postgres \
                      node:20-bookworm \
                      sh -c "
                        npm ci &&
                        npm run test
                      "
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
            sh '''
                docker rm -f ci-postgres || true
                docker network rm ci-test-network || true
            '''
        }
    }
}