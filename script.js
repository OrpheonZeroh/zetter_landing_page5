// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initVideoBackground();
    initSmoothScrolling();
    initCTAButtons();
    initMCPCalculator();
    initParallaxEffects();
    initAnimations();
});

// Video Background Management
function initVideoBackground() {
    const video = document.querySelector('.background-video');
    if (video) {
        // Ensure video plays on all devices
        video.muted = true;
        video.playsInline = true;
        
        // Handle video load errors
        video.addEventListener('error', function() {
            video.style.display = 'none';
            document.querySelector('.hero-section').style.background = 
                'linear-gradient(135deg, #35354D 0%, #646C7C 100%)';
        });
        
        // Play video when loaded
        video.addEventListener('loadeddata', function() {
            video.play().catch(function(error) {
                // Video autoplay failed silently
            });
        });
    }
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// CTA Button Functionality
function initCTAButtons() {
    // Evaluation buttons
    const evaluationButtons = document.querySelectorAll('#evaluationBtn, [onclick="openEvaluationForm()"]');
    evaluationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openEvaluationForm();
        });
    });
    
    // All other evaluation-related buttons
    const contactButtons = document.querySelectorAll('.btn');
    contactButtons.forEach(button => {
        const text = button.textContent.toLowerCase();
        if (text.includes('evaluación') || text.includes('diagnóstico') || text.includes('solicita')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openEvaluationForm();
            });
        }
    });
}

// MCP Calculator
function initMCPCalculator() {
    const calculatorBtn = document.querySelector('.mcp-calculator .btn');
    if (calculatorBtn) {
        calculatorBtn.addEventListener('click', function() {
            openMCPCalculator();
        });
    }
}

