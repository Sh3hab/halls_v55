// بيانات وهمية للقاعات (صنعاء، اليمن)
const hallsData = [
    {
        id: 1,
        name: "قاعة النخبة",
        location: "شارع الجزائر، صنعاء",
        price: 80000,
        image: "image/1.png",
        rating: 4.3,
        reviews: 60,
        capacity: 250
    },
    {
        id: 2,
        name: "قاعة السعادة",
        location: "شارع تعز، صنعاء",
        price: 95000,
        image: "image/2.png",
        rating: 4.6,
        reviews: 80,
        capacity: 300
    },
    {
        id: 3,
        name: "قاعة الريان",
        location: "شارع الستين الجنوبي، صنعاء",
        price: 70000,
        image: "image/3.png",
        rating: 4.1,
        reviews: 45,
        capacity: 200
    },
    {
        id: 4,
        name: "قاعة القمة",
        location: "شارع الخمسين، صنعاء",
        price: 110000,
        image: "image/4.png",
        rating: 4.8,
        reviews: 100,
        capacity: 350
    },
    {
        id: 5,
        name: "قاعة الأحلام",
        location: "شارع الزبيري، صنعاء",
        price: 60000,
        image: "image/1.png",
        rating: 4.0,
        reviews: 30,
        capacity: 150
    },
    {
        id: 6,
        name: "قاعة الفخامة",
        location: "شارع حدة، صنعاء",
        price: 120000,
        image: "image/2.png",
        rating: 4.7,
        reviews: 90,
        capacity: 400
    }
];

// متغيرات للتطبيق
let currentScreen = 'splash';
let selectedHall = null;

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    
    setTimeout(() => {
        switchScreen('login');
    }, 1500);
    
    // تحميل القاعات عند النقر على تسجيل الدخول
    document.querySelector('.login-screen .btn.primary').addEventListener('click', function() {
        loadHalls();
        switchScreen('home');
    });
    
    // تحميل القاعات عند النقر على تسجيل الدخول بـ Google
    document.querySelector('.google-btn').addEventListener('click', function() {
        loadHalls();
        switchScreen('home');
    });

    document.querySelector('.register-link').addEventListener('click', function() {
        loadHalls();
        switchScreen('register-screen');
    });
    
    
    // تعبئة قائمة القاعات
    function loadHalls() {
        const hallsList = document.querySelector('.halls-list');
        hallsList.innerHTML = '';
        
        hallsData.forEach(hall => {
            const hallCard = document.createElement('div');
            hallCard.className = 'hall-card';
            hallCard.innerHTML = `
                <div class="hall-image" style="background-image: url('${hall.image}')"></div>
                <div class="hall-info">
                    <h3 class="hall-name">${hall.name}</h3>
                    <div class="hall-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${hall.location}</span>
                    </div>
                    <div class="hall-price">${hall.price} ر.ي</div>
                </div>
            `;
            
            hallCard.addEventListener('click', function() {
                showHallDetails(hall.id);
            });
            
            hallsList.appendChild(hallCard);
        });
    }
    
    // عرض تفاصيل القاعة
    function showHallDetails(hallId) {
        const hall = hallsData.find(h => h.id === hallId);
        if (!hall) return;
        
        selectedHall = hall;
        
        // تعبئة البيانات
        document.querySelector('.hall-details-screen .main-image img').src = hall.image;
        document.querySelector('.hall-details-screen .hall-name').textContent = hall.name;
        document.querySelector('.hall-details-screen .rating span').textContent = hall.rating + ' (' + hall.reviews + ' تقييم)';
        document.querySelector('.hall-details-screen .location span').textContent = hall.location;
        document.querySelector('.hall-details-screen .amount').textContent = hall.price + ' ر.س';
        
        // إضافة الصور المصغرة
        const thumbnails = document.querySelector('.thumbnails');
        thumbnails.innerHTML = '';
        for (let i = 1; i <= 4; i++) {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail' + (i === 1 ? ' active' : '');
            // Use local images from the image folder, e.g., image/1/1.png, image/1/2.png, etc.
            const hallImageFolder = hall.image.replace(/\/\d+\.png$/, `/${i}.png`);
            thumbnail.innerHTML = `<img src="${hallImageFolder}" alt="Thumbnail ${i}">`;
            thumbnails.appendChild(thumbnail);
        }
        
        // تغيير الصورة الرئيسية عند النقر على الصور المصغرة
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // Change main image to the selected thumbnail from local image folder
            const mainImageSrc = hall.image.replace(/\/\d+\.png$/, `/${index + 1}.png`);
            document.querySelector('.main-image img').src = mainImageSrc;
            });
        });

        switchScreen('hall-details');
    }
    
    // النقر على زر احجز الآن
    document.querySelector('.book-now-btn .btn').addEventListener('click', function() {
        if (!selectedHall) return;
        
        // تعبئة بيانات القاعة في شاشة الحجز
        document.querySelector('.booking-screen .hall-summary img').src = selectedHall.image;
        document.querySelector('.booking-screen .hall-summary h3').textContent = selectedHall.name;
        document.querySelector('.booking-screen .hall-summary .location span').textContent = selectedHall.location;
        document.querySelector('.booking-screen .hall-summary .price').textContent = selectedHall.price + ' ر.س';
        
        // تعبئة ملخص الدفع
        document.querySelector('.payment-summary .summary-item:nth-child(1) span:last-child').textContent = selectedHall.price + ' ر.س';
        const tax = Math.round(selectedHall.price * 0.1);
        document.querySelector('.payment-summary .summary-item:nth-child(2) span:last-child').textContent = tax + ' ر.س';
        document.querySelector('.payment-summary .summary-item.total span:last-child').textContent = (selectedHall.price + tax) + ' ر.س';
        
        switchScreen('booking');
    });
    
    // النقر على زر تأكيد الحجز
    document.querySelector('.confirm-booking .btn').addEventListener('click', function() {
        alert('تم تأكيد الحجز بنجاح! شكراً لاستخدامك تطبيق حفلاتنا.');
        switchScreen('home');
    });
    
    // التنقل بين الشاشات
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const screen = this.closest('.screen').classList[1];
            
            if (screen === 'hall-details-screen') {
                switchScreen('home');
            } else if (screen === 'booking-screen') {
                switchScreen('hall-details');
            } else if (screen === 'profile-screen') {
                switchScreen('home');
            }
        });
    });
    
    // التنقل في القائمة السفلية
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const target = this.querySelector('span').textContent;
            
            if (target === 'حسابي') {
                switchScreen('profile');
            } else if (target === 'الرئيسية') {
                switchScreen('home');
            } else {
                alert(`سيتم فتح شاشة ${target} هنا`);
            }
            
            // تحديث العنصر النشط
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // عداد الضيوف
    document.querySelector('.counter-btn.minus').addEventListener('click', function() {
        const countElement = document.querySelector('.count');
        let count = parseInt(countElement.textContent);
        if (count > 50) {
            count -= 10;
            countElement.textContent = count;
        }
    });
    
    document.querySelector('.counter-btn.plus').addEventListener('click', function() {
        const countElement = document.querySelector('.count');
        let count = parseInt(countElement.textContent);
        if (count < 500) {
            count += 10;
            countElement.textContent = count;
        }
    });
    
    // تعيين تاريخ اليوم كحد أدنى لتاريخ الحجز
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('booking-date').min = today;
});

