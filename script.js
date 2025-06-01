let currentUser = null;
let jobs = [];
let applications = [];
let users = [];
let isLogin = true;
let selectedUserType = 'jobseeker';

document.addEventListener('DOMContentLoaded', function() {
    loadData();
    initializeEventListeners();
    updateUI();
    loadSampleJobs();
});

function loadData() {
    const storedUsers = localStorage.getItem('jobportal_users');
    const storedJobs = localStorage.getItem('jobportal_jobs');
    const storedApplications = localStorage.getItem('jobportal_applications');
    const storedCurrentUser = localStorage.getItem('jobportal_current_user');
    
    users = storedUsers ? JSON.parse(storedUsers) : [];
    jobs = storedJobs ? JSON.parse(storedJobs) : [];
    applications = storedApplications ? JSON.parse(storedApplications) : [];
    currentUser = storedCurrentUser ? JSON.parse(storedCurrentUser) : null;
}

function saveData() {
    localStorage.setItem('jobportal_users', JSON.stringify(users));
    localStorage.setItem('jobportal_jobs', JSON.stringify(jobs));
    localStorage.setItem('jobportal_applications', JSON.stringify(applications));
    localStorage.setItem('jobportal_current_user', JSON.stringify(currentUser));
}

function initializeEventListeners() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const modal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close');
    const authForm = document.getElementById('auth-form');
    const toggleAuth = document.getElementById('toggle-auth');
    const jobseekerBtn = document.getElementById('jobseeker-btn');
    const employerBtn = document.getElementById('employer-btn');
    
    if (loginBtn) loginBtn.addEventListener('click', openLoginModal);
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    if (closeModal) closeModal.addEventListener('click', closeLoginModal);
    if (authForm) authForm.addEventListener('submit', handleAuth);
    if (toggleAuth) toggleAuth.addEventListener('click', toggleAuthMode);
    if (jobseekerBtn) jobseekerBtn.addEventListener('click', () => selectUserType('jobseeker'));
    if (employerBtn) employerBtn.addEventListener('click', () => selectUserType('employer'));
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeLoginModal();
        }
    });
}

function updateUI() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const dashboardLink = document.getElementById('dashboard-link');
    const postJobLink = document.getElementById('post-job-link');
    const heroPostJob = document.getElementById('hero-post-job');
    
    if (currentUser) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
        if (dashboardLink) dashboardLink.style.display = 'inline-block';
        
        if (currentUser.type === 'employer') {
            if (postJobLink) postJobLink.style.display = 'inline-block';
            if (heroPostJob) heroPostJob.style.display = 'inline-block';
        }
    } else {
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (dashboardLink) dashboardLink.style.display = 'none';
        if (postJobLink) postJobLink.style.display = 'none';
        if (heroPostJob) heroPostJob.style.display = 'none';
    }
}

function loadSampleJobs() {
    if (jobs.length === 0) {
        const sampleJobs = [
            {
                id: '1',
                title: 'Senior Frontend Developer',
                company: 'TechCorp Inc.',
                location: 'San Francisco, CA',
                type: 'full-time',
                salary: '$120,000 - $150,000',
                description: 'We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for developing user interface components and implementing them following well-known React.js workflows.',
                requirements: 'React.js, TypeScript, 3+ years experience, HTML5, CSS3, JavaScript ES6+',
                employerId: 'employer1',
                postedAt: new Date().toISOString(),
                category: 'Technology'
            },
            {
                id: '2',
                title: 'Marketing Manager',
                company: 'Growth Digital',
                location: 'New York, NY',
                type: 'full-time',
                salary: '$80,000 - $100,000',
                description: 'Lead marketing initiatives and drive growth strategies. Manage campaigns across multiple channels and analyze performance metrics.',
                requirements: 'Marketing degree, 5+ years experience, Google Analytics, Social Media Marketing',
                employerId: 'employer2',
                postedAt: new Date().toISOString(),
                category: 'Marketing'
            },
            {
                id: '3',
                title: 'UX/UI Designer',
                company: 'Design Studio',
                location: 'Remote',
                type: 'remote',
                salary: '$70,000 - $90,000',
                description: 'Create intuitive and engaging user experiences. Work closely with product teams to design web and mobile applications.',
                requirements: 'Figma, Sketch, User Research, Prototyping, 3+ years experience',
                employerId: 'employer3',
                postedAt: new Date().toISOString(),
                category: 'Design'
            },
            {
                id: '4',
                title: 'Data Scientist',
                company: 'Analytics Pro',
                location: 'Austin, TX',
                type: 'full-time',
                salary: '$110,000 - $140,000',
                description: 'Analyze large datasets to extract insights and build predictive models. Work with machine learning algorithms and statistical analysis.',
                requirements: 'Python, R, SQL, Machine Learning, Statistics, PhD preferred',
                employerId: 'employer4',
                postedAt: new Date().toISOString(),
                category: 'Technology'
            },
            {
                id: '5',
                title: 'Sales Representative',
                company: 'SalesForce Solutions',
                location: 'Chicago, IL',
                type: 'full-time',
                salary: '$50,000 - $70,000 + Commission',
                description: 'Generate new business opportunities and maintain client relationships. Meet and exceed sales targets.',
                requirements: 'Sales experience, CRM software, Communication skills, Goal-oriented',
                employerId: 'employer5',
                postedAt: new Date().toISOString(),
                category: 'Sales'
            }
        ];
        
        jobs = sampleJobs;
        saveData();
    }
}

