import pandas as pd
from session import session
from database import User,Base


def add():
    df = pd.read_csv('qq.csv')
    for qq in df['qq']:
        newqq = str(qq)
        users = session.query(User).filter(User.qq == newqq).all()
        if len(users) == 0:
            user = User(name="", qq=newqq, send=False)
            session.add(user)
    session.commit()


def delete():
    users = session.query(User).all()
    for user in users:
        session.delete(user)
    session.commit()


def update():
    users = session.query(User).all()
    for user in users:
        if user.qq == "10603281":
            break
        user.send = True
        session.commit()


if __name__ == '__main__':
    # add()

    update()




