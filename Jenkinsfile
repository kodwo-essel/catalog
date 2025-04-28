pipeline {
    agent any

    environment {
        IMAGE_NAME = "disaster-recover-frontend"
        DOCKER_REGISTRY = "docker.io"
        DOCKER_REPO = "kodwoessel"
        DOCKER_TAG = "latest"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/kodwo-essel/catalog.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js dependencies
                    sh 'npm ci'  // Ensure clean installation
                }
            }
        }

        stage('Lint Code') {
            steps {
                script {
                    // Run ESLint to lint the code
                    sh 'npm run lint'
                }
            }
        }

        stage('Build Vite App') {
            steps {
                script {
                    // Run the build script defined in package.json
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image using the Dockerfile in the repo
                    sh "docker build -t ${DOCKER_REGISTRY}/${DOCKER_REPO}/${IMAGE_NAME}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Use Jenkins credentials to log in to Docker
                    withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        // Log in to Docker registry
                        sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                        
                        // Push the Docker image to the registry
                        sh "docker push ${DOCKER_REGISTRY}/${DOCKER_REPO}/${IMAGE_NAME}:${DOCKER_TAG}"
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}
