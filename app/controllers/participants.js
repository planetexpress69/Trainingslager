import Ember from 'ember';

export default Ember.Controller.extend({

  list: null,
  idToDelete: null,
  isDirty: false,

  disabled: Ember.computed('isDirty', function () {
    return this.get('isDirty') === true ? 'disabled' : '';
  }),

  recalc() {
    var sum = 0;
    var breakfastSum = 0;
    var _this = this;
    this.get("list.content").forEach(function (item) {
      sum += parseInt(item._data.broiler);
      breakfastSum += parseInt(item._data.breakfast);
    });
    _this.set('sum', sum);
    _this.set('breakfastSum', breakfastSum);
    Ember.$(document).attr('title', 'HTL2016: ' + this.get('list.content.length') + ' Boote');
  },

  getRidOf(id) {
    var store = this.get('store');
    var _this = this;
    store.findRecord('participant', id, { reload: true, backgroundReload: false }).then(function (participant) {
      participant.destroyRecord().then(function () {
        store.findAll('participant', { reload: true }).then(function (list) {
          _this.set('list', list);
          Ember.$(document).attr('title', 'HTL2016: ' + list.content.length + ' Boote');
          var sum = 0;
          var breakfastSum = 0;
          list.forEach(function (item) {
            sum += parseInt(item.get('broiler'));
            breakfastSum += parseInt(item.get('breakfast'));
          });
          _this.set('sum', sum);
          _this.set('breakfastSum', breakfastSum);
        })
      });
    });
  },

  actions: {

    openModal(name) {
      $('.ui.' + name + '.modal').modal('show');
    },

    approveModal(element, component) {
      //alert('approve ' + component.get('name'));
      this.getRidOf(this.get('idToDelete'));
      return true;
    },

    denyModal(element, component) {
      //alert('deny ' + component.get('name'));
      this.set('idToDelete', null);
      return true;
    },

    addNew() {
      this.set('isDirty', true);
      this.transitionToRoute('participants.new');
      return;
      var _this = this;
      Ember.Logger.info("Add new record!");
      var store = this.get('store');
      var record = store.createRecord('participant', {
        name: 'Bootsname',
        crew: 'Crewliste',
        broiler: 0,
        breakfast: 0
      });
      record.save().then(function (result) {
        Ember.Logger.info(result)
        $("#down").get(0).scrollIntoView();
        var domId = "#edit-" + result.id;
        var domId2 = "#name-" + result.id;
        Ember.Logger.info(domId);
        Ember.Logger.info($(domId)[0]);
        setTimeout(function () {
          $(domId)[0].click();
          $('#activeinput')[0].focus();
          _this.set('isDirty', true);
        }, 600);

      });
    },

    update(attrs) {
      Ember.Logger.info("SAVE! " + attrs.id.value);
      var id = attrs.id.value;
      var name = attrs.name.value;
      var broiler = attrs.broiler.value;
      var breakfast = attrs.breakfast.value;
      var store = this.get('store');
      var _this = this;
      store.findRecord('participant', id, { reload: true, backgroundReload: false }).then(function (participant) {
        participant.name = name;
        participant.broiler = broiler;
        participant.breakfast = breakfast;
        participant.save().then(function (result) {
          // result is the changed record by the way...
          store.findAll('participant', { reload: true }).then(function (list) {
            _this.set('list', list);
            var sum = 0;
            var breakfastSum = 0;
            list.forEach(function (item) {
              sum += parseInt(item.get('broiler'));
              breakfastSum += parseInt(item.get('breakfast'));
            });
            _this.set('sum', sum);
            _this.set('breakfastSum', breakfastSum);
            _this.set('isDirty', false);
          })
        });
      });
    },

    cancelEditing() {
      Ember.Logger.info("Cancel!");
      this.set('isDirty', false);
    },

    // this is the up-bubbled delete method
    delete(id) {
      // we save the id to delete...
      this.set('idToDelete', id);
      // and bring up a modal dialog...
      var name = 'profile';
      $('.ui.' + name + '.modal').modal('show');
    },
  }
});
