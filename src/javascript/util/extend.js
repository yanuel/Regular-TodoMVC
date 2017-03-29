/**
 * Created by wy on 17/3/16.
 * ------------------------------------------
 * regular todo
 * @version  1.0
 * @author   吴耀(hzwuyao1@corp.netease.com)
 * @path  pro/footer/footer
 * ------------------------------------------
 */

NEJ.define(function(exports){
    /**
     * 数据合并接口，直接修改 o1 的内容
     *
     * @method  regular/src/javascript/util.extend
     * @param  {Object}  o1             - 目标数据对象
     * @param  {Object}  o2             - 来源数据对象
     * @param  {Boolean} override       - 是否重写
     * @param  {Boolean} hasOwnProperty - 是否需要判断对象属性
     * @return {Object}  目标数据对象
     */
    exports.extend = function (o1, o2, override, hasOwnProperty) {
        for (var i in o2){
            if ((!hasOwnProperty || o2.hasOwnProperty(i)) &&
                (override || o1[i] === undefined)){
                o1[i] = o2[i];
            }
        }
        return o1;
    };
});