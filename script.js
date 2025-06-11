// --- Lógica para Carrusel de Flota ---
function setupCarousel(containerSelector, slideSelector, prevBtnSelector, nextBtnSelector) {
    const carouselContainer = document.querySelector(containerSelector);
    if (!carouselContainer) return;

    const carouselSlide = carouselContainer.querySelector(slideSelector);
    const prevBtn = carouselContainer.querySelector(prevBtnSelector);
    const nextBtn = carouselContainer.querySelector(nextBtnSelector);

    let slideIndex = 0;
    const slides = carouselSlide.children;
    const totalSlides = slides.length;

    function showSlide(index) {
        if (index >= totalSlides) {
            slideIndex = 0;
        } else if (index < 0) {
            slideIndex = totalSlides - 1;
        } else {
            slideIndex = index;
        }
        carouselSlide.style.transform = `translateX(${-slideIndex * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        showSlide(slideIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(slideIndex + 1);
    });

    showSlide(0);
}


// --- Lógica para Menú Desplegable (Hamburguesa) ---
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Para animar el icono de hamburguesa a "X"
        });

        // Cerrar el menú si se hace clic en un enlace (para navegación)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
});


// --- Lógica para Comandos de Voz ---
document.addEventListener('DOMContentLoaded', () => {
    const voiceButton = document.getElementById('voice-command-toggle');
    if (!voiceButton) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;

    if (!SpeechRecognition) {
        console.warn('La API de reconocimiento de voz no es soportada en este navegador. El botón de voz será ocultado.');
        voiceButton.style.display = 'none';
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    voiceButton.addEventListener('click', () => {
        try {
            recognition.start();
            voiceButton.textContent = 'Escuchando...';
            voiceButton.classList.add('listening');
        } catch (e) {
            console.error('Error al iniciar el reconocimiento de voz:', e);
            voiceButton.textContent = 'Voz';
            voiceButton.classList.remove('listening');
            alert('No se pudo iniciar el reconocimiento de voz. Asegúrate de que tu micrófono esté conectado y de haber dado permisos.');
        }
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log('Comando de voz detectado:', transcript);
        voiceButton.textContent = 'Voz';
        voiceButton.classList.remove('listening');

        const scrollToSection = (id) => {
            const section = document.getElementById(id);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert(`La sección "${id}" no se encontró.`);
            }
        };

        if (transcript.includes('inicio') || transcript.includes('ir a inicio') || transcript.includes('principal')) {
            scrollToSection('inicio');
        } else if (transcript.includes('misión') || transcript.includes('esencia')) {
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
            const qrSection = document.querySelector('.qr-section');
            if (qrSection) {
                qrSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert('La sección de presentación no se encontró.');
            }
        } else {
            alert('Comando de voz no reconocido: "' + transcript + '". Por favor, intenta de nuevo con un comando como "Inicio", "Flota" o "Contacto".');
        }
    };

    recognition.onerror = (event) => {
        console.error('Error de reconocimiento de voz:', event.error);
        voiceButton.textContent = 'Voz';
        voiceButton.classList.remove('listening');
        if (event.error === 'not-allowed') {
            alert('Permite el acceso al micrófono para usar los comandos de voz. Revisa la configuración de tu navegador.');
        } else if (event.error === 'no-speech') {
            console.log('No se detectó voz.');
        } else {
            alert('Ocurrió un error en el reconocimiento de voz: ' + event.error);
        }
    };

    recognition.onend = () => {
        voiceButton.textContent = 'Voz';
        voiceButton.classList.remove('listening');
    };
});

// --- Lógica del Formulario de Contacto (simulado, no se envía a un servidor real) ---
document.addEventListener('DOMContentLoaded', () => {
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

            await new Promise(resolve => setTimeout(resolve, 1500));

            contactMessage.textContent = '¡Mensaje enviado con éxito! (Simulado). Nos pondremos en contacto contigo pronto.';
            contactMessage.style.color = 'green';
            contactForm.reset();
        });
    }
});


// --- Lógica del Chatbot ---
document.addEventListener('DOMContentLoaded', () => {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotContainer = document.getElementById('chatbot-container');

    if (chatbotButton && chatbotContainer) {
        chatbotButton.addEventListener('click', () => {
            if (chatbotContainer.style.display === 'flex') {
                chatbotContainer.style.display = 'none';
                chatbotButton.textContent = '💬';
            } else {
                chatbotContainer.style.display = 'flex';
                chatbotButton.textContent = '✖';

                if (!chatbotContainer.querySelector('.chatbot-dialogue-box')) {
                    chatbotContainer.innerHTML = `
                        <div class="chatbot-dialogue-box">
                            <div id="chat-messages">
                                <p style="background-color: #e0e0e0; padding: 10px; border-radius: 8px; margin-bottom: 10px;">Hola, soy tu asistente virtual de JIVA LOGISTIC. ¿En qué puedo ayudarte hoy?</p>
                                <p style="background-color: #e0e0e0; padding: 10px; border-radius: 8px; margin-bottom: 10px;">Puedes preguntarme sobre:<br> "Inicio", "Misión", "Flota", "Rastreo", "Cobertura", "Patios", "Contacto", "Privacidad" o "Presentación".</p>
                            </div>
                            <div style="display: flex;">
                                <input type="text" id="chat-input" placeholder="Escribe tu pregunta..." style="flex-grow: 1; padding: 10px; border: 1px solid var(--gray-medium); border-radius: 5px; margin-right: 10px;">
                                <button id="send-chat-btn" style="background-color: var(--primary-blue); color: var(--white); border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">Enviar</button>
                            </div>
                        </div>
                    `;

                    const chatInput = document.getElementById('chat-input');
                    const sendChatBtn = document.getElementById('send-chat-btn');
                    const chatMessages = document.getElementById('chat-messages');

                    const addMessage = (text, sender) => {
                        const msgDiv = document.createElement('p');
                        msgDiv.style.backgroundColor = sender === 'user' ? 'var(--light-blue)' : '#e0e0e0';
                        msgDiv.style.color = sender === 'user' ? 'var(--text-dark)' : 'var(--text-dark)';
                        msgDiv.style.padding = '10px';
                        msgDiv.style.borderRadius = '8px';
                        msgDiv.style.marginBottom = '10px';
                        msgDiv.style.textAlign = sender === 'user' ? 'right' : 'left';
                        msgDiv.innerHTML = text;

                        chatMessages.appendChild(msgDiv);
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    };

                    const handleChatInput = () => {
                        const userText = chatInput.value.toLowerCase().trim();
                        if (userText === '') return;

                        addMessage(userText, 'user');
                        chatInput.value = '';

                        let botResponse = "Lo siento, no entendí tu pregunta. Intenta con alguna de las palabras clave como 'Flota' o 'Contacto'.";

                        if (userText.includes('hola') || userText.includes('ayuda')) {
                            botResponse = "¡Hola! Estoy aquí para ayudarte. Puedes preguntar sobre nuestras secciones como 'Inicio', 'Misión', 'Flota', 'Rastreo', 'Cobertura', 'Patios', 'Contacto', 'Privacidad' o 'Presentación'.";
                        } else if (userText.includes('inicio') || userText.includes('principal')) {
                            botResponse = `Claro, te llevo a la sección de <a href="#inicio" onclick="document.getElementById('chatbot-container').style.display='none';">Inicio</a>.`;
                        } else if (userText.includes('misión') || userText.includes('esencia')) {
                            botResponse = `Aquí tienes nuestra <a href="#mision" onclick="document.getElementById('chatbot-container').style.display='none';">Misión</a>.`;
                        } else if (userText.includes('flota') || userText.includes('camiones') || userText.includes('unidades')) {
                            botResponse = `Te muestro nuestra <a href="#flota" onclick="document.getElementById('chatbot-container').style.display='none';">Flota</a> de vehículos.`;
                        } else if (userText.includes('rastreo') || userText.includes('satelital') || userText.includes('monitoreo')) {
                            botResponse = `Puedes encontrar información sobre nuestro <a href="#rastreo" onclick="document.getElementById('chatbot-container').style.display='none';">Rastreo</a>.`;
                        } else if (userText.includes('cobertura') || userText.includes('nacional')) {
                            botResponse = `Aquí está nuestra sección de <a href="#cobertura" onclick="document.getElementById('chatbot-container').style.display='none';">Cobertura</a>.`;
                        } else if (userText.includes('patios') || userText.includes('operaciones')) {
                            botResponse = `Información sobre nuestros <a href="#patios" onclick="document.getElementById('chatbot-container').style.display='none';">Patios</a> de Operaciones.`;
                        } else if (userText.includes('contacto') || userText.includes('contactar') || userText.includes('llamar')) {
                            botResponse = `Para contactarnos, visita la sección de <a href="#contacto" onclick="document.getElementById('chatbot-container').style.display='none';">Contacto</a>.`;
                        } else if (userText.includes('privacidad') || userText.includes('políticas') || userText.includes('aviso')) {
                            botResponse = `Nuestras <a href="#privacidad" onclick="document.getElementById('chatbot-container').style.display='none';">Políticas de Privacidad</a> están aquí.`;
                        } else if (userText.includes('presentación') || userText.includes('qr') || userText.includes('descargar')) {
                            botResponse = `Puedes descargar nuestra <a href="images/JIVA_LOGISTIC_actual.pdf" target="_blank" onclick="document.getElementById('chatbot-container').style.display='none';">Presentación</a> escaneando el QR.`;
                        }

                        setTimeout(() => {
                            addMessage(botResponse, 'bot');
                        }, 500);
                    };

                    sendChatBtn.addEventListener('click', handleChatInput);
                    chatInput.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') {
                            handleChatInput();
                        }
                    });
                }
            }
        });
    }
});


// --- Lógica para desplazamiento suave de enlaces de ancla ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
