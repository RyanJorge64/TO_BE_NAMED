const translations = {
    en: {
        loginHeader: 'Login',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        showPassword: 'Show',
        hidePassword: 'Hide',
        forgotPassword: 'Forgot Password?',
        loginButton: 'Login',
        signUpPrompt: 'No account?',
        signUpLink: 'Sign up',
        separatorOr: 'or',
        continueWithoutAccount: 'Continue without an account'
    },
    jp: {
        loginHeader: 'ログイン',
        emailLabel: 'メールアドレス',
        passwordLabel: 'パスワード',
        showPassword: '表示',
        hidePassword: '非表示',
        forgotPassword: 'パスワードを忘れましたか？',
        loginButton: 'ログイン',
        signUpPrompt: 'アカウントをお持ちでない方?',
        signUpLink: '登録',
        separatorOr: 'または',
        continueWithoutAccount: 'アカウントなしで続行'
    },
    esp: {
        loginHeader: 'Iniciar sesión',
        emailLabel: 'Correo electrónico',
        passwordLabel: 'Contraseña',
        showPassword: 'Mostrar',
        hidePassword: 'Ocultar',
        forgotPassword: '¿Olvidaste tu contraseña?',
        loginButton: 'Iniciar sesión',
        signUpPrompt: '¿No tienes cuenta?',
        signUpLink: 'Regístrate',
        separatorOr: 'o',
        continueWithoutAccount: 'Continuar sin una cuenta'
    },
    tag: {
        loginHeader: 'Mag-login',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        showPassword: 'Ipakita',
        hidePassword: 'Itago',
        forgotPassword: 'Nakalimutan ang password?',
        loginButton: 'Mag-login',
        signUpPrompt: 'Walang account?',
        signUpLink: 'Mag-sign up',
        separatorOr: 'o',
        continueWithoutAccount: 'Magpatuloy nang walang account'
    }
};

const languageSelect = document.querySelector('.langSelectElement');
const passwrodShower = document.getElementById('showPasswordbtn');
const pswrdInput = document.getElementById('password');
const textNodes = document.querySelectorAll('[data-i18n]');

let currentLanguage = 'en';

function updatePasswordToggleText() {
    if (!passwrodShower || !pswrdInput) return;

    const key = pswrdInput.type === 'password' ? 'showPassword' : 'hidePassword';
    passwrodShower.textContent = translations[currentLanguage][key] || (pswrdInput.type === 'password' ? 'Show' : 'Hide');
}

function applyTranslations(language) {
    const values = translations[language] || translations.en;
    currentLanguage = language;

    textNodes.forEach((element) => {
        const key = element.dataset.i18n;
        if (values[key] !== undefined) {
            element.textContent = values[key];
        }
    });

    const signupText = document.querySelector('#singUpthingymajig');
    if (signupText) {
        const prompt = signupText.querySelector('span');
        const link = signupText.querySelector('a');

        if (prompt && values.signUpPrompt) {
            prompt.textContent = values.signUpPrompt;
        }

        if (link && values.signUpLink) {
            link.textContent = values.signUpLink;
        }
    }

    updatePasswordToggleText();
    localStorage.setItem('preferredLanguage', language);
}

if (passwrodShower && pswrdInput) {
    passwrodShower.onclick = function () {
        if (pswrdInput.type === 'password') {
            pswrdInput.type = 'text';
        } else {
            pswrdInput.type = 'password';
        }

        updatePasswordToggleText();
    };
}

if (languageSelect) {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    languageSelect.value = savedLanguage;
    languageSelect.addEventListener('change', (event) => {
        applyTranslations(event.target.value);
    });

    applyTranslations(savedLanguage);
} else {
    applyTranslations('en');
}

const carouselSlides = Array.from(document.querySelectorAll('.carouselImage'));
const carouselDots = Array.from(document.querySelectorAll('.carouselDot'));
const prevButton = document.querySelector('.carouselPrev');
const nextButton = document.querySelector('.carouselNext');

if (carouselSlides.length > 0) {
    let currentSlide = 0;
    let autoAdvance;

    function showSlide(index) {
        currentSlide = (index + carouselSlides.length) % carouselSlides.length;

        const carouselTrack = document.querySelector('.carouselSlides');
        if (carouselTrack) {
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        carouselDots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === currentSlide);
        });
    }

    function startAutoAdvance() {
        clearInterval(autoAdvance);
        autoAdvance = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 4000);
    }

    prevButton?.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        startAutoAdvance();
    });

    nextButton?.addEventListener('click', () => {
        showSlide(currentSlide + 1);
        startAutoAdvance();
    });

    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startAutoAdvance();
        });
    });

    showSlide(0);
    startAutoAdvance();
}