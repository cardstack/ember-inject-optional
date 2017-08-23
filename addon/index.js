import Ember from 'ember';
const { computed, getOwner, String: { dasherize } } = Ember;

export default function topLevelExport(){
  throw new Error(`You tried to invoke the top-level export of ember-inject-optional as a function. Instead, use its service() method like:

import injectOptional from 'ember-inject-optional';
Component.extend({
  maybeMyService: injectOptional.service()
});
`);
}

topLevelExport.service = function service(name) {
  return computed(function(defaultName) {
    return getOwner(this).lookup(`service:${name || dasherize(defaultName)}`);
  });
};
