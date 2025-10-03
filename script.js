const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const backToTop = document.getElementById('back-to-top');
const nav = document.querySelector('nav');
const orderForm = document.getElementById('order-form');
const contactForm = document.getElementById('contact-form');
const xiaoyanOrderForm = document.getElementById('xiaoyan-order-form');
const recipeItems = document.querySelectorAll('.recipe-item');
const foodItems = document.querySelectorAll('input[name="food-item"]');
const totalPriceElement = document.getElementById('total-price');
const orderButton = document.querySelector('button[type="submit"]');
const quickOrderOptions = document.querySelectorAll('.quick-order-option');
const tasteOptions = document.querySelectorAll('.taste-option');

// 移动菜单切换
hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // 汉堡菜单图标切换
    const icon = hamburger.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// 移动菜单链接点击事件
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// 平滑滚动
const smoothScroll = (targetId) => {
    const target = document.getElementById(targetId);
    if (target) {
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    }
};

// 返回顶部按钮
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
    
    // 导航栏滚动效果
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 菜品选择功能
const foodPrices = {
    '红烧肉': 88,
    '清蒸鱼': 98,
    '糖醋排骨': 78,
    '宫保鸡丁': 58,
    '麻婆豆腐': 38,
    '蒜蓉西兰花': 32,
    '可乐': 12,
    '雪碧': 12,
    '啤酒': 15
};

foodItems.forEach(item => {
    item.addEventListener('change', updateTotalPrice);
});

function updateTotalPrice() {
    let total = 0;
    foodItems.forEach(item => {
        if (item.checked) {
            const foodName = item.value;
            if (foodPrices[foodName]) {
                total += foodPrices[foodName];
            }
        }
    });
    totalPriceElement.textContent = total;
}

// 订单提交表单
if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('订单提交成功！我们会尽快为您准备美食~');
        orderForm.reset();
        updateTotalPrice();
    });
}

// 联系表单提交
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('感谢您的留言！我们会尽快回复您~');
        contactForm.reset();
    });
}

// 食谱展示
recipeItems.forEach(item => {
    item.addEventListener('click', () => {
        const recipeDetails = item.querySelector('.recipe-details');
        recipeDetails.classList.toggle('active');
    });
});

// 小妍点餐表单提交
if (xiaoyanOrderForm) {
    xiaoyanOrderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('亲爱的小妍，你的订单已提交！淳淳会尽快为你准备美食~');
        xiaoyanOrderForm.reset();
    });
}

// 口味偏好选择
tasteOptions.forEach(option => {
    option.addEventListener('change', () => {
        const selectedTastes = Array.from(tasteOptions)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        // 可以在这里根据选择的口味偏好做进一步处理
        console.log('小妍的口味偏好：', selectedTastes);
    });
});

// 快速点餐功能
function selectQuickOrder(orderType) {
    // 首先取消所有选中的菜品和饮品
    document.querySelectorAll('input[name="xiaoyan-dish"]').forEach(input => {
        input.checked = false;
    });
    document.querySelectorAll('input[name="xiaoyan-drink"]').forEach(input => {
        input.checked = false;
    });
    
    // 根据套餐类型选择菜品和饮品
    switch(orderType) {
        case 'favorite':
            // 小妍最爱套餐：红烧排骨 + 鲅鱼饺子 + 蓝莓酸奶
            document.querySelector('input[name="xiaoyan-dish"][value="红烧排骨"]').checked = true;
            document.querySelector('input[name="xiaoyan-dish"][value="鲅鱼饺子"]').checked = true;
            document.querySelector('input[name="xiaoyan-drink"][value="酸奶"]').checked = true;
            break;
        case 'dessert':
            // 甜品时光套餐：芋泥蛋糕 + 耙耙柑 + meco果汁茶
            // 由于没有专门的甜点checkbox，我们在特殊要求中注明
            const textarea = document.querySelector('#xiaoyan-order-form textarea');
            if (textarea) {
                textarea.value = '请提供芋泥蛋糕和耙耙柑作为甜点';
            }
            document.querySelector('input[name="xiaoyan-drink"][value="meco"]').checked = true;
            break;
        case 'breakfast':
            // 元气早餐套餐：皮蛋瘦肉粥 + 玉米鲜肉包 + AD钙奶
            document.querySelector('input[name="xiaoyan-dish"][value="皮蛋瘦肉粥"]').checked = true;
            document.querySelector('input[name="xiaoyan-dish"][value="玉米鲜肉包"]').checked = true;
            document.querySelector('input[name="xiaoyan-drink"][value="ad钙"]').checked = true;
            break;
        case 'pizza':
            // 披萨派对套餐：薯角培根披萨 + 可乐
            document.querySelector('input[name="xiaoyan-dish"][value="薯角培根披萨"]').checked = true;
            document.querySelector('input[name="xiaoyan-drink"][value="可乐"]').checked = true;
            break;
    }
}