// Evaluation Form Modal - FIXED OVERLAY VERSION
function openEvaluationForm() {
    // Remove any existing modal
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) existingModal.remove();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Create modal with INLINE styles to avoid CSS conflicts
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = 'evalModal';
    
    // CRITICAL: Apply styles inline to ensure fixed positioning
    modalOverlay.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background: rgba(0, 0, 0, 0.9) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        z-index: 999999 !important;
        padding: 1rem !important;
        box-sizing: border-box !important;
        overflow-y: auto !important;
    `;
    
    modalOverlay.innerHTML = `
        <div class="modal-container" style="background: #FFFFFF; border-radius: 16px; max-width: 850px; width: 100%; max-height: 92vh; overflow: hidden; position: relative; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);">
            <div class="modal-header" style="padding: 1.75rem 2rem; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; background: #FFFFFF;">
                <h2 style="margin: 0; font-size: 1.5rem; font-weight: 700; color: #1f2937;">Solicita tu Evaluación Gratuita</h2>
                <button class="modal-close" onclick="closeModal()" style="background: transparent; border: none; font-size: 1.75rem; cursor: pointer; color: #9ca3af; padding: 0; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 6px; transition: all 0.2s;">&times;</button>
            </div>
            <div class="modal-content" style="padding: 2rem; overflow-y: auto; max-height: calc(92vh - 90px); background-color: #FFFFFF;">
                <div class="intro-section" style="text-align: center; margin-bottom: 2rem; padding: 1.5rem; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-radius: 12px; border: 1px solid #bbf7d0;">
                    <div class="intro-icon" style="display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; margin-bottom: 1rem; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);">
                        <i class="fas fa-chart-line" style="font-size: 1.5rem; color: white;"></i>
                    </div>
                    <h3 style="margin: 0 0 0.5rem 0; color: #065f46; font-size: 1.25rem; font-weight: 700;">Evaluación Gratuita de Infraestructura</h3>
                    <p style="margin: 0; color: #047857; line-height: 1.5; font-size: 0.95rem;">Nuestros expertos analizarán tu infraestructura actual y te proporcionarán un plan personalizado.</p>
                </div>
                
                <form id="evalForm" class="eval-form" action="https://script.google.com/macros/s/AKfycbxA0VArmv7fdT7_2bvjIvtNVYUp2l2sFLa8X1LQxl77m1zgC0ENbi51TPIo1olUyepj/exec" method="POST" style="display: flex; flex-direction: column; gap: 1.25rem;">
                    <div class="form-columns" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
                        <div class="form-column" style="display: flex; flex-direction: column; gap: 1.25rem;">
                            <div class="form-field" style="display: flex; flex-direction: column; gap: 0.5rem;">
                                <label style="font-weight: 600; color: #374151; font-size: 0.875rem; margin-bottom: 0.375rem; display: block;">Nombre completo *</label>
                                <div class="input-container" style="position: relative; display: flex; align-items: center;">
                                    <i class="fas fa-user" style="position: absolute; left: 0.875rem; color: #9ca3af; font-size: 0.875rem; pointer-events: none;"></i>
                                    <input type="text" name="nombre" placeholder="Tu nombre completo" required style="width: 100%; padding: 0.75rem 0.875rem 0.75rem 2.5rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 0.9375rem; background: #FFFFFF; color: #1f2937; font-family: 'Inter', sans-serif;">
                                </div>
                            </div>
                            
                            <div class="form-field" style="display: flex; flex-direction: column; gap: 0.5rem;">
                                <label style="font-weight: 600; color: #374151; font-size: 0.875rem; margin-bottom: 0.375rem; display: block;">Empresa *</label>
                                <div class="input-container" style="position: relative; display: flex; align-items: center;">
                                    <i class="fas fa-building" style="position: absolute; left: 0.875rem; color: #9ca3af; font-size: 0.875rem; pointer-events: none;"></i>
                                    <input type="text" name="empresa" placeholder="Nombre de tu empresa" required style="width: 100%; padding: 0.75rem 0.875rem 0.75rem 2.5rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 0.9375rem; background: #FFFFFF; color: #1f2937; font-family: 'Inter', sans-serif;">
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-column" style="display: flex; flex-direction: column; gap: 1.25rem;">
                            <div class="form-field" style="display: flex; flex-direction: column; gap: 0.5rem;">
                                <label style="font-weight: 600; color: #374151; font-size: 0.875rem; margin-bottom: 0.375rem; display: block;">Teléfono *</label>
                                <div class="input-container" style="position: relative; display: flex; align-items: center;">
                                    <i class="fas fa-phone" style="position: absolute; left: 0.875rem; color: #9ca3af; font-size: 0.875rem; pointer-events: none;"></i>
                                    <input type="tel" name="telefono" placeholder="+1 234 567 8900" required style="width: 100%; padding: 0.75rem 0.875rem 0.75rem 2.5rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 0.9375rem; background: #FFFFFF; color: #1f2937; font-family: 'Inter', sans-serif;">
                                </div>
                            </div>
                            
                            <div class="form-field" style="display: flex; flex-direction: column; gap: 0.5rem;">
                                <label style="font-weight: 600; color: #374151; font-size: 0.875rem; margin-bottom: 0.375rem; display: block;">Email corporativo *</label>
                                <div class="input-container" style="position: relative; display: flex; align-items: center;">
                                    <i class="fas fa-envelope" style="position: absolute; left: 0.875rem; color: #9ca3af; font-size: 0.875rem; pointer-events: none;"></i>
                                    <input type="email" name="email" placeholder="tu@empresa.com" required style="width: 100%; padding: 0.75rem 0.875rem 0.75rem 2.5rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 0.9375rem; background: #FFFFFF; color: #1f2937; font-family: 'Inter', sans-serif;">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-field full-width" style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label style="font-weight: 600; color: #374151; font-size: 0.875rem; margin-bottom: 0.375rem; display: block;">Servicio de interés *</label>
                        <div class="input-container" style="position: relative; display: flex; align-items: center;">
                            <i class="fas fa-cogs" style="position: absolute; left: 0.875rem; color: #9ca3af; font-size: 0.875rem; pointer-events: none; z-index: 2;"></i>
                            <select name="servicio" required style="width: 100%; padding: 0.75rem 0.875rem 0.75rem 2.5rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 0.9375rem; background: #FFFFFF; color: #1f2937; font-family: 'Inter', sans-serif; cursor: pointer;">
                                <option value="">Selecciona el servicio</option>
                                <option value="MCP as a Service">MCP as a Service (Recomendado)</option>
                                <option value="GitOps as a Service">GitOps as a Service</option>
                                <option value="Pipeline as a Service">Pipeline as a Service</option>
                                <option value="Consultoría personalizada">Consultoría personalizada</option>
                                <option value="Evaluación completa">Evaluación completa de infraestructura</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-field full-width" style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label style="font-weight: 600; color: #374151; font-size: 0.875rem; margin-bottom: 0.375rem; display: block;">Cuéntanos sobre tu infraestructura actual *</label>
                        <div class="input-container" style="position: relative; display: flex; align-items: flex-start;">
                            <i class="fas fa-server" style="position: absolute; left: 0.875rem; top: 0.875rem; color: #9ca3af; font-size: 0.875rem; pointer-events: none;"></i>
                            <textarea name="mensaje" rows="4" placeholder="Ej: Usamos AWS con 10 servidores, Kubernetes, bases de datos MySQL. Principal desafío: despliegues manuales lentos..." required style="width: 100%; padding: 0.75rem 0.875rem 0.75rem 2.5rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 0.9375rem; background: #FFFFFF; color: #1f2937; font-family: 'Inter', sans-serif; resize: vertical; min-height: 90px;"></textarea>
                        </div>
                    </div>
                    
                    <div class="form-footer" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb;">
                        <div class="security-info" style="display: flex; align-items: center; gap: 0.625rem; padding: 0.875rem 1rem; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                            <i class="fas fa-shield-alt" style="color: #10b981; font-size: 1rem; flex-shrink: 0;"></i>
                            <span style="font-size: 0.8125rem; color: #6b7280; line-height: 1.4;">Tus datos están protegidos y solo serán usados para contactarte sobre la evaluación.</span>
                        </div>
                        <button type="submit" class="submit-btn" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border: none; padding: 0.875rem 1.5rem; border-radius: 8px; font-size: 0.9375rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2); transition: all 0.2s ease;">
                            <i class="fas fa-paper-plane"></i>
                            Solicitar Evaluación Gratuita
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(modalOverlay);
    
    // Add event listeners
    document.getElementById('evalForm').addEventListener('submit', handleEvaluationSubmission);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });
    
    // Listen for postMessage from iframe to close modal
    window.addEventListener('message', function(event) {
        if (event.data === 'closeModal') {
            closeModal();
        }
    });
}

