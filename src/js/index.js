import $ from './library/jquery.js';
import './library/slide.js';
import './library/jquery.lazyload.js'
import { cookie } from './library/cookie.js';
(function () {
  // 调用轮播图插件
  $('.slider').slider({
    speed: 1000,
    delay: 5000
  })

  $("img.lazy").lazyload({
    placeholder: "../images/lazyimg/doglazy.gif", //用图片提前占位
    // placeholder,值为某一图片路径.此图片用来占据将要加载的图片的位置,待图片加载时,占位图则会隐藏
    effect: "fadeIn", // 载入使用何种效果
    // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
    // threshold: 200, // 提前开始加载
    // threshold,值为数字,代表页面高度.如设置为200,表示滚动条在离目标位置还有200的高度时就开始加载图片,可以做到不让用户察觉
    //  event: 'click', // 事件触发时才加载
    // event,值有click(点击),mouseover(鼠标划过),sporty(运动的),foobar(…).可以实现鼠标莫过或点击图片才开始加载,后两个值未测试…
    // container: $("#container"), // 对某容器中的图片实现效果
    // container,值为某容器.lazyload默认在拉动浏览器滚动条时生效,这个参数可以让你在拉动某DIV的滚动条时依次加载其中的图片
    // failurelimit: 10 // 图片排序混乱时
    // failurelimit,值为数字.lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况,failurelimit意在加载N张可见区域外的图片,以避免出现这个问题.
  })

  // 发起ajax请求页面数据
  $.ajax({
    type: "get",
    url: "../../interface/getproduct.php",
    dataType: "json",
    success: function (response) {
      console.log(response);

      let template = '' // 大图的模板
      let template2 = '' // 小图的模板
      // 切割请求下拉的Json数组对象

      let bigArr = response.slice(0, 2) // 大图的数组

      let smallArr = response.slice(2) // 小图的数组


      // 遍历大图的数组
      bigArr.forEach(elm => {
        // 将图片的value 转成 json对象
        let picture = JSON.parse(elm.picture)
        // console.log(picture[4].src);
        // 使用a标签发送id
        template += `<div class="col-md-6 col-sm-12 tow-phone">
      <a href="../html/shopDet.html?id=${elm.id}">
        <img class="lazy" data-original="..${picture[4].src}" alt="">
        <span class="red-box">赠品</span>
        <div class="tow-word">
          <h3>${elm.title}</h3>
          <p>${elm.ad}</p>
          <span class="rmb">￥</span>
          <span class="newPhone-name">
             ${elm.price}
          </span>
        </div>
      </a>
    </div>`
      });

      // 遍历小图的数组
      smallArr.forEach(elm => {
        let picture = JSON.parse(elm.picture)

        template2 += ` <div class="col-md-3 col-sm-6 four-phone">
        <a href="../html/shopDet.html?id=${elm.id}">
        <img class="lazy" data-original="..${picture[4].src}" alt="">
          <div class="four-word">
            <h4>${elm.title}</h4>
            <p>${elm.ad}</p>
            <span>￥${elm.price}</span>
          </div>
        </a>
      </div>`

      })
      // 添加到父元素里的最前面
      $('.six-phone').prepend(template)
      // 添加到父元素里的最后面
      $('.six-phone').append(template2)

      // 图片懒加载
      $("img.lazy").lazyload({
        placeholder: "../images/lazyimg/doglazy.gif", //用图片提前占位
        effect: "fadeIn",
      })
    }
  });


  // 如果cookie 中有用户存在
  if ((cookie.get('isLogined') && cookie.get('username'))) {
    $('.dropdown1').css({
      'display': 'none'
    })
    $('.userLogo').css({
      'display': 'block'
    })
  }


  // ***下拉菜单****
  $('.top-nav').on('mouseover', function (ev) {

    // 下拉的移出事件
    $('.pullDown').on('mouseleave', function () {
      $('.pullDown').animate({
        height: 0
      },0)

      $('.top-warp').css({
        'background-color': 'transparent'
      })
      $('.top-nav>ul>li>a').attr('class', 'a-color2')


    })

    switch ($(ev.target).text()) {
      case '手机':
        $('.ul-pull-list>li').each((i, elm) => {
          // 设置图片的路径
          $(elm).children().attr('src', `../images/index/pulldown/one/${i + 1}.jpg`)
        })
        // 执行动画
        pullGo()
        break;
      case '声学':
        $('.ul-pull-list>li').each((i, elm) => {
          // 设置图片的路径
          $(elm).children().attr('src', `../images/index/pulldown/two/${i + 1}.jpg`)
        })
        // 执行动画
        pullGo()
        break;
        case '配件':
        $('.ul-pull-list>li').each((i, elm) => {
          // 设置图片的路径
          $(elm).children().attr('src', `../images/index/pulldown/three/${i + 1}.jpg`)
        })
        // 执行动画
        pullGo()
        break;
        case '生活':
          $('.ul-pull-list>li').each((i, elm) => {
            // 设置图片的路径
            $(elm).children().attr('src', `../images/index/pulldown/four/${i + 1}.jpg`)
          })
          // 执行动画
          pullGo()
          break;
      default:
        break;
    }
  
  })

  // 退出账号
  $('#quit').on('click', function() {
    cookie.remove('isLogined');
    cookie.remove('username')
    if(!(cookie.get('isLogined') && cookie.get('username'))) {
      alert('账号已经退出')
      history.go(0)
    }
  })



  function pullGo() {
    // 设置背景颜色
    $('.top-warp').css({
      'background-color': '#fff'
    })

    // 设置a标签的颜色
    $('.top-nav>ul>li>a').attr('class', 'a-color1')

    if ($('.pullDown').height() == 0) {
      // 设置高度增加的动画
      $('.pullDown').animate({
        height: 191
      }, 200)

    }
  }



})()