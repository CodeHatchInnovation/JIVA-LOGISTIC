document.addEventListener('DOMContentLoaded', () => {
    // ---- Navbar Toggle para móviles ----
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) { // Asegura que los elementos existan antes de añadir event listeners
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Para animar el icono de hamburguesa
        });

        // Cerrar el menú si se hace clic fuera (opcional)
        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }


    // ---- Carrusel de Imágenes (Flota) ----
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (carouselSlide && carouselImages.length > 0 && prevBtn && nextBtn) { // Asegura que existan
        let counter = 0;
        const size = carouselImages[0].clientWidth;

        // Inicializar carrusel en la primera imagen (por si acaso el CSS no lo hace)
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

        nextBtn.addEventListener('click', () => {
            if (counter >= carouselImages.length - 1) {
                counter = -1; // Reinicia para ir al principio lógicamente
            }
            counter++;
            carouselSlide.style.transition = 'transform 0.5s ease-in-out';
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        });

        prevBtn.addEventListener('click', () => {
            if (counter <= 0) {
                counter = carouselImages.length; // Reinicia para ir al final lógicamente
            }
            counter--;
            carouselSlide.style.transition = 'transform 0.5s ease-in-out';
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        });
    }

    // ---- Formulario de Contacto ----
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita el envío por defecto del formulario

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simulación de envío (aquí enviarías a un servicio como Formspree, Netlify Forms, etc.)
            console.log('Formulario enviado:', { name, email, message });

            if (contactMessage) { // Asegúrate de que el elemento existe
                contactMessage.textContent = '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.';
                contactMessage.style.color = 'green';
            }
            contactForm.reset(); // Limpia el formulario

            // Puedes añadir un temporizador para ocultar el mensaje después de unos segundos
            setTimeout(() => {
                if (contactMessage) {
                    contactMessage.textContent = '';
                }
            }, 5000);
        });
    }

    // ---- Chatbot Funcionalidad ----
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbotBtn = document.getElementById('close-chatbot-btn');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatMessages = document.getElementById('chat-messages');
    const voiceToggleBtn = document.getElementById('voice-command-toggle'); // Asegura que también esté aquí

    // Solo si todos los elementos del chatbot existen en el DOM
    if (chatbotButton && chatbotContainer && closeChatbotBtn && chatInput && sendChatBtn && chatMessages) {
        // Estado inicial: oculto
        chatbotContainer.style.display = 'none';

        chatbotButton.addEventListener('click', () => {
            const isHidden = chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '';
            chatbotContainer.style.display = isHidden ? 'flex' : 'none';
            
            if (isHidden) {
                chatInput.focus(); // Enfocar el input al abrir
                chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar al final
            }
        });

        closeChatbotBtn.addEventListener('click', () => {
            chatbotContainer.style.display = 'none';
        });

        sendChatBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        function sendMessage() {
            const userInput = chatInput.value.trim();
            if (userInput === '') return;

            // Añadir mensaje del usuario
            const userMessageDiv = document.createElement('p');
            userMessageDiv.classList.add('user-message'); // CLASE AÑADIDA AQUÍ
            userMessageDiv.textContent = userInput;
            chatMessages.appendChild(userMessageDiv);

            chatInput.value = ''; // Limpiar el input

            // Desplazar al final de los mensajes para ver el último
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Simular respuesta del bot
            setTimeout(() => {
                const botResponse = getBotResponse(userInput);
                const botMessageDiv = document.createElement('p');
                botMessageDiv.classList.add('bot-message');
                botMessageDiv.innerHTML = botResponse; // Usar innerHTML para <br>
                chatMessages.appendChild(botMessageDiv);

                chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar de nuevo
            }, 500); // Pequeña pausa para simular que el bot está "pensando"
        }

        function getBotResponse(message) {
            message = message.toLowerCase(); // Convertir a minúsculas para facilitar la comparación

            // Usamos expresiones regulares para ser más flexibles con las palabras clave
            if (/(hola|saludos)/.test(message)) {
                return "¡Hola! ¿En qué puedo ayudarte hoy?";
            } else if (/(mision)/.test(message)) {
                return "Nuestra misión es ofrecer un servicio especializado con calidad, confiabilidad y seguridad, buscando la continuidad comercial a largo plazo.";
            } else if (/(vision)/.test(message)) {
                return "Nuestra visión es consolidarnos como empresa líder en el transporte de contenedores, reconocida por su eficiencia e innovación.";
            } else if (/(flota|camiones|unidades)/.test(message)) {
                return "Contamos con 17 unidades: 11 sencillos, 5 full expandibles y 6 cajas secas. Puedes ver más en la sección de Flota.";
            } else if (/(rastreo|seguridad|monitoreo)/.test(message)) {
                return "Ofrecemos monitoreo satelital 24/7 con rastreo en tiempo real y apagado remoto de unidades en caso de robo. Trabajamos con ELITE, Zapata Aeropuerto, FREIT y PROTRACK.";
            } else if (/(cobertura|donde operan|ciudades)/.test(message)) {
                return "Realizamos servicios de transporte a toda la República Mexicana.";
            } else if (/(patios|ubicacion|tepotzotlan|manzanillo)/.test(message)) {
                return "Tenemos patios de operaciones en Tepotzotlán, Estado de México y en Manzanillo, Colima. Puedes ver sus ubicaciones en la sección de Patios.";
            } else if (/(contacto|cotizacion|telefono|email)/.test(message)) {
                return "Puedes contactarnos a través de nuestro formulario en la sección de Contacto, o llamar a Fernando Lucas al 5516273406 o a Armando Martinez al 5542639390. También puedes enviar un correo a jiva.operaciones@gmail.com.";
            } else if (/(privacidad|politicas)/.test(message)) {
                return "Nuestras políticas de privacidad detallan cómo recopilamos y protegemos tus datos personales. Puedes revisarlas completas en la sección de Privacidad de la página.";
            } else if (/(servicios)/.test(message)) {
                return "Ofrecemos transporte de carga contenerizada, transporte en caja seca, logística de contenedores 20 y 40 pies, rastreo satelital y transporte seguro de mercancía.";
            } else if (/(presentacion|qr|pdf)/.test(message)) {
                 // Accedemos al archivo PDF subido
                return "Puedes descargar nuestra presentación completa en PDF escaneando el código QR en la sección 'Nuestra Presentación en QR' o <a href='JIVA LOGISTIC actual.pdf' target='_blank'>haciendo clic aquí</a>.";
            } else if (/(gracias|adios|bye)/.test(message)) {
                return "¡De nada! Si tienes más preguntas, no dudes en consultar. ¡Hasta luego!";
            } else {
                return "Lo siento, no entendí tu pregunta. Por favor, intenta de nuevo o reformula. Puedes preguntar sobre:<br> \"Misión\", \"Flota\", \"Rastreo\", \"Cobertura\", \"Patios\", \"Contacto\", \"Privacidad\", \"Servicios\" o \"Presentación\".";
            }
        }

        // ---- Funcionalidad de Voz (Web Speech API) ----
        let recognition;

        if (window.SpeechRecognition || window.webkitSpeechRecognition) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.lang = 'es-MX'; // Idioma español de México
            recognition.interimResults = false; // No mostrar resultados intermedios
            recognition.maxAlternatives = 1; // Solo la mejor alternativa

            recognition.onstart = () => {
                if (voiceToggleBtn) {
                    voiceToggleBtn.classList.add('listening');
                    voiceToggleBtn.textContent = 'Escuchando...';
                }
                chatInput.placeholder = 'Dime tu pregunta...';
                console.log('Reconocimiento de voz iniciado.');
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                console.log('Transcripción:', transcript);
                chatInput.value = transcript;
                sendMessage(); // Enviar el mensaje automáticamente
            };

            recognition.onspeechend = () => {
                recognition.stop();
                if (voiceToggleBtn) {
                    voiceToggleBtn.classList.remove('listening');
                    voiceToggleBtn.textContent = 'Voz';
                }
                chatInput.placeholder = 'Escribe tu mensaje...';
                console.log('Fin del habla, reconocimiento detenido.');
            };

            recognition.onerror = (event) => {
                console.error('Error de reconocimiento de voz:', event.error);
                if (voiceToggleBtn) {
                    voiceToggleBtn.classList.remove('listening');
                    voiceToggleBtn.textContent = 'Voz';
                }
                chatInput.placeholder = 'Escribe tu mensaje...';
                if (event.error === 'no-speech') {
                    // Puedes mostrar un mensaje al usuario si no se detecta voz
                    // alert('No se detectó habla. Inténtalo de nuevo.');
                }
            };

            if (voiceToggleBtn) { // Asegúrate de que el botón exista antes de añadir el listener
                voiceToggleBtn.addEventListener('click', () => {
                    try {
                        if (voiceToggleBtn.classList.contains('listening')) {
                            recognition.stop();
                        } else {
                            recognition.start();
                        }
                    } catch (error) {
                        console.warn('El reconocimiento de voz ya está activo o hay un error:', error);
                        if (error.name === 'InvalidStateError') {
                            recognition.stop();
                        }
                        voiceToggleBtn.classList.remove('listening');
                        voiceToggleBtn.textContent = 'Voz';
                    }
                });
            }

        } else {
            if (voiceToggleBtn) { // Oculta el botón si la API no es soportada
                voiceToggleBtn.style.display = 'none';
            }
            console.warn('Web Speech API no es soportada en este navegador.');
        }
    } // Fin del if(chatbotButton && ...)
});
