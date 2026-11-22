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
const MANAGER_WA = "94770000000";

// Pure JS Element Creator (Zero HTML tags needed)
function el(tag, props, children) {
    const node = document.createElement(tag);
    if (props) {
        Object.keys(props).forEach(function(k) {
            if (k === 'className') node.className = props[k];
            else if (k === 'onclick') node.onclick = props[k];
            else if (k === 'onchange') node.onchange = props[k];
            else if (k === 'text') node.innerText = props[k];
            else node.setAttribute(k, props[k]);
        });
    }
    if (children) {
        children.forEach(function(c) {
            if (typeof c === 'string') node.appendChild(document.createTextNode(c));
            else if (c) node.appendChild(c);
        });
    }
    return node;
}

const root = document.getElementById('appRoot');

// 1. TOP NAVBAR
const nav = el('nav', { className: 'top-nav' }, [
    el('div', { className: 'nav-inner' }, [
        el('a', { href: '#', className: 'logo' }, ['SameDay', el('span', { text: '.com.lk' })]),
        el('div', { className: 'nav-links' }, [
            el('a', { href: '#servicesSec', text: 'Services' }),
            el('a', { href: '#aiSec', text: 'SameDay AI' }),
            el('a', { href: '#safetySec', text: 'Safety' }),
            el('a', { href: '#partnerSec', text: 'Partner' }),
            el('a', { href: '#faqSec', text: 'FAQ' })
        ]),
        el('div', { className: 'nav-btns' }, [
            el('button', { className: 'btn-sm', text: 'Admin', onclick: openAdminModal }),
            el('a', { href: 'tel:+94770000000', className: 'btn-sm accent', text: 'Call Hotline', style: 'text-decoration:none;' })
        ])
    ])
]);
root.appendChild(nav);
// 2. HERO & 6-SERVICE INTERACTIVE SUPER APP
const servicesList = [
    { id: 'ride', icon: '🛺', title: 'Ride', sub: 'Tuk, Bike, Car' },
    { id: 'courier', icon: '📦', title: 'Parcel', sub: 'Town & Island' },
    { id: 'truck', icon: '🚚', title: 'Truck', sub: 'Mini Lorry 1T' },
    { id: 'food', icon: '🍔', title: 'Eats', sub: 'Kinniya Shops' },
    { id: 'rental', icon: '🔑', title: 'Rental', sub: 'Self-Drive Car' },
    { id: 'ahead', icon: '✈️', title: 'Book Ahead', sub: 'Airport/Wedding' }
];

const appCard = el('div', { className: 'app-box', id: 'appCardBox' });
const tabGrid = el('div', { className: 'srv-tabs' });

servicesList.forEach(function(s, idx) {
    const btn = el('button', {
        className: 'srv-tab' + (idx === 0 ? ' active' : ''),
        id: 'tab-' + s.id,
        onclick: function() { renderServiceForm(s.id); }
    }, [
        el('span', { text: s.icon + ' ' + s.title }),
        el('div', { text: s.sub, style: 'font-size:0.68rem; opacity:0.8;' })
    ]);
    tabGrid.appendChild(btn);
});

const formContainer = el('div', { id: 'serviceFormArea' });
appCard.appendChild(tabGrid);
appCard.appendChild(formContainer);

