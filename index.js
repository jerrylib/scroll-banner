var width = 800;

function play(num) {
  var picWidth = 800 / num;
  // var element = getElement(picWidth)
  var dom = document.querySelector('.pic ul')
  var styleDom = document.querySelector('#style-text')
  for (var i = 0; i < num; i++) {
    dom.appendChild(getElement(picWidth))
    styleDom.innerHTML += '.wrap .pic ul li div:nth-child('+ (i+1) +'){background-position:'+ -picWidth*i +'px;}'
  }
}

function getElement(width) {
  var element = document.createElement('li')
  element.style.width = width + 'px'
  element.appendChild(document.createElement('div'))
  element.appendChild(document.createElement('div'))
  element.appendChild(document.createElement('div'))
  element.appendChild(document.createElement('div'))
  return element
}

play(3);