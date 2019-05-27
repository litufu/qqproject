import requests
import json
# #
headers = {
    'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
    'Host': 'cgi.find.qq.com',
    'Connection': 'keep-alive',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Origin': 'http://find.qq.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) QQ/9.1.1.24953 Chrome/43.0.2357.134 Safari/537.36 QBCore/3.43.1019.400 QQBrowser/9.0.2524.400',
    'Referer': ': http://find.qq.com/index.html?version=1&im_version=5623&width=910&height=610&search_target=0',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-US,en;q=0.8',
    "Cookie": 'RK=/rKpUR8tyh; pgv_pvid=369136925; ptisp=cm; ptcz=8557791147b790129d7d857b9b46ea4badcf992afb6e933280055585e99ab338; pgv_info=ssid=s8866672998; itkn=665499524; uin=o3468350745; skey=ZZSJ90V5aE',
    }
payload = {'data': {
    'num': '20',
    'page': '16',
    'sessionid': '1',
    'keyword': "",
    'agerg': '12',
    'sex': '0',
    'firston': '0',
    'video': '0',
    'country': '1',
    'province': '33',
    'city': '5',
    'district': '0',
    'hcountry': '1',
    'hprovince': '0',
    'hcity': '0',
    'hdistrict': '0',
    'online': '0',
    'cnt': '20',
    'ldw': '2002579152'
}}
# num=20&page=16&sessionid=1&keyword=&agerg=12&sex=0&firston=0&video=0\
#     &country=1&province=33&city=6&district=0&hcountry=1&hprovince=0&hcity=0&hdistrict=0&online=0&cnt=20&ldw=2002579152
#
r = requests.post("http://cgi.find.qq.com/qqfind/buddy/search_v3",
                  data=json.dumps(payload),
                  headers=headers)
print(r.content)

#
# url = "http://cgi.find.qq.com/qqfind/buddy/search_v3"
#
# payload = "num=20&page=1&sessionid=1&keyword=&agerg=12&sex=0&firston=0&video=0&country=1&province=33&city=3&district=0&hcountry=1&hprovince=0&hcity=0&hdistrict=0&online=0&cnt=20&ldw=2002579152&undefined="
# headers = {
#     'Content-Type': "application/x-www-form-urlencoded,application/x-www-form-urlencoded; charset=UTF-8",
#     'Host': "cgi.find.qq.com",
#     'Connection': "keep-alive",
#     'Accept': "application/json, text/javascript, */*; q=0.01",
#     'Origin': "http://find.qq.com",
#     'User-Agent': "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) QQ/9.1.1.24953 Chrome/43.0.2357.134 Safari/537.36 QBCore/3.43.1019.400 QQBrowser/9.0.2524.400",
#     'Referer': "http://find.qq.com/index.html?version=1&im_version=5623&width=910&height=610&search_target=0",
#     'Accept-Encoding': "gzip, deflate",
#     'Accept-Language': "en-US,en;q=0.8",
#     'Cookie': "RK=/rKpUR8tyh; pgv_pvid=369136925; ptisp=cm; ptcz=8557791147b790129d7d857b9b46ea4badcf992afb6e933280055585e99ab338; pgv_info=ssid=s8866672998; itkn=665499524; uin=o3468350745; skey=ZZSJ90V5aE",
#     'cache-control': "no-cache",
#     'Postman-Token': "258facd3-b856-46a1-bfa6-03ff54162728"
#     }
#
# response = requests.request("POST", url, data=payload, headers=headers)
#
# print(response.json())

