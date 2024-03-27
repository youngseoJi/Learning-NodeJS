function hello() {
  console.log(this);
  console.log(this === global);
  // 클래스 외부에 있는 함수에서 쓰이는 이 this라는 것은 글로벌을 가리키고 있다.
}
hello();

class A {
  constructor(num) {
    this.num = num;
  }

  memberFunction() {
    console.log("-----class-----");
    console.log(this);
    console.log(this === global);
    // 함수 내의 this는 클래스 자체를 가리키고 있고요 이 this는 글로벌이 아니다.
  }
}

const a = new A(1);
a.memberFunction();

// 자바스크립트와 다른점 : 노드에서는 글로벌 객체를 사용할 수 없다.
console.log("-----global scope-----");
console.log(this); // 글로벌이 아니다.
console.log(this === module.exports); // node.js에서의 this는 모듈에 있는 exports와 동일하다.
