(function () {
    'use strict';

    // 1. Потрібно було дати назву об'єкту з текстами
    var LANT = {
        interface_mod_new_theme_select_title: { en: 'Interface theme', uk: 'Тема інтерфейсу' },
        interface_mod_new_theme_default: { en: 'Default', uk: 'За замовчуванням' },
        interface_mod_new_theme_emerald_v1: { en: 'Emerald V1', uk: 'Emerald V1' },
        interface_mod_new_theme_emerald_v2: { en: 'Emerald V2', uk: 'Emerald V2' },
        interface_mod_new_theme_aurora: { en: 'Aurora', uk: 'Aurora' },
        interface_mod_new_theme_netflix: { en: 'Netflix Style', uk: 'Netflix Style' },
        interface_mod_new_theme_spotify: { en: 'Spotify Dark', uk: 'Spotify Dark' },
        interface_mod_new_theme_cyberpunk: { en: 'Cyberpunk Neon', uk: 'Cyberpunk Neon' },
        interface_mod_new_theme_amoled: { en: 'Amoled Black', uk: 'Amoled Black' },
        interface_mod_new_theme_ocean: { en: 'Ocean Glass', uk: 'Ocean Glass' }
        // ... додайте інші, якщо потрібно
    };

    function applyTheme(theme) {
        var old = document.getElementById('interface_mod_theme');
        if (old) old.remove();
        if (!theme || theme === 'default') return;

        var b = '.menu__item, .settings-folder, .settings-param, .selectbox-item, .full-start__button, .full-descr__tag, .player-panel .button, .custom-online-btn, .custom-torrent-btn, .main2-more-btn, .simple-button, .menu__version';
        var f = '.menu__item.focus, .menu__item.traverse, .menu__item.hover, .settings-folder.focus, .settings-param.focus, .selectbox-item.focus, .full-start__button.focus, .full-descr__tag.focus, .player-panel .button.focus, .custom-online-btn.focus, .custom-torrent-btn.focus, .main2-more-btn.focus, .simple-button.focus, .menu__version.focus';
        var c = '.card.focus .card__view::after, .card.hover .card__view::after';
        var m = '.settings__content, .settings-input__content, .selectbox__content, .modal__content';

        var themeCss = {
            emerald_v1: 'body { background: linear-gradient(135deg, #0c1619 0%, #132730 50%, #18323a 100%) !important; color: #dfdfdf !important; } ' +
                b + ' { border-radius: 1.0em !important; transition: all 0.3s ease !important; } ' +
                f + ' { background: linear-gradient(to right, #1a594d, #0e3652) !important; color: #fff !important; box-shadow: 0 2px 8px rgba(26,89,77,.25) !important; } ' +
                c + ' { border: 2px solid #1a594d !important; box-shadow: 0 0 10px rgba(26,89,77,.35) !important; border-radius: 1.0em !important; } ' +
                m + ' { background: rgba(12,22,25,.97) !important; border: 1px solid rgba(26,89,77,.12) !important; border-radius: 1.0em !important; }',

            netflix: 'body { background: #141414 !important; color: #ffffff !important; } ' +
                b + ' { border-radius: 0.4em !important; transition: all 0.2s ease !important; } ' +
                f + ' { background: #E50914 !important; color: #fff !important; box-shadow: 0 4px 15px rgba(229,9,20,.4) !important; transform: scale(1.02) !important; } ' +
                c + ' { border: 3px solid #E50914 !important; box-shadow: 0 0 18px rgba(229,9,20,.5) !important; border-radius: 0.4em !important; } ' +
                m + ' { background: rgba(20, 20, 20, 0.98) !important; border: 1px solid rgba(229,9,20,.25) !important; border-radius: 0.4em !important; }',
            
            ocean: 'body { background: radial-gradient(circle at top right, #122238, #050a14) !important; color: #e6f1ff !important; } ' +
                b + ' { border-radius: 0.4em !important; transition: all 0.3s ease !important; } ' +
                f + ' { background: rgba(100,255,218,0.15) !important; border: 1px solid #64ffda !important; color: #64ffda !important; box-shadow: 0 0 15px rgba(100,255,218,.25) !important; backdrop-filter: blur(4px) !important; } ' +
                c + ' { border: 2px solid #64ffda !important; box-shadow: 0 0 20px rgba(100,255,218,.3) !important; border-radius: 0.4em !important; }'
        };

        if (themeCss[theme]) {
            var style = document.createElement('style');
            style.id = 'interface_mod_theme';
            style.innerHTML = themeCss[theme];
            document.head.appendChild(style);
        }
    }

    // Приклад виклику:
    applyTheme('netflix');

})(); // Закриття головної функції
