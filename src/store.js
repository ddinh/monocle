import { observable, decorate, action } from 'mobx';

class Store {
  socket = null;
  answers = {};
  ready = false;
  users = [];
  question = null;
  queue = [];
  code = null;
  transcription = '';
  questionUnlocked = false;
  redirectQuestion = false;
  attendanceUnlocked = false;

  constructor() {
    this.connect();
  }

  connect() {
    var ws = new WebSocket(`ws://${process.env.REACT_APP_SERVER_IP}:1337`);

    const _this = this;

    ws.onopen = function() {
      _this.ready = true;
      _this.socket = ws;
      console.log('Connected to socket.');

      _this.queue.forEach(item => {
        ws.send(_this.queue.pop());
      });
    };

    ws.onmessage = function(e) {
      const response = JSON.parse(e.data);
      console.log('Receiving message: ');
      console.log(response);

      if (response.type === 'answerQuestion') {
        const answer = JSON.parse(response.data);
        _this.answers = { ...this.answers, [answer.name]: answer.answer };
      } else if (response.type === 'getQuestionDetailsResponse') {
        const data = JSON.parse(response.data);
        _this.question = data.question;
        _this.questionUnlocked = data.unlocked;
        data.answers.forEach(e => {
          _this.answers[e.name] = e.answer;
        });
      } else if (response.type ==='Question'){
        _this.questionUnlocked = false;
      } else if (response.type === 'createQuestionResponse') {
        _this.redirectQuestion = true;
        _this.answers = {};
        setTimeout(() => {
          _this.redirectQuestion = false;
        }, 10);
      } else if (response.type === 'removeQuestionResponse') {
        _this.question = {};
        _this.answers = {};
      } else if (response.type === 'getStudentsResponse') {
        const data = JSON.parse(response.data);
        _this.users = data.users;
        _this.attendanceUnlocked = data.unlocked;

        _this.send('getAttendanceCode');
      } else if (response.type === 'Attendance') {
        if (response.data === 'Attendance closed') {
          _this.attendanceUnlocked = false;
        } else {
          const data = JSON.parse(response.data);
          _this.attendanceUnlocked = true;
          _this.code = data;
        }
      } else if (response.type === 'getAttendanceCodeResponse') {
        const data = JSON.parse(response.data);

        _this.code = data.code;
        _this.attendanceUnlocked =
          data.attendanceOpen === 'false' ? false : true;
      } else if (response.type === 'checkinResponse') {
        const user = response.data;
        const users = _this.users;
        users.push(user);

        _this.users = Array.from(new Set(users));
      } else if (response.type === 'speechToText') {
        const data = JSON.parse(response.data);
        const newValue = _this.transcription + data.text;

        if (newValue.length < 266) {
          _this.transcription = newValue;
        } else {
          _this.transcription = '';
        }
      }
    };

    ws.onclose = function(e) {
      console.log(
        'Socket is closed. Reconnect will be attempted in 1 second.',
        e.reason
      );

      _this.socket = null;
      setTimeout(function() {
        _this.connect();
      }, 1000);
    };

    ws.onerror = function(err) {
      console.error(
        'Socket encountered error: ',
        err.message,
        'Closing socket'
      );
      ws.close();
      this.socket = null;
    };
  }

  send(type, data) {
    const payload = JSON.stringify({
      type: type,
      data: JSON.stringify(data)
    });

    console.log(payload);

    if (!this.ready) {
      this.queue.push(payload);
    } else {
      this.socket.send(payload);
    }
  }
}

export default decorate(Store, {
  socket: observable,
  answers: observable,
  users: observable,
  questionUnlocked: observable,
  ready: observable,
  code: observable,
  attendanceUnlocked: observable,
  question: observable,
  redirectQuestion: observable,
  transcription: observable,
  connect: action
});
