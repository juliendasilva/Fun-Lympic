<template>
  <div class="container" @click.self="$emit('closeModal')">
    <div class="know animated zoomIn">
      <div class="title">
        <img src="@/assets/nation.png" alt="" class="title_img">
      </div>
      <p>Quelle nation représentes-tu ?</p>
      <form action="">
        <div class="flag">
          <input type="radio" name="flag" value="france" id="france">
          <label for="france"><img src="@/assets/flag/France.png" alt=""></label>
        </div>
        <div class="flag">
          <input type="radio" name="flag" value="uk" id="royaume-uni">
          <label for="royaume-uni"><img src="@/assets/flag/Royaume-Uni.png" alt=""></label>
        </div>
        <div class="flag">
          <input type="radio" name="flag" value="netherland" id="pays-bas">
          <label for="pays-bas"><img src="@/assets/flag/Pays-Bas.png" alt=""></label>
        </div>
        <div class="flag">
          <input type="radio" name="flag" value="usa" id="etats-unis">
          <label for="etats-unis"><img src="@/assets/flag/Etats-Unis.png" alt=""></label>
        </div>
        <div class="flag">
          <input type="radio" name="flag" value="italy" id="italie">
          <label for="italie"><img src="@/assets/flag/Italie.png" alt=""></label>
        </div>
        <div class="flag">
          <input type="radio" name="flag" value="greece" id="grece">
          <label for="grece"><img src="@/assets/flag/Grece.png" alt=""></label>
        </div>
        <div class="flag">
          <input type="radio" name="flag" value="france" id="espagne">
          <label for="espagne"><img src="@/assets/flag/Espagne.png" alt=""></label>
        </div>
        <div class="flag">
          <input type="radio" name="flag" value="japan" id="japon">
          <label for="japon"><img src="@/assets/flag/Japon.png" alt=""></label>
        </div>
        <div class="flag">
          <input type="radio" name="flag" value="japan" id="portugal">
          <label for="portugal"><img src="@/assets/flag/Portugal.png" alt=""></label>
        </div>
        <div class="flag">
          <input type="radio" name="flag" value="japan" id="allemagne">
          <label for="allemagne"><img src="@/assets/flag/Allemagne.png" alt=""></label>
        </div>
        <div class="flag">
          <input type="radio" name="flag" value="japan" id="belgique">
          <label for="belgique"><img src="@/assets/flag/Belgique.png" alt=""></label>
        </div>
        <div class="flag">
          <input type="radio" name="flag" value="japan" id="canada">
          <label for="canada"><img src="@/assets/flag/Canada.png" alt=""></label>
        </div>
        <div class="flag">
          <input type="radio" name="flag" value="japan" id="chine">
          <label for="chine"><img src="@/assets/flag/Chine.png" alt=""></label>
        </div>
        <div class="flag">
          <input type="radio" name="flag" value="japan" id="russie">
          <label for="russie"><img src="@/assets/flag/Russie.png" alt=""></label>
        </div>
        <div class="flag">
          <input type="radio" name="flag" value="japan" id="suede">
          <label for="suede"><img src="@/assets/flag/Suede.png" alt=""></label>
        </div>
        <div class="flag">
          <input type="radio" name="flag" value="japan" id="suisse">
          <label for="suisse"><img src="@/assets/flag/Suisse.png" alt=""></label>
        </div>
      </form>
      <button class="BasicButton" @click="updateFlag">
        Valider
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nation',
  props: {
  },
  data() {
    return {
      msg: '',
    };
  },
  computed: {
  },
  methods: {
    updateFlag () {
      this.$emit('updateFlag')
      this.$emit('closeModal')
    }
  }
};
</script>
<style scoped>
.BasicButton {
  border: none;
  text-transform: uppercase;
  width: 70%;
  box-shadow: 0px 6px 0px 0px #F1B946;
  background-color: #FFD360;
  font-size: 1.3em;
  letter-spacing: 1.5px;
  min-height: 8vh;
  border-radius: 10px;
  margin: 0 auto;
}
form {
  width: 80%;
  margin: auto;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.flag {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: calc(100%/4);
  margin-bottom: 4vh;
}
.dis {
  display: none;
}
input[type="radio"]{
  position: relative;
  display: none;
}
input[type="radio"]:checked+label img {
  border: 3px solid #F7BE51;
  box-sizing: border-box;
  border-radius: 3px;
}
label img {
  box-sizing: border-box;
  height: 4vh;
}
label{
  display: flex;
    justify-content: center;
    flex-direction: row;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);
}
.know {
  position: relative;
  display: block;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: center;
  width: 80%;
  height: 70vh;
  background: white;
  border-radius: 10px;
  z-index: 30;
  padding-bottom: 40px;
}
.title{
  position: absolute;
  display: block;
  width: 122%;
  left: -11%;
  top: 2vh;
  margin: auto;
}
.title_img {
  width: 100%;
  margin-left: 1px;
}
.content_img{
  width: 56%;
  margin: 0 auto;
  margin-top: 25%;
  height: auto;
}
.bottom_img {
  position: absolute;
  bottom: -6vw;
  width:12vw;
  left: calc(50% - 6vw);
  margin: auto;
}
p {
  text-align: center;
  line-height: 1.5em ;
  font-size: 1.1em;
  padding: 0 1.5vh;
  color: #493B35;
  margin-top: 16vh;
}
</style>
