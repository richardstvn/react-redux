let obj1 = {
  name: "Richard"
};

let obj2 = {
  ...obj1,
  name: "Maggie"
};

console.log(obj1 === obj2);
console.log(obj1.name);
console.log(obj2.name);
obj1.name = "Richard1";
console.log(obj1.name);
console.log(obj2.name);
