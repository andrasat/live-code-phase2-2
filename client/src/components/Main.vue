<template>
  <div class="main">
    <div class="columns">
      <div class="column is-three-quarters">
        <article v-for="article in articles" class="box">
          <div class="media">
            <div class="media-left">
              <p>Author :</p>
              <p>{{article.author.username}}</p>
            </div>
            <div class="media-content">
              <div class="content">
                <p class="title is-4">{{article.title}}</p>
                <p class="subtitle is-6">{{article.content}}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main',
  data () {
    return {
      msg: 'Welcome to myCMS',
      articles: []
    }
  },
  methods: {
    getArticles() {
      let self=this
      axios.get('http://localhost:3000/api/article')
        .then((res)=> {
          self.articles = res.data
        })
        .catch((err)=> {
          alert('Server Error')
        })
    }
  },
  mounted() {
    this.getArticles()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-three-quarters {
  margin: auto;
}
</style>
