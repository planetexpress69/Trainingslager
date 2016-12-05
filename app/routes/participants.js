import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('participant', { reload: true });
  },

  setupController(controller, model) {
    Ember.Logger.info("setupController");
    controller.set('list', model);
    controller.recalc();
  },

  //actions: {
  //  willTransition(transition) {
  //    Ember.Logger.info("willTransition")
  //    return true;
      //if (this.controller.get('userHasEnteredData') &&
      //    !confirm('Are you sure you want to abandon progress?')) {
      //  transition.abort();
      //} else {
        // Bubble the `willTransition` action so that
        // parent routes can decide whether or not to abort.
      //  return true;
      //}
  //  }
  // }

});
