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
            this.getPageTempluginInfoById();
        },
        bindEvent:function(){
            var self            = this,
                index           = 0,
                _move           = false,
                //判断是编辑还是新增 0为编辑  1为新增
                type            = 0,
                oSaveBtn        = $('.save-btn'),
                oDataChange     = $('#data-change'),
                oContainer      = $('#container'),
                oMainContent    = $('#main-content'),
                oDragTem        = $('#drag-temp'),
                oChartTem       = $('#chart-temp'),
                oLeftSilder     = $('.left-sidebar'),
                oRightSilder    = $('.right-silder'),
                oDataSource     = $('#data-source');

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
                oContainer.find('.save-btn').attr('data-id',$(this).nextAll('.chart-con').attr('data-id'));
                var data = self.currentChartConfig.series,
                    obj = $('#data-text');

                obj.text(self.objToString(data));

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
                            'data-id':index,
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

            //数据源的增删改查以及使用

            //add
            oDataSource.on('click','.r-add',function(){
                type = 1;
                var oTem = $('#r-li').clone().removeAttr('style').removeAttr('id');

                oTem.find('span').hide();
                oTem.find('input').show();
                oTem.find('.a-edit').hide();
                oTem.find('.a-save').show();

                oTem.insertBefore($(this));
            });
            //modify
            oDataSource.on('click','.a-edit',function(){
                var obj = $(this).closest('li');

                type = 0;
                obj.find('span').hide();
                obj.find('input').show();

                $(this).hide();
                obj.find('.a-save').show();
            });
            //dele
            oDataSource.on('click','.a-dele',function(){
                var obj = $(this).closest('.r-li');

                self.deleResourceItem(obj,obj.attr('data-id'));
            });
            //save
            oDataSource.on('click','.a-save',function(){
                var obj = $(this).closest('.r-li'),
                    id = obj.attr('data-id'),
                    name = obj.find('input').eq(0).val(),
                    desc = obj.find('input').eq(1).val(),
                    apiUrl = obj.find('input').eq(2).val();

                if(type == 0){
                    self.editResourceItemById(obj,id,name,desc,apiUrl);
                }else if(type == 1){
                    self.insertResourceItem(obj,name,desc,apiUrl);
                }
            });
            //use
            oDataSource.on('click','.a-use',function(){
                var obj = $(this).closest('.r-li');

                self.useResourceData(obj.find('input').eq(2).val());
            });

            //选择数据源类型
            oDataChange.on('change',this,function () {
                var objs = $('.data-cha');
                objs.hide();
                objs.eq($(this).val()).show();
            });

            //保存插件配置
            oSaveBtn.on('click',this,function(){
                var oDataList =  $('#data-text'),
                    dataid = $(this).attr('data-id'),
                    valList = oDataList.val().split('\n').join('').split('\t').join('');

                self.currentChartConfig.series = eval(valList);
                console.log(self.currentChartConfig);
                console.log($('#charts'+dataid));
                $('#charts'+dataid).highcharts(self.currentChartConfig);
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
                'background-color':decodeURIComponent(conColor)
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

            obj.highcharts(this.currentChartConfig);
        },
        //获取页面的临时插件
        getPageTempluginInfoById:function(){
            AJAX.ajax({
                url:'api/ModulePage/GetTempPlugsById',
                type:'get',
                data:{
                    id:commonFun.getUrlParam('id')
                },
                callback:function(rs){
                    console.log(rs);
                }
            });
        },
        //资源配置相关请求
        //1.获取资源列表
        getResourceList:function(){
            AJAX.ajax({
                url:'api/APiDataSource/GetAll',
                type:'get',
                callback:function(rs){
                    if(rs.length == 0) return;
                    for(var i=0,j=rs.length;i<j;i++){
                        var oTem = $('#r-li').clone().removeAttr('style').removeAttr('id');

                        oTem.attr({
                            'data-id':rs[i].Id
                        });
                        oTem.find('.a-item span').eq(0).text(rs[i].Name);
                        oTem.find('.a-item span').eq(0).attr('title',rs[i].Name);
                        oTem.find('.a-item input').eq(0).val(rs[i].Name);

                        oTem.find('.a-item span').eq(1).text(rs[i].Desc);
                        oTem.find('.a-item span').eq(1).attr('title',rs[i].Desc);
                        oTem.find('.a-item input').eq(1).val(rs[i].Desc);

                        oTem.find('.a-item span').eq(2).text(rs[i].ApiUrl);
                        oTem.find('.a-item span').eq(2).attr('title',rs[i].ApiUrl);
                        oTem.find('.a-item input').eq(2).val(rs[i].ApiUrl);

                        oTem.insertBefore($('.r-add'));
                    }
                }
            });
        },
        //2.获取单个资源详情
        getResourceDetailById:function(id){
            AJAX.ajax({
                url:'api/APiDataSource/GetById',
                type:'get',
                data:{
                    id:id
                },
                callback:function(rs){
                    console.log(rs);
                }
            });
        },
        //3.插入单个资源
        insertResourceItem:function(obj,name,desc,apiUrl){
            AJAX.ajax({
                url:'api/APiDataSource/Insert',
                type:'post',
                data:{
                    Name:name,
                    Desc:desc,
                    ApiUrl:apiUrl,
                },
                callback:function(rs){
                    $.message({
                        type: "success",
                        skin: 0,
                        str: '操作成功',
                        subCallback:function(){
                            obj.find('span').show();
                            obj.find('input').hide();
                            obj.find('.a-edit').show();
                            obj.find('.a-save').hide();
                        }
                    });
                }
            });
        },
        //4.删除单个资源
        deleResourceItem:function(obj,id){
            AJAX.ajax({
                url:'api/APiDataSource/Delete',
                type:'delete',
                "Content-Type": "application/json",
                data:{
                    id:id
                },
                callback:function(rs){
                    $.message({
                        type: "success",
                        skin: 0,
                        str: '操作成功',
                        subCallback:function(){
                            obj.remove();
                        }
                    });
                }
            });
        },
        //5.编辑单个资源
        editResourceItemById:function(obj,id,name,desc,apiUrl){
            AJAX.ajax({
                url:'api/APiDataSource/Edit',
                type:'post',
                data:{
                    Id:id,
                    Name:name,
                    Desc:desc,
                    ApiUrl:apiUrl,
                },
                callback:function(rs){
                    $.message({
                        type: "success",
                        skin: 0,
                        str: '操作成功',
                        subCallback:function(){
                            obj.find('span').show();
                            obj.find('input').hide();
                            obj.find('.a-edit').show();
                            obj.find('.a-save').hide();
                        }
                    });
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

        }

    };

    oMain.init();
})();

