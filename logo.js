function renderStudiosTitle(render, title, movie) {
        if (!render) return;
        $(".plugin-uk-title-combined", render).remove();
        
        // Р—С‡РёС‚СѓС”РјРѕ РЅР°Р»Р°С€С‚СѓРІР°РЅРЅСЏ Р”Рћ С†РёРєР»Сѓ, С‰РѕР± РІРёРєРѕСЂРёСЃС‚Р°С‚Рё С—С… РїСЂРё РіРµРЅРµСЂР°С†С–С— HTML
        var showBg = Lampa.Storage.get("studio_logo_bg", true);
        var sizeEm = Lampa.Storage.get("studio_logo_size", '0.7em');
        var gapEm = Lampa.Storage.get("studio_logo_gap", '0.2em');
        var saturation = Lampa.Storage.get("studio_logo_saturation", '1');

        var html = '';
        if (movie && movie.production_companies) {
            var companies = movie.production_companies.slice(0, 3);
            companies.forEach(function (co, index) {
                var content = co.logo_path ? '<img src="https://image.tmdb.org/t/p/h100' + co.logo_path + '" title="' + co.name + '" crossorigin="anonymous" class="studio-img-check">' : '<span class="studio-logo-text">' + co.name + '</span>';
                
                // РЇРєС‰Рѕ РїС–РґРєР»Р°РґРєР° РІРёРјРєРЅРµРЅР° С– С†Рµ РЅРµ РїРµСЂС€Рµ Р»РѕРіРѕ вЂ” РґРѕРґР°С”РјРѕ Р±СѓР»С–С‚
                if (!showBg && index > 0) {
                    html += '<span style="color: rgba(255,255,255,0.4); margin: 0 ' + gapEm + '; font-size: 0.6em; display: inline-flex; align-items: center;">в—Џ</span>';
                }

                // РџСЂРёР±СЂР°РЅРѕ РєР»Р°СЃ 'selector', С‰РѕР± РЅРµ РїРµСЂРµС…РѕРїР»СЋРІР°С‚Рё С„РѕРєСѓСЃ РѕРґСЂР°Р·Сѓ РїС–Рґ С‡Р°СЃ СЂРµРЅРґРµСЂСѓ СЃС‚РѕСЂС–РЅРєРё
                html += '<div class="rate--studio studio-logo ymod-studio-item" data-id="' + co.id + '" data-name="' + co.name + '" style="display: inline-flex; vertical-align: middle;">' + content + '</div>';
            });
        }
        if (!html) return;

        // Р—РјС–РЅСЋС”РјРѕ СЃС‚РёР»С–. РЇРєС‰Рѕ РїС–РґРєР»Р°РґРєРё РЅРµРјР°С”, РІС–РґСЃС‚СѓРїРё РјС–Р¶ РµР»РµРјРµРЅС‚Р°РјРё Р±РµСЂРµ РЅР° СЃРµР±Рµ Р±СѓР»С–С‚ (margin-right РїСЂРёР±РёСЂР°С”РјРѕ)
        var bgCSS = showBg 
            ? 'background: rgba(255,255,255,0.08) !important; padding: 5px 12px !important; margin-right: ' + gapEm + ' !important;' 
            : 'background: transparent !important; border: none !important; padding: 5px 0px !important; margin-bottom: 0.2em !important;';

        var wrap = $('<div class="plugin-uk-title-combined" style="margin-top: 10px; margin-bottom: 5px; text-align: left; width: 100%; display: flex; flex-direction: column; align-items: flex-start;"><div class="studio-logos-container" style="display: flex; align-items: center; flex-wrap: wrap;">' + html + '</div></div>');
        
        var target = $(".plugin-hybrid-title", render);
        if (!target.length) target = $(".full-start-new__title", render);
        if (!target.length) target = $(".full-start__title", render);
        target.after(wrap);

        $('.rate--studio', render).css('cssText', bgCSS + ' filter: saturate(' + saturation + ');');
        $('.rate--studio img', render).css('cssText', 'height: ' + sizeEm + ' !important; filter: brightness(1) invert(0);');

        $('.studio-img-check', render).each(function() {
            var img = this;
            if (img.complete) analyzeAndInvert(img, 0.85);
            else img.onload = function() { analyzeAndInvert(img, 0.85); };
        });

        $('.rate--studio', render).on('hover:enter', function () {
            var id = $(this).data('id');
            if (id) Lampa.Activity.push({ url: 'movie', id: id, title: $(this).data('name'), component: 'company', source: 'tmdb', page: 1 });
        });

        setTimeout(function() {
            var studios = render.find('.ymod-studio-item');
            if (studios.length) {
                studios.addClass('selector');
                var current = Lampa.Controller.enabled();
                if (current && (current.name === 'full_start' || current.name === 'full_descr')) {
                    current.collection = render.find('.selector');
                }
            }
        }, 150);
    }

    function handleStudios(e) {
        var card = e.data.movie;
        var render = e.object.activity.render();
        var now = Date.now();
        var cached = studiosCache[card.id];

        if (cached && (now - cached.timestamp < 180000)) {
            renderStudiosTitle(render, cached.uk_title, cached.full_data);
        } else {
            var type = card.first_air_date ? "tv" : "movie";
            Lampa.Api.sources.tmdb.get(type + "/" + card.id + "?append_to_response=translations", {}, function (data) {
                var tr = data.translations ? data.translations.translations : [];
                var found = tr.find(function (t) { return t.iso_3166_1 === "UA" || t.iso_639_1 === "uk"; });
                var uk = found ? (found.data.title || found.data.name) : (card.title || card.name);
                studiosCache[card.id] = { uk_title: uk, full_data: data, timestamp: now };
                renderStudiosTitle(render, uk, data);
            }, function() { renderStudiosTitle(render, card.title || card.name, card); });
        }
    }
