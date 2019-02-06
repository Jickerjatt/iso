import { withPluginApi } from 'discourse/lib/plugin-api'
import TopicRoute from 'discourse/routes/topic'

function initializePlugin(api) {
let topicController;

  TopicRoute.on("setupTopicController", function(event) {
    topicController = event.controller
  })

  api.addPostMenuButton('iso', attrs => {

    return {
      action: 'clickIso',
      icon: topicController.get("model.postStream.hasNoFilters") ? 'user' : 'users',
      title: topicController.get("model.postStream.hasNoFilters") ? 'iso.title' : 'unisoed.title',
      position: 'first'
    }
  })

  api.attachWidgetAction('post-menu', 'clickIso', function() {
      if(topicController.get("model.postStream.hasNoFilters")) {
        const postStream = topicController.get("model.postStream");
        postStream.toggleParticipant(this.attrs.username)
          .then(() => postStream.refresh())
          .then(() => topicController.send("jumpToPost", this.attrs.post_number));
      }
      else {
        const postStream = topicController.get("model.postStream");
        postStream.cancelFilter();
        postStream.refresh()
          .then(() => topicController.send("jumpToPost", this.attrs.post_number));
      }
  })
}

export default {
  name: 'iso-button',
  initialize: function() {
    withPluginApi('0.8.6', api => initializePlugin(api))
  }
}
