import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'http://www.teambender.de',
  namespace: 'htl/api/v1',

  urlForFindRecord(id, modelName, snapshot) {
    if (modelName === 'participant') {
      return this.get('host') + '/' + this.get('namespace') + '/' + modelName + '/' + id + '?id=' + id;
    }
    return this._buildURL(modelName, id);
  },

  urlForUpdateRecord(id, modelName, snapshot) {
    if (modelName === 'participant') {
      return this.get('host') + '/' + this.get('namespace') + '/' + modelName + '/' + id + '?id=' + id;
    }
    return this._buildURL(modelName, id);
  },

   urlForDeleteRecord(id, modelName, snapshot) {
     if (modelName === 'participant') {
      return this.get('host') + '/' + this.get('namespace') + '/' + modelName + '/' + id + '?id=' + id;
    }
    return this._buildURL(modelName, id);
  },

  shouldReloadAll: function(store, snapshot) {
    return true;
  },

  

  
});
