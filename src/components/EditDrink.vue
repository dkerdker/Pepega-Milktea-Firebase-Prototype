<template>
  <div class="edit-drink container">
    <h2 class="center-align teal-text">Edit a <span id="word-drink">Drink</span></h2>
    <form v-if="drink" @submit.prevent="updateDrink">
      <div class="field title">
        <!-- title display -->
        <label for="title">Drink Title:</label>
        <div v-if="!editing" class="card" @click="editTitle">
          <div class="card-content">
            <h2 class="teal-text">{{ drink.title }}</h2>
          </div>
        </div>
        <p v-if="!editing">⬑click to edit title⬏</p>
        <!-- title input -->
        <input
          v-if="editing"
          type="text"
          name="title"
          @keydown.enter.prevent="addTitle"
          v-model="drink.title"
        />
        <i v-if="editing" class="material-icons check" @click="addTitle">check</i>
      </div>
      <!-- ingredient dispaly -->
      <div class="ingredient-box" v-if="drink.ingredients.length > 0">
        <label for="ingredient">Ingredients:</label>
        <ul class="ingredients">
          <li v-for="(ing, index) in drink.ingredients" :key="index">
            <span class="chip" @click="(deleteIng(index))">{{ drink.ingredients[index] }}</span>
          </li>
        </ul>
        <p>⬑click on an ingredient to remove⬏</p>
      </div>
      <!-- ingredient input -->
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient:</label>
        <input
          type="text"
          name="add-ingredient"
          @click="clickToClear"
          @keydown.enter.prevent="addIng"
          v-model="another"
        />
        <i class="material-icons check" @click="addIng">check</i>
      </div>
      <div class="field center-align">
        <p v-if="feedbackEmptyField" class="red-text">{{ feedbackEmptyField }}</p>
        <button class="btn orange">Edit Drink</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditDrink",
  data() {
    return {
      drink: null,
      another: null,
      feedbackEmptyField: null,
      editing: false
    };
  },
  methods: {
    updateDrink() {
      if (!this.drink.title) {
        this.feedbackEmptyField = "You can't make a drink without a title!";
      } else if (this.drink.ingredients.length === 0) {
        this.feedbackEmptyField = "You can't make a drink without ingredients!";
      } else {
        this.feedbackEmptyField = null;
        //create slug
        this.drink.slug = slugify(this.drink.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("milkteas")
          .doc(this.drink.id)
          .update({
            date: Date.now(),
            title: this.drink.title,
            slug: this.drink.slug,
            ingredients: this.drink.ingredients
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    addIng() {
      if (this.another) {
        this.drink.ingredients.push(this.another.toLowerCase());
        this.another = null;
        this.feedbackEmptyField = null;
      } else {
        this.feedbackEmptyField = "You must type ingredient name!";
      }
    },
    addTitle() {
      if (this.drink.title) {
        this.editing = !this.editing;
        this.feedbackEmptyField = null;
      } else {
        this.feedbackEmptyField = "You must type title name!";
      }
    },
    deleteIng(index) {
      this.drink.ingredients.splice(index, 1);
    },
    clickToClear() {
      this.feedbackEmptyField = null;
    },
    editTitle() {
      this.editing = !this.editing;
    }
  },
  created() {
    let ref = db
      .collection("milkteas")
      .where("slug", "==", this.$route.params.drink_slug);
    ref.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.drink = doc.data();
        this.drink.id = doc.id;
      });
    });
  }
};
</script>

<style>
#word-drink {
  font-weight: bolder;
}
.edit-drink {
  margin-top: 1rem;
  padding: 3rem;
  max-width: 50%;
}
.edit-drink h2 {
  font-size: 2em;
  margin: 1rem auto;
}
.edit-drink .field {
  margin: 1rem auto;
  position: relative;
}
.edit-drink label {
  font-size: 1em;
}
.edit-drink .check {
  position: absolute;
  right: 0;
  bottom: 16px;
  cursor: pointer;
  color: #aaaaaa;
  font-size: 1.5rem;
}
.edit-drink .card {
  width: 60%;
  cursor: pointer;
}
.edit-drink .card-content {
  padding: 2% 8%;
}
.edit-drink .chip:hover {
  background-color: #ff9800;
  color: white;
}
.ingredient-box {
  width: 50%;
}
.edit-drink p {
  font-size: 0.8em;
  color: #cccccc;
}
.edit-drink .ingredients li {
  display: inline-block;
}
.edit-drink .chip {
  cursor: pointer;
}
.field .btn {
  margin: 0.5rem;
}

@media only screen and (max-width: 1000px) {
  .edit-drink .card {
    width: 100%;
  }
  .card-content {
    width: 100%;
  }
  .edit-drink {
    max-width: 100%;
  }
}
</style>