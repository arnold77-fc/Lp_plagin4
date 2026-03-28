(function () {
    'use strict';

    // 1. Функція стилів
    function applyTheme(theme) {
        var old = document.getElementById('interface_mod_theme');
        if (old) old.remove();
        if (!theme || theme === 'default') return;

        var f = '.menu__item.focus, .menu__item.traverse, .menu__item.hover, .settings-folder.focus, .settings-param.focus, .selectbox-item.focus, .full-start__button.focus, .full-descr__tag.focus, .player-panel .button.focus, .custom-online-btn.focus, .custom-torrent-btn.focus, .main2-more-btn.focus, .simple-button.focus, .menu__version.focus';
        
        var themes = {
            emerald_v1: 'body { background: linear-gradient(135deg, #0c1619 0%, #132730 50%, #18323a 100%) !important; } ' + f + ' { background: #1a594d !important; }',
            netflix: 'body { background: #141414 !important; } ' + f + ' { background: #E50914 !important; }',
            spotify: 'body { background: #121212 !important; } ' + f + ' { background: #1DB954 !important; color: #000 !important; }',
            cyberpunk: 'body { background: #09090e !important; } ' + f + ' { background: #ff003c !important; }',
            amoled: 'body { background: #000 !important; } ' + f + ' { background: #bb86fc !important; color: #000 !important; }'
        };

        if (themes[theme]) {
            var style = document.createElement('style');
            style.id = 'interface_mod_theme';
            style.innerHTML = themes[theme];
            document.head.appendChild(style);
        }
    }

    // 2. Логіка вибору
    function openThemeSelect() {
        var items = [
            { title: 'За замовчуванням', value: 'default' },
            { title: 'Emerald V1', value: 'emerald_v1' },
            { title: 'Netflix Style', value: 'netflix' },
            { title: 'Spotify Dark', value: 'spotify' },
            { title: 'Cyberpunk Neon', value: 'cyberpunk' },
            { title: 'Amoled Black', value: 'amoled' }
        ];

        Lampa.Select.show({
            title: 'Вибір теми',
            items: items,
            onSelect: function (item) {
                Lampa.Storage.set('interface_theme_custom', item.value);
                applyTheme(item.value);
                Lampa.Select.hide();
            },
            onBack: function () {
                Lampa.Select.hide();
            }
        });
    }

    // 3. Додавання кнопки в головне меню (Side Menu)
    function addMenuButton() {
        var menu_item = $('<li class="menu__item selector" data-action="custom_theme">' +
            '<div class="menu__ico"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/></svg></div>' +
            '<div class="menu__text">Теми</div>' +
            '</li>');

        menu_item.on('hover:enter', function () {
            openThemeSelect();
        });

        $('.menu .menu__list').append(menu_item);
    }

    // Запуск
    function start() {
        addMenuButton();
        applyTheme(Lampa.Storage.get('interface_theme_custom', 'default'));
    }

    if (window.appready) start();
    else Lampa.Listener.follow('app', function (e) { if (e.type == 'ready') start(); });

})();
