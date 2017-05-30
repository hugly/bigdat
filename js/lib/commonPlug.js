/**
 * Created by huaha on 2016/9/23.
 */
/*==============================jquery插件=================================*/
(function($){
    $.extend({
        //$.message({
        //    type:"warning",
        //    skin:1,
        //    str:"错误信息提示",
        //    subCallback:func(){},
        //    cancelcallback:func(){}.
        //});


        //信息提示框
        // type  可选择为成功（success）、错误(error)、信息(info)、警告(warning) skin 等于0 时没有warning类型
        // skin  可选择为0（不带关闭按钮的提示框）  1(带关闭按钮的提示框)
        message: function (settings) {
            var type            =   settings.type || "success",
                skin            =   settings.skin || 0,
                str             =   settings.str  || "信息提示",
                title           =   settings.title || "提示框",
                subCallback     =   settings.subCallback || null,
                cancelcallback  =   settings.cancelcallback || null,
                closeCallback   =   settings.closeCallback || null,
                setTime         =   settings.setTime || 500,
                cancelText      =   settings.cancelText || "取消",
                subText         =   settings.subText || "确定";


            var message = {
                zoom: null,
                main: null,
                //初始化
                init: function () {
                    if (skin == 0) {
                        this.createDomType0()
                    }
                    if(skin==1){
                        this.createDomType1(); // confirm框
                    }
                    if(skin==2){
                        this.createDomType2(); //alert框
                    }

                },
                //创建外层遮罩层
                createZoom: function () {
                    this.zoom = $("<div></div>");
                    var topcss = {
                        position: "fixed",
                        left: "0px",
                        top: "0px",
                        width: "100%",
                        height: "100%",
                        "z-index": 99998,
                        "background-color": "rgba(0, 0, 0, 0.2)"
                    };
                    this.zoom.css(topcss);
                    $("body").append(this.zoom);
                },
                //创建skin0
                createDomType0: function () {

                    //this.createZoom();

                    var oI = $("<span class='iconfont'></span>"),
                        oSpan = $("<span>" + str + "</span>");


                    var color = "#09f",
                        positon = "" || "0px 0px";
                    this.main = $("<div id='mainMessage'></div>");


                    switch (type) {
                        case "success":
                            color="#20bf4d";
                            oI.addClass("icon-chenggong");
                            break;
                        case "error":
                            color="#ff4400";
                            oI.addClass("icon-quxiao1");
                            break;
                        case "info":
                            color="#347fc1";
                            oI.addClass("icon-i");
                            break;
                        case "warning":
                            color="#f2b809";
                            oI.addClass("icon-jinggao");
                            break;
                    }

                    var css = {
                            position: "fixed",
                            left: "50%",
                            top: "100px",
                            height: "20px",
                            padding:"20px 0",
                            "margin-top": "-15px",
                            "margin-left": "-80px",
                            "line-height": "30px",
                            "text-align": "center",
                            "border-radius": "5px",
                            "z-index": "99999",
                            "overflow": "hidden",
                            "background":"#353545",
                            "opacity": 0
                        },
                        iCss = {
                            "display":"inline-block",
                            "width": "20px",
                            "height": "20px",
                            "line-height":"20px",
                            "text-align":"center",
                            "margin": "0 10px",
                            "border-radius": "50%",
                            "background-color":color,
                            color:"#fff",
                            "font-size":"12px"
                        },
                        spanCss = {
                            "display": "inline-block",
                            "height": "20px",
                            "line-height": "20px",
                            "text-align": "left",
                            "overflow": "hidden",
                            "color":"#fff",
                            "margin-right":"10px",
                            "vertical-align": "middle"
                        };

                    this.main.css(css);

                    oI.css(iCss);
                    oSpan.css(spanCss);
                    this.main.append(oI).append(oSpan);

                    //this.zoom.append(this.main);
                    if($("body").find("#mainMessage").length === 0){
                        $("body").append(this.main);
                    }

                    var _this = this;
                    this.main.css({
                        "margin-left":-parseInt(oSpan.css("width"))/2
                    });
                    this.main.animate({
                        "top": "120px",
                        "opacity": 1
                    }, setTime, function () {
                        setTimeout(function () {
                            _this.main.animate({
                                "top": "100px",
                                "opacity": 0
                            }, setTime, function () {
                                _this.main.remove();
                                subCallback && subCallback();
                            });
                        }, setTime*2)
                    })


                },
                //创建skin1
                createDomType1: function () {
                    this.createZoom();

                    this.main = $("<div></div>");
                    var color="#09f",
                        oTitle=$("<div><h3 style='float: left; height: 50px; line-height: 50px; padding-left: 20px; font-weight: normal; color: #5a5a5d;'>"+title+"</h3></div>"),
                        oCon=$("<div></div>"),
                        oPer=$("<div><a href='javascript:;' class='cancel-btn' style=' display:inline-block; width: 84px; height: 32px; margin: 14px 20px 14px 0; line-height: 32px; text-align: center; color: #fff; background-color: #9e9ea6;'>"+cancelText+"</a><a href='javascript:;' class='ok-btn'style=' display:inline-block; width: 84px; height: 32px; line-height: 32px; margin: 14px 20px 14px 0; text-align: center; color: #fff; background-color: #f40;'>"+subText+"</a></div>"),
                        oI = $("<i class='iconfont'></i>"),
                        oSpan = $("<span>" + str + "</span>"),
                        oA = $("<a href='javascript:;' class='iconfont icon-quxiao1 close-btn'></a>");

                    switch (type) {
                        case "success":
                            color="#20bf4d";
                            oI.addClass("icon-chenggong");
                            break;
                        case "error":
                            color="#ff4400";
                            oI.addClass("icon-guanbi");
                            break;
                        case "info":
                            color="#347fc1";
                            oI.addClass("icon-i");
                            break;
                        case "warning":
                            color="#f2b809";
                            oI.addClass("icon-jinggao");
                            break;
                    }

                    var css = {
                            position: "fixed",
                            left: "50%",
                            top: "50%",
                            width: "510px",
                            height: "240px",
                            "margin-top": "-120px",
                            "margin-left": "-255px",
                            "line-height": "30px",
                            "text-align": "center",
                            "border-radius": "5px",
                            "background-color": "#fff",
                            "z-index": "99999",
                            "overflow": "hidden",
                            "opacity": 1,
                            "box-shadow": "0 0 10px rgba(0,0,0,.4)"
                        },
                        oTitleCss={
                            height:"50px",
                            "background-color":"#eee",
                            position:"relative",
                            overflow:"hidden"
                        },
                        oConCss={
                            height:"130px",
                            position:"relative",
                            overflow:"hidden",
                            display:"table"
                        },
                        oPerCss={
                            height:"60px",
                            "border-top":"1px solid #eee",
                            position:"relative",
                            overflow:"hidden",
                            "text-align":"right"
                        },
                        iCss = {
                            "float": "left",
                            "width": "64px",
                            "height": "64px",
                            "line-height":"64px",
                            "text-align":"center",
                            "border-radius":"50%",
                            "margin": "33px 20px 33px 33px",
                            "color":"#fff",
                            "font-size":"30px",
                            "background":color
                        },
                        spanCss = {
                            "display":"table-cell",
                            "vertical-align":"middle",
                            "width": "400px",
                            "margin": "24px 0",
                            "padding-right":"20px",
                            "text-align": "left",
                            "overflow": "hidden"
                        },
                        aCss = {
                            float: "right",
                            width: "50px",
                            height: "50px",
                            "line-height":"50px",
                            "text-align":"center",
                            color:"#5a5a5d"
                        };

                    this.main.css(css);
                    oI.css(iCss);
                    oSpan.css(spanCss);
                    oA.css(aCss);
                    oTitle.css(oTitleCss);
                    oCon.css(oConCss);
                    oPer.css(oPerCss);

                    oTitle.append(oA);
                    oCon.append(oI).append(oSpan);
                    this.main.append(oTitle).append(oCon).append(oPer);

                    this.zoom.append(this.main);

                    var _this = this;

                    oPer.on("click",".ok-btn",function(){
                        _this.zoom.remove();
                        subCallback && subCallback();
                    });
                    oPer.on("click",".cancel-btn",function(){
                        _this.zoom.remove();
                        cancelcallback && cancelcallback();
                    });
                    oA.on("click", function () {
                        _this.zoom.remove();
                        closeCallback && closeCallback();
                    });
                },
                createDomType2: function(){
                    this.createDomType1();
                    this.zoom.find('.cancel-btn').remove();
                    this.zoom.find('.close-btn').remove();
                }
            };
            message.init();
        }
    });

    /*---------------分页方法的使用------------------*/
    //$('.pagination').pagination(
    //    {
    //        totalItems:page.totalItems,         数据总条数
    //        currentPage:page.currentPage,       当前页数
    //        numPages:page.numPages,             显示多少页（页码数，多出的省略号）
    //        pageSize:page.pageSize,             每页条数
    //        jumpBtn:page.jumpBtn,               是否拥有调转按钮
    //        callback:callback                   回调函数
    //    }
    //);

    $.fn.pagination=function(options){
        var $othis  = $(this);    //把dom的query对象放入全局
        var opts = options;
        var defaults={            //默认参数
            totalItems: 10,
            currentPage: 1,
            numPages: 5,
            pageSize: 10,
            jumpBtn:false,
            callback:""
        };

        var options=$.extend(defaults,opts);
        var parseParam=['totalItems','currentPage','numPages','pageSize'];
        for(var i=0;i<parseParam.length;i++){
            var key = parseParam[i];
            options[key]=parseInt(options[key]);
            if(!options[key] || isNaN(options[key])){
                console.log("----参数有误或总数为0---"+key+':'+options[key]);
                $othis.html('');
                return;
            }
        }
        var pageNum = parseInt(options.totalItems)%parseInt(options.pageSize)? parseInt(options.totalItems/options.pageSize+1):parseInt(options.totalItems/options.pageSize); //总页数
        var pagination={
            /**
             * 创建打dom
             * @returns
             */

            createDom:function(){
                //if(pageNum<=0||options.totalItems<options.pageSize || options.currentPage>pageNum){return};
                //当总页数小于当前单页容量
                if(pageNum<=0){return};
                options.currentPage=options.currentPage>pageNum?1:options.currentPage;
                //总页数小于显示的页码数 (不加省略号)
                var oul =$('<ul></ul>');
                var oli="";
                if(0<pageNum && pageNum<=options.numPages+1){
                    for(var i=1;i<=pageNum;i++){
                        oli += '<li>'+i+'</li>';
                    }
                    oul.append(oli);
                    //  当前页加上页码数大于总页数加（最后几页）
                }else if((options.currentPage+options.numPages)>pageNum){
                    for(var i=0;i<options.numPages;i++){
                        oli = '<li>'+(pageNum-i)+'</li>'+oli;
                    }
                    if((pageNum-options.numPages+1)>2){
                        oli='<li>1</li><span class="more">...</span>'+oli;
                    }
                    oul.append(oli);
                }
                //  当前页处于中间
                else{
                    var num = parseInt(options.numPages%2?(options.numPages/2+1):options.numPages/2);
                    for(var i=1;i<=options.numPages;i++){
                        if((options.currentPage-num)>=0){
                            oli+='<li>'+(options.currentPage-num+i)+'</li>'
                        }else{
                            oli+='<li>'+i+'</li>'
                        }
                    }
                    if((options.currentPage-num+1)>2){
                        oli='<li>1</li><span class="more">...</span>'+oli;
                    }
                    var span = $('<span class="more">...</span>');
                    oul.append(oli);
                    oul.append(span);
                    if((options.currentPage+1)<pageNum){
                        oul.append('<li>'+pageNum+'</li>');
                    }
                }
                var prev = $('<span class="prev_page">&lt;</span>');
                var next = $('<span class="next_page">&gt;</span>');
                oul.append(next);
                oul.prepend(prev);
                oul.find('li').each(function(){
                    var value = $(this).html();
                    if(options.currentPage==value){
                        $(this).css({'color':'#ffffff','background':'#9e9ea6'});
                    }else{
                        $(this).hover(function(){
                            $(this).css('background','#ececec');
                        },function(){
                            $(this).css('background','none');
                        });
                    }
                });
                if(options.jumpBtn){
                    var span  = $("<span class='jump'><input type='text' onkeyup='this.value=this.value.replace(/\\D|^0/gi,\"\")' /><button class='jumpBtn'>跳转</button></span>");
                    oul.append(span);
                }
                this.addCss(oul);
                this.clickEvent(oul);
                $othis.html(oul[0]);
            },
            /**
             * 页码点击事件
             * @param oul 分页对象
             */
            clickEvent:function(oul){
                var prev = oul.find('.prev_page');
                var next = oul.find('.next_page');
                var oli =  oul.find('li');
                var jumpBtn = oul.find('.jumpBtn');
                if(options.currentPage==1){
                    prev.css('cursor','default');
                }
                if(options.currentPage==pageNum){
                    next.css('cursor','default');
                }
                prev.click(function(){                           //上一页
                    if(options.currentPage==1){return};
                    options.currentPage--;
                    if(typeof options.callback =="function"){
                        options.callback(options.currentPage);
                    }
                });
                next.click(function(){
                    if(options.currentPage==pageNum){return};  //下一页
                    options.currentPage++
                    if(typeof options.callback =="function"){
                        options.callback(options.currentPage);
                    }
                });
                oli.click(function(){
                    var nowPage = parseInt($(this).html());      //点击页码
                    if(nowPage==options.currentPage){
                        return;
                    }
                    options.currentPage=nowPage;
                    if(typeof options.callback =="function"){
                        options.callback(options.currentPage);
                    }
                });
                jumpBtn.click(function(){
                    var val = $(this).parent('.jump').find("input").val();

                    if(!val || isNaN(val) || val==options.currentPage || val>pageNum){
                        $.message({
                            type:'info',
                            str:'请输入正确的页码数'
                        });
                        return;
                    }
                    if(typeof options.callback =="function"){
                        options.callback(val);
                    }
                });
            },
            /**
             * 添加样式
             * @param oul
             */
            addCss:function(oul){
                oul.css({
                    'margin':'0px',
                    'padding':'0px',
                    'overflow':'auto'
                });
                oul.find('li').css({
                    'float':'left',
                    'borderRadius':'2px',
                    'listStyle':'none',
                    'minWidth':'25px',
                    'height':'25px',
                    'textAlign':'center',
                    'lineHeight':'25px',
                    'margin':'0 5px',
                    'cursor':'pointer'
                });
                oul.find('.more').css({
                    'float':'left',
                    'width':'25px',
                    'height':'25px',
                    'lineHeight':'16px',
                    'display':'inline-block',
                    'textAlign':'center'
                });
                oul.find('.prev_page,.next_page').css({
                    'float':'left',
                    'height':'25px',
                    'textAlign':'center',
                    'lineHeight':'25px',
                    'fontWeight':'bold',
                    'margin':'0px 10px',
                    'cursor':'pointer',
                    'fontSize':'16px',
                    'color':'#bcbbc7'
                });
                oul.find('input').css({
                    'margin':'0px 5px',
                    'width':'50px',
                    'border':'1px solid #999',
                    'borderRadius':'2px',
                    'background':'#fff',
                    'height':'20px'
                });
                oul.find('.jumpBtn').css(
                    {
                        'borderRadius':'2px',
                        'background':'#ececec',
                        'border':'1px solid #999',
                        'width':'50px',
                        'height':'24px',
                        'cursor':'pointer'
                    }
                );
                oul.find('.jumpBtn').hover(function(){
                   $(this).css({color:'#fff',background:'#f40','border':'none'});
                },function(){
                  $(this).css({color:'#000',background:'#ececec','border':'1px solid #999'});
                });
            }
        }
        pagination.createDom();
    };

    /*---------------自适应高度----------------------*/
    //top:需要减去的高度
    //height:容器的总高度
    $.fn.autoHeight=function(options){
        var top = parseInt(options.top || 0);
        var height = parseInt(options.height || window.innerHeight);
        var autoHeight = height-top;
        $(this).height(autoHeight);
    }
    $.fn.autoWidth=function(options){
        var right = parseInt(options.marginRight || 0);
        var left = parseInt(options.marginLeft || 0);
        var border = parseInt(options.border || 0);
        var num = parseInt(options.num || 0);
        var oWidth = options.parentsObj.width();
        $(this).css({width:(oWidth-((right+left+border*2)*num))/num,marginRight:right,marginLeft:left});
    }

    /*---------------拖拽----------------------*/
    //element:需要拖动的dom对象
    $.fn.Drag=function(element){
        var element = element|| $(this) ;
        $(this).mousedown(function(ev){
            var marginLeft=element.css('marginLeft') || 0;
            var marginTop=element.css('marginTop') || 0;
            var disX=ev.clientX-element.offset().left;
            var disY=ev.clientY-element.position().top;

            function dragMove(ev){
                var l=ev.clientX-disX-parseFloat(marginLeft);
                var t=ev.clientY-disY-parseFloat(marginTop);
                if(l<=-(element.width()-100+parseFloat(marginLeft))){l=-(element.width()-100+parseFloat(marginLeft))}
                var Left=window.innerWidth;
                var Top=window.innerHeight;
                if(l>(Left-50)){l=(Left-50)}
                if(t<=0){t=0}
                if(t>(Top-50)){t=(Top-50)}
                element.css({left: l+'px', top: t+'px'});
            }

            function dragUp(){
                $(document).unbind('mousemove', dragMove);
                $(document).unbind('mouseup', dragUp);
            }
            $(document).bind('mousemove',dragMove);
            $(document).bind('mouseup',dragUp);
            return false;
        });
    }
    //展示loading
    $.fn.showKyLoading=function(){
        var odiv = $('<div class="ky-loading"></div>');
        var oimg = $('<img src="../../../images/loading.gif"/>');
        var idiv = $('<div>数据加载中，请稍后...</div>');
        idiv.css({
            marginTop:10
        });
        odiv.css({
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop:-45,
            marginLeft: -75,
            width:150,
            textAlign:'center'
        });
        odiv.append(oimg).append(idiv);
        $(this).append(odiv);
    }
    //隐藏loading
    $.fn.hideKyLoading=function(){
        $('.ky-loading').remove();
    }

    /*---------------------------圆形进度条-----------------------------*/
    $.extend({ //** -------- 圆形进度条jquery插件 --------------------
        kyCircularProgress:{
            /**
             * 初始化进度条  在body中添加circularProgressBox元素
             */
            init:function(){
                var circularProgress=$("<div class='circularProgressOpa'></div><div class='circularProgressBox'> <div class='circularProgressBar'> <div class='circularProgressItem'> <div class='circularProgressCircleItem  circularProgressLeftCircle'></div> </div> <div class='circularProgressItem'> <div class='circularProgressCircleItem  circularProgressRightCircle'></div> </div> <div class='circularProgressText' > <div class='circularProgressText1'>正在上传</div> <div class='circularProgressText2'></div> </div> </div> <div class='circularProgressCancel'>取消上传</div> </div>");

                $('body').append(circularProgress);

                $('.circularProgressOpa').css({
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    left:'0',
                    top:'0',
                    zIndex: 1001,
                    background:'#000',
                    opacity:'0.6',
                    display:'none'
                });
                $('.circularProgressBox').css({
                    width: 80,
                    height: 200,
                    position: 'fixed',
                    top: 200,
                    left: '50%',
                    marginLeft: -40,
                    zIndex: 1001,
                    display:'none'
                });
                $('.circularProgressBar').css({
                    width: '80px',
                    height: '80px',
                    position: 'relative'
                });
                $('.circularProgressItem').css({
                    width: '40px',
                    height: '80px',
                    position: 'absolute',
                    top: '0',
                    overflow: 'hidden'
                });
                $('.circularProgressItem:eq(0)').css({
                    left: '0'
                });
                $('.circularProgressItem:eq(1)').css({
                    left: '40px'
                });
                $('.circularProgressCircleItem').css({
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    border: '5px solid transparent',
                    position: 'absolute',
                    top: '0',
                });
                $('.circularProgressLeftCircle').css({
                    borderBottom: '5px solid #fff',
                    borderRight: '5px solid #fff',
                    transform: 'rotate(-45deg)',
                    left: '0'
                });
                $('.circularProgressRightCircle').css({
                    borderTop: '5px solid #fff',
                    borderLeft: '5px solid #fff',
                    transform: 'rotate(-45deg)',
                    right: '0'
                });
                $('.circularProgressText').css({
                    width: '80px',
                    height: '58px',
                    textAlign: 'center',
                    position: 'absolute',
                    fontSize: '12px',
                    top: '24px',
                    left: '0'
                });
                $('.circularProgressText1').css({
                    width: '100%',
                    height: '20px',
                    lineHeight: '20px',
                    color: '#fff'
                });
                $('.circularProgressText2').css({
                    width: '100%',
                    height: '20px',
                    lineHeight: '20px',
                    color: '#fff'
                });
                $('.circularProgressCancel').css({
                    width: 80,
                    lineHeight: '50px',
                    color: '#fff',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontSize: '12px',
                });
            },

            /**
             *  文件上传中
             * @param percentage 文件上传进度
             * @cancel cancel 取消上传函数
             */
            uploading:function(percentage,cancel){
                $('.circularProgressOpa,.circularProgressBox').css({
                    display:'block'
                });
                if(percentage<=0.5){
                    $('.circularProgressRightCircle').css('transform',"rotate("+(-45+percentage*360)+"deg)")
                }else{
                    $('.circularProgressRightCircle').css('transform',"rotate(135deg)");
                    $('.circularProgressLeftCircle').css('transform',"rotate("+(-45+(percentage-0.5)*360)+"deg)")
                }
                $('.circularProgressText2').html(parseInt(percentage*100)+'%');
                $('.circularProgressCancel').click(function(){
                    cancel();
                    $('.circularProgressOpa,.circularProgressBox').css({
                        display:'none'
                    });
                    $('.circularProgressRightCircle').css('transform',"rotate(-45deg)");
                    $('.circularProgressLeftCircle').css('transform',"rotate(-45deg)");
                })
            },

            /**
             *  文件上传成功
             */
            success:function(){
                $('.circularProgressText1').html('上传完成');
                $('.circularProgressRightCircle').css('transform',"rotate(135deg)");
                $('.circularProgressLeftCircle').css('transform',"rotate(135deg)");
                $('.circularProgressText2').html('100%');
                setTimeout(function(){
                    $('.circularProgressOpa,.circularProgressBox').css({display:'none'});
                    $('.circularProgressRightCircle').css('transform',"rotate(-45deg)");
                    $('.circularProgressLeftCircle').css('transform',"rotate(-45deg)");
                },500)
            },

            ///**
            // * 取消上传
            // */
            //cancel:function(){
            //
            //},

            /**
             * 上传失败
             */
            error:function(){
                $('.circularProgressText1').html('上传失败');
                $('.circularProgressOpa,.circularProgressBox').css({
                    display:'none'
                });
                $('.circularProgressRightCircle').css('transform',"rotate(-45deg)");
                $('.circularProgressLeftCircle').css('transform',"rotate(-45deg)");
            }

        }
    })



})(jQuery);


