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

            oContainer.find('.main-silder').css({
                height:$(window).height()-60
            });
        },
        bindEvent:function(){
            var oContainer  = $('.container'),
                oZoomer     = $('#zoomer'),
                oTemCofig   = $('#tem-config');

            oContainer.on('click','.main-silder li',function(){
                var self = $(this);
                oTemCofig.find('input').eq(0).val(self.attr('data-name'));
                oTemCofig.find('input').eq(1).val(self.attr('data-width'));
                oTemCofig.find('input').eq(2).val(self.attr('data-height'));
                oTemCofig.find('input').eq(3).val(self.attr('data-color'));
                oTemCofig.attr('data-id',self.attr('data-id'));

                oZoomer.show();
                oTemCofig.show();
            });

            oTemCofig.on('click','.c-cancel-btn,.close-btn',function(){
                oZoomer.hide();
                oTemCofig.hide();
            });

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
        getTemplateInfo:function(){
            AJAX.ajax({
                url:'api/ModulePage/GetAll',
                callback:function(rs){
                    var oTem = $('#tem-temp');

                    for(var i=0,j=rs.length;i<j;i++){
                        var oTar = oTem.clone().removeAttr('style').removeAttr('id');
                        rs[i].Width = parseInt(rs[i].Width) || 800;
                        rs[i].Height = parseInt(rs[i].Height) || 500;

                        if(rs[i].Width < 800){ rs[i].Width = 800; }
                        if(rs[i].Height < 500){ rs[i].Height = 500; }

                        oTar.find('h3').text(rs[i].Name);
                        oTar.find('p').eq(0).text('比例:16:9');
                        oTar.find('p').eq(1).text(rs[i].Width+'px*'+rs[i].Height+'px');
                        oTar.attr({
                            'data-name':rs[i].Name,
                            'data-width':rs[i].Width,
                            'data-height':rs[i].Height,
                            'data-id':rs[i].Id,
                            'data-color':rs[i].BackColor,
                        });
                        $('.main-silder ul').append(oTar);
                    }
                }
            })
        }

    };
    oList.init();
})();