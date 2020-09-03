import $ from './library/jquery.js';
import './library/jquery-md5.js';
import { cookie } from './library/cookie.js';
(function () {
  check();

  let account = $('#account')
  let qrCode = $('#qrCode')
  // 登录切换事件
  account.on('click', function () {
    $('.login1').attr('style', 'display:block')
    account.addClass('black')
    $('.qr').attr('style', 'display:none')
    qrCode.removeClass('black')
  })

  qrCode.on('click', function () {
    $('.qr').attr('style', 'display:block')
    $('.login1').attr('style', 'display:none')
    account.removeClass('black')
    qrCode.addClass('black')
  })

  let reg = {
    "username": /^[A-z]\w{5,15}$/,
    "password": /^.{6,16}$/,
  };

  if (cookie.get('password')) { // 如果有密码的cookie
    console.log('111');
    console.log(cookie.get(username));
    $('#username').val(cookie.get('username'))
    $('#password').val(cookie.get('password'))
  }


  // 验证表单
  $('.login-input').each((i, elm) => { // 拿到两个输入框
    $(elm).on('input', function () {
      if (reg[$(elm).attr('id')].test($(elm).val())) { // 通过相同的id名来验证
        $('.warning').html('✔ 通过验证')
        // 设置样式
        $('.main-warn').css({
          'opacity': 1,
          'background-color': 'rgb(26,188,156)'
        })
        $('.warning').css({
          'background-position-x': -100
        })
        $(this).attr('data-pass', true)
        check()
      } else {
        $(this).attr('data-pass', false)
        $('.main-warn').css(
          {
            'opacity': 1,
            'background-color': '#ffd1ca'
          }
        )
        $('.warning').css({
          'background-position-x': 7
        })
        $('.warning').html('没通过验证')
        check()
      }
    })

  })


  $('.close-warn').on('click', function () {

    $('.main-warn').css({
      'opacity': 0,
    })
  })

  $('#submit').on('click', function () {
    $.ajax({
      type: "post",
      url: "../../interface/login.php",
      data: {
        username: $('#username').val(),
        password: $.md5($('#password').val())
      },
      dataType: "json",
      success: function (res) {
        console.log(res);
        if (res.has) {
          alert(res.msg)
          location.href='../html/index.html'
        } else {
          alert(res.msg)
        }
      }
    });
    // 如果勾选了记住密码
    if($('#remMe').prop('checked')==true) {
      // 如果被勾选记住密码
      cookie.set('password', $('#password').val(), 1) // 设置密码的cookie
    }
  })

  function check() {
   
    if ($('[data-pass=true]').length == 2) {
      $('#submit').removeAttr('disabled');
    } else {
      $('#submit').attr('disabled', 'disabled');
    }
  }


  // 当勾选了记住状态
  // $('.remMe').on('click', function() {

  // })
  
})()
