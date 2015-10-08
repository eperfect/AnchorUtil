# AnchorUtil 
###介绍
该工具类用于解决EgretEngine2.5版本没有anchorX/anchorY属性值的问题

###使用说明
在创建游戏场景前需要执行AnchorUtil.init();初始化工具并完成属性的注入

方式一（推荐）：
 * AnchorUtil.setAnchorX(target, anchorX); //设置对象的anchorX值
 * AnchorUtil.setAnchorY(target, anchorY); //设置对象的anchorY值
 * AnchorUtil.setAnchor(target, anchor); //同时设置对象的anchorX和anchorY值

方式二：
 *target["anchorX"] = value; //设置对象的anchorX值
 *target["anchorY"] = value; //设置对象的anchorY值
 *target["anchor"] = value; //同时设置对象的anchorX和anchorY值

方式三：
修改egret.d.ts，在DisplayObject声明中添加anchorX、anchorY和anchor属性，代码的写法和引擎之前版本相同：
*target.anchorX = value; //设置对象的anchorX值
 *target.anchorY = value; //设置对象的anchorY值
 *target.anchor = value; //同时设置对象的anchorX和anchorY值