// تبديل الشاشات
function switchScreen(screenName) {
    document.querySelector(`.${currentScreen}-screen`).classList.remove('active');
    
    switch(screenName) {
        case 'splash':
            currentScreen = 'splash';
            break;
        case 'login':
            currentScreen = 'login';
            break;
        case 'home':
            currentScreen = 'home';
            break;
        case 'hall-details':
            currentScreen = 'hall-details';
            break;
        case 'booking':
            currentScreen = 'booking';
            break;
        case 'profile':
            currentScreen = 'profile';
            break;
    }
    
    document.querySelector(`.${currentScreen}-screen`).classList.add('active');
}

const selector = document.getElementById('location-selector');
const dropdown = document.getElementById('location-dropdown');
const current = document.getElementById('current-location');

selector.onclick = function(e) {
    dropdown.classList.toggle('active');
    e.stopPropagation();
};

document.querySelectorAll('.location-option').forEach(opt => {
    opt.onclick = function(e) {
        current.textContent = this.dataset.location;
        dropdown.classList.remove('active');
        e.stopPropagation();
    };
});

document.body.onclick = function() {
    dropdown.classList.remove('active');
};

// إضافة تأثيرات على الأزرار
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseover', function() {
        this.classList.add('hover');
    });
    
    btn.addEventListener('mouseout', function() {
        this.classList.remove('hover');
    });
});

// منع الزووم باللمس والاصبعين على الهواتف
document.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('gesturestart', function(event) {
    event.preventDefault();
});

// منع تحديد النص في الصفحة باللمس أو الماوس
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// منع ظهور مستطيل التحديد الأزرق (highlight) على الجوال والمتصفح
document.addEventListener('touchstart', function(e) {
    if (e.target.nodeType === 3) { // نص فقط
        e.preventDefault();
    }
}, { passive: false });

// إضافة CSS لمنع التحديد نهائياً
const style = document.createElement('style');
style.innerHTML = `
    * {
        user-select: none !important;
        -webkit-user-select: none !important;
        -ms-user-select: none !important;
    }
    ::selection {
        background: transparent !important;
    }
`;
document.head.appendChild(style);

// إجبار الشاشة على وضع ملء الشاشة على الجوال فقط
function isMobile() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

function requestFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { // Safari
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE11
        elem.msRequestFullscreen();
    }
}

// محاولة الدخول في وضع ملء الشاشة عند تحميل الصفحة وأي تفاعل (على الجوال فقط)
function ensureFullscreen() {
    if (!isMobile()) return;
    if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
    ) {
        requestFullscreen();
    }
}

document.addEventListener('DOMContentLoaded', ensureFullscreen);
document.addEventListener('click', ensureFullscreen);
document.addEventListener('touchstart', ensureFullscreen);
document.addEventListener('keydown', ensureFullscreen);


// إخفاء المربع الأزرق (outline) عند الضغط أو التركيز على الأزرار والعناصر التفاعلية
const outlineStyle = document.createElement('style');
outlineStyle.innerHTML = `
    button, .btn, input, select, textarea, a, .hall-card, .nav-item, .counter-btn, .google-btn {
        outline: none !important;
        -webkit-tap-highlight-color: transparent !important;
        box-shadow: none !important;
    }
    *:focus {
        outline: none !important;
        box-shadow: none !important;
    }
`;
document.head.appendChild(outlineStyle);