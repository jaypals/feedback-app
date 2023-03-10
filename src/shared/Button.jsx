import React from "react";
import PropTypes from "prop-types";

function Button({ children, version, type, isDiabled }) {
	return (
		<button type={type} disabled={isDiabled} className={`btn btn-${version}`}>
			{children}
		</button>
	);
}

Button.defaultProps = {
	version: "primary",
	type: "button",
	isDiabled: false,
};

Button.propTypes = {
	version: PropTypes.string,
	type: PropTypes.string,
	children: PropTypes.node.isRequired,
	isDiabled: PropTypes.bool,
};

export default Button;
