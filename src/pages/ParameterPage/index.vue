<template>
  <div class="wrapper-page bg_purple_light">
    <Navbar text="Paramètres" @goBack="()=>{this.$router.push('/')}"/>
    <div class="wrapper animated slideInRight">
      <div class="block1">
        <div class="sound">
          <h2>SON</h2>
          <BasicButton image="sound" btnColor="yellow" btnSize="mid" @click="()=>{console.log('click')}" />
        </div>
        <div class="music">
          <h2>NOTIF</h2>
          <BasicButton image="notif" btnColor="yellow" btnSize="mid" @click="()=>{console.log('click')}" />
        </div>
      </div>
      <div class="block2">
        <h2>LANGUE</h2>
        <div class="langages">
          <div v-for="(lang, key) in languages" :key="key">
            <!-- Selected one -->
            <BasicButton v-if="lang.name==='french'" :title="lang.text" btnColor="yellow" btnSize="mid" @click="selectLanguage(lang.name)" />
            <!-- Others -->
            <BasicButton v-else :title="lang.text" btnColor="blue" btnSize="mid" @click="selectLanguage(lang.name)" />
          </div>
        </div>
      </div>
      <div class="block3" v-if="authenticated">
        <BasicButton title="déconnexion" image="facebook" btnColor="red" btnSize="mid" @click="auth.logout()" />
      </div>
    </div>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import BasicButton from '@/components/BasicButton';

export default {
  name: 'Stade',
  props:['auth', 'authenticated'],
  components: {
    Navbar,
    BasicButton
  },
  data() {
    return {
      languages: [
          {
            name: 'english',
            text: 'ENGLISH',
          },
          {
            name: 'spanish',
            text: 'ESPAÑOL'
          },
          {
            name: 'french',
            text: 'FRANÇAIS'},
          {
            name: 'german',
            text: 'Deutsch'
          },
          {
            name: 'italian',
            text: 'ITALIANO'
          },
          {
            name: 'portuguese',
            text: 'PORTUGUÊS'},
          {
            name: 'chinese',
            text: '中国'
          },
          {
            name: 'japanese',
            text: '日本の'
          }
        ]
    };
  },
  methods: {
    selectLanguage(lang) {

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper-page {
  height: 100%;
  overflow-y: hidden;
}
.wrapper {
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  overflow-y: scroll;
  height: calc(100% - 15vh);
  padding: 0 30px;
  padding-top: 3vh;
}
h2 {
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 15px;
  font-size: 1.2em;
  letter-spacing: 1px;
}
.block1 {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align:center;
}
.sound, .music {
  display: flex;
  flex-direction:column;
  align-items: center;
}
.langages {
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  justify-content: space-between;
}
.langages div {
  width: 45%;
  margin-bottom: 7%
}
.block2 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align:center;
}

</style>
