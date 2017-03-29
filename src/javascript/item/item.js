/**
 * Created by wy on 17/3/16.
 * ------------------------------------------
 * regular todo
 * @version  1.0
 * @author   吴耀(hzwuyao1@corp.netease.com)
 * @path  pro/item/item
 * ------------------------------------------
 */

NEJ.define([
	'pro/util/extend',
	'pro/store/code',
	'regular!./item.html'
],function(_,cst,tpl){
    var ENTER_KEY = 13;
    var item =  Regular.extend({
        name: 'ux-item',
        template: tpl,
        
        config: function(){
        	this.supr();
        	_.extend(this.data, {
        		selected: false,
        		cst: cst,
        	});
        },

        onClick: function(event){
        	if(this.data.item.status == cst.COMPLETED_TODO){
        		this.data.item.status = cst.ACTIVE_TODO;
        	}else{
        		this.data.item.status = cst.COMPLETED_TODO;
        	}
        	this.$emit('update', {
        		item: this.data.item
        	});
        },

        onDBlClick: function(event){
            setTimeout(function(){
                document.getElementById('input-' + this.data.item.id).focus();
            }.bind(this),0);
        	this.data.item.mode = cst.EDIT_MODE;
        	this.$emit('update', {
        		item: this.data.item
        	});
        },

        onFocusout: function(){
            document.getElementById("new-todo").focus();
            this.data.item.mode = cst.VIEW_MODE;
            this.$emit('update', {
                item: this.data.item
            });
        },

        onKeyup: function(event){
            var val = event.target.value;
            if (event.which !== ENTER_KEY || !val) {
                return;
            }
            this.data.item.title = val;

            this.$emit('update', {
                item: this.data.item
            })
        },

        onClearItem: function(){
            this.$emit('clearitem', {
                item: this.data.item
            })
        }
    });
    return item;
});