import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('participant', { reload: true });
  },

  afterModel() {
    Ember.$(document).attr('title', 'HTL');
  },

  recalc() {
    var _this = this;
    this.store.findAll('participant', { reload: true }).then(function(foo) {
      var sum = 0;
      foo.forEach(function(item){
        sum += item.get('broiler');
      });
      _this.get('controller').set('sum', sum);
    })
  },

  actions: {

    changeParticipant(id) {
      var _this = this;
      this.store.findRecord('participant', id, { backgroundReload: true })
        .then(function (participantToChange) {
          participantToChange.set('name', _this.get('controller').get('newName'));
          participantToChange.set('crew', _this.get('controller').get('newCrew'));
          participantToChange.set('broiler', _this.get('controller').get('newBroiler'));
          participantToChange.save().then(function(f) {
            //Ember.Logger.info(f);
            
          _this.get('controller').set('newName', '');
          _this.get('controller').set('newCrew', '');
          _this.get('controller').set('newBroiler', '');
          _this.get('controller').set('newName', '');
          _this.get('controller').set('idToChange', null);
          _this.get('controller').set('add', true);
          _this.recalc();
          });
        });
    },

    deleteParticipant(participant) {
      var _this = this;
      this.store.findRecord('participant', participant.id, { backgroundReload: true })
        .then(function (resource) {
          resource.deleteRecord();
          resource.get('isDeleted'); // => true
          resource.save().then(function(f) {
            _this.recalc();
          });
        });
    },

    createParticipant() {
      var _this = this;
      let route = this,
        controller = this.get('controller');

      let participant = this.store.createRecord('participant', {
        name: controller.get('newName'),
        crew: controller.get('newCrew'),
        broiler: controller.get('newBroiler'),

      });
      participant.save().then(function () {
        controller.set('newName', '');
        controller.set('newCrew', '');
        controller.set('newBroiler', '');
        //route.transitionTo('bands.band.songs', band);
        _this.recalc();
      })
      ['catch'](function (error) {
        console.error(error);
      });
    }
  },

  setupController(controller, model) {
    controller.set('list', model);
    this.recalc();
  }

});
