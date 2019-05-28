#!/usr/bin/env node
/**
 * @fileOverview
 * This sample code illustrates how to read a collection JSON file in NodeJS and run it using Newman
 */
const newman = require('newman'); // require('newman')
const myCollection = {
	"info": {
		"_postman_id": "0fa20727-9880-4a67-be7c-a7c4e31bfb91",
		"name": "new",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "find",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/x-www-form-urlencoded; charset=UTF-8",
						"type": "text"
					},
					{
						"key": "Host",
						"value": "cgi.find.qq.com",
						"type": "text"
					},
					{
						"key": "Connection",
						"value": "keep-alive",
						"type": "text"
					},
					{
						"key": "Accept",
						"value": "application/json, text/javascript, */*; q=0.01",
						"type": "text"
					},
					{
						"key": "Origin",
						"value": "http://find.qq.com",
						"type": "text"
					},
					{
						"key": "User-Agent",
						"value": "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) QQ/9.1.1.24953 Chrome/43.0.2357.134 Safari/537.36 QBCore/3.43.1019.400 QQBrowser/9.0.2524.400",
						"type": "text"
					},
					{
						"key": "Referer",
						"value": "http://find.qq.com/index.html?version=1&im_version=5623&width=910&height=610&search_target=0",
						"type": "text"
					},
					{
						"key": "Accept-Encoding",
						"value": "gzip, deflate",
						"type": "text"
					},
					{
						"key": "Accept-Language",
						"value": "en-US,en;q=0.8",
						"type": "text"
					},
					{
						"key": "Cookie",
						"value": "RK=/rKpUR8tyh; ts_uid=5007439680; ptcz=8557791147b790129d7d857b9b46ea4badcf992afb6e933280055585e99ab338; pgv_pvid=369136925; uin=o3468350745; skey=ZrGagOP3vT; itkn=2073906251",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "num=20&page=0&sessionid=0&keyword=&agerg=0&sex=0&firston=1&video=0&country=1&province=11&city=8&district=0&hcountry=1&hprovince=0&hcity=0&hdistrict=0&online=1&ldw=669513276"
				},
				"url": {
					"raw": "http://cgi.find.qq.com/qqfind/buddy/search_v3",
					"protocol": "http",
					"host": [
						"cgi",
						"find",
						"qq",
						"com"
					],
					"path": [
						"qqfind",
						"buddy",
						"search_v3"
					]
				}
			},
			"response": []
		}
	]
}

