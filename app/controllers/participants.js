import Ember from 'ember';

export default Ember.Controller.extend({
  list: null,
  newName: '',
  newCrew: '',
  newBroiler: '',
  idToChange: null,
  add: true,
  sum: 0,
  disabled: Ember.computed('newName', function() {
    return Ember.isEmpty(this.get('newName'));
  }),
  

  actions: {
    cancel() {
      this.set('newName', '');
      this.set('newCrew', '');
      this.set('newBroiler', '');
      this.set('idToChange', null)
      this.set('add', true);
    },

    editParticipant(participant) {
      this.set('newName', participant.get('name'));
      this.set('newCrew', participant.get('crew'));
      this.set('newBroiler', participant.get('broiler'));
      this.set('idToChange', participant.get('id'))
      this.set('add', false);
    },
  }
});
