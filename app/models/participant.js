import DS from 'ember-data';

export default DS.Model.extend({
  name:         DS.attr('string'),
  crew:         DS.attr('string'),
  broiler:      DS.attr('number'),
});