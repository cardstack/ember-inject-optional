import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import injectOptional from 'ember-inject-optional';

moduleForComponent('models', 'Integration | Models', {
  integration: true,
  beforeEach: function() {
    this.register('service:artificial-brain', Ember.Service.extend({
      disdainForHumans: -1
    }));
    this.register('service:consumer', Ember.Service.extend({
      artificialBrain: injectOptional.service(),
      otherName: injectOptional.service('artificial-brain'),
      missingService: injectOptional.service(),
      otherMissingService: injectOptional.service('not-a-thing')
    }));
    this.inject.service('consumer');
  }
});

test('it finds a service using default name', function(assert) {
  assert.equal(this.get('consumer.artificialBrain.disdainForHumans'), -1);
});

test('it finds a service using a provided name', function(assert) {
  assert.equal(this.get('consumer.otherName.disdainForHumans'), -1);
});

test('it tolerates missing service with default name', function(assert) {
  assert.ok(!this.get('consumer.missingService'));
});

test('it tolerates missing service with provided name', function(assert) {
  assert.ok(!this.get('consumer.otherMissingService'));
});
