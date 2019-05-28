# -*- coding: utf-8 -*-

import pyautogui
import pyperclip
import time
from session import session
from database import User

points = {}


def paste(utext):
    pyperclip.copy(utext)
    pyautogui.hotkey('ctrl', 'a')
    pyautogui.hotkey('ctrl', 'v')


def get_point(point):
    images = {'input': 'input.png', 'find': 'find.png', 'add': 'add.png', 'message': 'message.png', 'next': 'next.png',
              'finish': 'finish.png', 'clear': 'clear.png'}
    if point in points:
        p = points[point]
        return p
    else:
        p = pyautogui.center(pyautogui.locateOnScreen(images[point]))
        points[point] = p
        return p


def add_friend(qq):
    _input = get_point('input')
    # 点击输入框
    pyautogui.click(*_input)
    # 输入qq号
    paste(qq)
    # 点击搜索
    find = get_point('find')
    pyautogui.click(*find)
    time.sleep(5)
    # 点击添加
    add = get_point('add')
    pyautogui.click(*add)
    time.sleep(5)
    # 输入发送的添加信息
    message = get_point('message')
    pyautogui.click(*message)
    pyautogui.press('backspace')
    pyautogui.press('backspace')
    paste('志愿模拟填报选格物水滴APP,查报考排名，与报考者交流')
    # 点击下一步志愿模拟填报选【格物水滴APP】,查报考排名，与报考者沟通交流
    _next = get_point('next')
    pyautogui.click(*_next)
    time.sleep(3)
    # 继续点击下一步
    pyautogui.click(*_next)
    # 点击完成
    time.sleep(3)
    finish = get_point('finish')
    pyautogui.click(*finish)
    time.sleep(1)
    clear = get_point('clear')
    pyautogui.click(*clear)
    time.sleep(1)



if __name__ == '__main__':
    time.sleep(1)
    users = session.query(User).filter(User.add == False).all()
    for user in users[-300:]:
        add_friend(user.qq)
        user.add = False
        session.commit()
        print('{}添加完成'.format(user.qq))