const areas = [ {'code': '34', 'name': '安徽', 'cities': [ {'code': '8', 'name': '安庆'}, {'code': '3', 'name': '蚌埠'}, {'code': '16', 'name': '亳州'}, {'code': '14', 'name': '巢湖'}, {'code': '17', 'name': '池州'}, {'code': '11', 'name': '滁州'}, {'code': '12', 'name': '阜阳'}, {'code': '1', 'name': '合肥'}, {'code': '6', 'name': '淮北'}, {'code': '4', 'name': '淮南'}, {'code': '10', 'name': '黄山'}, {'code': '15', 'name': '六安'}, {'code': '5', 'name': '马鞍山'}, {'code': '13', 'name': '宿州'}, {'code': '7', 'name': '铜陵'}, {'code': '2', 'name': '芜湖'}, {'code': '18', 'name': '宣城'}]},  {'code': '11', 'name': '北京', 'cities': [ {'code': '21', 'name': '昌平'}, {'code': '5', 'name': '朝阳'}, {'code': '3', 'name': '崇文'}, {'code': '24', 'name': '大兴'}, {'code': '1', 'name': '东城'}, {'code': '11', 'name': '房山'}, {'code': '6', 'name': '丰台'}, {'code': '8', 'name': '海淀'}, {'code': '27', 'name': '怀柔'}, {'code': '9', 'name': '门头沟'}, {'code': '28', 'name': '密云'}, {'code': '26', 'name': '平谷'}, {'code': '7', 'name': '石景山'}, {'code': '13', 'name': '顺义'}, {'code': '12', 'name': '通州'}, {'code': '2', 'name': '西城'}, {'code': '4', 'name': '宣武'}, {'code': '29', 'name': '延庆'}]}, {'code': '35', 'name': '福建', 'cities': [ {'code': '1', 'name': '福州'}, {'code': '8', 'name': '龙岩'}, {'code': '7', 'name': '南平'}, {'code': '9', 'name': '宁德'}, {'code': '3', 'name': '莆田'}, {'code': '5', 'name': '泉州'}, {'code': '4', 'name': '三明'}, {'code': '2', 'name': '厦门'}, {'code': '6', 'name': '漳州'}]}, {'code': '62', 'name': '甘肃', 'cities': [ {'code': '4', 'name': '白银'}, {'code': '11', 'name': '定西'}, {'code': '30', 'name': '甘南'}, {'code': '2', 'name': '嘉峪关'}, {'code': '3', 'name': '金昌'}, {'code': '9', 'name': '酒泉'}, {'code': '1', 'name': '兰州'}, {'code': '29', 'name': '临夏'}, {'code': '12', 'name': '陇南'}, {'code': '8', 'name': '平凉'}, {'code': '10', 'name': '庆阳'}, {'code': '5', 'name': '天水'}, {'code': '6', 'name': '武威'}, {'code': '7', 'name': '张掖'}]}, {'code': '44', 'name': '广东', 'cities': [ {'code': '51', 'name': '潮州'}, {'code': '19', 'name': '东莞'}, {'code': '6', 'name': '佛山'}, {'code': '1', 'name': '广州'}, {'code': '16', 'name': '河源'}, {'code': '13', 'name': '惠州'}, {'code': '7', 'name': '江门'}, {'code': '52', 'name': '揭阳'}, {'code': '9', 'name': '茂名'}, {'code': '14', 'name': '梅州'}, {'code': '18', 'name': '清远'}, {'code': '5', 'name': '汕头'}, {'code': '15', 'name': '汕尾'}, {'code': '2', 'name': '韶关'}, {'code': '3', 'name': '深圳'}, {'code': '17', 'name': '阳江'}, {'code': '53', 'name': '云浮'}, {'code': '8', 'name': '湛江'}, {'code': '12', 'name': '肇庆'}, {'code': '20', 'name': '中山'}, {'code': '4', 'name': '珠海'}]}, {'code': '45', 'name': '广西', 'cities': [ {'code': '10', 'name': '百色'}, {'code': '5', 'name': '北海'}, {'code': '14', 'name': '崇左'}, {'code': '6', 'name': '防城港'}, {'code': '8', 'name': '贵港'}, {'code': '3', 'name': '桂林'}, {'code': '12', 'name': '河池'}, {'code': '11', 'name': '贺州'}, {'code': '13', 'name': '来宾'}, {'code': '2', 'name': '柳州'}, {'code': '1', 'name': '南宁'}, {'code': '7', 'name': '钦州'}, {'code': '4', 'name': '梧州'}, {'code': '9', 'name': '玉林'}]}, {'code': '52', 'name': '贵州', 'cities': [ {'code': '4', 'name': '安顺'}, {'code': '24', 'name': '毕节'}, {'code': '1', 'name': '贵阳'}, {'code': '2', 'name': '六盘水'}, {'code': '26', 'name': '黔东南'}, {'code': '27', 'name': '黔南'}, {'code': '23', 'name': '黔西南'}, {'code': '22', 'name': '铜仁'}, {'code': '3', 'name': '遵义'}]}, {'code': '46', 'name': '海南', 'cities': [ {'code': 'A30', 'name': '白沙'}, {'code': 'A35', 'name': '保亭'}, {'code': 'A31', 'name': '昌江'}, {'code': 'A27', 'name': '澄迈'}, {'code': '93', 'name': '儋州'}, {'code': 'A25', 'name': '定安'}, {'code': '97', 'name': '东方'}, {'code': '1', 'name': '海口'}, {'code': 'A33', 'name': '乐东'}, {'code': 'A28', 'name': '临高'}, {'code': 'A34', 'name': '陵水'}, {'code': 'A38', 'name': '南沙'}, {'code': '92', 'name': '琼海'}, {'code': 'A36', 'name': '琼中'}, {'code': '2', 'name': '三亚'}, {'code': 'A26', 'name': '屯昌'}, {'code': '96', 'name': '万宁'}, {'code': '95', 'name': '文昌'}, {'code': '91', 'name': '五指山'}, {'code': 'A37', 'name': '西沙'}, {'code': 'A39', 'name': '中沙'}]}, {'code': '13', 'name': '河北', 'cities': [ {'code': '6', 'name': '保定'}, {'code': '9', 'name': '沧州'}, {'code': '8', 'name': '承德'}, {'code': '4', 'name': '邯郸'}, {'code': '11', 'name': '衡水'}, {'code': '10', 'name': '廊坊'}, {'code': '3', 'name': '秦皇岛'}, {'code': '1', 'name': '石家庄'}, {'code': '2', 'name': '唐山'}, {'code': '5', 'name': '邢台'}, {'code': '7', 'name': '张家口'}]}, {'code': '41', 'name': '河南', 'cities': [ {'code': '5', 'name': '安阳'}, {'code': '6', 'name': '鹤壁'}, {'code': '18', 'name': '济源'}, {'code': '8', 'name': '焦作'}, {'code': '2', 'name': '开封'}, {'code': '3', 'name': '洛阳'}, {'code': '11', 'name': '漯河'}, {'code': '13', 'name': '南阳'}, {'code': '4', 'name': '平顶山'}, {'code': '9', 'name': '濮阳'}, {'code': '12', 'name': '三门峡'}, {'code': '14', 'name': '商丘'}, {'code': '7', 'name': '新乡'}, {'code': '15', 'name': '信阳'}, {'code': '10', 'name': '许昌'}, {'code': '1', 'name': '郑州'}, {'code': '16', 'name': '周口'}, {'code': '17', 'name': '驻马店'}]}, {'code': '23', 'name': '黑龙江', 'cities': [ {'code': '6', 'name': '大庆'}, {'code': '27', 'name': '大兴安岭'}, {'code': '1', 'name': '哈尔滨'}, {'code': '4', 'name': '鹤岗'}, {'code': '11', 'name': '黑河'}, {'code': '3', 'name': '鸡西'}, {'code': '8', 'name': '佳木斯'}, {'code': '10', 'name': '牡丹江'}, {'code': '9', 'name': '七台河'}, {'code': '2', 'name': '齐齐哈尔'}, {'code': '5', 'name': '双鸭山'}, {'code': '12', 'name': '绥化'}, {'code': '7', 'name': '伊春'}]}, {'code': '42', 'name': '湖北', 'cities': [ {'code': '7', 'name': '鄂州'}, {'code': '28', 'name': '恩施'}, {'code': '11', 'name': '黄冈'}, {'code': '2', 'name': '黄石'}, {'code': '8', 'name': '荆门'}, {'code': '10', 'name': '荆州'}, {'code': '95', 'name': '潜江'}, {'code': 'A21', 'name': '神农架'}, {'code': '3', 'name': '十堰'}, {'code': '13', 'name': '随州'}, {'code': '96', 'name': '天门'}, {'code': '1', 'name': '武汉'}, {'code': '94', 'name': '仙桃'}, {'code': '12', 'name': '咸宁'}, {'code': '6', 'name': '襄樊'}, {'code': '9', 'name': '孝感'}, {'code': '5', 'name': '宜昌'}]}, {'code': '43', 'name': '湖南', 'cities': [ {'code': '1', 'name': '长沙'}, {'code': '7', 'name': '常德'}, {'code': '10', 'name': '郴州'}, {'code': '4', 'name': '衡阳'}, {'code': '12', 'name': '怀化'}, {'code': '13', 'name': '娄底'}, {'code': '5', 'name': '邵阳'}, {'code': '3', 'name': '湘潭'}, {'code': '31', 'name': '湘西'}, {'code': '9', 'name': '益阳'}, {'code': '11', 'name': '永州'}, {'code': '6', 'name': '岳阳'}, {'code': '8', 'name': '张家界'}, {'code': '2', 'name': '株洲'}]}, {'code': '22', 'name': '吉林', 'cities': [ {'code': '8', 'name': '白城'}, {'code': '6', 'name': '白山'}, {'code': '1', 'name': '长春'}, {'code': '2', 'name': '吉林'}, {'code': '4', 'name': '辽源'}, {'code': '3', 'name': '四平'}, {'code': '7', 'name': '松原'}, {'code': '5', 'name': '通化'}, {'code': '24', 'name': '延边'}]}, {'code': '32', 'name': '江苏', 'cities': [ {'code': '4', 'name': '常州'}, {'code': '8', 'name': '淮安'}, {'code': '7', 'name': '连云港'}, {'code': '1', 'name': '南京'}, {'code': '6', 'name': '南通'}, {'code': '5', 'name': '苏州'}, {'code': '13', 'name': '宿迁'}, {'code': '12', 'name': '泰州'}, {'code': '2', 'name': '无锡'}, {'code': '3', 'name': '徐州'}, {'code': '9', 'name': '盐城'}, {'code': '10', 'name': '扬州'}, {'code': '11', 'name': '镇江'}]}, {'code': '36', 'name': '江西', 'cities': [ {'code': '10', 'name': '抚州'}, {'code': '7', 'name': '赣州'}, {'code': '8', 'name': '吉安'}, {'code': '2', 'name': '景德镇'}, {'code': '4', 'name': '九江'}, {'code': '1', 'name': '南昌'}, {'code': '3', 'name': '萍乡'}, {'code': '11', 'name': '上饶'}, {'code': '5', 'name': '新余'}, {'code': '9', 'name': '宜春'}, {'code': '6', 'name': '鹰潭'}]}, {'code': '21', 'name': '辽宁', 'cities': [ {'code': '3', 'name': '鞍山'}, {'code': '5', 'name': '本溪'}, {'code': '13', 'name': '朝阳'}, {'code': '2', 'name': '大连'}, {'code': '6', 'name': '丹东'}, {'code': '4', 'name': '抚顺'}, {'code': '9', 'name': '阜新'}, {'code': '14', 'name': '葫芦岛'}, {'code': '7', 'name': '锦州'}, {'code': '10', 'name': '辽阳'}, {'code': '11', 'name': '盘锦'}, {'code': '1', 'name': '沈阳'}, {'code': '12', 'name': '铁岭'}, {'code': '8', 'name': '营口'}]}, {'code': '15', 'name': '内蒙古', 'cities': [ {'code': '29', 'name': '阿拉善'}, {'code': '8', 'name': '巴彦淖尔'}, {'code': '2', 'name': '包头'}, {'code': '4', 'name': '赤峰'}, {'code': '6', 'name': '鄂尔多斯'}, {'code': '1', 'name': '呼和浩特'}, {'code': '7', 'name': '呼伦贝尔'}, {'code': '5', 'name': '通辽'}, {'code': '3', 'name': '乌海'}, {'code': '9', 'name': '乌兰察布'}, {'code': '25', 'name': '锡林郭勒'}, {'code': '22', 'name': '兴安'}]}, {'code': '64', 'name': '宁夏', 'cities': [ {'code': '4', 'name': '固原'}, {'code': '2', 'name': '石嘴山'}, {'code': '3', 'name': '吴忠'}, {'code': '1', 'name': '银川'}, {'code': '5', 'name': '中卫'}]}, {'code': '63', 'name': '青海', 'cities': [ {'code': '26', 'name': '果洛'}, {'code': '22', 'name': '海北'}, {'code': '21', 'name': '海东'}, {'code': '25', 'name': '海南'}, {'code': '28', 'name': '海西'}, {'code': '23', 'name': '黄南'}, {'code': '1', 'name': '西宁'}, {'code': '27', 'name': '玉树'}]}, {'code': '37', 'name': '山东', 'cities': [ {'code': '16', 'name': '滨州'}, {'code': '14', 'name': '德州'}, {'code': '5', 'name': '东营'}, {'code': '17', 'name': '菏泽'}, {'code': '1', 'name': '济南'}, {'code': '8', 'name': '济宁'}, {'code': '12', 'name': '莱芜'}, {'code': '15', 'name': '聊城'}, {'code': '13', 'name': '临沂'}, {'code': '2', 'name': '青岛'}, {'code': '11', 'name': '日照'}, {'code': '9', 'name': '泰安'}, {'code': '10', 'name': '威海'}, {'code': '7', 'name': '潍坊'}, {'code': '6', 'name': '烟台'}, {'code': '4', 'name': '枣庄'}, {'code': '3', 'name': '淄博'}]}, {'code': '14', 'name': '山西', 'cities': [ {'code': '4', 'name': '长治'}, {'code': '2', 'name': '大同'}, {'code': '5', 'name': '晋城'}, {'code': '7', 'name': '晋中'}, {'code': '10', 'name': '临汾'}, {'code': '11', 'name': '吕梁'}, {'code': '6', 'name': '朔州'}, {'code': '1', 'name': '太原'}, {'code': '9', 'name': '忻州'}, {'code': '3', 'name': '阳泉'}, {'code': '8', 'name': '运城'}]}, {'code': '61', 'name': '陕西', 'cities': [ {'code': '9', 'name': '安康'}, {'code': '3', 'name': '宝鸡'}, {'code': '7', 'name': '汉中'}, {'code': '10', 'name': '商洛'}, {'code': '2', 'name': '铜川'}, {'code': '5', 'name': '渭南'}, {'code': '1', 'name': '西安'}, {'code': '4', 'name': '咸阳'}, {'code': '6', 'name': '延安'}, {'code': '8', 'name': '榆林'}]}, {'code': '31', 'name': '上海', 'cities': [ {'code': '13', 'name': '宝山'}, {'code': '5', 'name': '长宁'}, {'code': '30', 'name': '崇明'}, {'code': '26', 'name': '奉贤'}, {'code': '9', 'name': '虹口'}, {'code': '1', 'name': '黄浦'}, {'code': '14', 'name': '嘉定'}, {'code': '16', 'name': '金山'}, {'code': '6', 'name': '静安'}, {'code': '3', 'name': '卢湾'}, {'code': '12', 'name': '闵行'}, {'code': '25', 'name': '南汇'}, {'code': '15', 'name': '浦东新'}, {'code': '7', 'name': '普陀'}, {'code': '29', 'name': '青浦'}, {'code': '17', 'name': '松江'}, {'code': '4', 'name': '徐汇'}, {'code': '11', 'name': '杨浦'}, {'code': '8', 'name': '闸北'}]}, {'code': '51', 'name': '四川', 'cities': [ {'code': '32', 'name': '阿坝'}, {'code': '19', 'name': '巴中'}, {'code': '1', 'name': '成都'}, {'code': '17', 'name': '达州'}, {'code': '6', 'name': '德阳'}, {'code': '33', 'name': '甘孜'}, {'code': '16', 'name': '广安'}, {'code': '8', 'name': '广元'}, {'code': '11', 'name': '乐山'}, {'code': '34', 'name': '凉山'}, {'code': '5', 'name': '泸州'}, {'code': '14', 'name': '眉山'}, {'code': '7', 'name': '绵阳'}, {'code': '10', 'name': '内江'}, {'code': '13', 'name': '南充'}, {'code': '4', 'name': '攀枝花'}, {'code': '9', 'name': '遂宁'}, {'code': '18', 'name': '雅安'}, {'code': '15', 'name': '宜宾'}, {'code': '20', 'name': '资阳'}, {'code': '3', 'name': '自贡'}]}, {'code': '12', 'name': '天津', 'cities': [ {'code': '24', 'name': '宝坻'}, {'code': '13', 'name': '北辰'}, {'code': '9', 'name': '大港'}, {'code': '10', 'name': '东丽'}, {'code': '8', 'name': '汉沽'}, {'code': '1', 'name': '和平'}, {'code': '5', 'name': '河北'}, {'code': '2', 'name': '河东'}, {'code': '3', 'name': '河西'}, {'code': '6', 'name': '红桥'}, {'code': '25', 'name': '蓟县'}, {'code': '12', 'name': '津南'}, {'code': '23', 'name': '静海'}, {'code': '4', 'name': '南开'}, {'code': '21', 'name': '宁河'}, {'code': '7', 'name': '塘沽'}, {'code': '22', 'name': '武清'}, {'code': '11', 'name': '西青'}]}, {'code': '54', 'name': '西藏', 'cities': [ {'code': '25', 'name': '阿里'}, {'code': '21', 'name': '昌都'}, {'code': '1', 'name': '拉萨'}, {'code': '26', 'name': '林芝'}, {'code': '24', 'name': '那曲'}, {'code': '23', 'name': '日喀则'}, {'code': '22', 'name': '山南'}]},{'code': '65', 'name': '新疆', 'cities': [ {'code': '29', 'name': '阿克苏'}, {'code': '92', 'name': '阿拉尔'}, {'code': '43', 'name': '阿勒泰'}, {'code': '28', 'name': '巴音郭楞'}, {'code': '27', 'name': '博尔塔拉'}, {'code': '23', 'name': '昌吉'}, {'code': '22', 'name': '哈密'}, {'code': '32', 'name': '和田'}, {'code': '31', 'name': '喀什'}, {'code': '2', 'name': '克拉玛依'}, {'code': '30', 'name': '克孜勒苏'}, {'code': '91', 'name': '石河子'}, {'code': '42', 'name': '塔城'}, {'code': '93', 'name': '图木舒克'}, {'code': '21', 'name': '吐鲁番'}, {'code': '1', 'name': '乌鲁木齐'}, {'code': '94', 'name': '五家渠'}, {'code': '40', 'name': '伊犁'}]}, {'code': '53', 'name': '云南', 'cities': [ {'code': '5', 'name': '保山'}, {'code': '23', 'name': '楚雄'}, {'code': '29', 'name': '大理'}, {'code': '31', 'name': '德宏'}, {'code': '34', 'name': '迪庆'}, {'code': '25', 'name': '红河'}, {'code': '1', 'name': '昆明'}, {'code': '7', 'name': '丽江'}, {'code': '9', 'name': '临沧'}, {'code': '33', 'name': '怒江'}, {'code': '8', 'name': '普洱'}, {'code': '3', 'name': '曲靖'}, {'code': '26', 'name': '文山'}, {'code': '28', 'name': '西双版纳'}, {'code': '4', 'name': '玉溪'}, {'code': '6', 'name': '昭通'}]}, {'code': '33', 'name': '浙江', 'cities': [ {'code': '1', 'name': '杭州'}, {'code': '5', 'name': '湖州'}, {'code': '4', 'name': '嘉兴'}, {'code': '7', 'name': '金华'}, {'code': '11', 'name': '丽水'}, {'code': '2', 'name': '宁波'}, {'code': '8', 'name': '衢州'}, {'code': '6', 'name': '绍兴'}, {'code': '10', 'name': '台州'}, {'code': '3', 'name': '温州'}, {'code': '9', 'name': '舟山'}]}, {'code': '50', 'name': '重庆', 'cities': [ {'code': '13', 'name': '巴南'}, {'code': '9', 'name': '北碚'}, {'code': '27', 'name': '璧山'}, {'code': '21', 'name': '长寿'}, {'code': '29', 'name': '城口'}, {'code': '4', 'name': '大渡口'}, {'code': '25', 'name': '大足'}, {'code': '31', 'name': '垫江'}, {'code': '30', 'name': '丰都'}, {'code': '36', 'name': '奉节'}, {'code': '2', 'name': '涪陵'}, {'code': '82', 'name': '合川'}, {'code': '5', 'name': '江北'}, {'code': '81', 'name': '江津'}, {'code': '7', 'name': '九龙坡'}, {'code': '34', 'name': '开县'}, {'code': '28', 'name': '梁平'}, {'code': '8', 'name': '南岸'}, {'code': '84', 'name': '南川'}, {'code': '43', 'name': '彭水'}, {'code': '22', 'name': '綦江'}, {'code': '39', 'name': '黔江'}, {'code': '26', 'name': '荣昌'}, {'code': '6', 'name': '沙坪坝'}, {'code': '40', 'name': '石柱'}, {'code': '11', 'name': '双桥'}, {'code': '24', 'name': '铜梁'}, {'code': '23', 'name': '潼南'}, {'code': '10', 'name': '万盛'}, {'code': '1', 'name': '万州'}, {'code': '37', 'name': '巫山'}, {'code': '38', 'name': '巫溪'}, {'code': '32', 'name': '武隆'}, {'code': '41', 'name': '秀山'}, {'code': '83', 'name': '永川'}, {'code': '42', 'name': '酉阳'}, {'code': '12', 'name': '渝北'}, {'code': '3', 'name': '渝中'}, {'code': '35', 'name': '云阳'}, {'code': '33', 'name': '忠县'}]}]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function get_html() {
	for (const province of areas) {
		console.log(province.name)
		for(const city of province.cities){
			console.log(city.name)
			for (let i = 0; i < 10; i++) {
				let raw = `num=20&page=${i}&sessionid=0&keyword=&agerg=0&sex=0&firston=1&video=0&country=1&province=${province.code}&city=${city.code}&district=0&hcountry=1&hprovince=0&hcity=0&hdistrict=0&online=1&ldw=669513276`
				myCollection.item[0].request.body.raw = raw
				console.log(raw)
				// call newman.run to pass `options` object and wait for callback
				newman.run({
					// collection: require('./postman_collection.json'),
					collection: myCollection,
					reporters: ['htmlextra'],
				}, function (err) {
					if (err) { throw err; }
					console.info('collection run complete!');
				});
				await sleep(6000);
			 }
		}
	}
	await sleep(60000);
}

while(true){
	get_html()
}




