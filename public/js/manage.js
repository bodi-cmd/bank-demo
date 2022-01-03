

$( document ).ready(function() {
    
    $('#approve').click(function(){
        const transactionID = $(this).parent().attr('id');
        $.ajax({
            url: '/confirm-transaction-id/'+transactionID+'/approve',
            type: 'PUT',
            success: function(result) {
                $("#tranzactie-"+transactionID).remove();
            }
        });
    })

    $('#deny').click(function(){
        const transactionID = $(this).parent().attr('id');
        $.ajax({
            url: '/confirm-transaction-id/'+transactionID+'/deny',
            type: 'PUT',
            success: function(result) {
                $("#tranzactie-"+transactionID).remove();
            }
        });
    })
});