const hero = el('div', { className: 'hero-wrap' }, [
    el('div', { className: 'hero-left' }, [
        el('div', { className: 'hero-badge', text: '● Live in Kinniya • Expanding Island-wide' }),
        el('h1', {}, ['Ride, send, move ', el('span', { text: 'or rent in one app.' })]),
        el('p', { text: 'Book a tuk, bike, car or van, send parcels across Kinniya or Sri Lanka, hire a mini lorry, order hot food from local shops, or rent a self-drive car.' }),
        el('div', { className: 'hero-features' }, [
            el('div', { text: '✅ Live GPS Tracking' }),
            el('div', { text: '✅ Checked & Verified Drivers' }),
            el('div', { text: '✅ 100% Direct Web Booking' }),
            el('div', { text: '✅ தமிழ் • English • සිංහල' })
        ]),
        el('div', { className: 'hotline-box' }, [
            el('strong', { text: '📞 No smartphone? Book by Phone: ' }),
            el('span', { text: '+94 77 000 0000 (24/7 Kinniya Hotline)', style: 'color:#ffde59;' })
        ])
    ]),
    appCard
]);
root.appendChild(hero);
// 3A. FIREBASE SAVE, MAP, RIDE & PARCEL
function saveAndSendWA(type, details, waText) {
    const trackId = "SD" + Math.floor(1000 + Math.random() * 9000);
    db.ref('orders/' + trackId).set({
        id: trackId, type: type, details: details,
        status: "Confirmed - Assigning Partner", time: new Date().toLocaleString()
    });
    alert("Booked Successfully! Tracking ID: " + trackId);
    const url = "https:" + "//wa.me/" + MANAGER_WA + "?text=*" + encodeURIComponent("SameDay [" + trackId + "] - " + type) + "*%0A" + encodeURIComponent(waText);
    window.open(url, '_blank');
}

let activeMap;
function loadKinniyaMap(mapId, inputId) {
    setTimeout(function() {
        const box = document.getElementById(mapId);
        if (!box) return;
        activeMap = L.map(mapId).setView([8.4981, 81.1818], 14);
        L.tileLayer('https://{s}://{z}/{x}/{y}{r}.png').addTo(activeMap);
        const marker = L.marker([8.4981, 81.1818]).addTo(activeMap).bindPopup('Kinniya Pickup Spot').openPopup();

        const gpsBtn = document.getElementById('gpsTriggerBtn');
        if (gpsBtn) {
            gpsBtn.onclick = function() {
                gpsBtn.innerText = "Detecting GPS...";
                navigator.geolocation.getCurrentPosition(function(pos) {
                    const lat = pos.coords.latitude, lng = pos.coords.longitude;
                    activeMap.setView([lat, lng], 16);
                    marker.setLatLng([lat, lng]).bindPopup('Your Live GPS Location').openPopup();
                    document.getElementById(inputId).value = "GPS (" + lat.toFixed(4) + ", " + lng.toFixed(4) + ")";
                    gpsBtn.innerText = "GPS Location Locked!";
                }, function() { alert("Enable GPS permission in browser!"); gpsBtn.innerText = "Detect My Current GPS"; });
            };
        }
    }, 150);
}

