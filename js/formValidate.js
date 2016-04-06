// JavaScript Document
(function($){
	var _Object = {};
	$.fn.formValidate = function(object,reValue){
		_Object = object;
		$('input').blur(function()
		{
			var inputName = $(this).attr('name');
			if(_Object.rules[inputName]){
				var	obj =_Object.rules[inputName];
			}
			if(_Object.info[inputName]){
				var prompt = _Object.info[inputName];
			}
			$return = $.formValidate.inputValidate($(this),obj,prompt);
		})
		$('input').focus(function(){
			eval("var prompt = object.info."+inputName);
			var inputName = $(this).attr('name');
			if(object.info[inputName]){
				var prompt = object.info[inputName].prompt;
			}
			$.formValidate.checkFocus($(this),prompt);
		})
	}
	$.formValidate = {
		_error:false,
		thisTS:{},
		regular:{
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
		inputValidate:function(_this,obj,prompt)
		{
			this.thisTS = prompt;
			if(obj){
				for(var i=0; i<obj.length;i++){
					switch(obj[i].type)
					{
						case 'required':
							this.checkRequired(_this,obj[i].msg);
							break;
						case 'regular':
							this.checkRegular(_this,obj[i].rule,obj[i].msg);
							break
						case 'function':
							this.checkFunction(_this,obj[i].rule,obj[i].msg);
							break;
						case 'contrast':
							this.checkContrast(_this,obj[i].rule,obj[i].msg);
							break;
						case 'optional':
							this.checkOptional(_this,obj[i].rule,obj[i].msg);
							break;
					}
					if(!this._error)
						break;
				}

			}
			return this._error;
		},
		checkFocus:function(_this,prompt){
			_this.parent().siblings('.msg').css({color:'#464646'}).text(prompt);
		},
		checkRequired:function(_this,errorInfo)
		{
			if(!_this.val())
			{
				this.error(_this,errorInfo);
			}
			else
			{
				this.success(_this,this.thisTS.ok);
			}
		},
		checkRegular:function(_this,rule,errorInfo)
		{
			eval("var regularName = this.regular."+rule);
			if(!regularName.test(_this.val()))
			{
				this.error(_this,errorInfo);
			}
			else
			{
				this.success(_this,this.thisTS.ok);
			}
		},
		checkFunction:function(_this,rule,errorInfo)
		{
			var a = rule();
			if(!a)
			{
				this.error(_this,errorInfo);
			}
			else
			{
				this.success(_this,this.thisTS.ok);
			}
		},
		checkContrast:function(_this,rule,errorInfo)
		{
			if(typeof rule == "Object"){
				if(_this.val()!=rule.val())
				{
					this.error(_this,errorInfo);
				}
				else
				{
					this.success(_this,this.thisTS.ok);
				}
			}else{
				return
			}
		},
		checkOptional:function(_this,rule,errorInfo)
		{
			if(_this.val())
			{
				eval("var regularName = this.regular."+rule);
				if(!regularName.test(_this.val()))
				{
					this.error(_this,errorInfo);
				}
				else
				{
					this.success(_this,this.thisTS.ok);
				}
			}else{
				_this.parent().siblings('.msg').removeAttr('style').text('');
			}
		},
		error:function(_this,errorMsg)
		{
			_this.parent().siblings('.msg').css({color:'red'}).text(errorMsg);
			this._error = false;
		},
		success:function(_this,successMsg){
			_this.parent().siblings('.msg').css({color:'#5fd3a3'}).text(successMsg);
			this._error = true;
		},
		checkSubmit:function(_this)
		{
			_this.find("input").each(function(){

				var inputName = $(this).attr('name');
				if(_Object.rules[inputName]){
					var	obj =_Object.rules[inputName];
				}
				if(_Object.info[inputName]){
					var prompt = _Object.info[inputName];
				}
				$.formValidate.inputValidate($(this),obj,prompt);
			});
			return this._error;
		}
	}
})(jQuery);