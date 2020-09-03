import $ from './library/jquery.js';
import './library/jquery-md5.js';
(function(){
  check()
  let reg = {
    "username": /^[A-z]\w{5,15}$/,
    "password": /^.{6,16}$/,
  };
  // 验证表单
    $('.login-input').each((i,elm) => { // 拿到两个输入框
      $(elm).on('input', function() {
        if (reg[$(elm).attr('id')].test($(elm).val())) { // 通过相同的id名来验证
          $('.warning').html('✔ 通过验证')
          // 设置样式
          $('.main-warn').css({
            'opacity':1,
            'background-color':'rgb(26,188,156)'
          })
          $('.warning').css({
            'background-position-x' : -100
          })
          $(this).attr('data-pass', true)
          check()

          // 如果用户名已经存在了
          if($(elm).attr('id') == 'username') {
            $.ajax({
              type: "get",
              url: "../../interface/hasUser.php",
              data: {username:$(elm).val()},
              dataType: 'json',
              success: function (response) {
                if (response.has) {
                  $('.warning').html('✖ '+response.msg+' !')
                }
              }
            });
          }

        }else {
          $(this).attr('data-pass', false)
          $('.main-warn').css(
            {
              'opacity':1,
              'background-color': '#ffd1ca'
            }
            )
            $('.warning').css({
              'background-position-x' : 7
            })
          $('.warning').html('没通过验证')
          check()
        }      
      })
    })

 
      $('.close-warn').on('click', function() {
        
        $('.main-warn').css({
          'opacity':0,
        })
      })
      // 提交发起注册
      
      $('#submit').on('click',function() {
        if ($('#checkbox2').prop('checked') == true) { // 当你勾上了流氓协定
             $.ajax({
          type: "post",
          url: "../../interface/reg.php",
          data: {
            username: $('#username').val(),
            password: $.md5($('#password').val())
        },
          dataType: "json",
          success: function (res) {
            console.log(res);
            if (res.has) {
              alert(res.msg + ' !')
              location.href='../html/login.html'
            }else {
              alert(res.msg + ' !')
            }
          }
        });
        }else { // 如果没勾
          alert('你还没同意!');
        }
     
      })

    function check() {
      // $('.login-input').each((i,val) => {
      //   console.log($(val).val());
      //   if (!($(val).val())) { // 如果输入框为空时
      //     $('#submit').attr('disabled', 'disabled');
      //   }
      //   else {
      //     $('#submit').removeAttr('disabled');
      //   }
      // })
    

      if ($('[data-pass=true]').length == 2) {
        $('#submit').removeAttr('disabled');
      }else {
        $('#submit').attr('disabled', 'disabled');
      }
    }
})()