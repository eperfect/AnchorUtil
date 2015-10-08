# AnchorUtil 
###介绍
该工具类用于解决EgretEngine2.5版本没有anchorX/anchorY属性值的问题

###使用说明
在创建游戏场景前需要执行AnchorUtil.init()初始化工具并完成属性的注入
 * AnchorUtil.setAnchorX(target, anchorX) 设置对象的anchorX值
 * AnchorUtil.setAnchorY(target, anchorY) 设置对象的anchorY值
 * AnchorUtil.setAnchor(target, anchor) 同时设置对象的anchorX和anchorY值
