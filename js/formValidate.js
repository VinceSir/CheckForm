/*
* 作者：Vince.sir
* 创建于：2016-04-01
* email:vince.sir@outlook.com
*
* 调用方式:
* $(formID).formValidate(验证对象{rules:{表单元素Name:[{type:'验证类型',msg:'error文本',rule:'验证规则'}]},info:{表单元素Name:{ok:'成功提示文本',prompt:'鼠标触发元素焦点提示文本'}}})
* type类型：
* 1.checkRequired->非空
* 2.checkRegular->正则验证
* 3：checkFunction->自定义方法验证
* 4.checkContrast->对比验证
* 5.checkOptional->选填验证
*
*rule规则：
* type:'checkRequired'，则不需要传递参数
* type:'checkRegular'，rule传递验证规则
* type:'checkFunction'，rule传递自定义方法，返回　true和false
* type:'checkContrast'，rule传入对比元素id
* type:'checkOptional'，rule传递验证规则
* */
(function($){
	var _Object = {};
	$.fn.formValidate = function(object,reValue){
		_Object = object;
		var _this = $(this);
		_this.find('*').blur(function(){
			var inputName = $(this).attr('name');
			if(_Object.rules[inputName]){
				var	obj =_Object.rules[inputName];
			}
			if(_Object.info[inputName]){
				var prompt = _Object.info[inputName];
				$return = $.formValidate.inputValidate($(this),obj,prompt);
			}
		});

		_this.find('*').focus(function(){
			eval("var prompt = object.info."+inputName);
			var inputName = $(this).attr('name');
			if(object.info[inputName]){
				var prompt = object.info[inputName].prompt;
				$.formValidate.checkFocus($(this),prompt);
			}
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
		checkRequired:function(_this,errorInfo)
		{
			var formType = _this.get(0).tagName;

			switch(formType){
				case 'INPUT':{
					var inputType = _this.attr('type');
					if(inputType == 'text' || inputType == 'password'){
						if(!_this.val()){
							this.error(_this,errorInfo);
						}else{
							if(this.thisTS){
								this.success(_this,this.thisTS.ok);
							}
						}
					}else if(inputType == "checkbox"){
						if(!_this.attr('checked')){
                            this.error(_this,errorInfo);
                        }else{
                            if(this.thisTS){
                                this.success(_this,this.thisTS.ok);
                            }
						}
					}
					break;
				}
				case 'SELECT':{
					if(_this.find("option:selected").text() == _this.find("option").eq(0).text()){
						this.error(_this,errorInfo);
					}else{
						if(this.thisTS){
							this.success(_this,this.thisTS.ok);
						}
					}
				}
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
				if(this.thisTS){
					this.success(_this,this.thisTS.ok);
				}
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
				if(this.thisTS){
					this.success(_this,this.thisTS.ok);
				}
			}
		},
		checkContrast:function(_this,rule,errorInfo)
		{
			if(typeof rule == "object" || typeof rule == "Object"){
				if(_this.val()!=rule.val())
				{
					this.error(_this,errorInfo);
				}
				else
				{
					if(this.thisTS){
						this.success(_this,this.thisTS.ok);
					}
				}
			}else{
				return
			}
		},
		checkOptional:function(_this,rule,errorInfo)
		{
			if(_this.val())
			{

                this.checkRegular()
				eval("var regularName = this.regular."+rule);
				if(!regularName.test(_this.val()))
				{
					this.error(_this,errorInfo);
				}
				else
				{
					if(this.thisTS){
						this.success(_this,this.thisTS.ok);
					}
				}
			}else{
				_this.parent().siblings('.msg').removeAttr('style').text('');
			}
		},
		error:function(_this,errorMsg)
		{
			var activeClassName = 'error';
			this.activeClassName(_this,errorMsg,activeClassName);
			this._error = false;
		},
		success:function(_this,successMsg){
			var activeClassName = 'success';
			this.activeClassName(_this,successMsg,activeClassName);
			this._error = true;
		},
		checkFocus:function(_this,promptMsg){
			var activeClassName = 'prompt';
			this.activeClassName(_this,promptMsg,activeClassName);
		},
		activeClassName:function (_this,msgText,activeClassName) {
			switch(activeClassName){
				case 'success':
					addActive('error','prompt')
					_this.parent().siblings('.msg').addClass(activeClassName).text(msgText);
					break;
				case 'error':
					addActive('success','prompt')
					_this.parent().siblings('.msg').addClass(activeClassName).text(msgText);
					break;
				case 'prompt':
					addActive('success','error')
					break;
			}
			function addActive(a,b) {
				if(_this.parent().siblings('.msg').hasClass(a)){
					_this.parent().siblings('.msg').removeClass(a);
				}
				if(_this.parent().siblings('.msg').hasClass(b)){
					_this.parent().siblings('.msg').removeClass(b);
				}
				_this.parent().siblings('.msg').addClass(activeClassName).text(msgText);
			}
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