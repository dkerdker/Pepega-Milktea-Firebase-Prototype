<template>
  <div class="index container">
    <div class="card" v-for="drink in milkteas" :key="drink.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteDrink(drink.id)">delete</i>
        <h2 class="teal-text">{{ drink.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in drink.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab white">
        <router-link :to="{ name: 'EditDrink', params: {drink_slug: drink.slug} }">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  data() {
    return {
      milkteas: []
    };
  },
  methods: {
    deleteDrink(id) {
      // delete doc from firestore
      db.collection("milkteas")
        .doc(id)
        .delete()
        .then(() => {
          this.milkteas = this.milkteas.filter(drink => {
            return drink.id != id;
          });
        });
    }
  },
  created() {
    //fetch data from firestore
    db.collection("milkteas")
      .orderBy("date", "desc")
      .get()
      .then(snapshotDocuments => {
        snapshotDocuments.forEach(doc => {
          console.log(doc.data(), doc.id);
          let drink = doc.data();
          drink.id = doc.id;
          this.milkteas.push(drink);
        });
      });
  }
};
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3rem;
  margin-top: 4rem;
}
.index h2 {
  font-size: 2rem;
  text-align: center;
  margin-top: 0;
}
.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  color: #aaaaaa;
  font-size: 1.5rem;
}
.index .edit {
  font-size: 1.5rem;
  color: #009688;
}
@media only screen and (max-width: 1000px) {
  .index {
    grid-template-columns: 1fr;
    margin-top: 4rem;
  }
}
</style>
