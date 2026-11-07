const DataQuery = {
  /**
   * 缓存：号码到所有属性的映射
   * @private
   */
  _numToAttrMap: null,
  
  /**
   * 缓存：属性到号码的反向映射
   * @private
   */
  _attrToNumMap: null,

  /**
   * 初始化数据查询模块（预计算所有映射关系）
   */
  init: () => {
    if(DataQuery._numToAttrMap && DataQuery._attrToNumMap) {
      return;
    }
    
    DataQuery._numToAttrMap = {};
    DataQuery._attrToNumMap = {
      zodiac: {},
      color: {},
      element: {},
      type: {},
      head: {},
      tail: {},
      sum: {},
      sumOdd: {},
      sumSize: {},
      tailSize: {},
      bs: {},
      colorsx: {}
    };
    
    for(let num = 1; num <= 49; num++) {
      const attrs = DataQuery.getNumAttrs(num);
      DataQuery._numToAttrMap[num] = attrs;
      
      Object.keys(attrs).forEach(key => {
        if(DataQuery._attrToNumMap[key]) {
          if(!DataQuery._attrToNumMap[key][attrs[key]]) {
            DataQuery._attrToNumMap[key][attrs[key]] = [];
          }
          DataQuery._attrToNumMap[key][attrs[key]].push(num);
        }
      });
    }
  },

  /**
   * 获取单个号码的所有属性
   * @param {number} num - 号码 (1-49)
   * @returns {Object} 包含所有属性的对象
   */
  getNumAttrs: (num) => {
    num = Number(num);
    const s = Utils.formatNum(num);
    const head = Math.floor(num / 10);
    const tail = num % 10;
    const sum = head + tail;
    const sumOdd = sum % 2 === 1 ? '合单' : '合双';
    const sumSize = sum >= 7 ? '合大' : '合小';
    const tailSize = tail >= 5 ? '尾大' : '尾小';
    const big = num >= 25 ? '大' : '小';
    const odd = num % 2 === 1 ? '单' : '双';
    const bs = big + odd;
    
    const color = Utils.getColorName(num);
    const element = Utils.getWuxing(num);
    
    const type = CONFIG.JIAQIN.includes(DataQuery._getZodiacByNum(num)) ? '家禽' : '野兽';
    
    return {
      num,
      s,
      color,
      element,
      zodiac: DataQuery._getZodiacByNum(num),
      type,
      head,
      tail,
      sum,
      sumOdd,
      sumSize,
      tailSize,
      big,
      odd,
      bs,
      colorsx: color + odd
    };
  },

  /**
   * 根据号码获取生肖（私有辅助方法）
   * @private
   * @param {number} num - 号码
   * @returns {string} 生肖
   */
  _getZodiacByNum: (num) => {
    const state = StateManager._state;
    if(state.zodiacCycle && state.zodiacCycle.length === 12) {
      return state.zodiacCycle[(num - 1) % 12];
    }
    const fallbackCycle = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
    return fallbackCycle[(num - 1) % 12];
  },

  /**
   * 通过属性获取号码列表
   * @param {string} attrType - 属性类型 (zodiac/color/element/type/head/tail/sum/bs/colorsx)
   * @param {string|number} attrValue - 属性值
   * @returns {Array<number>} 号码列表
   */
  getNumsByAttr: (attrType, attrValue) => {
    DataQuery.init();
    if(!DataQuery._attrToNumMap[attrType]) {
      return [];
    }
    return DataQuery._attrToNumMap[attrType][attrValue] || [];
  }
};
