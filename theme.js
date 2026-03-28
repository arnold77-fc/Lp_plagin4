(function () {
    'use strict';

    // 1. Функція застосування стилів
    function applyTheme(theme) {
        var old = document.getElementById('interface_mod_theme');
        if (old) old.remove();
        if (!theme || theme === 'default') return;

        var f = '.menu__item.focus, .menu__item.traverse, .menu__item.hover, .settings-folder.focus, .settings-param.focus, .selectbox-item.focus, .full-start__button.focus, .full-descr__tag.focus, .player-panel .button.focus, .custom-online-btn.focus, .custom-torrent-btn.focus, .main2-more-btn.focus, .simple-button.focus, .menu__version.focus';
        
        var themes = {
            emerald_v1: 'body { background: linear-gradient(135deg, #0c1619 0%, #132730 50%, #18323a 100%) !important; } ' + f + ' { background: #1a594d !important; }',
            emerald_v2: 'body { background: #112229 !important; } ' + f + ' { background: #26a483 !important; }',
            aurora: 'body { background: #0f2027 !important; } ' + f + ' { background: #aa4b6b !important; }',
            netflix: 'body { background: #141414 !important; } ' + f + ' { background: #E50914 !important; }',
            spotify: 'body { background: #121212 !important; } ' + f + ' { background: #1DB954 !important; color: #000 !important; }',
            cyberpunk: 'body { background: #09090e !important; } ' + f + ' { background: #ff003c !important; }',
            amoled: 'body { background: #000 !important; } ' + f + ' { background: #bb86fc !important; color: #000 !important; }',
            ocean: 'body { background: #050a14 !important; } ' + f + ' { background: #64ffda !important; color: #000 !important; }',
            twitch: 'body { background: #0f0e11 !important; } ' + f + ' { background: #9146FF !important; }',
            apple: 'body { background: #1a1a1a !important; } ' + f + ' { background: rgba(255,255,255,0.2) !important; backdrop-filter: blur(10px); }',
            hulu: 'body { background: #0b0c0d !important; } ' + f + ' { background: #1ce783 !important; color: #000 !important; }'
        };

        if (themes[theme]) {
            var style = document.createElement('style');
            style.id = 'interface_mod_theme';
            style.innerHTML = themes[theme];
            document.head.appendChild(style);
        }
    }

    // 2. Створення пункту меню
    function init() {
        // Реєструємо переклади
        Lampa.Lang.add({
            interface_mod_theme_title: { en: 'Interface theme', uk: 'Тема інтерфейсу', ru: 'Тема интерфейса' },
            interface_mod_theme_default: { en: 'Default', uk: 'За замовчуванням', ru: 'По умолчанию' }
        });

        var themeItem = {
            title: '{interface_mod_theme_title}',
            type: 'select',
            name: 'interface_theme_custom',
            value: 'default',
            values: {
                default: '{interface_mod_theme_default}',
                emerald_v1: 'Emerald V1',
                emerald_v2: 'Emerald V2',
                aurora: 'Aurora',
                netflix: 'Netflix Style',
                spotify: 'Spotify Dark',
                cyberpunk: 'Cyberpunk Neon',
                amoled: 'Amoled Black',
                ocean: 'Ocean Glass',
                twitch: 'Twitch Dark',
                apple: 'Apple Glass',
                hulu: 'Hulu Green'
            },
            context: 'interface'
        };

        // Додаємо в стандартні налаштування
        Lampa.Settings.add(themeItem);

        // ФОРСОВАНА ПЕРЕВІРКА (для Android 1.12.4)
        // Якщо зайти в налаштування інтерфейсу, перевіримо чи з'явився пункт
        Lampa.Listener.follow('settings', function (e) {
            if (e.type === 'open' && e.name === 'interface') {
                setTimeout(function() {
                    if ($('.settings-param[data-name="interface_theme_custom"]').length === 0) {
                        Lampa.Settings.create(themeItem, e.body);
                    }
                }, 50);
            }
        });

        // Слідкуємо за зміною через Storage
        Lampa.Storage.listener.follow('change', function (e) {
            if (e.name === 'interface_theme_custom') {
                applyTheme(e.value);
            }
        });

        // Застосовуємо збережену тему
        var saved = Lampa.Storage.get('interface_theme_custom', 'default');
        applyTheme(saved);
    }

    // Запуск після готовності
    if (window.appready) init();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') init();
        });
    }
})();

