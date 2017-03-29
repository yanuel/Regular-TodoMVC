/**
 * Created by wy on 17/3/16.
 * ------------------------------------------
 * regular todo
 * @version  1.0
 * @author   吴耀(hzwuyao1@corp.netease.com)
 * @path  pro/app/app
 * ------------------------------------------
 */

NEJ.define([
	'pro/util/extend',
	'regular!./app.html',
	'pro/store/store',
	'pro/store/code',
	'pro/item/item',
	'pro/footer/footer'
],function(_,tpl,store,cst){
	var ENTER_KEY = 13;
    var app =  Regular.extend({
        name: 'app',
        template: tpl,
        
        config: function(){
        	this.supr();
        	_.extend(this.data, {
        		value: '',
        		items: [],
        		open: false,
        		cst: cst,
        		hash: location.hash.substring(2),
        		showAll: false,
        		selectAll: false
        	});

        	this.$watch('hash', function(newVal, oldVal){
        		if(newVal == '' || newVal != 'all' && newVal != 'active' && newVal != 'completed'){
        			location.hash = '#/all';
        			this.data.hash = 'all';
        			return;
        		}
                this.transformMode();
        		this.render(newVal);
        	}.bind(this));
        },

        init: function(){
        	this.supr();
        	this.data.open = !!store.store('todos-jquery').length;
        	this.$update();
        },

        onKeyup: function(event){
			if (event.which !== ENTER_KEY || !this.data.value) {
				return;
			}

			this.data.items = this.getAllItems();

			this.data.items.push({
				id: new Date().getTime(),
				title: this.data.value,
				status: cst.ACTIVE_TODO,
				mode: cst.VIEW_MODE
			});

			store.store('todos-jquery', this.data.items);

			this.data.value = '';
			this.render();
        },

        onSelect: function(event){
        	this.data.hash = event.type;
        },

        render: function(type){
        	var hash = type || location.hash.substring(2);
        	if(hash == cst.ALL_TODO){
        		this.data.items = this.getAllItems();
        	}else if(hash == cst.COMPLETED_TODO){
        		this.data.items = this.getCompletedItems();
        	}else if(hash == cst.ACTIVE_TODO){
        		this.data.items = this.getActiveItems();
        	}else{
        		this.data.items = [];
        	}

            this.data.open = !!this.getAllItems().length;
        	this.data.showAll = !!this.data.items.length;
            this.data.clear = !!this.getCompletedItems().length;
        	this.data.selectAll = this.getAllItems().length == this.getCompletedItems().length;
        	this.data.count = this.getActiveItems().length;

            setTimeout(function(){
                document.getElementById("new-todo").focus();
            }.bind(this),0);
        	this.$update();
        },

        onClick: function(){
        	if(this.data.selectAll){
        		this.transformStatus(cst.ACTIVE_TODO);
        	}else{
        		this.transformStatus(cst.COMPLETED_TODO);
        	}
        	this.render();
        },

        transformStatus: function(type){
        	var items = this.getAllItems();
        	items.forEach(function(item){
        		item.status = type;
        	});
        	store.store('todos-jquery', items);
        },

        transformMode: function(){
            var items = this.getAllItems();
            items.forEach(function(item){
                item.mode = cst.VIEW_MODE;
            });
            store.store('todos-jquery', items);
        },

        onUpdate: function(event){
            this.updateStore(event.item);
            this.render();
        },

        onClearItem: function(event){
            var items = this.getAllItems();
            var i = this.getIndexFromItems(items, event.item);

            items.splice(i, 1);  
            store.store('todos-jquery', items);  
            this.render();       
        },

        onClearItems: function(){
            var items = this.getActiveItems();
            store.store('todos-jquery', items);
            this.render();
        },

        getAllItems: function(){
        	return store.store('todos-jquery');
        },

        getCompletedItems: function(){
        	return store.store('todos-jquery').filter(function(v){
    			return v.status == cst.COMPLETED_TODO;
    		});
        },

        getActiveItems: function(){
        	return store.store('todos-jquery').filter(function(v){
    			return v.status == cst.ACTIVE_TODO;
    		});
        },

        updateStore: function(item){
            var items = this.getAllItems();
        	var i = this.getIndexFromItems(items, item);

			items[i] = item;

			store.store('todos-jquery', items);
        },

        getIndexFromItems: function(items, item){
            var i = items.length;

            while (i--) {
                if (items[i].id === item.id) {
                    return i;
                }
            };
        }
    });
    return app;
});