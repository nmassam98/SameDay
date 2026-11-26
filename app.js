window.BLOCK_OLD_HERO_LOOPS = true;
const _origCreateNS = document.createElementNS.bind(document);
document.createElementNS = function(ns, tag) { const e = _origCreateNS(ns, tag); if (!e.style) e.style = {}; return e; };
const firebaseConfig = {
  apiKey: "AIzaSyArf0Ey5oLfiI7oD3Y8LZtpxRpS9ZZXSTc",
  authDomain: "://firebaseapp.com",
  databaseURL: "https://firebaseio.com",
  projectId: "sameday-lk",
  storageBucket: "sameday-lk.firebasestorage.app",
  messagingSenderId: "335191639721",
  appId: "1:335191639721:web:2b81d63e4378b7b923cbb8"
};
let db = null;
if (typeof firebase !== 'undefined') { firebase.initializeApp(firebaseConfig); db = firebase.database(); }
const MANAGER_WA = "+40731929769";

const SVG_PATHS = {
    home: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    shop: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18',
    ai: 'M12 2a4 4 0 0 1 4 4v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2V6a4 4 0 0 1 4-4z',
    users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    ride: 'M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1',
    pkg: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
    truck: 'M1 3h15v13H1z M16 8h4l3 3v5h-7V8z',
    food: 'M18 8h1a4 4 0 0 1 0 8h-1 M2 8h16v9a2 2 0 0 1-4 4H6a2 2 0 0 1-4-4V8z',
    key: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5',
    cal: 'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18'
};

