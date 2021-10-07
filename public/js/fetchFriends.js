import request from "./agent.js";
import { getId } from "./utils.js";

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
              console.log(data);
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

export default fetchAllFriends;
