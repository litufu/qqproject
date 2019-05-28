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
						"value": "RK=NLggbFQpz1; ts_uid=1136184560; ptcz=367cf5edb1e555ad22f1e55e247f802bf96718345132300a15da1242224cd11c; pgv_info=ssid=s4007286854; pgv_pvid=5305572534; uin=o2837484507; skey=Zz2ALH4kVY; itkn=2073906251",
						// "value": "RK=/rKpUR8tyh; ptisp=cm; ptcz=8557791147b790129d7d857b9b46ea4badcf992afb6e933280055585e99ab338; pgv_info=ssid=s3879612776; pgv_pvid=369136925; uin=o3468350745; skey=ZvljpLjkZ8; itkn=2073906253",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "num=20&page=0&sessionid=0&keyword=&agerg=12&sex=0&firston=1&video=0&country=1&province=0&city=0&district=0&hcountry=1&hprovince=0&hcity=0&hdistrict=0&online=1&ldw=194316974"
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function get_html() {
  for (let i = 0; i < 500000; i++) {
	let raw = `num=20&page=${i}&sessionid=0&keyword=&agerg=12&sex=0&firston=1&video=0&country=1&province=0&city=0&district=0&hcountry=1&hprovince=0&hcity=0&hdistrict=0&online=1&ldw=194316974`
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
	await sleep(2000);
 }
}

get_html()


