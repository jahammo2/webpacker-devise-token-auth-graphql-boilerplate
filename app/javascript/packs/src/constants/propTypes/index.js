import ImmutablePropTypes from 'react-immutable-proptypes';
import { PropTypes } from 'prop-types';

export const actions = PropTypes.objectOf(PropTypes.objectOf(PropTypes.func));
export const buttonText = PropTypes.string;
export const children = PropTypes.node;
export const errorMessages = ImmutablePropTypes.list;
export const errors = ImmutablePropTypes.mapOf(PropTypes.array);

export const foo = ImmutablePropTypes.contains({
  bar : PropTypes.string,
  id  : PropTypes.string,
});

export const foos = ImmutablePropTypes.listOf(foo);

export const history = PropTypes.shape({
  push : PropTypes.func.isRequired,
});

export const location = PropTypes.shape({
  state : PropTypes.shape({
    pathFrom : PropTypes.string,
  }),
});

export const isActive = PropTypes.bool;
export const text = PropTypes.string;
export const to = PropTypes.string;
