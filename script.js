
(function () {
    emailjs.init("goMicYBoyJp8gB0HI");
})();
function clearAllOrders() {
    if (confirm("هل أنت متأكد من مسح جميع الطلبات؟")) {
        localStorage.removeItem("orders");
        displayOrders();
    }
}

function clearOrderForm() {
    document.getElementById("clientName").value = "";
    document.getElementById("clientCompany").value = "";
    document.getElementById("clientPhone").value = "";
}

function displayOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    let html = "";
    orders.forEach((order, i) => {
        html += `<div style="border:1px solid #ddd;margin:10px;padding:10px;">
    <strong>طلب رقم ${i + 1}</strong><br>
    التاريخ: ${order.date}<br>
    الاسم: ${order.name}<br>
    الشركة: ${order.company || "-"}<br>
    الهاتف: ${order.phone}<br>
    المنتجات:<br>`;
        order.items.forEach(it => {
            html += `- ${it.name} × ${it.qty} = ${it.price * it.qty} جنيه<br>`;
        });
        html += `الإجمالي: ${order.total} جنيه</div>`;
    });
    document.getElementById("ordersList").innerHTML = html;
}

displayOrders();

function saveOrder() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let name = document.getElementById("clientName").value;
    let company = document.getElementById("clientCompany").value;
    let phone = document.getElementById("clientPhone").value;

    orders.push({
        date: new Date().toLocaleString(),
        name, company, phone,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    });

    localStorage.setItem("orders", JSON.stringify(orders));
}

function showToast(text) {
    const toast = document.getElementById("toast");
    toast.innerText = "✔️ " + text;
    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 2000);
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    saveCart();
    updateCart();
    showToast(name + " تمت إضافته إلى السلة");
}

function updateCart() {
    document.querySelector('.cart-count').innerText =
        cart.reduce((sum, item) => sum + item.qty, 0);

    let items = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        items += `
<div class="cart-item">
    <strong>${item.name}</strong><br>
    السعر: ${item.price} جنيه<br>
    الكمية:
    <input type="number" min="1" value="${item.qty}"
        onchange="changeQty(${index}, this.value)">
    <br>
    <button onclick="removeItem(${index})">❌ حذف</button>
</div>
`;
    });

    document.getElementById('cartItems').innerHTML = items;
    document.getElementById('totalPrice').innerText =
        'الإجمالي / Total: ' + total + ' جنيه';
}


function toggleCart() {
    const cartPage = document.getElementById('cartPage');
    cartPage.style.display =
        cartPage.style.display === 'block' ? 'none' : 'block';
}

document.querySelector('.cart-icon').onclick = toggleCart;

function sendWhatsApp() {
    if (cart.length === 0) {
        showToast(currentLang === "ar" ? "السلة فارغة" : "Cart is empty");
        return;
    }

    let name = document.getElementById("clientName").value;
    let company = document.getElementById("clientCompany").value;
    let phone = document.getElementById("clientPhone").value;

    if (!name || !phone) {
        showToast(currentLang === "ar"
            ? "من فضلك املأ الاسم ورقم الهاتف"
            : "Please enter name and phone number");
        return;
    }

    let message = `🛒 طلب توريد جديد - SpicesFactory%0A`;
    message += `👤 الاسم: ${name}%0A`;
    message += `🏢 الشركة: ${company || "-"}%0A`;
    message += `📞 الهاتف: ${phone}%0A%0A`;

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        message += `• ${item.name} × ${item.qty} = ${item.price * item.qty} جنيه%0A`;
    });

    message += `%0A💰 الإجمالي: ${total} جنيه`;

    // حفظ الطلب في لوحة التحكم
    saveOrder();

    // فتح واتساب
    window.location.href =
        `https://wa.me/201000746549?text=${message}`;

    // ✅ تفريغ كل شيء بعد الإرسال
    cart = [];
    saveCart();
    updateCart();
    clearOrderForm();

    showToast(currentLang === "ar"
        ? "✅ شكراً لك، تم إرسال طلب التوريد بنجاح"
        : "✅ Thank you, your order has been sent successfully");
}


function sendEmail() {
    if (cart.length === 0) {
        showToast(currentLang === "ar" ? "السلة فارغة" : "Cart is empty");
        return;
    }
    let name = document.getElementById("clientName").value.trim();
    let company = document.getElementById("clientCompany").value.trim();
    let phone = document.getElementById("clientPhone").value.trim();

    // ✅ Validation
    if (!name) {
        showToast("❌ من فضلك أدخل الاسم");
        return;
    }

    if (!phone) {
        showToast("❌ من فضلك أدخل رقم الهاتف");
        return;
    }

    // تجهيز محتوى الطلب
    let orderText = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        orderText += `${item.name} × ${item.qty} = ${item.price * item.qty} جنيه\n`;
    });

    orderText += `\nالإجمالي: ${total} جنيه`;

    saveOrder();
    // إرسال الإيميل
    emailjs.send("A.Mohamed14", "AdhamID", {
        name: name,
        company: company || "-",
        phone: phone,
        order: orderText
    }).then(
        function () {
            showToast("✅ تم إرسال الطلب بنجاح");

            // 🔥 Reset كل حاجة
            cart = [];
            saveCart();
            updateCart();

            document.getElementById("clientName").value = "";
            document.getElementById("clientCompany").value = "";
            document.getElementById("clientPhone").value = "";

            localStorage.removeItem("cart");
        },
        function () {
            showToast("❌ حدث خطأ أثناء الإرسال");
        }
    );
}

function showToast(text) {
    const toast = document.getElementById("toast");
    toast.innerText = text;
    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 3000);
}

function showNotification(product) {
    alert('✅ تم إضافة ' + product + ' إلى السلة');
}
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

function changeQty(index, qty) {
    cart[index].qty = parseInt(qty);
    saveCart();
    updateCart();
}
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

updateCart();





let currentLang = "ar";

function toggleLang() {
const elements = document.querySelectorAll("[data-ar]");
const btn = document.querySelector(".lang-btn");

elements.forEach(el => {
    el.textContent =
        currentLang === "ar"
            ? el.getAttribute("data-en")
            : el.getAttribute("data-ar");
});

if (currentLang === "ar") {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    btn.textContent = "AR";
    currentLang = "en";
} else {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    btn.textContent = "EN";
    currentLang = "ar";
}
}

