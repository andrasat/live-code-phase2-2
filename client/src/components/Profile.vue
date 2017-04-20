<template>
  <div class="profile">
    <h1 class="title main-title">{{ msg }}</h1>
    <div class="columns">
      <div class="column is-three-quarters">
        <article class="box">
          <div v-if="userData" class="content is-large">
            <h2 class="subtitle is-3">{{ userData.username }}</h2>
            <p>Your name : {{ userData.name }}</p>
            <p>Your email : {{ userData.email }}</p>
            <p>Your post : {{ userData.articles.length }} articles</p>
          </div>
          <div v-if="getSuccess" class="notification is-success has-text-centered">
            <button class="delete"></button>
            Success
          </div>
          <div v-if="getError" class="notification is-danger has-text-centered">
            <button class="delete"></button>
            Failed
          </div>
        </article>
        <article v-if="userArticle.length > 0" class="box">
          <div class="content is-medium">
            <div v-for="article in userArticle">
              <p>{{ article.title }}
                <a id="edit" class="button is-warning" @click="toModal(article)"><span class="icon is-medium"><i class="fa fa-pencil"></i></span></a>
                <a id="delete" class="button is-danger" @click="deleteArticle(article)"><span class="icon is-medium"><i class="fa fa-times"></i></span></a>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div :class="getModalClass">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div v-if="getSuccess" class="notification is-success has-text-centered">
          <button class="delete"></button>
          Success
        </div>
        <div v-if="getError" class="notification is-danger has-text-centered">
          <button class="delete"></button>
          Failed
        </div>
        <article class="box">
          <div class="media">
            <form>
              <div class="field">
                <label class="label">Title</label>
                <p class="control">
                  <input class="input" type="text" v-model="selectedArticle.title" required>
                </p>
              </div>
              <div class="field">
                <label class="label">Content</label>
                <p class="control">
                  <textarea class="textarea" v-model="selectedArticle.content" required></textarea>
                </p>
              </div>
              <div class="field is-grouped">
                <p class="control button is-primary" @click="editArticle()">Submit</p>
                <p class="control button" @click="cancelModal()">Cancel</p>
              </div>
            </form>
          </div>
        </article>
      </div>
      <button class="modal-close" @click="cancelModal()"></button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
  name: 'profile',
  data () {
    return {
      msg: 'MY CMS',
      userData: null,
      userArticle: [],
      selectedArticle: {}
    }
  },
  computed: {
    ...mapGetters([
      'getSuccess',
      'getError',
      'getModalClass'
    ])
  },
  methods: {
    ...mapActions([
      'setSuccess',
      'setError',
      'changeModalStatus'
    ]),
    getUser() {
      let self = this
      axios.get('http://localhost:3000/api/user/'+this.$route.params.username)
        .then((res)=> {
          self.userData = res.data
          self.userArticle = res.data.articles
        })
        .catch((err)=> {
          console.log(err)
          alert('Server error')
        })
    },
    deleteArticle(data) {
      let self = this,
          confirmed = confirm('are you sure?')
      if(confirmed) {
        axios.delete('http://localhost:3000/api/article/'+data._id,
        {headers: {'token': localStorage.getItem('token')}})
          .then((res)=> {
            self.userArticle.splice(self.userArticle.indexOf(data), 1)
            self.setSuccess(true)
            setTimeout(()=> {
              self.setSuccess(false)
              window.location.reload()
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
    },
    editArticle() {
      let self = this
      axios.put('http://localhost:3000/api/article/'+self.selectedArticle._id, {
        title: self.selectedArticle.title,
        content: self.selectedArticle.content
      }, {headers: {'token': localStorage.getItem('token')}})
        .then((res)=> {
          console.log(res)
          self.userArticle.splice(self.userArticle.indexOf(self.selectedArticle), 1, self.selectedArticle)
          self.selectedArticle = {}
          self.setSuccess(true)
          self.changeModalStatus(false)
          setTimeout(()=> {
            self.setSuccess(false)
          }, 2500)
        })
        .catch((err)=> {
          self.setError(true)
          setTimeout(()=> {
            self.setError(false)
          }, 3500)
        })
    },
    toModal(data) {
      this.changeModalStatus(true)
      this.selectedArticle = data
    },
    cancelModal() {
      this.changeModalStatus(false)
      this.selectedArticle = {}
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-title {
  text-align: center;
}
.is-three-quarters {
  margin:auto;
}
/*#edit {
  float: right;
}
#delete {
  float: right;
}*/
</style>
