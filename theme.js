(function () {
    'use strict';

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

    function init() {
        // 1. Пряма реєстрація перекладів
        Lampa.Lang.add({
            interface_mod_theme_title: { en: 'Interface theme', uk: 'Тема інтерфейсу', ru: 'Тема интерфейса' },
            interface_mod_theme_default: { en: 'Default', uk: 'За замовчуванням', ru: 'По умолчанию' }
        });

        // 2. Створюємо структуру параметра
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
            }
        };

        // 3. ДОДАЄМО В МЕНЮ ЧЕРЕЗ СТАНДАРТНИЙ ОБ'ЄКТ (Найнадійніше для Android)
        Lampa.Settings.main().push({
            name: 'interface_custom_themes',
            title: '{interface_mod_theme_title}',
            icon: '<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="currentColor"/></svg>',
            onOpen: function () {
                var menu = [];
                for (var key in themeItem.values) {
                    menu.push({
                        title: themeItem.values[key],
                        value: key,
                        selected: Lampa.Storage.get('interface_theme_custom', 'default') === key
                    });
                }

                Lampa.Select.show({
                    title: '{interface_mod_theme_title}',
                    items: menu,
                    onSelect: function (item) {
                        Lampa.Storage.set('interface_theme_custom', item.value);
                        applyTheme(item.value);
                        Lampa.Select.hide();
                    },
                    onBack: function () {
                        Lampa.Select.hide();
                        Lampa.Controller.toggle('settings_component');
                    }
                });
            }
        });

        // 4. Застосування при старті
        applyTheme(Lampa.Storage.get('interface_theme_custom', 'default'));
    }

    // Запуск
    if (window.appready) init();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') init();
        });
    }
})();
