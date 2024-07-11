<template>
  <nav class="nav" role="navigation">
    <div class="max-centered">
      <h1 class="nav__logo">Rule of thumb.</h1>
      <button class="nav__hamburger icon-button" alt="Open Menu">
        <svg width="25" height="20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 0h25v4H0V0zm0 8h25v4H0V8zm0 8h25v4H0v-4z"
            fill="#FFF"
            fill-rule="nonzero"
          />
        </svg>
      </button>
      <ul class="nav__links">
        <li>
          <a href="#">Past Trials</a>
        </li>
        <li>
          <a href="#">How It Works</a>
        </li>
        <li>
          <a href="#">Login / Sign Up</a>
        </li>
        <li>
          <form action="javascript:void(0)">
            <input class="nav__search-input" aria-label="search" type="text" />
            <button class="nav__search icon-button" alt="Search" type="submit">
              <img src="../assets/img/search.svg" alt="search" />
            </button>
          </form>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  z-index: 2;
  top: 0;
  display: flex;
  width: calc(100vw - 2rem);
  min-height: 10rem;
  justify-content: space-between;
  padding: 0 1rem;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 80%
  );
}

.nav__logo {
  margin: 2.5rem 0 0;
  color: var(--color-white);
  font-size: 2rem;
  font-weight: 400;
  line-height: 2.5rem;
}

.nav__hamburger {
  position: relative;
  top: 2rem;
  right: 1rem;
  width: 25px;
  height: 20px;
}

.nav__links {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  width: 100vw;
  height: calc(100vh - 4rem);
  flex-direction: column;
  padding: 4rem 0 2rem;
  background-color: var(--color-darker-background);
  transform: translateX(100vw);
}

.nav__links li {
  width: 100%;
  margin: 3rem 0;
  font-size: 2rem;
  text-align: center;
}

.nav__links a {
  color: var(--color-white);
  text-decoration: none;
}

.nav__hamburger:focus + .nav__links,
.nav__links:focus-within {
  transform: translateX(0);
}

.nav__links li:last-child {
  order: -1;
}

.nav__search {
  width: 24px;
  height: 24px;
  margin-left: 0.5rem;
}

.nav__search-input {
  width: 25vw;
  border: 0;
  border-bottom: 2px solid var(--color-white);
  background-color: transparent;
  border-radius: 0;
  color: var(--color-white);
  font-family: "Lato", sans-serif;
  font-size: 1.5rem;
  transition: width 0.2s ease-in;
}

.nav__search-input:focus {
  width: 60vw;
  outline: 0 none;
}

@media all and (min-width: 1100px) {
  .nav {
    min-height: 22vh;
  }

  .nav__logo {
    margin-top: 3rem;
  }

  .nav__hamburger {
    display: none;
  }

  .nav__links {
    position: absolute;
    top: 3rem;
    right: 0;
    left: auto;
    width: 40vw;
    height: auto;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 0;
    background-color: transparent;
    transform: translateX(0);
  }

  .nav__links li {
    width: fit-content;
    margin: 0 1rem 0 0;
    font-size: 1rem;
    font-weight: 300;
    text-align: right;
  }

  .nav__links li:last-child {
    order: 0;
  }

  .nav__search {
    width: 2rem;
    height: 2rem;
  }

  .nav__search-input {
    display: none;
  }
}
</style>
