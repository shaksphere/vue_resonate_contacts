<template>
  <div class="container">
    <img src="./assets/contacts.svg">
    <h1>Contacts</h1>
    <div class="search">
      <input type="text" v-model="searchQuery" placeholder="Search contacts..." class="search-input">
    </div>
    <ul>
      <li v-for="contact in filteredContacts" :key="contact.id" class="contact">
        <div class="contact__header" @click="toggleMenu(contact)">
          <div class="contact__name">{{ contact.id }}. {{ contact.name }}</div>
          <div class="contact__menu-toggle">{{ contact.showMenu ? 'Hide -' : 'Show Details +' }}</div>
        </div>
        <div class="contact__menu" v-if="contact.showMenu && contact.showMenuDelay" :class="{ showMenu: contact.showMenuDelay }">
          <div class="contact__item">
            <span class="contact__item-label">Username:</span>
            <span class="contact__item-value">{{ contact.username }}</span>
          </div>
          <div class="contact__item">
            <span class="contact__item-label">Email:</span>
            <span class="contact__item-value">{{ contact.email }}</span>
          </div>
          <div class="contact__item">
            <span class="contact__item-label">Address:</span>
            <span class="contact__item-value">{{ contact.address.street }}, {{ contact.address.suite }}, {{ contact.address.city }}, {{ contact.address.zipcode }}</span>
          </div>
          <div class="contact__item">
            <span class="contact__item-label">Phone:</span>
            <span class="contact__item-value">{{ contact.phone }}</span>
          </div>
          <div class="contact__item">
            <span class="contact__item-label">Website:</span>
            <span class="contact__item-value">{{ contact.website }}</span>
          </div>
          <div class="contact__item">
            <span class="contact__item-label">Company:</span>
            <span class="contact__item-value">{{ contact.company.name }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import anime from 'animejs';
import './styles.scss';

export default {
  
  name: 'App',
  data() {
    return {
      contacts: [],
      searchQuery: ''
    }
  },
  computed: {
    filteredContacts() {
      // Filter contacts based on search query
      return this.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      })
    }
  },
  created() {
   
    // Fetch contacts from API using fetch
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        // Add "showMenu" property to each contact
        this.contacts = data.map(contact => {
          return {
            ...contact,
            showMenu: false,
            showMenuDelay: false
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
},
methods: {
  toggleMenu(contact) {
      contact.showMenu = !contact.showMenu;
      contact.showMenuDelay = true;
      if (contact.showMenu) {
        anime({
          targets: '.contact__menu',
          height: 'auto',
          duration: 1000,
          easing: 'easeInOutQuad'
        });
      } else {
        anime({
          targets: '.contact__menu',
          height: 0,
          duration: 1000,
          easing: 'easeInOutQuad'
        });
      }
      setTimeout(() => {
        contact.showMenuDelay = contact.showMenu;
      }, 5000);
  }
}   
  }
</script>

<style lang='scss' scoped>
@import "variables";
.search {
  margin-bottom: 20px;

  input[type="text"] {
    padding: 10px;
    border-radius: 5px;
    border: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 800px;

    &:focus {
      outline: none;
    }
  }
}

.search-input {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;
  width: 100%;
  margin-bottom: 20px;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  //height: 0;
}

.contact {
  background-color: $primary-color;
  color: $font-color;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;  
}

.contact__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.contact__name {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 10px;
  margin-right: 50px; /* add margin to the right */
}

.contact__menu-toggle {
  font-weight: bold;
  font-size: 1.2rem;
 // transition: 0.3s ease-out;
  //opacity: 0;
  
}

.contact__menu {
  overflow: hidden;
  transition: height 3s ease;
}
.contact__menu.showMenu {
  height: auto; // set height to auto when shown
  display: block;
  animation: expand 1s ease-out;
  transition: height 1s ease-in-out;
}

@keyframes expand {
  0% { height: 0; }
  100% { height: fit-content; }
}

.contact__item:hover {
  color: $secondary-color;

}
.contact__item {
  margin-bottom: 5px;
  text-align: start;
}

.contact__item-label {
  font-weight: bold;
  margin-right: 5px;
  flex-basis: 30%;

}

.contact__item-info-value {
  flex-basis: 70%;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;

}

@media only screen and (max-width: 767px) {
  .contact__item-info {
    display: block;
  }

  .contact__item-info-item {
    flex-basis: auto;
  }

  .contact__item-info-label {
    display: block;
    margin-bottom: 5px;
  }
}


</style>