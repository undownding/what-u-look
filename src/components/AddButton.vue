<template>
    <div>
        <div class="fixed-action-btn">
            <a data-target="modal_add" class="btn-floating btn-large waves-effect waves-light red right modal-trigger" href="#modal_add">
                <i class="material-icons">add</i>
            </a>
        </div>
        <div id="modal_add" class="modal">
            <div class="modal-content">
                <h4>添加关注剧集</h4>
                <br>
                <div class="input-field col s12">
                    <input id="keyword" type="text" class="validate" v-model="keyword">
                    <label for="keyword">请输入番剧/美剧名字或关键词</label>
                </div>
            </div>
            <div class="modal-footer" v-on:click="search(keyword)">
                <a href="#!" class="waves-effect waves-green btn-flat modal-close">确定</a>
            </div>
        </div>
    </div>
</template>
<script>
    import RSSParser from 'rss-parser'
    export default {
        name: "AddButton",
        props:['items'],
        data: function() {
            return {
                keyword: "",
            }
        },
        methods: {
            search: function (keyword) {
                this.$http.post(
                    '/bilibili/searchengine',
                    {
                        keyword: encodeURI(keyword),
                        main_ver: "v3",
                        order: "totalrank",
                        page: 1,
                        pagesize: 20,
                        platform: "h5",
                        search_type: "bangumi",
                    }
                )
                    .then(response => response.json())
                    .then(json => {
                        if (json.numResults == 0) {
                            this.$http.get(
                                '/zimuzu/api?keyword=' + keyword
                            )
                                .then(response => response.json())
                                .then(json => this.zimuzu2rss(json))
                        } else {
                            this.bili2rss(json)
                        }
                    })
            },
            bili2rss: function (json) {
                new RSSParser().parseURL('https://rsshub.app/bilibili/bangumi/' + json.result[0].season_id, (err, feed) => {
                    const item = {
                        id: json.result[0].season_id,
                        title: feed.title,
                        type: 'bilibili',
                        intro: feed.description,
                        subtitle: feed.items[0].title,
                        lastUpdate: Date.parse(feed.items[0].pubDate),
                        lastCheck: 0,
                        link: feed.link,
                        pic: json.result[0].cover
                    };
                    this.items.push(item)
                })
            },
            zimuzu2rss: function (json) {

            }
        }
    }
</script>