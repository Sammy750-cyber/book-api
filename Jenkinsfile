pipeline{
    agent any

    environment {
        CI_NETWORK = "book-api-ci-network"
        POSTGRES_CONTAINER = "book-api-postgres"
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
                    docker network create ${CI_NETWORK} 2>/dev/null || true
                '''
            }
        }

        stage('Start PostgreSQL') {
            steps {
                sh '''
                    docker rm -f ${POSTGRES_CONTAINER} 2>/dev/null || true

                    docker run -d \
                      --name ${POSTGRES_CONTAINER} \
                      --network ${CI_NETWORK} \
                      -e POSTGRES_DB=book_api_test \
                      -e POSTGRES_USER=postgres \
                      -e POSTGRES_PASSWORD=postgres \
                      postgres:16
                '''
            }
        }

        stage('Wait for PostgreSQL') {
            steps {
                sh '''
                    echo "Waiting for PostgreSQL..."

                    until docker exec ${CI_NETWORK} pg_isready \
                        -U postgres \
                        -d book_api_test; do
                        sleep 2
                    done
                '''
            }
        }

        stage("install dependencies"){
            agent{
                docker{
                    image 'node:20-bookworm'
                    reuseNode true
                }
            }
            steps{
                echo "Installing dependencies..."
                sh "npm ci"
            }
        }

        stage("run lint"){
            agent{
                docker{
                    image 'node:20-bookworm'
                    reuseNode true
                }
            }
            steps{
                echo "Running linter..."
                sh "npm run lint"
            }
        }

        stage("run typecheck"){
            agent{
                docker{
                    image 'node:20-bookworm'
                    reuseNode true
                }
            }
            steps{
                echo "Running typecheck"
                sh "npm run typecheck"
            }
        }

        stage("Run test"){
            agent{
                docker{
                    image 'node:20-bookworm'
                    reuseNode true
                }
            }

             environment {
                DB_HOST = 'book-api-postgres'
                DB_PORT = '5432'
                DB_NAME_TEST = 'book_api_test'
                DB_USER = 'postgres'
                DB_PASSWORD = 'postgres'
            }
            steps{
                echo "Running test"
                sh "npm test"
            }
        }
    }

    post{
        success{
            echo "CI pipeline completed successfully."
        }

        failure{
            echo "CI pipeline failed. Check the stage log."
        }

        always{
            sh '''
                docker rm -f ${POSTGRES_CONTAINER} 2>/dev/null || true
                docker network rm ${CI_NETWORK} 2>/dev/null || true
            '''
        }
    }
}