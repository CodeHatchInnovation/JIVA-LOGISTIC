document.addEventListener('DOMContentLoaded', function() {
    // ---- Lógica del Menú Hamburguesa ----
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace (para móviles)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // ---- Lógica del Carrusel (Flota) ----
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let counter = 0;
    // Verifica si hay imágenes antes de acceder a clientWidth
    const size = carouselImages.length > 0 ? carouselImages[0].clientWidth : 0; 

    // Si hay imágenes, inicializa el carrusel
    if (size > 0) {
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

        nextBtn.addEventListener('click', () => {
            if (counter >= carouselImages.length - 1) {
                counter = 0; // Vuelve al inicio si llega al final
            } else {
                counter++;
            }
            carouselSlide.style.transition = 'transform 0.5s ease-in-out';
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        });

        prevBtn.addEventListener('click', () => {
            if (counter <= 0) {
                counter = carouselImages.length - 1; // Vuelve al final si llega al inicio
            } else {
                counter--;
            }
            carouselSlide.style.transition = 'transform 0.5s ease-in-out';
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        });

        // Asegurar que el carrusel se redimensiona correctamente
        window.addEventListener('resize', () => {
            const newSize = carouselImages.length > 0 ? carouselImages[0].clientWidth : 0;
            if (newSize > 0) {
                carouselSlide.style.transition = 'none'; // Desactiva la transición para evitar saltos
                carouselSlide.style.transform = 'translateX(' + (-newSize * counter) + 'px)';
            }
        });
    } else {
        // Ocultar botones del carrusel si no hay imágenes
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }

    // ---- Lógica del Formulario de Contacto ----
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Simulación de envío exitoso para demostración
            contactMessage.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
            contactMessage.style.color = 'green';
            contactForm.reset();
        });
    }

    // ---- Lógica del Chatbot ----
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbotBtn = document.getElementById('close-chatbot-btn');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatMessages = document.getElementById('chat-messages');

    if (chatbotButton && chatbotContainer && closeChatbotBtn && chatInput && sendChatBtn && chatMessages) {
        // Abrir/Cerrar Chatbot
        chatbotButton.addEventListener('click', () => {
            chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
            if (chatbotContainer.style.display === 'flex') {
                chatInput.focus(); // Enfocar el input cuando se abre
                chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll al final al abrir
            }
        });

        closeChatbotBtn.addEventListener('click', () => {
            chatbotContainer.style.display = 'none';
        });

        // Enviar mensaje (al hacer clic o presionar Enter)
        sendChatBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        function sendMessage() {
            const userMessage = chatInput.value.trim();
            if (userMessage === '') return;

            displayMessage(userMessage, 'user');
            chatInput.value = ''; // Limpiar input

            // Simular respuesta del bot
            setTimeout(() => {
                const botResponse = getChatbotResponse(userMessage);
                displayMessage(botResponse, 'bot');
            }, 500); // Pequeño retraso para simular "pensamiento" del bot
        }

        // Función para mostrar mensajes en el chat
        function displayMessage(message, sender) {
            const messageElement = document.createElement('p');
            messageElement.classList.add(sender + '-message');
            messageElement.innerHTML = message; // Usar innerHTML para renderizar los enlaces
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll al final
        }

        // Lógica de respuesta del Chatbot
        function getChatbotResponse(message) {
            let response = "Lo siento, no entendí tu pregunta. Puedes preguntar sobre 'Inicio', 'Misión', 'Flota', 'Rastreo', 'Cobertura', 'Patios', 'Contacto', 'Privacidad', 'Servicios' o 'Presentación'."; // Respuesta por defecto

            const lowerCaseMessage = message.toLowerCase();

            if (lowerCaseMessage.includes("mision") || lowerCaseMessage.includes("vision") || lowerCaseMessage.includes("esencia")) {
                response = "Nuestra misión es ofrecer un servicio especializado en el movimiento de carga contenerizada con calidad y confiabilidad. Nuestra visión es ser líderes en el transporte de contenedores. Para más detalles, visita nuestra sección de Misión y Visión: <a href='#mision' onclick='document.getElementById(\"chatbot-container\").style.display=\"none\";'>Ir a Misión/Visión</a>";
            } else if (lowerCaseMessage.includes("flota") || lowerCaseMessage.includes("unidades") || lowerCaseMessage.includes("camiones")) {
                response = "Contamos con una flota moderna de 17 unidades, incluyendo sencillos, full y cajas secas de 53 pies, ideales para cargas contenerizadas de 20 y 40 pies. Conoce más sobre nuestra flota: <a href='#flota' onclick='document.getElementById(\"chatbot-container\").style.display=\"none\";'>Ir a Flota</a>";
            } else if (lowerCaseMessage.includes("rastreo satelital") || lowerCaseMessage.includes("rastreo") || lowerCaseMessage.includes("monitoreo")) {
                response = "Ofrecemos rastreo satelital 24/7 con monitoreo en tiempo real y tecnología avanzada para conocer la ubicación de tu mercancía y control remoto de la unidad. Para más información: <a href='#rastreo' onclick='document.getElementById(\"chatbot-container\").style.display=\"none\";'>Ir a Rastreo Satelital</a>";
            } else if (lowerCaseMessage.includes("cobertura") || lowerCaseMessage.includes("donde operan") || lowerCaseMessage.includes("republica mexicana")) {
                response = "Realizamos servicios de transporte a toda la República Mexicana, asegurando que tu mercancía llegue a su destino de forma segura y eficiente. Más detalles sobre nuestra cobertura: <a href='#cobertura' onclick='document.getElementById(\"chatbot-container\").style.display=\"none\";'>Ir a Cobertura</a>";
            } else if (lowerCaseMessage.includes("patios") || lowerCaseMessage.includes("ubicacion") || lowerCaseMessage.includes("manzanillo") || lowerCaseMessage.includes("tepotzotlan") || lowerCaseMessage.includes("operaciones")) {
                response = "Disponemos de patios de operaciones estratégicos en Tepotzotlán, Estado de México, y Manzanillo, Colima, para una logística eficiente. Encuentra nuestras ubicaciones: <a href='#patios' onclick='document.getElementById(\"chatbot-container\").style.display=\"none\";'>Ir a Patios de Operaciones</a>";
            } else if (lowerCaseMessage.includes("contacto") || lowerCaseMessage.includes("email") || lowerCaseMessage.includes("correo") || lowerCaseMessage.includes("llamar")) {
                response = "Puedes contactarnos directamente a través de nuestro correo general: jivalogistics@outlook.com. También te invitamos a usar nuestro formulario de contacto en la sección: <a href='#contacto' onclick='document.getElementById(\"chatbot-container\").style.display=\"none\";'>Ir a Contacto</a>";
            } else if (lowerCaseMessage.includes("privacidad") || lowerCaseMessage.includes("politicas") || lowerCaseMessage.includes("aviso de privacidad")) {
                response = "En JIVA LOGISTICS, la protección de tus datos es fundamental. Consulta nuestras políticas de privacidad para conocer cómo manejamos tu información: <a href='#privacidad' onclick='document.getElementById(\"chatbot-container\").style.display=\"none\";'>Ir a Políticas de Privacidad</a>";
            } else if (lowerCaseMessage.includes("servicios") || lowerCaseMessage.includes("que servicios") || lowerCaseMessage.includes("que ofrecen")) {
                response = "Ofrecemos transporte de carga contenerizada, transporte en caja seca México, logística de contenedores 20 y 40 pies, rastreo satelital, transporte seguro de mercancía y transporte nacional. Descubre todos nuestros servicios: <a href='#servicios' onclick='document.getElementById(\"chatbot-container\").style.display=\"none\";'>Ir a Nuestros Servicios</a>";
            } else if (lowerCaseMessage.includes("presentación") || lowerCaseMessage.includes("qr") || lowerCaseMessage.includes("descargar presentación")) {
                response = "Puedes descargar nuestra presentación completa en PDF escaneando el código QR en la sección correspondiente: <a href=\"images/JIVA_LOGISTIC_actual.pdf\" target=\"_blank\" onclick='document.getElementById(\"chatbot-container\").style.display=\"none\";'>Descargar Presentación (PDF)</a>";
            } else if (lowerCaseMessage.includes("hola") || lowerCaseMessage.includes("saludos")) {
                response = "¡Hola! Soy tu asistente virtual de JIVA LOGISTICS. ¿En qué puedo ayudarte hoy?";
            } else if (lowerCaseMessage.includes("gracias") || lowerCaseMessage.includes("muchas gracias")) {
                response = "De nada, estoy aquí para ayudarte.";
            } else if (lowerCaseMessage.includes("inicio") || lowerCaseMessage.includes("principal")) {
                response = "Puedes regresar al inicio de la página aquí: <a href='#inicio' onclick='document.getElementById(\"chatbot-container\").style.display=\"none\";'>Ir a Inicio</a>";
            }

            return response;
        }
    }

    // ---- Lógica de Reconocimiento de Voz (Web Speech API) ----
    const voiceCommandToggle = document.getElementById('voice-command-toggle');
    let recognition;
    let isListening = false;

    if (voiceCommandToggle) {
        if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            console.warn('Tu navegador no soporta el reconocimiento de voz. El botón de voz podría no funcionar.');
            // voiceCommandToggle.style.display = 'none'; // Si prefieres ocultarlo
        } else {
            recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'es-ES'; // Idioma español
            recognition.interimResults = false; // Solo resultados finales
            recognition.maxAlternatives = 1; // Solo la mejor alternativa

            voiceCommandToggle.addEventListener('click', () => {
                if (isListening) {
                    recognition.stop();
                } else {
                    try {
                        recognition.start();
                    } catch (e) {
                        console.error('Error al iniciar el reconocimiento de voz:', e);
                        alert('No se pudo iniciar el reconocimiento de voz. Asegúrate de que tu micrófono esté conectado y de haber dado permisos.');
                    }
                }
            });

            recognition.onstart = () => {
                isListening = true;
                voiceCommandToggle.classList.add('listening');
                voiceCommandToggle.textContent = 'Escuchando...';
                if (chatMessages) {
                    displayMessage('JIVA Bot está escuchando tus comandos de voz.', 'bot');
                }
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                if (chatMessages) {
                    displayMessage(`Tú (Voz): ${transcript}`, 'user');
                }
                const botResponse = getChatbotResponse(transcript);
                speakText(botResponse); // Hacer que el bot hable la respuesta
                if (chatMessages) {
                    displayMessage(botResponse, 'bot');
                }
            };

            recognition.onend = () => {
                isListening = false;
                voiceCommandToggle.classList.remove('listening');
                voiceCommandToggle.textContent = 'Voz';
            };

            recognition.onerror = (event) => {
                console.error('Error de reconocimiento de voz:', event.error);
                isListening = false;
                voiceCommandToggle.classList.remove('listening');
                voiceCommandToggle.textContent = 'Voz';
                let errorMessage = 'Hubo un error con el reconocimiento de voz.';
                if (event.error === 'not-allowed') {
                    errorMessage = 'Permiso de micrófono denegado. Por favor, habilita el micrófono en la configuración de tu navegador.';
                } else if (event.error === 'no-speech') {
                    errorMessage = 'No se detectó habla. Inténtalo de nuevo.';
                }
                if (chatMessages) {
                    displayMessage(`JIVA Bot: ${errorMessage}`, 'bot');
                }
            };
        }

        // Función para que el bot hable
        function speakText(text) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES'; // Idioma español
            utterance.volume = 1; // Volumen (0 a 1)
            utterance.rate = 1;    // Velocidad (0.1 a 10)
            utterance.pitch = 1;   // Tono (0 a 2)

            // Eliminar etiquetas HTML para que solo lea el texto
            const cleanText = text.replace(/<[^>]*>/g, ''); // Elimina cualquier etiqueta HTML
            utterance.text = cleanText;

            window.speechSynthesis.speak(utterance);
        }
    }

    // --- Lógica para desplazamiento suave de enlaces de ancla ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Si el enlace está dentro del chatbot y no es un PDF
            if (this.closest('#chatbot-container') && !this.href.includes('.pdf')) {
                e.preventDefault(); // Previene el comportamiento por defecto del enlace
                document.getElementById('chatbot-container').style.display = 'none'; // Cierra el chatbot
                const targetId = this.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (!this.closest('#chatbot-container')) { // Si el enlace no está dentro del chatbot
                e.preventDefault(); // Previene el comportamiento por defecto del enlace
                const targetId = this.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // Si es un enlace PDF dentro del chatbot, se deja que se abra en una nueva pestaña (target="_blank")
        });
    });
});
