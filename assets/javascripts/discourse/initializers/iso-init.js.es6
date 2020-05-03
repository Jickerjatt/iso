import { withPluginApi } from 'discourse/lib/plugin-api'
import TopicRoute from 'discourse/routes/topic'

function initializePlugin(api) {
let topicController;

  TopicRoute.reopen({
    setupController(controller, model) {
      this._super(controller, model);
      topicController = controller;
    }
  });

  api.addPostMenuButton('iso', attrs => {

    return {
      action: 'clickIso',
      icon: topicController.get("model.postStream.hasNoFilters") ? 'user' : 'users',
      title: topicController.get("model.postStream.hasNoFilters") ? 'iso.title' : 'unisoed.title',
      position: 'second'
    }
  })

  api.attachWidgetAction('post-menu', 'clickIso', function() {
      if(topicController.get("model.postStream.hasNoFilters")) {
        const postStream = topicController.get("model.postStream");
        postStream.toggleParticipant(this.attrs.username)
          .then(() => postStream.refresh())
          .then(() => topicController.send("jumpToPostId", this.attrs.id));
      }
      else {
        const postStream = topicController.get("model.postStream");
        postStream.cancelFilter();
        postStream.refresh()
          .then(() => topicController.send("jumpToPostId", this.attrs.id));
      }
  })
}

export default {
  name: 'iso-button',
  initialize: function() {
    withPluginApi('0.8.6', api => initializePlugin(api))
  }
}
