<template>
  <div id="app">
    <!-- Nav Bar -->
    <nav class="nav-extended">
      <div class="nav-wrapper red">
        <a href="#" class="brand-logo">{{ "" + title }}</a>
        <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
        <ul class="side-nav" id="mobile-demo">
          <li v-for="menu in menus">
            <a :href="menu.link">{{ menu.text }}</a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Header -->
    <div class="parallax-container">
      <div class="section" id="header_card_container">
        <div class="card horizontal" id="header_card">
          <div class="card-stacked">
            <div class="card-content">
              <header-card-content />
            </div>
          </div>
        </div>
      </div>
      <div class="parallax"><img :src="header_image" alt="Parallax Image"></div>
    </div>

    <!-- List -->
    <div class="container">
      <div class="row">
        <div class="col s12 m6" v-for="(item, index) in items">
          <div class="small card hoverable horizontal">
            <div class="card-image hide-on-small-only">
              <img class="itempic" referrerpolicy="no-referrer" :src="item.pic">
            </div>
            <div class="card-stacked">

              <div class="card-content">
              <span class="card-title grey-text text-darken-4">
                {{ item.title }}
              </span>
                <p class="grey-text text-darken-4">{{ item.subtitle }}</p>
                <span class="grey-text text-darken-5">更新时间：{{ new Date(item.lastUpdate).toLocaleString() }}</span>
                <div class="card-action">
                  <a class="waves-effect waves-ripple btn-flat right grey-text text-darken-4" v-if="item.lastUpdate > item.lastCheck"
                     v-on:click="check(index, Date.parse(new Date()))"
                  >
                    <i class="material-icons left">hourglass_empty</i>本周未观看
                  </a>
                  <a class="waves-effect waves-ripple btn-flat right grey-text text-darken-4" v-else
                     v-on:click="check(index, 0)"
                  >
                    <i class="material-icons left">check</i>本周已观看
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--<ul class="pagination">-->
      <!--<li :class="(current_index == 0) ? 'disabled' : 'waves-effect'"><a v-on:click="prev_page"><i class="material-icons">chevron_left</i></a></li>-->
      <!--<li :class="(index == current_index) ? 'active' : 'waves-effect'" v-for="index in max_index"><a v-on:click="choose_page($index)">{{ index + 1 }}</a></li>-->
      <!--<li :class="(current_index == max_index - 1) ? 'disabled' : 'waves-effect'"><a v-on:click="next_page"><i class="material-icons">chevron_right</i></a></li>-->
    <!--</ul>-->
    <AddButton :items=items />

    <!-- Footer -->
    <footer class="page-footer">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">其它信息</h5>
            <p class="grey-text text-lighten-4">Created by {{ author }} <a :href="'https://github.com/' + author_github_name" class="grey-text text-lighten-1">@{{ author_github_name }}</a> on September 26, 2015</p>
          </div>
          <div class="col l4 offset-l2 s12">
            <h5 class="white-text">相关链接</h5>
            <ul><li v-for="menu in menus"><a class="grey-text text-lighten-3" :href="menu.link">{{ menu.text }}</a></li></ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="container">© 2017 {{ copyright_author }}</div>
      </div>
    </footer>

  </div>
</template>

<script>
  import HeaderCardContent from './components/HeaderCardContent'
  import AddButton from './components/AddButton'
  import RSSParser from 'rss-parser'
  export default {
    name: 'app',
    components: {
      HeaderCardContent,
      AddButton
    },
    el: '#app',
    mounted() {
      if (localStorage.getItem('items')) {
        this.items = JSON.parse(localStorage.getItem('items'))
      } else {
        localStorage.setItem('items', JSON.stringify(
                [
                  {
                    id: '25733', title: '青春期笨蛋不做兔女郎学姐的梦', type: 'bilibili',
                    intro: '思春期症候群——这是一种只发生在易敏感和不稳定的青春期的、不可思议的现象。例如，在梓川咲太面前出现的野生兔女郎。她的真实身份是高中高年级学生，明星活动休止的女演员樱岛麻衣。她迷人的身姿，不知为何在周围的人眼里看不出来。咲太决定解开这一谜题。在于麻衣一起度过的时间里，咲太知道了她秘密的想法……女主人公们一个接一个地出现在咲太的周围，她们都有着“青春期症候群”。在天空和大海都很闪耀的小镇上，开始了令人激动的故事。。',
                    subtitle: '第11话 枫任务',
                    lastUpdate: Date.parse("Thu, 13 Dec 2018 02:50:00 GMT"),
                    lastCheck: 0,
                    link: 'https://bangumi.bilibili.com/anime/25733/',
                    pic: 'https://i0.hdslb.com/bfs/bangumi/1cc333ff578e5ea9fded7e454953a4e2291440c2.png@450w_600h.webp',
                  }
                ])
        )
        this.items = JSON.parse(localStorage.getItem('items'))
      }
      this.items.forEach((item) => {
        let url = '';
        switch (item.type) {
          case 'bilibili': url = `https://rsshub.app/bilibili/bangumi/${item.id}`;break;
          case  'zimuzu': url = `https://rsshub.app/zimuzu/resource/${item.id}`;break;
        }
        new RSSParser().parseURL(url, (err, feed) => {
          item.subtitle = feed.items[0].title
          item.lastUpdate = Date.parse(feed.items[0].pubDate)
        })
      })
    },
    watch: {
      items: {
        handler() {
          localStorage.setItem('items', JSON.stringify(this.items))
        }
      }
    },
    data: function() {
      return {
        title: '你瞅啥',
        author: 'undownding',
        author_github_name: 'undownding',
        copyright_author: '赵日天(@undownding)',

        header_image: 'images/chino_background.webp',

        menus: [
          {text: '作者微博', link: 'https://weibo.com/neo4026/' }
        ],

        items: [],
        current_index: 0,
        max_index: 1,
        page_limit: 12,
        page_items: [0, 1]
      }
    },
    ready: function() {
      this.max_index = Math.ceil(this.items.length / this.page_limit);
      this.choose_page(this.current_index);
    },
    methods: {
      add: function() {
        // console.log("add")
      },
      check: function(index, date) {
        this.items[index].lastCheck = date
      },
      slice_page_items: function() {
        let start = this.current_index * this.page_limit;
        let end = (this.current_index + 1) * this.page_limit
        if (end > this.items.length) {
          end = this.items.length;
        }
        this.page_items = this.items.slice(start, end);
      },
      choose_page: function(choice) {
        this.current_index = choice;
        this.slice_page_items();
      },
      prev_page : function() {
        if (this.current_index != 0) {
          this.choose_page(this.current_index - 1);
        }
      },
      next_page : function() {
        if (this.current_index != this.max_index - 1) {
          this.choose_page(this.current_index + 1);
        }
      }
    }
  }
</script>

<style>
  #header_card {
    margin-left: 24px;
    margin-right: 24px;
    max-width: 800px;
    margin-top: 36px;
    margin-bottom: 36px
  }
  #header_card_container {
    margin-top: 280px
  }
  .itempic {
    min-width: 220px;
    min-height: 180px;
    background-position: center center;
    background-repeat: no-repeat;
    -webkit-background-size:cover;
    -moz-background-size:cover;
    background-size:cover
  }
  .container {
    margin-top: 16px
  }
  .finish-icon-container {
    font-size: 1rem;
    display: -webkit-box;
    display: box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    box-align: center;
    -webkit-align-items: center;
    align-items: center
  }
  .finish-icon-text {
    margin-right: 8px
  }
  .finish-icon {
    vertical-align: text-bottom
  }

  .card-content {
    max-width: 80%;
  }

</style>
