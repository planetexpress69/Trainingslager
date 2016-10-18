import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    
    //just wrap to meet the JSON API's requirements
    var tamedPayload = {};
    tamedPayload["data"] = payload;

    return this._super(store, primaryModelClass, tamedPayload, id, requestType);
  },

});
