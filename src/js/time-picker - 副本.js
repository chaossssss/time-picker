var pickuptime = {
    init: function(a, b) {
        this.setuptime = a;
        this.run(b)
    },
    marketgetTime: function() {
        var k = this.setuptime;
        var g = new Date();
        g.setDate(g.getDate() + k);
        var h = g.getDay();
        var l = g.getHours();
        var f = parseInt(h);
        var d = "";
        var a = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var e = new Array();
        var b, j;
        for (var c = k; c < 3 + k; c++) {
            if (f == 7) {
                f = 0
            }
            if (c == 0) {
                b = g.getMonth() + 1;
                j = g.getDate();
                e.push("今天" + b + "月" + j + "日 ")
            } else {
                if (c == 1) {
                    g.setDate(g.getDate() + 1);
                    b = g.getMonth() + 1;
                    j = g.getDate();
                    e.push(b + "月" + j + "日 ")
                } else {
                    if (c == 2) {
                        g.setDate(g.getDate() + 1);
                        b = g.getMonth() + 1;
                        j = g.getDate();
                        e.push(b + "月" + j + "日 ")
                    } else {
                        g.setDate(g.getDate() + 1);
                        b = g.getMonth() + 1;
                        j = g.getDate();
                        e.push(b + "月" + j + "日 " + a[f])
                    }
                }
            }
            f++;
            j++
        }
        e.push(l);
        return e
    },
    todoble: function(a) {
        if (a < 10) {
            a = "0" + a + ":00"
        } else {
            a = a + ":00"
        }
        return a
    },
    t1HtmlMethod: function(){

    },
    t2HtmlMethod: function(){

    },
    createHtmlMethod: function(){

    },
    run: function(f) {
        var c = this.marketgetTime();
        console.log('run c:',c)
        var a = "",a2 = "",_this = this;
        for (var b = 0; b < 24; b+=2) {
            if (b <= c[3]) {
                a += "<li class='spickuptime pickuptime-sp hide'>" + this.todoble(b) + "</li>"
            } else {
                if (b == Number(c[3]) + 1) {
                    a += "<li class='spickuptime pickuptime-on'>" + this.todoble(b) + "</li>"
                } else {
                    a += "<li class='spickuptime'>" + this.todoble(b) + "</li>"
                }
            }
        }
    	function t2Html(_t2h){
    		var _a2 = '';
	    	for(var k = 0; k < 4; k++){
	        	if (k == 0 && _t2h<24){
					_a2 += "<li class='pickuptime pickuptime-on'>" + _this.todoble(_t2h+2) + "</li>"
	        	}else if(_t2h+2+2*k<24){
	        		_a2 += "<li class='pickuptime'>" + _this.todoble(_t2h+2+2*k) + "</li>"
	        	}
	    	}
	    	return _a2;
    	}
    	a2 = t2Html(c[3]);
        var e = "<div id='pickuptimeContener'><div class='pickuptime-close-empty'></div><div id='pickuptime'><p class='pickuptime-title'><div class='pickuptime-title-date-text'>日期</div><div class='pickuptime-title-time-text'>时间</div></p><div class='pickuptime-box'><div class='pickuptime-data'><p class='pickuptime-datap pickuptime-data-on'>" + c[0] + "</p><p class='pickuptime-datap'>" + c[1] + "</p><p class='pickuptime-datap'>" + c[2] + "</p></div>";
        e += "<ul id='t1' class='t1'>" + a + "</ul><ul id='t2' class='t2'>" + a2 + "</ul></div><div class='pickuptime-close'>关闭</div></div>";
        if ($("#pickuptimeContener").length > 0) {
            $("#pickuptimeContener").remove()
        }
        $(".timePickerCon").append(e);
        var d = $(window).height() - $(".pickuptime-title").offset().top;
        $(".pickuptime-close-empty").css("height", d + "px");
        $(".pickuptime-close-empty,.pickuptime-close").on("click", function() {
            $("#pickuptimeContener").remove()
        });
        $(".pickuptime-datap").on("click", function() {
            var g = $(this).index();
            if (g != 0) {
                $(".pickuptime-sp").show()
                $("ul.t2").html("");
            } else {
                $(".pickuptime-sp").hide()
            }
            $(this).addClass("pickuptime-data-on").siblings().removeClass("pickuptime-data-on")
        });
        $(".spickuptime").on("click",function(){
        	$(this).addClass("pickuptime-on").siblings().removeClass("pickuptime-on");
        	var t2h = $(this).text().split(":")[0];
        	$("ul.t2").html("");
        	var _t2Html = t2Html(Number(t2h));
        	$("ul.t2").html(_t2Html);
        })
        $(".pickuptime").on("click", function() {
            $(this).addClass("pickuptime-on").siblings().removeClass("pickuptime-on");
            var g = $(".pickuptime-data-on").text() + " " + $(".pickuptime-on").text();
            $(".pickuptime-close-empty").click();
            if (Object.prototype.toString.call(f) === "[object Function]") {
                f(g)
            } else {
                return false
            }
        })
    }
};
