<template>
  <div>
    <ul class="pages">
      <li class="chat page">
        <div class="chatArea">
          <div class="toast">{{ user }}님이 입장하였습니다.</div>
          <ul class="messages" ref="messages">
            <no-ssr>
              <li v-for="(message, index) in messages" :key="index" :id="message.id" :class="['message',sessionId==message.id ? 'my-chat' : 'your-chat']">
                <i :title="message.name">{{ message.name }}</i>: {{ message.text }} <!-- {{ message.date.split('T')[1].slice(0, -2) }} -->
              </li>
            </no-ssr>
          </ul>
        </div>
        <input class="inputMessage" type="text" v-model="message" @keyup.enter="sendMessage" placeholder="Type here..." />
      </li>
    </ul>
  </div>
</template>

<script>
  import socket from '~/plugins/socket.io.js'

  export default {
    asyncData(context, callback) {
      socket.emit('last-messages', function (messages) {
        callback(null, {
          messages,
          message: ''
        })
      })
    },
    data() {
      return {
        user: ''
      }
    },
    created() {
      // if (process.client){
      //   let name = sessionStorage.getItem('name')
      //   this.data.user = name
      // }
    },
    computed: {
      sessionId: function() {
        if (process.client){
          console.log("sessionid",sessionStorage.getItem('id'))
          return parseInt(sessionStorage.getItem('id'))
        }
      }
    },
    watch: {
      'messages': 'scrollToBottom'
    },
    beforeMount() {
      socket.on('new-message', (message) => {
        this.messages.push(message)
      })
    },
    mounted() {
      this.scrollToBottom()
    },
    methods: {
      sendMessage() {
        if (!this.message.trim()) return
        let message = {
          date: new Date().toJSON(),
          text: this.message.trim(),
          name: sessionStorage.getItem('name'),
          id: sessionStorage.getItem('id')
        }
        this.messages.push(message)
        this.message = ''
        socket.emit('send-message', message)
      },
      scrollToBottom() {
        this.$nextTick(() => {
          this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
        })
      }
    },
    head: {
      title: 'Nuxt.js with Socket.io'
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  html {
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
  }

  html, input {
    font-family:
        "HelveticaNeue-Light",
        "Helvetica Neue Light",
        "Helvetica Neue",
        Helvetica,
        Arial,
        "Lucida Grande",
        sans-serif;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
    word-wrap: break-word;
  }

  /* Pages */

  .pages {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .page {
    height: 100%;
    position: absolute;
    width: 100%;
  }

  /* Font */

  .messages {
    font-size: 150%;
  }

  .inputMessage {
    font-size: 100%;
  }

  .log {
    color: gray;
    font-size: 70%;
    margin: 5px;
    text-align: center;
  }

  /* Messages */

  .chatArea {
    height: 100%;
    padding-bottom: 60px;
  }

  .messages {
    height: 100%;
    margin: 0;
    overflow-y: scroll;
    padding: 10px 20px 10px 20px;
  }

  /* Input */

  .inputMessage {
    border: 10px solid #3B8070;
    bottom: 0;
    height: 60px;
    left: 0;
    outline: none;
    padding-left: 10px;
    position: absolute;
    right: 0;
    width: 100%;
  }
  .my-chat {
    text-align: right;
  }
  /* toast */
  .toast {
    width: 90%;
    background-color: #e78889;
    color: white;
    font-weight: bold;
    font-size: 0.9rem;
    text-align: center;
    margin: 0 auto;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 2px;
  }
</style>
