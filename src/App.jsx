import { useEffect, useMemo, useRef, useState } from "react";

function assetPath(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

const yearMarks = [1985, 1990, 1995, 2001, 2010, 2015, 2020, 2024, 2026];

const palette = {
  grain: "#c6923f",
  vegetable: "#759b61",
  meat: "#bc4a35",
  aquatic: "#427f9e",
  dairy: "#d6b86b",
  fruit: "#dd8b3a",
  oil: "#b88928",
  takeout: "#2f756f",
};

const metrics = {
  grain: {
    label: "主食",
    short: "粮食",
    unit: "kg/人/年",
    color: palette.grain,
    baseline: "1985 城镇",
    latest: "2026 趋势延伸",
    values: { 1985: 251.7, 1990: 238.8, 1995: 217.0, 2001: 177.4, 2010: 148.0, 2015: 122.8, 2020: 120.2, 2024: 106.7, 2026: 103.0 },
    story: "饭桌上，主食不再负责填满一切。米面仍在，但它让出了位置。",
  },
  meat: {
    label: "肉类",
    short: "肉类",
    unit: "kg/人/年",
    color: palette.meat,
    baseline: "1985 城镇猪牛羊禽合计",
    latest: "2026 趋势延伸",
    values: { 1985: 16.7, 1990: 20.1, 1995: 25.8, 2001: 29.0, 2010: 31.8, 2015: 30.9, 2020: 27.4, 2024: 37.9, 2026: 39.2 },
    story: "过去只有年节才郑重登场的肉，后来成了普通日子的底气。",
  },
  vegetable: {
    label: "蔬菜",
    short: "蔬菜",
    unit: "kg/人/年",
    color: palette.vegetable,
    baseline: "1990 农村",
    latest: "2026 趋势延伸",
    values: { 1985: 130.0, 1990: 134.0, 1995: 122.0, 2001: 111.0, 2010: 96.8, 2015: 90.4, 2020: 109.8, 2024: 108.5, 2026: 110.0 },
    story: "蔬菜从自留地、菜市场，走进超市冷柜和手机订单。",
  },
  fruit: {
    label: "水果",
    short: "鲜瓜果",
    unit: "kg/人/年",
    color: palette.fruit,
    baseline: "1990 农村",
    latest: "2026 趋势延伸",
    values: { 1985: 4.8, 1990: 5.9, 1995: 12.0, 2001: 20.4, 2010: 31.5, 2015: 41.0, 2020: 60.1, 2024: 67.5, 2026: 72.0 },
    story: "水果从探亲礼和年节盘，变成了饭后、下午、夜宵里的日常。",
  },
  dairy: {
    label: "奶类",
    short: "奶类",
    unit: "kg/人/年",
    color: palette.dairy,
    baseline: "1990 农村",
    latest: "2026 趋势延伸",
    values: { 1985: 0.8, 1990: 1.1, 1995: 2.8, 2001: 6.1, 2010: 10.9, 2015: 13.8, 2020: 17.3, 2024: 15.1, 2026: 16.2 },
    story: "牛奶曾经像营养品，后来像早餐的一部分，再后来像健康观念的注脚。",
  },
  aquatic: {
    label: "水产",
    short: "水产品",
    unit: "kg/人/年",
    color: palette.aquatic,
    baseline: "1985 城镇",
    latest: "2026 趋势延伸",
    values: { 1985: 4.8, 1990: 6.5, 1995: 8.1, 2001: 10.3, 2010: 13.0, 2015: 14.2, 2020: 16.6, 2024: 17.0, 2026: 17.6 },
    story: "鱼和虾把远处的水系带上餐桌，也把冷链和市场带进厨房。",
  },
  takeout: {
    label: "外卖",
    short: "外卖市场",
    unit: "亿元",
    color: palette.takeout,
    baseline: "2015 行业早期",
    latest: "2026 趋势延伸",
    values: { 1985: 0, 1990: 0, 1995: 0, 2001: 0, 2010: 120, 2015: 1250, 2020: 8117, 2024: 16357, 2026: 18497 },
    story: "外卖让晚饭从厨房、街边店、骑手和手机之间重新分工。",
  },
};

const plateGroups = [
  { key: "grain", label: "主食" },
  { key: "vegetable", label: "蔬菜" },
  { key: "meat", label: "肉类" },
  { key: "aquatic", label: "水产" },
  { key: "dairy", label: "奶类" },
  { key: "fruit", label: "水果" },
];

const liuChapters = [
  {
    year: 1980,
    title: "饭桌从粮袋开始",
    kicker: "童年",
    image: "/assets/eras/era-1980.png",
    material: "粮袋、搪瓷碗、账本与票证",
    text: "刘铁柱是化名。这个人物线索，来自许多普通家庭都熟悉的经验：饭要先够吃，肉香要等节日，母亲把米袋口扎得很紧。",
    line: "那时的餐桌不讲丰富，讲踏实。碗里的米，是一家人的安全感。",
  },
  {
    year: 1985,
    title: "票证还没走远",
    kicker: "粮票尾声",
    image: "/assets/eras/era-1985.png",
    material: "票证尾声与开放市场的第一缕热气",
    text: "他记得父亲从抽屉里翻出票证，像翻出一种秩序。晚饭常常简单，但一家人围坐的时候，热气会把屋子撑大。",
    line: "吃饱，是那一代人最朴素也最郑重的愿望。",
  },
  {
    year: 1992,
    title: "菜市场亮了起来",
    kicker: "市场化",
    image: "/assets/eras/era-1992.png",
    material: "菜篮子、杆秤、鲜果与肉摊",
    text: "摊位多了，叫卖声也密了。第一次不是过年也能买到好看的水果，刘铁柱觉得日子忽然有了颜色。",
    line: "从能不能买到，到想买什么，选择开始改变味道。",
  },
  {
    year: 2001,
    title: "冰箱里的新世界",
    kicker: "WTO以后",
    image: "/assets/eras/era-2001.png",
    material: "冰箱、牛奶、进口水果与超市小票",
    text: "超市冷柜、袋装牛奶、调味酱和进口零食慢慢进门。餐桌不只是一日三餐，也开始连接更远的产地。",
    line: "过去靠季节决定的东西，开始被冷链和货架重新安排。",
  },
  {
    year: 2010,
    title: "晚饭被城市节奏追上",
    kicker: "消费升级",
    image: "/assets/eras/era-2010.png",
    material: "通勤卡、会员卡与被推迟的晚饭",
    text: "孩子补课、加班、地铁末班车，把一家人同时坐下的时间切得很碎。吃什么，越来越像一次协商。",
    line: "餐桌变丰富了，但坐在一起的时间反而变珍贵。",
  },
  {
    year: 2015,
    title: "手机把餐馆送到楼下",
    kicker: "外卖时代",
    image: "/assets/eras/era-2015.png",
    material: "手机订单、纸袋与门口的热饭",
    text: "那年以后，刘铁柱常在手机上点饭。骑手来得很快，塑料袋里的热汤提醒他：厨房已经不只在家里。",
    line: "外卖不是一顿饭那么简单，它改变的是城市的时间分配。",
  },
  {
    year: 2020,
    title: "重新学会在家做饭",
    kicker: "健康意识",
    image: "/assets/eras/era-2020.png",
    material: "配料表、少盐瓶与重新热起来的厨房",
    text: "一些特殊年份里，他又开始囤菜、看配料表、学会给父母少盐少油。饭桌成了照顾和担心同时出现的地方。",
    line: "当吃得丰富之后，人们开始重新追问怎样吃得安心。",
  },
  {
    year: 2026,
    title: "好好吃饭，仍是家事",
    kicker: "新食代",
    image: "/assets/eras/era-2026.png",
    material: "营养面板、低糖酸奶与个性化选择",
    text: "到2026年，刘铁柱会算蛋白质，也会给孙辈点低糖酸奶。但他最常讲的，还是父亲当年把碗里那块肉夹给孩子。",
    line: "时代在变，味道在变，不变的是把好东西留给家人的习惯。",
  },
];

const sourceNotes = [
  "主要消费量、恩格尔系数等来自工作区整理的《中国统计年鉴》相关表格及国家统计局公开信息。",
  "2026节点用于叙事呈现：主食品类以2024实测数据为基础做趋势延伸；进口、水产、猪肉、外卖等使用已有2025/2027附近数据辅助判断。",
  "刘铁柱为化名和合成人物线索，用来串联普通家庭餐桌记忆，不代表单一真实受访者。",
];

const yearMoods = [
  {
    year: 1985,
    title: "饭香先从锅盖缝里冒出来",
    text: "那时的数字不大，却很有重量。每多一点肉、多一把青菜，都像日子往前挪了一小步。",
    whisper: "刘铁柱记得，母亲掀开锅盖前，全家人都会安静一下。",
  },
  {
    year: 1995,
    title: "菜市场把颜色带回家",
    text: "摊位、杆秤、塑料袋和新鲜水果，让餐桌开始从“够吃”转向“想吃”。",
    whisper: "他第一次觉得，买菜也能像逛街一样有盼头。",
  },
  {
    year: 2010,
    title: "选择变多，晚饭也变忙",
    text: "肉、奶、水产和水果一起增长，餐桌更丰盛；但城市节奏也把一家人坐下的时间切得更碎。",
    whisper: "饭菜多了，等人的时间也多了。",
  },
  {
    year: 2015,
    title: "手机开始参与一顿饭",
    text: "外卖的曲线突然抬头，晚饭不再只发生在厨房，也发生在屏幕、商家和街道之间。",
    whisper: "门铃响起时，热饭像从城市深处赶来。",
  },
  {
    year: 2026,
    title: "好好吃饭，变成新的家庭语言",
    text: "餐桌继续变丰富，也更在意健康、效率和陪伴。数据的终点不是数字，而是每天怎样照顾自己和家人。",
    whisper: "他会看配料表，也仍会把好吃的先夹给孩子。",
  },
];

const metricHumanNotes = {
  grain: "主食退潮，不是米面消失，而是它终于不用独自承担一顿饭的全部重量。",
  meat: "肉类上升，背后是收入、冷链和市场共同托起的日常满足。",
  vegetable: "蔬菜看似平稳，却最像家的底色：便宜、鲜活、每天都要有。",
  fruit: "水果从礼物变成日常，是餐桌审美和健康意识一起变轻盈的证据。",
  dairy: "奶类的曲线像一条营养观念的曲线，从稀罕到寻常，从孩子到老人。",
  aquatic: "水产连接江河海，也连接冷链、物流和地方口味。",
  takeout: "外卖不是偷懒的注脚，而是城市时间被重新分配之后的一种答案。",
};

const urbanRuralScenes = {
  rural: {
    label: "农村镜头",
    title: "粮袋、菜园和集市，先撑住一家人的底气",
    image: "/assets/eras/era-1985.png",
    material: "1980年代：粮袋、票证、杆秤与集市",
    quote: "“那时候买肉要盘算，菜从地里来，饭一定要够。”",
    text: "农村餐桌的变化更像一条慢线：主食基底稳，蔬菜和本地物产仍是底色；肉、奶、果一点点加入，营养结构才被重新打开。",
    stats: [
      ["主食基底", "更稳"],
      ["本地物产", "更近"],
      ["变化节奏", "渐进"],
    ],
  },
  urban: {
    label: "城市镜头",
    title: "超市、外卖和营养面板，把晚饭接入城市系统",
    image: "/assets/eras/era-2026.png",
    material: "2026年：健康管理、外卖、冷链与个性化选择",
    quote: "“下班路上先点饭，回家再看配料表。”",
    text: "城镇餐桌更早接触超市、冷链、外食和外卖。食物选择变多，时间也被压缩，一顿饭开始由厨房、平台、骑手和健康观念共同完成。",
    stats: [
      ["消费半径", "更远"],
      ["时间压力", "更快"],
      ["健康意识", "更强"],
    ],
  },
};

const chartNarratives = {
  river: {
    kicker: "01 结构河流图",
    title: "餐桌像一条河，主食变窄，奶果变宽",
    quote: "“以前一顿饭先看饭够不够，现在先问今天想吃什么。”",
    lede: "把每一年压成一根餐桌柱，能看见比例如何移动：主食退到一旁，肉、奶、水产和水果慢慢挤进日常。",
    action: "点击年份柱，让上方时间轴与人物线索同步移动。",
    color: palette.grain,
  },
  slope: {
    kicker: "02 坡度对比图",
    title: "一升一降，四十年最直观",
    quote: "“主食退了一步，不是消失，是终于不用独自负责填饱。”",
    lede: "坡度图只保留起点和终点，让结构性的变化更锋利：谁在退，谁在上，谁改变了一代人的口味。",
    action: "看线条斜率，而不是只看终点数值。",
    color: palette.meat,
  },
  takeout: {
    kicker: "03 外卖路径图",
    title: "晚饭从厨房分流到城市系统",
    quote: "“门铃响起时，热饭像从城市深处赶来。”",
    lede: "外卖不是一个孤立数字，而是一条路径：下单、备餐、骑手、签收。它把餐桌放进城市的时间网络。",
    action: "节点会按市场规模呼吸，越往后越能看见系统变大。",
    color: palette.takeout,
  },
  matrix: {
    kicker: "04 热力矩阵",
    title: "横看省份，纵看食物，地方差异会浮出来",
    quote: "“同一个数字，落到不同省份，就有了口音。”",
    lede: "热力矩阵不画地图，却能显示地域性：主食、水产、奶果和丰富度在不同地方呈现出不同强弱。",
    action: "横向扫省份，纵向比较食物。",
    color: palette.aquatic,
  },
  ranking: {
    kicker: "05 排名条形图",
    title: "排名不是胜负，是风土和习惯的形状",
    quote: "“第一名不是冠军，只是一个地方把生活吃成了自己的样子。”",
    lede: "条形图用来回答一个简单问题：当前所选指标，在2024年的哪些地方最突出。",
    action: "切换上方指标，排名会跟着换。",
    color: palette.gold,
  },
  scatter: {
    kicker: "06 气泡散点图",
    title: "水果、水产与丰富度的关系",
    quote: "“南北、海陆、城市化，都被藏进一颗气泡里。”",
    lede: "散点图把水果与水产放在两条轴上，再用气泡大小呈现餐桌丰富度，帮助读者发现省份之间的聚散。",
    action: "看远离原点的地方，也看气泡大小。",
    color: palette.fruit,
  },
  barcode: {
    kicker: "07 时间条码",
    title: "每一年都是一道窄窄的光",
    quote: "“把年份排在一起，时代的节奏就不再抽象。”",
    lede: "条码图把一个指标拆成九个年份切片，适合观察阶段性加速、停顿和回落。",
    action: "切换指标，条码会换成另一种年代指纹。",
    color: palette.dairy,
  },
  multiples: {
    kicker: "08 小多图",
    title: "七种指标，七种不同命运",
    quote: "“把七条线摆在一起，餐桌的节奏感才出来。”",
    lede: "小多图让读者同时比较多个指标：主食退潮、外卖跃升、水产和奶类缓慢抬头，彼此不再孤立。",
    action: "点击小图，可把它设为全文当前指标。",
    color: palette.aquatic,
  },
  dumbbell: {
    kicker: "09 哑铃图",
    title: "起点和终点之间，谁变化最大",
    quote: "“一头是旧日子的分量，一头是今天的选择。”",
    lede: "不同指标单位差异大，哑铃图按各自起终点归一化，更适合比较变化方向和拉伸幅度。",
    action: "点击任一行，联动主指标。",
    color: palette.meat,
  },
  mosaic: {
    kicker: "10 餐盘马赛克",
    title: "一年被切成很多小格，才像一顿真正的饭",
    quote: "“一顿饭不是一个数字，是很多小块拼在一起。”",
    lede: "马赛克把年份结构转成视觉拼贴，让读者用面积感受餐盘里的主次关系。",
    action: "拖动年份，马赛克会重组。",
    color: palette.vegetable,
  },
};

function getYearMood(year) {
  return yearMoods.reduce((best, item) => (
    Math.abs(item.year - year) < Math.abs(best.year - year) ? item : best
  ), yearMoods[0]);
}

const provinceFields = [
  { key: "粮食", label: "主食", color: palette.grain },
  { key: "猪肉", label: "猪肉", color: palette.meat },
  { key: "水产品", label: "水产", color: palette.aquatic },
  { key: "奶类", label: "奶类", color: palette.dairy },
  { key: "鲜瓜果", label: "水果", color: palette.fruit },
  { key: "餐桌丰富度", label: "丰富度", color: palette.takeout },
];

const matrixProvinces = ["北京", "黑龙江", "内蒙古", "山东", "上海", "江苏", "广东", "四川", "云南", "新疆", "西藏", "海南"];

const metricProvinceField = {
  grain: "粮食",
  meat: "猪肉",
  vegetable: "蔬菜",
  fruit: "鲜瓜果",
  dairy: "奶类",
  aquatic: "水产品",
  takeout: "餐桌丰富度",
};

function nearestYear(value) {
  return yearMarks.reduce((best, year) => (
    Math.abs(year - value) < Math.abs(best - value) ? year : best
  ), yearMarks[0]);
}

function formatNumber(value, digits = 1) {
  if (value >= 10000) return `${Math.round(value).toLocaleString("zh-CN")}`;
  if (value >= 1000) return Math.round(value).toLocaleString("zh-CN");
  return value.toFixed(digits);
}

function changeText(metric) {
  const first = metric.values[1985] || metric.values[1990] || 0;
  const latest = metric.values[2026];
  if (!first) return "新出现";
  const change = ((latest - first) / first) * 100;
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(0)}%`;
}

function getMetricValue(metricKey, year) {
  const values = metrics[metricKey].values;
  if (values[year] !== undefined) return values[year];
  const sorted = Object.keys(values).map(Number).sort((a, b) => a - b);
  const previous = sorted.filter((item) => item <= year).pop() ?? sorted[0];
  return values[previous];
}

function yearProgress(year) {
  return ((year - 1985) / (2026 - 1985)) * 100;
}

function provinceValue(province, field) {
  return Number(province?.[field] ?? 0);
}

function provinceMean(provinceData, field) {
  if (!provinceData.length) return 0;
  return provinceData.reduce((sum, item) => sum + provinceValue(item, field), 0) / provinceData.length;
}

function provinceMax(provinceData, field) {
  return Math.max(1, ...provinceData.map((item) => provinceValue(item, field)));
}

function provinceFlavor(province, provinceData = []) {
  if (!province) return "等待选择省份";
  const candidates = [
    ["粮食", "主食底色更重"],
    ["水产品", "水产进入日常"],
    ["奶类", "奶类消费更高"],
    ["鲜瓜果", "水果更像日常补给"],
    ["猪肉", "肉香仍是餐桌主角"],
  ];
  return candidates
    .map(([field, label]) => {
      const mean = provinceMean(provinceData, field) || 1;
      return { field, label, value: provinceValue(province, field) / mean };
    })
    .sort((a, b) => b.value - a.value)[0]?.label || "地方餐桌画像";
}

function buildPlateSegments(year) {
  const total = plateGroups.reduce((sum, item) => sum + getMetricValue(item.key, year), 0);
  let current = 0;
  const segments = plateGroups.map((item) => {
    const value = getMetricValue(item.key, year);
    const share = total ? (value / total) * 100 : 0;
    const segment = {
      ...item,
      value,
      share,
      start: current,
      end: current + share,
      color: metrics[item.key].color,
    };
    current += share;
    return segment;
  });
  return segments;
}

function sparkPath(metricKey, width = 158, height = 42) {
  const metric = metrics[metricKey];
  const points = yearMarks.map((year) => ({ year, value: getMetricValue(metricKey, year) }));
  const values = points.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return points.map((point, index) => {
    const x = (index / (points.length - 1)) * width;
    const y = height - ((point.value - min) / span) * (height - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

function HeroCard({ metricKey }) {
  const metric = metrics[metricKey];
  const baseYear = metric.values[1985] === 0 ? 2015 : (metric.values[1985] ? 1985 : 1990);
  const base = metric.values[baseYear];
  const latest = metric.values[2026];
  const isUp = latest >= base;
  const deltaLabel = metricKey === "takeout"
    ? `增长约${(latest / base).toFixed(1)}倍`
    : `${isUp ? "上升" : "下降"} ${changeText(metric).replace("+", "")}`;

  return (
    <article className="hero-card" style={{ "--accent": metric.color }}>
      <div className="hero-card__label">{metric.label}</div>
      <div className="hero-card__rows">
        <span>{baseYear}年</span>
        <strong>{formatNumber(base)}</strong>
      </div>
      <div className="hero-card__rows">
        <span>2026年</span>
        <strong>{formatNumber(latest)}</strong>
      </div>
      <div className={isUp ? "delta delta--up" : "delta delta--down"}>{deltaLabel}</div>
    </article>
  );
}

function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!playing) {
      audioRef.current?.stop?.();
      audioRef.current = null;
      return undefined;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      setPlaying(false);
      return undefined;
    }

    const context = new AudioContext();
    const master = context.createGain();
    const delay = context.createDelay();
    const feedback = context.createGain();
    const filter = context.createBiquadFilter();
    const notes = [196, 246.94, 293.66, 329.63, 392, 493.88, 440, 329.63];
    let step = 0;

    master.gain.value = 0.035;
    delay.delayTime.value = 0.42;
    feedback.gain.value = 0.24;
    filter.type = "lowpass";
    filter.frequency.value = 1600;

    master.connect(filter);
    filter.connect(context.destination);
    master.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(filter);

    const padGain = context.createGain();
    padGain.gain.value = 0.012;
    padGain.connect(master);
    const pad = [98, 146.83, 196].map((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = index === 1 ? "triangle" : "sine";
      oscillator.frequency.value = frequency;
      oscillator.connect(padGain);
      oscillator.start();
      return oscillator;
    });

    const playTone = (frequency, startTime) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, startTime);
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.045, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.45);
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start(startTime);
      oscillator.stop(startTime + 1.55);
    };

    const schedule = () => {
      const now = context.currentTime + 0.08;
      for (let index = 0; index < 4; index += 1) {
        const frequency = notes[(step + index) % notes.length];
        playTone(frequency, now + index * 0.72);
      }
      step = (step + 2) % notes.length;
    };

    schedule();
    const timer = window.setInterval(schedule, 2880);

    let stopped = false;
    const stopAudio = () => {
      if (stopped) return;
      stopped = true;
      window.clearInterval(timer);
      pad.forEach((oscillator) => {
        try {
          oscillator.stop();
        } catch {
          // Oscillators may already be stopped when React re-runs the effect.
        }
      });
      context.close();
    };
    audioRef.current = { stop: stopAudio };

    return stopAudio;
  }, [playing]);

  return (
    <button
      className={playing ? "music-toggle music-toggle--playing" : "music-toggle"}
      type="button"
      aria-pressed={playing}
      onClick={() => setPlaying((value) => !value)}
    >
      <span className="music-toggle__bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        <strong>{playing ? "背景音乐开" : "背景音乐关"}</strong>
        <em>轻柔餐桌氛围</em>
      </span>
    </button>
  );
}

function PageBackdrop() {
  return (
    <div className="page-backdrop" aria-hidden="true">
      <img className="page-backdrop__image page-backdrop__image--main" src={assetPath("/assets/table40-hero-v2.png")} alt="" />
      <img className="page-backdrop__image page-backdrop__image--left" src={assetPath("/assets/eras/era-1980.png")} alt="" />
      <img className="page-backdrop__image page-backdrop__image--right" src={assetPath("/assets/eras/era-2026.png")} alt="" />
    </div>
  );
}

function WarmDataStory({ year, selectedMetric }) {
  const metric = metrics[selectedMetric];
  const mood = getYearMood(year);
  const current = getMetricValue(selectedMetric, year);
  const latest = getMetricValue(selectedMetric, 2026);
  const baseYear = metric.values[1985] === 0 ? 2015 : (metric.values[1985] ? 1985 : 1990);
  const base = metric.values[baseYear];
  const ratio = base ? Math.min(100, Math.abs((current - base) / base) * 70 + 18) : 82;

  return (
    <section className="warm-story" aria-label="数据叙事便签">
      <article className="warm-story__lead">
        <span className="eyebrow">这一年的饭桌旁白</span>
        <h3>{mood.title}</h3>
        <p>{mood.text}</p>
        <blockquote>{mood.whisper}</blockquote>
      </article>
      <article className="warm-story__metric" style={{ "--accent": metric.color, "--fill": `${ratio}%` }}>
        <span>{metric.label}</span>
        <strong>{formatNumber(current)}</strong>
        <em>{metric.unit}</em>
        <p>{metricHumanNotes[selectedMetric]}</p>
        <div className="warm-story__bar" aria-hidden="true"><i /></div>
      </article>
      <article className="warm-story__ledger">
        <span>从{baseYear}到2026</span>
        <div>
          <strong>{formatNumber(base)}</strong>
          <i />
          <strong>{formatNumber(latest)}</strong>
        </div>
        <p>数字的变化不是一根冷线，而是购物袋、冰箱、手机订单和家人饭碗一起改变的结果。</p>
      </article>
    </section>
  );
}

function TimeSlider({ year, setYear }) {
  return (
    <section className="control-deck" aria-label="餐桌年份控制台">
      <div className="control-play">
        <button
          className="round-button"
          type="button"
          onClick={() => {
            const current = yearMarks.indexOf(year);
            setYear(yearMarks[(current + 1) % yearMarks.length]);
          }}
          aria-label="播放下一段年份"
        >
          ▶
        </button>
        <div>
          <span>时间轴</span>
          <strong>{year}</strong>
        </div>
      </div>
      <div className="range-wrap">
        <input
          aria-label="拖动查看年份"
          type="range"
          min="1985"
          max="2026"
          value={year}
          onChange={(event) => setYear(nearestYear(Number(event.target.value)))}
        />
        <div className="ticks" aria-hidden="true">
          {yearMarks.map((mark) => (
            <button
              className={mark === year ? "tick tick--active" : "tick"}
              key={mark}
              type="button"
              onClick={() => setYear(mark)}
            >
              {mark}
            </button>
          ))}
        </div>
        <div className="walker-track" aria-hidden="true">
          <span className="walker-track__line" />
          <img
            className="walker-track__person"
            src={assetPath("/assets/characters/liu-tiezhu.png")}
            alt=""
            style={{ left: `${yearProgress(year)}%` }}
          />
        </div>
      </div>
      <p className="control-note">主数据至2024；2026为趋势延伸与叙事观察节点。</p>
    </section>
  );
}

function MetricTabs({ selectedMetric, setSelectedMetric }) {
  return (
    <div className="metric-tabs" aria-label="指标选择">
      {Object.entries(metrics).map(([key, metric]) => (
        <button
          className={selectedMetric === key ? "metric-tab metric-tab--active" : "metric-tab"}
          key={key}
          type="button"
          onClick={() => setSelectedMetric(key)}
          style={{ "--accent": metric.color }}
        >
          {metric.label}
        </button>
      ))}
    </div>
  );
}

function PlateTheatre({ year }) {
  const segments = buildPlateSegments(year);
  let start = 0;
  const gradient = segments.map((segment) => {
    const part = `${segment.color} ${start}% ${start + segment.share}%`;
    start += segment.share;
    return part;
  }).join(", ");

  return (
    <div className="plate-stage">
      <div className="plate" style={{ background: `conic-gradient(${gradient})` }}>
        <div className="plate-core">
          <strong>{year}</strong>
          <span>餐桌结构</span>
        </div>
      </div>
      <div className="plate-legend">
        {segments.map((segment) => (
          <div className="plate-legend__row" key={segment.key}>
            <i style={{ background: segment.color }} />
            <span>{segment.label}</span>
            <strong>{segment.share.toFixed(1)}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendPanel({ selectedMetric, year }) {
  const metric = metrics[selectedMetric];
  const current = getMetricValue(selectedMetric, year);
  const firstYear = metric.values[1985] === 0 ? 2015 : (metric.values[1985] ? 1985 : 1990);
  const first = metric.values[firstYear];
  const trendIsUp = current >= first;

  return (
    <aside className="trend-panel">
      <div className="eyebrow">趋势对比</div>
      <h3>{metric.label}如何改变</h3>
      <svg className="sparkline" viewBox="0 0 158 42" aria-hidden="true">
        <polyline
          fill="none"
          points={sparkPath(selectedMetric)}
          stroke={metric.color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </svg>
      <div className="trend-number">
        <span>{year}年</span>
        <strong>{formatNumber(current)}</strong>
        <em>{metric.unit}</em>
      </div>
      <p>{metric.story}</p>
      <dl>
        <div>
          <dt>{metric.baseline}</dt>
          <dd>{formatNumber(first)}</dd>
        </div>
        <div>
          <dt>{metric.latest}</dt>
          <dd className={trendIsUp ? "up" : "down"}>{formatNumber(metric.values[2026])}</dd>
        </div>
      </dl>
    </aside>
  );
}

function UrbanRuralScene({ year, compareMode, setCompareMode }) {
  const active = urbanRuralScenes[compareMode] || urbanRuralScenes.urban;
  const scenes = [urbanRuralScenes.rural, urbanRuralScenes.urban];

  return (
    <section className="lens-section" aria-label="城乡双镜头">
      <div className="lens-section__copy">
        <span className="eyebrow">城乡双镜头</span>
        <h3>同一年的中国餐桌，有两种不同的速度</h3>
        <p>
          数据的平均线会抹平差异。把城市和农村并排看，才能看见餐桌变化的两种路径：
          一边是集市、菜园和粮袋，一边是超市、外卖和营养面板。
        </p>
      </div>
      <div className="lens-grid">
        {scenes.map((scene) => {
          const key = scene === urbanRuralScenes.urban ? "urban" : "rural";
          return (
            <button
              className={compareMode === key ? "scene-card scene-card--active" : "scene-card"}
              key={scene.label}
              type="button"
              onClick={() => setCompareMode(key)}
            >
              <img src={assetPath(scene.image)} alt={`${scene.label}：${scene.material}`} />
              <span className="scene-card__shade" />
              <span className="scene-card__body">
                <span className="scene-card__label">{scene.label}</span>
                <strong>{scene.title}</strong>
                <span>{scene.material}</span>
              </span>
              <span className="scene-card__stats">
                {scene.stats.map(([label, value]) => (
                  <span key={label}>
                    <em>{label}</em>
                    <b>{value}</b>
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>
      <article className="lens-narrative">
        <span>{year}年的阅读镜头</span>
        <h4>{active.label}：{active.title}</h4>
        <blockquote>{active.quote}</blockquote>
        <p>{active.text}</p>
      </article>
    </section>
  );
}

function ChartFrame({ id, className = "", children, note }) {
  const narrative = chartNarratives[id];

  return (
    <article className={`chart-card ${className}`} style={{ "--chart-accent": narrative.color }}>
      <div className="chart-card__head">
        <span className="eyebrow">{narrative.kicker}</span>
        <h3>{narrative.title}</h3>
      </div>
      <blockquote className="chart-quote">{narrative.quote}</blockquote>
      <p className="chart-lede">{narrative.lede}</p>
      <div className="chart-card__stage">{children}</div>
      <div className="chart-card__foot">
        <span>{narrative.action}</span>
        {note && <p className="chart-card__note">{note}</p>}
      </div>
    </article>
  );
}

function FoodRiver({ year, setYear }) {
  const riverKeys = ["grain", "vegetable", "meat", "fruit", "dairy", "aquatic"];

  return (
    <ChartFrame id="river" className="chart-card--wide chart-card--river">
      <div className="river-chart" aria-label="食物结构河流图">
        {yearMarks.map((mark) => {
          const total = riverKeys.reduce((sum, key) => sum + getMetricValue(key, mark), 0);
          return (
            <button
              className={mark === year ? "river-column river-column--active" : "river-column"}
              key={mark}
              type="button"
              onClick={() => setYear(mark)}
              aria-label={`${mark}年餐桌结构`}
            >
              <div className="river-stack">
                {riverKeys.map((key) => {
                  const share = total ? (getMetricValue(key, mark) / total) * 100 : 0;
                  return (
                    <span
                      key={key}
                      style={{ height: `${share}%`, background: metrics[key].color }}
                      title={`${metrics[key].label}: ${share.toFixed(1)}%`}
                    />
                  );
                })}
              </div>
              <strong>{mark}</strong>
            </button>
          );
        })}
      </div>
    </ChartFrame>
  );
}

function SlopeChart() {
  const rows = ["grain", "meat", "fruit", "dairy", "aquatic"].map((key) => ({
    key,
    label: metrics[key].label,
    start: getMetricValue(key, 1985),
    end: getMetricValue(key, 2026),
    color: metrics[key].color,
  }));
  const values = rows.flatMap((row) => [row.start, row.end]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const y = (value) => 230 - ((value - min) / (max - min || 1)) * 190;
  const distributeLabels = (items, valueKey) => {
    const minY = 36;
    const maxY = 224;
    const minGap = 22;
    const sorted = items
      .map((row) => ({ key: row.key, rawY: y(row[valueKey]) }))
      .sort((a, b) => a.rawY - b.rawY);
    const placed = [];
    sorted.forEach((item, index) => {
      const previousY = index === 0 ? minY - minGap : placed[index - 1].labelY;
      placed.push({
        ...item,
        labelY: Math.max(minY, Math.min(maxY, item.rawY), previousY + minGap),
      });
    });

    const overflow = placed[placed.length - 1].labelY - maxY;
    if (overflow > 0) {
      placed.forEach((item) => {
        item.labelY -= overflow;
      });
    }
    const underflow = minY - placed[0].labelY;
    if (underflow > 0) {
      placed.forEach((item) => {
        item.labelY += underflow;
      });
    }
    placed[placed.length - 1].labelY = Math.min(maxY, placed[placed.length - 1].labelY);
    for (let index = placed.length - 2; index >= 0; index -= 1) {
      placed[index].labelY = Math.min(placed[index].labelY, placed[index + 1].labelY - minGap);
    }
    placed[0].labelY = Math.max(minY, placed[0].labelY);
    for (let index = 1; index < placed.length; index += 1) {
      placed[index].labelY = Math.max(placed[index].labelY, placed[index - 1].labelY + minGap);
    }

    const labelMap = {};
    placed.forEach((item) => {
      labelMap[item.key] = item.labelY;
    });
    return labelMap;
  };
  const startLabelY = distributeLabels(rows, "start");
  const endLabelY = distributeLabels(rows, "end");

  return (
    <ChartFrame id="slope" className="chart-card--slope">
      <svg className="slope-chart" viewBox="0 0 360 260" role="img" aria-label="1985到2026食物消费坡度对比">
        <line x1="86" y1="28" x2="86" y2="238" stroke="rgba(53,55,47,.18)" />
        <line x1="274" y1="28" x2="274" y2="238" stroke="rgba(53,55,47,.18)" />
        <text x="68" y="18">1985</text>
        <text x="256" y="18">2026</text>
        {rows.map((row, index) => (
          <g key={row.key}>
            <line
              className="slope-line"
              x1="86"
              y1={y(row.start)}
              x2="274"
              y2={y(row.end)}
              stroke={row.color}
              strokeWidth="3"
              strokeLinecap="round"
              style={{ "--delay": `${index * 110}ms` }}
            />
            <line
              className="slope-label-guide"
              x1="56"
              y1={startLabelY[row.key]}
              x2="82"
              y2={y(row.start)}
            />
            <line
              className="slope-label-guide"
              x1="278"
              y1={y(row.end)}
              x2="292"
              y2={endLabelY[row.key]}
            />
            <circle cx="86" cy={y(row.start)} r="4" fill={row.color} />
            <circle cx="274" cy={y(row.end)} r="4" fill={row.color} />
            <text className="slope-label slope-label--left" x="12" y={startLabelY[row.key]} dominantBaseline="middle">{row.label}</text>
            <text className="slope-label slope-label--right" x="294" y={endLabelY[row.key]} dominantBaseline="middle">{formatNumber(row.end)}</text>
          </g>
        ))}
      </svg>
    </ChartFrame>
  );
}

function TakeoutFlow() {
  const points = [
    { year: 2015, value: 1250, label: "手机下单" },
    { year: 2020, value: 8117, label: "商家备餐" },
    { year: 2024, value: 16357, label: "骑手路上" },
    { year: 2026, value: 18497, label: "餐桌签收" },
  ];
  const max = Math.max(...points.map((point) => point.value));

  return (
    <ChartFrame id="takeout" className="chart-card--flow">
      <div className="flow-route" aria-label="外卖路径图">
        {points.map((point, index) => (
          <div
            className="flow-node"
            key={point.year}
            style={{ "--scale": point.value / max, "--delay": `${index * 120}ms` }}
          >
            <span>{point.year}</span>
            <strong>{point.label}</strong>
            <em>{formatNumber(point.value, 0)}亿</em>
            {index < points.length - 1 && <i aria-hidden="true" />}
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}

function MatrixHeatmap({ provinceData }) {
  const rows = provinceFields;
  const provinces = matrixProvinces
    .map((name) => provinceData.find((item) => item.province === name))
    .filter(Boolean);

  return (
    <ChartFrame id="matrix" className="chart-card--wide chart-card--matrix">
      <div className="heatmap" role="img" aria-label="省份食物消费热力矩阵">
        <div className="heatmap__corner" />
        {provinces.map((province) => <strong key={province.province}>{province.province}</strong>)}
        {rows.map((row) => {
          const max = provinceMax(provinceData, row.key);
          return (
            <div className="heatmap__row" key={row.key}>
              <span>{row.label}</span>
              {provinces.map((province) => {
                const ratio = provinceValue(province, row.key) / max;
                return (
                  <i
                    key={`${row.key}-${province.province}`}
                    title={`${province.province} ${row.label}: ${provinceValue(province, row.key).toFixed(1)}`}
                    style={{
                      background: `color-mix(in srgb, ${row.color} ${Math.max(18, ratio * 100)}%, #fffdf8)`,
                      "--delay": `${Math.round(ratio * 260)}ms`,
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </ChartFrame>
  );
}

