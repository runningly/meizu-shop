const tab = function() {
  
  // let ul = document.querySelector('ul')
  var li = document.querySelectorAll('.bigGlass>li')
  let smallImg = document.querySelector('.small>img')
  let bigImg = document.querySelector('.big>img')
  
  let small = document.querySelector('.small')
  let big = document.querySelector('.big')
  let moveBox = document.querySelector('.moveBox')
  let bigPicture = document.querySelector('.bigPicture')
  // let warpTab = document.querySelector('.warpTab')
  // 将类数组转为数组
  var newLi = Array.from(li)
  
  newLi.forEach((val) => {
    val.addEventListener('click', function () {
      // 遍历所有的元素，去除它们的边框颜色
      newLi.forEach((val) => {
        val.classList.remove('active')
      })
  
      // this 为当前触发事件的元素
      this.classList.add('active')
      // 将当前触发事件的元素的路径，赋给smallImg
      smallImg.src = this.firstElementChild.src
      bigImg.src = this.firstElementChild.src
    })
  })
  
  // 1.给small 添加鼠标移入事件
  small.addEventListener('mouseover', function () {
    // 2.添加show class
    moveBox.classList.add('show')
    big.classList.add('show')
    // ul.style.marginTop = '-200px'
  
    // 给moveBox设置动态大小
    // 思路：小盒子的宽/高 * 大盒子的宽/高 除以 图片的宽/高
    moveBox.style.width = (small.offsetWidth * big.offsetWidth / bigPicture.offsetWidth) + 'px'
    moveBox.style.height = (small.offsetHeight * big.offsetHeight / bigPicture.offsetHeight) + 'px'

  
    // 3.让moveBox跟随鼠标移动
    moveBox.addEventListener('mousemove', function (ev) {
  
      // 计算moveBox的位置
      // 思路：当前鼠标相对于页面(X/Y)的位置 - small元素的相对于浏览器的top/left - move自身高度/宽度的一半
      let moveX = ev.pageX - small.offsetLeft - moveBox.offsetWidth  /2
      let moveY = ev.pageY - small.offsetTop - moveBox.offsetHeight  /2
   
      // 计算移动比例(必需大于1)
      // 思路：大图片的宽 除以 小盒子的宽
      let ratio = bigPicture.offsetWidth / small.offsetWidth
  
      // 设置边界
      if (moveX < 0) {
        moveX = 2
      } else if (moveX > small.offsetWidth - moveBox.offsetWidth) {
        moveX = small.offsetWidth - moveBox.offsetWidth - 1
      }
      if (moveY < 0) {
        moveY = 2
      } else if (moveY > small.offsetHeight - moveBox.offsetHeight) {
        moveY = small.offsetHeight - moveBox.offsetHeight - 1
      }
  
      // 设置移动的位置
      moveBox.style.top = moveY + 'px'
      moveBox.style.left = moveX + 'px'
  
      bigPicture.style.top = moveY * -ratio + 'px'
      bigPicture.style.left = moveX * -ratio + 'px'
    })
  })
  // 设置移出事件
  moveBox.addEventListener('mouseout', function () {
    // 移除样式
    moveBox.classList.remove('show')
    big.classList.remove('show')
    // ul.style.marginTop = '0px'
  })
}
export default tab

