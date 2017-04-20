<template>
  <div class="new-article">
    <article class="box new-post">
      <div class="media-content">
        <div v-if="getSuccess" class="notification is-success has-text-centered">
          <button class="delete"></button>
          Success
        </div>
        <div v-if="getError" class="notification is-danger has-text-centered">
          <button class="delete"></button>
          Failed
        </div>
        <form>
          <div class="field">
            <label class="label">Title</label>
            <p class="control">
              <input class="input" type="text" v-model="title">
            </p>
          </div>
          <div class="field">
            <label class="label">Content</label>
            <p class="control">
              <textarea class="textarea" v-model="content"></textarea>
            </p>
          </div>
          <div class="field is-grouped">
            <p class="control button is-primary" @click="postArticle()">Submit</p>
            <router-link to="/" class="control button">Cancel</router-link>
          </div>
        </form>
      </div>
    </article>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
  name: 'new-article',
  data() {
    return {
      title: '',
      content: ''
    }
  },
  computed: {
    ...mapGetters([
      'getSuccess',
      'getError'
    ])
  },
  methods: {
    ...mapActions([
      'setSuccess',
      'setError'
    ]),
    postArticle() {
      let self = this
      axios.post('http://localhost:3000/api/article', {
        title: self.title,
        content: self.content
      }, {headers: {'token': localStorage.getItem('token')}})
        .then((res)=> {
          self.setSuccess(true)
          setTimeout(()=> {
            self.setSuccess(false)
            this.$router.push('/')
          }, 2500)
        })
        .catch((err)=> {
          console.log(err)
          self.setError(true)
          setTimeout(()=> {
            self.setError(false)
            window.location.reload()
          }, 3500)
        })
    }
  }
}
</script>

<style scoped>
.new-post {
  margin: auto;
  width: 50%;
}
</style>