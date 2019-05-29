import time
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import json
from multiprocessing import Pool
from database import User, Base
from session import session,DBSession
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///qq.sqlite?check_same_thread=False')
Base.metadata.bind = engine

class QQZoneSpider(object):
    def __init__(self, username, password,length,no):
        self.username = username
        self.password = password
        self.content = "高考志愿模拟填报选【格物水滴APP】,可即时查看你在所报考学校和专业的成绩排名，并且可以和所有报考者沟通交流。"
        self.length = length
        self.no = no
        DBSession = sessionmaker(bind=engine)
        session = DBSession()
        self.session = session
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
            time.sleep(3)
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
        time.sleep(10)
        self.save_cookie()

    def reply(self, qq,user):
        self.driver.get(url='https://user.qzone.qq.com/{}'.format(qq))
        time.sleep(4)
        html = self.driver.page_source
        try:
            friendship_promote_layer = self.driver.find_elements_by_id('friendship_promote_layer')
            if len(friendship_promote_layer) > 0:
                print('遮罩层')
                friendship_promote_layer[0].find_element_by_class_name('btn-fs-sure').click()
            if html.find('申请访问') != -1:  # 利用用户名判断是否登陆
                # 没登录 ,则手动登录
                self.driver.find_element_by_link_text('申请访问').click()
                time.sleep(2)
                text_area = self.driver.find_element_by_id('msg-area')
                text_area.clear()
                text_area.send_keys(self.content)
                self.driver.find_element_by_class_name('qz_dialog_layer_sub').click()
                print('需要验证无法登陆')
            else:
                self.driver.switch_to.frame('QM_Feeds_Iframe')
                WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.XPATH, "//a[@class='c_tx3']")))
                self.driver.find_element_by_xpath("//a[@class='c_tx3']").click()
                time.sleep(2)
                boxes = self.driver.find_elements_by_class_name('comment-box-wrap')
                if len(boxes) > 0:
                    input_content = boxes[0].find_element_by_class_name('textinput')
                    self.driver.execute_script("arguments[0].innerHTML='{}'".format(self.content), input_content)
                    boxes[0].find_element_by_class_name('btn-post').click()

        except Exception as e:
            print(e)
        finally:
            user.send = True
            self.session.commit()
            print('{}空间评价完成'.format(user.qq))

    def replay_all(self):
        users = session.query(User).filter(User.send == False).all()
        users_length = len(users)
        start = int(users_length * (self.no/ self.length))
        end = int(users_length * ((self.no + 1) / self.length))
        for user in users[start:end]:
            if user.qq == "0":
                continue
            self.reply(user.qq,user)


def send(qquser,length,i):
    print(qquser['name'])
    try:
        weibo = QQZoneSpider(password=qquser['password'], username=qquser['name'], length=length, no=i)
        weibo.replay_all()
    except Exception as e:
        print(e)
        time.sleep(100)
        send()

if __name__ == '__main__':
    while True:
        qqusers = [{
            'name': '3468350745',
            'password': "puDqax43LYwX9iC",
        },
            {
                'name': '2837484507',
                'password': "UZ5tgxDVmuCxW58",
            },
            {
                'name': '3325987839',
                'password': "mimabeidao110",
            },
            {
                'name': '1697351407',
                'password': "mimabeidao110",
            },
            {
                'name': '3114599890',
                'password': "mimabeidao110",
            },
            {
                'name': '1907481433',
                'password': "mimabeidao110",
            },
        ]
        length = len(qqusers)
        p = Pool(length)

        for i, qquser in enumerate(qqusers):
            p.apply_async(send, args=(qquser, length, i))
        print('Waiting for all subprocesses done...')
        p.close()
        p.join()
        print('All subprocesses done.')
        time.sleep(300)