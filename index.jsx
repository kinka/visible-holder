import React from 'react';

const addEvent = function(target, eventType, callback, capture) {
    if (window.addEventListener) {
        target.addEventListener(eventType, callback, capture);
    } else if (window.attachEvent) {
        target.attachEvent("on" + eventType, callback);
    } else {
        target["on" + eventType] = callback;
    }
};

const removeEvent = function(target, eventType, callback, capture) {
    if (window.removeEventListener) {
        target.removeEventListener(eventType, callback, capture);
    } else if (window.detachEvent) {
        target.detachEvent("on" + eventType, callback);
    } else {
        target["on" + eventType] = null;
    }
};

class VisibleHolder extends React.Component {

    static propTypes = {
      onSeen: React.PropTypes.func,
      onGone: React.PropTypes.func,
      scrollThrottle: React.PropTypes.number,
      container: React.PropTypes.any // DOM element
    }

    static defaultProps = {
      container: window
    }

    tid = 0;

    scrollFn = () => {
        clearTimeout(this.tid);

        this.tid = setTimeout(() => {
            this.calcRect();
            let rect = this.refs.holder.getBoundingClientRect();

            if (rect.bottom < this.offsetTop)
                return this.props.onGone && this.props.onGone('top');

            if (rect.top - this.offsetBottom >= 0)
                return this.props.onGone && this.props.onGone('bottom');

            return this.props.onSeen && this.props.onSeen();
        }, this.props.scrollThrottle || 200);
    }

    componentDidMount() {
        const {container} = this.props;
        addEvent(container, 'scroll', this.scrollFn);
    }

    calcRect = () => {
      this.viewHeight = window.innerHeight
                      || document.documentElement.clientHeight
                      || document.body.clientHeight;
      this.offsetTop = 0;
      this.offsetBottom = this.viewHeight;

      if (this.props.container != window) {
        const rect = this.props.container.getBoundingClientRect();
        this.offsetTop = rect.top;
        this.offsetBottom = rect.bottom;
      }
    }

    componentWillUnmount() {
        removeEvent(this.props.container, 'scroll', this.scrollFn);
    }

    render () {
        return <div ref="holder" className="VisibleHolder"></div>
    }
}

export default VisibleHolder;