//ajax
AJAX = {
    url: "http://123.207.7.73:8012/", //固定地址
    ajax:function(opt){
        var url = this.url + opt.url,
            data = opt.data || {},
            type = opt.type,
            obj=opt.body || $("body"),
            success = opt.callback;

        if(type == "post" || type == "put" || type == "delete"){
            data = JSON.stringify(data);
        }

        $.loadShow(obj);
        $.ajax({
            type:type,
            cache: false,
            crossDomain: true,
            url:url,
            data:data,
            contentType:"application/json",
            dataType:"json",
            timeout:60000,
            success:function(rs){
                $.loadHide();
                var state = rs.Success;
                if(state) {
                    //成功

                    var result = rs.Data || [];
                    success(result);
                }else{
                    //失败
                    var code=rs.Code,
                        msg = rs.Msg,
                        str="";
                    str="错误代码："+code+"错误信息："+msg;

                    $.message({
                        type: "info",
                        skin: 0,
                        str: msg
                    });
                }
            },
            error:function(e){
                $.loadHide();
                var state = e.status,
                    msg = "";

                if(state == "404" || state == "500"){
                    msg = "服务器繁忙,请稍后在试!";
                }else{
                    msg = "无法连接服务器";
                }

                $.message({
                    type: "info",
                    skin: 0,
                    str: msg
                });
            }
        });
    },
};

