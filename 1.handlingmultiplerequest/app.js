// setTimeout(function(){
//     console.log("Saya ditampilkan dengan jeda 3 detik");
// },3000);

function Order(idOrder, timeOut){
    console.log("ID Order "+idOrder);
    ProsesOrder(idOrder, timeOut)
}

function ProsesOrder(idOrder, timeOut){
    setTimeout(function(){
        console.log("ID Order "+idOrder +" Processed");
    },timeOut);
}

Order(101,5000);
Order(102,2000);
Order(103,3000);