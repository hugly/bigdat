/**
 * Created by hugly on 25/05/2017.
 */
$(document).ready(function(){

});
(function(){
    var oMain = {
        init:function(){
            this.caculateShadow();
            this.leftSilderAnimateFn();
        },
        caculateShadow:function(){
            var height = $(window).height();

            $('#container,.left-sidebar,.content,.right-silder').css({
                height:height-60
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
        }
    };

    oMain.init();
})();






