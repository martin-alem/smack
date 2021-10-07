import request from "./agent.js";

const fetchAllFriends = function () {
  const method = "GET";
  const resource = "user";
  request(resource, method)
    .then((response) => {
      if (response.ok) {
        response
          .json()
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
    });

  function render() {}
};

export default fetchAllFriends;
