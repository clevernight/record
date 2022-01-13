
// 原型链继承 缺点：实例使用的是同一个原型对象，内存空间是共享的
function ProtoParent() {
  this.name = 'protoParent'
  this.play = [1, 2, 3]
}
function ProtoChild() {
  this.type = 'protoChild'
}
ProtoChild.prototype = new ProtoParent()
// var s1 = new ProtoChild();
// var s2 = new ProtoChild();
// s1.play.push(4);
// console.log(s1.play, s2.play); // [1,2,3,4]



// 构造函数继承 缺点：只能继承父类的实例属性和方法，不能继承原型属性或者方法
function ConstructParent() {
  this.name = 'ConstructParent'
}
ConstructParent.prototype.getName = function() {
  return this.name
}
function ConstructChild() {
  ConstructParent.call(this)
  this.type = 'ConstructChild'
}
// let child = new ConstructChild();
// console.log(child);  // 没问题
// console.log(child.getName());  // 会报错



// 组合继承 缺点： 多构造一次的性能开销
function CombinaParent() {
  this.name = 'CombinaParent';
  this.play = [1, 2, 3];
}
CombinaParent.prototype.getName = function () {
  return this.name;
}
function CombinaChild() {
  CombinaParent.call(this);
  this.type = 'CombinaChild';
}
CombinaChild.prototype = new CombinaParent()
CombinaChild.prototype.constructor = CombinaChild
// var s3 = new CombinaChild();
// var s4 = new CombinaChild();
// s3.play.push(4);
// console.log(s3.play, s4.play);  // 不互相影响
// console.log(s3.getName()); // 正常输出'CombinaParent'
// console.log(s4.getName()); // 正常输出'CombinaParent'



// 原型式继承 缺点：Object.create方法实现的是浅拷贝，多个实例的引用类型属性指向相同的内存，存在篡改的可能
let parent4 = {
  name: "parent4",
  friends: ["p1", "p2", "p3"],
  getName: function() {
    return this.name;
  }
};
let person4 = Object.create(parent4);
let person5 = Object.create(parent4);
// person4.name = "tom";
// person4.friends.push("jerry");
// person5.friends.push("lucy");
// console.log(person4.name); // tom
// console.log(person4.name === person4.getName()); // true
// console.log(person5.name); // parent4
// console.log(person4.friends); // ["p1", "p2", "p3","jerry","lucy"]
// console.log(person5.friends); // ["p1", "p2", "p3","jerry","lucy"]


// 寄生式继承 缺点：和原型式继承一样
let parent5 = {
  name: "parent5",
  friends: ["p1", "p2", "p3"],
  getName: function() {
      return this.name;
  }
};
function clone(original) {
  let clone = Object.create(original);
  clone.getFriends = function() {
      return this.friends;
  };
  return clone;
}
let person5 = clone(parent5);
console.log(person5.getName()); // parent5
console.log(person5.getFriends()); // ["p1", "p2", "p3"]



// 寄生组合式继承
function clone(parent, child) {
  child.prototype = Object.create(parent.prototype)
  child.prototype.constructor = child
}
function Parent() {
  this.name = 'Parent';
  this.play = [1, 2, 3];
}
Parent.prototype.getName = function () {
    return this.name;
}
function Child() {
  Parent.call(this);
  this.type = 'Child';
}
clone(Parent, Child)
Child.prototype.getFriends = function () {
  return this.type;
}
let person6 = new Child(); 
console.log(person6); //{friends:"child5",name:"child5",play:[1,2,3],__proto__:Parent6}
console.log(person6.getName()); // parent6
console.log(person6.getFriends()); // child5