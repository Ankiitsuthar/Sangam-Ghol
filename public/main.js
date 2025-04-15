document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.menu-toggle') && !e.target.closest('.nav-links')) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
            Ghol: ['Idli Ghol', 'Dosa Ghol', 'Uttapa Ghol', 'Appam Vada Ghol', 'White Khaman Dhokla Ghol', 'Yellow Khaman Dhokla Ghol', 'Handva Ghol', 'Mehandu Vada Ghol', 'Dalwada Ghol', 'Dahi Vada Ghol'],
            ChutneySambarPaste: ['Sp. Coconut Chutney', 'Sp. Sambar Paste'],
            SambarMasala: ['Sambar Masala']
        };

        itemCategory.addEventListener('change', function () {
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


    // Dynamic item loading based on Appointment Category selection
    const appointmentitemcategory = document.getElementById('appointment-item-category');
    const appointmentitemname = document.getElementById('appointment-item-name');

    if (appointmentitemcategory && appointmentitemname) {
        const itemOptions = {
            Ghol: ['Idli Ghol', 'Dosa Ghol', 'Uttapa Ghol', 'Appam Vada Ghol', 'White Khaman Dhokla Ghol', 'Yellow Khaman Dhokla Ghol', 'Handva Ghol', 'Mehandu Vada Ghol', 'Dalwada Ghol', 'Dahi Vada Ghol'],
            ChutneySambarPaste: ['Sp. Coconut Chutney', 'Sp. Sambar Paste'],
            SambarMasala: ['Sambar Masala']
        };

        appointmentitemcategory.addEventListener('change', function () {
            const category = this.value;

            // Clear existing options
            appointmentitemname.innerHTML = '<option value="">Select Item</option>';

            // Add new options based on selected category
            if (category && itemOptions[category]) {
                itemOptions[category].forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.toLowerCase().replace(/ /g, '-');
                    option.textContent = item;
                    appointmentitemname.appendChild(option);
                });
            }
        });
    }

    // Gallery functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelector('.gallery-grid');
    const loadMoreButton = document.getElementById('load-more');

    // Sample gallery items data
    const galleryItemsData = [
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
        if (!galleryGrid) return;
        
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
            
            // Add click event to the newly created gallery item
            galleryItem.addEventListener('click', function() {
                const title = this.querySelector('h3').textContent;
                const category = this.getAttribute('data-category');
                const imgSrc = this.querySelector('img').src;
                const price = productPrices[title] || 50; // Default price if not found

                // Set modal content
                productImage.src = imgSrc;
                productTitle.textContent = title;
                productCategory.textContent = category;
                productPrice.textContent = `₹${price.toFixed(2)}`;
                quantityInput.value = 1;
                weightInput.value = 1;
                updateTotalPrice();

                // Show modal
                modal.style.display = 'block';
            });
        });

        // Hide load more button if all items are shown
        if (loadMoreButton) {
            if (currentItems >= items.length) {
                loadMoreButton.style.display = 'none';
            } else {
                loadMoreButton.style.display = 'block';
            }
        }
    }

    // Initialize gallery
    if (galleryGrid) {
        renderGalleryItems(galleryItemsData);

        // Filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Reset currentItems
                currentItems = 8;

                const filter = this.getAttribute('data-filter');

                // Toggle active class
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter items
                let filteredItems = galleryItemsData;
                if (filter !== 'all') {
                    filteredItems = galleryItemsData.filter(item => item.category === filter);
                }

                renderGalleryItems(filteredItems);
            });
        });

        // Load more functionality
        if (loadMoreButton) {
            loadMoreButton.addEventListener('click', function () {
                currentItems += 4;

                const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
                let filteredItems = galleryItemsData;

                if (activeFilter !== 'all') {
                    filteredItems = galleryItemsData.filter(item => item.category === activeFilter);
                }

                renderGalleryItems(filteredItems);
            });
        }
    }

    // Product Modal and Cart functionality
    const cartIcon = document.createElement('div');
    const cartItemsCount = document.createElement('span');
    let cartItems = [];

    // Create cart icon in the header
    cartIcon.className = 'cart-icon';
    cartIcon.innerHTML = '<i class="fas fa-shopping-cart"></i>';
    cartItemsCount.className = 'cart-count';
    cartItemsCount.textContent = '0';
    cartIcon.appendChild(cartItemsCount);

    // Add cart icon to the header
    if (navLinks) {
        navLinks.parentNode.insertBefore(cartIcon, navLinks.nextSibling);
    }

    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body">
                    <div class="product-image">
                        <img src="" alt="Product Image">
                    </div>
                    <div class="product-details">
                        <h2 class="product-title"></h2>
                        <p class="product-category"></p>
                        <p class="product-description">Fresh and homemade, perfect for your daily needs.</p>
                        <div class="product-price">
                            <span class="price">₹50.00</span> per kg
                        </div>
                        <div class="product-quantity">
                            <label for="quantity">Quantity:</label>
                            <div class="quantity-control">
                                <button class="quantity-btn minus">-</button>
                                <input type="number" id="quantity" value="1" min="1" max="10">
                                <button class="quantity-btn plus">+</button>
                            </div>
                        </div>
                        <div class="product-weight">
                            <label for="weight">Weight (kg):</label>
                            <div class="weight-control">
                                <button class="weight-btn minus">-</button>
                                <input type="number" id="weight" value="1" min="0.5" max="10" step="0.5">
                                <button class="weight-btn plus">+</button>
                            </div>
                        </div>
                        <div class="product-total">
                            <strong>Total: </strong><span class="total-price">₹50.00</span>
                        </div>
                        <button class="btn primary add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    // Create cart modal
    const cartModal = document.createElement('div');
    cartModal.className = 'cart-modal';
    cartModal.innerHTML = `
            <div class="cart-modal-content">
                <span class="close-cart-modal">&times;</span>
                <h2>Your Cart</h2>
                <div class="cart-items-container">
                    <div class="cart-items"></div>
                    <div class="cart-summary">
                        <div class="cart-total">
                            <strong>Total: </strong><span class="cart-total-price">₹0.00</span>
                        </div>
                        <button class="btn primary checkout-btn">Proceed to Checkout</button>
                    </div>
                </div>
                <div class="empty-cart-message">Your cart is empty</div>
            </div>
        `;

    document.body.appendChild(cartModal);

    // Modal elements
    const closeModal = document.querySelector('.close-modal');
    const productImage = document.querySelector('.product-image img');
    const productTitle = document.querySelector('.product-title');
    const productCategory = document.querySelector('.product-category');
    const productPrice = document.querySelector('.price');
    const quantityInput = document.getElementById('quantity');
    const weightInput = document.getElementById('weight');
    const totalPrice = document.querySelector('.total-price');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    // Cart modal elements
    const closeCartModal = document.querySelector('.close-cart-modal');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalPrice = document.querySelector('.cart-total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const emptyCartMessage = document.querySelector('.empty-cart-message');

    // Product prices (you can adjust these based on your actual pricing)
    const productPrices = {
        'Idli': 60,
        'Dosa': 60,
        'Uttapa': 60,
        'Appam Vada': 60,
        'White Khaman Dhokla': 60,
        'Yellow Khaman Dhokla': 80,
        'Handva': 80,
        'Mehandu Vada': 140,
        'Dalwada': 140,
        'Dahi Vada': 140,
        'Sp. Coconut Chutney': 70,
        'Sp. Sambar Paste': 70,
        'Sambar Masala': 10
    };

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    // Close cart modal
    if (closeCartModal) {
        closeCartModal.addEventListener('click', function () {
            cartModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Quantity control
    const minusQuantityBtn = document.querySelector('.quantity-btn.minus');
    const plusQuantityBtn = document.querySelector('.quantity-btn.plus');
    
    if (minusQuantityBtn) {
        minusQuantityBtn.addEventListener('click', function () {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                updateTotalPrice();
            }
        });
    }

    if (plusQuantityBtn) {
        plusQuantityBtn.addEventListener('click', function () {
            if (quantityInput.value < 10) {
                quantityInput.value = parseInt(quantityInput.value) + 1;
                updateTotalPrice();
            }
        });
    }

    // Weight control
    const minusWeightBtn = document.querySelector('.weight-btn.minus');
    const plusWeightBtn = document.querySelector('.weight-btn.plus');
    
    if (minusWeightBtn) {
        minusWeightBtn.addEventListener('click', function () {
            if (weightInput.value > 0.5) {
                weightInput.value = (parseFloat(weightInput.value) - 0.5).toFixed(1);
                updateTotalPrice();
            }
        });
    }

    if (plusWeightBtn) {
        plusWeightBtn.addEventListener('click', function () {
            if (weightInput.value < 10) {
                weightInput.value = (parseFloat(weightInput.value) + 0.5).toFixed(1);
                updateTotalPrice();
            }
        });
    }

    // Update input values when typing
    if (quantityInput) {
        quantityInput.addEventListener('input', updateTotalPrice);
    }
    
    if (weightInput) {
        weightInput.addEventListener('input', updateTotalPrice);
    }

    // Calculate total price
    function updateTotalPrice() {
        if (!productPrice || !quantityInput || !weightInput || !totalPrice) return;
        
        const price = parseFloat(productPrice.textContent.replace('₹', ''));
        const quantity = parseInt(quantityInput.value);
        const weight = parseFloat(weightInput.value);
        const total = price * quantity * weight;
        totalPrice.textContent = `₹${total.toFixed(2)}`;
    }

    // Add to cart functionality
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function () {
            const title = productTitle.textContent;
            const price = parseFloat(productPrice.textContent.replace('₹', ''));
            const quantity = parseInt(quantityInput.value);
            const weight = parseFloat(weightInput.value);
            const total = price * quantity * weight;
            const imgSrc = productImage.src;

            // Check if item already exists in cart
            const existingItemIndex = cartItems.findIndex(item => item.title === title);

            if (existingItemIndex !== -1) {
                // Update existing item
                cartItems[existingItemIndex].quantity += quantity;
                cartItems[existingItemIndex].weight += weight;
                cartItems[existingItemIndex].total += total;
            } else {
                // Add new item
                cartItems.push({
                    title,
                    price,
                    quantity,
                    weight,
                    total,
                    imgSrc
                });
            }

            // Update cart count
            updateCartCount();

            // Show success notification
            showNotification('Success', `${title} added to cart!`, 'success');

            // Close modal
            modal.style.display = 'none';
        });
    }

    // Cart icon click event
    if (cartIcon) {
        cartIcon.addEventListener('click', function () {
            renderCartItems();
            cartModal.style.display = 'block';
        });
    }

    // Update cart count
    function updateCartCount() {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartItemsCount.textContent = totalItems;
        cartItemsCount.style.display = totalItems > 0 ? 'block' : 'none';
    }

    // Render cart items
    function renderCartItems() {
        if (!cartItemsContainer || !emptyCartMessage || !cartTotalPrice) return;
        
        if (cartItems.length === 0) {
            cartItemsContainer.style.display = 'none';
            document.querySelector('.cart-summary').style.display = 'none';
            emptyCartMessage.style.display = 'block';
            return;
        }

        cartItemsContainer.style.display = 'block';
        document.querySelector('.cart-summary').style.display = 'block';
        emptyCartMessage.style.display = 'none';

        cartItemsContainer.innerHTML = '';
        let cartTotal = 0;

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.imgSrc}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <h3>${item.title}</h3>
                        <p>Price: ₹${item.price.toFixed(2)} per kg</p>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Weight: ${item.weight} kg</p>
                        <p>Total: ₹${item.total.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="remove-item-btn" data-index="${index}">Remove</button>
                    </div>
                `;

            cartItemsContainer.appendChild(cartItem);
            cartTotal += item.total;
        });

        cartTotalPrice.textContent = `₹${cartTotal.toFixed(2)}`;

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                cartItems.splice(index, 1);
                updateCartCount();
                renderCartItems();
            });
        });
    }

    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            if (cartItems.length === 0) return;

            // Here you would typically redirect to a checkout page
            // For now, we'll just show a confirmation and clear the cart
            showNotification('Success', 'Proceeding to checkout...', 'success');

            // Create form data for order submission
            const orderData = {
                items: cartItems,
                totalAmount: cartItems.reduce((sum, item) => sum + item.total, 0),
                orderDate: new Date().toISOString()
            };

            console.log('Order data:', orderData);

            // Clear cart
            cartItems = [];
            updateCartCount();
            cartModal.style.display = 'none';
        });
    }

    // Initialize cart count
    updateCartCount();

    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.control-btn.prev');
    const nextButton = document.querySelector('.control-btn.next');
    const dotsContainer = document.querySelector('.testimonial-dots');

    let currentSlide = 0;

    if (testimonialSlider && testimonialSlides.length > 0 && dotsContainer) {
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
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.getElementById('newsletter-form');

    // Generic form submission handler
    function handleFormSubmit(form, endpoint) {
        if (form) {
            form.addEventListener('submit', async function (e) {
                e.preventDefault();

                const formData = new FormData(form);
                const formObject = {};

                formData.forEach((value, key) => {
                    if (formObject[key]) {
                        if (!Array.isArray(formObject[key])) {
                            formObject[key] = [formObject[key]];
                        }
                        formObject[key].push(value);
                    } else {
                        formObject[key] = value;
                    }
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
    handleFormSubmit(contactForm, 'contact');
    handleFormSubmit(newsletterForm, 'newsletter');

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
    const animateOnScroll = function () {
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