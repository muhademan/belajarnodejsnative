//  ini satu2
// var name = "Ade Rahman";
// var age = 23;

// function Print(){
//     console.log("My name is "+name+ ", I'am"+age+" years old");
// }
// // suaya bisa diakses dari luar
// module.exports.name = name;
// module.exports.age = age;
// module.exports.print = Print();

// ======================================
// ini sekaligus
module.exports = {
    name : "Ade Rahman",
    age : 23,
    print : function(){
        console.group("Im a function "+this.name+" is "+this.age);
    }
}