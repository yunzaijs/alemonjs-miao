var id = 20000000;
var name = "旅行者";
var abbr = "旅行者";
var title = "异界的旅人";
var star = 5;
var elem = "multi";
var allegiance = "——";
var weapon = "sword";
var birth = "-";
var astro = "旅人座";
var desc = "从世界之外漂流而来的旅行者，被神带走血亲，自此踏上寻找七神之路。";
var cncv = "宴宁/鹿喑";
var jpcv = "悠木碧/堀江瞬";
var costume = false;
var ver = 1;
var baseAttr = {
	hp: 11627,
	atk: 227.09,
	def: 729.73
};
var growAttr = {
	key: "atkPct",
	value: 24
};
var talentId = {
	"10067": "e",
	"10068": "q",
	"10077": "e",
	"10078": "q",
	"10087": "e",
	"10088": "q",
	"10097": "e",
	"10098": "q",
	"10117": "e",
	"10118": "q",
	"10602": "e",
	"10605": "q",
	"100551": "a",
	"100552": "a",
	"100553": "a",
	"100555": "a",
	"100556": "a",
	"100557": "a"
};
var talentElem = {
	"10067": "anemo",
	"10068": "anemo",
	"10077": "geo",
	"10078": "geo",
	"10087": "hydro",
	"10088": "hydro",
	"10097": "pyro",
	"10098": "pyro",
	"10117": "dendro",
	"10118": "dendro",
	"10602": "electro",
	"10605": "electro"
};
var talentCons = {
	e: 5,
	q: 3
};
var materials = {
	gem: "璀璨原钻",
	specialty: "风车菊",
	normal: "不祥的面具",
	talent: "「诗文」的哲学",
	weekly: "东风的吐息"
};
var eta = 1600135200000;
var char45 = {
	id: id,
	name: name,
	abbr: abbr,
	title: title,
	star: star,
	elem: elem,
	allegiance: allegiance,
	weapon: weapon,
	birth: birth,
	astro: astro,
	desc: desc,
	cncv: cncv,
	jpcv: jpcv,
	costume: costume,
	ver: ver,
	baseAttr: baseAttr,
	growAttr: growAttr,
	talentId: talentId,
	talentElem: talentElem,
	talentCons: talentCons,
	materials: materials,
	eta: eta
};

export { abbr, allegiance, astro, baseAttr, birth, cncv, costume, char45 as default, desc, elem, eta, growAttr, id, jpcv, materials, name, star, talentCons, talentElem, talentId, title, ver, weapon };