//$.loadShow();
//$.loadHide();
(function () {
    var zz = null,
        zz_main = null,
        load_gif = "../../image/load.gif";

    var show = function (obj) {

        obj = obj || $("body");

        zz = $("<div class='zoom'></div>");
        var css = {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            "background-color": "rgba(0,0,0,0.2)",
            "z-index": 999999999999
        };

        var css2 = {
            position: "absolute",
            left: "50%",
            top: "50%",
            "margin-left": "-100px",
            "margin-top": "-30px",
            width: "200px",
            height: "60px",
            "line-height": "60px",
            background: "#fff",
            opacity: 1,
            "z-index": 99999,
            color: "#333",
            "text-align": "center",
            "box-shadow": "0px 0px 5px rgba(0,0,0,.8)"
        };

        zz.css(css);

        zz_main = $("<div>正在读取数据......</div>");
        //var img = $("<img src='"+load_gif+"'>");
        //img.css({
        //    width:"100px",
        //    height:"100px",
        //    position:"absolute",
        //    top:"50%",
        //    left:"50%",
        //    "margin-left":"-50px",
        //    "margin-top":"-50px"
        //});
        zz_main.css(css2);
        //zz_main.append(img);
        zz.append(zz_main);
        if (obj.find(".zoom").length < 1) {
            obj.append(zz);
        }

        //zz.animate({
        //    "opacity":".4"
        //},1000)
    };
    var hide = function (obj) {
        obj = obj || $("body");
        if (obj.find(".zoom").length > 0) {
            obj.find(".zoom").remove();
            //zz.remove();
            //zz_main.remove();
            //zz = null;
            //zz_main = null;
        }
    };

    $.loadShow = show;
    $.loadHide = hide;
})();

//转formData格式
var param = function (obj) {

    var query = '';
    var name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
            for (i = 0; i < value.length; ++i) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
            }
        } else if (value instanceof Object) {
            for (subName in value) {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
            }
        } else if (value !== undefined && value !== null) {
            query += encodeURIComponent(name) + '='
            + encodeURIComponent(value) + '&';
        }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
};


