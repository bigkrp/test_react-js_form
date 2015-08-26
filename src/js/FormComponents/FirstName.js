FirstName = React.createClass({
	getInitialState: function(){
		return {valid: this.props.valid, change: false};
	},
	componentWillReceiveProps: function(nextProps){
		if (nextProps.reset) {
			this.setState({change: false});
		}
	},
	handleChange: function(event){
		var nameReg = /^[а-яА-ЯёЁa-zA-Z]+$/;
		this.setState({valid: nameReg.test(event.target.value.trim()) && !!event.target.value});
		this.setState({change: true});
		
		this.props.onChange(this.state.valid, 'firstName', this.refs.firstName.getDOMNode().value);
	},
	render: function(){
		var classStr;
		if (!this.state.change) {
			classStr = 'form-group';
		} else if(!this.state.valid){
			classStr = 'form-group has-error';
		} else if(this.state.valid){
			classStr = 'form-group has-success';
		}


		return (<div className={classStr}>
					<label htmlFor="firstName">First Name</label>
					<input ref="firstName" onChange={this.handleChange} type="text" className="form-control" id="firstName" placeholder="First Name" />
				</div>);
	}
});

module.exports = FirstName;