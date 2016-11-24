import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    var store = this.get('store');
    var newParticipant = store.createRecord('participant', {
      name: "Bootsname",
      crew: "Crew",
      broiler: 0,
      breakfast: 0
    });
    return newParticipant;
  }
});
