class ContextMenu {
  constructor(context, data) {
    this.context = context;
    this.data = data;
  }

  messageContextMenu(position) {
    this.context.style.position = "relative";
    const menu = $(`<div class="context_menu">
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
    </div>`);
    if (position === "right") {
      menu.css("top", "2rem");
      menu.css("left", "-16rem");
    } else if (position === "left") {
      menu.css("top", "2rem");
      menu.css("right", "-16rem");
    }
    this.context.append(menu[0]);
    return menu[0];
  }

  conversionContextMenu() {
    this.context.style.position = "relative";
    const menu = $(`<div class="context_menu">
      <div class="body">
        <div class="item_container">
          <p class="item">Archive</p>
          <span class="material-icons">archive</span>
        </div>
        <div class="item_container">
          <p class="item">Mute</p>
          <span class="material-icons">volume_off</span>
        </div>
        <div class="item_container">
          <p class="item">Delete</p>
          <span class="material-icons">delete</span>
        </div>
      </div>
    </div>`);
    menu.css("top", "3rem");
    menu.css("right", "2rem");
    this.context.append(menu[0]);
    return menu[0];
  }

  friendContextMenu() {
    this.context.style.position = "relative";
    const menu = $(`<div class="context_menu">
      <div class="body">
        <div class="item_container">
          <p class="item">Block</p>
          <span class="material-icons">block</span>
        </div>
      </div>
    </div>`);
    menu.css("top", "4rem");
    menu.css("right", "2rem");
    this.context.append(menu[0]);
    return menu[0];
  }

  profileContextMenu() {
    this.context.style.position = "relative";
    const menu = $(`<div class="context_menu">
      <div class="body">
        <div class="item_container">
          <p class="item">Delete Account</p>
          <span class="material-icons">delete</span>
        </div>
        <div class="item_container">
          <p class="item">Logout</p>
          <span id="logout" class="material-icons">logout</span>
        </div>
      </div>
    </div>`);
    menu.css("top", "4rem");
    menu.css("right", "2rem");
    this.context.append(menu[0]);
    return menu[0];
  }
}

export default ContextMenu;
