

$('#search').on('click',function(){
    

    console.log(parseInt($('#nom_bio').val()[1]))
        // animation
        $('.animation').show()
        $('.lighten').show()
        $('#search').hide()
        // ajax
        $.ajax({
            type:'POST',
            url:'/load_info',
            data:{id:$('#nom_bio').val()[1]},
            success:function(res){
                
                
                    $('#result').empty()
                    console.log(res.res)
                    const keys = Object.keys(res.res);
                    var object = res.res
                    var t = "";
                    for (var i= 0; i < object.length; i++) {  
                        t += `
                        <div class="type">
                            <h4>Type : ${object[i]["type"]}</h4>
                            <div>
                                <p class="seq">Séquence Protéique: <br>${object[i]['Sequence proteique']}</p>
                                <p> GenBank Proteine: ${object[i]['GenBank Proteine']}</p>
                                <p> Séquence Nucléotidique: <br><span class="sqn">${object[i]['Sequence nucleotidique']}</span></p>
                                <p>Genbank Nucléotide :${object[i]['GenBank nucleotide']}</p>
                                <p>Uniprot:${object[i]['Uniprot']}</p>
                            </div>
                            <div class="pgc">
                                <button>% GC</button>
                                <div></div>
                            </div>
                        </div>
                        `
                      }
                  $('#result').append(t)
                $('.animation').hide()
                $('.lighten').hide()
                $('#search').show()
                Start()
            }
        })
        
    
})


function Pgc(seq){
    var s = 0;
    var v = 0;
    for(var i = 0; i < seq.length; i++){
        if(seq[i] == "G" || seq[i] == "g" || seq[i]=="C" || seq[i]=="c"){
            s = s + 1
        }
        else if(seq[i] == " "){
            v = v + 1;
        }

    }

    return s/(seq.length-v)*100;
}


function Start(){
    $('.type div').hide();

    $('.type h4').on('click',function(e){
        $(e.target).parent().find('div').slideToggle()
    })

    $('.pgc button').on('click',function(e){
        var s = $(e.target).parent().parent().find('.sqn').text()

        console.log(s.slice(0,5))
        $(e.target).parent().find("div").text(Pgc(s))
    })
}