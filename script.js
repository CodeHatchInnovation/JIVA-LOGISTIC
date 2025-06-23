document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Toggle para móviles ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Cierra el menú al hacer clic fuera
        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target) && window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Cierra el menú al hacer clic en un enlace de navegación
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) { // Solo cierra en móvil al hacer clic en enlace
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });

        // Ocultar el menú si se redimensiona a desktop mientras está abierto
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // --- Carrusel de Imágenes (Flota) ---
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (carouselSlide && carouselImages.length > 0 && prevBtn && nextBtn) {
        let counter = 0;
        const getSlideSize = () => carouselImages[0].clientWidth; // Función para obtener el tamaño dinámicamente
        let size = getSlideSize();

        // Inicializar la posición del carrusel
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

        nextBtn.addEventListener('click', () => {
            size = getSlideSize(); // Actualizar el tamaño antes de mover
            if (counter >= carouselImages.length - 1) {
                counter = -1; // Vuelve al inicio si llega al final (loop infinito)
            }
            counter++;
            carouselSlide.style.transition = 'transform 0.5s ease-in-out';
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        });

        prevBtn.addEventListener('click', () => {
            size = getSlideSize(); // Actualizar el tamaño antes de mover
            if (counter <= 0) {
                counter = carouselImages.length; // Vuelve al final si llega al inicio (loop infinito)
            }
            counter--;
            carouselSlide.style.transition = 'transform 0.5s ease-in-out';
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        });

        // Auto-play (opcional)
        setInterval(() => {
            nextBtn.click();
        }, 5000); // Cambia de imagen cada 5 segundos


        // Opcional: Ajustar el tamaño al redimensionar la ventana
        window.addEventListener('resize', () => {
            const newSize = carouselImages[0].clientWidth;
            carouselSlide.style.transition = 'none'; // Desactiva la transición temporalmente
            carouselSlide.style.transform = 'translateX(' + (-newSize * counter) + 'px)';
        });
    }


    // --- Lógica del Formulario de Contacto ---
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Previene el envío por defecto del formulario

            contactMessage.textContent = 'Enviando mensaje...';
            contactMessage.style.color = 'var(--accent-color)'; // Color de "enviando"

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            console.log('Datos del formulario de contacto (simulado):', data);

            // Simulación de envío de 1.5 segundos
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mensaje de éxito (simulado)
            contactMessage.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
            contactMessage.style.color = 'green';
            contactForm.reset(); // Limpiar formulario

            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);
        });
    }

    // --- Lógica del Chatbot ---
    // IMPORTANTE: Asegúrate de que los elementos del chatbot existan en el HTML desde el inicio.
    const chatbotButton = document.getElementById('chatbot-toggle-btn'); // Actualizado a chatbot-toggle-btn
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbotBtn = document.getElementById('close-chatbot-btn'); // Botón de cierre explícito
    const chatInput = document.getElementById('user-input'); // Actualizado a user-input
    const sendChatBtn = document.getElementById('send-button'); // Actualizado a send-button
    const chatMessages = document.getElementById('chat-messages');

    // Asegurarse de que todos los elementos críticos del chatbot existan antes de configurar los listeners
    if (chatbotButton && chatbotContainer && closeChatbotBtn && chatInput && sendChatBtn && chatMessages) {
        chatbotContainer.style.display = 'none'; // Asegura que esté oculto al inicio

        // Event listener para el botón PRINCIPAL (flotante) que abre/cierra el chatbot
        chatbotButton.addEventListener('click', () => {
            const isHidden = chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '';
            chatbotContainer.style.display = isHidden ? 'flex' : 'none';

            if (isHidden) {
                chatInput.focus(); // Enfocar el input al abrir
                chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar al final
            }
        });

        // Event listener para el botón de cierre dentro del chatbot (el "tache")
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

            const userMessageDiv = document.createElement('div'); // Cambiado a div
            userMessageDiv.classList.add('user-message');
            userMessageDiv.textContent = userInput;
            chatMessages.appendChild(userMessageDiv);

            chatInput.value = ''; // Limpiar input después de enviar

            chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar hacia abajo

            setTimeout(() => {
                const botResponse = getBotResponse(userInput);
                const botMessageDiv = document.createElement('div'); // Cambiado a div
                botMessageDiv.classList.add('bot-message');
                botMessageDiv.innerHTML = botResponse; // Usar innerHTML para enlaces en las respuestas
                chatMessages.appendChild(botMessageDiv);

                chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar hacia abajo después de la respuesta del bot
            }, 500); // Pequeña pausa para simular que el bot "piensa"
        }

        // Función que determina la respuesta del bot
        function getBotResponse(message) {
            message = message.toLowerCase(); // Convertir a minúsculas para facilitar la comparación

            if (/(hola|saludos)/.test(message)) {
                return "¡Hola! ¿En qué puedo ayudarte hoy?";
            } else if (/(mision|vision|esencia)/.test(message)) {
                return "Nuestra Misión es ofrecer un servicio especializado con calidad, confiabilidad y seguridad, buscando la continuidad comercial a largo plazo. Nuestra Visión es consolidarnos como empresa líder en el transporte de contenedores, reconocida por su eficiencia e innovación. Para más información, visita nuestra sección de <a href='#about'>Acerca de Nosotros</a>."; // Actualizado a #about
            } else if (/(flota|camiones|unidades)/.test(message)) {
                return "Contamos con una flota moderna y diversificada para satisfacer tus necesidades. Para ver la flota completa, visita nuestra sección de <a href='#fleet'>Nuestra Flota</a>."; // Actualizado a #fleet
            } else if (/(rastreo|seguridad|monitoreo|satelital)/.test(message)) {
                return "Ofrecemos monitoreo satelital 24/7 con rastreo en tiempo real. Para más detalles, visita nuestra sección de <a href='#tracking'>Rastreo Satelital 24/7</a>."; // Actualizado a #tracking
            } else if (/(cobertura|donde operan|ciudades|nacional)/.test(message)) {
                return "Realizamos servicios de transporte a toda la República Mexicana. Para más información, visita nuestra sección de <a href='#coverage'>Cobertura Nacional</a>."; // Actualizado a #coverage
            } else if (/(patios|ubicacion|tepotzotlan|manzanillo|operaciones)/.test(message)) {
                return "Tenemos patios de operaciones en la Ciudad de México y Monterrey. Para ver sus ubicaciones y mapas, visita nuestra sección de <a href='#patios'>Nuestros Patios y Bodegas</a>."; // Actualizado a #patios
            } else if (/(contacto|cotizacion|telefono|email|contactar|llamar)/.test(message)) {
                return "Puedes contactarnos a través de nuestro <a href='#contact'>formulario de Contacto</a>, o consultar los números y correos en la sección de Contacto."; // Actualizado a #contact y referencia general
            } else if (/(privacidad|politicas|aviso)/.test(message)) {
                return "Nuestras <a href='#privacy-policy'>políticas de privacidad</a> detallan cómo recopilamos y protegemos tus datos personales. Puedes revisarlas completas en la sección de Privacidad de la página."; // Actualizado a #privacy-policy
            } else if (/(servicios)/.test(message)) {
                return "Ofrecemos transporte de carga consolidada y dedicada, logística inversa, almacenamiento, soluciones de cadena de frío y más. Para ver todos nuestros servicios, visita la sección de <a href='#services'>Nuestros Servicios</a>."; // Actualizado a #services
            } else if (/(presentacion|qr|pdf|descargar)/.test(message)) {
                return "Puedes ver nuestra presentación completa escaneando el código QR en la sección <a href='#qr-code'>Escanea Nuestro QR</a>."; // Actualizado a #qr-code
            } else if (/(gracias|adios|bye)/.test(message)) {
                return "¡De nada! Si tienes más preguntas, no dudes en consultar. ¡Hasta luego!";
            } else if (/(asuntos a\/b|estrategia a\/b)/.test(message)) {
                return "Puedes encontrar más información sobre nuestra estrategia de Asuntos A/B en este enlace: <a href='https://jivalogistictestab.my.canva.site/estrategia-de-asuntos-a-b-con-jiva-logistics' target='_blank'>Asuntos A/B con Jiva Logistics</a>.";
            } else {
                return "Lo siento, no entendí tu pregunta. Por favor, intenta de nuevo o reformula. Puedes preguntar sobre:<br> \"Misión\", \"Flota\", \"Rastreo\", \"Cobertura\", \"Patios\", \"Contacto\", \"Privacidad\", \"Servicios\", \"Presentación\" o \"Asuntos A/B\".";
            }
        }
    } else {
        console.warn('Algunos elementos del chatbot no se encontraron en el DOM. Asegúrate de que estén presentes en tu HTML con los IDs correctos (chatbot-toggle-btn, chatbot-container, close-chatbot-btn, user-input, send-button, chat-messages).');
    }


    // --- Lógica de NAVEGACIÓN por Voz ---
    const voiceNavToggleBtn = document.getElementById('voice-button'); // ID del botón de voz para navegación, cambiado a 'voice-button'

    if (voiceNavToggleBtn) { // Solo ejecutar si el botón existe
        // Verificar soporte para la Web Speech API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;

        if (!SpeechRecognition) {
            console.warn('La API de reconocimiento de voz no es soportada en este navegador. El botón de voz será ocultado.');
            voiceNavToggleBtn.style.display = 'none'; // Ocultar el botón si no hay soporte
            return; // Salir de esta sección de voz si no hay soporte
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'es-MX'; // Ajustado a es-MX para mejor precisión en México
        recognition.interimResults = false; // No mostrar resultados intermedios
        recognition.maxAlternatives = 1; // La alternativa más probable
        recognition.continuous = false; // Escucha una sola frase por activación

        // Función auxiliar para desplazar a una sección
        const scrollToSection = (id) => {
            const section = document.getElementById(id);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                console.log(`Navegando a la sección: ${id}`);
                // Cierra el menú de navegación móvil si está abierto
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            } else {
                console.warn(`La sección con ID "${id}" no se encontró.`);
                alert(`Lo siento, la sección "${id.replace('#', '')}" no se encontró.`);
            }
        };

        voiceNavToggleBtn.addEventListener('click', () => {
            try {
                recognition.start();
                voiceNavToggleBtn.textContent = 'Escuchando...';
                voiceNavToggleBtn.classList.add('listening'); // Añadir clase para estilos CSS
                console.log('✅ Reconocimiento de voz para navegación iniciado.');
            } catch (e) {
                console.error('Error al iniciar el reconocimiento de voz para navegación:', e);
                voiceNavToggleBtn.textContent = 'Asistente de Voz'; // Resetear texto del botón
                voiceNavToggleBtn.classList.remove('listening'); // Quitar clase de escucha
                let errorMessage = 'No se pudo iniciar el reconocimiento de voz.';
                if (e.name === 'InvalidStateError') {
                    errorMessage += ' Parece que ya está activo o se intentó iniciar mientras estaba en un estado inválido.';
                    // Intentar detener y reiniciar si es un InvalidStateError
                    recognition.stop(); // Intentar detener cualquier instancia previa
                    setTimeout(() => { // Pequeña pausa para permitir que se detenga completamente
                        try {
                            recognition.start(); // Reintentar iniciar
                            voiceNavToggleBtn.textContent = 'Escuchando...';
                            voiceNavToggleBtn.classList.add('listening');
                        } catch (retryError) {
                            console.error('Error al reintentar iniciar el reconocimiento:', retryError);
                            alert(errorMessage + ' Intenta de nuevo.'); // Si falla el reintento, mostrar alert
                        }
                    }, 100); // Pausa breve
                    return; // Salir para evitar alert duplicado si se reintenta
                } else if (e.name === 'SecurityError') {
                    errorMessage += ' Asegúrate de estar en un contexto seguro (HTTPS o localhost) y de haber dado permisos al micrófono.';
                }
                alert(errorMessage);
            }
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log('Comando de voz detectado para navegación:', transcript);
            voiceNavToggleBtn.textContent = 'Asistente de Voz'; // Resetear texto del botón
            voiceNavToggleBtn.classList.remove('listening'); // Quitar clase de escucha

            // --- Lógica de comandos de navegación directa ---
            if (transcript.includes('inicio') || transcript.includes('ir a inicio') || transcript.includes('principal')) {
                scrollToSection('hero'); // Actualizado a 'hero'
            } else if (transcript.includes('misión') || transcript.includes('mision y vision') || transcript.includes('acerca de')) { // Actualizado a 'acerca de'
                scrollToSection('about'); // Actualizado a 'about'
            } else if (transcript.includes('flota') || transcript.includes('camiones') || transcript.includes('unidades')) {
                scrollToSection('fleet');
            } else if (transcript.includes('rastreo') || transcript.includes('satelital') || transcript.includes('monitoreo')) {
                scrollToSection('tracking'); // Actualizado a 'tracking'
            } else if (transcript.includes('cobertura') || transcript.includes('nacional')) {
                scrollToSection('coverage');
            } else if (transcript.includes('patios') || transcript.includes('operaciones') || transcript.includes('bodegas')) { // Agregado 'bodegas'
                scrollToSection('patios');
            } else if (transcript.includes('contacto') || transcript.includes('contactar') || transcript.includes('llamar')) {
                scrollToSection('contact');
            } else if (transcript.includes('privacidad') || transcript.includes('politicas de privacidad') || transcript.includes('aviso de privacidad')) {
                scrollToSection('privacy-policy'); // Actualizado a 'privacy-policy'
            } else if (transcript.includes('presentación') || transcript.includes('descargar presentación') || transcript.includes('qr')) {
                scrollToSection('qr-code'); // Actualizado a 'qr-code'
            } else if (transcript.includes('servicios') || transcript.includes('nuestros servicios')) {
                scrollToSection('services');
            } else if (transcript.includes('asuntos a/b') || transcript.includes('estrategia a/b')) {
                // Para este caso, como es un enlace externo, quizás no quieras un scroll, sino abrir la URL.
                // O puedes desplazar a una sección si la creaste en tu HTML.
                // Si quieres abrir la URL:
                window.open('https://jivalogistictestab.my.canva.site/estrategia-de-asuntos-a-b-con-jiva-logistics', '_blank');
                alert('Abriendo la página de Asuntos A/B.');
            }
            else {
                alert('Comando de voz no reconocido para navegación: "' + transcript + '". Por favor, intenta de nuevo con un comando como "Inicio", "Flota" o "Contacto".');
            }
        };

        recognition.onerror = (event) => {
            console.error('Error de reconocimiento de voz para navegación:', event.error, event.message);
            voiceNavToggleBtn.textContent = 'Asistente de Voz'; // Resetear texto del botón
            voiceNavToggleBtn.classList.remove('listening'); // Quitar clase de escucha
            if (event.error === 'not-allowed') {
                alert('Permiso de micrófono denegado para comandos de voz. Revisa la configuración de tu navegador (haz clic en el candado en la barra de direcciones).');
            } else if (event.error === 'no-speech') {
                console.log('No se detectó voz para comando de navegación.');
                // No mostrar un alert si simplemente no hubo voz para evitar ser intrusivo
            } else {
                alert('Ocurrió un error en el reconocimiento de voz para navegación: ' + event.error);
            }
        };

        recognition.onend = () => {
            voiceNavToggleBtn.textContent = 'Asistente de Voz'; // Resetear texto del botón al finalizar
            voiceNavToggleBtn.classList.remove('listening'); // Quitar clase de escucha
            console.log('🔚 Reconocimiento de voz para navegación finalizado.');
        };

    } else {
        console.warn('El botón con ID "voice-button" no se encontró, la navegación por voz no se activará.');
    }

    // --- Lógica para desplazamiento suave de enlaces de ancla (general) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevenir el comportamiento de ancla por defecto
            const targetId = this.getAttribute('href'); // Obtener el ID del destino

            // Cierra el chatbot si está abierto y el enlace fue clicado desde adentro de él
            const chatbotContainerEl = document.getElementById('chatbot-container');
            if (chatbotContainerEl && chatbotContainerEl.style.display === 'flex') {
                if (e.target.closest('#chatbot-container')) { // Si el clic ocurrió dentro del chatbot
                    chatbotContainerEl.style.display = 'none'; // Cierra el chatbot
                }
            }

            // Realizar el desplazamiento suave
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // Cierra el menú de navegación móvil si está abierto y el clic fue en un enlace de la nav
            if (navLinks && navLinks.classList.contains('active')) {
                // Pequeño retraso para permitir que el scroll inicie antes de cerrar el menú
                setTimeout(() => {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }, 300);
            }
        });
    });

    // --- Lógica para el Modal de Catálogo de Servicios ---
    const openServicesModalBtn = document.getElementById('open-services-modal-btn');
    const servicesModal = document.getElementById('services-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeServicesModalBtn = servicesModal ? servicesModal.querySelector('.close-button') : null;

    if (openServicesModalBtn && servicesModal && modalOverlay && closeServicesModalBtn) {
        openServicesModalBtn.addEventListener('click', () => {
            servicesModal.style.display = 'flex'; // Mostrar como flex para centrar contenido
            modalOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Evitar scroll del body
        });

        closeServicesModalBtn.addEventListener('click', () => {
            servicesModal.style.display = 'none';
            modalOverlay.style.display = 'none';
            document.body.style.overflow = ''; // Restaurar scroll del body
        });

        modalOverlay.addEventListener('click', () => {
            servicesModal.style.display = 'none';
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        });

        // Asegurarse de que los botones "Cotiza este servicio" no hagan nada por ahora
        const modalCtaButtons = servicesModal.querySelectorAll('.modal-cta-button');
        modalCtaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // Evita cualquier acción por defecto
                // Aquí podrías agregar un alert o un console.log si quieres
                // alert('Funcionalidad de cotización por definir.');
                console.log('Botón "Cotiza este servicio" presionado (funcionalidad pendiente).');
            });
        });
    } else {
        console.warn('Algunos elementos del modal de servicios no se encontraron. Asegúrate de que los IDs open-services-modal-btn, services-modal, modal-overlay y .close-button estén correctos.');
    }

}); // Fin de document.addEventListener('DOMContentLoaded')
