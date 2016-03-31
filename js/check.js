/**
 * Created by Vince on 2016/3/29.
 */

$(function () {
    $('from').check([
        {
            'name': 'uname',
            'check':{
                1:{
                    type:'required',
                    msg:'昵称不能为空'
                }
            }
        },
        {
            'name': 'passwd',
            'check':{
                1:{
                    type:'required',
                    msg:'密码不能为空'
                },
                2:{
                    type:'passwd',
                    msg:'请正确输入密码'
                }
            }
        },
        {
            'name': 'upasswd',
            'check':{
                1:{
                    type:'required',
                    msg:'密码不能为空'
                },
                2:{
                    type:'passwd',
                    msg:'请正确输入密码'
                },
                3:{
                    type:'upasswd',
                    msg:'两次密码输入不一直'
                }
            }
        },
        {
            'name': 'email',
            'check':{
                1:{
                    type:'required',
                    msg:'请填写邮箱'
                },
                2:{
                    type:'email',
                    msg:'请正确输入邮箱'
                }
            }
        }
    ]);
});

(function ($) {
    $.fn.check=function(list){
        $.each(list,function (i,v) {
            var $n = '';
            $n = v.name;

            $.each(v.check,function(index,val){
                var $type = '',
                    $msg = '';
                $type = val.type;
                $msg = val.msg;

                $("input[name='"+$n+"']").focus(function(){
                    
                });
                //离开焦点触发验证
                $("input[name='"+$n+"']").blur(function(){
                    obtainCheck($n,$type,$msg);
                });

            })

        });

        function obtainCheck(checkName,checkType,checkMsg){
            var active;
            if(checkType == 'required'){
                var el = $("input[name = '"+ checkName +"']"),
                    val = el.val();
                active = require(val);
                if (active == false){
                    error(el,checkMsg);
                }else{
                    promptFun(el);
                }
            }else if( checkType == 'upasswd'){
                var el = $("input[name = '"+ checkName +"']"),
                    pass = $("input[name = 'passwd']").val();
                    val = el.val();
                active = upasswd(pass,val);
                if (active == false){
                    error(el,checkMsg);
                }else{
                    promptFun(el);
                }
            }else{
                if(checkName == 'upasswd'){
                    checkName = 'passwd';
                }
                var el = $("input[name = '"+ checkName +"']"),
                    regularTest = regular[checkName];
                active = checkFunction(checkName,regularTest);
                if( active == false){
                    error(el,checkMsg);
                }else{
                    promptFun(el);
                }
            }
        }

        /*
        * 非空验证
        * 验证id
        * */
        function require(el) {
            if(el == null || el == ''){
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
            if(passwd != upasswd){
                return false;
            }
        }
        /*
         * 报错
         * id:返回验证id
         * msg:返回验证文本
         * */
        
        function promptFun(id) {
            var sibid = id.parent().siblings('.msg');
            id.removeAttr('style');
            id.css({
                'border':theme.correct.border,
            })
            sibid.removeAttr('style').text('')
        }
        
        
        function error(id,msg){
            var sibid = id.parent().siblings('.msg');
            id.css({
                'border':theme.error.border,
                'color':theme.error.color
            })
            sibid.text(msg).css({
                'color':theme.error.color
            });
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
            'passwd':/[a-zA-Z0-9]{6,16}/,
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



