import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('participant', { reload: true });
  },

  setupController(controller, model) {
    Ember.Logger.info("setupController");
    controller.set('list', model);
    controller.recalc();
  }

});
