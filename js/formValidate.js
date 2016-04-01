// JavaScript Document
(function($){
	$.fn.inputValidate = function(obj){
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
		};
		var formName = $(this).attr('name');
		if(obj){
			for(var i=0; i<obj.length;i++){
				error = true;
				if(obj[i].rule=='required'){
					if(!$(this).val()){
						_error(formName,obj[i].msg);
						break;
					}
				}else if(obj[i].type){
					if(obj[i].type == 'contrast'){
						var active = '';
						active = contrast(formName,obj[i].rule);
						if(!active){
							_error(formName,obj[i].msg);
							break;
						}
					}
				}else{
					eval("var regularName = regular."+obj[i].rule);
						if(!regularName.test($(this).val())){
							_error(formName,obj[i].msg);
							break;
						}

				}
			}
		}
		//对比两个对象的的值是否相同
		function contrast(a,b){
			if($('input[name='+ a +']').val()!=$('input[name='+ b +']').val()){
				return false;
			}else{
				return true;
			}
		}

		function _error(formNmae,msg){
			error = false;
			$('input[name='+formNmae+']').parent().siblings('.msg').text(msg).css({'color':'#ff0000'});
		}
		if(error){
			$('input[name='+formName+']').parent().siblings('.msg').text('').removeAttr('style');
		}
		return error;
	}
	
	$.fn.formValidate = function(object){
		var error = true;
		$(this).find('input').blur(function(){
			var formName = $(this).attr('name');
			
		    eval("var obj = object."+formName);
			error = $(this).inputValidate(obj);
		});
		$(this).find('input').focus(function(){
			var placeholder = $(this).attr('placeholder');
			
			$(this).parents('li').find('.msg').text(placeholder);
		})
		
		$(this).submit(function(){
			$(this).find("input").each(function(){
				var formName = $(this).attr('name');
				eval("var obj = object."+formName);
				console.log(obj);
				error = $(this).inputValidate(obj);
			});
			if(error==false)
			{
				return false;
			}
			return true;
		})
	}
})(jQuery);

