/**
 * Created by hugly on 28/05/2017.
 */
(function(){
    var oList = {
        init:function(){
            this.caculateHeight();
            this.bindEvent();
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
                var self = $(this),
                    arr = ['name','width','height'],
                    str = 'main.html?';
                oTemCofig.find('input').each(function(index,el){
                    $(el).val(self.attr('data-para'+index));
                    str += arr[index]+'='+self.attr('data-para'+index)+'&'
                });
                oTemCofig.find('.c-save-btn').attr({
                    href:str
                });
                oZoomer.show();
                oTemCofig.show();
            });

            oTemCofig.on('click','.c-cancel-btn,.close-btn',function(){
                oZoomer.hide();
                oTemCofig.hide();
            });

        }
    };
    oList.init();
})();