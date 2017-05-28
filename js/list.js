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

            oContainer.find('.left-silder,.right-silder,.main-silder').css({
                height:$(window).height()-60
            });
        },
        bindEvent:function(){
            var oContainer = $('.container');

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
        }
    };
    oList.init();
})();