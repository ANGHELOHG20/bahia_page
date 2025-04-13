// contacto.js - Código completo mejorado

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const contactForm = document.getElementById('contactForm');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const emailBtn = document.getElementById('emailBtn');
    
    // Configuración de contacto
    const contactConfig = {
        whatsapp: {
            number: '51972390606', // Número sin espacios ni símbolos
            messageTemplate: (data) => {
                return `*Nuevo mensaje de ${data.name}*%0A%0A` +
                       `📞 Teléfono: ${data.phone}%0A` +
                       `📧 Email: ${data.email || 'No proporcionado'}%0A` +
                       `✂️ Seguro: ${data.service || 'No especificado'}%0A%0A` +
                       `💬 Mensaje:%0A${data.message || 'Sin mensaje adicional'}`;
            }
        },
        email: {
            address: 'anghelohuanegutierrez14@gmail.com',
            subjectTemplate: (data) => `Consulta: ${data.name} -Bahía International Advisors`,
            bodyTemplate: (data) => {
                return `Nombre: ${data.name}%0A` +
                       `Teléfono: ${data.phone}%0A` +
                       `Email: ${data.email || 'No proporcionado'}%0A` +
                       `Servicio de interés: ${data.service || 'No especificado'}%0A%0A` +
                       `Mensaje:%0A${data.message || 'Sin mensaje adicional'}`;
            }
        }
    };

    // Obtener datos del formulario
    function getFormData() {
        return {
            name: document.getElementById('contactName').value.trim(),
            phone: document.getElementById('contactPhone').value.trim(),
            email: document.getElementById('contactEmail').value.trim(),
            service: document.getElementById('contactService').value.trim(),
            message: document.getElementById('contactMessage').value.trim()
        };
    }

    // Validar datos del formulario
    function validateForm(data) {
        if (!data.name) {
            alert('Por favor ingresa tu nombre');
            return false;
        }
        if (!data.phone) {
            alert('Por favor ingresa tu número de teléfono');
            return false;
        }
        if (!data.service) {
            alert('Por favor ingresa el tipo de seguro');
            return false;
        }
        return true;
    }

    // Enviar por WhatsApp
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const formData = getFormData();
        
        if (!validateForm(formData)) return;
        
        const message = contactConfig.whatsapp.messageTemplate(formData);
        window.open(`https://wa.me/${contactConfig.whatsapp.number}?text=${message}`, '_blank');
        
        // Mostrar confirmación y resetear
        showConfirmation('WhatsApp');
    });

    // Enviar por Email
    emailBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const formData = getFormData();
        
        if (!validateForm(formData)) return;
        
        const subject = contactConfig.email.subjectTemplate(formData);
        const body = contactConfig.email.bodyTemplate(formData);
        window.location.href = `mailto:${contactConfig.email.address}?subject=${subject}&body=${body}`;
        
        // Mostrar confirmación y resetear
        showConfirmation('Correo Electrónico');
    });

    // Mostrar mensaje de confirmación
    function showConfirmation(method) {
        alert(`Serás redirigido a ${method} para completar tu mensaje. ¡Gracias por contactarnos!`);
        contactForm.reset();
    }

    // Prevenir envío tradicional del formulario
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Por favor selecciona un método de contacto (WhatsApp o Correo)');
    });
});