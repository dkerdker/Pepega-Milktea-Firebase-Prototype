<template>
  <div class="login container">
    <h2 class="center-align teal-text">Login</h2>
    <form @submit.prevent="login">
      <div class="field email">
        <!-- email label -->
        <label for="email">Email:</label>
        <!-- email input -->
        <input type="text" name="email" v-model="email" />
      </div>
      <div class="field password">
        <!-- password label -->
        <label for="password">Password:</label>
        <!-- password input -->
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field center-align">
        <p v-if="feedbackEmptyField" class="red-text">{{ feedbackEmptyField }}</p>
        <button class="btn teal">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import * as firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      email: "test@testboi.com",
      password: null,
      feedbackEmptyField: null
    };
  },
  methods: {
    login() {
      if (this.email === null) {
        this.feedbackEmptyField = "Enter email!";
      } else if (this.password === null) {
        this.feedbackEmptyField = "Enter password!";
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.feedbackEmptyField = null;
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(error);
            this.feedback = error.message;
          });
      }
    }
  }
};
</script>

<style>
.login {
  max-width: 30%;
}
.login h2 {
  font-size: 2.4rem;
}
.login .field {
  margin-bottom: 16px;
}
@media only screen and (max-width: 1000px) {
  .login {
    max-width: 60%;
  }
}
</style>