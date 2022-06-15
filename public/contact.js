$('.success').hide()
$('#form_submit').submit(function(e){
    e.preventDefault()


    console.log('submitted')
    $('.animation').show()

    $.ajax({
        type:"POST",
        url:"/post_msg",
        data:{nom:$('#nom').val(), phone:$('#tel').val(), email:$('#email').val(), msg:$('#msg').val()},
        success:function(){
            $('.success').slideDown()
            $('input').val('')
            $('textarea').val('')
            $('.animation').hide()
            setTimeout(() => {
                $('.success').slideUp()
            }, 3000);
        }
    })
})