function renderServiceForm(id) {
    document.querySelectorAll('.srv-tab').forEach(function(t) { t.classList.remove('active'); });
    const activeTab = document.getElementById('tab-' + id);
    if (activeTab) activeTab.classList.add('active');
    formContainer.innerHTML = '';

    if (id === 'ride') {
        const vehSel = el('select', {}, [
            el('option', { value: 'Tuk-Tuk (3 Seats) - LKR 150+', text: 'Tuk-Tuk (3 Seats) - Base LKR 150' }),
            el('option', { value: 'Bike (1 Passenger) - LKR 100+', text: 'Bike (Quickest) - Base LKR 100' }),
            el('option', { value: 'Mini Car (AC) - LKR 300+', text: 'Mini Car (4 Seats, AC) - Base LKR 300' }),
            el('option', { value: 'Family Van (8 Seats) - LKR 650+', text: 'Van (8 Seats, AC) - Base LKR 650' })
        ]);
        const fromIn = el('input', { id: 'rFrom', placeholder: 'Pickup (e.g., Kinniya Bridge / Bus Stand)' });
        const toIn = el('input', { id: 'rTo', placeholder: 'Drop-off (e.g., Base Hospital / Trincomalee)' });
        formContainer.appendChild(el('div', {}, [
            el('div', { id: 'rideMapBox', className: 'map-box' }),
            el('button', { id: 'gpsTriggerBtn', className: 'gps-btn', text: 'Detect My Current GPS Location' }),
            el('div', { className: 'form-group' }, [el('label', { text: 'Choose Vehicle' }), vehSel]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Pickup Point' }), fromIn]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Drop Location' }), toIn]),
            el('button', { className: 'cta-btn', text: 'Book Instant Ride', onclick: function() {
                if (!fromIn.value || !toIn.value) return alert('Enter Pickup & Drop!');
                saveAndSendWA('Ride', vehSel.value + ' | ' + fromIn.value + ' -> ' + toIn.value, 'Vehicle: ' + vehSel.value + '\nFrom: ' + fromIn.value + '\nTo: ' + toIn.value);
            }})
        ]));
        loadKinniyaMap('rideMapBox', 'rFrom');
    }
    else if (id === 'courier') {
        const destSel = el('select', {}, [
            el('option', { value: 'Within Kinniya (LKR 250)', text: 'Within Kinniya Town & Suburbs (LKR 250)' }),
            el('option', { value: 'Trincomalee / Mutur (LKR 400)', text: 'Trincomalee / Mutur / Kantale (LKR 400)' }),
            el('option', { value: 'Island-wide COD (LKR 550)', text: 'Colombo / Island-wide COD Delivery (LKR 550)' })
        ]);
        const itemIn = el('input', { placeholder: 'What is inside? (Documents, Clothes, Electronics)' });
        const recIn = el('input', { placeholder: 'Receiver Name & Mobile (e.g., Ayesha - 0771234567)' });
        formContainer.appendChild(el('div', {}, [
            el('div', { className: 'form-group' }, [el('label', { text: 'Delivery Zone' }), destSel]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Package Details' }), itemIn]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Receiver Name & Phone' }), recIn]),
            el('button', { className: 'cta-btn', text: 'Send Parcel Now', onclick: function() {
                if (!recIn.value) return alert('Enter Receiver Name & Phone!');
                saveAndSendWA('Parcel Courier', destSel.value + ' | ' + itemIn.value + ' -> ' + recIn.value, 'Zone: ' + destSel.value + '\nItem: ' + itemIn.value + '\nReceiver: ' + recIn.value);
            }})
        ]));
    }
    else if (id === 'truck') {
        const truckSel = el('select', {}, [
            el('option', { value: 'Mini Lorry (Open Bed, up to 1 Ton)', text: 'Mini Lorry (Open Bed, up to 1 Ton)' }),
            el('option', { value: 'Covered Cargo Van', text: 'Covered Cargo Van (Weather Safe)' })
        ]);
        const loadIn = el('input', { placeholder: 'What are you moving? (Furniture, Shop Stock, House Move)' });
        const routeIn = el('input', { placeholder: 'Loading Spot -> Unloading Spot' });
        formContainer.appendChild(el('div', {}, [
            el('div', { className: 'form-group' }, [el('label', { text: 'Select Goods Vehicle' }), truckSel]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Goods Description' }), loadIn]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Pickup & Drop Address' }), routeIn]),
            el('button', { className: 'cta-btn', text: 'Book Mini Lorry / Truck', onclick: function() {
                if (!routeIn.value) return alert('Enter Pickup & Drop address!');
                saveAndSendWA('Truck / Goods', truckSel.value + ' | ' + loadIn.value + ' | ' + routeIn.value, 'Truck: ' + truckSel.value + '\nGoods: ' + loadIn.value + '\nRoute: ' + routeIn.value);
            }})
        ]));
    }
    else if (id === 'food') {
        const restSel = el('select', {}, [
            el('option', { value: 'Thavakkal Hotel', text: 'Thavakkal Hotel (Biriyani & Kottu)' }),
            el('option', { value: 'KBC Kinniya BBQ Chicken', text: 'KBC Kinniya BBQ Chicken' }),
            el('option', { value: 'Restaurant Mansoorah', text: 'Restaurant Mansoorah' }),
            el('option', { value: 'Al Salam Hotel', text: 'Al Salam Hotel' }),
            el('option', { value: 'Al Matham BBQ', text: 'Al Matham BBQ & Shawarma' }),
            el('option', { value: 'Ceylon Darbar Cafe', text: 'Ceylon Darbar (Restaurant & Cafe)' })
        ]);
        const orderIn = el('input', { placeholder: 'Type dishes (e.g., 2 Chicken Biriyani, 1 Faluda)' });
        const addrIn = el('input', { placeholder: 'Your Name & Kinniya Delivery Address' });
        formContainer.appendChild(el('div', {}, [
            el('div', { className: 'form-group' }, [el('label', { text: 'Choose Kinniya Restaurant' }), restSel]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Your Order Items' }), orderIn]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Delivery Address (Cash at Door)' }), addrIn]),
            el('button', { className: 'cta-btn', text: 'Order Hot Food Now', onclick: function() {
                if (!orderIn.value || !addrIn.value) return alert('Enter food items & address!');
                saveAndSendWA('Food Order', restSel.value + ': ' + orderIn.value + ' -> ' + addrIn.value, 'Restaurant: ' + restSel.value + '\nOrder: ' + orderIn.value + '\nAddress: ' + addrIn.value);
            }})
        ]));
    }
    else if (id === 'rental') {
        const carSel = el('select', {}, [
            el('option', { value: 'Toyota Axio / Hybrid (Auto, AC)', text: 'Toyota Axio / Hybrid (5 Seats, Auto, AC)' }),
            el('option', { value: 'Suzuki Alto / WagonR (Self-Drive)', text: 'Suzuki WagonR / Alto (Budget Self-Drive)' }),
            el('option', { value: 'Toyota KDH Van (Family / Tour)', text: 'Toyota KDH Highroof Van' }),
            el('option', { value: 'Scooter / Motorbike', text: 'Scooter / Motorbike (Daily Rental)' })
        ]);
        const daysIn = el('input', { placeholder: 'Start Date & Number of Days (e.g., Dec 10 - 3 Days)' });
        const phoneIn = el('input', { placeholder: 'Your Name & Mobile Number' });
        formContainer.appendChild(el('div', {}, [
            el('div', { className: 'form-group' }, [el('label', { text: 'Select Self-Drive Vehicle' }), carSel]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Rental Dates (Up to 30 Days)' }), daysIn]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Your Name & Contact' }), phoneIn]),
            el('button', { className: 'cta-btn', text: 'Request Self-Drive Rental', onclick: function() {
                if (!daysIn.value || !phoneIn.value) return alert('Enter dates & contact!');
                saveAndSendWA('Car Rental', carSel.value + ' | ' + daysIn.value + ' | ' + phoneIn.value, 'Vehicle: ' + carSel.value + '\nDates: ' + daysIn.value + '\nCustomer: ' + phoneIn.value);
            }})
        ]));
    }
    else if (id === 'ahead') {
        const pkgSel = el('select', {}, [
            el('option', { value: 'Airport Transfer (Katunayake BIA / China Bay)', text: 'Airport Transfer (Katunayake BIA / China Bay)' }),
            el('option', { value: 'Wedding Car Fleet Hire', text: 'Wedding Car Fleet (Decorated Cars)' }),
            el('option', { value: 'Full Day / Hourly Chauffeur Hire', text: 'Full Day / Hourly Driver Hire' })
        ]);
        const dateIn = el('input', { placeholder: 'Date, Time & Route details' });
        const custIn = el('input', { placeholder: 'Your Name & WhatsApp Number' });
        formContainer.appendChild(el('div', {}, [
            el('div', { className: 'form-group' }, [el('label', { text: 'Book Ahead Package' }), pkgSel]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Trip Date & Details' }), dateIn]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Your Contact Info' }), custIn]),
            el('button', { className: 'cta-btn', text: 'Get Instant Quote & Book', onclick: function() {
                if (!dateIn.value || !custIn.value) return alert('Enter trip date & contact!');
                saveAndSendWA('Book Ahead', pkgSel.value + ' | ' + dateIn.value + ' | ' + custIn.value, 'Package: ' + pkgSel.value + '\nDetails: ' + dateIn.value + '\nCustomer: ' + custIn.value);
            }})
        ]));
    }
}
renderServiceForm('ride');
