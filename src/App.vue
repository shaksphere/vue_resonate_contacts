<template >
  <div class="container">
    <!-- Heading and Icon-->
    <div class="container-header">
        <img src="./assets/contacts.svg" class="contact-header">
        <div class="contact-header lato-normal-white-14px"> Contacts</div>
    </div>
        <!-- Search Bar-->
    <div class="search-contacts">
      <input type="text" v-model="searchQuery" placeholder="Search contacts name..." class="search-input">
  </div>
    <!-- Contact List-->
    <article class="contact-card">
       <!-- <h3 class="contacts-header-list">All Contacts</h3> -->
    <ul class="line-separated">
      <!-- List is sorted by the ID in the dataset-->
      <li v-for="contact in filteredContacts" :key="contact.id" class="contact">
        <div class="contact__header" @click="toggleMenu(contact)">
          <div class="contact__image">
            <img :src="'https://robohash.org/' + contact.id + '.png?set=set4'" alt="contact image">
            </div>  
          <!--<div class="contact__name">{{ contact.id }}. {{ contact.name }}</div>-->
          <div class="contact__name">{{ contact.name }}</div>
          <div class="contact__menu-toggle">{{ contact.showMenu ? 'Hide -' : 'More +' }}</div>
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
            <!-- Error Handling -->
      <li v-if="filteredContacts.length === 0" class="contact">
        <span class="material-symbols-outlined">search</span>
        <div class="container-error"><strong>No results found!</strong></div>
      </li>
    </ul>
    </article>
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
      const filtered = this.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      });
      
      // // If no matches found, display message
      // if (filtered.length === 0) {
      //   return [{ id: "..", name: 'No results found!'}];
      // }
      
      return filtered;
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
@import './styles.scss';


// contact image & heading
.container {
  max-width: relative;
  margin: 0 auto;
  padding: 0 20px;
  //background: #002A6A 35%;
  //background-image: url(./assets/search-page.png), linear-gradient(180deg, #F2F2F2 0%, #002A6A 35%);
  background-size: cover;
  background: transparent;
  //height: 0;
}
.container-header {
  //border: 1px;
  //margin: 1rem;
  //padding: 2rem 2rem;
  text-align: start;
}
.contact-header {
  display: inline-block;
  //border: 1px;
  padding: 5px;
  vertical-align: middle;
  text-align: start;
  font-size: xxx-large;
  font-family: "lato";
  font-weight: bold;
  color: white;
}


// search bar

.search-contacts {
  //margin-bottom: 20px;

  input[type="text"] {
    //padding: 10px;
    padding: 8px 12px;
    border-radius: 25px solid;
    border: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 100%;
    color: #F2F2F2;
    background-color: initial transparent;
    background-color: --stack;
    font-size: 1.2rem;
    margin: 20px auto;
    box-sizing: border-box;
    


    &:focus {
      outline: none;
    }
  }
}

li .contact {
  list-style: none;
}
.container-error {
  max-width: relative;
  margin: 0 auto;
  padding: 0 20px;
  border-bottom: none;
  font-size: x-large;
  //background: #002A6A 35%;
  //background-image: url(./assets/search-page.png), linear-gradient(180deg, #F2F2F2 0%, #002A6A 35%);
  //background-size: 100%;
  //height: 0;
}
// .search-input {
//   //padding: 8px 12px;
//   //border: none;
//   //border-radius: 4px;
//   //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   //width: 100%;
  
//   border: none;
// }


// contact list and menu
.contact {
  //background-color: $primary-color;
  color: $font-color;
  //border: 1px solid #ccc;
  //border-radius: 5px;
  border-bottom: 2px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;  
}
.contact-card {
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  //align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  //border-radius: 5px;
  border-style: none;
  //box-decoration-break: slice;
  //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 20px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.contacts-header-list {
  //display: inline-block;
  //border: 1px;
  //padding: 5px;
  vertical-align: middle;
  text-align: start;
  font-size: xx-large;
  font-family: "lato";
  font-weight: bold;
  color: $font-color;
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
  color: $primary-color;
  padding-top: 20px;

}

// .contact__item-info-value {
//   flex-basis: 70%;
// }
// ul .line-seperated {
//   list-style: none!important;
//   padding: 0;
//   margin: 0;
//         margin-left: 1em;
//         list-style: none!important;
//   padding: 0;
//   margin: 0;
// }
// ul .line-seperated li {
//         margin: 1px 0 0 0;
//         padding: 0;
//         list-style-type: none;
// }





</style>