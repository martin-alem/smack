import request from "./agent.js";
import { getId } from "./utils.js";
import socket from "./chat.js";

const fetchAllFriends = function () {
  const friendListContainer = $("#friend_list");
  const method = "GET";
  const resource = "user";
  request(resource, method)
    .then((response) => {
      if (response.ok) {
        if (response.redirected) {
          location.replace(response.url);
        } else {
          response
            .json()
            .then((data) => {
              render(data["friends"]);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });

  function render(users) {
    const id = getId();
    friendListContainer.empty();
    users.forEach((user) => {
      const friend = $(`
            <div data-friend="${user["_id"]}" class="friend">
              <h3>${user["firstName"]} ${user["lastName"]}</h3>
              <span data-type="friend_action" data-id="${user["_id"]}" class="material-icons"> more_vert </span>
              <div class="context_menu hide">
                <div class="body">
                  <div id="block" class="item_container">
                    <p class="item">Block</p>
                    <span class="material-icons">block</span>
                  </div>
                </div>
              </div>
            </div>`);
      if (id !== user["_id"]) {
        friend.click(friend, connectToChatRoom);
        friendListContainer.append(friend);
      }
    });
  }
};

//connect to chat room
function connectToChatRoom(event) {
  const id = event.data.data()["friend"];
  fetchUserInfo(id);
}

// update chat room UI
function fetchUserInfo(id) {
  const resource = `user/${id}`;
  const method = "GET";
  request(resource, method, {})
    .then((response) => {
      if (response.ok) {
        if (response.redirected) {
          location.replace(response.url);
        } else {
          response
            .json()
            .then((data) => {
              updateChatRoomUI(data["friend"]);
              fetchAllChats(data["friend"]["_id"]);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function updateChatRoomUI(user) {
  const currentUser = document.getElementById("current_chat_user_name");
  const placeholder = document.getElementById("chat_message");
  const currentUserImage = document.getElementById("current_user_image");
  const recipientId = document.getElementById("receiver_id");
  recipientId.value = user["_id"];
  currentUserImage.src = user["image"];
  currentUser.textContent = `${user["firstName"]} ${user["lastName"]}`;
  placeholder.removeAttribute("disabled");
  placeholder.placeholder = `Message ${user["firstName"]} ${user["lastName"]}`;
}

function fetchAllChats(rId) {
  const senderId = getId();
  const recipientId = rId;
  const resource = `chat/${senderId}/${recipientId}`;
  const method = "GET";
  request(resource, method, {})
    .then((response) => {
      if (response.ok) {
        if (response.redirected) {
          location.replace(response.url);
        } else {
          response
            .json()
            .then((data) => {
              displayChat(data["chats"], senderId, recipientId);
              socket.send(JSON.stringify({ event: "assign", host: `${senderId}` }));
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayChat(chats, senderId, recipientId) {
  const chatArea = $(".chat_area");
  chatArea.empty();
  for (const chat of chats) {
    const time = `${new Date(chat["date"]).getHours()}:${new Date(chat["date"]).getMinutes()}`;
    if (chat["senderId"] === senderId) {
      const localMessage = $(`
    <div class="local">
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
              <div class="message">${chat["messageBody"]}</div>
              <div class="time">
                <span class="material-icons">access_time</span>
                <p>${time}</p>
              </div>
            </div>
          </div>`);
      chatArea.append(localMessage);
    } else {
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
              <div class="message">${chat["messageBody"]}</div>
              <div class="time">
                <span class="material-icons">access_time</span>
                <p>${time}</p>
              </div>
            </div>
          </div>`);

      $(".chat_area").append(remoteMessage);
    }
  }
}

export default fetchAllFriends;
