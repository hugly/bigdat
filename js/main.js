/**
 * Created by hugly on 25/05/2017.
 */
(function(){
    var constMin = 200;
    var oMain = {
        currentChartConfig:null,
        init:function(){
            this.bindEvent();
            this.caculateShadow();
            //this.leftSilderAnimateFn();
        },
        bindEvent:function(){
            var self            = this,
                index           = 0,
                _move           = false,
                oContainer      = $('#container'),
                oMainContent    = $('#main-content'),
                oDragTem        = $('#drag-temp'),
                oChartTem       = $('#chart-temp'),
                oLeftSilder     = $('.left-sidebar'),
                oRightSilder    = $('.right-silder');

            //操作区域的删除操作
            oMainContent.on('click','.chart-temp .dele-btn',function(){
                $(this).closest('.chart-temp').remove();
                oContainer.find('.right-silder').removeClass('r-show');
                oContainer.find('.content').removeClass('has-margin');
            });

            //操作区域的编辑操作
            oMainContent.on('click','.chart-temp .edit-btn',function(){
                oContainer.find('.right-silder').addClass('r-show');
                oContainer.find('.content').addClass('has-margin');
            });

            //右侧菜单切换功能
            oRightSilder.on('click','.r-title li',function(){
                var index = $(this).index();

                oRightSilder.find('.r-title li').removeClass('active');
                $(this).addClass('active');

                oRightSilder.find('.r-container li').hide();
                oRightSilder.find('.r-container li').eq(index).show();
            });

            //从左侧菜单栏拖拽单元目标
            oLeftSilder.on('mousedown','.nav-sidebar li',function(ev){
                var chartIndex = parseInt($(this).attr('data-index'));
                var disX = ev.pageX - $(this).offset().left;
                var disY = ev.pageY - $(this).offset().top;

                var resX = 0;
                var resY = 0;
                oDragTem.css({
                    top:ev.pageY,
                    left:ev.pageX
                });

                $(document).on('mousemove',this,function(ev){
                    oDragTem.show();
                    _move = true;
                    resX = ev.pageX - disX;
                    resY = ev.pageY - disY;
                    oDragTem.css({
                        left: resX,
                        top: resY
                    });
                });

                $(document).on('mouseup',this,function(){
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                    if(_move){
                        oDragTem.hide();
                        index ++;
                        var tem = oChartTem.clone(),
                            oMainX = oMainContent.offset().left,
                            oMainY = oMainContent.offset().top,
                            temX = resX-oMainX,
                            temY = resY-oMainY;

                        if(resX < oMainX){ temX = 0; }
                        if(resY < oMainY){ temY = 0; }

                        if(resX > (oMainX + oMainContent.width()-oChartTem.width())){ temX = oMainContent.width()-oChartTem.width() }
                        if(resY > (oMainY + oMainContent.height()-oChartTem.height())){ temY = oMainContent.height()-oChartTem.height() }

                        // if(resX < oMainX){ return; }
                        // if(resY < oMainY){ return; }
                        //
                        // if(resX > (oMainX + oMainContent.width()-200)){ return; }
                        // if(resY > (oMainY + oMainContent.height()-200)){ return; }


                        tem.removeAttr('id').removeAttr('style');

                        tem.css({
                            'z-index': index,
                            left: temX,
                            top: temY
                        });
                        tem.find('.chart-con').attr({
                            'data-index': chartIndex,
                            'id': 'charts'+index
                        });

                        oMainContent.append(tem);
                        self.createChartById(chartIndex,$('#charts'+index));
                    }
                    _move = false;
                    return false;
                });
            });

            //在操作区域直接拖拽
            oMainContent.on('mousedown','.chart-temp .chart-con',function(ev){
                var self = $(this).parent();
                var disX = ev.pageX - self.offset().left;
                var disY = ev.pageY - self.offset().top;
                $(document).on('mousemove',this,function(ev){
                    var resX = ev.pageX - disX,
                        resY = ev.pageY - disY,
                        oMainX = oMainContent.offset().left,
                        oMainY = oMainContent.offset().top,
                        temX = resX-oMainX,
                        temY = resY-oMainY;

                    if(resX < oMainX){ temX = 0; }
                    if(resY < oMainY){ temY = 0; }

                    if(resX > (oMainX + oMainContent.width()-self.width())){ temX = oMainContent.width()-self.width() }
                    if(resY > (oMainY + oMainContent.height()-self.height())){ temY = oMainContent.height()-self.height() }

                    self.css({
                        left: temX,
                        top: temY
                    });
                });
                $(document).on('mouseup',this,function(){
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                });
            });

            //在操作区域拉取上边框
            oMainContent.on('mousedown','.chart-temp .top-bar',function(ev){
                var obj = $(this).parent();
                var height = obj.height();
                var top = parseInt(obj.css('top'));
                var disY = ev.pageY;
                $(document).on('mousemove',this,function(ev){
                    var resY = ev.pageY - disY,
                        resT = top + resY,
                        resH = height - resY;

                    if( resT <= 0 ){ resT = 0; resH = height + top; }
                    if( resH <= constMin ){ resH = constMin; resT = height + top -constMin; }

                    obj.css({
                        top: resT,
                        height: resH
                    });
                    obj.find('.chart-con').height(resH-10);
                });
                $(document).on('mouseup',this,function(){
                    $(document).off('mousemove');
                    $(document).off('mouseup');

                    obj.find('.chart-con').highcharts().reflow();
                });
            });
            //在操作区域拉取右边框
            oMainContent.on('mousedown','.chart-temp .right-bar',function(ev){
                var obj = $(this).parent();
                var width = obj.width();
                var left = parseInt(obj.css('left'));
                var disX = ev.pageX;
                $(document).on('mousemove',this,function(ev){
                    var resX = ev.pageX - disX,
                        resW = width + resX;

                    if(resW <= constMin ){ resW = constMin; }
                    if(resW >= (oMainContent.width() - left) ){ resW = oMainContent.width() - left; }

                    obj.css({
                        width: resW
                    });
                    obj.find('.chart-con').width(resW-10);
                });
                $(document).on('mouseup',this,function(){
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                    obj.find('.chart-con').highcharts().reflow();
                });
            });
            //在操作区域拉取下边框
            oMainContent.on('mousedown','.chart-temp .bottom-bar',function(ev){
                var obj = $(this).parent();
                var height = obj.height();
                var top = parseInt(obj.css('top'));
                var disY = ev.pageY;
                $(document).on('mousemove',this,function(ev){
                    var resY = ev.pageY - disY,
                        resH = height + resY;

                    if( resH <= constMin ){ resH = constMin; }
                    if( resH >= oMainContent.height() - top ){ resH = oMainContent.height() - top; }

                    obj.css({
                        height: resH
                    });
                    obj.find('.chart-con').height(resH-10);
                });
                $(document).on('mouseup',this,function(){
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                    obj.find('.chart-con').highcharts().reflow();
                });
            });
            //在操作区域拉取左边框
            oMainContent.on('mousedown','.chart-temp .left-bar',function(ev){
                var obj = $(this).parent();
                var width = obj.width();
                var left = parseInt(obj.css('left'));
                var disX = ev.pageX;
                $(document).on('mousemove',this,function(ev){
                    var resX = ev.pageX - disX,
                        resL = left + resX,
                        resW = width - resX;

                    if(resL <= 0){ resL = 0; resW = left + width; }
                    if(resW <= constMin ){ resW = constMin; resL = left + width -constMin }

                    obj.css({
                        left: resL,
                        width: resW
                    });
                    obj.find('.chart-con').width(resW-10);

                });
                $(document).on('mouseup',this,function(){
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                    obj.find('.chart-con').highcharts().reflow();
                });
            });

        },
        caculateShadow:function(){
            var height = $(window).height(),
                conWidth = commonFun.getUrlParam('width'),
                conHeight = commonFun.getUrlParam('height');

            $('#main-content').css({
                width:conWidth,
                height:conHeight
            });

            $('#container,.content,.right-silder').css({
                height:height-60
            });
            $('#r-container').css({
                height:height-140
            });

        },
        leftSilderAnimateFn:function(){
            var oLeftSilder = $('#left-silder');

            oLeftSilder.on('click','div',function(){
                var _this = $(this);
                _this.next().slideToggle(function(){
                    var hasClass = _this.find('.iconfont').hasClass('trans');
                    if(hasClass){
                        _this.find('.iconfont').removeClass('trans');
                    }else{
                        _this.find('.iconfont').addClass('trans');
                    }
                });
            });
        },
        //根据索引和图表元素生成图表
        createChartById:function(index,obj){
            this.currentChartConfig = chartConfig[index];
            // this.currentChartConfig.title.text = 'aaaaaaa';

            obj.highcharts(this.currentChartConfig);
        }
    };

    oMain.init();
})();

