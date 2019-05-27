# import smtplib
# from email.mime.text import MIMEText
#
# mailto_list = ['285212818@qq.com']  # 收件地址
# mail_host = "118.31.21.228"  # 设置服务器
# mail_user = "shuidi"  # 用户名
# mail_pass = "123456abc"  # 口令
# mail_postfix = "gewu.org.cn"  # 发件箱的后缀
#
#
# def send_mail(to_list, sub, content):
#     me = "格物水滴" + "<" + mail_user + "@" + mail_postfix + ">"
#     msg = MIMEText(content, _subtype='plain', _charset='utf-8')
#     msg['Subject'] = sub
#     msg['From'] = me
#     msg['To'] = ";".join(to_list)
#     try:
#         server = smtplib.SMTP()
#         server.connect(mail_host)
#         server.login(mail_user, mail_pass)
#         server.sendmail(me, to_list, msg.as_string())
#         server.close()
#         return True
#     except Exception as e:
#         print(e)
#         return False

import smtplib
import time
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header
from multiprocessing import Pool
from session import session
from database import User


# 设置smtplib所需的参数
# 下面的发件人，收件人是用于邮件传输的。
def send(my_sender, my_receiver):
    smtpserver = my_sender['smtpserver']
    username = my_sender['name']
    password = my_sender['password']
    sender = my_sender['name']
    # 收件人为多个收件人
    # receiver = ['XXX@126.com', 'XXX@126.com']

    # subject = 'Python email test'
    # 通过Header对象编码的文本，包含utf-8编码信息和Base64编码信息。以下中文名测试ok
    subject = "高考志愿填报"
    subject = Header(subject, 'utf-8').encode()

    # 构造邮件对象MIMEMultipart对象
    # 下面的主题，发件人，收件人，日期是显示在邮件页面上的。
    msg = MIMEMultipart('mixed')
    msg['Subject'] = subject
    msg['From'] = my_sender['msg_from']
    msg['To'] = my_receiver
    # 收件人为多个收件人,通过join将列表转换为以;为间隔的字符串
    # msg['To'] = ";".join(receiver)

    # 构造文字内容
    text = "高考志愿模拟填报选【格物水滴APP】,可即时查看你在所报考学校和专业的成绩排名，并且可以和所有报考者沟通交流。"
    text_plain = MIMEText(text, 'plain', 'utf-8')
    msg.attach(text_plain)

    # 发送邮件
    smtp = smtplib.SMTP()
    smtp.connect(smtpserver, 587)
    # 我们用set_debuglevel(1)就可以打印出和SMTP服务器交互的所有信息。
    # smtp.set_debuglevel(1)
    smtp.login(username, password)
    # print(sender)
    print(my_receiver)
    # print(msg)
    smtp.sendmail(sender, my_receiver, msg.as_string())
    smtp.quit()


if __name__ == '__main__':
    sender = {
            'name': 'shuidi@anyanggewu.com',
            'password': "123456abc",
            'msg_from': "格物水滴 <shuidi@gewu.org.cn>",
            'smtpserver': "mail.anyanggewu.com"
        }
    send(sender, 'litufu@gewu.org.cn')



