
datetime_picker = function () {
    //// $("#datepicker-th-2").datepicker({ dateFormat: 'dd/mm/yy', isBuddhist: true, defaultDate: toDay })
    //$('.date').datepicker();
    $('.date').datetimepicker({ format: 'DD-MM-YYYY', locale: 'en', ignoreReadonly: true, });

}

InterSpaceTag = function (refNo) {
    let utmSource = sessionStorage.getItem("utmSource");
    if (utmSource != null && utmSource != '') {
        utmSource = utmSource.toLocaleLowerCase();
    } else {
        utmSource = sessionStorage.getItem("utm");
        if (utmSource != null && utmSource != '') {
            utmSource = utmSource.toLocaleLowerCase();
        }
    }
    if (utmSource == "interspace") {
        var script = document.createElement('script');
        script.innerHTML = 'var __atw = __atw || []; __atw.push({"mcn": "8d7d8ee069cb0cbbf816bbb65d56947e","param": {"result_id": "1","identifier": "' + refNo + '"}});';
        document.getElementsByTagName('head')[0].appendChild(script);

        (function (d) {
            var s = d.createElement('script');
            s.src = 'https://cv.accesstrade.in.th/js/nct/cv.js';
            s.id = 'interSpace';
            s.async = true;
            var e = d.getElementsByTagName('head')[0];
            e.parentNode.insertBefore(s, e);
        }

        )(document);
    }
}

RemoveInterSpaceTag = function () {
    var elem = document.getElementById('interSpace');
    var elemImg = document.getElementsByTagName('img')[0];

    if (elem != undefined && elemImg != undefined) {
        elem.parentNode.removeChild(elem);
        elemImg.parentNode.removeChild(elemImg);
    }
}

InsertAdvtTag = function (product, thxPage = null) {
    let utmSource = sessionStorage.getItem("utmSource");
    if (utmSource != null && utmSource != '') {
        utmSource = utmSource.toLocaleLowerCase();
    } else {
        utmSource = sessionStorage.getItem("utm");
        if (utmSource != null && utmSource != '') {
            utmSource = utmSource.toLocaleLowerCase();
        }
    }
    product = product.toLocaleLowerCase();
    if (thxPage == null) {
        if (utmSource == "rf_google") {
            if (product == "pc") {
                var scriptAsync = document.createElement('script');
                scriptAsync.async = true;
                scriptAsync.src = "https://www.googletagmanager.com/gtag/js?id=AW-797449345";
                document.getElementsByTagName('head')[0].appendChild(scriptAsync);

                var script = document.createElement('script');
                script.id = "AdvtTag"
                script.innerHTML = "window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'AW-797449345');";
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }

        if (utmSource == "rf_facebook") {
            var script = document.createElement('script');
            script.id = "AdvtTag"
            if (product == "pc") {
                script.innerHTML = "!function(f,b,e,v,n,t,s)\
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};\
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\
            n.queue=[];t=b.createElement(e);t.async=!0;\
            t.src=v;s=b.getElementsByTagName(e)[0];\
            s.parentNode.insertBefore(t,s)}(window,document,'script',\
            'https://connect.facebook.net/en_US/fbevents.js');\
            fbq('init', '420250538472828'); \
            fbq('track', 'PageView');";
                document.getElementsByTagName('head')[0].appendChild(script);
                (document);
            }

        }
    }

    if (thxPage != null) {
        if (utmSource == "rf_google") {
            if (product == "pc") {
                var scriptAsync = document.createElement('script');
                scriptAsync.async = true;
                scriptAsync.src = "https://www.googletagmanager.com/gtag/js?id=AW-797449345";
                document.getElementsByTagName('head')[0].appendChild(scriptAsync);

                var script = document.createElement('script');                
                script.id = "AdvtTag"
                script.innerHTML = "window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'AW-797449345');";
                document.getElementsByTagName('head')[0].appendChild(script);

                var script = document.createElement('script');                
                script.id = "AdvtTag"
                script.innerHTML = "gtag('event', 'conversion', {'send_to': 'AW-797449345/Ycp3CPzsx4UBEIG5oPwC'});"
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }

        if (utmSource == "rf_facebook") {
            if (product == "pc") {
                var script = document.createElement('script');
                script.id = "AdvtTag"
                script.innerHTML = "!function(f,b,e,v,n,t,s)\
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\
                 n.callMethod.apply(n,arguments):n.queue.push(arguments)};\
                 if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\
                 n.queue=[];t=b.createElement(e);t.async=!0;\
                t.src=v;s=b.getElementsByTagName(e)[0];\
                s.parentNode.insertBefore(t,s)}(window,document,'script',\
                'https://connect.facebook.net/en_US/fbevents.js');\
                fbq('init', '420250538472828'); \
                fbq('track', 'PageView');\
                fbq('track', 'Lead');";
                document.getElementsByTagName('head')[0].appendChild(script);
                (document);
            }
        }
    }
}

RemoveAdvtTag = function () {
    var elem = document.getElementById('AdvtTag');

    if (elem != undefined) {
        elem.parentNode.removeChild(elem);
    }
}