function openLoginModal() {
    document.getElementById('login-modal').style.display = 'block';
    updateAuthModal();
}

function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
    resetAuthForm();
}

function toggleAuthMode(e) {
    e.preventDefault();
    isLogin = !isLogin;
    updateAuthModal();
}

function selectUserType(type) {
    selectedUserType = type;
    const jobseekerBtn = document.getElementById('jobseeker-btn');
    const employerBtn = document.getElementById('employer-btn');
    
    jobseekerBtn.classList.remove('active');
    employerBtn.classList.remove('active');
    
    if (type === 'jobseeker') {
        jobseekerBtn.classList.add('active');
        document.getElementById('company-field').style.display = 'none';
        document.getElementById('resume-field').style.display = 'block';
    } else {
        employerBtn.classList.add('active');
        document.getElementById('company-field').style.display = 'block';
        document.getElementById('resume-field').style.display = 'none';
    }
}

function updateAuthModal() {
    const modalTitle = document.getElementById('modal-title');
    const userTypeSelector = document.getElementById('user-type-selector');
    const registerFields = document.getElementById('register-fields');
    const authSubmit = document.getElementById('auth-submit');
    const toggleAuth = document.getElementById('toggle-auth');
    
    if (isLogin) {
        modalTitle.textContent = 'Login';
        userTypeSelector.style.display = 'none';
        registerFields.style.display = 'none';
        authSubmit.textContent = 'Login';
        toggleAuth.textContent = 'Need an account? Register';
    } else {
        modalTitle.textContent = 'Register';
        userTypeSelector.style.display = 'flex';
        registerFields.style.display = 'block';
        authSubmit.textContent = 'Register';
        toggleAuth.textContent = 'Already have an account? Login';
        selectUserType(selectedUserType);
    }
}

function resetAuthForm() {
    document.getElementById('auth-form').reset();
    isLogin = true;
    selectedUserType = 'jobseeker';
}

function handleAuth(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (isLogin) {
        const user = users.find(u => u.email === email);
        if (user) {
            currentUser = user;
            saveData();
            updateUI();
            closeLoginModal();
            showNotification('Login successful!');
        } else {
            showNotification('User not found', 'error');
        }
    } else {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const company = document.getElementById('company').value;
        const resumeFile = document.getElementById('resume').files[0];
        
        if (users.find(u => u.email === email)) {
            showNotification('Email already exists', 'error');
            return;
        }
        
        const newUser = {
            id: Date.now().toString(),
            email: email,
            name: name,
            type: selectedUserType,
            phone: phone,
            company: selectedUserType === 'employer' ? company : undefined,
            resumeUrl: resumeFile ? URL.createObjectURL(resumeFile) : undefined,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        currentUser = newUser;
        saveData();
        updateUI();
        closeLoginModal();
        showNotification('Registration successful!');
    }
}

function logout() {
    currentUser = null;
    saveData();
    updateUI();
    showNotification('Logged out successfully');
    window.location.href = 'index.html';
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function searchJobs() {
    const searchTerm = document.getElementById('hero-search').value;
    localStorage.setItem('searchTerm', searchTerm);
    window.location.href = 'jobs.html';
}

window.jobPortal = {
    currentUser,
    jobs,
    applications,
    users,
    loadData,
    saveData,
    showNotification,
    updateUI
};
