/**
 * 业务层：Giong 号码→生肖映射工具
 * 职责：仅提供号码↔生肖转换（供 business-main.js 回测记录使用）
 * 说明：原 Giong 双链推荐引擎（旧链/新链/融合）已无任何调用方，于 2026-11-07 移除
 */
const BusinessGiong = {

  // NUM_TO_ZODIAC 已迁移到 CONFIG（2026-06-09 重构）
  NUM_TO_ZODIAC: CONFIG.NUM_TO_ZODIAC,

  _toZodiac: function(num) {
    return this.NUM_TO_ZODIAC[num] || '';
  }
};
