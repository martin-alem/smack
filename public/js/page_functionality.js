/**
Name: Smack
File: page_functionality
-----------------------------
Author: Martin Alemajoh
Data:   10/4/2021, 7:51:41 AM
**/

import ContextMenu from "./ContextMenu.js";

// Tab functionality
(function () {
  const tabButtons = Array.from(document.querySelectorAll(".tab_btn"));
  const tabButtonContainer = document.querySelector(".navigation_tabs");
  tabButtonContainer.addEventListener("click", handleTabClick);
  let currentTabButtonPosition = 0;

  //Get all tab content on the page
  const tabContents = Array.from(document.querySelectorAll(".tab_nav"));
  let currentTabContentPosition = 0;

  // handler for tab click event
  function handleTabClick(event) {
    let tab = event.target.dataset;

    if (tab["position"]) {
      const tabPosition = parseInt(tab["position"], 10);
      if (currentTabButtonPosition !== tabPosition) {
        tabButtons[currentTabButtonPosition].firstElementChild ? tabButtons[currentTabButtonPosition].firstElementChild.classList.toggle("active") : tabButtons[currentTabButtonPosition].classList.toggle("active");
        tabButtons[tabPosition].firstElementChild.classList.toggle("active");
        tabContents[currentTabContentPosition].classList.toggle("hide");
        tabContents[tabPosition].classList.toggle("hide");
        currentTabButtonPosition = tabPosition;
        currentTabContentPosition = tabPosition;
      }
    }
  }
})();

//Context Menus
(function () {
  let chatAreaActive = false;
  let friendAreaActive = false;
  let profileAreaActive = false;
  let contextMenu = null;
  const chatAreaContext = document.querySelector(".chat_room");
  chatAreaContext.addEventListener("click", function (event) {
    if (!chatAreaActive) {
      chatAreaActive = true;
      const target = event.target;
      if (target.dataset["type"] === "msg_action") {
        const context = target.parentElement;
        contextMenu = new ContextMenu(context, "some data");
        contextMenu = contextMenu.messageContextMenu(target.dataset["direction"]);
      } else if (target.dataset["type"] === "conversion_msg") {
        const context = target.parentElement;
        contextMenu = new ContextMenu(context, "some data");
        contextMenu = contextMenu.conversionContextMenu();
      }
    } else {
      contextMenu.classList.add("hide");
      chatAreaActive = false;
    }
  });

  const friendAreaContext = document.querySelector(".tab_friends");
  friendAreaContext.addEventListener("click", function (event) {
    if (!friendAreaActive) {
      friendAreaActive = true;
      const target = event.target;
      if (target.dataset["type"] === "friend_action") {
        const context = target.parentElement;
        contextMenu = new ContextMenu(context, "some data");
        contextMenu = contextMenu.friendContextMenu();
      }
    } else {
      contextMenu.classList.add("hide");
      friendAreaActive = false;
    }
  });

  const profileAreaContext = document.querySelector(".tab_profile");
  profileAreaContext.addEventListener("click", function (event) {
    if (!profileAreaActive) {
      profileAreaActive = true;
      const target = event.target;
      if (target.dataset["type"] === "profile_action") {
        const context = target.parentElement;
        contextMenu = new ContextMenu(context, "some data");
        contextMenu = contextMenu.profileContextMenu();
      }
    } else {
      contextMenu.classList.add("hide");
      profileAreaActive = false;
    }
  });
})();
