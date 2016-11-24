import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  actions: {
    update(attrs) {
      this.sendAction("update", attrs);
    },
    delete(id) {
      this.sendAction("delete", id);
    },
    cancelEditing() {
      Ember.Logger.info("O");
      this.sendAction("cancelEditing");
    }  
  },
});
