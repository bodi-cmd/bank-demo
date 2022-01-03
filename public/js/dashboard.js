

$( document ).ready(function() {
    $('.account:nth-of-type(1)').addClass("selected");
    $('.account:nth-of-type(1)').click();
    $('.account').click(function(){
        $('.selected').removeClass("selected");
        $(this).addClass("selected");
    });

    $('#new-acc').click(function(){
        $.post( "/new-account", function( data ) {
            if(data == "FAIL"){
                alert("Nu se mai poate crea alt cont!");
            }
            else if(data == "SUCCESS"){
                location.reload();
            }
        });
    });

    $(".account").click(function(){
        $(".loader").show();
        $("#tranzactii").empty();
        //console.log( $(this).find(".acc-iban"));
        const currentIban = $(this).find(".acc-iban").text();

        $.get('/tranzactii/' + currentIban, function(transactions) {
            console.log(transactions);
            for(var i = 0;i<transactions.length;i++){
                const incomingSign = transactions[i].IBAN_DEST == currentIban ? 'plus green' : 'minus red';
                const incomingColor = transactions[i].IBAN_DEST == currentIban ? 'green' : 'red';
                //console.log(transactions[i].DATA);
                const date = new Date(transactions[i].DATA)
                var str = `<div class="tranzactie">
                                <div class="tr-left">
                                    <p>Data: ${date.toLocaleString({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p>Suma: <span class="tr-balance ${incomingColor}">$${ transactions[i].SUMA }</p>
                                </div>
                                <div class="tr-left">
                                    <p>IBAN: ${ transactions[i].IBAN_DEST}</p>
                                    <p>Nume: ${ transactions[i].NUME }</p>
                                </div>
                                <div class="tr-right">
                                    
                                    <i class="fas fa-${incomingSign}"></i>
                                    <i class="fas fa-coins"> </i>
                                    <p>${ transactions[i].STATUS }</p>
                                </div>
                            </div>`;
                $("#tranzactii").append(str);
            }
            $(".loader").hide();
        });
    });

    $('#close-tr').click(function(){
        $('.new-transaction-wrapper').hide();
    });

    $('.transfer').click(function(){
        var $currentIBAN = $('.selected').find('.acc-iban').text();
        var $currentBalance = $('.selected').find('.acc-sold').text();
        $('#from-iban').val($currentIBAN);
        $('#from-iban-balance').val("$ "+$currentBalance);

        $('.new-transaction-wrapper').show();
    });

    $('#submit-transaction').click(function(){

        var $currentIBAN = $('.selected').find('.acc-iban').text();
        var $currentBalance = $('.selected').find('.acc-sold').text();
        var $destIBAN = $('#to-iban').val();
        var $name = $('#to-name').val();
        var $sum = $('#to-sum').val();

        const params = {
            iban_source: $currentIBAN,
            iban_destination: $destIBAN,
            name: $name,
            sum: $sum
        };

        $.get('/new-transaction',{...params}, function(response) {
            console.log(response);
            location.reload();
        });

    });

    $('#submit-contact').click(function(){
        var $name = $('#add-name').val();
        var $iban = $('#add-iban').val();
        $.get('/add-contact',{iban: $iban, name: $name}, function(response) {
            console.log(response);
            location.reload();
        });
    })

    $.get('/contacts', function(response){
        for(var i=0;i<response.length;i++){
            var str = `<div class="contact">
                            <p class="contact-name">${response[i].nume}</p>
                            <p class="contact-iban">${response[i].iban}</p>
                        </div>`;
            $('.contacts').append(str);
        }

        $('.contact').click(function(){
            var $destIBAN = $(this).find('.contact-iban').text();
            $('#to-iban').val($destIBAN);
            var $name = $(this).find('.contact-name').text();
            $('#to-name').val($name);
            console.log($destIBAN);
        });

    });

   


});