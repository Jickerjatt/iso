import { withPluginApi } from 'discourse/lib/plugin-api'
import TopicRoute from 'discourse/routes/topic'
import ISO from '../lib/iso'

function initializePlugin(api) {

  TopicRoute.on("setupTopicController", function(event) {
    let controller = event.controller
    ISO.set('topicController', controller)
    controller.messageBus.subscribe(`/iso/topics/${controller.model.id}`, (data) => { ISO.callback(data) })
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
    alert(this.attrs.username);
  })
}

export default {
  name: 'iso-button',
  initialize: function() {
    withPluginApi('0.8.6', api => initializePlugin(api))
  }
}
