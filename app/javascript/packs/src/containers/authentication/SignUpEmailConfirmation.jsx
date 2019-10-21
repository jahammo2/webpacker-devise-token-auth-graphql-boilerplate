import { connect } from 'react-redux';

import SignUpEmailConfirmation from 'src/components/authentication/SignUpEmailConfirmation';

function mapStateToProps({ authentication }) {
  return {
    emailSentTo : authentication.get('emailSentTo'),
  };
}

export default connect(mapStateToProps, null)(SignUpEmailConfirmation);
