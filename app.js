// Main JavaScript file (script.js)
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.menu-toggle') && !e.target.closest('.nav-links')) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Booking tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button and pane
            button.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Dynamic item loading based on category selection
    const itemCategory = document.getElementById('item-category');
    const itemName = document.getElementById('item-name');
    
    if (itemCategory && itemName) {
        const itemOptions = {
            Ghol: ['Idli Ghol', 'Dosa Ghol', 'Uttapa Ghol', 'Appam Vada Ghol', 'White Khaman Dhokla Ghol','Yellow Khaman Dhokla Ghol','Handva Ghol','Mehandu Vada Ghol','Dalwada Ghol','Dahi Vada Ghol'],
            ChutneySambarPaste: ['Sp. Coconut Chutney', 'Sp. Sambar Paste'],
            SambarMasala: ['Sambar Masala']
        };
        
        itemCategory.addEventListener('change', function() {
            const category = this.value;
            
            // Clear existing options
            itemName.innerHTML = '<option value="">Select Item</option>';
            
            // Add new options based on selected category
            if (category && itemOptions[category]) {
                itemOptions[category].forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.toLowerCase().replace(/ /g, '-');
                    option.textContent = item;
                    itemName.appendChild(option);
                });
            }
        });
    }
    
    // Gallery functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelector('.gallery-grid');
    const loadMoreButton = document.getElementById('load-more');
    
    // Sample gallery items
    const galleryItems = [
        { id: 1, category: 'Ghol', image: '/assets/images/Idali_Ghol.jpg', title: 'Idali' },
        { id: 2, category: 'Ghol', image: '/assets/images/Dosa_Ghol.jpg', title: 'Dosa' },
        { id: 3, category: 'Ghol', image: '/assets/images/Uttapa Gol.webp', title: 'Uttapa' },
        { id: 4, category: 'Ghol', image: '/assets/images/Appam Vada Ghol.jpeg', title: 'Appam Vada' },
        { id: 5, category: 'Ghol', image: '/assets/images/White Khaman Dhokla Ghol.webp', title: 'White Khaman Dhokla' },
        { id: 6, category: 'Ghol', image: '/assets/images/Yellow Khaman Dhokla Batter.webp', title: 'Yellow Khaman Dhokla' },
        { id: 7, category: 'Ghol', image: '/assets/images/Handva Batter.webp', title: 'Handva' },
        { id: 8, category: 'Ghol', image: '/assets/images/Mehandu Vada Batter.jpeg', title: 'Mehandu Vada' },
        { id: 9, category: 'Ghol', image: '/assets/images/Dalwada Batter.jpeg', title: 'Dalwada' },
        { id: 10, category: 'Ghol', image: '/assets/images/Dahi Vada Batter.jpeg', title: 'Dahi Vada' },
        { id: 11, category: 'Chutney', image: '/assets/images/Coconut Chutney.jpg', title: 'Sp. Coconut Chutney' },
        { id: 12, category: 'Paste', image: '/assets/images/Sambar Paste.webp', title: 'Sp. Sambar Paste' },
        { id: 13, category: 'Masala', image: '/assets/images/Sambar Masala.jpg', title: 'Sambar Masala' },
    ];
    
    let currentItems = 8; // Number of items to show initially
    
    // Function to render gallery items
    function renderGalleryItems(items) {
        galleryGrid.innerHTML = '';
        
        items.slice(0, currentItems).forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-category', item.category);
            
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="gallery-overlay">
                    <h3>${item.title}</h3>
                    <span>${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
        
        // Hide load more button if all items are shown
        if (currentItems >= items.length) {
            loadMoreButton.style.display = 'none';
        } else {
            loadMoreButton.style.display = 'block';
        }
    }
    
    // Initialize gallery
    if (galleryGrid) {
        renderGalleryItems(galleryItems);
        
        // Filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Reset currentItems
                currentItems = 8;
                
                const filter = this.getAttribute('data-filter');
                
                // Toggle active class
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter items
                let filteredItems = galleryItems;
                if (filter !== 'all') {
                    filteredItems = galleryItems.filter(item => item.category === filter);
                }
                
                renderGalleryItems(filteredItems);
            });
        });
        
        // Load more functionality
        if (loadMoreButton) {
            loadMoreButton.addEventListener('click', function() {
                currentItems += 4;
                
                const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
                let filteredItems = galleryItems;
                
                if (activeFilter !== 'all') {
                    filteredItems = galleryItems.filter(item => item.category === activeFilter);
                }
                
                renderGalleryItems(filteredItems);
            });
        }
    }
    
    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.control-btn.prev');
    const nextButton = document.querySelector('.control-btn.next');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    let currentSlide = 0;
    
    if (testimonialSlider && testimonialSlides.length > 0) {
        // Create dots
        testimonialSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.dot');
        
        // Function to update slider
        function goToSlide(index) {
            // Hide all slides
            testimonialSlides.forEach(slide => {
                slide.style.display = 'none';
            });
            
            // Show current slide
            testimonialSlides[index].style.display = 'block';
            
            // Update dots
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        // Initialize slider
        goToSlide(0);
        
        // Navigation buttons
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                let newIndex = currentSlide - 1;
                if (newIndex < 0) newIndex = testimonialSlides.length - 1;
                goToSlide(newIndex);
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                let newIndex = currentSlide + 1;
                if (newIndex >= testimonialSlides.length) newIndex = 0;
                goToSlide(newIndex);
            });
        }
        
        // Auto slide
        setInterval(() => {
            let newIndex = currentSlide + 1;
            if (newIndex >= testimonialSlides.length) newIndex = 0;
            goToSlide(newIndex);
        }, 5000);
    }
    
    // Form submissions
    const itemsForm = document.getElementById('items-form');
    const appointmentForm = document.getElementById('appointment-form');
    const weddingForm = document.getElementById('wedding-form');
    const contactForm = document.getElementById('contact-form');
    
    // Generic form submission handler
    function handleFormSubmit(form, endpoint) {
        if (form) {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = new FormData(form);
                const formObject = {};
                
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                try {
                    const response = await fetch(`/api/${endpoint}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formObject)
                    });
                    
                    const data = await response.json();
                    
                    if (response.ok) {
                        showNotification('Success', data.message, 'success');
                        form.reset();
                    } else {
                        showNotification('Error', data.message || 'Something went wrong', 'error');
                    }
                } catch (error) {
                    console.error('Form submission error:', error);
                    showNotification('Error', 'Failed to submit the form. Please try again.', 'error');
                }
            });
        }
    }
    
    // Setup form submissions
    handleFormSubmit(itemsForm, 'bookings/items');
    handleFormSubmit(appointmentForm, 'bookings/appointments');
    handleFormSubmit(weddingForm, 'bookings/weddings');
    handleFormSubmit(contactForm, 'contact');
    
    // Notification function
    function showNotification(title, message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-header">
                <h3>${title}</h3>
                <button class="close-notification">&times;</button>
            </div>
            <div class="notification-body">
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto-close notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
        
        // Close notification on button click
        const closeButton = notification.querySelector('.close-notification');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            });
        }
    }
    
    // Add animation when elements enter the viewport
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add animate-on-scroll class to elements that should be animated
    document.querySelectorAll('.service-card, .section-title, .gallery-item, .testimonial-slide, .info-item').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Run the animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
});