const EventEmitter = require("events");
const emitter = new EventEmitter();

const callback1 = (args) => {
  console.log("first callback - ", args);
};
// emitter.on : 이벤트를 등록해준다.
emitter.on("ellie", callback1);

emitter.on("ellie", (args) => {
  console.log("second callback - ", args);
});

// emitter.emit: 연결하는 이벤트를 실행시킨다.
emitter.emit("ellie", { message: 1 });
emitter.emit("ellie", { message: 2 });

// 이벤트 제거 방법
emitter.removeListener("ellie", callback1);
// emitter.removeAllListeners(); // 모든 이벤트에 등록된 콜백함수를 제거한다.
emitter.emit("ellie", { message: 3 });
