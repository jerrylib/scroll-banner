/*
 * @Author: libin 
 * @Date: 2018-02-17 10:24:41 
 * @Last Modified by: libin
 * @Last Modified time: 2018-02-22 15:32:11
 */

function getElement(width, num, i) {
  var widthStr = -width * i + 'px'
  var element = document.createElement('li')
  element.style.width = width + 'px'
  element.style.zIndex = i + 1 < num / 2 ? 0 : num - i
  // 1
  var firstElement = document.createElement('div')
  firstElement.style.backgroundPosition = widthStr
  element.appendChild(firstElement)
  // 2
  var secondElement = document.createElement('div')
  secondElement.style.backgroundPosition = widthStr
  element.appendChild(secondElement)
  // 3
  var thirdElement = document.createElement('div')
  thirdElement.style.backgroundPosition = widthStr
  element.appendChild(thirdElement)
  // 4
  var fouthElement = document.createElement('div')
  fouthElement.style.backgroundPosition = widthStr
  element.appendChild(fouthElement)
  return element
}
// 初始化banner条，
// 1.需要展示的四张图片
// 2.设置的宽高
// 3.需要渲染的dom节点
// 4.需要划分的条数
//
var dom = document.querySelector('.wrap')
var clickCount = 0
var options = {
  // 参与展示的图片
  pics: ['./images/1.jpg', './images/2.jpg', './images/3.jpg', './images/4.jpg'],
  // 每张图片划分的块数 块数能把宽度整除
  count: 50,
  // 默认图片名称
  defaultPicName: './images/empty.jpg',
  // 所要展示的区域的宽度 优先从dom对象中提取
  width: 400,
  // 所要展示的区域的高度 优先从dom对象中提取
  height: 180
}
var defaultOptions = {
  pics: [],
  // 每张图片划分的块数
  count: 50,
  // 默认图片名称
  defaultPicName: 'empty.jpg'
}
class Banner {
  constructor(dom, options) {
    // 1.合并好配置文件
    // dom.clientHeight && (options.height = dom.clientHeight)
    // dom.clientWidth && (options.width = dom.clientWidth)
    var useOption = _.extend(defaultOptions, options)
    while (useOption.pics.length < 4) {
      useOption.pics.push(useOption.defaultPicName)
    }
    this.options = useOption
    var {
      width,
      height
    } = useOption
    // 2.构建好dom结构
    this.clickCount = 0
    this.time = Date.parse(new Date())
    var headElement = document.querySelector('head')
    // 往head下放入style标签，插入自定义样式
    var styleElement = document.createElement('style')
    styleElement.id = 'diy-style-' + this.time
    styleElement.innerText = '.pic-' + this.time + '{width:' + width + 'px;height:' + height + 'px;perspective:1500px;margin:auto;} .pic-' + this.time + ' ul li{position:relative;list-style:none;box-sizing:border-box;float:left;height:' + height + 'px;transform-style:preserve-3d;transform:translateZ(-' + height / 2 + 'px)} .pic-' + this.time + ' ul li div:nth-child(1){position:absolute;height:' + height + 'px;width:100%;background-size:' + width + 'px ' + height + 'px;background-image:url("' + this.options.pics[0] + '")} .pic-' + this.time + ' ul li div:nth-child(2){position:absolute;height:' + height + 'px;width:100%;background-size:' + width + 'px ' + height + 'px;background-image:url("' + this.options.pics[1] + '")} .pic-' + this.time + ' ul li div:nth-child(3){position:absolute;height:' + height + 'px;width:100%;background-size:' + width + 'px ' + height + 'px;background-image:url("' + this.options.pics[2] + '")} .pic-' + this.time + ' ul li div:nth-child(4){position:absolute;height:' + height + 'px;width:100%;background-size:' + width + 'px ' + height + 'px;background-image:url("' + this.options.pics[3] + '")} .pic-' + this.time + ' ul li div:nth-child(1){top:-' + height + 'px;transform-origin:bottom;transform:translateZ(' + height / 2 + 'px)rotateX(90deg)} .pic-' + this.time + ' ul li div:nth-child(2){top:' + height + 'px;transform-origin:top;transform:translateZ(' + height / 2 + 'px)rotateX(-90deg)} .pic-' + this.time + ' ul li div:nth-child(3){transform:translateZ(' + height / 2 + 'px)} .pic-' + this.time + ' ul li div:nth-child(4){transform:translateZ(-' + height / 2 + 'px) rotateX(180deg)}'
    headElement.appendChild(styleElement)
    // 往dom下拼凑pic区域
    var picElement = document.createElement('div')
    picElement.className = 'pic pic-' + this.time
    picElement.style.width = width + 'px'
    picElement.style.height = height + 'px'
    var ulElement = document.createElement('ul')
    ulElement.style.width = width + 'px'
    ulElement.style.height = height + 'px'
    picElement.appendChild(ulElement)
    dom.appendChild(picElement)
  }
  init() {
    var {
      count,
      width
    } = this.options
    var picWidth = width / count
    var ulElement = document.querySelector('.pic-' + this.time + ' ul')
    for (var i = 0; i < count; i++) {
      ulElement.appendChild(getElement(picWidth, count, i))
    }
    document.querySelector('#but').addEventListener('click', () => {
      var ulDom = document.querySelector('.pic-' + this.time + ' ul')
      this.clickCount++
        for (var i = 0; i < ulDom.children.length; i++) {
          ulDom.children[i].style.transition = 0.8 + i / 80 + 's'
          ulDom.children[i].style.transform = 'translateZ(-' + this.options.height / 2 + 'px) rotateX(' + (this.clickCount % 4) * 90 + 'deg)'
        }
    })
  }
}

var banner = new Banner(dom, options)
banner.init()