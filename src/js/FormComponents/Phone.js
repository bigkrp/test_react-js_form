Phone = React.createClass({
	getInitialState: function(){
		return {valid: this.props.valid, change: false};
	},
	componentWillReceiveProps: function(nextProps){
		if (nextProps.reset) {
			this.setState({change: false});
		}
	},
	handleChange: function(event){
		var nameReg = /^[0-9\-]+$/;
		this.setState({valid: nameReg.test(event.target.value.trim()) && !!event.target.value});
		this.setState({change: true});
		
		this.props.onChange(this.state.valid, 'phone', this.refs.phone.getDOMNode().value);
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
					<label htmlFor="phone">Phone</label>
					<input ref="phone" onChange={this.handleChange} type="number" className="form-control" id="phone" placeholder="Phone" />
				</div>);
	}

});

module.exports = Phone;