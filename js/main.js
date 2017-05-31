/**
 * Created by hugly on 25/05/2017.
 */
$(document).ready(function(){
    var constMin = 200;
    var oMain = {
        index:0,
        currentChartConfig:null,
        pageChartConfig:{},
        init:function(){
            var id = commonFun.getUrlParam('id');
            this.bindEvent();
            this.caculateShadow();
            //this.leftSilderAnimateFn();
            if(id != 'undefined'){
                this.getPageTempluginInfoById();
            }
        },
        bindEvent:function(){
            var self            = this,
                _move           = false,
                //判断是编辑还是新增 0为编辑  1为新增
                type            = 0,
                optionsObj      = $('.c-ul .c-item').eq(0),
                otherOptionsObj = $('.c-ul .c-item').eq(1),
                oNaver          = $('.naver'),
                oSaveBtn        = $('.a-save-btn'),
                oCloseBtn       = $('.a-close-btn'),
                oDataChange     = $('#data-change'),
                oContainer      = $('#container'),
                oMainContent    = $('#main-content'),
                oDragTem        = $('#drag-temp'),
                oChartTem       = $('#chart-temp'),
                oLeftSilder     = $('.left-sidebar'),
                oRightSilder    = $('.right-silder'),
                oBackBtn        = $('.back');

            oBackBtn.on('click',this,function(){
                window.location.href = 'list.html';
            });

            //操作区域的删除操作
            oMainContent.on('click','.chart-temp .dele-btn',function(){
                var obj = $(this).next().attr('data-id');
                $(this).closest('.chart-temp').remove();
                oContainer.find('.right-silder').removeClass('r-show');
                oContainer.find('.content').removeClass('has-margin');

                var str = 'cc'+obj;
                delete self.pageChartConfig[str];
            });

            //操作区域的编辑操作
            oMainContent.on('click','.chart-temp .edit-btn',function(){
                oContainer.find('.right-silder').addClass('r-show');
                oContainer.find('.content').addClass('has-margin');
                oContainer.find('.save-btn').attr('data-id',$(this).nextAll('.chart-con').attr('data-id'));

                var data = self.currentChartConfig.series,
                    obj = $('#data-text'),
                    mainObj = $(this).closest('.chart-temp');

                optionsObj.find('input').eq(0).val(self.currentChartConfig.title.text);
                optionsObj.find('input').eq(1).val(self.currentChartConfig.pluginLJH.width);
                optionsObj.find('input').eq(2).val(self.currentChartConfig.pluginLJH.height);
                optionsObj.find('input').eq(3).val(self.currentChartConfig.pluginLJH.left);
                optionsObj.find('input').eq(4).val(self.currentChartConfig.pluginLJH.top);
                optionsObj.find('input').eq(5).val(self.currentChartConfig.chart.borderWidth);
                optionsObj.find('input').eq(6).val(self.currentChartConfig.chart.borderColor);
                optionsObj.find('input').eq(7).val(self.currentChartConfig.chart.backgroundColor);
                otherOptionsObj.find('#data-change').val(self.currentChartConfig.pluginLJH.dataType);

                obj.val(self.objToString(data));
                self.getResourceList();
            });

            //右侧菜单切换功能
            oRightSilder.on('click','.r-title li',function(){
                var index = $(this).index();

                oRightSilder.find('.r-title li').removeClass('active');
                $(this).addClass('active');

                oRightSilder.find('.r-container .c-item').hide();
                oRightSilder.find('.r-container .c-item').eq(index).show();
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
                        self.index ++;
                        var tem = oChartTem.clone(),
                            oMainX = oMainContent.offset().left,
                            oMainY = oMainContent.offset().top,
                            temX = resX-oMainX,
                            temY = resY-oMainY;

                        if(resX < oMainX){ temX = 0; }
                        if(resY < oMainY){ temY = 0; }

                        if(resX > (oMainX + oMainContent.width()-oChartTem.width())){ temX = oMainContent.width()-oChartTem.width() }
                        if(resY > (oMainY + oMainContent.height()-oChartTem.height())){ temY = oMainContent.height()-oChartTem.height() }

                        tem.removeAttr('id').removeAttr('style');

                        tem.css({
                            'z-index': self.index,
                            left: temX,
                            top: temY
                        });
                        tem.find('.chart-con').attr({
                            'data-index': chartIndex,
                            'data-id':self.index,
                            'id': 'charts'+self.index
                        });

                        oMainContent.append(tem);
                        chartConfig[chartIndex].pluginLJH.left = temX;
                        chartConfig[chartIndex].pluginLJH.top = temY;
                        chartConfig[chartIndex].pluginLJH.chartId = chartIndex;

                        optionsObj.find('input').eq(3).val(temX);
                        optionsObj.find('input').eq(4).val(temY);
                        var str = 'cc'+self.index;
                        self.pageChartConfig[str] = chartConfig[chartIndex];

                        self.createChartById(chartIndex,$('#charts'+self.index),'charts'+self.index);
                    }
                    _move = false;
                    return false;
                });
            });

            //在操作区域直接拖拽
            oMainContent.on('mousedown','.chart-temp .chart-con',function(ev){
                var _self = $(this).parent();
                var index = $(this).attr('data-index');
                var id = $(this).attr('data-id');
                var disX = ev.pageX - _self.offset().left;
                var disY = ev.pageY - _self.offset().top;
                $(document).on('mousemove',this,function(ev){
                    var resX = ev.pageX - disX,
                        resY = ev.pageY - disY,
                        oMainX = oMainContent.offset().left,
                        oMainY = oMainContent.offset().top,
                        temX = resX-oMainX,
                        temY = resY-oMainY;

                    if(resX < oMainX){ temX = 0; }
                    if(resY < oMainY){ temY = 0; }

                    if(resX > (oMainX + oMainContent.width()-_self.width())){ temX = oMainContent.width()-_self.width() }
                    if(resY > (oMainY + oMainContent.height()-_self.height())){ temY = oMainContent.height()-_self.height() }

                    _self.css({
                        left: temX,
                        top: temY
                    });

                    chartConfig[index].pluginLJH.left = temX;
                    chartConfig[index].pluginLJH.top = temY;
                    chartConfig[index].pluginLJH.chartId = index;
                    optionsObj.find('input').eq(3).val(temX);
                    optionsObj.find('input').eq(4).val(temY);
                    var str = 'cc'+id;
                    self.pageChartConfig[str] = chartConfig[index];
                });
                $(document).on('mouseup',this,function(){
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                });
            });

            //在操作区域拉取上边框
            oMainContent.on('mousedown','.chart-temp .top-bar',function(ev){
                var obj = $(this).parent();
                var index = obj.find('.chart-con').attr('data-index');
                var id = obj.find('.chart-con').attr('data-id');
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

                    chartConfig[index].pluginLJH.height = resH;
                    chartConfig[index].pluginLJH.top = resT;
                    optionsObj.find('input').eq(2).val(resH);
                    optionsObj.find('input').eq(4).val(resT);
                    var str = 'cc'+id;
                    self.pageChartConfig[str] = chartConfig[index];
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
                var index = obj.find('.chart-con').attr('data-index');
                var id = obj.find('.chart-con').attr('data-id');
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
                    chartConfig[index].pluginLJH.width = resW;
                    optionsObj.find('input').eq(1).val(resW);
                    var str = 'cc'+id;
                    self.pageChartConfig[str] = chartConfig[index];
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
                var index = obj.find('.chart-con').attr('data-index');
                var id = obj.find('.chart-con').attr('data-id');
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

                    chartConfig[index].pluginLJH.height = resH;
                    optionsObj.find('input').eq(2).val(resH);
                    var str = 'cc'+id;
                    self.pageChartConfig[str] = chartConfig[index];
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
                var index = obj.find('.chart-con').attr('data-index');
                var id = obj.find('.chart-con').attr('data-id');
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

                    chartConfig[index].pluginLJH.width = resW;
                    chartConfig[index].pluginLJH.left = resL;

                    optionsObj.find('input').eq(1).val(resW);
                    optionsObj.find('input').eq(3).val(resL);
                    var str = 'cc'+id;
                    self.pageChartConfig[str] = chartConfig[index];

                });
                $(document).on('mouseup',this,function(){
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                    obj.find('.chart-con').highcharts().reflow();
                });
            });

            //选择数据源类型
            oDataChange.on('change',this,function () {
                var objs = $('.data-cha');
                objs.hide();
                objs.eq($(this).val()).show();
            });

            oCloseBtn.on('click',this,function(){
                oContainer.find('.right-silder').removeClass('r-show');
                oContainer.find('.content').removeClass('has-margin');
            });

            //保存插件配置
            oSaveBtn.on('click',this,function(){
                var oDataList =  $('#data-text'),
                    dataid = $(this).parent().attr('data-id'),
                    mainObj = $('#charts'+dataid),
                    parentObj = mainObj.closest('.chart-temp'),
                    optionsObj = $('.c-ul .c-item').eq(0),
                    valList = oDataList.val().split('\n').join('').split('\t').join('');


                parentObj.width(optionsObj.find('input').eq(1).val());
                parentObj.height(optionsObj.find('input').eq(2).val());
                mainObj.width(optionsObj.find('input').eq(1).val()-10);
                mainObj.height(optionsObj.find('input').eq(2).val()-10);

                parentObj.css('left',optionsObj.find('input').eq(3).val()+'px');
                parentObj.css('top',optionsObj.find('input').eq(4).val()+'px');

                self.currentChartConfig.title.text = optionsObj.find('input').eq(0).val();
                self.currentChartConfig.pluginLJH.width = optionsObj.find('input').eq(1).val();
                self.currentChartConfig.pluginLJH.height=optionsObj.find('input').eq(2).val();
                self.currentChartConfig.pluginLJH.left = optionsObj.find('input').eq(3).val();
                self.currentChartConfig.pluginLJH.top = optionsObj.find('input').eq(4).val();
                self.currentChartConfig.chart.borderColor = optionsObj.find('input').eq(6).val()+'px';
                self.currentChartConfig.chart.borderWidth = parseInt(optionsObj.find('input').eq(5).val());
                self.currentChartConfig.chart.backgroundColor = optionsObj.find('input').eq(7).val();

                self.currentChartConfig.series = eval(valList);

                var str = 'cc'+dataid;
                self.pageChartConfig[str] = self.currentChartConfig;
                mainObj.highcharts(self.currentChartConfig);
            });

            //保存页面数据
            oNaver.on('click','.page-save',function(){
                self.savePageSetting();

            });
            //预览
            oNaver.on('click','.page-preview',function(){
                var id = commonFun.getUrlParam('id'),
                    name = commonFun.getUrlParam('name'),
                    width = commonFun.getUrlParam('width'),
                    height = commonFun.getUrlParam('height'),
                    color = commonFun.getUrlParam('img');
                window.location.href = 'preview.html?name='+name+'&id='+id+'&width='+width+'&height='+height+'&img='+color
            });
            //发布
            oNaver.on('click','.page-publish',function(){
                // $.message({
                //     type: "success",
                //     skin: 0,
                //     str: '发布成功'
                // });
                self.publishPage();
            });
        },
        objToString:function (obj, ndeep) {
            var self = this;
            if(obj == null){ return String(obj); }
            switch(typeof obj){
                case "string": return '"'+obj+'"';
                case "function": return obj.name || obj.toString();
                case "object":
                    var indent = Array(ndeep||1).join('\t'),
                        isArray = Array.isArray(obj);

                    return '{['[+isArray] + Object.keys(obj).map(function(key){
                            if(isNaN(parseInt(key))){
                                return '\n\t' + indent + key + ': ' + self.objToString(obj[key], (ndeep||1)+1);
                            }else{
                                return '\n\t' + indent + self.objToString(obj[key], (ndeep||1)+1);
                            }
                        }).join(',') + '\n' + indent + '}]'[+isArray];

                default: return obj.toString();
            }
        },
        objToNormalString:function (obj, ndeep) {
            var self = this;
            if(obj == null){ return String(obj); }
            switch(typeof obj){
                case "string": return '"'+obj+'"';
                case "function": return obj.name || obj.toString();
                case "object":
                    var indent = Array(ndeep||0),
                        isArray = Array.isArray(obj);

                    return '{['[+isArray] + Object.keys(obj).map(function(key){
                            if(isNaN(parseInt(key))){
                                if(indent)
                                    return indent + key + ': ' + self.objToNormalString(obj[key], (ndeep||0));
                            }else{
                                if(indent)
                                    return indent + self.objToNormalString(obj[key], (ndeep||0));
                            }
                        }).join(',') + indent + '}]'[+isArray];

                default: return obj.toString();
            }
        },
        caculateShadow:function(){
            var height = $(window).height(),
                conWidth = commonFun.getUrlParam('width'),
                conHeight = commonFun.getUrlParam('height'),
                conColor = commonFun.getUrlParam('color');

            $('#main-content').css({
                width:conWidth,
                height:conHeight,
                'background-image':'url("../images/1.png")'
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
        createChartById:function(index,obj,name){
            this.currentChartConfig = chartConfig[index];
            obj.highcharts(this.currentChartConfig);
        },
        //获取页面的临时插件
        getPageTempluginInfoById:function(){
            var self = this;
            AJAX.ajax({
                url:'api/ModulePage/GetTempPlugsById',
                type:'get',
                data:{
                    id:commonFun.getUrlParam('id')
                },
                callback:function(rs){
                    var oMainContent    = $('#main-content'),
                        oChartTem       = $('#chart-temp');

                    self.index = rs.Plugs.length;
                    for(var i=0,j=rs.Plugs.length;i<j;i++){
                        var oTar = oChartTem.clone().removeAttr('style').removeAttr('id');

                        oTar.css({
                            'z-index': i,
                            left: rs.Plugs[i].Left+'px',
                            top: rs.Plugs[i].Right+'px',
                            width:rs.Plugs[i].Width,
                            height:rs.Plugs[i].Height
                        });
                        oTar.find('.chart-con').attr({
                            'data-index': rs.Plugs[i].Position,
                            'data-id':i,
                            'id': 'charts'+i
                        }).css({
                            width:rs.Plugs[i].Width-10,
                            height:rs.Plugs[i].Height-10
                        });
                        oMainContent.append(oTar);
                        var str = 'cc'+i;
                        self.pageChartConfig[str] = chartConfig[rs.Plugs[i].Position];
                        self.createChartById(rs.Plugs[i].Position,$('#charts'+i),'charts'+i);
                    }
                }
            });
        },
        //1.获取资源列表
        getResourceList:function(){
            AJAX.ajax({
                url:'api/APiDataSource/GetAll',
                type:'get',
                callback:function(rs){
                    if(rs.length == 0) return;
                    for(var i=0,j=rs.length;i<j;i++){
                        var obj = $('#data-source');
                        obj.append($('<option data-url="'+rs[i].ApiUrl+'" value="'+rs[i].Name+'">'+rs[i].Name+'</option>'));
                    }
                }
            });
        },
        //6.使用资源数据
        useResourceData:function(url){
            $.ajax({
                url:url,
                type:'get',
                success:function(rs){
                    var state = rs.Success;
                    if(state) {
                        //成功
                        var result = rs.Data || [];

                        if(!$.isArray(rs)){
                            $.message({
                                type: "success",
                                skin: 0,
                                str: '返回数据格式错误，请使用json数据格式！',
                            });
                        }
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
        //保存页面配置
        savePageSetting:function(){
            var data = {
                ID:commonFun.getUrlParam('id') == 'undefined'?'':commonFun.getUrlParam('id'),
                BackImage:commonFun.getUrlParam('img'),
                Width:commonFun.getUrlParam('width'),
                Height:commonFun.getUrlParam('height'),
                Name:commonFun.getUrlParam('name'),
                Plugs:[]
            };

            for(var name in this.pageChartConfig){
                var json = {},
                    obj = this.pageChartConfig[name];

                json.PageID = commonFun.getUrlParam('id');
                json.Width = obj.pluginLJH.width;
                json.Height = obj.pluginLJH.height;
                json.BackColor = obj.pluginLJH.backgroundColor;
                json.FontSize = obj.chart.borderWidth;
                json.FontColor = obj.chart.borderColor;
                json.DataType = '0';
                json.Content = obj.series;
                json.Left = obj.pluginLJH.left;
                json.Right = obj.pluginLJH.top;
                json.Position = obj.pluginLJH.chartId;
                json.Align = obj.title.text;

                data.Plugs.push(json);
            }

            AJAX.ajax({
                url:'api/ModulePage/Save',
                type: 'post',
                data:data,
                callback:function(rs){
                    $.message({
                        type: "success",
                        skin: 0,
                        str: '保存成功',
                        subCallback:function(){
                            window.location.href = '../html/list.html';
                        }
                    });
                }
            })
        },
        //发布页面
        publishPage:function(){
            AJAX.ajax({
                url:'api/ModulePage/Publish',
                type: 'post',
                data:{
                    pageID:commonFun.getUrlParam('id')
                },
                callback:function(rs){
                    $.message({
                        type: "success",
                        skin: 0,
                        str: '发布成功'
                    });
                }
            })
        }
    };

    oMain.init();

});

