import tab from './tab.js';
import $ from './library/jquery.js';
import { cookie } from './library/cookie.js';

(function () {

  // 1.获取search部分的id值
  let id = location.search.split('=')[1]

  // 2.根据id 发起请求
  $.ajax({
    type: "get",
    url: "../../interface/getitem.php",
    data: {
      id: id
    },
    dataType: "json",
    success: function (res) {

      let picture = JSON.parse(res.picture);
      // 设置网页标题
      $('title').text(`${res.title} - 魅族商城`);
      let template = `
      <div class="container-fluid two-warp">
    <div class="row">
      <h3 class="shop-name">${res.title}</h3>
      <ul>
        <li>
        <a href="javascript:;">概述</a>
        </li>
        <li>
          <a href="javascript:;">参数</a>
        </li>
      </ul>
    </div>
  </div>

  <!-- 动态的商品详情 -->
  <div class="container shop-main">
    <div class="row">
      <!-- 左边图片 -->
      <div class="shop-img">
        <!-- 选项卡+放大镜 -->
        <div class="warp-tab">
          <div class="small">
            <img src="..${picture[0].src}" alt="">
            <div class="moveBox hide"></div>
          </div>
          <div class="big hide">
            <img src="..${picture[0].src}" alt="" class="bigPicture">
          </div>
          <ul class="bigGlass">
            <li class="active"><img src="..${picture[0].src}" alt=""></li>
            <li><img src="..${picture[1].src}" alt=""></li>         
            <li><img src="..${picture[2].src}" alt=""></li>
            <li><img src="..${picture[3].src}" alt=""></li>
          </ul>
        </div>
      </div>


      <!-- 右边参数 -->
      <div class="shop-word">
        <div class="shop-title">
          <h3 class="shop-name">${res.title}</h3>
          <p class="shop-depict">${res.discounts}</p>
        </div>
        <!-- 价格区域 -->
        <div class="shop-price">
          <span>￥</span>
          <span class="num-price">${res.price}</span>
          <br>
          <span class="more-price">加购价</span>
          <span>另加29元起，即可换购超值商品</span>
          <a href="javascript:;">立即加购 ></a>
        </div>

        <!-- 地区区域 -->
        <div class="shop-area">
          <ul>
            <span class="s-title">支
              <span class="s-space"></span>
              <span class="s-space"></span>
              持
            </span>
            <li>✔ 花呗分期</li>
            <li>✔ 顺丰发货</li>
            <li>✔ 7天无理由退货（具体查看详情）</li>
          </ul>

          <div class="tow-area">
            <span class="s-title">配送服务</span>
            <span class="s-city">浙江省 杭州市</span>
            <div class="s-sale">
            <span>本商品由 魅族 负责发货并提供售后服务
            </span>
            <a href="javascript:;">商城客服</a>
          </div>
          </div>
        </div>


         <!-- 配置区域 -->
         <div class="shop-config">
           <div class="s-one">
            <div class="s-title">型
              <span class="s-space"></span>
              <span class="s-space"></span>
              号</div>
              <ul>
                <li>${res.title}</li>
              </ul>
           </div>
           <div class="s-one-2">
            <div class="s-title">
              网络类型
            </div>
              <ul>
                <li>全网通公开版</li>
              </ul>
           </div>

           <div class="s-two">
            <div class="s-title">颜色分类</div>
              <ul>
                <li>原谅绿  
                </li>
                <li>
                  酷雅黑
                  <span>(缺货)</span>
                </li>
                <li>活力黄
                  <span>(缺货)</span>
                </li>      
              </ul>
           </div>

           <div class="s-three">
            <div class="s-title">内存容量</div>
              <ul>
                <li>8+128GB</li>
              </ul>
           </div>

           <div class="s-four">
            <div class="s-title">花呗分期</div>
              <ul>
                <li>
                  ￥${((res.price)/3).toFixed(2)}
                  <span>x 3期</span> 
                  <span class="noPay">免手续费</span>
                </li>
                <li>
                  ￥${((res.price)/6).toFixed(2)}
                  <span>x 6期</span>
                  <span class="noPay">免手续费</span>
                </li>
                <li>
                  ￥${((res.price)/12).toFixed(2)}
                  <span>x 12期</span>
                  <span class="noPay">免手续费</span>
                </li>
              </ul>
           </div>
          

           <div class="s-five">
            <div class="s-title">数
              <span class="s-space"></span>
              <span class="s-space"></span>
              量</div>
              <!-- 加减操作 -->
              <div class="add-num">
                <button class="minus" disabled>-</button>
                <input type="text" value="1" id="shop-num-go">
                <button class="add">+</button>
              </div>

              <!-- 购买按钮 -->
              <div class="shop-go">

                <button class="shop-buy">立即购买</button>
                <button class="shop-join">加入购物车</button>
              </div>

              
           </div>

        </div>
      </div>
    </div>
  </div>
      `
      // 添加cookie
      $('.top-warp').after(template)
      $('.shop-join').on('click',function() {

        // 把id，价格，和添加的商品数量加到cookie里
        addItem(res.id, res.price, $('#shop-num-go').val())
        // 判断是否添加成功
        let shop = cookie.get('shop')
        shop = JSON.parse(shop)
        if (shop.some(elm => elm.id == res.id)) {
          
          let verify = confirm('加入购物车成功！是否前往购物车结算？')
          if(verify) {
            // 跳转到购物车界面
            location.href = '../html/cart.html'
          }
        }
      })

      let num = 1
      // 添加按钮事件
      $('.add').on('click', function () {

        num += 1
        $('#shop-num-go').val(num)
          // 当大于5
        if ($('#shop-num-go').val() > 5) {
          alert('限购5件！')
          num -= 1
          $('#shop-num-go').val(5)
          $('.add').attr('disabled', 'disabled')
          return
        }
        // 当大于1时
        if ($('#shop-num-go').val() > 1) {
          $('.minus').removeAttr('disabled')
        }
      

      })

      // 减少事件
      $('.minus').on('click', function () {
        num -= 1
        $('#shop-num-go').val(num)

        // 当小于5 时
        if ($('#shop-num-go').val() < 5) {
          $('.add').removeAttr('disabled')
        }
        // 当等于 1时
        if ($('#shop-num-go').val() == 1) {
          $('.minus').attr('disabled', 'disabled')
        }
      })
      // 执行放大镜函数
      tab();
    }
  });

// 封装添加 cookie的函数
  function addItem(id, price, num) {
    let shop = cookie.get('shop'); // 从cookie中获取shop数据

    // 需要添加到 cookie的对象
    let product = {
      id: id,
      price: price,
      num: num
    }

    if (shop) { // 判断是否存在购物车数据
      shop = JSON.parse(shop) // 将cookie中存储的字符串转成json对象

      // some() 遍历数组查找到一个满足 条件的元素，就返回true，就不再执行了,反之false
      // 判断是否存在当前商品，通过id判断
      if (shop.some(elm => elm.id == id)) {
        // 修改数量
        shop.forEach(elm=> {
          console.log(elm.num,num );
          // null 表示不操作，累加数量
          elm.id === id ? elm.num = elm.num*1 + num*1 : null
        })
      }else {
        // 添加商品
        shop.push(product)
      }
    } else {
      shop = []
      shop.push(product);
    }

    // 添加cookie
    cookie.set('shop', JSON.stringify(shop), 1) // 存放一天
  }

})()