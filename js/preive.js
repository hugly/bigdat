/**
 * Created by hugly on 25/05/2017.
 */
(function(){
    var constMin = 200;
    var oMain = {
        currentChartConfig:null,
        pageChartConfig:{},
        init:function(){
            this.caculateShadow();
            //this.leftSilderAnimateFn();
            this.getPageTempluginInfoById();
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
                height:height
            });
            $('#r-container').css({
                height:height
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
            var self = this;
            AJAX.ajax({
                url:'api/ModulePage/GetTempPlugsById',
                type:'get',
                data:{
                    id:commonFun.getUrlParam('id')
                },
                callback:function(rs){
                    console.log(rs);
                    var oMainContent    = $('#main-content'),
                        oChartTem       = $('#chart-temp');

                    for(var i=0,j=rs.Plugs.length;i<j;i++){
                        var oTar = oChartTem.clone().removeAttr('style').removeAttr('id');

                        oTar.find('.bar,.edit-btn,.dele-btn').remove();
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
                        self.createChartById(rs.Plugs[i].Position,$('#charts'+i));
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
                ID:commonFun.getUrlParam('id'),
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
                    console.log(rs);
                    $.message({
                        type: "success",
                        skin: 0,
                        str: '保存成功'
                    });
                }
            })
        }

    };

    oMain.init();
})();

