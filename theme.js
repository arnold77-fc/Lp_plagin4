(function () {
    'use strict';

    function applyTheme(theme) {
        var old = document.getElementById('interface_mod_theme');
        if (old) old.remove();
        if (!theme || theme === 'default') return;

        // Элементы, которые станут "карточками" в меню
        var items = '.settings-param, .settings-folder, .selectbox-item';
        
        var b = '.menu__item, .full-start__button, .full-descr__tag, .player-panel .button, .custom-online-btn, .custom-torrent-btn, .main2-more-btn, .simple-button, .menu__version';
        var f = '.menu__item.focus, .menu__item.traverse, .menu__item.hover, .settings-folder.focus, .settings-param.focus, .selectbox-item.focus, .full-start__button.focus, .full-descr__tag.focus, .player-panel .button.focus, .custom-online-btn.focus, .custom-torrent-btn.focus, .main2-more-btn.focus, .simple-button.focus, .menu__version.focus';
        var c = '.card.focus .card__view::after, .card.hover .card__view::after';
        var m = '.settings, .settings__content, .settings-input__content, .selectbox__content, .modal__content, .scroll';

        // Общие стили для рамок пунктов
        var itemStyle = items + ' { border: 1px solid rgba(255,255,255,0.1) !important; margin-bottom: 8px !important; border-radius: 8px !important; transition: all 0.3s ease !important; background: rgba(255,255,255,0.03) !important; } ';
        var anim = 'body, ' + b + ', ' + m + ', .menu, .head { transition: all 0.4s ease !important; }';

        // Цвета границ для каждой темы
        var themeCss = {
            emerald_v1: itemStyle + 'body, ' + m + ' { background: #0c1619 !important; color: #dfdfdf !important; } .settings { border-left: 3px solid #1a594d !important; } ' + items + ' { border-color: rgba(26,89,77,0.4) !important; } ' + f + ' { background: linear-gradient(to right, #1a594d, #0e3652) !important; border-color: #1a594d !important; }',
            emerald_v2: itemStyle + 'body, ' + m + ' { background: #112229 !important; } .settings { border-left: 3px solid #26a483 !important; } ' + items + ' { border-color: rgba(38,164,131,0.4) !important; } ' + f + ' { background: linear-gradient(90deg, #26a483, #125e8a) !important; }',
            aurora: itemStyle + 'body, ' + m + ' { background: #0f2027 !important; color: #fff !important; } .settings { border-left: 3px solid #aa4b6b !important; } ' + items + ' { border-color: rgba(170,75,107,0.4) !important; } ' + f + ' { background: linear-gradient(90deg, #aa4b6b, #6b6b83, #3b8d99) !important; }',
            netflix: itemStyle + 'body, ' + m + ' { background: #141414 !important; color: #fff !important; } .settings { border-left: 3px solid #E50914 !important; } ' + items + ' { border-color: rgba(229,9,20,0.3) !important; } ' + f + ' { background: #E50914 !important; }',
            spotify: itemStyle + 'body, ' + m + ' { background: #121212 !important; color: #fff !important; } .settings { border-left: 3px solid #1DB954 !important; } ' + items + ' { border-color: rgba(29,185,84,0.3) !important; } ' + f + ' { background: #1DB954 !important; color: #000 !important; }',
            cyberpunk: itemStyle + 'body, ' + m + ' { background: #09090e !important; color: #00f0ff !important; } .settings { border-left: 3px solid #ff003c !important; } ' + items + ' { border-color: rgba(255,0,60,0.4) !important; } ' + f + ' { background: linear-gradient(90deg, #ff003c, #00f0ff) !important; }',
            amoled: itemStyle + 'body, ' + m + ' { background: #000000 !important; color: #fff !important; } .settings { border-left: 3px solid #bb86fc !important; } ' + items + ' { border-color: rgba(187,134,252,0.3) !important; } ' + f + ' { background: #bb86fc !important; color: #000 !important; }',
            ocean: itemStyle + 'body, ' + m + ' { background: #050a14 !important; color: #64ffda !important; } .settings { border-left: 3px solid #64ffda !important; } ' + items + ' { border-color: rgba(100,255,218,0.3) !important; } ' + f + ' { background: rgba(100,255,218,0.2) !important; border: 1px solid #64ffda !important; }',
            dark_mint: itemStyle + 'body, ' + m + ' { background: #050e0d !important; color: #fff !important; } .settings { border-left: 3px solid #00b894 !important; } ' + items + ' { border-color: rgba(0,184,148,0.3) !important; } ' + f + ' { background: #00b894 !important; }',
            mint: itemStyle + 'body, ' + m + ' { background: #122220 !important; color: #fff !important; } .settings { border-left: 3px solid #2ecc71 !important; } ' + items + ' { border-color: rgba(46,204,113,0.3) !important; } ' + f + ' { background: #2ecc71 !important; }',
            prime: itemStyle + 'body, ' + m + ' { background: #1e2b3c !important; color: #fff !important; } .settings { border-left: 3px solid #00a8e1 !important; } ' + items + ' { border-color: rgba(0,168,225,0.3) !important; } ' + f + ' { background: #00a8e1 !important; }',
            twitch: itemStyle + 'body, ' + m + ' { background: #0e0e10 !important; color: #efeff1 !important; } .settings { border-left: 3px solid #9146FF !important; } ' + items + ' { border-color: rgba(145,70,255,0.3) !important; } ' + f + ' { background: #9146FF !important; }',
            apple: itemStyle + 'body, ' + m + ' { background: #1c1c1e !important; color: #fff !important; } .settings { border-left: 3px solid rgba(255,255,255,0.5) !important; } ' + items + ' { border-color: rgba(255,255,255,0.1) !important; } ' + f + ' { background: rgba(255,255,255,0.2) !important; }',
            hulu: itemStyle + 'body, ' + m + ' { background: #0f1210 !important; color: #fff !important; } .settings { border-left: 3px solid #1ce783 !important; } ' + items + ' { border-color: rgba(28,231,131,0.3) !important; } ' + f + ' { background: #1ce783 !important; color: #000 !important; }'
        };

        if (themeCss[theme]) {
            var style = document.createElement('style');
            style.id = 'interface_mod_theme';
            style.innerHTML = anim + themeCss[theme];
            document.head.appendChild(style);
        }
    }

    function showThemeSelector() {
        var items = [
            { title: 'По умолчанию', theme: 'default' },
            { title: 'Emerald V1', theme: 'emerald_v1' },
            { title: 'Emerald V2', theme: 'emerald_v2' },
            { title: 'Aurora', theme: 'aurora' },
            { title: 'Netflix Style', theme: 'netflix' },
            { title: 'Spotify Dark', theme: 'spotify' },
            { title: 'Cyberpunk Neon', theme: 'cyberpunk' },
            { title: 'Amoled Black', theme: 'amoled' },
            { title: 'Ocean Glass', theme: 'ocean' },
            { title: 'Mint Fresh', theme: 'mint' },
            { title: 'Dark Mint', theme: 'dark_mint' },
            { title: 'Prime Blue', theme: 'prime' },
            { title: 'Twitch Dark', theme: 'twitch' },
            { title: 'Apple Glass', theme: 'apple' },
            { title: 'Hulu Green', theme: 'hulu' }
        ];

        Lampa.Select.show({
            title: 'Выберите тему',
            items: items,
            onSelect: function (a) {
                Lampa.Storage.set('interface_theme_custom', a.theme);
                applyTheme(a.theme);
                Lampa.Controller.toggle('menu'); 
            },
            onBack: function () {
                Lampa.Controller.toggle('menu');
            }
        });
    }

    function maintainMenu() {
        var menuList = $('.menu .menu__list');
        if (menuList.length > 0) {
            var buttons = menuList.find('#custom_themes_btn');
            if (buttons.length > 1) { buttons.slice(1).remove(); }
            if (buttons.length === 0) {
                var menu_item = $('<li class="menu__item selector" id="custom_themes_btn">' +
                    '<div class="menu__ico">' +
                    '<svg height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="currentColor"/></svg>' +
                    '</div>' +
                    '<div class="menu__text">Темы</div>' +
                    '</li>');

                menu_item.on('hover:enter', function () {
                    showThemeSelector();
                });
                menuList.append(menu_item);
            }
        }
    }

    function startPlugin() {
        setInterval(maintainMenu, 1000);
        var saved = Lampa.Storage.get('interface_theme_custom', 'default');
        applyTheme(saved);
    }

    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') startPlugin();
        });
    }
})();

