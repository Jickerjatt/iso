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
      icon: 'smile-o',
      title: 'ISO',
      position: 'first'
    }
  })

  api.attachWidgetAction('post-menu', 'clickIso', function() {
    topicController.send("toggleParticipantUsername", this.attrs.username);
  })
}

export default {
  name: 'iso-button',
  initialize: function() {
    withPluginApi('0.8.6', api => initializePlugin(api))
  }
}