function hdIcon(name) {
    const s = document.createElementNS('http://w3.org', 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('width', '16');
    s.setAttribute('height', '16');
    s.style.marginRight = '6px';
    s.style.verticalAlign = '-3px';
    s.style.stroke = 'currentColor';
    s.style.strokeWidth = '2.3';
    s.style.fill = 'none';
    const p = document.createElementNS('http://w3.org', 'path');
    p.setAttribute('d', SVG_PATHS[name] || SVG_PATHS.zap);
    s.appendChild(p);
    return s;
}

function el(tag, props, children) {
    const node = document.createElement(tag);
    if (props) {
        Object.keys(props).forEach(function(k) {
            if (k === 'className') node.className = props[k];
            else if (k === 'onclick') node.onclick = props[k];
            else if (k === 'text') node.textContent = props[k];
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

function saveAndSendWA(type, details, waText) {
    const trackId = "SD" + Math.floor(1000 + Math.random() * 9000);
    if (db) { db.ref('orders/' + trackId).set({ id: trackId, type: type, details: details, status: "Confirmed", time: new Date().toLocaleString() }); }
    alert("Booked! Tracking ID: " + trackId);
    window.open("https:" + "//wa.me/" + MANAGER_WA + "?text=" + encodeURIComponent("SameDay [" + trackId + "] " + type + "\n" + waText), '_blank');
}

const root = document.getElementById('appRoot');
const mainContainer = el('div', { id: 'pageContainer', className: 'page-view' });
const pages = [
    { id: 'home', label: 'Home', ico: 'home' },
    { id: 'services', label: 'All Services', ico: 'zap' },
    { id: 'shop', label: 'SameDay Shop', ico: 'shop' },
    { id: 'ai', label: 'SameDay AI', ico: 'ai' },
    { id: 'partner', label: 'Partner / Drive', ico: 'users' },
    { id: 'faq', label: 'Safety & FAQ', ico: 'shield' }
];
const navLinksBox = el('div', { className: 'nav-links' });
pages.forEach(function(p) {
    navLinksBox.appendChild(el('button', {
        className: 'nav-item', id: 'nav-' + p.id,
        onclick: function() { navigateTo(p.id); }
    }, [hdIcon(p.ico), p.label]));
});

root.appendChild(el('nav', { className: 'top-nav' }, [
    el('div', { className: 'nav-inner' }, [
        el('div', { className: 'logo', onclick: function() { navigateTo('home'); } }, ['SameDay', el('span', { text: '.com.lk' })]),
        navLinksBox,
        el('div', { className: 'nav-btns' }, [
            el('button', { className: 'btn-sm', text: 'Admin', onclick: function() { navigateTo('admin'); } }),
            el('a', { href: 'tel:+40731929769', className: 'btn-sm accent', text: '24/7 Hotline' })
        ])
    ])
]));
root.appendChild(mainContainer);
root.appendChild(el('footer', {}, [el('p', { text: '© 2026 SameDay.com.lk • Kinniya • Trincomalee • Island-wide Sri Lanka | தமிழ் • English • සිංහල' })]));
function attachLiveMap(mapBoxId, gpsBtn, targetInput) {
    setTimeout(function() {
        const box = document.getElementById(mapBoxId);
        if (!box) return;
        if (typeof L === 'undefined') {
            box.innerHTML = '<div style="padding:70px 15px;text-align:center;color:#94a3b8;font-size:0.85rem;">Live Satellite Map loads automatically on GitHub / sameday.com.lk</div>';
            return;
        }
        const m = L.map(mapBoxId).setView([8.4981, 81.1818], 14);
        L.tileLayer('https://{s}://{z}/{x}/{y}{r}.png').addTo(m);
        const mk = L.marker([8.4981, 81.1818]).addTo(m).bindPopup('Kinniya Town Center').openPopup();

        gpsBtn.onclick = function() {
            gpsBtn.textContent = 'Detecting Exact GPS Satellite Location...';
            if (!navigator.geolocation) { alert('GPS not supported'); return; }
            navigator.geolocation.getCurrentPosition(async function(p) {
                const lat = p.coords.latitude, lng = p.coords.longitude;
                let addr = 'Live GPS (' + lat.toFixed(5) + ', ' + lng.toFixed(5) + ')';
                try {
                    const url = 'https:' + '//nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng;
                    const res = await fetch(url);
                    const data = await res.json();
                    if (data && data.display_name) addr = data.display_name.split(',').slice(0, 3).join(',');
                } catch (e) {}
                m.invalidateSize();
                m.setView([lat, lng], 16);
                mk.setLatLng([lat, lng]).bindPopup('You are here: ' + addr).openPopup();
                targetInput.value = addr;
                gpsBtn.textContent = 'Live GPS Location Locked!';
            }, function() {
                alert('Please allow Location access in your browser settings!');
                gpsBtn.textContent = 'Detect My Live GPS Location';
            }, { enableHighAccuracy: true, timeout: 10000 });
        };
    }, 150);
}

function renderHomePage() {
    const servicesList = [
        { id: 'ride', label: 'Ride', ico: 'ride' },
        { id: 'courier', label: 'Parcel', ico: 'pkg' },
        { id: 'truck', label: 'Truck', ico: 'truck' },
        { id: 'food', label: 'Eats', ico: 'food' },
        { id: 'rental', label: 'Rental', ico: 'key' },
        { id: 'ahead', label: 'Book Ahead', ico: 'cal' }
    ];

    const tabGrid = el('div', { className: 'srv-tabs' });
    const formBox = el('div', { id: 'homeFormArea' });

    servicesList.forEach(function(s, idx) {
        tabGrid.appendChild(el('button', {
            className: 'srv-tab' + (idx === 0 ? ' active' : ''), id: 'htab-' + s.id,
            onclick: function() { renderHomeForm(s.id, formBox); }
        }, [hdIcon(s.ico), s.label]));
    });

    const trackIn = el('input', { placeholder: 'Enter Tracking ID (e.g., SD1234) to track live...' });
    const trackOut = el('div', { style: 'font-size:0.82rem; color:#4ade80; margin-top:6px;' });
    const trackBox = el('div', { style: 'margin-bottom:16px; padding-bottom:14px; border-bottom:1px solid rgba(255,255,255,0.08);' }, [
        el('div', { style: 'display:flex; gap:8px;' }, [
            trackIn,
            el('button', { className: 'btn-sm accent', text: 'Track', onclick: function() {
                const id = trackIn.value.toUpperCase().trim();
                if (!id || !db) { trackOut.textContent = 'Enter valid Tracking ID (Live on GitHub/Domain).'; return; }
                db.ref('orders/' + id).once('value', function(snap) {
                    trackOut.textContent = snap.exists() ? ('[' + id + '] ' + snap.val().status + ' (' + snap.val().type + ')') : 'Tracking ID not found.';
                });
            }})
        ]),
        trackOut
    ]);

    const appCard = el('div', { className: 'app-box' }, [trackBox, tabGrid, formBox]);

    mainContainer.appendChild(el('div', { className: 'hero-wrap' }, [
        el('div', { className: 'hero-left' }, [
            el('div', { className: 'hero-badge', text: '● Live in Kinniya • Expanding Island-wide' }),
            el('h1', {}, ['Sri Lanka’s ', el('span', { text: 'All-in-One Super App.' })]),
            el('p', { text: 'Better than PickMe, Vaanga & Daraz combined. Book rides with live GPS, send island-wide COD parcels, hire mini lorries, order hot food, rent cars, or shop online.' }),
            el('div', { className: 'stat-row' }, [
                el('div', { className: 'stat-box' }, [el('strong', { text: '6-in-1' }), el('span', { text: 'Everyday Services' })]),
                el('div', { className: 'stat-box' }, [el('strong', { text: '0%' }), el('span', { text: 'Driver Commission' })]),
                el('div', { className: 'stat-box' }, [el('strong', { text: 'Same-Day' }), el('span', { text: 'COD Settlement' })])
            ]),
            el('button', { className: 'cta-btn', onclick: function() { navigateTo('shop'); } }, [hdIcon('shop'), 'Explore SameDay Online Mall (Daraz Deals)'])
        ]),
        appCard
    ]));

    renderHomeForm('ride', formBox);
}
function renderHomeForm(id, area) {
    document.querySelectorAll('.srv-tab').forEach(function(t) { t.classList.remove('active'); });
    const active = document.getElementById('htab-' + id);
    if (active) active.classList.add('active');
    area.innerHTML = '';

    if (id === 'ride') {
        const veh = el('select', {}, [
            el('option', { value: 'Tuk-Tuk (LKR 150+)', text: 'Tuk-Tuk (3 Seats) - Base LKR 150' }),
            el('option', { value: 'Bike (LKR 100+)', text: 'Bike (Quickest) - Base LKR 100' }),
            el('option', { value: 'Mini Car AC (LKR 300+)', text: 'Mini Car (4 Seats, AC) - Base LKR 300' }),
            el('option', { value: 'Family Van AC (LKR 650+)', text: 'Van (8 Seats, AC) - Base LKR 650' })
        ]);
        const from = el('input', { placeholder: 'Pickup (e.g., Kinniya Bridge / Bus Stand)' });
        const to = el('input', { placeholder: 'Drop-off (e.g., Base Hospital / Trincomalee)' });
        const gpsBtn = el('button', { className: 'gps-btn', text: 'Detect My Live GPS Location' });
        area.appendChild(el('div', {}, [
            el('div', { id: 'rideMapBox', className: 'map-box' }), gpsBtn,
            el('div', { className: 'form-group' }, [el('label', { text: 'Vehicle Type' }), veh]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Pickup Location' }), from]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Drop Location' }), to]),
            el('button', { className: 'cta-btn', text: 'Confirm Instant Ride', onclick: function() {
                if (!from.value || !to.value) return alert('Enter Pickup & Drop!');
                saveAndSendWA('Ride', veh.value + ' | ' + from.value + ' to ' + to.value, 'Vehicle: ' + veh.value + '\nFrom: ' + from.value + '\nTo: ' + to.value);
            }})
        ]));
        attachLiveMap('rideMapBox', gpsBtn, from);
    }
    else if (id === 'courier') {
        const zone = el('select', {}, [
            el('option', { value: 'Kinniya Local (LKR 250)', text: 'Within Kinniya Town & Suburbs (LKR 250)' }),
            el('option', { value: 'Trincomalee / Mutur (LKR 400)', text: 'Trincomalee / Mutur / Kantale (LKR 400)' }),
            el('option', { value: 'Island-wide COD (LKR 550)', text: 'Colombo / Island-wide COD Delivery (LKR 550)' })
        ]);
        const item = el('input', { placeholder: 'Package Contents (Documents, Clothes, Electronics)' });
        const rec = el('input', { placeholder: 'Receiver Name & Mobile Number' });
        area.appendChild(el('div', {}, [
            el('div', { className: 'form-group' }, [el('label', { text: 'Delivery Zone' }), zone]),
            el('div', { className: 'form-group' }, [el('label', { text: 'What is inside?' }), item]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Receiver Details' }), rec]),
            el('button', { className: 'cta-btn', text: 'Book Parcel Courier', onclick: function() {
                if (!rec.value) return alert('Enter Receiver Details!');
                saveAndSendWA('Parcel Courier', zone.value + ' | ' + item.value + ' to ' + rec.value, 'Zone: ' + zone.value + '\nItem: ' + item.value + '\nReceiver: ' + rec.value);
            }})
        ]));
    }
    else if (id === 'truck') {
        const trk = el('select', {}, [
            el('option', { value: 'Mini Lorry (Open Bed, 1 Ton)', text: 'Mini Lorry (Open Bed, up to 1 Ton)' }),
            el('option', { value: 'Covered Cargo Van', text: 'Covered Cargo Van (Weather Safe)' })
        ]);
        const goods = el('input', { placeholder: 'Goods (Furniture, Shop Stock, House Move)' });
        const route = el('input', { placeholder: 'Loading Point to Unloading Point' });
        area.appendChild(el('div', {}, [
            el('div', { className: 'form-group' }, [el('label', { text: 'Goods Vehicle' }), trk]),
            el('div', { className: 'form-group' }, [el('label', { text: 'What are you moving?' }), goods]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Pickup & Drop Address' }), route]),
            el('button', { className: 'cta-btn', text: 'Book Truck / Lorry', onclick: function() {
                if (!route.value) return alert('Enter Route!');
                saveAndSendWA('Truck Hire', trk.value + ' | ' + goods.value + ' | ' + route.value, 'Truck: ' + trk.value + '\nGoods: ' + goods.value + '\nRoute: ' + route.value);
            }})
        ]));
    }
    else if (id === 'food') {
        const rest = el('select', {}, [
            el('option', { value: 'Thavakkal Hotel', text: 'Thavakkal Hotel (Biriyani & Kottu)' }),
            el('option', { value: 'KBC Kinniya BBQ Chicken', text: 'KBC Kinniya BBQ Chicken' }),
            el('option', { value: 'Restaurant Mansoorah', text: 'Restaurant Mansoorah' }),
            el('option', { value: 'Al Salam Hotel', text: 'Al Salam Hotel' }),
            el('option', { value: 'Al Matham BBQ', text: 'Al Matham BBQ & Shawarma' }),
            el('option', { value: 'Ceylon Darbar Cafe', text: 'Ceylon Darbar (Restaurant & Cafe)' })
        ]);
        const items = el('input', { placeholder: 'Dishes (e.g., 2 Chicken Biriyani, 1 Faluda)' });
        const addr = el('input', { placeholder: 'Your Name & Kinniya Delivery Address' });
        const foodGpsBtn = el('button', { className: 'gps-btn', text: 'Detect My Delivery Location (GPS)' });
        area.appendChild(el('div', {}, [
            el('div', { className: 'form-group' }, [el('label', { text: 'Choose Restaurant' }), rest]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Order Items' }), items]),
            el('div', { id: 'foodMapBox', className: 'map-box' }), foodGpsBtn,
            el('div', { className: 'form-group' }, [el('label', { text: 'Delivery Address (Cash at Door)' }), addr]),
            el('button', { className: 'cta-btn', text: 'Order Hot Food Now', onclick: function() {
                if (!items.value || !addr.value) return alert('Enter items & address!');
                saveAndSendWA('Food Delivery', rest.value + ': ' + items.value + ' to ' + addr.value, 'Shop: ' + rest.value + '\nItems: ' + items.value + '\nAddress: ' + addr.value);
            }})
        ]));
        attachLiveMap('foodMapBox', foodGpsBtn, addr);
    }
    else if (id === 'rental') {
        const car = el('select', {}, [
            el('option', { value: 'Toyota Axio / Hybrid (Auto, AC)', text: 'Toyota Axio / Hybrid (5 Seats, Auto)' }),
            el('option', { value: 'Suzuki WagonR / Alto', text: 'Suzuki WagonR / Alto (Self-Drive)' }),
            el('option', { value: 'Toyota KDH Van', text: 'Toyota KDH Family Van' })
        ]);
        const dates = el('input', { placeholder: 'Start Date & Days (e.g., Dec 15 - 3 Days)' });
        const ph = el('input', { placeholder: 'Your Name & Contact Number' });
        area.appendChild(el('div', {}, [
            el('div', { className: 'form-group' }, [el('label', { text: 'Self-Drive Vehicle' }), car]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Rental Dates' }), dates]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Contact Info' }), ph]),
            el('button', { className: 'cta-btn', text: 'Request Car Rental', onclick: function() {
                if (!dates.value || !ph.value) return alert('Enter dates & phone!');
                saveAndSendWA('Self-Drive Rental', car.value + ' | ' + dates.value + ' | ' + ph.value, 'Car: ' + car.value + '\nDates: ' + dates.value + '\nCustomer: ' + ph.value);
            }})
        ]));
    }
    else if (id === 'ahead') {
        const pkg = el('select', {}, [
            el('option', { value: 'Airport Transfer (BIA / China Bay)', text: 'Airport Transfer (Katunayake BIA / China Bay)' }),
            el('option', { value: 'Wedding Car Fleet Hire', text: 'Wedding Car Fleet' }),
            el('option', { value: 'Full Day Chauffeur Hire', text: 'Full Day / Hourly Driver Hire' })
        ]);
        const dt = el('input', { placeholder: 'Trip Date, Time & Destination' });
        const ph = el('input', { placeholder: 'Your Name & WhatsApp Number' });
        area.appendChild(el('div', {}, [
            el('div', { className: 'form-group' }, [el('label', { text: 'Advance Package' }), pkg]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Date & Route' }), dt]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Contact Info' }), ph]),
            el('button', { className: 'cta-btn', text: 'Book Ahead Now', onclick: function() {
                if (!dt.value || !ph.value) return alert('Enter trip date & contact!');
                saveAndSendWA('Book Ahead', pkg.value + ' | ' + dt.value + ' | ' + ph.value, 'Package: ' + pkg.value + '\nDetails: ' + dt.value + '\nCustomer: ' + ph.value);
            }})
        ]));
    }
}
function renderServicesPage() {
    mainContainer.appendChild(el('div', {}, [
        el('div', { className: 'sec-tag', text: 'ALL SERVICES' }),
        el('h2', { className: 'sec-title', text: 'Six everyday services, one super app.' }),
        el('div', { className: 'cards-grid' }, [
            el('div', { className: 'info-card' }, [el('h3', { text: '1. Instant Ride (PickMe Level)' }), el('p', { text: 'Bike, Tuk-Tuk, Mini Car AC, or 8-Seat Van across Kinniya & Trincomalee with live GPS tracking.' })]),
            el('div', { className: 'info-card' }, [el('h3', { text: '2. Island-wide Parcel & COD' }), el('p', { text: 'Same-day local delivery in Kinniya & fast Cash-on-Delivery courier to Colombo, Kandy & island-wide.' })]),
            el('div', { className: 'info-card' }, [el('h3', { text: '3. Mini Lorry & Cargo Truck' }), el('p', { text: 'Move furniture, shop stock, or building materials up to 1 ton with open-bed lorries or covered vans.' })]),
            el('div', { className: 'info-card' }, [el('h3', { text: '4. SameDay Eats (Hot Food)' }), el('p', { text: 'Order from Thavakkal, KBC, Mansoorah, Al Salam, Al Matham & Ceylon Darbar. Pay cash at your door.' })]),
            el('div', { className: 'info-card' }, [el('h3', { text: '5. Self-Drive Car Rental' }), el('p', { text: 'Rent cars, vans, or scooters by the day (up to 30 days) from verified local rental shops.' })]),
            el('div', { className: 'info-card' }, [el('h3', { text: '6. Book Ahead (Airport & Wedding)' }), el('p', { text: 'Pre-book Katunayake (BIA) airport transfers, wedding car fleets, or full-day drivers.' })])
        ]),
        el('button', { className: 'cta-btn', text: 'Book Any Service Now', style: 'margin-top:24px; max-width:300px;', onclick: function() { navigateTo('home'); } })
    ]));
}

