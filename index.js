/*
 * @Author: libin 
 * @Date: 2018-02-17 10:24:41 
 * @Last Modified by: libin
 * @Last Modified time: 2018-02-22 15:32:11
 */

function getElement (width, num, i) {
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
//
var defaultOptions = {
  pics: [],
  // 每张图片划分的块数
  count: 50,
  // 默认图片名称
  defaultPicName: 'empty.jpg'
}

function bannerIniter (dom, options) {
  // 配置项数据
  var useOption = _.extend(defaultOptions, options)
  while (useOption.pics.length < 4) {
    useOption.pics.push(useOption.defaultPicName)
  }
  dom.clientHeight && (options.height = dom.clientHeight)
  dom.clientWidth && (options.width = dom.clientWidth)
  //
  var { count, width } = options

  var picWidth = width / count
  // var element = getElement(picWidth)
  for (var i = 0; i < count; i++) {
    dom.appendChild(getElement(picWidth, count, i, picWidth))
  }
}
// 初始化banner条，
// 1.需要展示的四张图片
// 2.设置的宽高
// 3.需要渲染的dom节点
// 4.需要划分的条数
//
var dom = document.querySelector('.wrap ul')
var clickCount = 0
var options = {
  // 参与展示的图片
  pics: [],
  // 每张图片划分的块数 块数能把宽度整除
  count: 50,
  // 默认图片名称
  defaultPicName: 'empty.jpg',
  // 所要展示的区域的宽度 优先从dom对象中提取
  width: 800,
  // 所要展示的区域的高度 优先从dom对象中提取
  height: 360
}
bannerIniter(dom, options)

document.querySelector('.tab button').addEventListener('click', function () {
  var ulDom = document.querySelector('.pic ul')
  clickCount++
  for (var i = 0; i < ulDom.children.length; i++) {
    ulDom.children[i].style.transition = 0.8 + i / 80 + 's'
    ulDom.children[i].style.transform = 'translateZ(-180px) rotateX(' + (clickCount % 4) * 90 + 'deg)'
  }
})
