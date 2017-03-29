/**
 * store
 *
 * @version  1.0
 * @author   hzwuyao1 <hzwuyao1@corp.netease.com>
 * @module   regular/src/javascript/store/store
 */
NEJ.define([
    
],function(
    
){ 
    return {
        store: function(namespace, data){
        	if (arguments.length > 1) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			} else {
				var store = localStorage.getItem(namespace);
				return (store && JSON.parse(store)) || [];
			}
        }
    };
});