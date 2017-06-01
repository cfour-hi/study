<template>
  <section class="article-page">
    <article class="article-container">
      <h2 class="article-title">{{ articleInfo.title }}</h2>
      <article-pieces :articleInfo="articleInfo"></article-pieces>
      <i class="fa fa-quote-left fa-3x fa-pull-left fa-border" aria-hidden="true"></i>
      <blockquote class="article-quote" v-html="articleInfo.quote"></blockquote>
      <div v-html="articleInfo.body" class="article-content"></div>
    </article>
  </section>
</template>

<script>
import marked from 'marked'
import ArticlePieces from './ArticlePieces'
import { getArticleByNumber } from '@/api'

export default {
  components: {
    ArticlePieces
  },
  computed: {
    articleList () {
      return this.$store.state.articleList
    }
  },
  data () {
    return {
      articleInfo: {}
    }
  },
  created () {
    if (this.articleList.length) {
      this.articleInfo = this.articleList.find(article => article.number === +this.$route.params.number)
    } else {
      getArticleByNumber(this.$route.params.number).then(response => {
        this.articleInfo = filterArticleInfo(response)
      })
    }
  }
}

function filterArticleInfo (article) {
  const sections = marked(article.body).split(/<!--\s*\w+\s*-->/g)
  return {
    id: article.id,
    number: article.number,
    title: article.title,
    createdAt: article.created_at.split('T')[0],
    quote: sections[0].trim(),
    body: sections[1].trim(),
    labels: article.labels
  }
}
</script>


<style scoped>
.article-container {
  padding: 2em;
  font-size: 14px;
  color: #404040;
  background-color: rgba(255, 255, 255, .8);
}

.article-title {
  font-size: 18px;
  text-align: center;
}

.article-quote {
  min-height: 6em;
  margin: 0;
  border-bottom: 3px solid #f5f5f5;
}
</style>

<style>
.article-page .article-pieces {
  margin-bottom: 1.2em;
  text-align: center;
}
</style>
