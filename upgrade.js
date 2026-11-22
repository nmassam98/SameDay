(function() {
    // 1. Stop any old blinking timers safely
    const maxId = window.setInterval(function(){}, 9999);
    for (let i = 1; i <= maxId; i++) { window.clearInterval(i); }

    window.SD_CDN = 'https:' + '//cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/';
    window.SD_LANG = 'en';

    window.SD_DICT = {
        en: {
            badge: '● Live in Kinniya • Expanding Island-wide',
            h1: 'Sri Lanka’s <span>All-in-One Super App.</span>',
            p: 'உங்கள் ஊரின் பெருமை • Ride, send island-wide COD parcels, hire mini lorries, order hot food, rent self-drive cars, or shop online — all in one fast app!',
            mallBtn: 'Explore SameDay Online Mall',
            nav: { 'nav-home': 'Home', 'nav-services': 'All Services', 'nav-shop': 'SameDay Shop', 'nav-ai': 'SameDay AI', 'nav-partner': 'Partner / Drive', 'nav-faq': 'Safety & FAQ' },
            tabs: { 'htab-ride': 'Ride', 'htab-courier': 'Parcel', 'htab-truck': 'Truck', 'htab-food': 'Eats', 'htab-rental': 'Rental', 'htab-ahead': 'Book Ahead' },
            labels: { 'Vehicle Type': 'Vehicle Type', 'Pickup Location': 'Pickup Location', 'Drop Location': 'Drop Location', 'Delivery Zone': 'Delivery Zone', 'What is inside?': 'What is inside?', 'Receiver Details': 'Receiver Details', 'Choose Restaurant': 'Choose Restaurant', 'Order Items': 'Order Items', 'Delivery Address (Cash at Door)': 'Delivery Address (Cash at Door)' },
            btns: { 'Confirm Instant Ride': 'Confirm Instant Ride', 'Book Parcel Courier': 'Book Parcel Courier', 'Order Hot Food Now': 'Order Hot Food Now', 'Detect My Live GPS Location': 'Detect My Live GPS Location' }
        },
        ta: {
            badge: '● கிண்ணியாவில் நேரலை • இலங்கை முழுவதும் விரிவாக்கம்',
            h1: 'இலங்கையின் நம்பர் 1 <span>ஆல்-இன்-ஒன் சூப்பர் ஆப்.</span>',
            p: 'உங்கள் ஊரின் பெருமை • ஆட்டோ, கார், பார்சல், மினி லாரி, சுவையான உணவு, வாடகை கார் மற்றும் ஆன்லைன் ஷாப்பிங் — அனைத்தும் ஒரே கிளிக்கில் உங்கள் வீட்டு வாசலுக்கு!',
            mallBtn: 'SameDay ஆன்லைன் ஷாப்பிங் செல்லவும்',
            nav: { 'nav-home': 'முகப்பு', 'nav-services': 'சேவைகள்', 'nav-shop': 'ஷாப்பிங்', 'nav-ai': 'SameDay AI', 'nav-partner': 'இணையுங்கள்', 'nav-faq': 'பாதுகாப்பு & FAQ' },
            tabs: { 'htab-ride': 'பயணம்', 'htab-courier': 'பார்சல்', 'htab-truck': 'லாரி', 'htab-food': 'உணவு', 'htab-rental': 'வாடகை கார்', 'htab-ahead': 'முன்பதிவு' },
            labels: { 'Vehicle Type': 'வாகன வகை', 'Pickup Location': 'புறப்படும் இடம்', 'Drop Location': 'சேரும் இடம்', 'Delivery Zone': 'டெலிவரி பகுதி', 'What is inside?': 'பார்சலில் என்ன உள்ளது?', 'Receiver Details': 'பெறுபவர் பெயர் & எண்', 'Choose Restaurant': 'உணவகத்தைத் தேர்ந்தெடுக்கவும்', 'Order Items': 'உணவு வகைகள்', 'Delivery Address (Cash at Door)': 'டெலிவரி முகவரி (பணம் கையில்)' },
            btns: { 'Confirm Instant Ride': 'உடனடியாக ஆட்டோ / கார் புக் செய்க', 'Book Parcel Courier': 'பார்சல் அனுப்புக', 'Order Hot Food Now': 'சூடான உணவு ஆர்டர் செய்க', 'Detect My Live GPS Location': 'எனது நேரடி GPS இடத்தைக் கண்டறி' }
        },
        si: {
            badge: '● කින්නියා හි සජීවීව • දිවයින පුරා ව්‍යාප්ත වේ',
            h1: 'ශ්‍රී ලංකාවේ අංක 1 <span>සුපිරි ඇප් එක.</span>',
            p: 'කින්නියා සිට දිවයින පුරා: ත්‍රිරෝද රථ, කාර්, පාර්සල්, ලොරි, ආහාර සහ ඔන්ලයින් ෂොපින් — සියල්ල එකම තැනකින්!',
            mallBtn: 'SameDay ඔන්ලයින් සාප්පුවට පිවිසෙන්න',
            nav: { 'nav-home': 'මුල් පිටුව', 'nav-services': 'සේවාවන්', 'nav-shop': 'සාප්පුව', 'nav-ai': 'SameDay AI', 'nav-partner': 'එක්වන්න', 'nav-faq': 'ආරක්ෂාව & FAQ' },
            tabs: { 'htab-ride': 'ගමන්', 'htab-courier': 'පාර්සල්', 'htab-truck': 'ලොරි', 'htab-food': 'ආහාර', 'htab-rental': 'කාර් කුලියට', 'htab-ahead': 'කලින් වෙන්කරන්න' },
            labels: { 'Vehicle Type': 'වාහන වර්ගය', 'Pickup Location': 'පිටත්වන ස්ථානය', 'Drop Location': 'ගමනාන්තය', 'Delivery Zone': 'බෙදාහැරීමේ කලාපය', 'What is inside?': 'පාර්සලය තුළ ඇත්තේ කුමක්ද?', 'Receiver Details': 'ලබන්නාගේ විස්තර', 'Choose Restaurant': 'අවන්හල තෝරන්න', 'Order Items': 'ආහාර ඇණවුම', 'Delivery Address (Cash at Door)': 'බෙදාහැරීමේ ලිපිනය' },
            btns: { 'Confirm Instant Ride': 'ගමන වෙන්කරන්න', 'Book Parcel Courier': 'පාර්සලය යවන්න', 'Order Hot Food Now': 'ආහාර ඇණවුම් කරන්න', 'Detect My Live GPS Location': 'මගේ සජීවී GPS ස්ථානය සොයන්න' }
        }
    };
})();
(function() {
    const cdn = window.SD_CDN;
    const exactIcons = {
        'nav-home': cdn + 'House/3D/house_3d.png',
        'nav-services': cdn + 'High%20voltage/3D/high_voltage_3d.png',
        'nav-shop': cdn + 'Shopping%20bags/3D/shopping_bags_3d.png',
        'nav-ai': cdn + 'Robot/3D/robot_3d.png',
        'nav-partner': cdn + 'Handshake/3D/handshake_3d.png',
        'nav-faq': cdn + 'Shield/3D/shield_3d.png',
        'htab-ride': cdn + 'Auto%20rickshaw/3D/auto_rickshaw_3d.png',
        'htab-courier': cdn + 'Package/3D/package_3d.png',
        'htab-truck': cdn + 'Delivery%20truck/3D/delivery_truck_3d.png',
        'htab-food': cdn + 'Hamburger/3D/hamburger_3d.png',
        'htab-rental': cdn + 'Key/3D/key_3d.png',
        'htab-ahead': cdn + 'Airplane/3D/airplane_3d.png'
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

    window.runSDUpgrade = function() {
        const d = window.SD_DICT[window.SD_LANG];

        // 1. Setup Clean Language Selector (English | தமிழ் | සිංහල)
        const navBtns = document.querySelector('.nav-btns');
        if (navBtns) {
            let sel = document.getElementById('langSelectBox');
            if (!sel) {
                sel = document.createElement('select');
                sel.id = 'langSelectBox';
                sel.setAttribute('style', 'width:auto;padding:5px 10px;border-radius:20px;font-size:0.78rem;font-weight:700;background:#1e293b;color:#ffde59;border:1px solid rgba(255,222,89,0.4);cursor:pointer;');
                navBtns.insertBefore(sel, navBtns.firstChild);
            }
            if (!sel.dataset.cleanOptions) {
                sel.dataset.cleanOptions = '1';
                sel.innerHTML = '<option value="en">🌐 English</option><option value="ta">🇱🇰 தமிழ்</option><option value="si">🇱🇰 සිංහල</option>';
                sel.value = window.SD_LANG;
                sel.onchange = function() { window.SD_LANG = sel.value; window.runSDUpgrade(); };
            }
        }

        // 2. Translate Hero Texts (Zero Blink)
        const badge = document.querySelector('.hero-badge');
        const h1 = document.querySelector('.hero-left h1');
        const p = document.querySelector('.hero-left p');
        const mallBtn = document.querySelector('.hero-left .cta-btn');
        if (badge && badge.textContent !== d.badge) badge.textContent = d.badge;
        if (h1 && h1.innerHTML !== d.h1) h1.innerHTML = d.h1;
        if (p && p.textContent !== d.p) p.textContent = d.p;
        if (mallBtn && mallBtn.dataset.lang !== window.SD_LANG) {
            mallBtn.dataset.lang = window.SD_LANG;
            mallBtn.innerHTML = '<img src="' + cdn + 'Shopping%20bags/3D/shopping_bags_3d.png" style="width:20px;height:20px;vertical-align:-4px;margin-right:8px;">' + d.mallBtn;
        }

        // 3. Apply 3D 4K Icons & Translated Labels to Nav & Service Tabs
        Object.keys(exactIcons).forEach(function(id) {
            const el = document.getElementById(id);
            if (!el) return;
            const label = d.nav[id] || d.tabs[id];
            if (el.dataset.lang === window.SD_LANG && el.querySelector('img')) return;
            el.dataset.lang = window.SD_LANG;
            const isBlock = id.indexOf('htab-') === 0;
            const st = isBlock ? 'width:28px;height:28px;display:block;margin:0 auto 5px;' : 'width:20px;height:20px;vertical-align:-5px;margin-right:7px;';
            el.innerHTML = '<img src="' + exactIcons[id] + '" style="' + st + '">' + label;
        });

        // 4. Translate Form Labels & Buttons
        document.querySelectorAll('label').forEach(function(lbl) {
            if (!lbl.dataset.orig) lbl.dataset.orig = lbl.textContent.trim();
            if (d.labels[lbl.dataset.orig]) lbl.textContent = d.labels[lbl.dataset.orig];
        });
        document.querySelectorAll('.app-box .cta-btn, .gps-btn').forEach(function(btn) {
            if (!btn.dataset.orig) btn.dataset.orig = btn.textContent.trim();
            if (d.btns[btn.dataset.orig]) btn.textContent = d.btns[btn.dataset.orig];
        });

        // 5. Apply 3D Icons to Cards
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
    };
})();
(function() {
    // 1. Mobile Smart Auto-Scroll directly to Booking Box when clicking any Service Card
    const cardToTab = {
        '1. Instant Ride': 'ride', '2. Island-wide': 'courier', '3. Mini Lorry': 'truck',
        '4. SameDay Eats': 'food', '5. Self-Drive': 'rental', '6. Book Ahead': 'ahead'
    };

    document.addEventListener('click', function(e) {
        const card = e.target.closest('.info-card');
        if (!card) return;
        const title = card.querySelector('h3');
        if (!title) return;
        const txt = title.textContent.trim();
        Object.keys(cardToTab).forEach(function(k) {
            if (txt.indexOf(k) !== -1 && typeof navigateTo === 'function') {
                navigateTo('home');
                setTimeout(function() {
                    if (window.runSDUpgrade) window.runSDUpgrade();
                    const tab = document.getElementById('htab-' + cardToTab[k]);
                    if (tab) tab.click();
                    const box = document.querySelector('.app-box');
                    if (box) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 120);
            }
        });
    });

    // 2. Guarantee Live Satellite Map & GPS Works 100% on Mobile & Desktop
    function ensureLiveMapAndGPS() {
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
                        gpsBtn.textContent = '⏳ Detecting Exact GPS Satellite...';
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
                            marker.setLatLng([lat, lng]).bindPopup('📍 Your Live Location: ' + addr).openPopup();
                            inputBox.value = addr;
                            gpsBtn.textContent = '✅ Live GPS Location Locked!';
                        }, function() {
                            alert('⚠️ Please allow Location permission in your phone/browser settings!');
                            gpsBtn.textContent = 'Detect My Live GPS Location';
                        }, { enableHighAccuracy: true, timeout: 10000 });
                    };
                }
            }
        });
    }

    // 3. Start Clean Non-Blinking Engine
    setInterval(function() {
        if (window.runSDUpgrade) window.runSDUpgrade();
        ensureLiveMapAndGPS();
    }, 350);
    if (window.runSDUpgrade) window.runSDUpgrade();
})();
(function fixTamilNavWrapping() {
    const navFixCss = `
        .nav-inner { max-width: 1240px !important; flex-wrap: nowrap !important; gap: 6px !important; }
        .nav-links { flex-wrap: nowrap !important; gap: 3px !important; }
        .nav-item { padding: 6px 9px !important; font-size: 0.78rem !important; white-space: nowrap !important; }
        .logo { font-size: 1.45rem !important; white-space: nowrap !important; }
        .nav-btns { flex-shrink: 0 !important; gap: 5px !important; }
        @media (max-width: 960px) {
            .nav-inner { flex-wrap: wrap !important; }
            .nav-links { flex-wrap: wrap !important; justify-content: center; }
        }
    `;
    const st = document.createElement('style');
    st.textContent = navFixCss;
    document.head.appendChild(st);
})();
