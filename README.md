# ember-inject-optional

Ember's dependency injection systems makes it easy to declare which services are needed by components or other services. But if you try to inject an unknown service, it throws an exception like `Attempting to inject an unknown injection: 'service:some-missing-service'`

That is usually the right behavior, because it's warning you about a mistake! But *sometimes* you want to check for the existence of a service and use it if it's present, but continue without it if it does not exist. This addon supports that use case:

```js
import injectOptional from 'ember-inject-optional';

export default Component.extend({
  // if there is a service named fastboot available in the app, it
  // will be set as `this.fastboot` on the component. If not,
  // `this.fastboot` will be `undefined`.
  fastboot: injectOptional.service(),
  
  // Just like Ember's built-in injection, you can pass an explicit
  // service name instead of relying on the implicit one derived
  // from your local property name:
  tools: injectOptional.service('cardstack-tools') 
}); 
```

## Installation

* `ember install ember-inject-optional`

## Why does this require an addon?

Maybe it doesn't -- if you already know what you're doing, you can just use [getOwner](https://emberjs.com/api/ember/2.14/namespaces/Ember/methods/getOwner?anchor=getOwner) and [lookup](https://emberjs.com/api/ember/2.14/classes/ContainerProxyMixin/methods/lookup?anchor=lookup). But I think this is nicer than repeating that pattern all over the place.
