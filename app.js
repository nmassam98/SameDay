const firebaseConfig = {
  apiKey: "AIzaSyArf0Ey5oLfiI7oD3Y8LZtpxRpS9ZZXSTc",
  authDomain: "://firebaseapp.com",
  databaseURL: "https://firebaseio.com",
  projectId: "sameday-lk",
  storageBucket: "sameday-lk.firebasestorage.app",
  messagingSenderId: "335191639721",
  appId: "1:335191639721:web:2b81d63e4378b7b923cbb8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const MANAGER_WHATSAPP = "94770000000";

let rideMap, rideMarker, foodMap, foodMarker;
let selectedVehName = "Tuk-Tuk (3-Wheeler)";
let baseFare = 150, perKmRate = 80;
function initRideMap() {
    if (rideMap) return;
    rideMap = L.map('rideMap').setView([8.4981, 81.1818], 14);
    L.tileLayer('https://{s}://{z}/{x}/{y}{r}.png').addTo(rideMap);
    rideMarker = L.marker([8.4981, 81.1818]).addTo(rideMap).bindPopup('Kinniya Town Center').openPopup();

    const riders = [
        { lat: 8.5010, lng: 81.1840, label: "Tuk-Tuk #04" },
        { lat: 8.4950, lng: 81.1790, label: "Bike #12" },
        { lat: 8.5035, lng: 81.1880, label: "Mini Car #02" },
        { lat: 8.4920, lng: 81.1850, label: "Van #01" }
    ];
    const markers = riders.map(function(r) {
        return L.circleMarker([r.lat, r.lng], { radius: 8, color: '#004aad', fillColor: '#ff914d', fillOpacity: 1 }).addTo(rideMap).bindPopup(r.label);
    });
    setInterval(function() {
        markers.forEach(function(m) {
            const p = m.getLatLng();
            m.setLatLng([p.lat + (Math.random() - 0.5) * 0.001, p.lng + (Math.random() - 0.5) * 0.001]);
        });
    }, 3000);
}

function initFoodMap() {
    if (foodMap) return;
    foodMap = L.map('foodMap').setView([8.4981, 81.1818], 14);
    L.tileLayer('https://{s}://{z}/{x}/{y}{r}.png').addTo(foodMap);
    foodMarker = L.marker([8.4981, 81.1818]).addTo(foodMap).bindPopup('Food Delivery Drop Point').openPopup();
}

function detectGPS(targetType) {
    const btn = document.getElementById(targetType === 'ride' ? 'rideGpsBtn' : 'foodGpsBtn');
    btn.innerText = "Detecting GPS...";
    if (!navigator.geolocation) { alert("GPS not supported"); return; }

    navigator.geolocation.getCurrentPosition(async function(pos) {
        const lat = pos.coords.latitude, lng = pos.coords.longitude;
        let addressText = "GPS: " + lat.toFixed(5) + ", " + lng.toFixed(5);
        try {
            const res = await fetch("https://openstreetmap.org" + lat + "&lon=" + lng);
            const data = await res.json();
            if (data && data.display_name) addressText = data.display_name.split(',').slice(0, 3).join(',');
        } catch (e) {}

        if (targetType === 'ride') {
            initRideMap();
            setTimeout(function() { rideMap.invalidateSize(); rideMap.setView([lat, lng], 16); rideMarker.setLatLng([lat, lng]).bindPopup("You: " + addressText).openPopup(); }, 200);
            document.getElementById('r-from').value = addressText;
        } else {
            initFoodMap();
            setTimeout(function() { foodMap.invalidateSize(); foodMap.setView([lat, lng], 16); foodMarker.setLatLng([lat, lng]).bindPopup("Deliver: " + addressText).openPopup(); }, 200);
            document.getElementById('f-addr').value = addressText;
        }
        btn.innerText = "Location Detected!";
    }, function() {
        alert("Please allow Location permission!");
        btn.innerText = "Detect My Current GPS Location";
    });
}
function switchService(service) {
    ['courier', 'food', 'ride', 'admin'].forEach(function(s) {
        const sec = document.getElementById('sec-' + s);
        if (sec) sec.style.display = 'none';
        const tab = document.getElementById('tab-' + s);
        if (tab) tab.classList.remove('active');
    });
    document.getElementById('sec-' + service).style.display = 'block';
    const activeTab = document.getElementById('tab-' + service);
    if (activeTab) activeTab.classList.add('active');

    if (service === 'ride') { initRideMap(); setTimeout(function() { rideMap.invalidateSize(); }, 250); }
    if (service === 'food') { initFoodMap(); setTimeout(function() { foodMap.invalidateSize(); }, 250); }
    if (service === 'admin') listenToCloudOrders();
}

function saveOrderToCloud(type, details) {
    const trackId = "SD" + Math.floor(1000 + Math.random() * 9000);
    db.ref('orders/' + trackId).set({
        id: trackId,
        type: type,
        details: details,
        status: "Order Received - Assigning Rider",
        time: new Date().toLocaleString()
    });
    return trackId;
}

function listenToCloudOrders() {
    const list = document.getElementById('adminOrderList');
    list.innerHTML = "<p style='color:#ffde59;'>Loading live cloud orders...</p>";
    db.ref('orders').on('value', function(snapshot) {
        const data = snapshot.val();
        if (!data) { list.innerHTML = "<p style='color:#94a3b8;'>No live orders in cloud yet.</p>"; return; }
        const orders = Object.values(data).reverse();
        list.innerHTML = orders.map(function(o) {
            return "<div class='order-log'><strong>[" + o.id + "] " + o.type + "</strong><br><small style='color:#4ade80;'>" + o.status + "</small><br>" + o.details + "<br><span style='color:#94a3b8; font-size:0.75rem;'>" + o.time + "</span></div>";
        }).join('');
    });
}

function trackParcel() {
    const id = document.getElementById('trackInput').value.toUpperCase().trim();
    const out = document.getElementById('trackOut');
    if (!id) return;
    db.ref('orders/' + id).once('value', function(snap) {
        if (snap.exists()) {
            const val = snap.val();
            out.innerText = "[" + val.id + "] " + val.status + " (" + val.type + ")";
        } else {
            out.innerText = "ID not found in live database.";
        }
    });
}

function selectVehicle(el, name, base, rate) {
    document.querySelectorAll('.veh-card').forEach(function(c) { c.classList.remove('selected'); });
    el.classList.add('selected');
    selectedVehName = name; baseFare = base; perKmRate = rate;
    calcRideFare();
}

function calcRideFare() {
    const km = parseFloat(document.getElementById('r-km').value) || 1;
    document.getElementById('r-fee').innerText = selectedVehName + " - Est. Fare: LKR " + (baseFare + (km * perKmRate));
}

function openWA(msg) { window.open("https://wa.me" + MANAGER_WHATSAPP + "?text=" + msg, '_blank'); }

function sendRideWA() {
    const from = document.getElementById('r-from').value, to = document.getElementById('r-to').value, km = document.getElementById('r-km').value;
    if (!from || !to) { alert('Enter Pickup & Drop!'); return; }
    const id = saveOrderToCloud("Ride", selectedVehName + " | " + from + " to " + to);
    alert("Ride Booked! Tracking ID: " + id);
    openWA("*SameDay Ride [" + id + "]*%0AVehicle: " + selectedVehName + "%0AFrom: " + from + "%0ATo: " + to + "%0AKm: " + km);
}

function updateCourier() { document.getElementById('c-fee').innerText = 'Delivery Charge: LKR ' + document.getElementById('c-dest').value; }

function sendCourierWA() {
    const from = document.getElementById('c-from').value, rec = document.getElementById('c-rec').value;
    const destText = document.getElementById('c-dest').options[document.getElementById('c-dest').selectedIndex].text;
    if (!rec) { alert('Enter Receiver details!'); return; }
    const id = saveOrderToCloud("Courier", from + " to " + destText + " (" + rec + ")");
    alert("Courier Booked! Your Live Tracking ID is: " + id);
    openWA("*SameDay Courier [" + id + "]*%0AFrom: " + from + "%0ATo: " + destText + "%0AReceiver: " + rec);
}

const restaurantMenus = {
    "Thavakkal Hotel": [{ name: "Chicken Dum Biriyani", price: 950 }, { name: "Mutton Biriyani", price: 1450 }, { name: "Special Chicken Kottu", price: 800 }, { name: "Parotta & Beef Curry", price: 550 }],
    "KBC Kinniya BBQ Chicken": [{ name: "Full BBQ Chicken", price: 2200 }, { name: "Half BBQ Chicken", price: 1150 }, { name: "KBC Zinger Burger", price: 750 }, { name: "Crispy French Fries", price: 450 }],
    "Restaurant Mansoorah": [{ name: "Chicken Fried Rice", price: 850 }, { name: "Seafood Mixed Rice", price: 1100 }, { name: "Chicken Noodles", price: 800 }, { name: "Devilled Chicken", price: 950 }],
    "Al Salam Hotel": [{ name: "Beef Biriyani Special", price: 1050 }, { name: "Cheese Chicken Kottu", price: 950 }, { name: "Egg Parotta (2 Pcs)", price: 400 }, { name: "Special Masala Tea", price: 180 }],
    "Al Matham BBQ": [{ name: "Al-Faham Chicken (Half)", price: 1200 }, { name: "Chicken Shawarma Roll", price: 550 }, { name: "Grilled Chicken Wings", price: 850 }, { name: "Mint Lime Juice", price: 300 }],
    "Ceylon Darbar (Restaurant & Cafe)": [{ name: "Hyderabadi Biriyani", price: 1150 }, { name: "Chicken Tikka Pizza", price: 1650 }, { name: "Darbar Club Sandwich", price: 650 }, { name: "Royal Faluda Special", price: 450 }]
};

let cart = [], total = 0;

function loadMenu() {
    const rest = document.getElementById('f-rest').value;
    const grid = document.getElementById('foodGrid');
    grid.innerHTML = "";
    restaurantMenus[rest].forEach(function(item) {
        grid.innerHTML += "<div class='food-card'><h4>" + item.name + "</h4><p>LKR " + item.price + "</p><button type='button' class='add-btn' onclick=\"addFood('" + item.name + "', " + item.price + ")\">+ Add</button></div>";
    });
}

function addFood(name, price) { cart.push(name); total += price; updateCartUI(); }
function clearCart() { cart = []; total = 0; updateCartUI(); }
function updateCartUI() {
    document.getElementById('cartSummary').innerText = (cart.length === 0) ? "Cart Empty (Total: LKR 0)" : "Items (" + cart.length + "): LKR " + total + " + LKR 100 Delivery = LKR " + (total + 100);
}

function sendFoodWA() {
    const rest = document.getElementById('f-rest').value, addr = document.getElementById('f-addr').value;
    if (cart.length === 0 || !addr) { alert('Add food & enter address!'); return; }
    const id = saveOrderToCloud("Food Order", rest + ": " + cart.join(', ') + " to " + addr);
    alert("Food Order Sent! Tracking ID: " + id);
    openWA("*SameDay Eats [" + id + "]*%0ARestaurant: " + rest + "%0AItems: " + cart.join(', ') + "%0ATotal: LKR " + (total + 100) + "%0AAddress: " + addr);
}

window.onload = loadMenu;
