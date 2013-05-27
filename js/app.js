App = Ember.Application.create();

// Tweet class
App.Tweet = Ember.Object.extend({ avatar: null, screen_name: null, text: null, date: null });

// Controller
App.tweetsController = Ember.ArrayController.create({ content: [], username: '', loadTweets: function () {
    var me = this;
    var username = me.get("username");

    if (username) {
        var url = 'http://api.twitter.com/1/statuses/user_timeline.json'
        url += '?screen_name=%@&callback=?'.fmt(me.get("username"));

        $.getJSON(url, function (data) {
            me.set('content', []);
            $(data).each(function (index, value) {
                var t = App.Tweet.create({
                    avatar: value.user.profile_image_url,
                    screen_name: value.user.screen_name,
                    text: value.text,
                    date: value.created_at });
                me.pushObject(t);
            })
        });

    } } });

// Textfield
App.SearchTextField = Ember.TextField.extend({
    insertNewline: function(){
        App.tweetsController.loadTweets();
    }
});

// Routing
App.Router.map(function() {
    this.route("tweets"); // short for: this.route("tweets", { path: "/tweets" });
    this.route("about");
});