function renderShopPage() {
    const products = [
        { ico: 'ai', name: 'Smart Watch Ultra Series 9', price: 'LKR 4,500', old: 'LKR 7,800', disc: '-42%' },
        { ico: 'zap', name: 'Wireless Noise-Cancel Earbuds', price: 'LKR 2,950', old: 'LKR 5,200', disc: '-43%' },
        { ico: 'shop', name: 'Eid & Party Designer Abaya / Saree', price: 'LKR 5,800', old: 'LKR 8,500', disc: '-32%' },
        { ico: 'ride', name: 'Men Sports Running Sneakers', price: 'LKR 4,200', old: 'LKR 6,900', disc: '-39%' },
        { ico: 'zap', name: 'Mini UPS Power Backup for Wi-Fi', price: 'LKR 3,900', old: 'LKR 5,500', disc: '-29%' },
        { ico: 'pkg', name: 'Family Gift & Grocery Pack (Kinniya)', price: 'LKR 6,500', old: 'LKR 8,000', disc: 'FREE DELIVERY' }
    ];
    const grid = el('div', { className: 'shop-grid' });
    products.forEach(function(p) {
        grid.appendChild(el('div', { className: 'prod-card' }, [
            el('span', { className: 'disc-badge', text: p.disc }),
            el('div', { style: 'margin:10px 0; color:#ff914d;' }, [hdIcon(p.ico)]),
            el('div', { className: 'prod-title', text: p.name }),
            el('div', { style: 'margin-bottom:12px;' }, [el('span', { className: 'prod-price', text: p.price }), el('span', { className: 'prod-old', text: p.old })]),
            el('button', { className: 'cta-btn', text: 'Buy Now (Same-Day COD)', onclick: function() {
                const addr = prompt('Enter your Name, Phone & Delivery Address in Kinniya / Sri Lanka:');
                if (addr) saveAndSendWA('SameDay Shop Order', p.name + ' (' + p.price + ') to ' + addr, 'Product: ' + p.name + '\nPrice: ' + p.price + '\nCustomer: ' + addr);
            }})
        ]));
    });
    mainContainer.appendChild(el('div', {}, [
        el('div', { className: 'sec-tag', text: 'SAMEDAY ONLINE MALL (DARAZ ALTERNATIVE)' }),
        el('h2', { className: 'sec-title', text: 'Flash Deals & Same-Day Delivery in Sri Lanka.' }),
        grid
    ]));
}

