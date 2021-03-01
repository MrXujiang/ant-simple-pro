import React,{ lazy } from 'react'
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { requestCode } from './varbile'

export const toast = (status = requestCode.successCode, content = '操作成功') => {
  if (status === requestCode.successCode) {
    message.success(content);
  } else if (status === requestCode.failedCode) {
    message.error(content);
  }
}

export const confirm = (func, content = '确定要删除吗？', onCancel) => {
  Modal.confirm({
    title: '提示',
    content,
    okText: '确认',
    centered: true,
    icon: <ExclamationCircleOutlined />,
    cancelText: '取消',
    onOk: async () => {
      func && func();
    },
    onCancel() {
      onCancel && onCancel();
    },
  });
}

export const easeInOutCubic = (t, b, c, d) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return (cc / 2) * t * t * t + b;
  }
  return (cc / 2) * ((t -= 2) * t * t + 2) + b;
}

/**
 *
 * @param target    |  @description 滚动事件的元素
 * @param duration  |  @description 回到顶部所需时间（ms）
 */
export const backTopAnimate = (target = document.documentElement || document.body, duration = 450) => {
  const scrollTop = target.scrollTop;

  const startTime = Date.now();

  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    const nextScrollTop = Math.ceil(easeInOutCubic(time > duration ? duration : time, scrollTop, 0, duration));
    target.scrollTop = nextScrollTop;
    // console.log('nextScrollTop', nextScrollTop)
    time < duration && window.requestAnimationFrame(frameFunc);
  }

  window.requestAnimationFrame(frameFunc);
}

export const lazyComponent= (path)=> {
  return lazy(() => import(/* webpackChunkName: '[request]' */`@/pages/${path}`))
}
