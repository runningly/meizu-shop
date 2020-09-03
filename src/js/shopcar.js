import $ from './library/jquery.js';
import { cookie } from './library/cookie.js';

(function () {

  let shop = cookie.get('shop');
  if (shop) {
    shop = JSON.parse(shop); // 当存在cookie数据，转成json对象
    console.log(shop);
    let idList = shop.map(elm => elm.id).join() // 将所有id筛选出来，组成一个新数组，并转换成字符串

    // 发起请求
    $.ajax({
      type: "get",
      url: "../../interface/getitems.php",
      data: {
        idList: idList
      },
      dataType: "json",
      success: function (res) {
        // 将picture的value转成对象
        let template = ''
        res.forEach(elm => {
          let picture = JSON.parse(elm.picture)
          // 让ajax获得的数据结果的id 与 cookie中id 一一对应
          // 从cookie中去筛选数据
          let arr = shop.filter(val => val.id === elm.id)
          let newPrice = parseInt(arr[0].price).toFixed(2) // 保留两位小数
          let newAllPrice = parseInt(arr[0].price * arr[0].num).toFixed(2) // 保留两位小数
          template += ` <table>
          <tr class="buy-more">
            <td>
              <span>加购价</span>
              <span>另加29元起，即可换购超值商品</span>
              <a href="javascript:;">立即加购 ></a>
            </td>
  
          <tr class="shop-size">
            <td class="phone-size">
              <input type="checkbox" checked class="goods-check">
              <a href="javascript:;" class="phone-img">
                <img src="..${picture[0].src}" alt="">
              </a>
              <div class="phone-word">
                <p class="phone-name">${elm.title}</p>
                <p>全网通公开版 原谅绿 8+128GB</p>
              </div>
            </td>
            <td class="phone-price">
              <span>￥</span>
              <span class="money">${newPrice}</span>
            </td>
            <!-- 加减框区域 -->
            <td class="phone-num">
              <div class="add-num">
                <button class="minus" disabled>-</button>
                <input type="text" value="${arr[0].num}" class="shop-num-go" name="${elm.id}">
                <button class="add">+</button>
              </div>
            </td>
            <td class="phone-add">
              <span>￥</span>
              <span class="money">${newAllPrice}</span>
            </td>
            <td class="phone-close">
              <span class="del">✖</span>
            </td>
          </tr>
          </tr>
        </table>`

        });

        $('.row-table').html(template)
        let resNew = 0
        // 处理如果商品数量大于5,限购为5
        let arrNum = Array.from($('.shop-num-go'))
        arrNum.forEach(val => {
          if ($(val).val() > 5) {
            $(val).val(5)
          }
        })
        // 处理减少按钮
        let addArr = Array.from($('.minus'))
        addArr.forEach(val => {
          let numNew = $(val).parent().children('.shop-num-go')
          if (numNew.val() != 1) {
            $(val).removeAttr('disabled')
          }
        })


        // 给添加减少按钮添加事件委托
        $('.phone-num').on('mouseover', function (ev) {
          // 如果移入的类名为 add 按钮
          if ($(ev.target).attr('class') == 'add') {
            $(ev.target).on('click', function () {
              comNum(ev, '+')
            })
          }

          // 如果是点击的是减少按钮
          if ($(ev.target).attr('class') == 'minus') {
            $(ev.target).on('click', function () {
              comNum(ev, '-')
            })
          }
        })

        // 鼠标移出，清除事件
        $('.phone-num').on('mouseout', function () {
          $('.add').off('click')
          $('.minus').off('click')
        })

        // 计算总金额
        let checkArr = Array.from($('.goods-check'))
    
        checkArr.forEach(elm => {
          // 默认全选为选中
          if ($(elm).is(':checked')) {
            $('.checkAll').prop('checked', true)
          }

          let price = $(elm).parent().parent().children('.phone-add').children('.money').text()

          resNew += parseInt(price)

          $(elm).on('change', function () {
            // 反选: every() 当所有的checkbox的隐藏属性checked都为true时，全选按钮状态改为选中
            if (checkArr.every(val => $(val).prop('checked') == true)) {
              $('.checkAll').prop('checked', true)
            }
            // 结算的样式改变
            if(checkArr.some(val => $(val).prop('checked') == true)) {
              $('#result').removeAttr('class').attr('class', 'red-show') //设置结算的样式
            }else {
              $('#result').removeAttr('class').attr('class', 'gray-show')//设置结算的样式
            }

            // 如果 checked 为true时
            if ($(elm).prop('checked')) {
              let resNew1 = parseInt($('.goodsResult').text())
              resNew1 += parseInt($(this).parent().parent().children('.phone-add').children('.money').text())
              $('.goodsResult').text(resNew1.toFixed(2))

            } else {
              $('.checkAll').prop('checked', false)

              let resNew1 = parseInt($('.goodsResult').text())
              resNew1 -= $(this).parent().parent().children('.phone-add').children('.money').text()
              $('.goodsResult').text(resNew1.toFixed(2))

            }
          })

        })
        // 全选按钮事件
        $('.checkAll').on('click', function () {
          let checkArr = Array.from($('.goods-check')) // 获取全部checkbox
          let moneyArr = Array.from($('.phone-add>.money')) // 获取小计的金额
          let result = 0
          if ($('.checkAll').is(':checked')) { // 当选中时
            checkArr.forEach(elm => {
              $(elm).prop("checked", true);
            })

            moneyArr.forEach(elm => {

              result += parseInt($(elm).text())
            })
            $('.goodsResult').text(result.toFixed(2))
            $('#result').removeAttr('class').attr('class', 'red-show') //设置结算的样式
          } else {
            checkArr.forEach(elm => {
              $(elm).prop("checked", false);
              $('.goodsResult').text('0.00')
            })

            $('#result').removeAttr('class').attr('class', 'gray-show')//设置结算的样式
          }
        })
        // 初始化合计金额
        $('.goodsResult').text(resNew.toFixed(2))



        // ***删除事件的事件委托***
        $('.phone-close').on('click', function (ev) {
          let result = 0
          if ($(ev.target).attr('class') == 'del') {
            let warp = $(ev.target).parent().parent().parent().parent() // 获取table
            let numNew = $(ev.target).parent().parent().children('.phone-num').children('.add-num').children('.shop-num-go')
            // let idArr = $('shop-num-go').attr('name')
            // console.log(idArr);
            // let arr = shop.filter(val => val.id === elm.id)

            let id = numNew.attr('name')// 获取当前列的id

            let res = confirm('你确认要删除吗？')
            if (res) {
              warp.remove();
            } else {
              return
            }

            let moneyArr = Array.from($('.phone-add>.money'))
            moneyArr.forEach(elm => {
              result += parseInt($(elm).text())
            })
            // 更新总数据
            $('.goodsResult').text(result.toFixed(2))

            // 删除指定的元素
            if (shop.some(elm => elm.id == id)) {
              // 修改数量
              shop.forEach(elm => {
                if (elm.id == id) {
                  let index = contains(shop, elm) // 找到元素本身的下标
                  shop.splice(index, 1) // 删除该元素
                }
              })
              // 添加cookie
              cookie.set('shop', JSON.stringify(shop), 1) // 存放一天
            }
          }
        })
      }
    });



    // *** 封装一个用于加减的函数 ***
    // ev: 接收event对象
    // condition : 接收一个算术符
    function comNum(ev, condition) {
      // 获取当前区域的 value值
      let numNew = $(ev.target).parent().children('.shop-num-go')
      let minus = $(ev.target).parent().children('.minus')
      let getNum = parseInt(numNew.val())
      let id = numNew.attr('name')
      let oneNum = $(ev.target).parent().parent().prev().children('.money').html()
      let resultNum = $(ev.target).parent().parent().next().children('.money')
      let checkBox = $(ev.target).parent().parent().parent().children('.phone-size').children('input')

      // 如果传入的是 '+'
      if (condition == '+') {
        getNum += 1   // 累加num
        numNew.val(getNum)      // 添加到val中
        // 更新小计价格
        resultNum.html((getNum * oneNum).toFixed(2))
        // 当大于1时
        if (numNew.val() != 1) {
          minus.removeAttr('disabled')
        }
        // 当大于5时
        if (numNew.val() > 5) {
          alert('限购5件！')
          getNum -= 1
          numNew.val(5)
          $(ev.target).attr('disabled', 'disabled')
          resultNum.html((getNum * oneNum).toFixed(2))
          return
        }

        //当checkbox被选中了才增加总计金额
        if (checkBox.prop('checked')) {
          // 改变合计的金额
          let resNew = parseInt($('.goodsResult').text()) // 获取当前合计金额
          resNew += parseInt(oneNum) // 累加当前单价
          $('.goodsResult').text(resNew.toFixed(2)) // 添加
        }

      }

      // 如果传入的是 '-'
      if (condition == '-') {
        let add = $(ev.target).parent().children('.add')
        getNum -= 1
        numNew.val(getNum)
        // 更新总价价格
        resultNum.html((getNum * oneNum).toFixed(2))
        if (numNew.val() < 5) {
          add.removeAttr('disabled')
        }
        // 当等于 1时
        if (numNew.val() == 1) {
          $(ev.target).attr('disabled', 'disabled')
        }

        // 当checkbox被选中了才减少总计金额
        if (checkBox.prop('checked')) {
          // 改变合计的金额
          let resNew = parseInt($('.goodsResult').text()) // 获取当前合计金额
          resNew -= parseInt(oneNum) // 累加当前单价
          $('.goodsResult').text(resNew.toFixed(2)) // 添加
        }
      }
      // 判断cookie
      if (shop.some(elm => elm.id == id)) {
        // 修改数量
        shop.forEach(elm => {
          // null 表示不操作，累加数量
          elm.id === id ? elm.num = getNum.toString() : null
        })
      }
      // 更新cookie
      cookie.set('shop', JSON.stringify(shop), 1)
    }

    // 获取数组元素下标的函数
    function contains(arrays, obj) {
      var i = arrays.length;
      while (i--) {
        if (arrays[i] === obj) {
          return i;
        }
      }
      return false;
    }
  }
})();