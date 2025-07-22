// Modal popup for newsletter subscription and login

document.addEventListener('DOMContentLoaded', function() {
    // --- Subscribe Modal ---
    const subscribeModal = document.createElement('div');
    subscribeModal.id = 'subscribeModal';
    subscribeModal.style.display = 'none';
    subscribeModal.style.position = 'fixed';
    subscribeModal.style.top = '0';
    subscribeModal.style.left = '0';
    subscribeModal.style.width = '100vw';
    subscribeModal.style.height = '100vh';
    subscribeModal.style.background = 'rgba(0,0,0,0.7)';
    subscribeModal.style.justifyContent = 'center';
    subscribeModal.style.alignItems = 'center';
    subscribeModal.style.zIndex = '1000';
    subscribeModal.innerHTML = `
        <div style="background:#232526;padding:32px 24px;border-radius:10px;max-width:350px;width:90%;box-shadow:0 4px 24px rgba(0,255,231,0.15);text-align:center;position:relative;">
            <h3 style="color:#00ffe7;margin-top:0;">Subscribe to TechSphere</h3>
            <p style="color:#eaeaea;">Get the latest tech news and updates delivered to your inbox.</p>
            <input type="email" id="emailInput" placeholder="Your email" style="width:90%;padding:10px;margin:10px 0 16px 0;border-radius:5px;border:1px solid #00ffe7;background:#181a1b;color:#eaeaea;">
            <br>
            <button id="submitSub" class="btn-main">Subscribe</button>
            <button id="closeModal" style="background:none;border:none;color:#00ffe7;position:absolute;top:10px;right:16px;font-size:1.3em;cursor:pointer;">&times;</button>
            <div id="subMsg" style="margin-top:12px;font-size:1em;"></div>
        </div>
    `;
    document.body.appendChild(subscribeModal);

    // Show subscribe modal
    const btn = document.getElementById('demoBtn');
    if (btn) {
        btn.addEventListener('click', function(e) {
            subscribeModal.style.display = 'flex';
        });
    }

    // Close subscribe modal
    subscribeModal.addEventListener('click', function(e) {
        if (e.target === subscribeModal || e.target.id === 'closeModal') {
            subscribeModal.style.display = 'none';
            document.getElementById('subMsg').textContent = '';
        }
    });

    // Handle subscription
    subscribeModal.querySelector('#submitSub').addEventListener('click', function() {
        const email = document.getElementById('emailInput').value;
        const msg = document.getElementById('subMsg');
        if (email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            msg.style.color = '#00ffe7';
            msg.textContent = 'Thank you for subscribing!';
            setTimeout(() => { subscribeModal.style.display = 'none'; msg.textContent = ''; }, 1500);
        } else {
            msg.style.color = '#ff4d4d';
            msg.textContent = 'Please enter a valid email address.';
        }
    });

    // --- Login Modal ---
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const submitLogin = document.getElementById('submitLogin');
    const loginMsg = document.getElementById('loginMsg');

    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'flex';
        });
    }
    if (closeLoginModal && loginModal) {
        closeLoginModal.addEventListener('click', function() {
            loginModal.style.display = 'none';
            loginMsg.textContent = '';
        });
    }
    // Close login modal when clicking outside the form
    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
                loginMsg.textContent = '';
            }
        });
    }
    // Handle login
    if (submitLogin) {
        submitLogin.addEventListener('click', function() {
            const user = document.getElementById('loginUser').value.trim();
            const pass = document.getElementById('loginPass').value;
            if (user && pass) {
                loginMsg.style.color = '#00ffe7';
                loginMsg.textContent = 'Đăng nhập thành công (demo)!';
                setTimeout(() => { loginModal.style.display = 'none'; loginMsg.textContent = ''; }, 1200);
            } else {
                loginMsg.style.color = '#ff4d4d';
                loginMsg.textContent = 'Vui lòng nhập đủ tên đăng nhập/email và mật khẩu.';
            }
        });
    }

    // --- Smooth Scroll for Navigation ---
    document.querySelectorAll('.nav-list a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - 40,
                    behavior: 'smooth'
                });
                // Set active class
                document.querySelectorAll('.nav-list a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // --- Fade-in Animation on Scroll ---
    const animatedSections = document.querySelectorAll('section, .feature-card, .news-item');
    const fadeInOnScroll = () => {
        animatedSections.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.classList.add('fade-in');
            }
        });
    };
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll();

    // --- Button Ripple Effect ---
    document.querySelectorAll('.btn-main, button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const circle = document.createElement('span');
            circle.className = 'ripple';
            const rect = btn.getBoundingClientRect();
            circle.style.left = (e.clientX - rect.left) + 'px';
            circle.style.top = (e.clientY - rect.top) + 'px';
            btn.appendChild(circle);
            setTimeout(() => circle.remove(), 600);
        });
    });
});

// User Profile Settings (for settings/profile page)
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra nếu có đủ các phần tử cần thiết trên trang
    const usernameInput = document.getElementById('username-input');
    const languageSelect = document.getElementById('language-select');
    const themeSelect = document.getElementById('theme-select');
    const notificationsToggle = document.getElementById('notifications-toggle');
    const saveBtn = document.getElementById('save-settings');
    const cancelBtn = document.getElementById('cancel-settings');
    if (usernameInput && languageSelect && themeSelect && notificationsToggle && saveBtn && cancelBtn) {
        // Load saved settings
        const account = localStorage.getItem('account');
        if (account) {
            const userData = JSON.parse(account);
            usernameInput.value = userData.username || 'Người dùng';
            languageSelect.value = userData.language || 'vi';
            themeSelect.value = userData.theme || 'dark';
            notificationsToggle.checked = userData.notifications !== false;
        }
        // Save settings
        saveBtn.addEventListener('click', function() {
            const account = localStorage.getItem('account');
            if (account) {
                const userData = JSON.parse(account);
                // Giữ nguyên password nếu có
                const password = userData.password;
                userData.username = usernameInput.value;
                userData.language = languageSelect.value;
                userData.theme = themeSelect.value;
                userData.notifications = notificationsToggle.checked;
                if (password !== undefined) userData.password = password;
                localStorage.setItem('account', JSON.stringify(userData));
                alert('Cài đặt đã được lưu!');
            }
        });
        // Cancel button
        cancelBtn.addEventListener('click', function() {
            window.location.href = 'profile.html';
        });
    }
});

// Hiển thị dữ liệu user profile từ localStorage ra console
(function() {
    const account = localStorage.getItem('account');
    if (account) {
        try {
            const userData = JSON.parse(account);
            console.log('User profile data in localStorage:', userData);
        } catch (e) {
            console.warn('Dữ liệu localStorage account không hợp lệ:', account);
        }
    } else {
        console.log('Không có dữ liệu user profile trong localStorage.');
    }
})();

// Hide global loading effect when page is ready
window.addEventListener('load', function() {
    var loading = document.getElementById('global-loading');
    if (loading) {
        loading.style.display = 'none';
    }
});
