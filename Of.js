(function () {
    Lampa.Platform.tv();

    // Добавляем стили оформления
    var style = `
        <style>
            /* Стиль сетки под торрент-трекеры */
            .card__title { 
                font-size: 0.9em !important; 
                text-align: left !important; 
                color: #ff9800; 
            }
            .card__view { 
                border-radius: 4px !important; 
                border: 1px solid #444; 
            }
            
            /* Плашка с сезонами на карточке */
            .card__season-info {
                position: absolute;
                top: 5px;
                right: 5px;
                background: rgba(0,0,0,0.8);
                color: #fff;
                padding: 2px 6px;
                border-radius: 3px;
                font-size: 10px;
                font-weight: bold;
                border: 1px solid #ff9800;
            }
        </style>`;
    $('body').append(style);

    // Слушатель отрисовки карточки
    Lampa.Listener.follow('card', function (e) {
        if (e.type == 'render' && e.data.seasons) {
            var count = e.data.seasons.length;
            var html = '<div class="card__season-info">' + count + ' СЕЗ.</div>';
            e.object.find('.card__view').append(html);
        }
    });
})();

