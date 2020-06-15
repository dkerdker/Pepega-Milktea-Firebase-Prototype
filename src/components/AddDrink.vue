<template>
  <div class="add-drink container">
    <h2 class="center-align teal-text">Add New <span id="word-drink">Drink</span> Recipe</h2>
    <form @submit.prevent="addDrink">
      <div class="field title">
        <!-- title display -->
        <label for="title">Drink Title:</label>
        <div v-if="!editing" class="card" @click="editTitle">
          <div class="card-content">
            <h2 class="teal-text">{{ title }}</h2>
          </div>
        </div>
        <p v-if="!editing">⬑click to edit title⬏</p>
        <!-- title input -->
        <input
          v-if="editing"
          type="text"
          name="title"
          @keydown.enter.prevent="addTitle"
          v-model="title"
        />
        <i v-if="editing" class="material-icons check" @click="addTitle">check</i>
      </div>
      <!-- ingredient dispaly -->
      <div class="ingredient-box" v-if="ingredients.length > 0">
        <label for="ingredient">Ingredients:</label>
        <ul class="ingredients">
          <li v-for="(ing, index) in ingredients" :key="index">
            <span class="chip" @click="(deleteIng(index))">{{ ingredients[index] }}</span>
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
        <button class="btn orange">Add Drink</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddDrink",
  data() {
    return {
      title: null,
      ingredients: [],
      slug: null,
      another: null,
      editing: true,
      feedbackEmptyField: null
    };
  },
  computed: {},
  methods: {
    addDrink() {
      if (!this.title) {
        this.feedbackEmptyField = "You can't make a drink without a title!";
      } else if (this.ingredients.length === 0) {
        this.feedbackEmptyField = "You can't make a drink without ingredients!";
      } else {
        this.feedbackEmptyField = null;
        //create slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("milkteas")
          .add({
            date: Date.now(),
            title: this.title,
            slug: this.slug,
            ingredients: this.ingredients
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
        this.ingredients.push(this.another.toLowerCase());
        this.another = null;
        this.feedbackEmptyField = null;
        console.log(this.ingredients);
      } else {
        this.feedbackEmptyField = "You must type ingredient name!";
      }
    },
    addTitle() {
      if (this.title) {
        this.editing = !this.editing;
        this.feedbackEmptyField = null;
      } else {
        this.feedbackEmptyField = "You must type title name!";
      }
    },
    deleteIng(index) {
      this.ingredients.splice(index, 1);
    },
    clickToClear() {
      this.feedbackEmptyField = null;
    },
    editTitle() {
      this.editing = !this.editing;
    }
  }
};
</script>

<style>
#word-drink {
  font-weight: bolder;
}

.add-drink {
  margin-top: 1rem;
  padding: 3rem;
  max-width: 50%;
}
.add-drink h2 {
  font-size: 2em;
  margin: 1rem auto;
}
.add-drink .field {
  margin: 1rem auto;
  position: relative;
}
.add-drink label {
  font-size: 1em;
}
.add-drink .card {
  width: 60%;
  cursor: pointer;
}
.add-drink .card-content {
  padding: 2% 8%;
}
.add-drink .chip:hover {
  background-color: #ff9800;
  color: white;
}
.add-drink .check {
  position: absolute;
  right: 0;
  bottom: 16px;
  cursor: pointer;
  color: #aaaaaa;
  font-size: 1.5rem;
}
.ingredient-box {
  width: 50%;
}
.add-drink p {
  font-size: 0.8em;
  color: #cccccc;
}
.add-drink .ingredients li {
  display: inline-block;
}
.add-drink .chip {
  cursor: pointer;
}
.field .btn {
  margin: 0.5rem;
}

@media only screen and (max-width: 1000px) {
  .add-drink .card {
  width: 100%;
}
  .card-content {
    width: 100%;
  }
  .add-drink {
    max-width: 100%;
  }
}
</style>