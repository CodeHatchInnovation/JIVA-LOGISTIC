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

    // ---- Chatbot Funcionalidad ----
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbotBtn = document.getElementById('close-chatbot-btn');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatMessages = document.getElementById('chat-messages');
    const voiceToggleBtn = document.getElementById('voice-command-toggle');

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
            } else if (/(mision|visión)/.test(message)) { // Asegúrate de probar con y sin tilde
                return "Nuestra Misión es ofrecer un servicio especializado con calidad, confiabilidad y seguridad, buscando la continuidad comercial a largo plazo. Nuestra Visión es consolidarnos como empresa líder en el transporte de contenedores, reconocida por su eficiencia e innovación. Para más información, visita nuestra sección de <a href='#mision'>Misión y Visión</a>.";
            } else if (/(flota|camiones|unidades)/.test(message)) {
                return "Contamos con 17 unidades: 11 sencillos, 5 full expandibles y 6 cajas secas. Para ver la flota completa, visita nuestra sección de <a href='#flota'>Flota</a>.";
            } else if (/(rastreo|seguridad|monitoreo)/.test(message)) {
                return "Ofrecemos monitoreo satelital 24/7 con rastreo en tiempo real y apagado remoto de unidades en caso de robo. Trabajamos con ELITE, Zapata Aeropuerto, FREIT y PROTRACK. Para más detalles, visita nuestra sección de <a href='#rastreo'>Rastreo Satelital</a>.";
            } else if (/(cobertura|donde operan|ciudades)/.test(message)) {
                return "Realizamos servicios de transporte a toda la República Mexicana. Para más información, visita nuestra sección de <a href='#cobertura'>Cobertura</a>.";
            } else if (/(patios|ubicacion|tepotzotlan|manzanillo)/.test(message)) {
                return "Tenemos patios de operaciones en Tepotzotlán, Estado de México y en Manzanillo, Colima. Para ver sus ubicaciones y mapas, visita nuestra sección de <a href='#patios'>Patios</a>.";
            } else if (/(contacto|cotizacion|telefono|email|correo)/.test(message)) { // Añadido 'correo'
                return "Puedes contactarnos a través de nuestro <a href='#contacto'>formulario de Contacto</a>, o llamar a Fernando Lucas al <a href='tel:+525516273406'>5516273406</a> o a Armando Martinez al <a href='tel:+525542639390'>5542639390</a>. También puedes enviar un correo a <a href='mailto:jiva.operaciones@gmail.com'>jiva.operaciones@gmail.com</a>.";
            } else if (/(privacidad|politicas)/.test(message)) {
                return "Nuestras <a href='#privacidad'>políticas de privacidad</a> detallan cómo recopilamos y protegemos tus datos personales. Puedes revisarlas completas en la sección de Privacidad de la página.";
            } else if (/(servicios)/.test(message)) {
                return "Ofrecemos transporte de carga contenerizada, transporte en caja seca, logística de contenedores 20 y 40 pies, rastreo satelital y transporte seguro de mercancía. Para ver todos nuestros servicios, visita la sección de <a href='#servicios'>Nuestros Principales Servicios</a>.";
            } else if (/(presentacion|qr|pdf)/.test(message)) {
                 return "Puedes ver nuestra presentación completa en PDF escaneando el código QR en la sección <a href='#qr-section'>Nuestra Presentación en QR</a> o <a href='JIVA LOGISTIC actual.pdf' target='_blank'>haciendo clic aquí para descargar el PDF</a>."; // Agregué el link de descarga directo
            } else if (/(gracias|adios|bye)/.test(message)) {
                return "¡De nada! Si tienes más preguntas, no dudes en consultar. ¡Hasta luego!";
            } else {
                return "Lo siento, no entendí tu pregunta. Por favor, intenta de nuevo o reformula. Puedes preguntar sobre:<br> \"Misión\", \"Flota\", \"Rastreo\", \"Cobertura\", \"Patios\", \"Contacto\", \"Privacidad\", \"Servicios\" o \"Presentación\".";
            }
        }

        // ---- Funcionalidad de Voz (Web Speech API) ----
        let recognition;
        let isRecognizing = false;

        if (window.SpeechRecognition || window.webkitSpeechRecognition) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.lang = 'es-MX';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            recognition.continuous = false; // Queremos un resultado único después de hablar
            
            // *** NUEVOS AJUSTES IMPORTANTES ***
            // Define el tiempo máximo de inactividad antes de que el reconocimiento se detenga.
            // Si el usuario deja de hablar, recognition.onspeechend se dispara.
            recognition.maxSpeechTimeout = 5000; // 5 segundos, ajustable
            // Define el tiempo que la API esperará para detectar el inicio del habla.
            recognition.speechStartThreshold = 500; // 0.5 segundos, si no hay habla en este tiempo, puede dar 'no-speech'
            recognition.grammars = null; // No usamos gramáticas específicas, por defecto es suficiente

            recognition.onstart = () => {
                isRecognizing = true;
                if (voiceToggleBtn) {
                    voiceToggleBtn.classList.add('listening');
                    voiceToggleBtn.textContent = 'Escuchando...';
                }
                chatInput.placeholder = 'Dime tu pregunta...';
                console.log('🗣️ [VOZ] Reconocimiento de voz iniciado. Esperando habla...');
            };

            recognition.onresult = (event) => {
                // Si llegamos aquí, significa que la API detectó una transcripción con suficiente confianza.
                const transcript = event.results[0][0].transcript;
                const confidence = event.results[0][0].confidence;
                
                console.log(`🎤 [VOZ] Transcripción detectada: "${transcript}" (Confianza: ${confidence.toFixed(2)})`);
                
                // Podemos agregar un umbral de confianza si las transcripciones son muy ruidosas/erróneas
                if (confidence > 0.6) { // Ajusta este valor (0.0 a 1.0) si es necesario
                    chatInput.value = transcript;
                    sendMessage();
                } else {
                    console.warn(`⚠️ [VOZ] Transcripción con baja confianza (${confidence.toFixed(2)}): "${transcript}". No se procesa.`);
                    const botMessageDiv = document.createElement('p');
                    botMessageDiv.classList.add('bot-message');
                    botMessageDiv.textContent = 'No pude entenderte claramente. Por favor, habla más claro o escribe tu mensaje.';
                    chatMessages.appendChild(botMessageDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            };

            recognition.onspeechend = () => {
                // Esto se dispara cuando la API detecta silencio o fin del habla
                console.log('🔇 [VOZ] Fin del habla detectado. Deteniendo reconocimiento...');
                // No detener aquí si queremos que `onresult` se dispare después de un breve silencio.
                // recognition.stop(); // ¡IMPORTANTE: NO detener aquí inmediatamente si onresult no se disparó ya!
            };

            recognition.onend = () => {
                // Este evento se dispara cuando el reconocimiento se detiene por cualquier razón (stop(), onspeechend, error)
                if (isRecognizing) { // Solo si estaba activo y no se detuvo por onresult
                    isRecognizing = false;
                    if (voiceToggleBtn) {
                        voiceToggleBtn.classList.remove('listening');
                        voiceToggleBtn.textContent = 'Voz';
                    }
                    chatInput.placeholder = 'Escribe tu mensaje...';
                    console.log('🛑 [VOZ] Reconocimiento finalizado (evento onend).');
                }
            };

            recognition.onerror = (event) => {
                isRecognizing = false;
                console.error('❌ [VOZ] Error de reconocimiento de voz:', event.error, event.message);
                if (voiceToggleBtn) {
                    voiceToggleBtn.classList.remove('listening');
                    voiceToggleBtn.textContent = 'Voz';
                }
                chatInput.placeholder = 'Escribe tu mensaje...';
                
                let errorMessage = 'Ocurrió un error con el reconocimiento de voz. Por favor, intenta de nuevo.';
                if (event.error === 'not-allowed') {
                    errorMessage = 'Permiso de micrófono denegado. Por favor, habilita el micrófono en la configuración de tu navegador.';
                    alert(errorMessage); // Usar alert para esto es más directo
                } else if (event.error === 'no-speech') {
                    errorMessage = 'No detecté ninguna voz. ¿Puedes intentarlo de nuevo y hablar más claro?';
                } else if (event.error === 'audio-capture') {
                    errorMessage = 'Problema al acceder al micrófono. Asegúrate de que esté conectado y no esté siendo usado por otra aplicación.';
                    alert(errorMessage);
                } else if (event.error === 'network') {
                    errorMessage = 'Error de red al intentar el reconocimiento de voz. Verifica tu conexión a internet.';
                    alert(errorMessage);
                } else if (event.error === 'aborted') {
                    // Esto ocurre si llamas a stop() antes de que onresult se dispare
                    console.log('ℹ️ [VOZ] Reconocimiento abortado manualmente.');
                    return; // No mostrar mensaje de error al usuario por un aborto manual
                }

                // Solo mostrar mensaje de error al usuario si no es un 'not-allowed' (ya tiene alert) o 'aborted'
                if (event.error !== 'not-allowed' && event.error !== 'aborted') {
                    const botMessageDiv = document.createElement('p');
                    botMessageDiv.classList.add('bot-message');
                    botMessageDiv.textContent = errorMessage;
                    chatMessages.appendChild(botMessageDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            };

            if (voiceToggleBtn) {
                voiceToggleBtn.addEventListener('click', () => {
                    if (isRecognizing) {
                        console.log('🔇 [VOZ] Deteniendo reconocimiento de voz manualmente.');
                        recognition.stop(); // Detener si ya está escuchando
                        return;
                    }
                    
                    try {
                        recognition.start();
                    } catch (error) {
                        console.warn('⚠️ [VOZ] Error al intentar iniciar el reconocimiento de voz:', error);
                        if (error.name === 'InvalidStateError') {
                            // Esto puede ocurrir si se llama start() y ya está activo
                            console.log('ℹ️ [VOZ] Reconocimiento ya activo, intentando detener y reiniciar.');
                            recognition.stop();
                            // Pequeño retardo para permitir que se detenga completamente antes de reiniciar
                            setTimeout(() => {
                                try {
                                    recognition.start();
                                } catch (e) {
                                    console.error('❌ [VOZ] Fallo al reiniciar el reconocimiento:', e);
                                    alert('No se pudo iniciar el reconocimiento de voz. Intenta de nuevo.');
                                }
                            }, 100); 
                        } else {
                            alert('No se pudo iniciar el reconocimiento de voz. Asegúrate de tener micrófono y permisos.');
                        }
                        // Asegurar que el estado del botón se resetea si algo falla
                        if (voiceToggleBtn.classList.contains('listening')) {
                             voiceToggleBtn.classList.remove('listening');
                             voiceToggleBtn.textContent = 'Voz';
                        }
                        isRecognizing = false;
                    }
                });
            }

        } else {
            if (voiceToggleBtn) {
                voiceToggleBtn.style.display = 'none';
            }
            console.warn('🚫 [VOZ] Web Speech API no es soportada en este navegador.');
            const botMessageDiv = document.createElement('p');
            botMessageDiv.classList.add('bot-message');
            botMessageDiv.textContent = 'Tu navegador no soporta el comando de voz. Por favor, usa el teclado para escribir.';
            chatMessages.appendChild(botMessageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
});