function RankingBars({ provinceData, field }) {
  const rows = [...provinceData]
    .sort((a, b) => provinceValue(b, field) - provinceValue(a, field))
    .slice(0, 10);
  const max = Math.max(1, ...rows.map((item) => provinceValue(item, field)));

  return (
    <ChartFrame
      id="ranking"
      className="chart-card--ranking"
      note={rows[0] ? `${field}排在最前面的是${rows[0].province}。这样的排名不是胜负，而是气候、物产、城市化和地方口味共同写下的一行脚注。` : ""}
    >
      <h4 className="chart-subtitle">{field}最高的十个地方</h4>
      <div className="ranking-bars" aria-label={`${field}省份排名`}>
        {rows.map((item, index) => (
          <div
            className="ranking-row"
            key={item.province}
            style={{
              "--bar": `${(provinceValue(item, field) / max) * 100}%`,
              "--delay": `${index * 55}ms`,
            }}
          >
            <span>{index + 1}</span>
            <strong>{item.province}</strong>
            <i />
            <em>{provinceValue(item, field).toFixed(1)}</em>
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}

function BubbleScatter({ provinceData }) {
  const maxFruit = provinceMax(provinceData, "鲜瓜果");
  const maxAquatic = provinceMax(provinceData, "水产品");
  const maxRichness = provinceMax(provinceData, "餐桌丰富度");
  const maxPork = provinceMax(provinceData, "猪肉");
  const labelOffsets = {
    北京: { dx: 10, dy: -11, anchor: "start" },
    上海: { dx: -10, dy: 16, anchor: "end" },
    广东: { dx: -12, dy: -12, anchor: "end" },
    四川: { dx: 10, dy: 16, anchor: "start" },
    黑龙江: { dx: 10, dy: 12, anchor: "start" },
    海南: { dx: -10, dy: 18, anchor: "end" },
  };

  return (
    <ChartFrame id="scatter" className="chart-card--scatter">
      <svg className="bubble-scatter" viewBox="0 0 360 280" role="img" aria-label="省份水果水产与餐桌丰富度气泡图">
        <line x1="44" y1="230" x2="330" y2="230" stroke="rgba(53,55,47,.18)" />
        <line x1="44" y1="24" x2="44" y2="230" stroke="rgba(53,55,47,.18)" />
        <text x="210" y="266">鲜瓜果</text>
        <text x="0" y="20">水产</text>
        {provinceData.map((province) => {
          const x = 44 + (provinceValue(province, "鲜瓜果") / maxFruit) * 286;
          const y = 230 - (provinceValue(province, "水产品") / maxAquatic) * 206;
          const r = 4 + (provinceValue(province, "餐桌丰富度") / maxRichness) * 13;
          const porkRatio = provinceValue(province, "猪肉") / maxPork;
          const label = labelOffsets[province.province];
          const labelX = label ? Math.min(326, Math.max(54, x + label.dx)) : x;
          const labelY = label ? Math.min(222, Math.max(34, y + label.dy)) : y;
          return (
            <g key={province.province}>
              <circle
                className="scatter-dot"
                cx={x}
                cy={y}
                r={r}
                fill={`rgba(184, 61, 46, ${0.18 + porkRatio * 0.46})`}
                stroke="rgba(255,253,248,.9)"
                strokeWidth="1.5"
              />
              {label && (
                <text className="scatter-label" x={labelX} y={labelY} textAnchor={label.anchor}>
                  {province.province}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}

function BarcodeChart({ selectedMetric }) {
  const metric = metrics[selectedMetric];
  const values = yearMarks.map((year) => getMetricValue(selectedMetric, year));
  const min = Math.min(...values);
  const max = Math.max(...values);

  return (
    <ChartFrame id="barcode" className="chart-card--barcode">
      <h4 className="chart-subtitle">{metric.label}的年代指纹</h4>
      <div className="barcode-chart" aria-label={`${metric.label}时间条码图`}>
        {yearMarks.map((mark, index) => {
          const ratio = (getMetricValue(selectedMetric, mark) - min) / (max - min || 1);
          return (
            <div className="barcode-line" key={mark} style={{ "--delay": `${index * 58}ms` }}>
              <i
                style={{
                  height: `${28 + ratio * 168}px`,
                  background: `color-mix(in srgb, ${metric.color} ${42 + ratio * 58}%, #fffdf8)`,
                }}
              />
              <span>{mark}</span>
            </div>
          );
        })}
      </div>
    </ChartFrame>
  );
}

function SmallMultiples({ year, selectedMetric, setSelectedMetric }) {
  const keys = ["grain", "meat", "vegetable", "fruit", "dairy", "aquatic", "takeout"];

  return (
    <ChartFrame id="multiples" className="chart-card--wide chart-card--multiples">
      <div className="small-multiples" aria-label="七个指标小多图">
        {keys.map((key) => {
          const metric = metrics[key];
          const value = getMetricValue(key, year);
          return (
            <button
              className={selectedMetric === key ? "mini-chart mini-chart--active" : "mini-chart"}
              key={key}
              type="button"
              onClick={() => setSelectedMetric(key)}
              style={{ "--accent": metric.color }}
            >
              <span>{metric.label}</span>
              <strong>{formatNumber(value)}</strong>
              <svg viewBox="0 0 158 46" aria-hidden="true">
                <polyline
                  className="mini-chart__line"
                  fill="none"
                  points={sparkPath(key, 158, 46)}
                  stroke={metric.color}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
              </svg>
              <em>{metric.unit}</em>
            </button>
          );
        })}
      </div>
    </ChartFrame>
  );
}

function DumbbellChart({ selectedMetric, setSelectedMetric }) {
  const rows = ["grain", "meat", "fruit", "dairy", "aquatic", "takeout"].map((key) => {
    const startYear = metrics[key].values[1985] === 0 ? 2015 : 1985;
    return {
      key,
      startYear,
      label: metrics[key].label,
      color: metrics[key].color,
      start: getMetricValue(key, startYear),
      end: getMetricValue(key, 2026),
      unit: metrics[key].unit,
    };
  });
  const x = (value, rowMax) => 112 + (value / (rowMax || 1)) * 202;

  return (
    <ChartFrame id="dumbbell" className="chart-card--dumbbell">
      <svg className="dumbbell-chart" viewBox="0 0 360 306" role="img" aria-label="1985或2015到2026哑铃对比图">
        <line x1="112" y1="28" x2="314" y2="28" stroke="rgba(53,55,47,.16)" />
        <text x="110" y="18">起点</text>
        <text x="286" y="18">2026</text>
        {rows.map((row, index) => {
          const y = 56 + index * 40;
          const rowMax = Math.max(row.start, row.end);
          return (
            <g
              className={selectedMetric === row.key ? "dumbbell-row dumbbell-row--active" : "dumbbell-row"}
              key={row.key}
              onClick={() => setSelectedMetric(row.key)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") setSelectedMetric(row.key);
              }}
              role="button"
              tabIndex="0"
              style={{ "--delay": `${index * 75}ms` }}
            >
              <text x="8" y={y + 4}>{row.label}</text>
              <line className="dumbbell-line" x1={x(row.start, rowMax)} y1={y} x2={x(row.end, rowMax)} y2={y} stroke={row.color} strokeWidth="4" strokeLinecap="round" />
              <circle cx={x(row.start, rowMax)} cy={y} r="5" fill="#fffdf8" stroke={row.color} strokeWidth="2" />
              <circle cx={x(row.end, rowMax)} cy={y} r="7" fill={row.color} />
              <text x="318" y={y + 4}>{formatNumber(row.end)}</text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}

function PlateMosaic({ year }) {
  const segments = buildPlateSegments(year)
    .map((segment) => ({ ...segment, span: Math.max(2, Math.round(segment.share / 4.6)) }))
    .sort((a, b) => b.share - a.share);

  return (
    <ChartFrame id="mosaic" className="chart-card--mosaic">
      <h4 className="chart-subtitle">{year}年的一张拼贴餐盘</h4>
      <div className="plate-mosaic" aria-label={`${year}年餐盘马赛克`}>
        {segments.map((segment, index) => (
          <div
            className="mosaic-cell"
            key={segment.key}
            style={{ "--accent": segment.color, "--delay": `${index * 70}ms`, gridColumn: `span ${segment.span}` }}
          >
            <span>{segment.label}</span>
            <strong>{segment.share.toFixed(1)}%</strong>
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}

function ChartChapter({ number, title, text, children, className = "" }) {
  return (
    <section className={`chart-chapter ${className}`} aria-labelledby={`chart-chapter-${number}`}>
      <div className="chart-chapter__copy">
        <span>{number}</span>
        <h3 id={`chart-chapter-${number}`}>{title}</h3>
        <p>{text}</p>
      </div>
      <div className="chart-chapter__grid">
        {children}
      </div>
    </section>
  );
}

function ChartGallery({ year, setYear, provinceData, selectedMetric, setSelectedMetric }) {
  const rankField = metricProvinceField[selectedMetric] || "餐桌丰富度";

  return (
    <section className="evidence-board" aria-label="多样化图表章节">
      <div className="evidence-board__head">
        <span className="eyebrow">02 多维证据链</span>
        <h2>让每一种图表，只回答它最擅长的问题</h2>
        <p>
          结构用河流图看，速度用条码和路径看，地域用矩阵与散点看，个人阅读再回到餐盘。
          不让读者用同一种眼睛看完整篇，也不让数据失去顺序。
        </p>
      </div>
      <div className="evidence-rail" aria-hidden="true">
        {["结构", "速度", "地理", "回到人"].map((item, index) => (
          <span key={item} style={{ "--delay": `${index * 90}ms` }}>{item}</span>
        ))}
      </div>
      <ChartChapter
        number="01"
        title="先看餐桌结构：哪些食物让出了位置，哪些食物进入日常"
        text="这组图回答“吃什么变了”。河流图看比例迁移，坡度图看起终点方向，小多图把七种指标放在同一个节奏里。"
        className="chart-chapter--structure"
      >
        <FoodRiver year={year} setYear={setYear} />
        <SlopeChart />
        <SmallMultiples year={year} selectedMetric={selectedMetric} setSelectedMetric={setSelectedMetric} />
      </ChartChapter>
      <ChartChapter
        number="02"
        title="再看变化速度：什么时候突然加速，什么时候慢下来"
        text="外卖的出现不是线性增长，而像一次城市系统的接入。条码图则把单个指标切成年度切片，呈现阶段感。"
        className="chart-chapter--speed"
      >
        <TakeoutFlow />
        <BarcodeChart selectedMetric={selectedMetric} />
      </ChartChapter>
      <ChartChapter
        number="03"
        title="再把平均线拆开：地方餐桌有自己的方言"
        text="同一指标在不同省份的差异，会被热力矩阵、排名条形图和散点气泡图分别照亮。它们不是重复，而是从三个角度看地域性。"
        className="chart-chapter--geography"
      >
        <MatrixHeatmap provinceData={provinceData} />
        <RankingBars provinceData={provinceData} field={rankField} />
        <BubbleScatter provinceData={provinceData} />
      </ChartChapter>
      <ChartChapter
        number="04"
        title="最后回到一张餐盘：变化落在每一年、每个人的碗里"
        text="哑铃图比较四十年的拉伸，马赛克把当前年份切成具体份额。数据走到这里，重新变回一顿饭。"
        className="chart-chapter--portrait"
      >
        <DumbbellChart selectedMetric={selectedMetric} setSelectedMetric={setSelectedMetric} />
        <PlateMosaic year={year} />
      </ChartChapter>
    </section>
  );
}

function LiuStory({ year, setYear }) {
  const chapter = liuChapters.reduce((best, item) => (
    Math.abs(item.year - year) < Math.abs(best.year - year) ? item : best
  ), liuChapters[0]);

  return (
    <section className="liu-band" id="liu">
      <div className="section-copy">
        <span className="eyebrow">人物线索</span>
        <h2>刘铁柱（化名）的一生，怎么被饭桌悄悄改写</h2>
        <p>
          这不是一个真实受访者的逐字口述，而是一条合成人物线：把统计年鉴里的数字、家庭记忆里的饭香，
          和过去四十多年中国人的共同经验，折成一个普通人的生活。
        </p>
        <figure className="liu-ip">
          <img src={assetPath("/assets/characters/liu-tiezhu.png")} alt="刘铁柱人物形象IP" />
          <figcaption>刘铁柱（化名）作为叙事引导，带读者穿过每一个时代的餐桌。</figcaption>
        </figure>
      </div>
      <div className="liu-layout">
        <article className="liu-current">
          <div className="era-photo">
            <img src={assetPath(chapter.image)} alt={`${chapter.year}年时代材料：${chapter.material}`} />
            <span>{chapter.material}</span>
          </div>
          <div className="liu-current__copy">
            <span>{chapter.kicker}</span>
            <h3>{chapter.year}｜{chapter.title}</h3>
            <p>{chapter.text}</p>
            <blockquote>{chapter.line}</blockquote>
          </div>
        </article>
        <div className="walkway" aria-label="刘铁柱行走时间轴">
          <span className="walkway__rail" />
          <img
            className="walkway__person"
            src={assetPath("/assets/characters/liu-tiezhu.png")}
            alt=""
            style={{ left: `${Math.min(100, Math.max(0, ((chapter.year - 1980) / (2026 - 1980)) * 100))}%` }}
          />
          {liuChapters.map((item) => (
            <button
              className={item.year === chapter.year ? "walkway__dot walkway__dot--active" : "walkway__dot"}
              key={item.year}
              type="button"
              onClick={() => setYear(nearestYear(item.year))}
              style={{ left: `${((item.year - 1980) / (2026 - 1980)) * 100}%` }}
              aria-label={`切换到${item.year}年：${item.title}`}
            />
          ))}
        </div>
        <div className="memory-strip" aria-label="刘铁柱生活时间轴">
          {liuChapters.map((item) => (
            <button
              className={item.year === chapter.year ? "memory-chip memory-chip--active" : "memory-chip"}
              key={item.year}
              type="button"
              onClick={() => setYear(nearestYear(item.year))}
            >
              <img src={assetPath(item.image)} alt="" />
              <strong>{item.year}</strong>
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProvinceGrid({ provinceData, selectedMetric, setProvince }) {
  const field = metricProvinceField[selectedMetric] || "餐桌丰富度";
  const values = provinceData.map((item) => Number(item[field] ?? item["餐桌丰富度"] ?? 0));
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 1);

  return (
    <section className="region-panel" id="regions">
      <div className="section-copy">
        <span className="eyebrow">地区差异</span>
        <h2>同一张中国餐桌，地方口味从来不一样</h2>
        <p>
          地图不只是颜色深浅。北方的主食、南方的水产、城市的奶果与外卖，
          都在提醒我们：餐桌变化不是一条平均线，而是一片有方言的生活地理。
        </p>
      </div>
      <div className="region-card">
        <div className="grid-map" role="list" aria-label="省份格网图">
          {provinceData.map((province) => {
            const raw = Number(province[field] ?? province["餐桌丰富度"] ?? 0);
            const ratio = (raw - min) / (max - min || 1);
            const tone = Math.round(92 - ratio * 34);
            return (
              <button
                className="province-tile"
                key={province.province}
                role="listitem"
                type="button"
                onClick={() => setProvince({ ...province, field, raw })}
                style={{
                  gridColumn: province.grid?.[0] || 1,
                  gridRow: province.grid?.[1] || 1,
                  background: `hsl(24 78% ${tone}%)`,
                }}
                title={`${province.province} ${field}: ${raw.toFixed(1)}`}
              >
                {province.province}
              </button>
            );
          })}
        </div>
        <div className="region-caption">
          <strong>{field}</strong>
          <span>颜色越深，2024年该指标越高。点击省份查看细节。</span>
        </div>
      </div>
    </section>
  );
}

function ProvincePlate({ province }) {
  const keys = ["粮食", "猪肉", "水产品", "奶类", "鲜瓜果"];
  const values = keys.map((key) => provinceValue(province, key));
  const total = values.reduce((sum, value) => sum + value, 0) || 1;
  let start = 0;
  const gradient = keys.map((key, index) => {
    const field = provinceFields.find((item) => item.key === key);
    const share = (values[index] / total) * 100;
    const part = `${field.color} ${start}% ${start + share}%`;
    start += share;
    return part;
  }).join(", ");

  return (
    <div className="province-plate-wrap">
      <div className="province-plate" style={{ background: `conic-gradient(${gradient})` }}>
        <div>
          <strong>{province?.province}</strong>
          <span>地方餐盘</span>
        </div>
      </div>
      <div className="province-plate__legend">
        {keys.map((key) => {
          const field = provinceFields.find((item) => item.key === key);
          return (
            <span key={key}>
              <i style={{ background: field.color }} />
              {field.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function ProvinceRadar({ province, provinceData }) {
  const center = 140;
  const radius = 88;
  const axes = provinceFields;
  const points = axes.map((axis, index) => {
    const angle = (-90 + (360 / axes.length) * index) * (Math.PI / 180);
    const ratio = Math.min(1, provinceValue(province, axis.key) / provinceMax(provinceData, axis.key));
    return {
      ...axis,
      x: center + Math.cos(angle) * radius * ratio,
      y: center + Math.sin(angle) * radius * ratio,
      lx: center + Math.cos(angle) * (radius + 22),
      ly: center + Math.sin(angle) * (radius + 22),
    };
  });
  const polygon = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <svg className="province-radar" viewBox="0 0 280 280" role="img" aria-label={`${province?.province}餐桌雷达图`}>
      {[0.33, 0.66, 1].map((scale) => (
        <circle key={scale} cx={center} cy={center} r={radius * scale} fill="none" stroke="rgba(53,55,47,.12)" />
      ))}
      {points.map((point) => (
        <g key={point.key}>
          <line x1={center} y1={center} x2={point.lx} y2={point.ly} stroke="rgba(53,55,47,.12)" />
          <text
            x={point.lx}
            y={point.ly}
            dominantBaseline="middle"
            textAnchor={point.lx < center ? "end" : point.lx > center ? "start" : "middle"}
          >
            {point.label}
          </text>
        </g>
      ))}
      <polygon points={polygon} fill="rgba(184,61,46,.22)" stroke="rgba(184,61,46,.88)" strokeWidth="2.5" />
      {points.map((point) => <circle key={`${point.key}-dot`} cx={point.x} cy={point.y} r="4" fill={point.color} />)}
    </svg>
  );
}

function ProvinceCompareBars({ province, provinceData }) {
  return (
    <div className="province-compare">
      {provinceFields.map((field) => {
        const local = provinceValue(province, field.key);
        const avg = provinceMean(provinceData, field.key);
        const max = provinceMax(provinceData, field.key);
        return (
          <div className="compare-bar" key={field.key}>
            <div>
              <span>{field.label}</span>
              <strong>{local.toFixed(1)}</strong>
              <em>全国均值 {avg.toFixed(1)}</em>
            </div>
            <span className="compare-track">
              <i className="compare-bar__avg" style={{ left: `${(avg / max) * 100}%` }} />
              <b
                style={{
                  "--bar": `${(local / max) * 100}%`,
                  background: field.color,
                }}
              />
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ProvinceExplorer({ provinceData, province, setProvince }) {
  if (!province || !provinceData.length) return null;

  return (
    <section className="province-explorer" id="province-profile">
      <div className="province-explorer__head">
        <div>
          <span className="eyebrow">个性化互动</span>
          <h2>选择一个省份，生成当地餐桌画像</h2>
          <p>这个模块把省份数据转成三层画像：地方餐盘、六维雷达、与全国均值对比。读者可以把自己的家乡放进故事里。</p>
        </div>
        <label>
          <span>选择省份</span>
          <select
            value={province.province}
            onChange={(event) => {
              const next = provinceData.find((item) => item.province === event.target.value);
              if (next) setProvince({ ...next, field: "餐桌丰富度", raw: next["餐桌丰富度"] });
            }}
          >
            {provinceData.map((item) => <option key={item.province} value={item.province}>{item.province}</option>)}
          </select>
        </label>
      </div>

      <div className="province-dashboard">
        <article className="province-signature">
          <span>{province.province}餐桌关键词</span>
          <h3>{provinceFlavor(province, provinceData)}</h3>
          <p>
            这不是给地方贴标签，而是把同一套指标转成可比较的生活画像：
            主食、猪肉、水产、奶类、水果和丰富度，决定了这张餐桌的形状。
          </p>
          <div className="signature-number">
            <strong>{provinceValue(province, "餐桌丰富度").toFixed(1)}</strong>
            <em>餐桌丰富度</em>
          </div>
        </article>
        <article className="province-panel">
          <span className="panel-label">地方餐盘</span>
          <ProvincePlate province={province} />
        </article>
        <article className="province-panel">
          <span className="panel-label">六维雷达</span>
          <ProvinceRadar province={province} provinceData={provinceData} />
        </article>
        <article className="province-panel province-panel--wide">
          <span className="panel-label">对全国均值的偏离</span>
          <ProvinceCompareBars province={province} provinceData={provinceData} />
        </article>
      </div>
    </section>
  );
}

function SourceDrawer({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="drawer-backdrop" role="presentation" onClick={onClose}>
      <aside className="source-drawer" role="dialog" aria-modal="true" aria-label="数据来源说明" onClick={(event) => event.stopPropagation()}>
        <button className="drawer-close" type="button" onClick={onClose}>关闭</button>
        <span className="eyebrow">资料说明</span>
        <h2>哪些数字是事实，哪些是2026观察</h2>
        {sourceNotes.map((note) => <p key={note}>{note}</p>)}
        <div className="source-grid">
          <span>消费量</span><strong>1985/1990-2024</strong>
          <span>进口与猪肉</span><strong>至2025</strong>
          <span>外卖市场</span><strong>2024实测，2027预测辅助</strong>
          <span>人物线</span><strong>刘铁柱为化名/合成叙事</strong>
        </div>
      </aside>
    </div>
  );
}

export function App() {
  const [year, setYear] = useState(2026);
  const [selectedMetric, setSelectedMetric] = useState("grain");
  const [compareMode, setCompareMode] = useState("urban");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [provinceData, setProvinceData] = useState([]);
  const [province, setProvince] = useState(null);

  useEffect(() => {
    fetch(assetPath("/assets/table40-data.json"))
      .then((response) => response.json())
      .then((data) => {
        setProvinceData(data.province_2024 || []);
        setProvince(data.province_2024?.[0] ? { ...data.province_2024[0], field: "粮食", raw: data.province_2024[0]["粮食"] } : null);
      })
      .catch(() => setProvinceData([]));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      document.documentElement.style.setProperty("--scroll-progress", progress);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const selected = metrics[selectedMetric];
  const activeLens = urbanRuralScenes[compareMode] || urbanRuralScenes.urban;
  const chapter = useMemo(() => liuChapters.reduce((best, item) => (
    Math.abs(item.year - year) < Math.abs(best.year - year) ? item : best
  ), liuChapters[0]), [year]);

  return (
    <>
      <PageBackdrop />
      <div className="progress-bar" aria-hidden="true" />
      <header
        className="hero"
        id="top"
        style={{ "--hero-image": `url("${assetPath("/assets/table40-hero-v2.png")}")` }}
      >
        <nav className="top-nav" aria-label="页面章节">
          <a href="#theatre">时代餐桌</a>
          <a href="#liu">刘铁柱</a>
          <a href="#regions">地域差异</a>
          <button type="button" onClick={() => setDrawerOpen(true)}>数据说明</button>
        </nav>
        <div className="hero__content">
          <div className="hero-copy">
            <span className="eyebrow">1985 至 2026</span>
            <h1>中国人的<br />餐桌<span>40</span>年</h1>
            <p>
              从票证的尾声，到外卖的算法；从一碗饭要管饱，到一张餐桌要兼顾健康、效率和远方。
              四十多年里，中国人的饮食变化，藏在每一顿饭的选择里。
            </p>
            <div className="hero-note">
              <span>刘铁柱为化名</span>
              <strong>{chapter.year}：{chapter.title}</strong>
            </div>
          </div>
          <div className="hero-metrics" aria-label="关键指标">
            <HeroCard metricKey="grain" />
            <HeroCard metricKey="meat" />
            <HeroCard metricKey="dairy" />
            <HeroCard metricKey="fruit" />
            <HeroCard metricKey="takeout" />
          </div>
        </div>
      </header>

      <main>
        <TimeSlider year={year} setYear={setYear} />

        <section className="story-shell" id="theatre">
          <aside className="chapter-nav" aria-label="章节导航">
            <span>章节导航</span>
            {[
              ["01", "餐桌结构"],
              ["02", "指标趋势"],
              ["03", "刘铁柱"],
              ["04", "地区差异"],
              ["05", "数据说明"],
            ].map(([num, label]) => (
              <a key={num} href={num === "03" ? "#liu" : num === "04" ? "#regions" : num === "05" ? "#sources" : "#theatre"}>
                <strong>{num}</strong>{label}
              </a>
            ))}
            <button type="button" onClick={() => setDrawerOpen(true)}>查看数据与方法</button>
          </aside>

          <section className="theatre-panel">
            <div className="panel-heading">
              <span className="eyebrow">01 餐桌的总体变迁</span>
              <h2>从结构看变化，餐桌更丰富，也更复杂</h2>
              <p>
                拖动年份，盘子里的比例会跟着改变。主食退到一旁，肉、奶、果和水产品变得更常见；
                外卖则在后半程突然出现，把厨房、商家和城市物流连在一起。
              </p>
            </div>
            <MetricTabs selectedMetric={selectedMetric} setSelectedMetric={setSelectedMetric} />
            <div className="data-layout">
              <PlateTheatre year={year} />
              <TrendPanel selectedMetric={selectedMetric} year={year} />
            </div>
            <WarmDataStory year={year} selectedMetric={selectedMetric} />
            <UrbanRuralScene year={year} compareMode={compareMode} setCompareMode={setCompareMode} />
            <div className="stat-row">
              {[
                ["恩格尔系数", "52.2% → 约29%", "从吃饭占大头，到生活选择更多"],
                ["外卖市场", "1.64万亿+", "城市把一部分厨房交给了骑手"],
                ["鲜瓜果", "约12倍", "从季节馈赠到日常补充"],
                ["肉奶水产", "持续上桌", "蛋白质成为健康叙事中心"],
              ].map(([title, value, note]) => (
                <article className="stat-card" key={title}>
                  <span>{title}</span>
                  <strong>{value}</strong>
                  <p>{note}</p>
                </article>
              ))}
            </div>
            <div className="chart-intro">
              <span className="eyebrow">02 多维证据</span>
              <p>从结构、速度、地域与个人餐盘四条线进入餐桌变化，让数据在不同尺度之间互相印证。</p>
            </div>
            <ChartGallery
              year={year}
              setYear={setYear}
              provinceData={provinceData}
              selectedMetric={selectedMetric}
              setSelectedMetric={setSelectedMetric}
            />
          </section>

          <aside className="side-panel">
            <div className="compare-switch" aria-label="城乡对比">
              <button
                className={compareMode === "urban" ? "active" : ""}
                type="button"
                onClick={() => setCompareMode("urban")}
              >
                城镇
              </button>
              <button
                className={compareMode === "rural" ? "active" : ""}
                type="button"
                onClick={() => setCompareMode("rural")}
              >
                农村
              </button>
            </div>
            <div className="side-panel__photo">
              <img src={assetPath(activeLens.image)} alt={`${activeLens.label}材料图`} />
              <span>{activeLens.material}</span>
            </div>
            <h3>{activeLens.label}的这一刻</h3>
            <p>{activeLens.text}</p>
            <div className="selected-metric" style={{ "--accent": selected.color }}>
              <span>{selected.label}</span>
              <strong>{formatNumber(getMetricValue(selectedMetric, year))}</strong>
              <em>{selected.unit}</em>
              <small>{selected.story}</small>
            </div>
            <div className="quote-card">
              <span>{activeLens.label}旁白</span>
              <p>{activeLens.quote}</p>
            </div>
          </aside>
        </section>

        <LiuStory year={year} setYear={setYear} />

        <ProvinceGrid provinceData={provinceData} selectedMetric={selectedMetric} setProvince={setProvince} />

        <ProvinceExplorer provinceData={provinceData} province={province} setProvince={setProvince} />

        <section className="closing" id="sources">
          <span className="eyebrow">尾声</span>
          <h2>餐桌变大了，也把人的愿望照得更清楚</h2>
          <p>
            数据告诉我们，粮食、肉类、奶类、水果、外卖和进口食品的曲线都在变化。
            但真正让这些曲线有意义的，是每个家庭如何把变化放进一顿饭里：
            有人想吃得更好，有人想吃得方便，有人想吃得健康，也有人只是想让家人多夹一筷子。
          </p>
          <div className="closing-actions">
            <button type="button" onClick={() => setDrawerOpen(true)}>打开数据说明</button>
            <a href="#top">回到开头</a>
          </div>
        </section>
      </main>

      <MusicToggle />
      <SourceDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
