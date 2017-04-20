<template>
  <div class="profile">
    <h1 class="title main-title">{{ msg }}</h1>
    <div class="columns">
      <div class="column is-three-quarters">
        <article class="box">
          <div v-if="userData" class="content is-large">
            <h2 class="subtitle">{{ userData.username }}</h2>
            <p>You asked : {{ userData.postId.length }} questions</p>
          </div>
        </article>
        <article v-if="userQuestions.length > 0" class="box">
          <div class="content is-medium">
            <div v-for="article in userArticle">
              <p>{{ article.title }}
                <a id="edit" class="button is-warning" @click="toModal()"><span class="icon is-medium"><i class="fa fa-pencil"></i></span></a>
                <a id="delete" class="button is-danger" @click="deletePost(article)"><span class="icon is-medium"><i class="fa fa-times"></i></span></a>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="modal">

    </div>
  </div>
</template>

<script>
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
    modalClass() {
      return {
        'modal' : true,
        'is-active': false
      }
    }
  },
  methods: {
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
        axios.delete('http://localhost:3000/api/article/'+data._id)
          .then((res)=> {
            alert('Deleted !')
            window.location.reload()
          })
          .catch((res)=> {
            alert('Delete fail')
          })
      }
    },
    editArticle(data) {
      let self = this
      axios.put('http://localhost:3000/api/article'+data._id, {
        title: self.userArticle.title
        content: self.userArticle.content
      })
    },
    toModal() {
      
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
#delete {
  float: right;
}
#edit {
  float: right;
}
</style>
