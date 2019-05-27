from sqlalchemy import Column, DateTime, String, Integer, ForeignKey, func,Boolean
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

Base = declarative_base()
engine = create_engine('sqlite:///qq.sqlite?check_same_thread=False')


class User(Base):
    __tablename__ = 'qq'
    id = Column(Integer, primary_key=True)
    qq = Column(String)
    name = Column(String)
    send = Column(Boolean)
    add = Column(Boolean)


class QQUser(Base):
    __tablename__ = 'qquser'
    id = Column(Integer, primary_key=True)
    nick = Column(String)
    uin = Column(String)
    age = Column(Integer)
    gender = Column(Integer)
    province = Column(String)
    city = Column(String)
    country = Column(String)


Base.metadata.create_all(engine)