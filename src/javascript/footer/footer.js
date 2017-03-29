/**
 * Created by wy on 17/3/16.
 * ------------------------------------------
 * regular todo
 * @version  1.0
 * @author   吴耀(hzwuyao1@corp.netease.com)
 * @path  pro/footer/footer
 * ------------------------------------------
 */

NEJ.define([
	'pro/util/extend',
	'regular!./footer.html',
	'pro/store/code',
],function(_,tpl,cst){
    var footer =  Regular.extend({
        name: 'ux-footer',
        template: tpl,
        
        config: function(){
        	this.supr();
        	_.extend(this.data, {
        		cst: cst,
        		selected: location.hash.substring(2) || cst.ALL_TODO
        	});
        },

        init: function(){
        	this.supr();
        },

        onClick: function(type){
        	this.data.selected = type;
        	this.$emit('select',{
        		type: type
        	});
        },

        onClearItems: function(){
            this.$emit('clearitems');
        }
    });
    return footer;
});