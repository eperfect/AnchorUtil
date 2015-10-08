/**
 * 该工具类用于解决EgretEngine2.5版本没有anchorX/anchorY属性值的问题
 * 在创建游戏场景前需要执行AnchorUtil.init()初始化工具并完成属性的注入
 * AnchorUtil.setAnchorX(target, anchorX) 设置对象的anchorX值
 * AnchorUtil.setAnchorY(target, anchorY) 设置对象的anchorY值
 * AnchorUtil.setAnchor(target, anchor) 同时设置对象的anchorX和anchorY值
 *
 * Created by Saco on 2015/9/16.
 */
class AnchorUtil{
    private static _isInited;
    private static _propertyChange:any;
    private static _anchorChange:any;

    /**
     * 初始化工具类，并完成注入anchorX/anchorY属性
     */
    public static init():void {
        if(this._isInited) return;
        this._propertyChange = Object.create(null);
        this._anchorChange = Object.create(null);
        this.injectAnchor();
        this._isInited = true;
    }

    /**
     * 设置对象的anchorX值
     * @param target 被设置相对冒点属性的对象
     * @param value 相对锚点值
     */
    public static setAnchorX(target:egret.DisplayObject, value:number):void{
        target["anchorX"] = value;
    }

    /**
     * 设置对象的anchorY值
     * @param target 被设置相对冒点属性的对象
     * @param value 相对锚点值
     */
    public static setAnchorY(target:egret.DisplayObject, value:number):void{
        target["anchorY"] = value;
    }

    /**
     * 设置对象的anchor值，同时改变anchorX和anchorY值
     * @param target 被设置相对冒点属性的对象
     * @param value 相对锚点值
     */
    public static setAnchor(target:egret.DisplayObject, value:number):void{
        target["anchorX"] = target["anchorY"] = value;
    }

    /**
     * 获得对象的anchorX值
     * @param target 取值的对象
     * @returns {any|number} anchorX值
     */
    public static getAnchorX(target:egret.DisplayObject):number {
        return target["anchorX"] || 0;
    }

    /**
     * 获得对象的anchorY值
     * @param target 取值的对象
     * @returns {any|number} anchorY值
     */
    public static getAnchorY(target:egret.DisplayObject):number {
        return target["anchorY"] || 0;
    }

    /**
     * 注入anchorX/anchorY属性，并重写引擎底层方法实现相对锚点
     */
    private static injectAnchor():void{
        Object.defineProperty(egret.DisplayObject.prototype, "width", {
            get: function () {
                return this.$getWidth();
            },
            set: function (value) {
                this.$setWidth(value);
                AnchorUtil._propertyChange[this.hashCode] = true;
                egret.callLater(()=>{
                    AnchorUtil.changeAnchor(this);
                }, this);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(egret.DisplayObject.prototype, "height", {
            get: function () {
                return this.$getHeight();
            },
            set: function (value) {
                this.$setHeight(value);
                AnchorUtil._propertyChange[this.hashCode] = true;
                egret.callLater(()=>{
                    AnchorUtil.changeAnchor(this);
                }, this);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(egret.DisplayObject.prototype, "anchorX", {
            get: function () {
                return this["_anchorX"];
            },
            set: function (value) {
                this._anchorX = value;
                AnchorUtil._propertyChange[this.hashCode] = true;
                AnchorUtil._anchorChange[this.hashCode] = true;
                egret.callLater(()=>{
                    AnchorUtil.changeAnchor(this);
                }, this);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(egret.DisplayObject.prototype, "anchorY", {
            get: function () {
                return this["_anchorY"];
            },
            set: function (value) {
                this._anchorY = value;
                AnchorUtil._propertyChange[this.hashCode] = true;
                AnchorUtil._anchorChange[this.hashCode] = true;
                egret.callLater(()=>{
                    AnchorUtil.changeAnchor(this);
                }, this);
            },
            enumerable: true,
            configurable: true
        });
    }

    private static changeAnchor(tar:any):void{
        if(AnchorUtil._propertyChange[tar.hashCode] && AnchorUtil._anchorChange[tar.hashCode]){
            tar.anchorOffsetX = tar._anchorX * tar.width;
            tar.anchorOffsetY = tar._anchorY * tar.height;
            delete AnchorUtil._propertyChange[tar.hashCode];
        }
    }
}
