(function ($) {
  // 在jquery的原型上添加一个插件
  $.fn.extend({
    slider: function (options) {
      // 函数式编程 
      // 将所有功能封装成独立的函数

      let main = null, // 主函数
        init = null, // 初始化
        start = null, // 开始动画
        stop = null,  // 停止动画
        prev = null,  // 上一张
        next = null, // 下一张
        timer = null, // 计时器
        circle = null // 可点击的圆
      elms = {}, // 命名空间(专门用来存储变量名的对象)
        defaults = {
          speed: 500, // 动画速度
          delay: 1000 // 间隔事件
        } // 默认参数
      $.extend(defaults, options); // 合并传入的参数


      // 初始化的函数
      init = function () {
        elms.sliderDiv = this.children('div') // 获取要滑动的元素
        elms.btnS = this.children('span') // 获取左右两个按钮
        elms.liBtn = this.children('ul').children('li')


        elms.elemImg = elms.sliderDiv.children('img').first() // 获取第一个 img jq对象
        elms.sliderDiv.append(elms.elemImg.clone()) // 将第一个img复制到最后

        elms.elemImgWidth = elms.elemImg.width() // 获取元素的宽值

        elms.index = 1 // 记录当前的索引值

        // 鼠标的hover事件
        this.hover(function () {
          stop()
        }, function () {
          timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed)
        })

        elms.btnS.on('click', function () {
          if (elms.btnS.index(this)) {
            next();
          } else {
            prev();
          }
        })
        // 给每个li添加点击事件
        elms.liBtn.on('click', function () {
          let index = elms.liBtn.index(this) // 获取当前点击的index值
          circle(index)
        })
      }.bind(this) // 修改this的指向为最外层的this


      // 开始执行的函数
      start = function (direction) {
        let left = `-=${elms.elemImgWidth}` // 设置偏移的数值
        let imgLength = elms.sliderDiv.children('img').length // 获取图片的长度


        if (!direction) { // 如果是上一张按钮触发的
          left = `+=${elms.elemImgWidth}`
          // 当图片为第一张时，跳到最后一张
          if (elms.index === 1) {
            elms.index = imgLength
            // 求前面5个img的宽度，就是最后一个img的left的值
            let excursion = (imgLength - 1) * elms.elemImgWidth
            // 最后一张的left的值
            // console.log(excursion);
            // 老师的思路： 最后一个img距离视口的left值 - div距离距离视口的left值
            // 注：offset() 方法返回或设置匹配元素相对于文档的偏移（位置）

            // let divOffSet = elms.sliderDiv.offset().left,
            //     imgOffset = elms.sliderDiv.children('img').last().offset().left
            // console.log(divOffSet-imgOffset);
            elms.sliderDiv.css('left', `-${excursion}px`)
          }
        }
        elms.sliderDiv.animate({
          left: left
        }, defaults.speed, function () {
          if (direction) { // 如果是从左到右
            elms.index++
          } else {
            elms.index--
          }


          if (elms.index === imgLength) {
            elms.index = 1

            elms.sliderDiv.css('left', 0) // 当移动到最后一个图片，left设置为0
          }
          // 更新小圆
          elms.liBtn.removeClass('active').eq((elms.index) - 1).addClass('active')
        })

      }.bind(this)

      // 上一张的按钮函数
      prev = function () {
        stop()
        start(0)
      }
      // 下一张的按钮
      next = function () {
        stop()
        start(1)
      }

      stop = function () {
        clearInterval(timer)
        elms.sliderDiv.stop(true, true) // 清空队列，立即完成动画
      }

      // li小圆的函数
      circle = function (index) {
        stop();
        elms.index = index+1  // 给elms.index赋予新的值
        let num = -index * elms.elemImgWidth // 获取偏移量
        elms.sliderDiv.animate({ // 设置left的动画
          left: num
        }, defaults.speed)
        // elms.liBtn.removeClass('active').eq(index).addClass('active') // 移除所有样式，给当前li添加样式
        elms.liBtn.eq(index).addClass('active').siblings().removeClass('active')
      }


      // 主体函数(执行初始化和开始函数)
      main = function () {
        init()
        timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed)
      }
      main()
    }
  })
})(jQuery);