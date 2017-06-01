<template>
  <div class="article-list-page">
    <dl class="article-list">
      <dd v-for="article in articleList" class="article-item" :key="article.id">
        <article class="article-container">
          <img src="https://avatars3.githubusercontent.com/u/8335856?v=3&s=240" alt="avatar">
          <h2 class="article-title">
            <router-link class="article-link" :to="'/article/' + article.number">{{ article.title }}</router-link>
          </h2>
          <blockquote class="article-quote" v-html="article.quote"></blockquote>
          <article-pieces :articleInfo="article"></article-pieces>
        </article>
      </dd>
    </dl>
    <button v-show="articleList.length" class="article-loading-more" type="button" :disabled="!hasMoreArticle" @click="getArticleList">加载更多</button>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import marked from 'marked'
import ArticlePieces from './ArticlePieces'

const articlePagination = {
  page: 1,
  size: 5
}

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
      hasMoreArticle: true
    }
  },
  created () {
    if (!this.articleList.length) {
      this.getArticleList()
    }
  },
  methods: {
    getArticleList () {
      getArticleList(articlePagination).then(response => {
        const articleList = []
        response.forEach(article => articleList.push(filterArticleInfo(article)))
        this.$store.commit('concatArticleList', { list: articleList })

        if (response.length < articlePagination.size) {
          this.hasMoreArticle = false
        } else {
          articlePagination.page += 1
        }
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
    labels: article.labels,
    comments: article.comments
  }
}
</script>

<style scoped>
.article-list {
  font-size: 14px;
}

.article-item {
  padding: .5em;
  margin: 1em 0;
  background-color: rgba(255, 255, 255, .8);
}

.article-item:hover {
  box-shadow: 0 3px 5px rgba(0, 0, 0, .3);
}

.article-container {
  overflow: hidden;
}

.article-title {
  margin: 0;
  font-size: 16px;
  color: #404040;
}

.article-link {
  text-decoration: none;
  transition: margin-left .3s;
}

.article-link:hover {
  margin-left: .5em;
}

.article-quote {
  overflow: hidden;
  display: -webkit-box;
  height: 6em;
  margin: 0;
  text-overflow: ellipsis;
  color: #5a5a5a;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.article-loading-more {
  width: 100%;
  font-size: 14px;
  line-height: 2.2;
  color: #919191;
  background-color: #e9e9e9;
}
</style>


<style>
.article-list-page .article-container img {
  float: left;
  width: 12.5em;
  height: 10em;
  margin-right: 1em;
  object-fit: cover;
}

.article-list-page .article-quote p {
  margin: .5em 0;
}

.article-list-page .article-pieces {
  margin-top: .5em;
}
</style>
