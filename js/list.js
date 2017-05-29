/**
 * Created by hugly on 28/05/2017.
 */
(function(){
    var oList = {
        init:function(){
            this.caculateHeight();
            this.bindEvent();
            this.getTemplateInfo();
        },
        caculateHeight:function(){
            var oContainer = $('.container');

            oContainer.find('.left-silder,.right-silder,.main-silder').css({
                height:$(window).height()-60
            });
        },
        bindEvent:function(){
            var self = this,
                oContainer = $('.container'),
                oZoomer     = $('#zoomer'),
                oTemCofig   = $('#tem-config');

            //发布
            oContainer.on('click','.publish-btn',function(){
                var oE1 = $(this).find('i').eq(0),
                    oE2 = $(this).find('i').eq(1);
                if(oE2.hasClass('has-color')){
                    oE1.show();
                    oE2.removeClass('has-color');
                }else{
                    oE1.hide();
                    oE2.addClass('has-color');
                }
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
            oContainer.on('click','.right-silder ul li,.right-silder .add',function(){
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
                    color = oTemCofig.find('input').eq(3).val();
                $(this).attr({
                    href:'main.html?name='+name+'&id='+id+'&width='+width+'&height='+height+'&color='+encodeURIComponent(color)
                })
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
                type:'delete',
                "Content-Type": "application/json",
                data:{
                    'ID':99
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
            var obj = $('.right-silder ul');
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
        }
    };
    oList.init();
})();