/**
 * Created by hugly on 25/05/2017.
 */
(function(){
    var constMin = 200;
    var oMain = {
        init:function(){
            this.bindEvent();
            this.caculateShadow();
            this.leftSilderAnimateFn();
        },
        bindEvent:function(){
            var self            = this,
                index           = 0,
                _move           = false,
                oMainContent    = $('#main-content'),
                oDragTem        = $('#drag-temp'),
                oChartTem       = $('#chart-temp'),
                oLeftSilder     = $('.left-sidebar'),
                oRightSilder    = $('.right-silder');

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
                        self.createChartById(chartIndex,$( '#charts'+index));
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
            var height = $(window).height();

            $('#container,.left-sidebar,.content,.right-silder').css({
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
            var ranges = [
                    [1246406400000, 14.3, 27.7],
                    [1246492800000, 14.5, 27.8],
                    [1246579200000, 15.5, 29.6],
                    [1246665600000, 16.7, 30.7],
                    [1246752000000, 16.5, 25.0],
                    [1246838400000, 17.8, 25.7],
                    [1246924800000, 13.5, 24.8],
                    [1247011200000, 10.5, 21.4],
                    [1247097600000, 9.2, 23.8],
                    [1247184000000, 11.6, 21.8],
                    [1247270400000, 10.7, 23.7],
                    [1247356800000, 11.0, 23.3],
                    [1247443200000, 11.6, 23.7],
                    [1247529600000, 11.8, 20.7],
                    [1247616000000, 12.6, 22.4],
                    [1247702400000, 13.6, 19.6],
                    [1247788800000, 11.4, 22.6],
                    [1247875200000, 13.2, 25.0],
                    [1247961600000, 14.2, 21.6],
                    [1248048000000, 13.1, 17.1],
                    [1248134400000, 12.2, 15.5],
                    [1248220800000, 12.0, 20.8],
                    [1248307200000, 12.0, 17.1],
                    [1248393600000, 12.7, 18.3],
                    [1248480000000, 12.4, 19.4],
                    [1248566400000, 12.6, 19.9],
                    [1248652800000, 11.9, 20.2],
                    [1248739200000, 11.0, 19.3],
                    [1248825600000, 10.8, 17.8],
                    [1248912000000, 11.8, 18.5],
                    [1248998400000, 10.8, 16.1]
                ],
                averages = [
                    [1246406400000, 21.5],
                    [1246492800000, 22.1],
                    [1246579200000, 23],
                    [1246665600000, 23.8],
                    [1246752000000, 21.4],
                    [1246838400000, 21.3],
                    [1246924800000, 18.3],
                    [1247011200000, 15.4],
                    [1247097600000, 16.4],
                    [1247184000000, 17.7],
                    [1247270400000, 17.5],
                    [1247356800000, 17.6],
                    [1247443200000, 17.7],
                    [1247529600000, 16.8],
                    [1247616000000, 17.7],
                    [1247702400000, 16.3],
                    [1247788800000, 17.8],
                    [1247875200000, 18.1],
                    [1247961600000, 17.2],
                    [1248048000000, 14.4],
                    [1248134400000, 13.7],
                    [1248220800000, 15.7],
                    [1248307200000, 14.6],
                    [1248393600000, 15.3],
                    [1248480000000, 15.3],
                    [1248566400000, 15.8],
                    [1248652800000, 15.2],
                    [1248739200000, 14.8],
                    [1248825600000, 14.4],
                    [1248912000000, 15],
                    [1248998400000, 13.6]
                ];
            obj.highcharts(chartConfig[index]);
        }
    };

    oMain.init();
})();

