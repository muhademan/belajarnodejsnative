var myObj = {
    name : "Ade Rahman",
    age : 23,
    print : function(){
        console.log(this.name+" is "+this.age+" years old");
        console.log(this === myObj);
    }
};

function myFunction(){
    console.log("Im My Function");
    console.log(this === global);
}

myObj.print();
console.log("=============");
myFunction();