// Contact Form Modal
function openContactForm(type) {
    let title = 'Contacta con Zetterx';
    if (type.includes('evaluación')) title = 'Solicitar Evaluación Gratuita';
    if (type.includes('integrar')) title = 'Integrar Aplicaciones Existentes';
    if (type.includes('caso')) title = 'Explorar Caso de Uso';
    
    const modal = createModal(title, `
        <form id="contactForm" class="contact-form">
            <div class="form-group">
                <label for="contactName">Nombre completo *</label>
                <input type="text" id="contactName" name="name" required>
            </div>
            <div class="form-group">
                <label for="contactEmail">Email *</label>
                <input type="email" id="contactEmail" name="email" required>
            </div>
            <div class="form-group">
                <label for="contactCompany">Empresa *</label>
                <input type="text" id="contactCompany" name="company" required>
            </div>
            <div class="form-group">
                <label for="contactMessage">Mensaje</label>
                <textarea id="contactMessage" name="message" placeholder="Cuéntanos más sobre tu proyecto o necesidades"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
                <i class="fas fa-paper-plane"></i>
                Enviar Consulta
            </button>
        </form>
    `);
    
    document.getElementById('contactForm').addEventListener('submit', handleContactSubmission);
}

// MCP Calculator Modal
function openMCPCalculator() {
    const modal = createModal('Calculadora MCP - ¿Tu empresa necesita MCP?', `
        <form id="mcpCalculator" class="contact-form">
            <div class="calculator-intro">
                <p>Responde estas preguntas para determinar si tu empresa se beneficiaría de nuestra plataforma MCP:</p>
            </div>
            
            <div class="form-group">
                <label>¿Cuántos servidores/instancias manejas actualmente?</label>
                <select name="servers" required>
                    <option value="">Selecciona</option>
                    <option value="1-5">1-5 servidores</option>
                    <option value="6-20">6-20 servidores</option>
                    <option value="21-50">21-50 servidores</option>
                    <option value="50+">Más de 50 servidores</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>¿Qué tan frecuentes son tus deploys?</label>
                <select name="deploys" required>
                    <option value="">Selecciona</option>
                    <option value="daily">Diarios</option>
                    <option value="weekly">Semanales</option>
                    <option value="monthly">Mensuales</option>
                    <option value="rarely">Rara vez</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>¿Cuánto tiempo dedicas semanalmente a tareas de DevOps?</label>
                <select name="devops-time" required>
                    <option value="">Selecciona</option>
                    <option value="0-5">0-5 horas</option>
                    <option value="6-15">6-15 horas</option>
                    <option value="16-30">16-30 horas</option>
                    <option value="30+">Más de 30 horas</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>¿Has tenido downtime no planificado en los últimos 3 meses?</label>
                <select name="downtime" required>
                    <option value="">Selecciona</option>
                    <option value="none">Ninguno</option>
                    <option value="1-2">1-2 veces</option>
                    <option value="3-5">3-5 veces</option>
                    <option value="5+">Más de 5 veces</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="mcpEmail">Email para recibir resultados *</label>
                <input type="email" id="mcpEmail" name="email" required>
            </div>
            
            <button type="submit" class="btn btn-primary">
                <i class="fas fa-calculator"></i>
                Calcular Compatibilidad MCP
            </button>
        </form>
        
        <div id="mcpResults" class="mcp-results" style="display: none;">
            <div class="results-content">
                <h3>Resultados de tu Evaluación MCP</h3>
                <div id="mcpScore"></div>
                <div id="mcpRecommendation"></div>
            </div>
        </div>
    `);
    
    document.getElementById('mcpCalculator').addEventListener('submit', handleMCPCalculation);
}

