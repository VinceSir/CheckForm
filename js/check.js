/**
 * Created by Vince on 2016/3/29.
 */

$(function () {
    $('from').check([
        {
            'name': 'passwd',
            'type':'ruquery',
            'msg':''
        },
        {
            'name': 'passwd',
            'type':{
                1:{
                    type:'x',
                    mes:''
                },
                1:{
                    type:'x',
                    mes:''
                },
                1:{
                    type:'x',
                    mes:''
                }
            }
        }
    ]);
});

(function ($) {
    $.fn.check=function(list){
        var checkName ='';
        $.each(list,function (i,v){
            comparison(i);
        })
        function comparison(name) {
            $.each();
        }



        /*
        * 报错
        * id:返回验证id
        * msg:返回验证文本
        * */
        function error(id,msg){
            var _id = $("input[name='"+id+"']");
            var sibid = _id.parent().siblings('.msg');
            _id.css({
                'border':theme.error.border,
                'color':theme.error.color
            })
            if(sibid.html(msg)){
                console.log(1)
            }else{
                console.log(2)
            }
            sibid.css({
                'color':theme.error.color
            });
        }
        /*
        * 非空验证
        * 验证id
        * */
        function require(el) {
            var v =  $(el).val();
            if(v == null || c == ''){
                return false;
            }
        }
        /*
        * 公共验证方法
        * el:验证id
        * regularName:验证类型
        *
        * */
        function checkFunction(el,regularName) {
            var v =  $(el).val();
            if(!regularName.test(v)){
                return false;
            }
        }
        /*
        * 确认密码验证
        * passwd:收入如果密码id
        * upasswd:验证密码狂id
        * */
        function upasswd(passwd,upasswd){
            var $passwd = passwd.val(),
                $upasswd = upasswd.val();
            if($passwd != $upasswd){
                return false;
            }
        }
        

        var regular = {
            'email':  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            'url':  /^http(s?):\/\/(?:[A-za-z0-9-]+\.)+[A-za-z]{2,4}(:\d+)?(?:[\/\?#][\/=\?%\-&~`@[\]\':+!\.#\w]*)?$/,
            'currency':  /^\d+(\.\d+)?$/,
            'number':  /^\d+$/,
            'zip':/^\d{6}$/,
            'integer':/^[-\+]?\d+$/,
            'double':/^[-\+]?\d+(\.\d+)?$/,
            'english':/^[A-Za-z]+$/,
            'mobile':/^0?(1[3587][0-9]|14[57])[0-9]{8}$/,
            'passwd':/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            'integer_nozero':/^[1-9]\d*$/,
            'price':/^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/,
            'phone':/^(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
            'qq':/^[1-9]{1}[0-9]{4,10}$/,
            'idcard':/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
            'bank_card':/^(\d{16}|\d{19})$/,
        },
        theme ={
            error:{
                'border':'1px solid #ff0000',
                'color':'#ff0000'
            },
            correct:{
                'border':'1px solid #32F37F',
                'color':'#32F37F'
            }
        }
    }



})(jQuery);



