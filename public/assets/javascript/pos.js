/**
 * Created by Kristi Heredia on 10/26/2016.
 */

// Move this to a partial I think
$(document).on('click', '.glyphicon-trash', function remove() {
    // Get the item index value from the data-index attribute of the <tr>
    var $itemIndex = $(this).closest("tr").data("index");
    // Now get the array index that goes with that item index
    var myIndex = getIndex($itemIndex);
    // If it wasn't found, just return
    if (myIndex == -1) return;

    var itemPrice = orderArray[myIndex].itemData.price;
    console.log("itemPrice:", itemPrice);
    // Use this to remove the array item at that index
    orderArray.splice(myIndex, 1);
    // Remove the row
    $(this).closest("tr").remove();
    // Update the running total
    runningTotal(itemPrice, '-');
});
//
// function getIndex(itemIndex) {
//     console.log("orderArray.length:", orderArray.length);
//     console.log("itemIndex:", itemIndex);
//
//     for (var i = 0; i < orderArray.length; i++) {
//         console.log("i:", i);
//         console.log("orderArray[" + i + "].index: " + orderArray[i].index);
//         if (orderArray[i].index == itemIndex) {
//
//             return i;
//         }
//     }
//     // if nothing found, return -1
//     return -1;
// }
//
// $(function () {
//     $(document).on('submit', 'form', function (e) {
//         e.preventDefault();
//         console.log("this:", $(this));
//         var data = $(this).serialize();
//         console.log("data from controller:", data);
//
//         $.post("/pos/add", data, function (data, success) {
//
//             if (data.err) {
//                 // If the data json that is returned has an err property,
//                 // no record was found, so write the error to the screen
//                 console.log("err:", data.err);
//                 $("#itemErrMsg").html(data.err);
//             }
//             // Otherwise, we found a record in the database and retrieved
//             // the row
//             else {
//                 console.log("data:", data);
//                 // Push the product to the array, this should give us an array
//                 // of json objects
//                 var i = data.length-1;
//                 // maxIndex++; //Keep track of the maxIndex value we have had for deleting purposes
//                 // //orderArray.push({"index": maxIndex, "itemData": data});
//                 // orderArray.push(data);
//                 //Clear error message if there was one
//                 $("#itemErrMsg").empty();
//                 // build the order summary display
//                 var $orderSummary = $('#orderSummaryBody');
//                 var $lineItem = $('<tr>');//.attr('data-index', maxIndex);
//                 var $sku = $('<td>').html(data.sku).appendTo($lineItem);
//                 var $prodName = $('<td>').html(data.productName).appendTo($lineItem);
//                 var $price = $('<td>').html(data.price).appendTo($lineItem);
//                 var $deleteBtn = $('<button>').addClass("btn btn-danger btn-xs pull-right")
//                     .append($('<span>').addClass("glyphicon glyphicon-trash"))
//                     .appendTo($lineItem);
//                 // Write line item to order summary
//                 $lineItem.appendTo($orderSummary);
//                 // Update running total
//                 runningTotal(data.price, '+');
//             }
//         })
//     })
// });
//
// // Function to calculate the total, it will be called each time an item is added
// // and will update the displayed total
//
// $(document).on('click', '#btnAdd', function runningTotal(itemPrice, operator) {
//     var temp = parseFloat($('#runningTotal').html());
//     if (operator == '+') {
//         temp += itemPrice;
//     } else if (operator == '-') {
//         temp -= itemPrice;
//     }
//     $('#runningTotal').html(temp.toFixed(2));
// })


$(document).on('click', '#clearOrder', function clearOrder() {
    // Empty the array
    orderArray.length = 0;
    // Empty the displayed rows
    $('#orderSummaryBody').empty();
    // Reset running total
    $('#runningTotal').html('0.00');

});

// Let's make a new array with quantities
// $(document).on('click', '#checkout', function checkout() {
//
//     for (var i = 0; i < orderArray.length; i++) {
//
//         // // var hasItem = false;
//         // $.each(checkoutArray, function(i,obj) {
//         //     if (obj.itemData.sku === 'foo') {
//         //         // hasItem = true;
//         //         // return false;
//         //         return i;
//         //     }
//         // });
//
//         //
//         // console.log("item sku:", orderArray[i].itemData.sku);
//
//         //if (checkoutArray.indexOf(orderArray[i]) == -1 ) {
//         for (var j = 0; j < checkoutArray.length; j++ ){
//             if (checkoutArray[j].orderItem.itemData.sku.indexOf(orderArray[i].itemData.sku) == -1) {
//                 var qty = checkoutArray[j].orderQty++;
//
//                 checkoutArray.push({orderQty: qty, orderItem: orderArray[i]});
//             }
//         }
//
//         // console.log("checkoutArray:", checkoutArray[i]);
//         // } else {
//         //     checkoutArray[i]
//         // }
//     }
// });

