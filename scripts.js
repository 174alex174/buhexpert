// Скрипт для мобильного меню
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('#mobile-menu nav a');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            document.body.classList.add('overflow-hidden');
        });
    }

    if (closeMobileMenuButton) {
        closeMobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        });
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        });
    });

    // Анимации при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами для анимации
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Добавляем классы для анимации к секциям
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (!section.classList.contains('fade-in')) {
            section.classList.add('fade-in');
        }
    });

    // Анимация для карточек услуг
    const serviceItems = document.querySelectorAll('.service-item, .why-us-item, .testimonial-card');
    serviceItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Валидация формы
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Очистить предыдущие ошибки
            clearErrors();

            // Получить значения полей
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            let isValid = true;

            // Валидация имени
            if (name.length < 2) {
                showError('name', 'Имя должно содержать минимум 2 символа');
                isValid = false;
            }

            // Валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('email', 'Введите корректный email адрес');
                isValid = false;
            }

            // Валидация телефона
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(phone)) {
                showError('phone', 'Введите корректный номер телефона');
                isValid = false;
            }

            // Валидация сообщения
            if (message.length < 10) {
                showError('message', 'Сообщение должно содержать минимум 10 символов');
                isValid = false;
            }

            if (isValid) {
                // Имитация отправки формы
                submitForm({ name, email, phone, message });
            }
        });
    }

    function showError(fieldId, message) {
        const errorDiv = document.querySelector(`#${fieldId}`).parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
        }
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.classList.add('hidden');
            error.textContent = '';
        });

        // Скрыть сообщения об успехе/ошибке
        const successDiv = document.getElementById('form-success');
        const errorDiv = document.getElementById('form-error');
        if (successDiv) successDiv.classList.add('hidden');
        if (errorDiv) errorDiv.classList.add('hidden');
    }

    function submitForm(formData) {
        // Имитация отправки формы
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        // Показать загрузку
        submitButton.innerHTML = '<span>Отправка...</span>';
        submitButton.disabled = true;

        // Имитировать задержку отправки
        setTimeout(() => {
            // Случайно показать успех или ошибку для демонстрации
            const success = Math.random() > 0.3; // 70% успех

            if (success) {
                document.getElementById('form-success').classList.remove('hidden');
                contactForm.reset();
            } else {
                document.getElementById('form-error').classList.remove('hidden');
            }

            // Восстановить кнопку
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
});
