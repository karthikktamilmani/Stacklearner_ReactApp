import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import {Row} from "react-bootstrap";

const labels = {
	0.5: 'Useless',
	1: 'Useless+',
	1.5: 'Poor',
	2: 'Poor+',
	2.5: 'Ok',
	3: 'Ok+',
	3.5: 'Good',
	4: 'Good+',
	4.5: 'Excellent',
	5: 'Excellent+',
};

const useStyles = makeStyles({
	root: {
		width: 200,
		display: 'flex',
		alignItems: 'center',
	},
});

export default function Ratings(props) {
	const [value, setValue] = React.useState(2);
	const [hover, setHover] = React.useState(-1);
	const classes = useStyles();

	return (
		<Row>
			<Rating
				name="hover-feedback"
				value={value}
				precision={1}
				onChange={(event, newValue) => {
					setValue(newValue);
					props.handleChange(newValue);
				}}
				onChangeActive={(event, newHover) => {
					setHover(newHover);
				}}
			/>

			{value !== null && <div className="ml-2 mb-1"><Box>{labels[hover !== -1 ? hover : value]}</Box></div>}
		</Row>
	);
}
