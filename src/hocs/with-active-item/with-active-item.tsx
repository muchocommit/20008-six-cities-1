import * as React from 'react';

interface State {
  activeItem: any
}

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent<null, State> {
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
