**# JobHub**
JobHub is a web application designed to help users find and post job opportunities efficiently. It features a user-friendly interface with pages for browsing jobs, posting new job listings, and managing dashboards.

**# Features**
- Browse available job listings  
- Post new job opportunities (via 'post-job.html')  
- User dashboard to track activities  
- Responsive design with clean UI  
- Dockerized for easy containerized deployment  
- CI/CD pipeline setup using GitHub Actions  
- Deployed using Render  

**# Technologies Used**
- HTML5  
- CSS3  
- JavaScript  
- Docker  
- Git & GitHub for version control  
- GitHub Actions for CI/CD  
- Render for deployment  

**# Project Structure**

**JobHub**
- /index.html         # Home page  
- /dashboard.html     # User dashboard  
- /jobs.html          # Job listings page  
- /post-job.html      # Job posting page  
- /styles.css         # Stylesheet  
- /script.js          # JavaScript functionality  
- /Dockerfile         # Docker configuration  
- /.github/workflows/deploy.yml   # GitHub Actions workflow  

**# How to Run Locally with Docker**
1. Clone the repository:  
   `git clone https://github.com/LeelasriBalkampet/JobHub.git`

2. Navigate to the project directory:  
   `cd JobHub`

3. Build the Docker image:  
   `docker build -t jobhub .`

4. Run the Docker container:  
   `docker run -p 8080:80 jobhub`

5. Open your browser and go to:  
   `http://localhost:8080`

**# Live Demo**

- GitHub Pages (Static): **https://leelasribalkampet.github.io/JobHub/**  
- Render Deployment (DevOps): **https://jobhub-kc82.onrender.com**

**# Contribution**
Contributions are welcome! If you want to improve this project:
1. Fork the repository  
2. Create a new branch (`git checkout -b feature-name`)  
3. Make your changes and commit (`git commit -m 'Add some feature'`)  
4. Push to the branch (`git push origin feature-name`)  
5. Open a pull request
