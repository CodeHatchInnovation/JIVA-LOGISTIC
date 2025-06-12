document.addEventListener('DOMContentLoaded', () => {
    // ---- Navbar Toggle para móviles ----
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

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

    if (carouselSlide && carouselImages.length > 0 && prevBtn && nextBtn) {
        let counter = 0;
        const size = carouselImages[0].clientWidth;

        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

        nextBtn.addEventListener('click', () => {
            if (counter >= carouselImages.length - 1) {
                counter = -1;
            }
            counter++;
            carouselSlide.style.transition = 'transform 0.5s ease-in-out';
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        });

        prevBtn.addEventListener('click', () => {
            if (counter <= 0) {
                counter = carouselImages.length;
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
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            console.log('Formulario enviado:', { name, email, message });

            if (contactMessage) {
                contactMessage.textContent = '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.';
                contactMessage.style.color = 'green';
            }
            contactForm.reset();

            setTimeout(() => {
                if (contactMessage) {
                    contactMessage.textContent = '';
                }
            }, 5000);
        });
    }

    // ---- Chatbot Funcionalidad (EXISTENTE, INDEPENDIENTE DE LA VOZ) ----
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbotBtn = document.getElementById('close-chatbot-btn');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatMessages = document.getElementById('chat-messages');

    if (chatbotButton && chatbotContainer && closeChatbotBtn && chatInput && sendChatBtn && chatMessages) {
        chatbotContainer.style.display = 'none';

        chatbotButton.addEventListener('click', () => {
            const isHidden = chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '';
            chatbotContainer.style.display = isHidden ? 'flex' : 'none';
            
            if (isHidden) {
                chatInput.focus();
                chatMessages.scrollTop = chatMessages.scrollHeight;
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

            const userMessageDiv = document.createElement('p');
            userMessageDiv.classList.add('user-message');
            userMessageDiv.textContent = userInput;
            chatMessages.appendChild(userMessageDiv);

            chatInput.value = '';

            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                const botResponse = getBotResponse(userInput);
                const botMessageDiv = document.createElement('p');
                botMessageDiv.classList.add('bot-message');
                botMessageDiv.innerHTML = botResponse;
                chatMessages.appendChild(botMessageDiv);

                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 500);
        }

        function getBotResponse(message) {
            message = message.toLowerCase();

            if (/(hola|saludos)/.test(message)) {
                return "¡Hola! ¿En qué puedo ayudarte hoy?";
            } else if (/(mision|vision)/.test(message)) {
                return "Nuestra Misión es ofrecer un servicio especializado con calidad, confiabilidad y seguridad, buscando la continuidad comercial a largo plazo. Nuestra Visión es consolidarnos como empresa líder en el transporte de contenedores, reconocida por su eficiencia e innovación. Para más información, visita nuestra sección de <a href='#mision'>Misión y Visión</a>.";
            } else if (/(flota|camiones|unidades)/.test(message)) {
                return "Contamos con 17 unidades: 11 sencillos, 5 full expandibles y 6 cajas secas. Para ver la flota completa, visita nuestra sección de <a href='#flota'>Flota</a>.";
            } else if (/(rastreo|seguridad|monitoreo)/.test(message)) {
                return "Ofrecemos monitoreo satelital 24/7 con rastreo en tiempo real y apagado remoto de unidades en caso de robo. Trabajamos con ELITE, Zapata Aeropuerto, FREIT y PROTRACK. Para más detalles, visita nuestra sección de <a href='#rastreo'>Rastreo Satelital</a>.";
            } else if (/(cobertura|donde operan|ciudades)/.test(message)) {
                return "Realizamos servicios de transporte a toda la República Mexicana. Para más información, visita nuestra sección de <a href='#cobertura'>Cobertura</a>.";
            } else if (/(patios|ubicacion|tepotzotlan|manzanillo)/.test(message)) {
                return "Tenemos patios de operaciones en Tepotzotlán, Estado de México y en Manzanillo, Colima. Para ver sus ubicaciones y mapas, visita nuestra sección de <a href='#patios'>Patios</a>.";
            } else if (/(contacto|cotizacion|telefono|email)/.test(message)) {
                return "Puedes contactarnos a través de nuestro <a href='#contacto'>formulario de Contacto</a>, o llamar a Fernando Lucas al <a href='tel:+525516273406'>5516273406</a> o a Armando Martinez al <a href='tel:+525542639390'>5542639390</a>. También puedes enviar un correo a <a href='mailto:jiva.operaciones@gmail.com'>jiva.operaciones@gmail.com</a>.";
            } else if (/(privacidad|politicas)/.test(message)) {
                return "Nuestras <a href='#privacidad'>políticas de privacidad</a> detallan cómo recopilamos y protegemos tus datos personales. Puedes revisarlas completas en la sección de Privacidad de la página.";
            } else if (/(servicios)/.test(message)) {
                return "Ofrecemos transporte de carga contenerizada, transporte en caja seca, logística de contenedores 20 y 40 pies, rastreo satelital y transporte seguro de mercancía. Para ver todos nuestros servicios, visita la sección de <a href='#servicios'>Nuestros Principales Servicios</a>.";
            } else if (/(presentacion|qr|pdf)/.test(message)) {
                 return "Puedes ver nuestra presentación completa en PDF escaneando el código QR en la sección <a href='#qr-section'>Nuestra Presentación en QR</a>";
            } else if (/(gracias|adios|bye)/.test(message)) {
                return "¡De nada! Si tienes más preguntas, no dudes en consultar. ¡Hasta luego!";
            } else {
                return "Lo siento, no entendí tu pregunta. Por favor, intenta de nuevo o reformula. Puedes preguntar sobre:<br> \"Misión\", \"Flota\", \"Rastreo\", \"Cobertura\", \"Patios\", \"Contacto\", \"Privacidad\", \"Servicios\" o \"Presentación\".";
            }
        }
    } // Fin del if(chatbotButton && ...)

    // ---- Funcionalidad de NAVEGACIÓN por Voz (INDEPENDIENTE) ----
    const voiceNavToggleBtn = document.getElementById('voice-nav-toggle'); // Nuevo ID para el botón de navegación por voz

    let navRecognition;
    let isNavRecognizing = false;

    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        navRecognition = new SpeechRecognition();
        navRecognition.lang = 'es-MX';
        navRecognition.interimResults = false;
        navRecognition.maxAlternatives = 1;
        navRecognition.continuous = false; // Escucha una sola frase/comando

        // Definir los comandos y sus destinos
        const navigationCommands = {
            'misión': '#mision',
            'visión': '#mision', // Puedes mapear varias palabras a la misma sección
            'flota': '#flota',
            'camiones': '#flota',
            'unidades': '#flota',
            'rastreo': '#rastreo',
            'seguridad': '#rastreo',
            'monitoreo': '#rastreo',
            'cobertura': '#cobertura',
            'patios': '#patios',
            'ubicación': '#patios',
            'tepotzotlán': '#patios',
            'manzanillo': '#patios',
            'contacto': '#contacto',
            'servicios': '#servicios',
            'presentación': '#qr-section', // Asumiendo que esta es la sección de QR/PDF
            'privacidad': '#privacidad'
        };

        navRecognition.onstart = () => {
            isNavRecognizing = true;
            if (voiceNavToggleBtn) {
                voiceNavToggleBtn.classList.add('listening');
                voiceNavToggleBtn.textContent = 'Escuchando Voz Nav...';
            }
            console.log('✅ Navegación por voz: Reconocimiento iniciado.');
        };

        navRecognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            const confidence = event.results[0][0].confidence;
            console.log(`🎤 Navegación por voz: Transcripción detectada: "${transcript}" (Confianza: ${confidence.toFixed(2)})`);
            
            // Buscar una coincidencia en los comandos de navegación
            let foundMatch = false;
            for (const keyword in navigationCommands) {
                if (transcript.includes(keyword)) { // Usar includes para ser más flexible
                    const targetId = navigationCommands[keyword];
                    console.log(`➡️ Navegando a: ${targetId} por comando de voz.`);
                    window.location.hash = targetId; // Desplaza la página
                    foundMatch = true;
                    break; // Salir del bucle una vez que se encuentra una coincidencia
                }
            }

            if (!foundMatch) {
                console.log('🤷‍♀️ Navegación por voz: No se reconoció un comando de navegación válido.');
                // Puedes dar una retroalimentación al usuario aquí, quizás con un alert o un mensaje temporal
                // alert('Comando de navegación no reconocido. Intenta con: Misión, Flota, Contacto, etc.');
            }
            navRecognition.stop(); // Detener después de procesar el resultado
        };

        navRecognition.onspeechend = () => {
            console.log('🗣️ Navegación por voz: Se detectó el final del habla.');
            // navRecognition.stop() ya debería ser llamado por onresult o onend
        };

        navRecognition.onerror = (event) => {
            isNavRecognizing = false;
            console.error('❌ Navegación por voz: Error de reconocimiento:', event.error, event.message);
            if (voiceNavToggleBtn) {
                voiceNavToggleBtn.classList.remove('listening');
                voiceNavToggleBtn.textContent = 'Voz Nav';
            }

            if (event.error === 'not-allowed') {
                alert('Permiso de micrófono denegado para navegación por voz. Por favor, habilítalo.');
            } else if (event.error === 'no-speech') {
                console.warn('Navegación por voz: No se detectó habla.');
            }
            // Asegurarse de detener el reconocimiento en caso de error
            navRecognition.stop(); 
        };

        navRecognition.onend = () => {
            console.log('🔚 Navegación por voz: Reconocimiento finalizado (onend).');
            isNavRecognizing = false;
            if (voiceNavToggleBtn) {
                voiceNavToggleBtn.classList.remove('listening');
                voiceNavToggleBtn.textContent = 'Voz Nav';
            }
        };

        if (voiceNavToggleBtn) {
            voiceNavToggleBtn.addEventListener('click', () => {
                if (isNavRecognizing) {
                    console.log('🔇 Navegación por voz: Deteniendo manualmente.');
                    navRecognition.stop();
                    return;
                }
                
                try {
                    navRecognition.start();
                } catch (error) {
                    console.warn('Navegación por voz: Error al iniciar el reconocimiento:', error);
                    if (error.name === 'InvalidStateError') {
                        navRecognition.stop();
                        setTimeout(() => {
                            if (!isNavRecognizing) {
                                try {
                                    navRecognition.start();
                                } catch (err) {
                                    console.error('Navegación por voz: Error al intentar reiniciar:', err);
                                }
                            }
                        }, 100);
                    } else {
                        if (voiceNavToggleBtn) {
                            voiceNavToggleBtn.classList.remove('listening');
                            voiceNavToggleBtn.textContent = 'Voz Nav';
                        }
                        isNavRecognizing = false;
                    }
                }
            });
        }

    } else { // Si el navegador no soporta la API o el botón no existe
        if (voiceNavToggleBtn) {
            voiceNavToggleBtn.style.display = 'none'; // Ocultar el botón si no hay soporte
        }
        console.warn('🚫 Web Speech API no es soportada para navegación por voz.');
        // No alertamos al usuario directamente para no interrumpir, solo console.warn
    }
});
