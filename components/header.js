class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
      this.innerHTML =  `
      <head>
        <link rel="stylesheet" href="../styles/navbar.css">
      </head>
      <nav class="navbar navbar-expand-lg fixed-top nav-color">
      <!-- Container wrapper -->
      <div class="container">
        <!-- Navbar brand -->
        <a class="navbar-brand" href="/pages/homeScreen.html"><img
          src="../../resources/images/sharedine-low-resolution-logo-black-on-transparent-background.png"
          height="30"
          alt=""
          loading="lazy"
        /></a>
        <!-- Search form -->
        <!-- <form class="input-group" style="width: 400px">
          <input type="search" class="form-control" placeholder="Type query" aria-label="Search" />
          <button class="btn btn-dark" type="button" data-mdb-ripple-color="dark" style="padding: .45rem 1.5rem .35rem;">
            Search
          </button>
        </form> -->
    
        <!-- Toggle button -->
        <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <i class="fas fa-bars"></i>
        </button>
    
        <!-- Collapsible wrapper -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- Left links -->
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link d-flex flex-column text-center" aria-current="page" href="/pages/homeScreen.html"><span class="small">Home</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex flex-column text-center" aria-current="page" href="/pages/appointments.html"><span class="small">Appointments</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex flex-column text-center" aria-current="page" href="/pages/friends.html"><span class="small">Friends</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex flex-column text-center" aria-current="page" href="/pages/chat.html"><span class="small">Chats</span></a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
                  class="rounded-circle"
                  height="30"
                  alt=""
                  loading="lazy"
                />
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="#">My profile</a></li>
                <li><a class="dropdown-item" href="/pages/settings.html">Settings</a></li>
                <li><a class="dropdown-item" onclick="logout()">Logout</a></li>
              </ul>
            </li>
          </ul>
          <!-- Left links -->
        </div>
        <!-- Collapsible wrapper -->
      </div>
      <!-- Container wrapper -->
    </nav>
    `
  };
}

customElements.define('component-header', Header);