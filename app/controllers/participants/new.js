import Ember from 'ember';

export default Ember.Controller.extend({

  participantsController: Ember.inject.controller('participants'),

  init() {
    this.get('participantsController').set('isDirty', true);
  },
  
  actions: {
    saveAndGetBack() {
      var model = this.get("model");
      var store = this.get('store');
      var _this = this;
      model.save().then(function(resp){
        store.findAll('participant').then(function(list) {
          _this.get('participantsController').set('isDirty', false);
          _this.get('participantsController').recalc();
          _this.transitionToRoute('participants');
        });
      });
    }
  }
});
