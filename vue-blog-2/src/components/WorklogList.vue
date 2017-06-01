<template>
  <div class="worklog-timeline">
    <ul class="timeline-list">
      <li v-for="(timeline, index) in sortTimelineYear(timelines)" :key="timeline.year">
        <dl class="timeline-bar" :style="{ color: timeline.color }">
          <dt class="timeline-year" :style="{ 'background-color': timeline.color }">{{ timeline.year }}</dt>
          <dd class="timeline-month" v-for="(worklog, index) in timeline.worklog" :class="{ active: timeline.activeIndex === index }" :style="[ timeline.activeIndex === index ? worklog.activeStyle : '' ]" @mouseover="toggleTimelineMonth(timeline, index)">
            <router-link class="timeline-month-link" :to="'/worklog/' + worklog.number" :style="{ color: timeline.activeIndex === index ? '#fff' : timeline.color }">{{ worklog.month }}</router-link>
          </dd>
        </dl>
        <article class="timeline-article">
          <blockquote v-for="(worklog, index) in timeline.worklog" v-html="worklog.quote" class="timeline-quote" :key="worklog.id" :class="{ active: timeline.activeIndex === index }"></blockquote>
        </article>
      </li>
    </ul>
  </div>
</template>

<script>
import marked from 'marked'
import { getWorklogList } from '@/api'

const worklogPagination = {
  page: 1,
  size: 24
}

export default {
  data () {
    return {
      timelines: {},
      hasMoreWorklog: true
    }
  },
  computed: {
    worklogList () {
      return this.$store.state.worklogList
    }
  },
  created () {
    if (this.worklogList.length) {
      addTimelineInfo(this)
    } else {
      this.getWorklogList()
    }
  },
  methods: {
    getWorklogList () {
      getWorklogList(worklogPagination).then(response => {
        const worklogList = []
        response.forEach(worklog => worklogList.push(filterWorklogInfo(worklog)))
        this.$store.commit('concatWorklogList', { list: worklogList })

        addTimelineInfo(this, worklogList)

        if (response.length < worklogPagination.size) {
          this.hasMoreWorklog = false
        } else {
          worklogPagination.page += 1
        }
      })
    },
    sortTimelineYear (timelines) {
      const timelineList = []
      Object.keys(timelines).forEach(year => {
        timelineList.unshift(timelines[year])
      })
      return timelineList
    },
    toggleTimelineMonth (timeline, index) {
      timeline.activeIndex = index
    }
  }
}

const quote = '<p>那时候，我以为爱的是生活，也算懂得，什么适合什么不可，最近还是一样努力着，配合你的性格，你的追求者你你的坎坷，为看的测。算一算，虚度了多少个年头，仿佛足够写一篇说爱的小说。</p>'

function filterWorklogInfo (worklog) {
  const color = '#' + worklog.labels[0].color
  const sections = marked(worklog.body).split(/<!--\s*\w+\s*-->/g)
  return {
    id: worklog.id,
    number: worklog.number,
    year: worklog.labels[0].name,
    color: color,
    month: parseInt(worklog.title, 10),
    quote: sections.length > 1 ? sections[0].trim() : quote,
    body: sections.length > 1 ? sections[1].trim() : quote,
    activeStyle: {
      color,
      'border-color': color,
      'background-color': color
    }
  }
}

function addTimelineInfo (vm, list) {
  if (!list) list = vm.worklogList
  list.forEach(worklog => {
    if (vm.timelines[worklog.year]) {
      vm.timelines[worklog.year].worklog.unshift(worklog)
    } else {
      vm.$set(vm.timelines, worklog.year, {
        activeIndex: 0,
        color: worklog.color,
        year: worklog.year,
        worklog: [worklog]
      })
    }
  })
}
</script>


<style scoped>
.worklog-timeline {
  padding: 2em;
  background-color: rgba(255, 255, 255, .8);
}

.timeline-list {
  padding-left: 0;
  list-style: none;
}

.timeline-bar {
  overflow: hidden;
  position: relative;
}

.timeline-bar::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 50%;
  right: 0;
  left: 3em;
  border-top: 1px solid currentColor;
}

.timeline-year {
  float: left;
  width: 3em;
  line-height: 3em;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  background-color: #0096ff;
}

.timeline-month {
  float: left;
  position: relative;
  width: 2em;
  height: 2em;
  margin-left: 2.5em;
  margin-top: 1em;
  font-size: 12px;
  line-height: 1.9em;
  text-align: center;
  border: 1px solid currentColor;
  border-radius: 50%;
  color: currentColor;
  background-color: #fff;
  cursor: pointer;
}

.timeline-month::after {
  content: '';
  display: none;
  position: absolute;
  z-index: -1;
  bottom: -1em;
  left: 48%;
  height: 1em;
  border-left: 1px solid currentColor;
}

.timeline-month.active::after {
  display: block;
}

.timeline-month-link {
  display: block;
  text-decoration: none;
}

.timeline-article {
  position: relative;
  top: -1.2em;
  margin-left: 3em;
  font-size: 14px;
  border: 1px solid #e9e9e9;
  border-radius: .5em;
}

.timeline-quote {
  display: none;
  margin: .5em 1em;
}

.timeline-quote.active {
  display: block;
}
</style>
