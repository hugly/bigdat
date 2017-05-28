/**
 * Created by huaha on 2016/9/23.
 */
String.prototype.gblen = function() {
    var len = 0;
    for (var i=0; i<this.length; i++) {
        if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {
            len += 2;
        } else {
            len ++;
        }
    }
    return len;
};

var mainpath='/';

var totalitems=20;

//判断汉字和字母的组合长度  单独汉字算两个   单独字母算一个
String.prototype.len = function()
{
    return this.replace(/[^\x00-\xff]/g, "xx").length;
}

//函数绑定功能  作用：改变this的指向  解决因为函数作用域问题导致的this指向的改变
//用法示例：
// var newObj = {
//     data:[{a:1},{a:2},{a:3}],
//     num:9,
//     showAttr:function(n){
//         console.log(n);
//     },
//     showAttrCB:function(cb) {
//         cb && cb();
//     },
//     getAsyncData:function(){
//         多个函数循环绑定
//         this.data.forEach(function(el){
//             this.showAttr(el)
//         }.bind(this));
//         单个函数绑定
//         this.showAttrCB(function(){
//             this.showAttr(this.num);
//         }.bind(this));
//     }
// };
// newObj.getAsyncData();

if(!Function.prototype.bind){
    Function.prototype.bind = function(tObj){
        if(typeof this == 'function'){
            throw new TypeError('Function.prototype.bind - the mainObj must be a function');
        }

        var aArgs = Array.prototype.slice.call(arguments,1),
            fToBind = this,
            fNOP = function(){},
            fBound = function(){
                return fToBind.apply(this instanceof fNOP
                        ?this
                        :tObj || this,
                    aArgs.concat(Array.prototype.splice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype  = new fNOP();

        return fBound;

    }
}

var commonFun={
    //添加cookie
    addCookie:function(name,value,iDay){
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = name + '=' + value + '; path=/; expires=' + oDate;
        document.cookie = name + '=' + value + '; path=/; expires=' + oDate;
    },
    //获取cookie
    getCookie:function(name){
        var arr=document.cookie.split('; ');
        for(var i=0;i<arr.length;i++){
            var key = arr[i].substring(0,arr[i].indexOf('=')),
                value = arr[i].substring(arr[i].indexOf('=')+1);
            if(name === key){
                return value;
            }
        }
        return '';
    },
    //移除cookie
    removeCookie:function(name){
        addCookie(name,'1',-1);
    },
    //stamp2time和time2stamp   2个时间转换的毫秒数会被忽略。
    stamp2time:function(b){
        b = b || new Date().getTime();
        var a = new Date(parseInt(b));
        var year = a.getFullYear();
        var month = parseInt(a.getMonth()) + 1;
        month = (month < 10) ? "0" + month : month;
        var date = a.getDate();
        date = (date < 10) ? "0" + date : date;
        var hours = a.getHours();
        hours = (hours < 10) ? "0" + hours : hours;
        var minutes = a.getMinutes();
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        var seconds = a.getSeconds();
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    },
    //传入时间戳，输出日期部分
    stamp2date:function(b) {
        b = b || new Date().getTime();
        var a = new Date(parseInt(b));
        var year = a.getFullYear();
        var month = parseInt(a.getMonth()) + 1;
        month = (month < 10) ? "0" + month : month;
        var date = a.getDate();
        date = (date < 10) ? "0" + date : date;
        return year + "-" + month + "-" + date;
    },
    //a :   2012-12-13   2012-12-12 12:12:33  自动补位
    time2stamp:function(){
        var new_str = a.replace(/:/g, '-');
        new_str = new_str.replace(/ /g, '-');
        new_str = new_str.replace(/ /g, '-');
        var arr = new_str.split("-");
        if (arr.length != 6) {
            for (var i = 0, l = 6 - arr.length; i < l; i++) {
                arr.push(0);
            }
        }
        return new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5])).getTime();
    },
    mixTime2Days:function(b){
        b = b || new Date().getTime();
        var oDate = new Date(),
            t = oDate.getTime(),
            submix = t - b;

        var day = Math.floor(submix/86400000);
        var hours = Math.floor(submix/3600000);
        var minutes = Math.floor(submix/60000);

        return day == 0?(hours == 0?minutes+'分钟':hours+'小时'):day+'天';
    },
    //获取地址栏参数
    getUrlParam:function(param){
        var find_val = "";

        var search = window.location.search;
        search = search.substr(1);
        var searchs = search.split("&");

        for (var i = 0, l = searchs.length; i < l; i++) {
            var this_val = searchs[i],
                this_keys = this_val.split("="),
                this_key = this_keys[0];

            if (this_key == param) {
                find_val = this_keys[1];
                break;
            }
        }
        return find_val;
    },
    //获取地址栏参数并转化为字典对象  xxxxx?a=1&b=2 => {a:1,b:2}
    getUrlParamObj:function(url){
        url = url == null?window.location.href: url;

        var urlString = url.substring(url.lastIndexOf('?')+1),
            obj = {},
            reg = /([^?&=]+)=([^?&=]*)/g;

        urlString.replace(reg,function(rs,$1,$2){
            var name = encodeURIComponent($1),
                val = encodeURIComponent($2);

            val = String(val);
            obj[name] = val;

            return rs;
        });

        return obj;
    },
    //数组对象排序
    objSort:function(){
        data.sort(function(a,b){
            var ret = a[key] > b[key] ? 1 : -1
            return ret;
        })
        return data;
    },
    //数组求和
    sum:function(arr){
        var result=0;
        for(var i=0;i<arr.length;i++){
            result+=arr[i]
        }
        return result;
    },
    //字符串长度
    getByLen:function(str,num){
        var n=0;
        var iNum=0;
        for(var i=0; i<str.length; i++){
            if(str.charCodeAt(i)>='0x4e00' && str.charCodeAt(i)<='0x9fa5'){
                n+=2;
                iNum++;
                if(n>=num){
                    return iNum;
                }
            }else{
                n+=1;
                iNum++
                if(n>=num){
                    return iNum;
                }
            }
        }
    },
    setSessionItem:function(name,value){
        if(window.sessionStorage){
            window.sessionStorage.setItem(name,JSON.stringify(value));
        }else{
            console.log('你的浏览器不支持sessionStorage');
        }
    },
    getSessionItem:function(name){
        if(window.sessionStorage){
            return JSON.parse(window.sessionStorage.getItem(name));
        }else{
            console.log('你的浏览器不支持sessionStorage');
        }
    },
    setLocalItem:function(name,value){
        if(window.localStorage){
            window.localStorage.setItem(name,JSON.stringify(value));
        }else{
            console.log('你的浏览器不支持localStorage');
        }
    },
    getLocalItem:function(name){
        if(window.localStorage){
            return JSON.parse(window.localStorage.getItem(name));
        }else{
            console.log('你的浏览器不支持localStorage');
        }
    },
    removeSessionIem:function(name){
        if(window.sessionStorage){
            window.sessionStorage.removeItem(name);
        }else{
            console.log('你的浏览器不支持sessionStorage');
        }
    },
    loginEmail:function(email){
        url = email.split("@")[1];
        if(constants.email[url]){
            window.location.href=constants.email[url];
        }else{
            $.message({
                type:"info",
                skin:2,
                str:"系统未找到对应邮箱地址，请自行登录邮箱进行验证。"
            });
        }
    },
    getSex:function(idCard) {           //根据身份证获取性别
        var sex = "";
        if(idCard != null && idCard != ""){
            if(idCard.length == 15){
                sex = idCard.substr(14,1);
            } else if(idCard.length == 18){
                sex = idCard.substr(16,1);
            }
            sex = parseInt(sex)%2==1?1:0;
        }
        return sex;
    },
    getAge:function(idCard){             //根据身份证获取年龄
        var age=0,year=0,month=0,day=0;
        if(idCard != null && idCard != ""){
            if(idCard.length == 15){
                year = parseInt("19"+idCard.substr(6,2));
                month = parseInt(idCard.substr(8,2));
                day = parseInt(idCard.substr(10,2));
            } else if(idCard.length == 18){
                year = parseInt(idCard.substr(6,4));
                month =parseInt(idCard.substr(10,2));
                day = parseInt(idCard.substr(12,2));
            }
            var date = new Date();
            var nowMonth = date.getMonth() + 1;
            var nowDay = date.getDate();
            age = date.getFullYear() - year - 1;
            if(nowMonth>month||(nowMonth==month && nowDay>day)){
                age++;
            }
        }
        return age;
    },
    _matchPriceNum:function(val){//匹配输入数字
        val=val.replace(/[^0-9|\.^]/g,'');
        if(val.toString().indexOf('.')==0){//首位不能输入小数点
            val=''
        }
        if(val.toString().indexOf('.')==-1){//整数
            val=val.substring(0,5)
        }else{//存在小数点
            var num=val.toString().indexOf('.');//判断小数点位数
            for(var i=num+1;i<val.toString().length;i++){

                if(val.toString()[i]=='.'){
                    val=val.substring(0,i); //只能输入一个小数点
                }
            }
            val=val.substring(0,val.substring().indexOf('.')+3)
        }
        val = +val>99999?99999:val;
        return val
    }
}

Array.prototype.kyMax = function() {
    var max = this[0];
    var len = this.length;
    for (var i = 1; i < len; i++){
        if (this[i] > max) {
            max = this[i];
        }
    }
    return max;
}
