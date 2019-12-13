/*
 Eklenti Samet Özden tarafından yazılmıştır. 2020.
 https://twitter.com/ricinus_
 */

var arrx = [
    ['Tarih', 'Fiyat']
];

function extractDomain(url) {
    var domain;
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }
    domain = domain.split(':')[0];
    domain = domain.replace("www.", "");
    return domain;
}


var allows = ["vatanbilgisayar.com", "mediamarkt.com.tr"];

chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    var urix = tabs[0].url;
    var dmn = extractDomain(urix);

    if ((allows.indexOf(extractDomain((urix))) != -1 || allows.indexOf(extractDomain((urix))) != -1)) {
        $.ajax({
            type: "GET",
            url: "https://www.sametozden.com/fiyatdedektifi/fd.php",
            data: "domain=" + encodeURIComponent(dmn) + "&uri=" + encodeURIComponent(urix),
            beforeSend: function () {
                //$("#chart").css("display", "none");
                $(".alert.info").css("display", "block");
                $(".alert.info").html("Veriler alınıyor, lütfen bekleyin...");
            },
            success: function (data) {
                if (data != "") {
                    $(".alert").css("display", "none");
                    $("#chart").attr("style", "width: 650px; height: 400px;");

                    result = JSON.parse(data);
                    for (var k in result) {
                        arrx.push([result[k]['date'], parseInt(result[k]['price'])]);
                    }

                    google.charts.load('current', {'packages': ['corechart']});
                    google.charts.setOnLoadCallback(drawChart);

                    function drawChart() {
                        var data = google.visualization.arrayToDataTable(
                                arrx
                                );

                        var options = {
                            title: tabs[0].title + ' - Ürün Fiyat Geçmişi',
                            curveType: 'none',
                            legend: {position: 'bottom'},
                            chartArea: {
                                left: 50,
                                top: 50,
                                width: 570,
                                height: 250
                            }
                        };

                        var chart = new google.visualization.LineChart(document.getElementById('chart'));

                        chart.draw(data, options);
                    }

//////////////////////////////

                } else {
                    $(".alert").css("display", "none");
                    $(".alert.danger").css("display", "block");
                    $(".alert.danger").html("Ürüne ait veri bulunamadı. Üzgünüm. :'(");
                }
            },
            error: function (xhr) {
                $(".alert").css("display", "none");
                $(".alert.danger").css("display", "block");
                $(".alert.danger").html("Veriler alınırken hata meydana geldi. :'(");

            },
            complete: function () {
            }
        });


    } // allows
    else {
        $(".alert.danger").css("display", "block");
        $(".alert.danger").html("Eklenti bu sitede çalışmamaktadır.");
    }

});