<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        TALK
      </h1>
      <h2 class="subtitle">
        사용자 선택
      </h2>
      <div class="links">
        <!-- user select -->
        <select v-model="pickUserId" style="margin-bottom:30px;">
          <option :value="index" v-for="(user, index) in users" :key="index" :selected="index==0">{{user.name}}</option>
        </select>
        <br>
        <button class="button" @click="chat">Chat</button>
      </div>
    </div>
  </section>
</template>

<script>
    import axios from '~/plugins/axios'
    import Logo from '~/components/Logo.vue'

    export default {
        components: {
            Logo
        },
        async asyncData () {
            let { data } = await axios.get('/api/users')
            return { users: data }
        },
        head () {
            return {
                title: 'Users'
            }
        },
        data() {
          return {
            pickUserId: ''
          }
        },
        methods: {
          chat: async function() {
            let {data} = await axios.get('/api/set-user/' + this.pickUserId)
            if(!data) {
              alert('user 접속 실패')
              return;
            }
            // user 저장
            sessionStorage.setItem('id',data.id)
            sessionStorage.setItem('name',data.data.name)

            alert(`[${data.data.name}]님 채팅 접속 성공`)


            // 채팅페이지 이동
            this.$router.push({ path: '/chat/list' })
          }
        }
    }
</script>

<style scoped>

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .users {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .user {
    margin: 10px 0;
  }

  .button, .button:visited {
    display: inline-block;
    color: black;
    letter-spacing: 1px;
    background-color: #fff;
    border: 2px solid #000;
    text-decoration: none;
    text-transform: uppercase;
    padding: 15px 45px;
  }

  .button:hover, .button:focus {
    color: #fff;
    background-color: #000;
  }
</style>
