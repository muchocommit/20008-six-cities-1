import * as React from 'react';
import {Subtract} from 'utility-types';

interface State {
  activeItem: any
}

interface InjectedProps {
  activateItem: (i: number) => void,
  deactivateItem: () => void,
  isActiveItem:(i: number, sortingTab: boolean) => void
}

const withActiveItem = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithActiveItem extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null
      };
    }

    render() {

      return (<Component
        {...this.props}
        activateItem={(i) => this.setState({activeItem: i})}
        deactivateItem={() => this.setState({activeItem: null})}

        isActiveItem={(i, sortingTab = false) => {

          if (sortingTab) {
            return i === this.state.activeItem;
          }
          return i === this.state.activeItem ||
            (i === 0 && this.state.activeItem === null);
        }}
      />);
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
