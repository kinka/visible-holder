## visible-holder

It is a React Component, can be placed anywhere of your components.

Whenever it is shown or hidden, onSeen and onGone will be called respectively.

### Usage

```
import VisibleHolder from 'visible-holder';

...
<VisibleHolder
    onGone={this.onGone}
    onSeen={this.onSeen}
    scrollThrottle={16}
    container={this.refs.container}
/>
...

```