// Modal Creation Helper
function createModal(title, content) {
    // Remove existing modal
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles if not already added
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = `
            <style id="modal-styles">
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(53, 53, 77, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 20px;
                }
                
                .modal-content {
                    background-color: #35354D;
                    border-radius: 12px;
                    max-width: 600px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    border: 1px solid #82838F;
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 2rem;
                    border-bottom: 1px solid #82838F;
                }
                
                .modal-header h2 {
                    color: #F2F2F2;
                    margin: 0;
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 2rem;
                    color: #82838F;
                    cursor: pointer;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-close:hover {
                    color: #949CA4;
                }
                
                .modal-body {
                    padding: 2rem;
                }
                
                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .form-group label {
                    color: #F2F2F2;
                    font-weight: 500;
                }
                
                .form-group input,
                .form-group select,
                .form-group textarea {
                    padding: 12px;
                    border: 1px solid #82838F;
                    border-radius: 6px;
                    background-color: #CACBD1;
                    color: #35354D;
                    font-family: inherit;
                }
                
                .form-group textarea {
                    min-height: 100px;
                    resize: vertical;
                }
                
                .evaluation-intro {
                    background-color: rgba(53, 53, 77, 0.05);
                    padding: 1.5rem;
                    border-radius: 8px;
                    margin-bottom: 2rem;
                    border-left: 4px solid #35354D;
                }
                
                .calculator-intro {
                    background-color: rgba(148, 156, 164, 0.1);
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 2rem;
                }
                
                .mcp-results {
                    margin-top: 2rem;
                    padding: 2rem;
                    background: linear-gradient(135deg, #646C7C 0%, #949CA4 100%);
                    border-radius: 8px;
                }
                
                .results-content h3 {
                    color: #F2F2F2;
                    margin-bottom: 1rem;
                }
                
                .mcp-score {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #F2F2F2;
                    margin-bottom: 1rem;
                }
                
                .mcp-recommendation {
                    color: #CACBD1;
                    line-height: 1.6;
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', modalStyles);
    }
    
    // Add close functionality
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.querySelector('.modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    return document.querySelector('.modal-overlay');
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
    // Restore body scroll
    document.body.style.overflow = '';
}

// Form Submission Handlers - Send JSON to Google Apps Script
function handleEvaluationSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.submit-btn');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // Recoger datos del formulario
    const formData = new FormData(form);
    const data = {
        nombre: formData.get('nombre'),
        empresa: formData.get('empresa'),
        telefono: formData.get('telefono'),
        email: formData.get('email'),
        servicio: formData.get('servicio'),
        mensaje: formData.get('mensaje')
    };
    
    // URL del Google Apps Script
    const scriptURL = form.action;
    
    // Enviar datos como JSON
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function() {
        submitButton.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
        
        // Cerrar modal primero
        form.reset();
        closeModal();
        
        // Mostrar toast DESPUÉS de cerrar el modal
        setTimeout(function() {
            showToast('success', '¡Formulario enviado exitosamente!', 'Gracias por tu interés. Nuestro equipo te contactará dentro de las siguientes 24 horas.');
        }, 300);
        
        // Resetear botón
        setTimeout(function() {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 1000);
    })
    .catch(function(error) {
        console.error('Error:', error);
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        showToast('error', 'Error', 'Hubo un problema al enviar el formulario. Por favor inténtalo nuevamente.');
    });
}

function handleContactSubmission(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showSuccessMessage('¡Mensaje enviado exitosamente! Nuestro equipo se pondrá en contacto contigo pronto.');
    
    // Close modal
    setTimeout(closeModal, 2000);
}

function handleMCPCalculation(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Calculate MCP compatibility score
    let score = 0;
    let maxScore = 16;
    
    // Scoring logic
    if (data.servers === '21-50') score += 3;
    else if (data.servers === '50+') score += 4;
    else if (data.servers === '6-20') score += 2;
    else score += 1;
    
    if (data.deploys === 'daily') score += 4;
    else if (data.deploys === 'weekly') score += 3;
    else if (data.deploys === 'monthly') score += 2;
    else score += 1;
    
    if (data['devops-time'] === '30+') score += 4;
    else if (data['devops-time'] === '16-30') score += 3;
    else if (data['devops-time'] === '6-15') score += 2;
    else score += 1;
    
    if (data.downtime === '5+') score += 4;
    else if (data.downtime === '3-5') score += 3;
    else if (data.downtime === '1-2') score += 2;
    else score += 1;
    
    const percentage = Math.round((score / maxScore) * 100);
    
    let recommendation = '';
    let scoreClass = '';
    
    if (percentage >= 75) {
        recommendation = 'Tu empresa es un candidato EXCELENTE para MCP. Podrías ahorrar significativamente en tiempo y costos con nuestra automatización.';
        scoreClass = 'high-score';
    } else if (percentage >= 50) {
        recommendation = 'Tu empresa se BENEFICIARÍA considerablemente de MCP. Te recomendamos agendar una demo para ver el impacto específico.';
        scoreClass = 'medium-score';
    } else {
        recommendation = 'MCP podría ayudarte, pero quizás no sea prioritario ahora. Te sugerimos considerar nuestras soluciones más básicas primero.';
        scoreClass = 'low-score';
    }
    
    // Show results
    document.getElementById('mcpResults').style.display = 'block';
    document.getElementById('mcpScore').innerHTML = `
        <div class="mcp-score ${scoreClass}">Compatibilidad: ${percentage}%</div>
    `;
    document.getElementById('mcpRecommendation').innerHTML = `
        <div class="mcp-recommendation">${recommendation}</div>
        <div style="margin-top: 1rem;">
            <button class="btn btn-primary" onclick="openEvaluationForm(); closeModal();">
                <i class="fas fa-clipboard-check"></i>
                Solicitar Evaluación Personalizada
            </button>
        </div>
    `;
    
    // Hide form
    document.getElementById('mcpCalculator').style.display = 'none';
}

// Modern Toast Notification System
function showToast(type, title, message, duration = 5000) {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.custom-toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    
    // Inline styles to guarantee visibility
    const bgColor = type === 'error' ? 'linear-gradient(135deg, #dc3545 0%, #e74c3c 100%)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1.25rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 999999999;
        min-width: 350px;
        max-width: 450px;
        font-family: 'Inter', sans-serif;
        animation: slideInRight 0.4s ease;
    `;
    
    const icon = type === 'error' ? 'fas fa-exclamation-triangle' : 'fas fa-check-circle';
    
    toast.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 1rem;">
            <div style="font-size: 1.5rem; margin-top: 0.25rem; flex-shrink: 0;">
                <i class="${icon}"></i>
            </div>
            <div style="flex: 1;">
                <div style="font-weight: 600; margin-bottom: 0.25rem; font-size: 1rem;">${title}</div>
                <p style="font-size: 0.9rem; opacity: 0.95; line-height: 1.4; margin: 0;">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; font-size: 1.25rem; padding: 0; opacity: 0.8; transition: opacity 0.2s; margin-left: 0.5rem; flex-shrink: 0;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }
    }, duration);
}

// Add toast animations to CSS if not exists
if (!document.querySelector('#toast-animations')) {
    const animations = `
        <style id="toast-animations">
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', animations);
}

// Brochure Download
function downloadBrochure() {
    // Create a simple brochure info alert since we don't have an actual PDF
    showSuccessMessage('El brochure de Zetterx Cloud Platform se descargará próximamente. Te contactaremos con más información.');
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const video = document.querySelector('.background-video');
        
        if (video) {
            video.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    document.querySelectorAll('section, .service-card, .benefit-item, .layer').forEach(el => {
        observer.observe(el);
    });
    
    // Add animation CSS
    if (!document.querySelector('#animation-styles')) {
        const animationStyles = `
            <style id="animation-styles">
                section, .service-card, .benefit-item, .layer {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.6s ease;
                }
                
                section.animate-in, .service-card.animate-in, .benefit-item.animate-in, .layer.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .hero-section {
                    opacity: 1;
                    transform: none;
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', animationStyles);
    }
}
