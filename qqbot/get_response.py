from bs4 import BeautifulSoup
import json
import os
from database import QQUser
from session import session


def convert_to_data(fp):
    soup = BeautifulSoup(open(fp, 'r', encoding='UTF-8'), 'html.parser')
    code = soup.find('code', class_="prettyPrint")
    response = json.loads(code.get_text())
    if response['retcode'] == 0:
        info_list = response['result']['buddy']['info_list']
        print(info_list)
        for info in info_list:
            users = session.query(QQUser).filter(QQUser.uin == str(info['uin'])).all()
            if len(users) == 0:
                user = QQUser(nick=info['nick'], uin=info['uin'],
                              age=info['age'],gender=info['gender'],
                              province=info['province'], city=info['city'], country=info['country']
                              )
                session.add(user)
        session.commit()


if __name__ == '__main__':
    # 当前路径
    pwd = os.getcwd()
    # 父路径
    father_path = os.path.abspath(os.path.dirname(pwd) + os.path.sep + ".")
    # 数据文件路径
    newman = os.path.join(father_path, 'newman', 'newman')
    for fpathe, dirs, fs in os.walk(newman):
        for f in fs:
            file_path = os.path.join(fpathe, f)
            convert_to_data(file_path)
            os.remove(file_path)

