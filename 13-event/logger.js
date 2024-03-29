const EventEmitter = require("events");
// 재사용이 높은 이벤트 클래스 만들기

// 다른 파일에서 사용 가능하게 하기 위해서 이벤트를 사용할 수 있는 객체를 만드는 것이 아니라 클래스를 생성해야 한다.
// 왜냐하면 이벤트를 사용할 수 있는 객체를 만들면 다른 파일에서 사용할 수 없기 때문이다.
// const emitter = new EventEmitter(); <- 이렇게 하면 다른 파일에서 사용할 수 없다.

// logger : 로거 , 특정한 이벤트가 발생할 때마다 로그를 남기는 것

// 재사용성!
// 클래스를 생성해서 사용하면 다른 파일에서도 사용할 수 있다. -> main.js에서 사용할 수 있다.
class Logger extends EventEmitter {
  log(callback) {
    // 클래스여서 this : 나 자신의 함수를 호출할 때 사용
    this.emit("log", "started...");
    callback();
    this.emit("log", "ended!");
  }
}

module.exports.Logger = Logger;

// 특정 콜백함수 실행하기 전과 후에 시작과 끝을 알리는 로그를 남기는 것
// 이 함수를 클래스내에 넣어서 사용하면 다른 파일에서 사용할 수 있다.
// function log(callback) {
//   emitter.emit("log", "started...");
//   callback();
//   emitter.emit("log", "ended!");
// }
