Gender = React.createClass({
	handleChange: function(){
		if (this.refs.radio1.getDOMNode().checked) {
			this.props.onChange(true, 'gender', 'male');
		} else if(this.refs.radio2.getDOMNode().checked){
			this.props.onChange(true, 'gender', 'female');
		}
	},
	render: function(){
		return (<div ref='radio' className="form-group" onChange={this.handleChange}>
					<label className="radio-inline">
						<input ref="radio1" type="radio" name="gender" id="male" value="male">
						male
						</input>
					</label>
					<label className="radio-inline">
						<input ref="radio2" type="radio" name="gender" id="female" value="female">
						female
						</input>
					</label>
				</div>);
	}
});

module.exports = Gender;