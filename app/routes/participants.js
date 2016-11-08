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
      var breakfastSum = 0;
      foo.forEach(function(item){
        sum += item.get('broiler');
        breakfastSum += item.get('breakfast'); 
      });
      _this.get('controller').set('sum', sum);
      _this.get('controller').set('breakfastSum', breakfastSum);
    });
  },

  actions: {

    changeParticipant(id) {
      var _this = this;
      this.store.findRecord('participant', id, { backgroundReload: true })
        .then(function (participantToChange) {
          participantToChange.set('name', _this.get('controller').get('newName'));
          participantToChange.set('crew', _this.get('controller').get('newCrew'));
          participantToChange.set('broiler', _this.get('controller').get('newBroiler'));
          participantToChange.set('breakfast', _this.get('controller').get('newBreakfast'));
          participantToChange.save().then(function(/* f */) {
            //Ember.Logger.info(f);
            
          _this.get('controller').set('newName', '');
          _this.get('controller').set('newCrew', '');
          _this.get('controller').set('newBroiler', '');
          _this.get('controller').set('newBreakfast', '');
          _this.get('controller').set('idToChange', null);
          _this.get('controller').set('add', true);
          _this.recalc();
          });
        });
    },

    deleteParticipant(participant) {
      var _this = this;

      this.get('store').find('participant', participant.id)
        .then(participant2 => participant2.destroyRecord())
        .then(() => this.recalc());
      //transitionTo('participants')
      /*
      this.store.findRecord('participant', participant.id)
        .then(function (resource) {
          resource.deleteRecord();
          resource.get('isDeleted'); // => true
          resource.save().then(function(f) {
            _this.recalc();
          });
        });
        */
    },

    createParticipant() {
      var _this = this;
      //let route = this,
      let controller = this.get('controller');

      let participant = this.store.createRecord('participant', {
        name: controller.get('newName'),
        crew: controller.get('newCrew'),
        broiler: controller.get('newBroiler'),
        breakfast: controller.get('newBreakfast')

      });
      participant.save().then(function () {
        controller.set('newName', '');
        controller.set('newCrew', '');
        controller.set('newBroiler', '');
        controller.set('newBreakfast', '');
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
