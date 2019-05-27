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
    smtp.connect(smtpserver, 25)
    # 我们用set_debuglevel(1)就可以打印出和SMTP服务器交互的所有信息。
    # smtp.set_debuglevel(1)
    smtp.login(username, password)
    # print(sender)
    print(my_receiver)
    # print(msg)
    smtp.sendmail(sender, my_receiver, msg.as_string())
    smtp.quit()


def send_all(no, senders_length, my_sender):
    users = session.query(User).filter(User.send == False).all()
    users_length = len(users)
    start = int(users_length * (no / senders_length))
    end = int(users_length * ((no + 1) / senders_length))
    for user in users[start:end]:
        if user.qq == "0":
            continue
        receiver = '{}@qq.com'.format(user.qq)
        send(my_sender, receiver)
        user.send = True
        session.commit()
        time.sleep(3)


def pool_send():
    senders = [{
        'name': 'shuidi@gewu.org.cn',
        'password': "2X5wv2v8nmauv8G",
        'msg_from': "格物水滴 <shuidi@gewu.org.cn>",
        'smtpserver': "smtp.mxhichina.com"
    }, {
        'name': '3468350745@qq.com',
        'password': "pwkqmtpzhkrjcjej",
        'msg_from': "格物水滴 <3468350745@qq.com>",
        'smtpserver': "smtp.qq.com"
    },
    ]
    length = len(senders)
    p = Pool(length)
    for i, sender_obj in enumerate(senders):
        p.apply_async(send_all, args=(i, length, sender_obj))
    # print('Waiting for all subprocesses done...')
    p.close()
    p.join()
    # print('All subprocesses done.')


def get_sender():
    senders = [
        {
            'name': 'ae56@gewu.org.cn',
            'password': "LtERFTWQUYzEnu6",
            'msg_from': "格物水滴 <shuidi@gewu.org.cn>",
            'smtpserver': "smtp.mxhichina.com"
        },
        {
            'name': 'shuidi@gewu.org.cn',
            'password': "2X5wv2v8nmauv8G",
            'msg_from': "格物水滴 <shuidi@gewu.org.cn>",
            'smtpserver': "smtp.mxhichina.com"
        },
        {
            'name': 'adifus@gewu.org.cn',
            'password': "kMn4Dd2nCDMmrmQ",
            'msg_from': "格物水滴 <shuidi@gewu.org.cn>",
            'smtpserver': "smtp.mxhichina.com"
        },
        # {
        #     'name': '3468350745@qq.com',
        #     'password': "jenkltryrhmjdagg",
        #     'msg_from': "格物水滴 <3468350745@qq.com>",
        #     'smtpserver': "smtp.qq.com"
        # },
    ]
    while True:
        for sender in senders:
            yield sender


generator_sender = get_sender()


def send_forever():
    # 生成发送者
    sender = next(generator_sender)
    print(sender)
    users = session.query(User).filter(User.send == False).all()
    for user in users:
        if user.qq == "0":
            continue
        receiver = '{}@qq.com'.format(user.qq)
        try:
            send(sender, receiver)
            user.send = True
            session.commit()
            time.sleep(10)
        except (smtplib.SMTPDataError, smtplib.SMTPRecipientsRefused) as e:
            print('邮件发送失败:{}'.format(e))
            send_forever()



if __name__ == '__main__':
    send_forever()

