/**
Name: Smack
File: page_functionality
-----------------------------
Author: Martin Alemajoh
Data:   10/4/2021, 7:51:41 AM
**/


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
