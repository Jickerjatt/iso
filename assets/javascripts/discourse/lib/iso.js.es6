import { ajax } from 'discourse/lib/ajax'

export default Ember.Object.create({

  callback(data) {
    this.postFor(data.id).setProperties({ isos: data.isos }) // TODO: figure out what this is
    this.get(`widgets.${data.id}`).scheduleRerender()
  },

  postFor(id) {
    return _.find(this.get('topicController.model.postStream.posts'), p => { return p.id == id })
  }

  // TODO: get the topic, rather than the post
})
