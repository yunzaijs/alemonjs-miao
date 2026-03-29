import d0 from './万敌/data.json.js';
import d1 from './三月七 (冰)/data.json.js';
import d2 from './三月七 (虚数)/data.json.js';
import d3 from './丹恒/data.json.js';
import d4 from './丹恒•腾荒/data.json.js';
import d5 from './丹恒•饮月/data.json.js';
import d6 from './乱破/data.json.js';
import d7 from './云璃/data.json.js';
import d8 from './佩拉/data.json.js';
import d9 from './停云/data.json.js';
import d10 from './克拉拉/data.json.js';
import d11 from './刃/data.json.js';
import d12 from './刻律德菈/data.json.js';
import d13 from './加拉赫/data.json.js';
import d14 from './卡芙卡/data.json.js';
import d15 from './卢卡/data.json.js';
import d16 from './大丽花/data.json.js';
import d17 from './大黑塔/data.json.js';
import d18 from './姬子/data.json.js';
import d19 from './娜塔莎/data.json.js';
import d20 from './寒鸦/data.json.js';
import d21 from './布洛妮娅/data.json.js';
import d22 from './希儿/data.json.js';
import d23 from './希露瓦/data.json.js';
import d24 from './开拓者 (同谐)/data.json.js';
import d25 from './开拓者 (火)/data.json.js';
import d26 from './开拓者 (物理)/data.json.js';
import d27 from './开拓者 (记忆)/data.json.js';
import d28 from './彦卿/data.json.js';
import d29 from './忘归人/data.json.js';
import d30 from './托帕_账账/data.json.js';
import d31 from './昔涟/data.json.js';
import d32 from './星期日/data.json.js';
import d33 from './景元/data.json.js';
import d34 from './杰帕德/data.json.js';
import d35 from './桂乃芬/data.json.js';
import d36 from './桑博/data.json.js';
import d37 from './椒丘/data.json.js';
import d38 from './波提欧/data.json.js';
import d39 from './流萤/data.json.js';
import d40 from './海瑟音/data.json.js';
import d41 from './火花/data.json.js';
import d42 from './灵砂/data.json.js';
import d43 from './爻光/data.json.js';
import d44 from './玲可/data.json.js';
import d45 from './瓦尔特/data.json.js';
import d46 from './白厄/data.json.js';
import d47 from './白露/data.json.js';
import d48 from './真理医生/data.json.js';
import d49 from './知更鸟/data.json.js';
import d50 from './砂金/data.json.js';
import d51 from './符玄/data.json.js';
import d52 from './米沙/data.json.js';
import d53 from './素裳/data.json.js';
import d54 from './缇宝/data.json.js';
import d55 from './罗刹/data.json.js';
import d56 from './翡翠/data.json.js';
import d57 from './艾丝妲/data.json.js';
import d58 from './花火/data.json.js';
import d59 from './藿藿/data.json.js';
import d60 from './虎克/data.json.js';
import d61 from './貊泽/data.json.js';
import d62 from './赛飞儿/data.json.js';
import d63 from './遐蝶/data.json.js';
import d64 from './那刻夏/data.json.js';
import d65 from './银枝/data.json.js';
import d66 from './银狼/data.json.js';
import d67 from './镜流/data.json.js';
import d68 from './长夜月/data.json.js';
import d69 from './阮•梅/data.json.js';
import d70 from './阿兰/data.json.js';
import d71 from './阿格莱雅/data.json.js';
import d72 from './雪衣/data.json.js';
import d73 from './青雀/data.json.js';
import d74 from './风堇/data.json.js';
import d75 from './飞霄/data.json.js';
import d76 from './驭空/data.json.js';
import d77 from './黄泉/data.json.js';
import d78 from './黑塔/data.json.js';
import d79 from './黑天鹅/data.json.js';

const SR_CHARACTER_DATA = {
    万敌: d0,
    '三月七 (冰)': d1,
    '三月七 (虚数)': d2,
    丹恒: d3,
    '丹恒•腾荒': d4,
    '丹恒•饮月': d5,
    乱破: d6,
    云璃: d7,
    佩拉: d8,
    停云: d9,
    克拉拉: d10,
    刃: d11,
    刻律德菈: d12,
    加拉赫: d13,
    卡芙卡: d14,
    卢卡: d15,
    大丽花: d16,
    大黑塔: d17,
    姬子: d18,
    娜塔莎: d19,
    寒鸦: d20,
    布洛妮娅: d21,
    希儿: d22,
    希露瓦: d23,
    '开拓者 (同谐)': d24,
    '开拓者 (火)': d25,
    '开拓者 (物理)': d26,
    '开拓者 (记忆)': d27,
    彦卿: d28,
    忘归人: d29,
    '托帕&账账': d30,
    昔涟: d31,
    星期日: d32,
    景元: d33,
    杰帕德: d34,
    桂乃芬: d35,
    桑博: d36,
    椒丘: d37,
    波提欧: d38,
    流萤: d39,
    海瑟音: d40,
    火花: d41,
    灵砂: d42,
    爻光: d43,
    玲可: d44,
    瓦尔特: d45,
    白厄: d46,
    白露: d47,
    真理医生: d48,
    知更鸟: d49,
    砂金: d50,
    符玄: d51,
    米沙: d52,
    素裳: d53,
    缇宝: d54,
    罗刹: d55,
    翡翠: d56,
    艾丝妲: d57,
    花火: d58,
    藿藿: d59,
    虎克: d60,
    貊泽: d61,
    赛飞儿: d62,
    遐蝶: d63,
    那刻夏: d64,
    银枝: d65,
    银狼: d66,
    镜流: d67,
    长夜月: d68,
    '阮•梅': d69,
    阿兰: d70,
    阿格莱雅: d71,
    雪衣: d72,
    青雀: d73,
    风堇: d74,
    飞霄: d75,
    驭空: d76,
    黄泉: d77,
    黑塔: d78,
    黑天鹅: d79
};

export { SR_CHARACTER_DATA };
