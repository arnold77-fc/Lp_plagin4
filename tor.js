(function () {
    'use strict';

    function torrentStyle() {
        // Создаем элемент со стилями
        var style = document.createElement('style');
        style.innerHTML = `
            /* Изменение фонового градиента на более строгий "торрент-стайл" */
            body {
                background-color: #1a1b1e !important;
            }

            /* Стилизация карточек под раздачи */
            .card {
                border-radius: 4px !important;
                border: 1px solid #343a40;
                transition: transform 0.2s;
            }

            .card:hover {
                border-color: #007bff;
                box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
            }

            /* Индикаторы раздач (сиды/пиры) - добавляем акценты */
            .torrent-seed { color: #28a745 !important; font-weight: bold; }
            .torrent-leech { color: #dc3545 !important; }

            /* Стилизация кнопок под классические трекеры */
            .button--primary {
                background-color: #4e73df !important;
                border-radius: 3px !important;
                text-transform: uppercase;
                font-size: 0.8em !important;
            }

            /* Добавляем иконку дискеты или торрент-значка к заголовкам (декоративно) */
            .full-start__title:before {
                content: '💾 ';
                font-size: 0.7em;
                vertical-align: middle;
            }

            /* Стилизация списка серий/файлов */
            .torrent-item {
                background: rgba(255,255,255,0.05);
                margin-bottom: 2px;
                padding: 10px;
            }
        `;
        document.body.appendChild(style);
    }

    // Запуск при готовности приложения
    if (window.appready) {
        torrentStyle();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') torrentStyle();
        });
    }
})();

