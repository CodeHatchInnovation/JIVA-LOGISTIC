document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close nav menu when a link is clicked (for mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // --- Hero Image Carousel ---
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (carouselSlide && carouselImages.length > 0) {
        let counter = 0;
        const size = carouselImages[0].clientWidth;

        // Set initial position
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

        nextBtn.addEventListener('click', () => {
            if (counter >= carouselImages.length - 1) {
                counter = -1; // Reset to loop
            }
            counter++;
            carouselSlide.style.transition = 'transform 0.5s ease-in-out';
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        });

        prevBtn.addEventListener('click', () => {
            if (counter <= 0) {
                counter = carouselImages.length; // Reset to loop
            }
            counter--;
            carouselSlide.style.transition = 'transform 0.5s ease-in-out';
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        });

        // Optional: Loop continuously (e.g., every 5 seconds)
        // setInterval(() => {
        //     nextBtn.click();
        // }, 5000);
    }


    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust for sticky header height if needed
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset - 20; // -20px extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Update active class in navigation (optional)
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });


    // --- Scroll Animations (Intersection Observer) ---
    const animatedSections = document.querySelectorAll('.animated-section');

    const observerOptions = {
        root: null, // viewport as root
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        sectionObserver.observe(section);
    });


    // --- Voice Command Functionality ---
    const voiceCommandButton = document.getElementById('voice-command-toggle');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;
    let isListening = false;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false; // Listen for a single utterance
        recognition.lang = 'es-ES'; // Spanish language

        voiceCommandButton.addEventListener('click', () => {
            if (isListening) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });

        recognition.onstart = () => {
            console.log('Voice recognition started. Speak now.');
            isListening = true;
            voiceCommandButton.classList.add('listening');
            voiceCommandButton.innerHTML = '<i class="fas fa-microphone-alt"></i>'; // Icono de micrófono activo
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log('You said:', transcript);
            processVoiceCommand(transcript);
        };

        recognition.onend = () => {
            console.log('Voice recognition ended.');
            isListening = false;
            voiceCommandButton.classList.remove('listening');
            voiceCommandButton.innerHTML = '<i class="fas fa-microphone"></i>'; // Icono de micrófono normal
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            isListening = false;
            voiceCommandButton.classList.remove('listening');
            voiceCommandButton.innerHTML = '<i class="fas fa-microphone"></i>';
            alert('Error en el reconocimiento de voz: ' + event.error + '. Asegúrate de permitir el acceso al micrófono.');
        };

    } else {
        voiceCommandButton.style.display = 'none'; // Hide button if API not supported
        console.warn('Web Speech API is not supported in this browser.');
    }

    function processVoiceCommand(command) {
        let targetSectionId = '';

        if (command.includes('inicio') || command.includes('principal')) {
            targetSectionId = 'inicio';
        } else if (command.includes('nosotros') || command.includes('historia') || command.includes('filosofía')) {
            targetSectionId = 'nuestra-historia';
        } else if (command.includes('menú') || command.includes('digital')) {
            targetSectionId = 'menu-digital';
        } else if (command.includes('sucursales') || command.includes('dónde estamos')) {
            targetSectionId = 'sucursales';
        } else if (command.includes('reservar') || command.includes('reservaciones') || command.includes('mesa')) {
            targetSectionId = 'reservaciones';
        } else if (command.includes('contacto') || command.includes('contáctanos') || command.includes('ayuda')) {
            targetSectionId = 'contacto';
        } else if (command.includes('chatbot') || command.includes('abrir chat')) {
            toggleChatbot();
            return; // Don't scroll, just open chatbot
        } else {
            alert('Comando no reconocido. Intenta decir "inicio", "menú", "reservar", etc.');
            return;
        }

        if (targetSectionId) {
            const targetElement = document.getElementById(targetSectionId);
            if (targetElement) {
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    }


    // --- Chatbot Functionality ---
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbotBtn = document.getElementById('close-chatbot-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');

    function toggleChatbot() {
        if (chatbotContainer.style.display === 'flex') {
            chatbotContainer.style.display = 'none';
        } else {
            chatbotContainer.style.display = 'flex';
            chatInput.focus();
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
        }
    }

    if (chatbotButton && chatbotContainer) {
        chatbotButton.addEventListener('click', toggleChatbot);
        closeChatbotBtn.addEventListener('click', toggleChatbot);

        sendChatBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage === '') return;

        appendMessage(userMessage, 'user-message');
        chatInput.value = '';

        // Get bot response
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            appendMessage(botResponse, 'bot-message');
        }, 500);
    }

    function appendMessage(message, className) {
        const messageElement = document.createElement('p');
        messageElement.classList.add(className);
        messageElement.innerHTML = message; // Use innerHTML to allow HTML tags for links
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    }

    function getBotResponse(userMessage) {
        const msg = userMessage.toLowerCase();

        if (msg.includes('hola') || msg.includes('saludos')) {
            return '¡Hola! ¿En qué puedo ayudarte? Puedes preguntar sobre nuestro menú, sucursales, reservaciones, o nuestra historia.';
        } else if (msg.includes('menú') || msg.includes('carta')) {
            return 'Nuestro menú digital está disponible para tu comodidad. Puedes escanear el QR en la sección de <a href="#menu-digital" onclick="document.getElementById(\'close-chatbot-btn\').click(); return true;">"Nuestro Menú Digital"</a> o descargarlo en PDF desde allí.';
        } else if (msg.includes('sucursales') || msg.includes('dónde están')) {
            return 'Tenemos varias sucursales para servirte. Visita nuestra sección de <a href="#sucursales" onclick="document.getElementById(\'close-chatbot-btn\').click(); return true;">"Nuestras Sucursales"</a> para ver direcciones y teléfonos.';
        } else if (msg.includes('reservar') || msg.includes('reservación') || msg.includes('mesa')) {
            return '¡Claro! Puedes reservar una mesa fácilmente en nuestra sección de <a href="#reservaciones" onclick="document.getElementById(\'close-chatbot-btn\').click(); return true;">"Reservaciones"</a>. Solo llena el formulario.';
        } else if (msg.includes('historia') || msg.includes('nosotros') || msg.includes('filosofía')) {
            return 'Conoce más sobre Cielo Esmeralda y nuestra filosofía culinaria en la sección <a href="#nuestra-historia" onclick="document.getElementById(\'close-chatbot-btn\').click(); return true;">"Nuestra Historia"</a>.';
        } else if (msg.includes('contacto') || msg.includes('ayuda') || msg.includes('preguntas')) {
            return 'Si tienes más preguntas, puedes contactarnos directamente a través del formulario o ver nuestros datos en la sección <a href="#contacto" onclick="document.getElementById(\'close-chatbot-btn\').click(); return true;">"Contáctanos"</a>.';
        } else if (msg.includes('horario') || msg.includes('abren')) {
            return 'Nuestro horario general es: Lunes a Viernes: 10:00 AM - 10:00 PM; Sábados y Domingos: 12:00 PM - 11:00 PM. Puedes encontrar esto y más en la sección de <a href="#contacto" onclick="document.getElementById(\'close-chatbot-btn\').click(); return true;">"Contáctanos"</a>.';
        } else if (msg.includes('gracias')) {
            return 'De nada. ¡Espero verte pronto en Cielo Esmeralda!';
        } else {
            return 'Lo siento, no entendí tu pregunta. ¿Puedes reformularla o preguntar sobre "menú", "sucursales", "reservar", etc.?';
        }
    }


    // --- Form Submission Handling (Basic Example) ---
    const reservationForm = document.getElementById('contact-form'); // ID para el form de Reservaciones
    const contactMessageRes = document.getElementById('contact-message');

    if (reservationForm) {
        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Here you would typically send data to a server
            // For now, we'll just show a success message
            console.log('Reservation Form Submitted!');
            contactMessageRes.textContent = '¡Reservación enviada con éxito! Nos pondremos en contacto pronto.';
            contactMessageRes.style.color = 'var(--button-primary)'; // Green color for success
            reservationForm.reset(); // Clear the form

            setTimeout(() => {
                contactMessageRes.textContent = '';
            }, 5000); // Clear message after 5 seconds
        });
    }

    const generalContactForm = document.getElementById('contact-form-general'); // ID para el form de Contacto General
    const contactMessageGeneral = document.getElementById('contact-message-general');

    if (generalContactForm) {
        generalContactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            console.log('General Contact Form Submitted!');
            contactMessageGeneral.textContent = '¡Mensaje enviado con éxito! Agradecemos tu comunicación.';
            contactMessageGeneral.style.color = 'var(--button-primary)'; // Green color for success
            generalContactForm.reset(); // Clear the form

            setTimeout(() => {
                contactMessageGeneral.textContent = '';
            }, 5000); // Clear message after 5 seconds
        });
    }

});
