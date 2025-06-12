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
    const voiceToggleBtn = document.getElementById('voice-command-toggle');

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
            userMessageDiv.classList.add('user-message');
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
                botMessageDiv.innerHTML = botResponse; // Usar innerHTML para <br> y los nuevos <a>
                chatMessages.appendChild(botMessageDiv);

                chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar de nuevo
            }, 500); // Pequeña pausa para simular que el bot está "pensando"
        }

        function getBotResponse(message) {
            message = message.toLowerCase(); // Convertir a minúsculas para facilitar la comparación

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

        // ---- Funcionalidad de Voz (Web Speech API) ----
        let recognition;
        // Agregamos una bandera para evitar múltiples inicios accidentales
        let isRecognizing = false; 

        if (window.SpeechRecognition || window.webkitSpeechRecognition) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.lang = 'es-MX'; // Idioma español de México
            recognition.interimResults = false; // No mostrar resultados intermedios
            recognition.maxAlternatives = 1; // Solo la mejor alternativa
            // Añadido para intentar detectar más fácilmente si se para de hablar
            recognition.continuous = false; // Solo una captura por cada start()
            recognition.interimResults = false; // Solo resultados finales


            recognition.onstart = () => {
                isRecognizing = true; // Actualiza la bandera
                if (voiceToggleBtn) {
                    voiceToggleBtn.classList.add('listening');
                    voiceToggleBtn.textContent = 'Escuchando...';
                }
                chatInput.placeholder = 'Dime tu pregunta...';
                console.log('🗣️ Reconocimiento de voz iniciado.');
            };

            recognition.onresult = (event) => {
                // console.log('Resultado crudo del reconocimiento:', event.results); // Línea de depuración útil
                const transcript = event.results[0][0].transcript;
                const confidence = event.results[0][0].confidence; // Obtener la confianza
                console.log(`🎤 Transcripción detectada: "${transcript}" (Confianza: ${confidence.toFixed(2)})`);
                
                // Opcional: Puedes establecer un umbral de confianza si las transcripciones son muy malas
                // if (confidence > 0.7) { 
                chatInput.value = transcript;
                sendMessage(); // Enviar el mensaje automáticamente
                // } else {
                //     console.warn('Transcripción con baja confianza, no enviada:', transcript);
                //     const botMessageDiv = document.createElement('p');
                //     botMessageDiv.classList.add('bot-message');
                //     botMessageDiv.textContent = 'No pude entenderte bien. ¿Puedes repetir o escribir?';
                //     chatMessages.appendChild(botMessageDiv);
                //     chatMessages.scrollTop = chatMessages.scrollHeight;
                // }
            };

            recognition.onspeechend = () => {
                isRecognizing = false; // Actualiza la bandera
                recognition.stop();
                if (voiceToggleBtn) {
                    voiceToggleBtn.classList.remove('listening');
                    voiceToggleBtn.textContent = 'Voz';
                }
                chatInput.placeholder = 'Escribe tu mensaje...';
                console.log('🛑 Fin del habla, reconocimiento detenido.');
            };

            // onend se dispara cuando el reconocimiento termina, incluso por un error o stop()
            recognition.onend = () => {
                if (isRecognizing) { // Si onend se dispara y sigue "reconociendo", fue un error o interrupción
                    isRecognizing = false;
                    if (voiceToggleBtn) {
                        voiceToggleBtn.classList.remove('listening');
                        voiceToggleBtn.textContent = 'Voz';
                    }
                    chatInput.placeholder = 'Escribe tu mensaje...';
                    console.log('⚠️ Reconocimiento finalizado inesperadamente.');
                }
            };

            recognition.onerror = (event) => {
                isRecognizing = false; // Actualiza la bandera
                console.error('❌ Error de reconocimiento de voz:', event.error, event.message);
                if (voiceToggleBtn) {
                    voiceToggleBtn.classList.remove('listening');
                    voiceToggleBtn.textContent = 'Voz';
                }
                chatInput.placeholder = 'Escribe tu mensaje...';
                
                // Mensajes más claros para el usuario
                if (event.error === 'not-allowed') {
                    alert('Permiso de micrófono denegado. Por favor, habilita el micrófono en la configuración de tu navegador para usar el comando de voz.');
                } else if (event.error === 'no-speech') {
                    const botMessageDiv = document.createElement('p');
                    botMessageDiv.classList.add('bot-message');
                    botMessageDiv.textContent = 'No detecté ninguna voz. ¿Puedes intentarlo de nuevo?';
                    chatMessages.appendChild(botMessageDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                } else if (event.error === 'audio-capture') {
                    alert('Problema al acceder al micrófono. Asegúrate de que esté conectado y no esté siendo usado por otra aplicación.');
                } else if (event.error === 'network') {
                    alert('Error de red al intentar el reconocimiento de voz. Verifica tu conexión a internet.');
                }
            };

            if (voiceToggleBtn) {
                voiceToggleBtn.addEventListener('click', () => {
                    // Evita iniciar múltiples reconocimientos si ya está activo
                    if (isRecognizing) {
                        console.log('🔇 Deteniendo reconocimiento de voz manualmente.');
                        recognition.stop();
                        return;
                    }
                    
                    try {
                        recognition.start();
                    } catch (error) {
                        console.warn('El reconocimiento de voz ya está activo o hay un error al intentar iniciarlo:', error);
                        // Si el error es un InvalidStateError, significa que ya está activo y lo detendremos.
                        if (error.name === 'InvalidStateError') {
                            recognition.stop(); // Intentar detener si ya está activo
                        }
                        // Asegurar que el estado del botón se resetea si algo falla
                        voiceToggleBtn.classList.remove('listening');
                        voiceToggleBtn.textContent = 'Voz';
                        isRecognizing = false;
                    }
                });
            }

        } else {
            if (voiceToggleBtn) { // Oculta el botón si la API no es soportada
                voiceToggleBtn.style.display = 'none';
            }
            console.warn('🚫 Web Speech API no es soportada en este navegador.');
            // Opcional: Informar al usuario
            // alert('Lo sentimos, tu navegador no soporta el comando de voz.');
        }
    } // Fin del if(chatbotButton && ...)
});
