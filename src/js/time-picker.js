var pickuptime = {
    init: function(a, b) {
        this.setuptime = a;
        this.run(b)
    },
    destroy:function(){

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
                e.push("今天" + b + "月" + j + "日")
            } else {
                if (c == 1) {
                    g.setDate(g.getDate() + 1);
                    b = g.getMonth() + 1;
                    j = g.getDate();
                    e.push(b + "月" + j + "日")
                } else {
                    if (c == 2) {
                        g.setDate(g.getDate() + 1);
                        b = g.getMonth() + 1;
                        j = g.getDate();
                        e.push(b + "月" + j + "日")
                    } else {
                        g.setDate(g.getDate() + 1);
                        b = g.getMonth() + 1;
                        j = g.getDate();
                        e.push(b + "月" + j + "日" + a[f])
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
    t1HtmlMethod: function(t1Num){
    	var _t1Html = '';
    	for(var k = 0; k < 12; k++){
        	if (k == 0 && t1Num<24){
				_t1Html += "<li class='spickuptime spickuptime-on'>" + this.todoble(t1Num) + "</li>"
        	}else if(t1Num+2*k<24){
        		_t1Html += "<li class='spickuptime'>" + this.todoble(t1Num+2*k) + "</li>"
        	}
    	}
    	return _t1Html;
    },
    t2HtmlMethod: function(t2Num){
    	var _t2Html = '';
    	for(var k = 0; k < 4; k++){
        	if (k == 0 && t2Num<24){
				_t2Html += "<li class='pickuptime pickuptime-on'>" + this.todoble(t2Num+1) + "</li>"
        	}else if(t2Num+2+2*k<24){
        		_t2Html += "<li class='pickuptime'>" + this.todoble(t2Num+1+2*k) + "</li>"
        	}
    	}
    	return _t2Html;
    },
    createHtmlMethod: function(c,t1Num,t2Num){
    	var t1 = this.t1HtmlMethod(t1Num);
    	var t2 = this.t2HtmlMethod(t2Num);
    	var e = "<div id='pickuptimeContener'><div class='pickuptime-close-empty'></div><div id='pickuptime'><p class='pickuptime-title'><div class='pickuptime-title-date-text'>日期</div><div class='pickuptime-title-time-text'>时间</div></p><div class='pickuptime-box clearfix'><div class='pickuptime-data float_left'><p class='pickuptime-datap pickuptime-data-on'>" + c[0] + "</p><p class='pickuptime-datap'>" + c[1] + "</p><p class='pickuptime-datap'>" + c[2] + "</p></div>";
    	e += "<div class='scroll-pbox float_left'><ul id='t1' class='t1'>" + t1 + "</ul></div><div class='scroll-pbox float_left'><ul id='t2' class='t2'>" + t2 + "</ul></div></div><div class='pickuptime-close'>关闭</div></div>";
    	return e;
    },
    run: function(f) {
        var c = this.marketgetTime();
        // console.log('run c:',c)
        var a = "",a2 = "",_this = this,g = 0;
        var e = this.createHtmlMethod(c,c[3]+1,c[3]+1);

        if ($("#pickuptimeContener").length > 0) {
            $("#pickuptimeContener").remove()
        }
        $(".timePickerCon").append(e);
        // var d = $(window).height() - $(".pickuptime-title").offset().top;
        // $(".pickuptime-close-empty").css("height", d + "px");
        $(".pickuptime-close-empty,.pickuptime-close").on("click", function() {
            $("#pickuptimeContener").remove()
            $(".timePickerCon").empty()
        });
        $("#pickuptimeContener").on("click",".pickuptime-datap", function() {
            g = $(this).index();
            $("ul.t1,ul.t2").html("");
            if (g != 0) {
	            var t1Html = _this.t1HtmlMethod(0)
                $("ul.t1").html(t1Html)
            } else {
            	var t1Html = _this.t1HtmlMethod(c[3])
                $("ul.t1").html(t1Html)
            }
            $(this).addClass("pickuptime-data-on").siblings().removeClass("pickuptime-data-on")
        	event.stopPropagation();
        });
        $("#pickuptimeContener").on("click",".spickuptime",function(event){
        	$(this).addClass("spickuptime-on").siblings().removeClass("spickuptime-on");
        	var t2h = $(this).text().split(":")[0];
        	$("ul.t2").html("");
        	var _t2Html = _this.t2HtmlMethod(Number(t2h));
        	$("ul.t2").html(_t2Html);
        	event.stopPropagation();
        })
        $("#pickuptimeContener").on("click",".pickuptime", function(event) {
            $(this).addClass("pickuptime-on").siblings().removeClass("pickuptime-on");
            var Str = $(".pickuptime-data-on").text() + " " + $(".spickuptime-on").text() + " " + $(".pickuptime-on").text();
            // $(".pickuptime-close-empty").click();
            $("#pickuptimeContener").remove()
            event.stopPropagation();
            if (Object.prototype.toString.call(f) === "[object Function]") {
                f(Str)
            } else {
                return false
            }
        })
    }
};
