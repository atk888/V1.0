 Vue.component('layer-up', {
 	props: ['title', 'message'],
 	template: '\
 	    <div class="modal">\
 	        <div class="modal_dialog">\
 	            <div class="modal_content">\
 	                <h3 class="modal_title">{{title}}</h3>\
 	                <div class="rule_text">{{message}}</div>\
 	                <a href="javascript:void(0)" class="modal_close" @click="app.hidePop()">X</a>\
 	            </div>\
 	        </div>\
 	    </div>'
 });



 Vue.filter("numFilter", function(value) {
 	if(isNaN(value)){
 		return "--"
 	}
 	let realVal = parseFloat(value).toFixed(4);
 	return realVal
 });

