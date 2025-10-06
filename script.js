document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Toggle para móviles ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Detectar cuando las secciones entran en pantalla
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));


    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Este listener se modificó ligeramente para cerrar el menú
        // cuando se hace clic fuera, incluyendo los enlaces dentro del nav
        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Cierra el menú al hacer clic en un enlace (para móviles)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // --- Carrusel de Imágenes (Flota Infinito) ---
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (carouselSlide && carouselImages.length > 0 && prevBtn && nextBtn) {
    let counter = 1; // Empezamos desde la primera "real" imagen después del clone
    const size = carouselImages[0].clientWidth;

    // --- CLONAR PRIMER Y ÚLTIMA IMAGEN ---
    const firstClone = carouselImages[0].cloneNode(true);
    const lastClone = carouselImages[carouselImages.length - 1].cloneNode(true);

    carouselSlide.appendChild(firstClone);   // al final
    carouselSlide.insertBefore(lastClone, carouselSlide.firstChild); // al inicio

    const allImages = document.querySelectorAll('.carousel-slide img');

    // Posicionar correctamente al cargar
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

    nextBtn.addEventListener('click', () => {
        if (counter >= allImages.length - 1) return; // prevenir overflow
        counter++;
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    prevBtn.addEventListener('click', () => {
        if (counter <= 0) return; // prevenir overflow
        counter--;
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    // Ajustar el contador al llegar a clones
    carouselSlide.addEventListener('transitionend', () => {
        if (allImages[counter] === firstClone) {
            carouselSlide.style.transition = 'none';
            counter = 1; // primera imagen real
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
        if (allImages[counter] === lastClone) {
            carouselSlide.style.transition = 'none';
            counter = allImages.length - 2; // última imagen real
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
    });

    // Ajustar el tamaño en redimensionamiento
    window.addEventListener('resize', () => {
        const newSize = allImages[0].clientWidth;
        carouselSlide.style.transition = 'none';
        carouselSlide.style.transform = 'translateX(' + (-newSize * counter) + 'px)';
    });
}

    // --- Modal de imágenes por camión ---
// --- Modal de imágenes por camión (versión mejorada) ---
// --- Modal de imágenes por camión (versión final mejorada) ---
const cards = document.querySelectorAll('.card img');
const modal = document.getElementById('imageModal');
const modalGallery = document.querySelector('.modal-gallery');
const closeBtn = document.querySelector('.close');

cards.forEach((img) => {
  img.addEventListener('click', () => {
    const match = img.src.match(/c(\d+)/);
    if (!match) return;
    const num = match[1];

    // Rutas posibles (ajusta la cantidad si quieres)
    const posibles = [
      `images/c${num}.jpeg`,
      `images/c${num}-1.jpeg`,
      `images/c${num}-2.jpeg`,
      `images/c${num}-3.jpeg`
    ];

    modalGallery.innerHTML = ''; // limpiar galería
    let cargadas = 0; // contar cuántas imágenes válidas hay

    // Intentar cargar cada imagen
    posibles.forEach((ruta) => {
      const extraImg = new Image();
      extraImg.src = ruta;
      extraImg.alt = `Camión ${num}`;

      extraImg.onload = () => {
        cargadas++;
        modalGallery.appendChild(extraImg);

        // Si es la primera imagen válida, mostrar el modal
        if (cargadas === 1) {
          modal.style.display = 'flex';
        }
      };
    });
  });
});

// Cerrar modal con la X o haciendo clic fuera
closeBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});



    // --- Lógica del Formulario de Contacto ---
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            contactMessage.textContent = 'Enviando mensaje...';
            contactMessage.style.color = 'var(--accent-color)';

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            console.log('Datos del formulario de contacto:', data);

            // Simulación de envío con un retraso
            await new Promise(resolve => setTimeout(resolve, 1500));

            contactMessage.textContent = '¡Mensaje enviado con éxito! (Simulado). Nos pondremos en contacto contigo pronto.';
            contactMessage.style.color = 'green';
            contactForm.reset();

            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);
        });
    }

    // --- Lógica del Chatbot ---
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatbotBtn = document.getElementById('close-chatbot-btn');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatMessages = document.getElementById('chat-messages');

    if (chatbotButton && chatbotContainer && closeChatbotBtn && chatInput && sendChatBtn && chatMessages) {
        chatbotContainer.style.display = 'none'; // Asegura que esté oculto al inicio

        chatbotButton.addEventListener('click', () => {
            const isHidden = chatbotContainer.style.display === 'none';
            chatbotContainer.style.display = isHidden ? 'flex' : 'none';

            if (isHidden) {
                chatInput.focus(); // Enfocar el input al abrir
                chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar al final
                chatbotContainer.classList.add('active'); // Añadir clase 'active' para transiciones CSS
            } else {
                chatbotContainer.classList.remove('active'); // Remover clase 'active' al cerrar
            }
        });

        closeChatbotBtn.addEventListener('click', () => {
            chatbotContainer.style.display = 'none';
            chatbotContainer.classList.remove('active'); // Remover clase 'active' al cerrar
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
                botMessageDiv.innerHTML = botResponse; // Usar innerHTML para enlaces
                chatMessages.appendChild(botMessageDiv);

                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 500);
        }

        function getBotResponse(message) {
            message = message.toLowerCase();

            if (/(hola|saludos)/.test(message)) {
                return "¡Hola! ¿En qué puedo ayudarte hoy?";
            } else if (/(mision|vision|esencia)/.test(message)) {
                return "Nuestra Misión es ofrecer un servicio especializado con calidad, confiabilidad y seguridad, buscando la continuidad comercial a largo plazo. Nuestra Visión es consolidarnos como empresa líder en el transporte de contenedores, reconocida por su eficiencia e innovación. Para más información, visita nuestra sección de <a href='#mision'>Misión y Visión</a>.";
            } else if (/(flota|camiones|unidades)/.test(message)) {
                return "Contamos con 21 unidades: 14 sencillos, 7 full expandibles y 6 cajas secas. Para ver la flota completa, visita nuestra sección de <a href='#flota'>Flota</a>.";
            } else if (/(rastreo|seguridad|monitoreo|satelital)/.test(message)) {
                return "Ofrecemos monitoreo satelital 24/7 con rastreo en tiempo real y apagado remoto de unidades en caso de robo. Trabajamos con ELITE, Zapata Aeropuerto, FREIT y PROTRACK. Para más detalles, visita nuestra sección de <a href='#rastreo'>Rastreo Satelital</a>.";
            } else if (/(cobertura|donde operan|ciudades|nacional)/.test(message)) {
                return "Realizamos servicios de transporte a toda la República Mexicana. Para más información, visita nuestra sección de <a href='#cobertura'>Cobertura</a>.";
            } else if (/(patios|ubicacion|tepotzotlan|manzanillo|operaciones)/.test(message)) {
                return "Tenemos patios de operaciones en Tepotzotlán, Estado de México y en Manzanillo, Colima. Para ver sus ubicaciones y mapas, visita nuestra sección de <a href='#patios'>Patios</a>.";
            } else if (/(contacto|cotizacion|telefono|email|contactar|llamar)/.test(message)) {
                return "Puedes contactarnos a través de nuestro <a href='#contacto'>formulario de Contacto</a>, o llamar a Fernando Lucas al <a href='tel:+525516273406'>5516273406</a> o a Armando Martinez al <a href='tel:+525542639390'>5542639390</a>. También puedes enviar un correo a <a href='mailto:jiva.operaciones@gmail.com'>jiva.operaciones@gmail.com</a>.";
            } else if (/(privacidad|politicas|aviso)/.test(message)) {
                return "Nuestras <a href='#privacidad'>políticas de privacidad</a> detallan cómo recopilamos y protegemos tus datos personales. Puedes revisarlas completas en la sección de Privacidad de la página.";
            } else if (/(servicios)/.test(message)) {
                // Aquí el chatbot podría abrir el modal de servicios si se le pregunta
                return 'Ofrecemos transporte de carga contenerizada, transporte en caja seca, logística inversa y más. ¿Te gustaría ver nuestro <button id="open-catalog-from-chat" class="chat-button-inline">Catálogo de Servicios</button>?';
            } else if (/(presentacion|qr|pdf|descargar)/.test(message)) {
                return "Puedes ver nuestra presentación completa en PDF escaneando el código QR en la sección <a href='#qr-section'>Nuestra Presentación en QR</a>";
            } else if (/(gracias|adios|bye)/.test(message)) {
                return "¡De nada! Si tienes más preguntas, no dudes en consultar. ¡Hasta luego!";
            } else {
                return "Lo siento, no entendí tu pregunta. Por favor, intenta de nuevo o reformula. Puedes preguntar sobre:<br> \"Misión\", \"Flota\", \"Rastreo\", \"Cobertura\", \"Patios\", \"Contacto\", \"Privacidad\", \"Servicios\" o \"Presentación\".";
            }
        }

        // Listener para el botón "Catálogo de Servicios" dentro del chat
        chatMessages.addEventListener('click', (event) => {
            if (event.target.id === 'open-catalog-from-chat') {
                const openCatalogBtn = document.getElementById('open-catalog-btn');
                if (openCatalogBtn) {
                    openCatalogBtn.click(); // Simula un clic en el botón principal del catálogo
                    chatbotContainer.style.display = 'none'; // Cierra el chatbot al abrir el modal
                    chatbotContainer.classList.remove('active');
                }
            }
        });
    } else {
        console.warn('Algunos elementos del chatbot no se encontraron en el DOM. Asegúrate de que estén presentes en tu HTML con los IDs correctos (chatbot-button, chatbot-container, close-chatbot-btn, chat-input, send-chat-btn, chat-messages).');
    }


    // --- Lógica de NAVEGACIÓN por Voz ---
    const voiceNavToggleBtn = document.getElementById('voice-command-toggle'); // ID del botón de voz para navegación

    if (voiceNavToggleBtn) { // Solo ejecutar si el botón existe
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;

        if (!SpeechRecognition) {
            console.warn('La API de reconocimiento de voz no es soportada en este navegador. El botón de voz será ocultado.');
            voiceNavToggleBtn.style.display = 'none'; // Ocultar el botón si no hay soporte
            return; // Salir de esta sección de voz si no hay soporte
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'es-MX'; // Ajustado a es-MX para mejor precisión en México
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.continuous = false; // Escucha una sola frase por activación

        // Función auxiliar para desplazar a una sección
        const scrollToSection = (id) => {
            const section = document.getElementById(id);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                console.log(`Navegando a la sección: ${id}`);
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
                voiceNavToggleBtn.textContent = 'Voz';
                voiceNavToggleBtn.classList.remove('listening');
                let errorMessage = 'No se pudo iniciar el reconocimiento de voz.';
                if (e.name === 'InvalidStateError') {
                    errorMessage += ' Parece que ya está activo o se intentó iniciar mientras estaba en un estado inválido.';
                    recognition.stop(); // Intentar detener
                    setTimeout(() => { // Pequeña pausa antes de reintentar
                        try {
                            recognition.start();
                        } catch (retryError) {
                            console.error('Error al reintentar iniciar el reconocimiento:', retryError);
                            alert(errorMessage + ' Intenta de nuevo.');
                        }
                    }, 100);
                    return;
                } else if (e.name === 'SecurityError') {
                    errorMessage += ' Asegúrate de estar en un contexto seguro (HTTPS o localhost) y de haber dado permisos al micrófono.';
                }
                alert(errorMessage);
            }
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log('Comando de voz detectado para navegación:', transcript);
            voiceNavToggleBtn.textContent = 'Voz';
            voiceNavToggleBtn.classList.remove('listening');

            // --- Lógica de comandos de navegación directa ---
            if (transcript.includes('inicio') || transcript.includes('ir a inicio') || transcript.includes('principal')) {
                scrollToSection('inicio');
            } else if (transcript.includes('misión') || transcript.includes('mision y vision') || transcript.includes('esencia')) {
                scrollToSection('mision');
            } else if (transcript.includes('flota') || transcript.includes('camiones') || transcript.includes('unidades')) {
                scrollToSection('flota');
            } else if (transcript.includes('rastreo') || transcript.includes('satelital') || transcript.includes('monitoreo')) {
                scrollToSection('rastreo');
            } else if (transcript.includes('cobertura') || transcript.includes('nacional')) {
                scrollToSection('cobertura');
            } else if (transcript.includes('patios') || transcript.includes('operaciones')) {
                scrollToSection('patios');
            } else if (transcript.includes('contacto') || transcript.includes('contactar') || transcript.includes('llamar')) {
                scrollToSection('contacto');
            } else if (transcript.includes('privacidad') || transcript.includes('politicas de privacidad') || transcript.includes('aviso de privacidad')) {
                scrollToSection('privacidad');
            } else if (transcript.includes('presentación') || transcript.includes('descargar presentación') || transcript.includes('qr')) {
                scrollToSection('qr-section'); // Asumiendo que la sección de QR/PDF tiene el ID 'qr-section'
            } else if (transcript.includes('servicios')) {
                scrollToSection('servicios');
            }
            else {
                alert('Comando de voz no reconocido para navegación: "' + transcript + '". Por favor, intenta de nuevo con un comando como "Inicio", "Flota" o "Contacto".');
            }
        };

        recognition.onerror = (event) => {
            console.error('Error de reconocimiento de voz para navegación:', event.error, event.message);
            voiceNavToggleBtn.textContent = 'Voz';
            voiceNavToggleBtn.classList.remove('listening');
            if (event.error === 'not-allowed') {
                alert('Permiso de micrófono denegado para comandos de voz. Revisa la configuración de tu navegador (haz clic en el candado en la barra de direcciones).');
            } else if (event.error === 'no-speech') {
                console.log('No se detectó voz para comando de navegación.');
            } else {
                alert('Ocurrió un error en el reconocimiento de voz para navegación: ' + event.error);
            }
        };

        recognition.onend = () => {
            voiceNavToggleBtn.textContent = 'Voz';
            voiceNavToggleBtn.classList.remove('listening');
            console.log('🔚 Reconocimiento de voz para navegación finalizado.');
        };

    } else {
        console.warn('El botón con ID "voice-command-toggle" no se encontró, la navegación por voz no se activará.');
    }

    // --- CÓDIGO MODIFICADO PARA EL MODAL DEL CATÁLOGO ---
    const openCatalogBtn = document.getElementById('open-catalog-btn');
    const catalogModal = document.getElementById('catalog-modal');
    const closeCatalogBtn = document.getElementById('close-catalog-btn');

    if (openCatalogBtn && catalogModal && closeCatalogBtn) {
        // 1. Aseguramos que el modal esté oculto al cargar la página.
        //    Esta línea es crucial para el estado inicial.
        catalogModal.style.display = 'none';

        openCatalogBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita el comportamiento predeterminado del enlace
            // 2. Aquí es donde cambiamos el display para MOSTRAR el modal.
            //    Si en tu CSS usas 'flex' para mostrarlo, déjalo así. Si usas 'block', cámbialo a 'block'.
            catalogModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Evita scroll en el fondo al abrir el modal
        });

        closeCatalogBtn.addEventListener('click', () => {
            catalogModal.style.display = 'none'; // Oculta el modal al hacer clic en el botón de cerrar
            document.body.style.overflow = ''; // Restaura el scroll del fondo
        });

        // Cierra el modal si se hace clic fuera del contenido del modal
        window.addEventListener('click', (e) => {
            if (e.target === catalogModal) {
                catalogModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }


    // --- Lógica para desplazamiento suave de enlaces de ancla (general) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const chatbotContainerEl = document.getElementById('chatbot-container');

            // Si el chatbot está abierto y el clic viene de un enlace DENTRO del chatbot, ciérralo.
            if (chatbotContainerEl && chatbotContainerEl.style.display === 'flex') {
                if (e.target.closest('#chatbot-container')) {
                    chatbotContainerEl.style.display = 'none'; // Cierra el chatbot
                    chatbotContainerEl.classList.remove('active'); // También remueve la clase active
                }
            }
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

}); // Fin de document.addEventListener('DOMContentLoaded')


