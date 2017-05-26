/**
 * Created by Administrator on 2017/5/26 0026.
 */
function drag(obj,moveObj){
    obj.on('mousedown',this,function(ev){
        var disX = ev.pageX - obj.offset().top;
        var disY = ev.pageY - obj.offset().left;
        moveObj.show();
        $(document).on('mousemove',this,function(ev){
            var x = ev.pageX - disX;
            var y = ev.pageY - disY;

            moveObj.css({
                top:y,
                left:x
            });
        });
        $(document).on('mouseup',this,function(){
            moveObj.hide();
            $(document).off('mousemove');
            return false;
        });
    });
}

// $.fn.drag();