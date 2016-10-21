import Ember from 'ember';

export default Ember.Controller.extend({
  list: null,
  newName: '',
  newCrew: '',
  newBroiler: '',
  newBreakfast: '',
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
      this.set('newBreakfast', '');
      this.set('idToChange', null)
      this.set('add', true);
    },

    editParticipant(participant) {
      this.set('newName', participant.get('name'));
      this.set('newCrew', participant.get('crew'));
      this.set('newBroiler', participant.get('broiler'));
      this.set('newBreakfast', participant.get('breakfast'));
      this.set('idToChange', participant.get('id'))
      this.set('add', false);
      Ember.$('html, body').animate({
            scrollTop: $('#newName').offset().top
        }, 'slow', function() { 
            $('#newName').focus(); 
        });
    },
  }
});
