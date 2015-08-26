var FirstName = require('./FormComponents/FirstName');
var LastName = require('./FormComponents/LastName');
var Phone = require('./FormComponents/Phone');
var Gender = require('./FormComponents/Gender');
var Age = require('./FormComponents/Age');

var BaseForm = React.createClass({
	getInitialState: function(){
		return {
			firstName: false,
			lastName: false,
			phone: false,
			gender: false,
			age: false,
			reset: false
		};
	},

	handleForm: function(e){
		e.preventDefault();
		var check = true;

		for(var key in this.state){
			if (this.state.hasOwnProperty(key)){
				if (!this.state[key] && key!='reset') {
					check = false;
				}
			}
		}

		if (check) {		
			this.refs.userForm.getDOMNode().reset();
			this.setState({reset: true});
			this.props.onNewUser(this.createUser.user);

			this.createUser.user = {};
		}
		var self = this;
		setTimeout(function(){
			self.setState({reset: false});
		}, 300);

	},


	handleChangeInput: function(valid, ref, val){
		switch(ref){
			case 'firstName':
			this.setState({firstName: valid});
			break;
			case 'lastName':
			this.setState({lastName: valid});
			break;
			case 'phone':
			this.setState({phone: valid});
			break;
			case 'gender':
			this.setState({gender: valid});
			break;
			case 'age':
			this.setState({age: valid});
			break;
		}
		if(val){
			this.createUser.add(ref, val);
		}
	},

	createUser:{
		user:{},
		add: function(ref, val){
			this.user[ref] = val;
		}
	},

	render: function(){
		var change = this.state.change;
		return (
			<form ref='userForm' className="panel-body" onSubmit={this.handleForm}>
				<FirstName reset={this.state.reset} onChange={this.handleChangeInput} valid={this.state.firstName} />
				<LastName reset={this.state.reset} onChange={this.handleChangeInput} valid={this.state.lastName} />
				<Phone reset={this.state.reset} onChange={this.handleChangeInput} valid={this.state.phone} />
				<Gender reset={this.state.reset} onChange={this.handleChangeInput} />
				<Age reset={this.state.reset} onChange={this.handleChangeInput} valid={this.state.age} />

				<button type="submit" className="btn btn-primary btn-block">Submit</button>
			</form>
		)
	}
});
module.exports = BaseForm;