

$('#search').on('click',function(){
    if($('#nom').val().trim() == ""){
        $('.err').show()
        setTimeout(() => {
            $('.err').hide()
        }, 2000);
    }

    else{
        // animation
        $('.animation').show()
        $('.lighten').show()
        $('#search').hide()
        // ajax
        $.ajax({
            type:'POST',
            url:'/load_info',
            data:{nom:$('#nom').val().trim()},
            success:function(res){
                console.log(res);
                if(res.gene === null){
                    $('#result').empty()
                    $('#result').append(`
                        <p>Aucun résultat trouvé.</p>
                    `)
                }else{
                    $('#result').empty()
                    $('#result').append(`
                        <p>Nom : ${res.gene.nom}</p>
                        <p>Nom : ${res.gene.infos}</p>
                        <p>Nom : ${res.gene.genes}</p>
                    `)
                }
                $('.animation').hide()
                $('.lighten').hide()
                $('#search').show()
            }
        })
        
    }
})