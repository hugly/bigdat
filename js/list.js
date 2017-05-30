/**
 * Created by hugly on 28/05/2017.
 */
(function(){
    var oList = {
        init:function(){
            this.caculateHeight();
            this.bindEvent();
            this.getTemplateInfo();
            this.getResourceList();
        },
        caculateHeight:function(){
            var oContainer = $('.container');

            oContainer.find('.left-silder,.right-silder,.main-silder,.r-content').css({
                height:$(window).height()-60
            });
        },
        bindEvent:function(){
            var self = this,
                oContainer = $('.container'),
                oZoomer     = $('#zoomer'),
                oTemCofig   = $('#tem-config'),
                oDataSource     = $('#data-source');

            oContainer.on('click','.left-silder li',function(){
                var index = $(this).index();

                oContainer.find('.left-silder li').removeClass('active');
                oContainer.find('.left-silder li').eq(index).addClass('active');
                oContainer.find(".sil-item").hide();
                oContainer.find(".sil-item").eq(index).show();
            });

            //预览
            oContainer.on('click','.preview-btn',function(){
                var obj = $(this).closest('li'),
                    id = obj.attr('data-id'),
                    name = obj.attr('data-name'),
                    width = obj.attr('data-width'),
                    height = obj.attr('data-height'),
                    color = obj.attr('data-color');

                window.location.href = 'preview.html?name='+name+'&id='+id+'&width='+width+'&height='+height+'&img='+color;
                return false;
            });
            //发布
            oContainer.on('click','.publish-btn',function(){
                var obj = $(this).closest('li'),
                    oE1 = $(this).find('i').eq(0),
                    oE2 = $(this).find('i').eq(1);

                self.publishPage(obj.attr('data-id'),function(){
                    // if(oE2.hasClass('has-color')){
                        oE1.show();
                        oE2.removeClass('has-color');
                    // }else{
                    //     oE1.hide();
                    //     oE2.addClass('has-color');
                    // }
                });
                return false;
            });

            //删除模板
            oContainer.on('click','.operate .dele-btn',function(){
                self.deleTemplate($(this).closest('li').attr('data-id'));
                return false;
            });

            //编辑模板名称
            oContainer.on('click','.edit span',function(){
                var _this = $(this);
                $(this).hide();
                $(this).next().show().focus().val($(this).text());
                // $(this).next().on('keyup',this,function(ev){
                //     if(ev.keyCode == 13){
                //         _this.show();
                //         _this.next().hide();
                //         self.saveTemInfo($(this).closest('li').attr('data-id'),$(this).val());
                //
                //         return false;
                //     }
                // });
                $(this).next().on('blur',this,function(){
                    _this.show();
                    _this.next().hide();
                    self.saveTemInfo($(this).closest('li').attr('data-id'),$(this).val());
                });
                return false;
            });

            //点击每个模板触发事件
            oContainer.on('click','#my-view li,#my-view .add,.create-btn',function(){
                var self = $(this);

                oTemCofig.find('input').eq(0).val(self.attr('data-name'));
                oTemCofig.find('input').eq(1).val(self.attr('data-width'));
                oTemCofig.find('input').eq(2).val(self.attr('data-height'));
                oTemCofig.find('input').eq(3).val(self.attr('data-color'));
                oTemCofig.attr('data-id',self.attr('data-id'));

                oZoomer.show();
                oTemCofig.show();
            });

            //弹出层取消和关闭按钮功能
            oTemCofig.on('click','.c-cancel-btn,.close-btn',function(){
                oZoomer.hide();
                oTemCofig.hide();
            });

            //弹出层确定按钮功能
            oTemCofig.on('click','.c-save-btn',function(){
                var id = oTemCofig.attr('data-id'),
                    name = oTemCofig.find('input').eq(0).val(),
                    width = oTemCofig.find('input').eq(1).val(),
                    height = oTemCofig.find('input').eq(2).val(),
                    color = oTemCofig.find('select').val();
                $(this).attr({
                    href:'main.html?name='+name+'&id='+id+'&width='+width+'&height='+height+'&img='+color
                })
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

        },
        //保存模板信息
        saveTemInfo:function(id,nameValue){
            var _this = this;
            AJAX.ajax({
                url:'api/ModulePage/Save',
                type:'post',
                data:{
                    'ID':id,
                    'Name':nameValue
                },
                callback:function(rs){
                    $.message({
                        type: "success",
                        skin: 0,
                        str: '操作成功'
                    });
                    _this.getTemplateInfo();
                }
            });
        },
        //删除现有模板
        deleTemplate:function(id){
            AJAX.ajax({
                url:'api/ModulePage/Delete',
                type:'post',
                data:{
                    'ID':id
                },
                callback:function(rs){
                    console.log(rs);
                    $.message({
                        type: "success",
                        skin: 0,
                        str: '操作成功'
                    });
                }
            });
        },
        //获取现有模板信息
        getTemplateInfo:function(){
            var obj = $('#my-view');
            obj.find('li').remove();
            AJAX.ajax({
                url:'api/ModulePage/GetAll',
                callback:function(rs){
                    var oTem = $('#temp');

                    for(var i=0,j=rs.length;i<j;i++){
                        var oTar = oTem.clone().removeAttr('style').removeAttr('id');
                        rs[i].Width = parseInt(rs[i].Width) || 800;
                        rs[i].Height = parseInt(rs[i].Height) || 500;

                        if(rs[i].Width < 800){ rs[i].Width = 800; }
                        if(rs[i].Height < 500){ rs[i].Height = 500; }

                        oTar.find('.edit span').text(rs[i].Name);

                        oTar.attr({
                            'data-name':rs[i].Name,
                            'data-width':rs[i].Width,
                            'data-height':rs[i].Height,
                            'data-id':rs[i].Id,
                            'data-color':rs[i].BackColor,
                        });
                        obj.append(oTar);
                    }
                }
            })
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
                type:'get',
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
        //发布
        publishPage:function(id,fn){
            AJAX.ajax({
                url:'api/ModulePage/Publish',
                type: 'post',
                data:{
                    pageID:id
                },
                callback:function(rs){
                    console.log(rs);
                    fn && fn();
                    $.message({
                        type: "success",
                        skin: 0,
                        str: '发布成功'
                    });
                }
            })
        }
    };
    oList.init();
})();