// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// ===== MOBILE NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== CAROUSEL/SLIDESHOW =====
const carousel = document.querySelector('.carousel');
if (carousel) {
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('indicators');
    
    let currentIndex = 0;
    let autoPlayInterval;

    items.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = indicatorsContainer.querySelectorAll('.indicator');

    function showSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        items[index].classList.add('active');
        indicators[index].classList.add('active');
        currentIndex = index;
    }

    function nextSlide() {
        const next = (currentIndex + 1) % items.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentIndex - 1 + items.length) % items.length;
        showSlide(prev);
    }

    function goToSlide(index) {
        showSlide(index);
        resetAutoPlay();
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    startAutoPlay();
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carousel.addEventListener('mouseleave', startAutoPlay);
}

// ===== LOAD NEWS FROM API =====
async function loadNews() {
    try {
        const response = await fetch(`${API_BASE_URL}/news`);
        const data = await response.json();
        
        const newsTicker = document.querySelector('.news-ticker');
        if (newsTicker && data.news) {
            newsTicker.innerHTML = '';
            data.news.forEach(item => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <span class="news-date">${formatDate(item.date)}</span>
                    <p>${item.title}</p>
                `;
                newsTicker.appendChild(newsItem);
            });
        }
    } catch (error) {
        console.error('Error loading news:', error);
    }
}

// ===== LOAD PROGRAMS FROM API =====
async function loadPrograms() {
    try {
        const response = await fetch(`${API_BASE_URL}/programs`);
        const data = await response.json();
        
        if (data.programs) {
            populateAccordions(data.programs);
        }
    } catch (error) {
        console.error('Error loading programs:', error);
    }
}

function populateAccordions(programs) {
    const categories = {
        'undergraduate': document.querySelector('#undergraduate .accordion'),
        'postgraduate': document.querySelector('#postgraduate .accordion'),
        'tvet': document.querySelector('#tvet .accordion')
    };

    Object.keys(categories).forEach(category => {
        const accordion = categories[category];
        if (accordion) {
            const categoryPrograms = programs.filter(p => p.category === category);
            accordion.innerHTML = '';
            
            categoryPrograms.forEach(program => {
                const item = document.createElement('div');
                item.className = 'accordion-item';
                item.innerHTML = `
                    <button class="accordion-header">
                        <span>${program.name}</span>
                        <span class="accordion-icon">+</span>
                    </button>
                    <div class="accordion-content">
                        <p><strong>Duration:</strong> ${program.duration}</p>
                        <p><strong>Description:</strong> ${program.description}</p>
                        <p><strong>Requirements:</strong> ${program.requirements}</p>
                        <p><strong>Career Opportunities:</strong> ${program.career_opportunities}</p>
                    </div>
                `;
                accordion.appendChild(item);
            });
            
            // Re-attach accordion event listeners
            attachAccordionListeners();
        }
    });
}

// ===== TABS FUNCTIONALITY =====
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ===== ACCORDION FUNCTIONALITY =====
function attachAccordionListeners() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
}

// Initial accordion setup
attachAccordionListeners();

// ===== CONTACT FORM WITH API =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();
        
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate
        let isValid = true;
        
        if (!formData.firstName) {
            showError('firstName', 'First name is required');
            isValid = false;
        }
        
        if (!formData.lastName) {
            showError('lastName', 'Last name is required');
            isValid = false;
        }
        
        if (!formData.email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(formData.email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!formData.subject) {
            showError('subject', 'Subject is required');
            isValid = false;
        }
        
        if (!formData.message) {
            showError('message', 'Message is required');
            isValid = false;
        } else if (formData.message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            try {
                const response = await fetch(`${API_BASE_URL}/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    document.getElementById('formSuccess').style.display = 'block';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        document.getElementById('formSuccess').style.display = 'none';
                    }, 5000);
                } else {
                    alert('Error submitting form. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error submitting form. Please try again.');
            }
        }
    });
}

// ===== APPLICATION STATUS CHECK WITH API =====
const statusForm = document.getElementById('statusForm');
if (statusForm) {
    statusForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();
        
        const applicationId = document.getElementById('applicationId').value.trim();
        const birthDate = document.getElementById('birthDate').value;
        
        let isValid = true;
        
        if (!applicationId) {
            showError('applicationId', 'Application ID is required');
            isValid = false;
        }
        
        if (!birthDate) {
            showError('birthDate', 'Date of birth is required');
            isValid = false;
        }
        
        if (isValid) {
            try {
                const response = await fetch(`${API_BASE_URL}/application-status`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ applicationId, dateOfBirth: birthDate })
                });
                
                const result = await response.json();
                const statusResult = document.getElementById('statusResult');
                
                if (result.success) {
                    const statusColor = result.application.status === 'approved' ? '#10b981' : 
                                       result.application.status === 'rejected' ? '#ef4444' : '#f59e0b';
                    
                    statusResult.innerHTML = `
                        <h3 style="color: var(--primary-blue); margin-bottom: 1rem;">Application Status</h3>
                        <p><strong>Application ID:</strong> ${result.application.application_id}</p>
                        <p><strong>Status:</strong> <span style="color: ${statusColor}; font-weight: 600; text-transform: uppercase;">${result.application.status}</span></p>
                        <p><strong>Submitted:</strong> ${formatDate(result.application.submitted_at)}</p>
                        <p style="margin-top: 1rem;">
                            ${result.application.status === 'pending' ? 'Your application is currently being reviewed by our admissions committee.' : ''}
                            ${result.application.status === 'approved' ? 'Congratulations! Your application has been approved.' : ''}
                            ${result.application.status === 'rejected' ? 'Unfortunately, your application was not successful this time.' : ''}
                        </p>
                    `;
                    statusResult.style.display = 'block';
                } else {
                    statusResult.innerHTML = `
                        <p style="color: #ef4444;">Application not found. Please check your Application ID and Date of Birth.</p>
                    `;
                    statusResult.style.display = 'block';
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error checking status. Please try again.');
            }
        }
    });
}

// ===== HELPER FUNCTIONS =====
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field && errorElement) {
        field.classList.add('error');
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorFields = document.querySelectorAll('.error');
    
    errorMessages.forEach(msg => msg.textContent = '');
    errorFields.forEach(field => field.classList.remove('error'));
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Real-time validation
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            const errorElement = document.getElementById(input.id + 'Error');
            if (errorElement) {
                input.classList.add('error');
                errorElement.textContent = 'This field is required';
            }
        }
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error') && input.value.trim()) {
            input.classList.remove('error');
            const errorElement = document.getElementById(input.id + 'Error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        }
    });
});

// ===== LOAD DATA ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    // Load news on home page
    if (document.querySelector('.news-ticker')) {
        loadNews();
    }
    
    // Load programs on academics page
    if (document.querySelector('.accordion')) {
        loadPrograms();
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
