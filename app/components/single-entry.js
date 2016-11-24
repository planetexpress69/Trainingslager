import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  isEditing: false,
  number: Ember.computed('index', function() {
    return this.get('index') + 1;
  }),

  disabled: Ember.computed('isDirty', function() {
    return this.get('isDirty') == true ? 'disabled' : '';
  }),
  
  actions: {
    saveParticipant: function() {
      this.toggleProperty('isEditing');
      this.sendAction('update', this.attrs);
    },
    deleteParticipant: function(id) {
      this.sendAction("delete", id);
    },
    cancelEditing: function() {
      this.toggleProperty('isEditing');
      this.sendAction('cancelEditing');
    },
    editParticipant: function() {
      this.toggleProperty('isEditing');
    },
    update() {
      this.toggleProperty('isEditing');
      this.sendAction("update");
    } 
  },
});
