$(function() {
  let account =$('#account')
  let qrCode = $('#qrCode')
  // 登录切换事件
  account.on('click', function() {
    $('.login1').attr('style','display:block')
    account.addClass('black')
    $('.qr').attr('style','display:none')
    qrCode.removeClass('black')
  })

  qrCode.on('click', function() {
    $('.qr').attr('style','display:block')
    $('.login1').attr('style','display:none')
    account.removeClass('black')
    qrCode.addClass('black')
  })

})
