import time
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
import json
from selenium.webdriver.support.select import Select
from multiprocessing import Pool
from database import User, Base
from session import session


class QQZoneSpider(object):
    def __init__(self, username, password,content):
        self.username = username
        self.password = password
        self.content = content
        chrome_options = Options()
        # chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        self.driver = webdriver.Chrome(
            executable_path="C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe",
            options=chrome_options)
        self.driver.set_window_size(1200, 900)
        self.driver.get(url='https://i.qq.com/')
        self.set_cookie()
        self.is_login()

    def is_login(self):
        # 判断是否登录
        html = self.driver.page_source
        if html.find('user-name') == -1:  # 利用用户名判断是否登陆
            # 没登录 ,则手动登录
            print('你没有登录')
            self.login()
            self.is_login()

    def save_cookie(self):
        '''保存cookie'''
        # 将cookie序列化保存下来
        f1 = open('{}.txt'.format(self.username), 'w')
        f1.write(json.dumps(self.driver.get_cookies()))
        f1.close

    def set_cookie(self):
        '''往浏览器添加cookie'''
        '''利用pickle序列化后的cookie'''
        try:
            f1 = open('{}.txt'.format(self.username))
            cookies = f1.read()
            cookies = json.loads(cookies)
            for cookie in cookies:
                self.driver.add_cookie(cookie)
            self.driver.refresh()
            time.sleep(8)
        except Exception as e:
            print(e)

    def login(self):
        # 登陆
        print('start login ...')
        # time.sleep(3)
        self.driver.switch_to.frame('login_frame')
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.XPATH, "//a[@id='switcher_plogin']")))
        self.driver.find_element_by_id("switcher_plogin").click()
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, "u")))
        user_input = self.driver.find_element_by_id("u")
        user_input.clear()
        user_input.send_keys(self.username)
        psw = self.driver.find_element_by_id("p")
        psw.clear()
        psw.send_keys(self.password)
        self.driver.find_element_by_id("login_button").click()
        time.sleep(30)
        self.save_cookie()

    def get_code(self):
        setting = self.driver.find_element_by_id('tb_setting_li')
        actions = ActionChains(self.driver)
        time.sleep(3)
        actions.move_to_element(setting).perform()
        time.sleep(3)
        modify = self.driver.find_element_by_link_text('修改资料')
        modify.click()
        time.sleep(3)
        self.driver.switch_to.frame('ttinfo')
        county_select = self.driver.find_element_by_id('addslt_c_0')
        county_list = county_select.find_elements_by_tag_name('option')
        for option in county_list:
            value = option.get_attribute("value")
            text = option.text
            print("Value is: " + value)
            print("Text is:" + text)
        Select(county_select).select_by_value("1")
        time.sleep(3)
        province_select = self.driver.find_element_by_id('addslt_s_0')
        province_list = province_select.find_elements_by_tag_name('option')
        result = []
        for option in province_list:
            province_value = option.get_attribute("value")
            province_text = option.text
            print("province Value is: " + province_value )
            print("province Text is:" + province_text)
            Select(province_select).select_by_value(province_value)
            time.sleep(3)
            city_select = self.driver.find_element_by_id('addslt_cty_0')
            city_list = city_select.find_elements_by_tag_name('option')
            cities = []
            for city_option in city_list:
                city_value = city_option.get_attribute("value")
                city_text = city_option.text
                cities.append({'code':city_value,'name':city_text})
                print("city Value is: " + city_value)
                print("city Text is:" + city_text)
            result.append({"code": province_value, 'name': province_text, 'cities': cities})
        file = open('area.json', 'w', encoding='utf-8')
        print(result)
        json.dump(result, file)
        file.close()

    def reply(self, qq):
        self.driver.get(url='https://user.qzone.qq.com/{}'.format(qq))
        time.sleep(4)
        html = self.driver.page_source
        friendship_promote_layer = self.driver.find_elements_by_id('friendship_promote_layer')
        if html.find('申请访问') != -1:  # 利用用户名判断是否登陆
            # 没登录 ,则手动登录
            self.driver.find_element_by_link_text('申请访问').click()
            time.sleep(2)
            text_area = self.driver.find_element_by_id('msg-area')
            text_area.clear()
            text_area.send_keys(self.content)
            self.driver.find_element_by_class_name('qz_dialog_layer_sub').click()
            print('需要验证无法登陆')
            return
        elif len(friendship_promote_layer) > 0:
            print('遮罩层')
            friendship_promote_layer[0].find_element_by_class_name('btn-fs-sure').click()

        self.driver.switch_to.frame('QM_Feeds_Iframe')
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.XPATH, "//a[@class='c_tx3']")))
        self.driver.find_element_by_xpath("//a[@class='c_tx3']").click()
        time.sleep(3)
        boxes = self.driver.find_elements_by_class_name('comment-box-wrap')
        if len(boxes) > 0:
            input_content = boxes[0].find_element_by_class_name('textinput')
            self.driver.execute_script("arguments[0].innerHTML='{}'".format(self.content), input_content)
            boxes[0].find_element_by_class_name('btn-post').click()


def send_all(no, senders_length, my_sender):
    users = session.query(User).filter(User.send == False).all()
    users_length = len(users)
    start = int(users_length * (no / senders_length))
    end = int(users_length * ((no + 1) / senders_length))
    for user in users[start:end]:
        if user.qq == "0":
            continue
        my_sender.reply(user.qq)
        user.send = True
        session.commit()
        time.sleep(3)
        print('{}空间评价完成'.format(user.qq))


def pool_send():
    senders = [{
        'name': '3468350745',
        'password': "puDqax43LYwX9iC",
    },
    ]
    cnt = "高考志愿模拟填报选【格物水滴APP】,可即时查看你在所报考学校和专业的成绩排名，并且可以和所有报考者沟通交流。"
    length = len(senders)
    p = Pool(length)
    for i, sender_obj in enumerate(senders):
        qqzone = QQZoneSpider(username=sender_obj['name'], password=sender_obj['password'], content=cnt)
        p.apply_async(send_all, args=(i, length, qqzone))
    print('Waiting for all subprocesses done...')
    p.close()
    p.join()
    print('All subprocesses done.')


if __name__ == '__main__':
    # pool_send()
    cnt = "高考志愿模拟填报选【格物水滴APP】,可即时查看你在所报考学校和专业的成绩排名，并且可以和所有报考者沟通交流。"
    # qqzone = QQZoneSpider(username="3468350745",password="puDqax43LYwX9iC",content=cnt)
    qqzone = QQZoneSpider(username="2837484507",password="UZ5tgxDVmuCxW58",content=cnt)
    qqzone.get_code()
    # users = session.query(User).filter(User.send == False).all()
    # for user in users:
    #     try:
    #         qqzone.reply(user.qq)
    #     except Exception as e:
    #         print(e)
    #     user.send = True
    #     session.commit()
    #     time.sleep(2)
    #     print('{}空间评价完成'.format(user.qq))

