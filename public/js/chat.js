class WebSocketConnection {
  constructor() {
    this.socket = new WebSocket("wss://smacku.herokuapp.com/chat");
    // Connection opened
    this.socket.addEventListener("open", function (event) {
      this.send(JSON.stringify({ event: "connected" }));
    });

    this.socket.addEventListener("close", function (event) {
      console.log("Connection closed");
      setTimeout(function () {
        console.log("Connection opened");
        this.socket = new WebSocket("wss://smacku.herokuapp.com/chat");
      }, 1000);
    });

    this.socket.addEventListener("error", function (event) {
      console.log("Connection error");
    });

    // Listen for messages
    this.socket.addEventListener("message", function (event) {
      const remoteMessage = $(`
      <div class="remote" id="remote_msg">
            <div class="message_container">
              <div class="context_menu msg_context_menu hide">
                <div class="body">
                  <div class="item_container">
                    <p class="item">Copy</p>
                    <span class="material-icons">content_copy</span>
                  </div>
                  <div class="item_container">
                    <p class="item">Save</p>
                    <span class="material-icons">save_alt</span>
                  </div>
                  <div class="item_container">
                    <p class="item">Share</p>
                    <span class="material-icons">share</span>
                  </div>
                  <div class="item_container">
                    <p class="item">Delete</p>
                    <span class="material-icons">delete</span>
                  </div>
                </div>
              </div>
              <div class="message">${event.data}</div>
              <div class="time">
                <span class="material-icons">access_time</span>
                <p>${new Date().getHours()}:${new Date().getMinutes()}</p>
              </div>
            </div>
          </div>`);

      $(".chat_area").append(remoteMessage);
    });

    return this.socket;
  }
}

const socket = new WebSocketConnection();

export default socket;