function renderAIPage() {
    const aiIn = el('input', { placeholder: 'Type in Tamil, English or Sinhala (e.g., 2 Chicken Biriyani from Thavakkal OR Tuk to Kinniya Bridge)' });
    mainContainer.appendChild(el('div', {}, [
        el('div', { className: 'sec-tag', text: 'SAMEDAY AI ASSISTANT' }),
        el('h2', { className: 'sec-title', text: 'Just say or type what you need.' }),
        el('div', { className: 'app-box' }, [
            el('div', { className: 'form-group' }, [el('label', { text: 'Your Request (Tamil / English / Sinhala)' }), aiIn]),
            el('button', { className: 'cta-btn', text: 'Send to SameDay AI & Book', onclick: function() {
                if (!aiIn.value) return alert('Type your request first!');
                saveAndSendWA('SameDay AI Request', aiIn.value, 'AI Request: ' + aiIn.value);
            }})
        ])
    ]));
}

function renderPartnerPage() {
    const pName = el('input', { placeholder: 'Your Name / Restaurant / Shop Name' });
    const pPhone = el('input', { placeholder: 'Mobile / WhatsApp Number (077XXXXXXX)' });
    const pType = el('select', {}, [
        el('option', { value: 'Driver (0% Commission)', text: 'Driver (Keep 100% of every fare - 0% Commission)' }),
        el('option', { value: 'Restaurant / Food Shop', text: 'Restaurant / Bakery / Juice Bar Partner' }),
        el('option', { value: 'E-Commerce Seller', text: 'Online Seller / Shop Partner (Sell on SameDay Mall)' }),
        el('option', { value: 'Car Rental Shop Owner', text: 'Self-Drive Car Rental Shop Owner' })
    ]);
    mainContainer.appendChild(el('div', {}, [
        el('div', { className: 'sec-tag', text: 'PARTNER & EARN' }),
        el('h2', { className: 'sec-title', text: 'Keep 100% of every fare. Grow with SameDay.' }),
        el('div', { className: 'app-box' }, [
            el('div', { className: 'form-group' }, [el('label', { text: 'Partner Category' }), pType]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Name / Business Name' }), pName]),
            el('div', { className: 'form-group' }, [el('label', { text: 'Contact Number' }), pPhone]),
            el('button', { className: 'cta-btn', text: 'Join SameDay Partner Network', onclick: function() {
                if (!pName.value || !pPhone.value) return alert('Enter Name and Phone!');
                saveAndSendWA('New Partner Join', pType.value + ' | ' + pName.value + ' - ' + pPhone.value, 'Type: ' + pType.value + '\nName: ' + pName.value + '\nPhone: ' + pPhone.value);
            }})
        ])
    ]));
}

function renderFaqPage() {
    const faqList = el('div', { style: 'margin-top:20px;' });
    [
        { q: 'How is SameDay.com.lk better than PickMe, Vaanga & Daraz?', a: 'We combine PickMe rides & trucks, Vaanga local Kinniya food & rentals, and Daraz-style online shopping with Same-Day COD into one platform.' },
        { q: 'How do you ensure passenger and parcel safety?', a: 'Every driver NIC, driving licence, revenue licence and insurance certificate is verified before approval.' },
        { q: 'How do online sellers get paid for COD orders?', a: 'SameDay settles Cash-on-Delivery payments to local merchants on the very same day.' }
    ].forEach(function(f) {
        faqList.appendChild(el('details', {}, [el('summary', { text: f.q }), el('p', { text: f.a })]));
    });
    mainContainer.appendChild(el('div', {}, [
        el('div', { className: 'sec-tag', text: 'SAFETY & FAQ' }),
        el('h2', { className: 'sec-title', text: 'Checked drivers. Questions answered.' }),
        faqList
    ]));
}

function renderAdminPage() {
    const listBox = el('div', { text: 'Loading live orders from Firebase Cloud...' });
    mainContainer.appendChild(el('div', {}, [
        el('div', { className: 'sec-tag', text: 'ADMIN CONTROL CENTER' }),
        el('h2', { className: 'sec-title', text: 'Live Cloud Orders (Kinniya & Sri Lanka)' }),
        listBox
    ]));
    if (!db) { listBox.textContent = 'Firebase offline (Upload to GitHub to test live cloud).'; return; }
    db.ref('orders').on('value', function(snap) {
        const data = snap.val();
        if (!data) { listBox.textContent = 'No orders in cloud yet.'; return; }
        listBox.innerHTML = '';
        Object.values(data).reverse().forEach(function(o) {
            listBox.appendChild(el('div', { className: 'order-log' }, [
                el('strong', { text: '[' + o.id + '] ' + o.type + ' • ' + o.time }),
                el('div', { text: o.details, style: 'color:#cbd5e1; margin-top:4px;' })
            ]));
        });
    });
}

function navigateTo(pageId) {
    document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
    const activeNav = document.getElementById('nav-' + pageId);
    if (activeNav) activeNav.classList.add('active');
    mainContainer.innerHTML = '';
    window.scrollTo(0, 0);
    if (pageId === 'home') renderHomePage();
    else if (pageId === 'services') renderServicesPage();
    else if (pageId === 'shop') renderShopPage();
    else if (pageId === 'ai') renderAIPage();
    else if (pageId === 'partner') renderPartnerPage();
    else if (pageId === 'faq') renderFaqPage();
    else if (pageId === 'admin') renderAdminPage();
}
navigateTo('home');
(function cleanMaster3D() {
    const cdn = 'https:' + '//cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/';
    const exactById = {
        'nav-home': { img: cdn + 'House/3D/house_3d.png', text: 'Home', size: 20 },
        'nav-services': { img: cdn + 'High%20voltage/3D/high_voltage_3d.png', text: 'All Services', size: 20 },
        'nav-shop': { img: cdn + 'Shopping%20bags/3D/shopping_bags_3d.png', text: 'SameDay Shop', size: 20 },
        'nav-ai': { img: cdn + 'Robot/3D/robot_3d.png', text: 'SameDay AI', size: 20 },
        'nav-partner': { img: cdn + 'Handshake/3D/handshake_3d.png', text: 'Partner / Drive', size: 20 },
        'nav-faq': { img: cdn + 'Shield/3D/shield_3d.png', text: 'Safety & FAQ', size: 20 },
        'htab-ride': { img: cdn + 'Auto%20rickshaw/3D/auto_rickshaw_3d.png', text: 'Ride', size: 28, block: true },
        'htab-courier': { img: cdn + 'Package/3D/package_3d.png', text: 'Parcel', size: 28, block: true },
        'htab-truck': { img: cdn + 'Delivery%20truck/3D/delivery_truck_3d.png', text: 'Truck', size: 28, block: true },
        'htab-food': { img: cdn + 'Hamburger/3D/hamburger_3d.png', text: 'Eats', size: 28, block: true },
        'htab-rental': { img: cdn + 'Key/3D/key_3d.png', text: 'Rental', size: 28, block: true },
        'htab-ahead': { img: cdn + 'Airplane/3D/airplane_3d.png', text: 'Book Ahead', size: 28, block: true }
    };

    const card3D = {
        '1. Instant Ride': cdn + 'Auto%20rickshaw/3D/auto_rickshaw_3d.png',
        '2. Island-wide': cdn + 'Package/3D/package_3d.png',
        '3. Mini Lorry': cdn + 'Delivery%20truck/3D/delivery_truck_3d.png',
        '4. SameDay Eats': cdn + 'Hamburger/3D/hamburger_3d.png',
        '5. Self-Drive': cdn + 'Automobile/3D/automobile_3d.png',
        '6. Book Ahead': cdn + 'Airplane/3D/airplane_3d.png',
        'Smart Watch': cdn + 'Watch/3D/watch_3d.png',
        'Wireless Noise': cdn + 'Headphone/3D/headphone_3d.png',
        'Eid & Party': cdn + 'Dress/3D/dress_3d.png',
        'Men Sports': cdn + 'Running%20shoe/3D/running_shoe_3d.png',
        'Mini UPS': cdn + 'Battery/3D/battery_3d.png',
        'Family Gift': cdn + 'Wrapped%20gift/3D/wrapped_gift_3d.png'
    };

    const cardToTab = {
        '1. Instant Ride': 'ride', '2. Island-wide': 'courier', '3. Mini Lorry': 'truck',
        '4. SameDay Eats': 'food', '5. Self-Drive': 'rental', '6. Book Ahead': 'ahead'
    };

    setInterval(function() {
        Object.keys(exactById).forEach(function(id) {
            const el = document.getElementById(id);
            if (!el || el.dataset.c3d) return;
            el.dataset.c3d = '1';
            const cfg = exactById[id];
            const st = cfg.block ? 'width:28px;height:28px;display:block;margin:0 auto 5px;' : 'width:20px;height:20px;vertical-align:-5px;margin-right:7px;';
            el.innerHTML = '<img src="' + cfg.img + '" style="' + st + '">' + cfg.text;
        });

        document.querySelectorAll('.info-card, .prod-card').forEach(function(card) {
            if (card.dataset.c3d) return;
            const title = card.querySelector('h3, .prod-title');
            if (!title) return;
            const txt = title.textContent.trim();
            Object.keys(card3D).forEach(function(k) {
                if (txt.indexOf(k) !== -1) {
                    card.dataset.c3d = '1';
                    const box = document.createElement('div');
                    box.setAttribute('style', 'width:76px;height:76px;border-radius:18px;background:rgba(255,145,77,0.15);border:1px solid rgba(255,222,89,0.35);display:flex;align-items:center;justify-content:center;margin-bottom:14px;');
                    box.innerHTML = '<img src="' + card3D[k] + '" style="width:56px;height:56px;object-fit:contain;">';
                    card.insertBefore(box, card.firstChild);
                }
            });
            Object.keys(cardToTab).forEach(function(k) {
                if (txt.indexOf(k) !== -1) {
                    card.style.cursor = 'pointer';
                    card.onclick = function() {
                        navigateTo('home');
                        setTimeout(function() { const t = document.getElementById('htab-' + cardToTab[k]); if (t) t.click(); }, 100);
                    };
                }
            });
        });
    }, 250);
})();
(function restoreDarkUI() {
    const css = `
        @import url('https://googleapis.com');
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body { background: #060911; color: #f8fafc; line-height: 1.6; overflow-x: hidden; }
        .top-nav { position: sticky; top: 0; z-index: 1000; background: rgba(6, 9, 17, 0.95); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 12px 20px; }
        .nav-inner { max-width: 1120px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
        .logo { font-size: 1.65rem; font-weight: 800; color: white; cursor: pointer; }
        .logo span { color: #ff914d; }
        .nav-links { display: flex; gap: 8px; flex-wrap: wrap; }
        .nav-item { background: transparent; border: none; color: #cbd5e1; padding: 7px 13px; border-radius: 20px; font-size: 0.84rem; font-weight: 600; cursor: pointer; transition: 0.2s; }
        .nav-item:hover, .nav-item.active { background: rgba(255, 145, 77, 0.2); color: #ff914d; }
        .nav-btns { display: flex; gap: 8px; align-items: center; }
        .btn-sm { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: white; padding: 6px 13px; border-radius: 20px; font-size: 0.78rem; cursor: pointer; font-weight: 600; }
        .btn-sm.accent { background: linear-gradient(135deg, #ff914d, #ff5e62); border: none; text-decoration: none; }
        .page-view { max-width: 1120px; margin: 0 auto; padding: 30px 20px 60px; }
        .hero-wrap { display: grid; grid-template-columns: 1fr 1.15fr; gap: 30px; align-items: start; }
        @media (max-width: 850px) { .hero-wrap { grid-template-columns: 1fr; } }
        .hero-badge { display: inline-block; background: rgba(37, 211, 102, 0.12); color: #4ade80; border: 1px solid rgba(74, 222, 128, 0.3); padding: 5px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 600; margin-bottom: 12px; }
        .hero-left h1 { font-size: 2.4rem; font-weight: 800; line-height: 1.15; margin-bottom: 14px; }
        .hero-left h1 span { background: linear-gradient(90deg, #ff914d, #ffde59); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-left p { color: #94a3b8; font-size: 0.95rem; margin-bottom: 18px; }
        .stat-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 18px; }
        .stat-box { background: rgba(20, 29, 46, 0.8); border: 1px solid rgba(255,255,255,0.08); padding: 12px; border-radius: 14px; text-align: center; }
        .stat-box strong { display: block; font-size: 1.2rem; color: #ffde59; }
        .stat-box span { font-size: 0.72rem; color: #94a3b8; }
        .app-box { background: rgba(18, 26, 43, 0.94); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 22px; box-shadow: 0 25px 50px rgba(0,0,0,0.6); }
        .srv-tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px; }
        .srv-tab { background: #090d16; border: 1px solid rgba(255,255,255,0.08); color: #cbd5e1; padding: 10px 6px; border-radius: 12px; cursor: pointer; text-align: center; font-size: 0.8rem; font-weight: 600; }
        .srv-tab.active { background: linear-gradient(135deg, #ff914d, #ff5e62); color: white; border: none; }
        .form-group { margin-bottom: 12px; }
        label { display: block; font-size: 0.78rem; color: #94a3b8; margin-bottom: 4px; }
        input, select { width: 100%; padding: 10px 12px; background: #090d16; border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; color: white; font-size: 0.88rem; }
        .map-box { height: 190px; width: 100%; border-radius: 12px; margin-bottom: 10px; border: 1px solid rgba(255,145,77,0.4); z-index: 1; }
        .gps-btn { width: 100%; background: rgba(37, 99, 235, 0.2); color: #60a5fa; border: 1px solid #3b82f6; padding: 8px; border-radius: 8px; font-size: 0.78rem; font-weight: 600; cursor: pointer; margin-bottom: 12px; }
        .cta-btn { width: 100%; padding: 13px; background: linear-gradient(135deg, #25D366, #128C7E); color: white; border: none; border-radius: 12px; font-size: 0.95rem; font-weight: 700; cursor: pointer; }
        .shop-grid, .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 20px; }
        .prod-card, .info-card { background: rgba(18, 26, 43, 0.85); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 20px; position: relative; }
        .disc-badge { position: absolute; top: 12px; right: 12px; background: #ef4444; color: white; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 10px; }
        .prod-title, .info-card h3 { font-size: 1rem; font-weight: 700; color: #ffde59; margin-bottom: 6px; }
        .prod-price { color: #4ade80; font-size: 1.05rem; font-weight: 700; }
        .prod-old { color: #64748b; text-decoration: line-through; font-size: 0.78rem; margin-left: 6px; }
        .sec-tag { color: #ff914d; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
        .sec-title { font-size: 2rem; font-weight: 800; margin: 6px 0 12px; }
        details { background: rgba(18, 26, 43, 0.85); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 15px 18px; margin-bottom: 10px; cursor: pointer; }
        summary { font-weight: 600; font-size: 0.95rem; }
        details p { margin-top: 10px; font-size: 0.86rem; color: #94a3b8; }
        .order-log { background: #090d16; border-left: 4px solid #ff914d; padding: 10px; border-radius: 8px; margin-bottom: 10px; font-size: 0.82rem; }
        footer { text-align: center; padding: 25px 20px; border-top: 1px solid rgba(255,255,255,0.08); color: #64748b; font-size: 0.82rem; }
    `;
    const st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
})();
// WORLD-CLASS ROLE-BASED ADMIN CONTROL CENTER (FOUNDER & CO-LEADER ACCESS)
function renderAdminPage() {
    mainContainer.innerHTML = '';
    const pinInput = el('input', { type: 'password', placeholder: 'Enter Secret Team PIN (Founder: 9999 | Manager: 2026)' });
    const loginCard = el('div', { className: 'app-box', style: 'max-width:440px; margin:20px auto; text-align:center;' }, [
        el('div', { className: 'sec-tag', text: 'SECURE COMMAND CENTER' }),
        el('h2', { text: 'Team & Leadership Login', style: 'margin:8px 0 14px;' }),
        el('p', { text: 'Authorized personnel only (Founder, City Managers & Dispatchers).', style: 'color:#94a3b8; font-size:0.84rem; margin-bottom:16px;' }),
        el('div', { className: 'form-group' }, [pinInput]),
        el('button', { className: 'cta-btn', text: 'Unlock Command Center', onclick: function() {
            const p = pinInput.value.trim();
            if (p === '9999') loadRoleDashboard('FOUNDER (Full Access)');
            else if (p === '2026') loadRoleDashboard('KINNIYA MANAGER (Co-Leader)');
            else alert('Access Denied! Invalid Security PIN.');
        }})
    ]);
    mainContainer.appendChild(loginCard);
}

function loadRoleDashboard(roleName) {
    mainContainer.innerHTML = '';
    const isFounder = roleName.indexOf('FOUNDER') !== -1;
    const statsBar = el('div', { className: 'stat-row', style: 'margin:18px 0;' });
    const listBox = el('div', { text: 'Connecting to Live Firebase Cloud...' });

    mainContainer.appendChild(el('div', {}, [
        el('div', { style: 'display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;' }, [
            el('div', {}, [
                el('div', { className: 'hero-badge', text: '● Logged in as: ' + roleName }),
                el('h2', { className: 'sec-title', text: 'Live Operations & Dispatch' })
            ]),
            el('button', { className: 'btn-sm accent', text: 'Lock & Logout', onclick: function() { renderAdminPage(); } })
        ]),
        statsBar,
        listBox
    ]));

    if (!db) {
        listBox.textContent = 'Cloud offline locally. Upload to GitHub / sameday.com.lk to manage live orders.';
        return;
    }

    db.ref('orders').on('value', function(snap) {
        const data = snap.val();
        if (!data) {
            statsBar.innerHTML = '';
            listBox.textContent = 'No live orders in cloud yet.';
            return;
        }
        const orders = Object.values(data).reverse();
        const deliveredCount = orders.filter(function(o) { return o.status && o.status.indexOf('Delivered') !== -1; }).length;

        statsBar.innerHTML = '';
        statsBar.appendChild(el('div', { className: 'stat-box' }, [el('strong', { text: String(orders.length) }), el('span', { text: 'Total Orders' })]));
        statsBar.appendChild(el('div', { className: 'stat-box' }, [el('strong', { text: String(orders.length - deliveredCount) }), el('span', { text: 'Active / Pending' })]));
        statsBar.appendChild(el('div', { className: 'stat-box' }, [el('strong', { text: String(deliveredCount) }), el('span', { text: 'Completed' })]));

        listBox.innerHTML = '';
        orders.forEach(function(o) {
            const btnRow = el('div', { style: 'display:flex; gap:8px; flex-wrap:wrap; margin-top:10px;' }, [
                el('button', { className: 'btn-sm', text: 'Assign Rider', onclick: function() {
                    db.ref('orders/' + o.id + '/status').set('Rider Assigned - On the way');
                }}),
                el('button', { className: 'btn-sm accent', text: 'Mark Delivered', onclick: function() {
                    db.ref('orders/' + o.id + '/status').set('Delivered Successfully');
                }})
            ]);
            if (isFounder) {
                btnRow.appendChild(el('button', { className: 'btn-sm', style: 'border-color:#ef4444; color:#f87171;', text: 'Delete (Founder)', onclick: function() {
                    if (confirm('Delete order ' + o.id + '?')) db.ref('orders/' + o.id).remove();
                }}));
            }
            listBox.appendChild(el('div', { className: 'order-log' }, [
                el('strong', { text: '[' + o.id + '] ' + o.type + ' • ' + o.time }),
                el('div', { text: 'Status: ' + o.status, style: 'color:#4ade80; font-weight:600; margin-top:3px;' }),
                el('div', { text: o.details, style: 'color:#cbd5e1; margin-top:3px;' }),
                btnRow
            ]));
        });
    });
}
(function professionalUpgradeV3() {
    // 1. Replace Competitor Names with Pride-Inspiring Kinniya & Sri Lanka Brand Copy
    setInterval(function() {
        const h1 = document.querySelector('.hero-left h1');
        const p = document.querySelector('.hero-left p');
        if (h1 && h1.textContent.indexOf('All-in-One') !== -1) {
            h1.innerHTML = 'உங்கள் ஊரின் பெருமை • <span>Sri Lanka’s #1 Super App.</span>';
        }
        if (p && p.textContent.indexOf('PickMe') !== -1) {
            p.textContent = 'கிண்ணியா முதல் இலங்கை முழுவதும்: ஆட்டோ, கார், பார்சல், மினி லாரி, சுவையான உணவு, வாடகை கார் மற்றும் ஆன்லைன் ஷாப்பிங் — அனைத்தும் ஒரே இடத்தில், அதிவேக சேவையுடன்!';
        }
    }, 200);

    // 2. Mobile Smart Auto-Scroll directly to Booking Box when clicking any Service Card
    const cardToTab = {
        '1. Instant Ride': 'ride', '2. Island-wide': 'courier', '3. Mini Lorry': 'truck',
        '4. SameDay Eats': 'food', '5. Self-Drive': 'rental', '6. Book Ahead': 'ahead'
    };
    setInterval(function() {
        document.querySelectorAll('.info-card').forEach(function(card) {
            if (card.dataset.smartScroll) return;
            const title = card.querySelector('h3');
            if (!title) return;
            const txt = title.textContent.trim();
            Object.keys(cardToTab).forEach(function(k) {
                if (txt.indexOf(k) !== -1) {
                    card.dataset.smartScroll = '1';
                    card.onclick = function() {
                        navigateTo('home');
                        setTimeout(function() {
                            const tab = document.getElementById('htab-' + cardToTab[k]);
                            if (tab) tab.click();
                            const appBox = document.querySelector('.app-box');
                            if (appBox) appBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 150);
                    };
                }
            });
        });
    }, 300);

    // 3. Guarantee Live Satellite Map & GPS Works 100% on Web & Mobile
    function ensureLeafletAndMap() {
        if (!document.querySelector('link[href*="leaflet"]')) {
            const c = document.createElement('link');
            c.rel = 'stylesheet';
            c.href = 'https:' + '//://unpkg.com';
            document.head.appendChild(c);
        }
        if (typeof L === 'undefined') {
            if (!document.querySelector('script[src*="leaflet"]')) {
                const s = document.createElement('script');
                s.src = 'https:' + '//://unpkg.com';
                document.body.appendChild(s);
            }
            return;
        }
        ['rideMapBox', 'foodMapBox'].forEach(function(boxId) {
            const box = document.getElementById(boxId);
            if (box && !box._leaflet_id) {
                box.innerHTML = '';
                const map = L.map(boxId).setView([8.4981, 81.1818], 14);
                L.tileLayer('https:' + '//{s}://{z}/{x}/{y}{r}.png').addTo(map);
                const marker = L.marker([8.4981, 81.1818]).addTo(map).bindPopup('Kinniya Live Hub').openPopup();

                const gpsBtn = box.parentElement.querySelector('.gps-btn');
                const inputBox = box.parentElement.querySelector('input');
                if (gpsBtn && inputBox) {
                    gpsBtn.onclick = function() {
                        gpsBtn.textContent = 'Detecting Exact GPS Satellite...';
                        navigator.geolocation.getCurrentPosition(async function(pos) {
                            const lat = pos.coords.latitude, lng = pos.coords.longitude;
                            let addr = 'GPS (' + lat.toFixed(5) + ', ' + lng.toFixed(5) + ')';
                            try {
                                const r = await fetch('https:' + '//nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng);
                                const d = await r.json();
                                if (d && d.display_name) addr = d.display_name.split(',').slice(0, 3).join(',');
                            } catch (e) {}
                            map.invalidateSize();
                            map.setView([lat, lng], 16);
                            marker.setLatLng([lat, lng]).bindPopup('Your Live Location: ' + addr).openPopup();
                            inputBox.value = addr;
                            gpsBtn.textContent = 'Live GPS Location Locked!';
                        }, function() {
                            alert('Please allow Location access in your phone/browser settings!');
                            gpsBtn.textContent = 'Detect My Live GPS Location';
                        }, { enableHighAccuracy: true, timeout: 10000 });
                    };
                }
            }
        });
    }
    setInterval(ensureLeafletAndMap, 400);
})();
(function addTriLingualAndDualHero() {
    // 1. Add Tri-Lingual Switcher (தமிழ் | EN | සිංහල) to Top Navbar
    const langDict = {
        en: {
            heroMain: 'Sri Lanka’s ',
            heroGold: 'All-in-One Super App.',
            heroSub: 'கிண்ணியாவின் பெருமை • Ride, send island-wide COD parcels, hire mini lorries, order hot food, rent self-drive cars, or shop online — all in one fast app!',
            nav: { 'nav-home': 'Home', 'nav-services': 'All Services', 'nav-shop': 'SameDay Shop', 'nav-ai': 'SameDay AI', 'nav-partner': 'Partner / Drive', 'nav-faq': 'Safety & FAQ' }
        },
        ta: {
            heroMain: 'இலங்கையின் நம்பர் 1 ',
            heroGold: 'ஆல்-இன்-ஒன் சூப்பர் ஆப்.',
            heroSub: 'உங்கள் ஊரின் பெருமை • ஆட்டோ, கார், பார்சல், மினி லாரி, சுவையான உணவு, வாடகை கார் மற்றும் ஆன்லைன் ஷாப்பிங் — அனைத்தும் ஒரே கிளிக்கில் உங்கள் வீட்டு வாசலுக்கு!',
            nav: { 'nav-home': 'முகப்பு', 'nav-services': 'சேவைகள்', 'nav-shop': 'ஷாப்பிங்', 'nav-ai': 'SameDay AI', 'nav-partner': 'இணையுங்கள்', 'nav-faq': 'பாதுகாப்பு & FAQ' }
        },
        si: {
            heroMain: 'ශ්‍රී ලංකාවේ අංක 1 ',
            heroGold: 'සුපිරි ඇප් එක.',
            heroSub: 'කින්නියා සිට දිවයින පුරා: ත්‍රිරෝද රථ, කාර්, පාර්සල්, ලොරි, ආහාර සහ ඔන්ලයින් ෂොපින් — සියල්ල එකම තැනකින්!',
            nav: { 'nav-home': 'මුල් පිටුව', 'nav-services': 'සේවාවන්', 'nav-shop': 'සාප්පුව', 'nav-ai': 'SameDay AI', 'nav-partner': 'එක්වන්න', 'nav-faq': 'ආරක්ෂාව & FAQ' }
        }
    };

    window.currentAppLang = 'en';

    window.switchSiteLanguage = function(lang) {
        window.currentAppLang = lang;
        const d = langDict[lang];
        const h1 = document.querySelector('.hero-left h1');
        const p = document.querySelector('.hero-left p');
        if (h1) h1.innerHTML = d.heroMain + '<span>' + d.heroGold + '</span>';
        if (p) p.textContent = d.heroSub;

        Object.keys(d.nav).forEach(function(id) {
            const btn = document.getElementById(id);
            if (btn) {
                const img = btn.querySelector('img');
                btn.textContent = d.nav[id];
                if (img) btn.insertBefore(img, btn.firstChild);
            }
        });
    };

    setInterval(function() {
        const navBtns = document.querySelector('.nav-btns');
        if (navBtns && !document.getElementById('langSelectBox')) {
            const sel = document.createElement('select');
            sel.id = 'langSelectBox';
            sel.setAttribute('style', 'width:auto;padding:5px 10px;border-radius:20px;font-size:0.78rem;font-weight:700;background:#1e293b;color:#ffde59;border:1px solid rgba(255,222,89,0.4);cursor:pointer;');
            sel.innerHTML = '<option value="en">🌐 EN / தமிழ்</option><option value="ta">🇱🇰 தமிழ்</option><option value="si">🇱🇰 සිංහල</option>';
            sel.onchange = function() { window.switchSiteLanguage(sel.value); };
            navBtns.insertBefore(sel, navBtns.firstChild);
        }
        if (window.currentAppLang === 'en') {
            const h1 = document.querySelector('.hero-left h1');
            const p = document.querySelector('.hero-left p');
            if (h1 && h1.textContent.indexOf('பெருமை') !== -1) {
                h1.innerHTML = langDict.en.heroMain + '<span>' + langDict.en.heroGold + '</span>';
            }
            if (p && p.textContent.indexOf('கிண்ணியாவின் பெருமை') === -1) {
                p.textContent = langDict.en.heroSub;
            }
        }
    }, 300);
})();
(function finalUnifiedEngine() {
    const cdn = 'https:' + '//cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/';
    const exactById = {
        'nav-home': { img: cdn + 'House/3D/house_3d.png', text: 'Home', size: 20 },
        'nav-services': { img: cdn + 'High%20voltage/3D/high_voltage_3d.png', text: 'All Services', size: 20 },
        'nav-shop': { img: cdn + 'Shopping%20bags/3D/shopping_bags_3d.png', text: 'SameDay Shop', size: 20 },
        'nav-ai': { img: cdn + 'Robot/3D/robot_3d.png', text: 'SameDay AI', size: 20 },
        'nav-partner': { img: cdn + 'Handshake/3D/handshake_3d.png', text: 'Partner / Drive', size: 20 },
        'nav-faq': { img: cdn + 'Shield/3D/shield_3d.png', text: 'Safety & FAQ', size: 20 },
        'htab-ride': { img: cdn + 'Auto%20rickshaw/3D/auto_rickshaw_3d.png', text: 'Ride', size: 28, block: true },
        'htab-courier': { img: cdn + 'Package/3D/package_3d.png', text: 'Parcel', size: 28, block: true },
        'htab-truck': { img: cdn + 'Delivery%20truck/3D/delivery_truck_3d.png', text: 'Truck', size: 28, block: true },
        'htab-food': { img: cdn + 'Hamburger/3D/hamburger_3d.png', text: 'Eats', size: 28, block: true },
        'htab-rental': { img: cdn + 'Key/3D/key_3d.png', text: 'Rental', size: 28, block: true },
        'htab-ahead': { img: cdn + 'Airplane/3D/airplane_3d.png', text: 'Book Ahead', size: 28, block: true }
    };

    const card3D = {
        '1. Instant Ride': cdn + 'Auto%20rickshaw/3D/auto_rickshaw_3d.png',
        '2. Island-wide': cdn + 'Package/3D/package_3d.png',
        '3. Mini Lorry': cdn + 'Delivery%20truck/3D/delivery_truck_3d.png',
        '4. SameDay Eats': cdn + 'Hamburger/3D/hamburger_3d.png',
        '5. Self-Drive': cdn + 'Automobile/3D/automobile_3d.png',
        '6. Book Ahead': cdn + 'Airplane/3D/airplane_3d.png',
        'Smart Watch': cdn + 'Watch/3D/watch_3d.png',
        'Wireless Noise': cdn + 'Headphone/3D/headphone_3d.png',
        'Eid & Party': cdn + 'Dress/3D/dress_3d.png',
        'Men Sports': cdn + 'Running%20shoe/3D/running_shoe_3d.png',
        'Mini UPS': cdn + 'Battery/3D/battery_3d.png',
        'Family Gift': cdn + 'Wrapped%20gift/3D/wrapped_gift_3d.png'
    };

    const langData = {
        en: {
            h1: 'Sri Lanka’s <span>All-in-One Super App.</span>',
            p: 'உங்கள் ஊரின் பெருமை • Ride, send island-wide COD parcels, hire mini lorries, order hot food, rent self-drive cars, or shop online — all in one fast app!',
            nav: { 'nav-home': 'Home', 'nav-services': 'All Services', 'nav-shop': 'SameDay Shop', 'nav-ai': 'SameDay AI', 'nav-partner': 'Partner / Drive', 'nav-faq': 'Safety & FAQ' }
        },
        ta: {
            h1: 'இலங்கையின் நம்பர் 1 <span>ஆல்-இன்-ஒன் சூப்பர் ஆப்.</span>',
            p: 'உங்கள் ஊரின் பெருமை • ஆட்டோ, கார், பார்சல், மினி லாரி, சுவையான உணவு, வாடகை கார் மற்றும் ஆன்லைன் ஷாப்பிங் — அனைத்தும் ஒரே கிளிக்கில் உங்கள் வீட்டு வாசலுக்கு!',
            nav: { 'nav-home': 'முகப்பு', 'nav-services': 'சேவைகள்', 'nav-shop': 'ஷாப்பிங்', 'nav-ai': 'SameDay AI', 'nav-partner': 'இணையுங்கள்', 'nav-faq': 'பாதுகாப்பு & FAQ' }
        },
        si: {
            h1: 'ශ්‍රී ලංකාවේ අංක 1 <span>සුපිරි ඇප් එක.</span>',
            p: 'කින්නියා සිට දිවයින පුරා: ත්‍රිරෝද රථ, කාර්, පාර්සල්, ලොරි, ආහාර සහ ඔන්ලයින් ෂොපින් — සියල්ල එකම තැනකින්!',
            nav: { 'nav-home': 'මුල් පිටුව', 'nav-services': 'සේවාවන්', 'nav-shop': 'සාප්පුව', 'nav-ai': 'SameDay AI', 'nav-partner': 'එක්වන්න', 'nav-faq': 'ආරක්ෂාව & FAQ' }
        }
    };

    let activeLang = 'en';

    function applyLangOnce(code) {
        activeLang = code;
        const d = langData[code] || langData.en;
        const h1 = document.querySelector('.hero-left h1');
        const p = document.querySelector('.hero-left p');
        if (h1) h1.innerHTML = d.h1;
        if (p) p.textContent = d.p;
        Object.keys(d.nav).forEach(function(id) {
            const btn = document.getElementById(id);
            if (btn) {
                const img = btn.querySelector('img');
                btn.textContent = d.nav[id];
                if (img) btn.insertBefore(img, btn.firstChild);
            }
        });
    }

    setInterval(function() {
        // 1. Restore Language Dropdown (English | தமிழ் | සිංහල)
        const navBtns = document.querySelector('.nav-btns');
        if (navBtns && !document.getElementById('langSelectBox')) {
            const sel = document.createElement('select');
            sel.id = 'langSelectBox';
            sel.setAttribute('style', 'width:auto;padding:5px 10px;border-radius:20px;font-size:0.78rem;font-weight:700;background:#1e293b;color:#ffde59;border:1px solid rgba(255,222,89,0.4);cursor:pointer;');
            sel.innerHTML = '<option value="en">🌐 English</option><option value="ta">🇱🇰 தமிழ்</option><option value="si">🇱🇰 සිංහල</option>';
            sel.onchange = function() { applyLangOnce(sel.value); };
            navBtns.insertBefore(sel, navBtns.firstChild);
            applyLangOnce(activeLang);
        }

        // 2. Restore ALL 3D 4K HD Icons (Navbar + Home Tabs + Cards)
        Object.keys(exactById).forEach(function(id) {
            const el = document.getElementById(id);
            if (!el || el.querySelector('img')) return;
            const cfg = exactById[id];
            const label = (langData[activeLang] && langData[activeLang].nav[id]) ? langData[activeLang].nav[id] : cfg.text;
            const st = cfg.block ? 'width:28px;height:28px;display:block;margin:0 auto 5px;' : 'width:20px;height:20px;vertical-align:-5px;margin-right:7px;';
            el.innerHTML = '<img src="' + cfg.img + '" style="' + st + '">' + label;
        });

        document.querySelectorAll('.info-card, .prod-card').forEach(function(card) {
            if (card.querySelector('img')) return;
            const title = card.querySelector('h3, .prod-title');
            if (!title) return;
            const txt = title.textContent.trim();
            Object.keys(card3D).forEach(function(k) {
                if (txt.indexOf(k) !== -1) {
                    const box = document.createElement('div');
                    box.setAttribute('style', 'width:76px;height:76px;border-radius:18px;background:rgba(255,145,77,0.15);border:1px solid rgba(255,222,89,0.35);display:flex;align-items:center;justify-content:center;margin-bottom:14px;');
                    box.innerHTML = '<img src="' + card3D[k] + '" style="width:56px;height:56px;object-fit:contain;">';
                    card.insertBefore(box, card.firstChild);
                }
            });
        });
    }, 300);
})();
(function fullPageTriLingualSystem() {
    // 1. Force clean non-blinking Hero text
    const heroBox = document.querySelector('.hero-left');
    if (heroBox) {
        const h1 = heroBox.querySelector('h1');
        const p = heroBox.querySelector('p');
        if (h1) h1.innerHTML = 'Sri Lanka’s <span>All-in-One Super App.</span>';
        if (p) p.textContent = 'உங்கள் ஊரின் பெருமை • Ride, send island-wide COD parcels, hire mini lorries, order hot food, rent self-drive cars, or shop online — all in one fast app!';
    }

    // 2. Load Google Full-Page Live Translation Engine invisibly
    const gtDiv = document.createElement('div');
    gtDiv.id = 'google_translate_element';
    gtDiv.style.display = 'none';
    document.body.appendChild(gtDiv);

    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,ta,si',
            autoDisplay: false
        }, 'google_translate_element');
    };

    const gtScript = document.createElement('script');
    gtScript.src = 'https:' + '//://google.com';
    document.body.appendChild(gtScript);

    // 3. Connect Your Custom Language Dropdown to Translate ENTIRE Website
    function triggerFullTranslation(langCode) {
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
            combo.value = langCode;
            combo.dispatchEvent(new Event('change'));
        } else {
            document.cookie = 'googtrans=/en/' + langCode + '; path=/';
            location.reload();
        }
    }

    setInterval(function() {
        const sel = document.getElementById('langSelectBox');
        if (sel && !sel.dataset.fullTransBound) {
            sel.dataset.fullTransBound = '1';
            sel.innerHTML = '<option value="en">🌐 English</option><option value="ta">🇱🇰 தமிழ்</option><option value="si">🇱🇰 සිංහල</option>';
            sel.onchange = function() {
                triggerFullTranslation(sel.value);
            };
        }
        // Hide ugly Google top banner bar if it appears
        const banner = document.querySelector('.goog-te-banner-frame');
        if (banner) banner.style.display = 'none';
        document.body.style.top = '0px';
    }, 400);
})();
