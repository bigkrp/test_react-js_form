(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"D:\\work_krp\\softindex_test\\src\\js\\App.js":[function(require,module,exports){
var User = require('./User');

React.render(React.createElement(User, null), document.getElementById('users'));

},{"./User":"D:\\work_krp\\softindex_test\\src\\js\\User.js"}],"D:\\work_krp\\softindex_test\\src\\js\\BaseForm.js":[function(require,module,exports){
var FirstName = require('./FormComponents/FirstName');
var LastName = require('./FormComponents/LastName');
var Phone = require('./FormComponents/Phone');
var Gender = require('./FormComponents/Gender');
var Age = require('./FormComponents/Age');

var BaseForm = React.createClass({displayName: "BaseForm",
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
			React.createElement("form", {ref: "userForm", className: "panel-body", onSubmit: this.handleForm}, 
				React.createElement(FirstName, {reset: this.state.reset, onChange: this.handleChangeInput, valid: this.state.firstName}), 
				React.createElement(LastName, {reset: this.state.reset, onChange: this.handleChangeInput, valid: this.state.lastName}), 
				React.createElement(Phone, {reset: this.state.reset, onChange: this.handleChangeInput, valid: this.state.phone}), 
				React.createElement(Gender, {reset: this.state.reset, onChange: this.handleChangeInput}), 
				React.createElement(Age, {reset: this.state.reset, onChange: this.handleChangeInput, valid: this.state.age}), 

				React.createElement("button", {type: "submit", className: "btn btn-primary btn-block"}, "Submit")
			)
		)
	}
});
module.exports = BaseForm;

},{"./FormComponents/Age":"D:\\work_krp\\softindex_test\\src\\js\\FormComponents\\Age.js","./FormComponents/FirstName":"D:\\work_krp\\softindex_test\\src\\js\\FormComponents\\FirstName.js","./FormComponents/Gender":"D:\\work_krp\\softindex_test\\src\\js\\FormComponents\\Gender.js","./FormComponents/LastName":"D:\\work_krp\\softindex_test\\src\\js\\FormComponents\\LastName.js","./FormComponents/Phone":"D:\\work_krp\\softindex_test\\src\\js\\FormComponents\\Phone.js"}],"D:\\work_krp\\softindex_test\\src\\js\\FormComponents\\Age.js":[function(require,module,exports){
Age = React.createClass({displayName: "Age",
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
		
		this.props.onChange(this.state.valid, 'age', this.refs.age.getDOMNode().value);
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


		return (React.createElement("div", {className: classStr}, 
					React.createElement("label", {htmlFor: "age"}, "Age"), 
					React.createElement("input", {ref: "age", onChange: this.handleChange, type: "number", className: "form-control", id: "age", placeholder: "Age"})
				));
	}
});

module.exports = Age;

},{}],"D:\\work_krp\\softindex_test\\src\\js\\FormComponents\\FirstName.js":[function(require,module,exports){
FirstName = React.createClass({displayName: "FirstName",
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


		return (React.createElement("div", {className: classStr}, 
					React.createElement("label", {htmlFor: "firstName"}, "First Name"), 
					React.createElement("input", {ref: "firstName", onChange: this.handleChange, type: "text", className: "form-control", id: "firstName", placeholder: "First Name"})
				));
	}
});

module.exports = FirstName;

},{}],"D:\\work_krp\\softindex_test\\src\\js\\FormComponents\\Gender.js":[function(require,module,exports){
Gender = React.createClass({displayName: "Gender",
	handleChange: function(){
		if (this.refs.radio1.getDOMNode().checked) {
			this.props.onChange(true, 'gender', 'male');
		} else if(this.refs.radio2.getDOMNode().checked){
			this.props.onChange(true, 'gender', 'female');
		}
	},
	render: function(){
		return (React.createElement("div", {ref: "radio", className: "form-group", onChange: this.handleChange}, 
					React.createElement("label", {className: "radio-inline"}, 
						React.createElement("input", {ref: "radio1", type: "radio", name: "gender", id: "male", value: "male"}, 
						"male"
						)
					), 
					React.createElement("label", {className: "radio-inline"}, 
						React.createElement("input", {ref: "radio2", type: "radio", name: "gender", id: "female", value: "female"}, 
						"female"
						)
					)
				));
	}
});

module.exports = Gender;

},{}],"D:\\work_krp\\softindex_test\\src\\js\\FormComponents\\LastName.js":[function(require,module,exports){
LastName = React.createClass({displayName: "LastName",
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
		
		this.props.onChange(this.state.valid, 'lastName', this.refs.lastName.getDOMNode().value);
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


		return (React.createElement("div", {className: classStr}, 
					React.createElement("label", {htmlFor: "lastName"}, "Last Name"), 
					React.createElement("input", {ref: "lastName", onChange: this.handleChange, type: "text", className: "form-control", id: "lastName", placeholder: "Last Name"})
				));
	}
});

module.exports = LastName;

},{}],"D:\\work_krp\\softindex_test\\src\\js\\FormComponents\\Phone.js":[function(require,module,exports){
Phone = React.createClass({displayName: "Phone",
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


		return (React.createElement("div", {className: classStr}, 
					React.createElement("label", {htmlFor: "phone"}, "Phone"), 
					React.createElement("input", {ref: "phone", onChange: this.handleChange, type: "number", className: "form-control", id: "phone", placeholder: "Phone"})
				));
	}

});

module.exports = Phone;

},{}],"D:\\work_krp\\softindex_test\\src\\js\\Table.js":[function(require,module,exports){
var TableItem = require('./TableComponent/TableItem');

var Table = React.createClass({displayName: "Table",
	getInitialState: function(){
		return {
			users : this.props.users,

			isFiltered: {
				firstName: false,
				lastName: false,
				gender: false,
				phone: false,
				age: false
			},

			reverse: {
				firstName: false,
				lastName: false,
				gender: false,
				phone: false,
				age: false				
			},

			filtered:{
				firstName: null,
				lastName: null,
				gender: null,
				phone: null,
				age: null
			}
		};
	},


	componentWillReceiveProps: function(nextProps){
		this.setState({users: nextProps.users})
	},

	updateSort: function(){
		var isFiltered = {
				firstName: false,
				lastName: false,
				gender: false,
				phone: false,
				age: false
			},

			reverse = {
				firstName: false,
				lastName: false,
				gender: false,
				phone: false,
				age: false				
			},

			filtered = {
				firstName: null,
				lastName: null,
				gender: null,
				phone: null,
				age: null
			};
		this.setState({isFiltered: isFiltered, reverse: reverse, filtered: filtered});

	},

	onDelete: function(id){
		var newUsers = this.state.users.filter(function(user){
			return +user.id !== +id;
		});

		this.setState({users: newUsers});
		this.props.refreshUser(newUsers);
	},

	changeState: function(){
		var self = this;
		return self.setState();
	},

	filterBtn: function(e){
		var filterTarget = e.target.getAttribute('data-filter'),
			users = this.state.users,
			isFiltered = this.state.isFiltered,
			filtered = this.state.filtered,
			reverse = this.state.reverse;

		if(isFiltered[filterTarget]){
			users = filtered[filterTarget];
			users.reverse();
			filtered[filterTarget] = users;

			reverse[filterTarget] = !reverse[filterTarget];
			this.setState({users: users, filtered: filtered, reverse: reverse});
		} else {
			switch(filterTarget){
				case 'firstName':
					users = users.sort(sortFirstName);
					break;
				case 'lastName':
					users = users.sort(sortLastName);
					break;
				case 'gender':
					users = users.sort(sortGender);
					break;
				case 'phone':
					users = users.sort(sortPhone);
					break;
				case 'age':
					users = users.sort(sortAge);
					break;
			}

			isFiltered[filterTarget] = true;
			filtered[filterTarget] = users;
			reverse[filterTarget] = !reverse[filterTarget];

			this.setState({users: users, isFiltered: isFiltered, filtered: filtered, reverse: reverse});

		}


		function sortFirstName(userA, userB){
			return userA.firstName > userB.firstName;		
		}
		function sortLastName(userA, userB){
			return userA.lastName > userB.lastName;		
		}
		function sortGender(userA, userB){
			return userA.gender > userB.gender;		
		}
		function sortPhone(userA, userB){
			return userA.phone > userB.phone;		
		}
		function sortAge(userA, userB){
			return userA.age - userB.age;		
		}
	}, 

	render: function(){
		var self = this;
		var tableItem = this.state.users.map(function(user){
			return React.createElement(TableItem, {user: user, onDelete: self.onDelete})
		});
		var btnClass = {
			firstName: this.state.reverse.firstName ? 'btn btn-xs dropup' : 'btn btn-xs',
			lastName: this.state.reverse.lastName ? 'btn btn-xs dropup' : 'btn btn-xs',
			phone: this.state.reverse.phone ? 'btn btn-xs dropup' : 'btn btn-xs',
			gender: this.state.reverse.gender ? 'btn btn-xs dropup' : 'btn btn-xs',
			age: this.state.reverse.age ? 'btn btn-xs dropup' : 'btn btn-xs'
		};

		return (
			React.createElement("div", {className: "table-responsive"}, 
				React.createElement("table", {className: "table"}, 
					React.createElement("thead", null, 
						React.createElement("tr", null, 
							React.createElement("th", null, "First Name ", React.createElement("button", {"data-filter": "firstName", onClick: this.filterBtn, className: btnClass.firstName}, React.createElement("span", {className: "caret"}))), 
							React.createElement("th", null, "Last Name ", React.createElement("button", {"data-filter": "lastName", onClick: this.filterBtn, className: btnClass.lastName}, React.createElement("span", {className: "caret"}))), 
							React.createElement("th", null, "Phone ", React.createElement("button", {"data-filter": "phone", onClick: this.filterBtn, className: btnClass.phone}, React.createElement("span", {className: "caret"}))), 
							React.createElement("th", null, "Gender ", React.createElement("button", {"data-filter": "gender", onClick: this.filterBtn, className: btnClass.gender}, React.createElement("span", {className: "caret"}))), 
							React.createElement("th", null, "Age ", React.createElement("button", {"data-filter": "age", onClick: this.filterBtn, className: btnClass.age}, React.createElement("span", {className: "caret"}))), 
							React.createElement("th", null)
						)
					), 
					React.createElement("tbody", null, 
						tableItem
					)
				)
			)
		)
	}
});

module.exports = Table;

},{"./TableComponent/TableItem":"D:\\work_krp\\softindex_test\\src\\js\\TableComponent\\TableItem.js"}],"D:\\work_krp\\softindex_test\\src\\js\\TableComponent\\TableItem.js":[function(require,module,exports){
var TableItem = React.createClass({displayName: "TableItem",
	onDelete: function(e){
		this.props.onDelete(e.target.getAttribute('data-id'));
	},
	render: function() {
		var usr = this.props.user;
		return (
			React.createElement("tr", null, 
				React.createElement("td", null, usr.firstName), 
				React.createElement("td", null, usr.lastName), 
				React.createElement("td", null, usr.phone), 
				React.createElement("td", null, usr.gender), 
				React.createElement("td", null, usr.age), 
				React.createElement("td", null, React.createElement("button", {className: "btn btn-sm btn-danger", "data-id": usr.id, onClick: this.onDelete}, "x"))
			)
		);
	}

});

module.exports = TableItem;

},{}],"D:\\work_krp\\softindex_test\\src\\js\\User.js":[function(require,module,exports){
var BaseForm = require('./BaseForm');
var Table = require('./Table');

var User = React.createClass({displayName: "User",
	getInitialState: function(){
		var USER_ITEMS = [
			{firstName:'Vasya', lastName: 'Petrov', phone: '099556666', gender:'male', age: 18, id: 1},
			{firstName:'Sasha', lastName: 'Alexeev', phone: '666', gender:'male', age: 33, id: 2},
			{firstName:'Nastya', lastName: 'Valabueva', phone: '9999998', gender:'female', age: 27, id: 3}
		];
		return {
			users: USER_ITEMS,
			userId: USER_ITEMS.length
		}
	},

	onNewUser: function(user){
		user.id = ++this.state.userId;
		var newUsers = this.state.users.concat([user]);
		this.setState({
			users: newUsers,
			userId: user.id
		});
	},
	refreshUser: function(users){
		this.setState({users: users});
	},

	render: function(){
		return (
			React.createElement("section", null, 
				React.createElement("section", {className: "panel panel-primary"}, 
					React.createElement(BaseForm, {onNewUser: this.onNewUser})
				), 
	
				React.createElement("section", {className: "panel panel-info"}, 
					React.createElement(Table, {users: this.state.users, refreshUser: this.refreshUser})
				)
			)
		);
	}
});

module.exports = User;

},{"./BaseForm":"D:\\work_krp\\softindex_test\\src\\js\\BaseForm.js","./Table":"D:\\work_krp\\softindex_test\\src\\js\\Table.js"}]},{},["D:\\work_krp\\softindex_test\\src\\js\\App.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJEOlxcd29ya19rcnBcXHNvZnRpbmRleF90ZXN0XFxzcmNcXGpzXFxBcHAuanMiLCJEOlxcd29ya19rcnBcXHNvZnRpbmRleF90ZXN0XFxzcmNcXGpzXFxCYXNlRm9ybS5qcyIsIkQ6XFx3b3JrX2tycFxcc29mdGluZGV4X3Rlc3RcXHNyY1xcanNcXEZvcm1Db21wb25lbnRzXFxBZ2UuanMiLCJEOlxcd29ya19rcnBcXHNvZnRpbmRleF90ZXN0XFxzcmNcXGpzXFxGb3JtQ29tcG9uZW50c1xcRmlyc3ROYW1lLmpzIiwiRDpcXHdvcmtfa3JwXFxzb2Z0aW5kZXhfdGVzdFxcc3JjXFxqc1xcRm9ybUNvbXBvbmVudHNcXEdlbmRlci5qcyIsIkQ6XFx3b3JrX2tycFxcc29mdGluZGV4X3Rlc3RcXHNyY1xcanNcXEZvcm1Db21wb25lbnRzXFxMYXN0TmFtZS5qcyIsIkQ6XFx3b3JrX2tycFxcc29mdGluZGV4X3Rlc3RcXHNyY1xcanNcXEZvcm1Db21wb25lbnRzXFxQaG9uZS5qcyIsIkQ6XFx3b3JrX2tycFxcc29mdGluZGV4X3Rlc3RcXHNyY1xcanNcXFRhYmxlLmpzIiwiRDpcXHdvcmtfa3JwXFxzb2Z0aW5kZXhfdGVzdFxcc3JjXFxqc1xcVGFibGVDb21wb25lbnRcXFRhYmxlSXRlbS5qcyIsIkQ6XFx3b3JrX2tycFxcc29mdGluZGV4X3Rlc3RcXHNyY1xcanNcXFVzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRTdCLEtBQUssQ0FBQyxNQUFNLENBQUMsb0JBQUMsSUFBSSxFQUFBLElBQUEsQ0FBRyxDQUFBLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O0FDRnhELElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyw0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QSxFQUFBLG9CQUFBLE1BQUssRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsT0FBUSxDQUFPLENBQVMsQ0FBSyxDQUFBLEVBQUE7T0FDcEosb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxZQUFBLEVBQVUsb0JBQUEsUUFBTyxFQUFBLENBQUEsQ0FBQyxhQUFBLEVBQVcsQ0FBQyxVQUFBLEVBQVUsQ0FBQyxPQUFBLEVBQU8sQ0FBRSxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUMsU0FBQSxFQUFTLENBQUUsUUFBUSxDQUFDLFFBQVUsQ0FBQSxFQUFBLG9CQUFBLE1BQUssRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsT0FBUSxDQUFPLENBQVMsQ0FBSyxDQUFBLEVBQUE7T0FDakosb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxRQUFBLEVBQU0sb0JBQUEsUUFBTyxFQUFBLENBQUEsQ0FBQyxhQUFBLEVBQVcsQ0FBQyxPQUFBLEVBQU8sQ0FBQyxPQUFBLEVBQU8sQ0FBRSxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUMsU0FBQSxFQUFTLENBQUUsUUFBUSxDQUFDLEtBQU8sQ0FBQSxFQUFBLG9CQUFBLE1BQUssRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsT0FBUSxDQUFPLENBQVMsQ0FBSyxDQUFBLEVBQUE7T0FDdkksb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxTQUFBLEVBQU8sb0JBQUEsUUFBTyxFQUFBLENBQUEsQ0FBQyxhQUFBLEVBQVcsQ0FBQyxRQUFBLEVBQVEsQ0FBQyxPQUFBLEVBQU8sQ0FBRSxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUMsU0FBQSxFQUFTLENBQUUsUUFBUSxDQUFDLE1BQVEsQ0FBQSxFQUFBLG9CQUFBLE1BQUssRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsT0FBUSxDQUFPLENBQVMsQ0FBSyxDQUFBLEVBQUE7T0FDMUksb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxNQUFBLEVBQUksb0JBQUEsUUFBTyxFQUFBLENBQUEsQ0FBQyxhQUFBLEVB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Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFVzZXIgPSByZXF1aXJlKCcuL1VzZXInKTtcclxuXHJcblJlYWN0LnJlbmRlcig8VXNlciAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJzJykpOyIsInZhciBGaXJzdE5hbWUgPSByZXF1aXJlKCcuL0Zvcm1Db21wb25lbnRzL0ZpcnN0TmFtZScpO1xyXG52YXIgTGFzdE5hbWUgPSByZXF1aXJlKCcuL0Zvcm1Db21wb25lbnRzL0xhc3ROYW1lJyk7XHJcbnZhciBQaG9uZSA9IHJlcXVpcmUoJy4vRm9ybUNvbXBvbmVudHMvUGhvbmUnKTtcclxudmFyIEdlbmRlciA9IHJlcXVpcmUoJy4vRm9ybUNvbXBvbmVudHMvR2VuZGVyJyk7XHJcbnZhciBBZ2UgPSByZXF1aXJlKCcuL0Zvcm1Db21wb25lbnRzL0FnZScpO1xyXG5cclxudmFyIEJhc2VGb3JtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGZpcnN0TmFtZTogZmFsc2UsXHJcblx0XHRcdGxhc3ROYW1lOiBmYWxzZSxcclxuXHRcdFx0cGhvbmU6IGZhbHNlLFxyXG5cdFx0XHRnZW5kZXI6IGZhbHNlLFxyXG5cdFx0XHRhZ2U6IGZhbHNlLFxyXG5cdFx0XHRyZXNldDogZmFsc2VcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0aGFuZGxlRm9ybTogZnVuY3Rpb24oZSl7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR2YXIgY2hlY2sgPSB0cnVlO1xyXG5cclxuXHRcdGZvcih2YXIga2V5IGluIHRoaXMuc3RhdGUpe1xyXG5cdFx0XHRpZiAodGhpcy5zdGF0ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKXtcclxuXHRcdFx0XHRpZiAoIXRoaXMuc3RhdGVba2V5XSAmJiBrZXkhPSdyZXNldCcpIHtcclxuXHRcdFx0XHRcdGNoZWNrID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNoZWNrKSB7XHRcdFxyXG5cdFx0XHR0aGlzLnJlZnMudXNlckZvcm0uZ2V0RE9NTm9kZSgpLnJlc2V0KCk7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3Jlc2V0OiB0cnVlfSk7XHJcblx0XHRcdHRoaXMucHJvcHMub25OZXdVc2VyKHRoaXMuY3JlYXRlVXNlci51c2VyKTtcclxuXHJcblx0XHRcdHRoaXMuY3JlYXRlVXNlci51c2VyID0ge307XHJcblx0XHR9XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdHNlbGYuc2V0U3RhdGUoe3Jlc2V0OiBmYWxzZX0pO1xyXG5cdFx0fSwgMzAwKTtcclxuXHJcblx0fSxcclxuXHJcblxyXG5cdGhhbmRsZUNoYW5nZUlucHV0OiBmdW5jdGlvbih2YWxpZCwgcmVmLCB2YWwpe1xyXG5cdFx0c3dpdGNoKHJlZil7XHJcblx0XHRcdGNhc2UgJ2ZpcnN0TmFtZSc6XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2ZpcnN0TmFtZTogdmFsaWR9KTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2xhc3ROYW1lJzpcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7bGFzdE5hbWU6IHZhbGlkfSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdwaG9uZSc6XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3Bob25lOiB2YWxpZH0pO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZ2VuZGVyJzpcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7Z2VuZGVyOiB2YWxpZH0pO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnYWdlJzpcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7YWdlOiB2YWxpZH0pO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHRcdGlmKHZhbCl7XHJcblx0XHRcdHRoaXMuY3JlYXRlVXNlci5hZGQocmVmLCB2YWwpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGNyZWF0ZVVzZXI6e1xyXG5cdFx0dXNlcjp7fSxcclxuXHRcdGFkZDogZnVuY3Rpb24ocmVmLCB2YWwpe1xyXG5cdFx0XHR0aGlzLnVzZXJbcmVmXSA9IHZhbDtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgY2hhbmdlID0gdGhpcy5zdGF0ZS5jaGFuZ2U7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Zm9ybSByZWY9J3VzZXJGb3JtJyBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlRm9ybX0+XHJcblx0XHRcdFx0PEZpcnN0TmFtZSByZXNldD17dGhpcy5zdGF0ZS5yZXNldH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlSW5wdXR9IHZhbGlkPXt0aGlzLnN0YXRlLmZpcnN0TmFtZX0gLz5cclxuXHRcdFx0XHQ8TGFzdE5hbWUgcmVzZXQ9e3RoaXMuc3RhdGUucmVzZXR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZUlucHV0fSB2YWxpZD17dGhpcy5zdGF0ZS5sYXN0TmFtZX0gLz5cclxuXHRcdFx0XHQ8UGhvbmUgcmVzZXQ9e3RoaXMuc3RhdGUucmVzZXR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZUlucHV0fSB2YWxpZD17dGhpcy5zdGF0ZS5waG9uZX0gLz5cclxuXHRcdFx0XHQ8R2VuZGVyIHJlc2V0PXt0aGlzLnN0YXRlLnJlc2V0fSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VJbnB1dH0gLz5cclxuXHRcdFx0XHQ8QWdlIHJlc2V0PXt0aGlzLnN0YXRlLnJlc2V0fSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VJbnB1dH0gdmFsaWQ9e3RoaXMuc3RhdGUuYWdlfSAvPlxyXG5cclxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgYnRuLWJsb2NrXCI+U3VibWl0PC9idXR0b24+XHJcblx0XHRcdDwvZm9ybT5cclxuXHRcdClcclxuXHR9XHJcbn0pO1xyXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VGb3JtOyIsIkFnZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4ge3ZhbGlkOiB0aGlzLnByb3BzLnZhbGlkLCBjaGFuZ2U6IGZhbHNlfTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcyl7XHJcblx0XHRpZiAobmV4dFByb3BzLnJlc2V0KSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2NoYW5nZTogZmFsc2V9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGhhbmRsZUNoYW5nZTogZnVuY3Rpb24oZXZlbnQpe1xyXG5cdFx0dmFyIG5hbWVSZWcgPSAvXlswLTlcXC1dKyQvO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7dmFsaWQ6IG5hbWVSZWcudGVzdChldmVudC50YXJnZXQudmFsdWUudHJpbSgpKSAmJiAhIWV2ZW50LnRhcmdldC52YWx1ZX0pO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7Y2hhbmdlOiB0cnVlfSk7XHJcblx0XHRcclxuXHRcdHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5zdGF0ZS52YWxpZCwgJ2FnZScsIHRoaXMucmVmcy5hZ2UuZ2V0RE9NTm9kZSgpLnZhbHVlKTtcclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcclxuXHRcdHZhciBjbGFzc1N0cjtcclxuXHJcblx0XHRpZiAoIXRoaXMuc3RhdGUuY2hhbmdlKSB7XHJcblx0XHRcdGNsYXNzU3RyID0gJ2Zvcm0tZ3JvdXAnO1xyXG5cdFx0fSBlbHNlIGlmKCF0aGlzLnN0YXRlLnZhbGlkKXtcclxuXHRcdFx0Y2xhc3NTdHIgPSAnZm9ybS1ncm91cCBoYXMtZXJyb3InO1xyXG5cdFx0fSBlbHNlIGlmKHRoaXMuc3RhdGUudmFsaWQpe1xyXG5cdFx0XHRjbGFzc1N0ciA9ICdmb3JtLWdyb3VwIGhhcy1zdWNjZXNzJztcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0cmV0dXJuICg8ZGl2IGNsYXNzTmFtZT17Y2xhc3NTdHJ9PlxyXG5cdFx0XHRcdFx0PGxhYmVsIGh0bWxGb3I9XCJhZ2VcIj5BZ2U8L2xhYmVsPlxyXG5cdFx0XHRcdFx0PGlucHV0IHJlZj1cImFnZVwiIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gdHlwZT1cIm51bWJlclwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIGlkPVwiYWdlXCIgcGxhY2Vob2xkZXI9XCJBZ2VcIiAvPlxyXG5cdFx0XHRcdDwvZGl2Pik7XHJcblx0fVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQWdlOyIsIkZpcnN0TmFtZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4ge3ZhbGlkOiB0aGlzLnByb3BzLnZhbGlkLCBjaGFuZ2U6IGZhbHNlfTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcyl7XHJcblx0XHRpZiAobmV4dFByb3BzLnJlc2V0KSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2NoYW5nZTogZmFsc2V9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGhhbmRsZUNoYW5nZTogZnVuY3Rpb24oZXZlbnQpe1xyXG5cdFx0dmFyIG5hbWVSZWcgPSAvXlvQsC3Rj9CQLdCv0ZHQgWEtekEtWl0rJC87XHJcblx0XHR0aGlzLnNldFN0YXRlKHt2YWxpZDogbmFtZVJlZy50ZXN0KGV2ZW50LnRhcmdldC52YWx1ZS50cmltKCkpICYmICEhZXZlbnQudGFyZ2V0LnZhbHVlfSk7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtjaGFuZ2U6IHRydWV9KTtcclxuXHRcdFxyXG5cdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnN0YXRlLnZhbGlkLCAnZmlyc3ROYW1lJywgdGhpcy5yZWZzLmZpcnN0TmFtZS5nZXRET01Ob2RlKCkudmFsdWUpO1xyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGNsYXNzU3RyO1xyXG5cdFx0aWYgKCF0aGlzLnN0YXRlLmNoYW5nZSkge1xyXG5cdFx0XHRjbGFzc1N0ciA9ICdmb3JtLWdyb3VwJztcclxuXHRcdH0gZWxzZSBpZighdGhpcy5zdGF0ZS52YWxpZCl7XHJcblx0XHRcdGNsYXNzU3RyID0gJ2Zvcm0tZ3JvdXAgaGFzLWVycm9yJztcclxuXHRcdH0gZWxzZSBpZih0aGlzLnN0YXRlLnZhbGlkKXtcclxuXHRcdFx0Y2xhc3NTdHIgPSAnZm9ybS1ncm91cCBoYXMtc3VjY2Vzcyc7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9e2NsYXNzU3RyfT5cclxuXHRcdFx0XHRcdDxsYWJlbCBodG1sRm9yPVwiZmlyc3ROYW1lXCI+Rmlyc3QgTmFtZTwvbGFiZWw+XHJcblx0XHRcdFx0XHQ8aW5wdXQgcmVmPVwiZmlyc3ROYW1lXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIGlkPVwiZmlyc3ROYW1lXCIgcGxhY2Vob2xkZXI9XCJGaXJzdCBOYW1lXCIgLz5cclxuXHRcdFx0XHQ8L2Rpdj4pO1xyXG5cdH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZpcnN0TmFtZTsiLCJHZW5kZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0aGFuZGxlQ2hhbmdlOiBmdW5jdGlvbigpe1xyXG5cdFx0aWYgKHRoaXMucmVmcy5yYWRpbzEuZ2V0RE9NTm9kZSgpLmNoZWNrZWQpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh0cnVlLCAnZ2VuZGVyJywgJ21hbGUnKTtcclxuXHRcdH0gZWxzZSBpZih0aGlzLnJlZnMucmFkaW8yLmdldERPTU5vZGUoKS5jaGVja2VkKXtcclxuXHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh0cnVlLCAnZ2VuZGVyJywgJ2ZlbWFsZScpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuICg8ZGl2IHJlZj0ncmFkaW8nIGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9PlxyXG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZVwiPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgcmVmPVwicmFkaW8xXCIgdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIGlkPVwibWFsZVwiIHZhbHVlPVwibWFsZVwiPlxyXG5cdFx0XHRcdFx0XHRtYWxlXHJcblx0XHRcdFx0XHRcdDwvaW5wdXQ+XHJcblx0XHRcdFx0XHQ8L2xhYmVsPlxyXG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cInJhZGlvLWlubGluZVwiPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgcmVmPVwicmFkaW8yXCIgdHlwZT1cInJhZGlvXCIgbmFtZT1cImdlbmRlclwiIGlkPVwiZmVtYWxlXCIgdmFsdWU9XCJmZW1hbGVcIj5cclxuXHRcdFx0XHRcdFx0ZmVtYWxlXHJcblx0XHRcdFx0XHRcdDwvaW5wdXQ+XHJcblx0XHRcdFx0XHQ8L2xhYmVsPlxyXG5cdFx0XHRcdDwvZGl2Pik7XHJcblx0fVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2VuZGVyOyIsIkxhc3ROYW1lID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB7dmFsaWQ6IHRoaXMucHJvcHMudmFsaWQsIGNoYW5nZTogZmFsc2V9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKXtcclxuXHRcdGlmIChuZXh0UHJvcHMucmVzZXQpIHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7Y2hhbmdlOiBmYWxzZX0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0aGFuZGxlQ2hhbmdlOiBmdW5jdGlvbihldmVudCl7XHJcblx0XHR2YXIgbmFtZVJlZyA9IC9eW9CwLdGP0JAt0K/RkdCBYS16QS1aXSskLztcclxuXHRcdHRoaXMuc2V0U3RhdGUoe3ZhbGlkOiBuYW1lUmVnLnRlc3QoZXZlbnQudGFyZ2V0LnZhbHVlLnRyaW0oKSkgJiYgISFldmVudC50YXJnZXQudmFsdWV9KTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe2NoYW5nZTogdHJ1ZX0pO1xyXG5cdFx0XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuc3RhdGUudmFsaWQsICdsYXN0TmFtZScsIHRoaXMucmVmcy5sYXN0TmFtZS5nZXRET01Ob2RlKCkudmFsdWUpO1xyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGNsYXNzU3RyO1xyXG5cclxuXHRcdGlmICghdGhpcy5zdGF0ZS5jaGFuZ2UpIHtcclxuXHRcdFx0Y2xhc3NTdHIgPSAnZm9ybS1ncm91cCc7XHJcblx0XHR9IGVsc2UgaWYoIXRoaXMuc3RhdGUudmFsaWQpe1xyXG5cdFx0XHRjbGFzc1N0ciA9ICdmb3JtLWdyb3VwIGhhcy1lcnJvcic7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5zdGF0ZS52YWxpZCl7XHJcblx0XHRcdGNsYXNzU3RyID0gJ2Zvcm0tZ3JvdXAgaGFzLXN1Y2Nlc3MnO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRyZXR1cm4gKDxkaXYgY2xhc3NOYW1lPXtjbGFzc1N0cn0+XHJcblx0XHRcdFx0XHQ8bGFiZWwgaHRtbEZvcj1cImxhc3ROYW1lXCI+TGFzdCBOYW1lPC9sYWJlbD5cclxuXHRcdFx0XHRcdDxpbnB1dCByZWY9XCJsYXN0TmFtZVwiIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImxhc3ROYW1lXCIgcGxhY2Vob2xkZXI9XCJMYXN0IE5hbWVcIiAvPlxyXG5cdFx0XHRcdDwvZGl2Pik7XHJcblx0fVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGFzdE5hbWU7IiwiUGhvbmUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHt2YWxpZDogdGhpcy5wcm9wcy52YWxpZCwgY2hhbmdlOiBmYWxzZX07XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMpe1xyXG5cdFx0aWYgKG5leHRQcm9wcy5yZXNldCkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtjaGFuZ2U6IGZhbHNlfSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KXtcclxuXHRcdHZhciBuYW1lUmVnID0gL15bMC05XFwtXSskLztcclxuXHRcdHRoaXMuc2V0U3RhdGUoe3ZhbGlkOiBuYW1lUmVnLnRlc3QoZXZlbnQudGFyZ2V0LnZhbHVlLnRyaW0oKSkgJiYgISFldmVudC50YXJnZXQudmFsdWV9KTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe2NoYW5nZTogdHJ1ZX0pO1xyXG5cdFx0XHJcblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuc3RhdGUudmFsaWQsICdwaG9uZScsIHRoaXMucmVmcy5waG9uZS5nZXRET01Ob2RlKCkudmFsdWUpO1xyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGNsYXNzU3RyO1xyXG5cclxuXHRcdGlmICghdGhpcy5zdGF0ZS5jaGFuZ2UpIHtcclxuXHRcdFx0Y2xhc3NTdHIgPSAnZm9ybS1ncm91cCc7XHJcblx0XHR9IGVsc2UgaWYoIXRoaXMuc3RhdGUudmFsaWQpe1xyXG5cdFx0XHRjbGFzc1N0ciA9ICdmb3JtLWdyb3VwIGhhcy1lcnJvcic7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5zdGF0ZS52YWxpZCl7XHJcblx0XHRcdGNsYXNzU3RyID0gJ2Zvcm0tZ3JvdXAgaGFzLXN1Y2Nlc3MnO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRyZXR1cm4gKDxkaXYgY2xhc3NOYW1lPXtjbGFzc1N0cn0+XHJcblx0XHRcdFx0XHQ8bGFiZWwgaHRtbEZvcj1cInBob25lXCI+UGhvbmU8L2xhYmVsPlxyXG5cdFx0XHRcdFx0PGlucHV0IHJlZj1cInBob25lXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSB0eXBlPVwibnVtYmVyXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJwaG9uZVwiIHBsYWNlaG9sZGVyPVwiUGhvbmVcIiAvPlxyXG5cdFx0XHRcdDwvZGl2Pik7XHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBob25lOyIsInZhciBUYWJsZUl0ZW0gPSByZXF1aXJlKCcuL1RhYmxlQ29tcG9uZW50L1RhYmxlSXRlbScpO1xyXG5cclxudmFyIFRhYmxlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHVzZXJzIDogdGhpcy5wcm9wcy51c2VycyxcclxuXHJcblx0XHRcdGlzRmlsdGVyZWQ6IHtcclxuXHRcdFx0XHRmaXJzdE5hbWU6IGZhbHNlLFxyXG5cdFx0XHRcdGxhc3ROYW1lOiBmYWxzZSxcclxuXHRcdFx0XHRnZW5kZXI6IGZhbHNlLFxyXG5cdFx0XHRcdHBob25lOiBmYWxzZSxcclxuXHRcdFx0XHRhZ2U6IGZhbHNlXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRyZXZlcnNlOiB7XHJcblx0XHRcdFx0Zmlyc3ROYW1lOiBmYWxzZSxcclxuXHRcdFx0XHRsYXN0TmFtZTogZmFsc2UsXHJcblx0XHRcdFx0Z2VuZGVyOiBmYWxzZSxcclxuXHRcdFx0XHRwaG9uZTogZmFsc2UsXHJcblx0XHRcdFx0YWdlOiBmYWxzZVx0XHRcdFx0XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmaWx0ZXJlZDp7XHJcblx0XHRcdFx0Zmlyc3ROYW1lOiBudWxsLFxyXG5cdFx0XHRcdGxhc3ROYW1lOiBudWxsLFxyXG5cdFx0XHRcdGdlbmRlcjogbnVsbCxcclxuXHRcdFx0XHRwaG9uZTogbnVsbCxcclxuXHRcdFx0XHRhZ2U6IG51bGxcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKXtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe3VzZXJzOiBuZXh0UHJvcHMudXNlcnN9KVxyXG5cdH0sXHJcblxyXG5cdHVwZGF0ZVNvcnQ6IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgaXNGaWx0ZXJlZCA9IHtcclxuXHRcdFx0XHRmaXJzdE5hbWU6IGZhbHNlLFxyXG5cdFx0XHRcdGxhc3ROYW1lOiBmYWxzZSxcclxuXHRcdFx0XHRnZW5kZXI6IGZhbHNlLFxyXG5cdFx0XHRcdHBob25lOiBmYWxzZSxcclxuXHRcdFx0XHRhZ2U6IGZhbHNlXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRyZXZlcnNlID0ge1xyXG5cdFx0XHRcdGZpcnN0TmFtZTogZmFsc2UsXHJcblx0XHRcdFx0bGFzdE5hbWU6IGZhbHNlLFxyXG5cdFx0XHRcdGdlbmRlcjogZmFsc2UsXHJcblx0XHRcdFx0cGhvbmU6IGZhbHNlLFxyXG5cdFx0XHRcdGFnZTogZmFsc2VcdFx0XHRcdFxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZmlsdGVyZWQgPSB7XHJcblx0XHRcdFx0Zmlyc3ROYW1lOiBudWxsLFxyXG5cdFx0XHRcdGxhc3ROYW1lOiBudWxsLFxyXG5cdFx0XHRcdGdlbmRlcjogbnVsbCxcclxuXHRcdFx0XHRwaG9uZTogbnVsbCxcclxuXHRcdFx0XHRhZ2U6IG51bGxcclxuXHRcdFx0fTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe2lzRmlsdGVyZWQ6IGlzRmlsdGVyZWQsIHJldmVyc2U6IHJldmVyc2UsIGZpbHRlcmVkOiBmaWx0ZXJlZH0pO1xyXG5cclxuXHR9LFxyXG5cclxuXHRvbkRlbGV0ZTogZnVuY3Rpb24oaWQpe1xyXG5cdFx0dmFyIG5ld1VzZXJzID0gdGhpcy5zdGF0ZS51c2Vycy5maWx0ZXIoZnVuY3Rpb24odXNlcil7XHJcblx0XHRcdHJldHVybiArdXNlci5pZCAhPT0gK2lkO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7dXNlcnM6IG5ld1VzZXJzfSk7XHJcblx0XHR0aGlzLnByb3BzLnJlZnJlc2hVc2VyKG5ld1VzZXJzKTtcclxuXHR9LFxyXG5cclxuXHRjaGFuZ2VTdGF0ZTogZnVuY3Rpb24oKXtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHJldHVybiBzZWxmLnNldFN0YXRlKCk7XHJcblx0fSxcclxuXHJcblx0ZmlsdGVyQnRuOiBmdW5jdGlvbihlKXtcclxuXHRcdHZhciBmaWx0ZXJUYXJnZXQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsdGVyJyksXHJcblx0XHRcdHVzZXJzID0gdGhpcy5zdGF0ZS51c2VycyxcclxuXHRcdFx0aXNGaWx0ZXJlZCA9IHRoaXMuc3RhdGUuaXNGaWx0ZXJlZCxcclxuXHRcdFx0ZmlsdGVyZWQgPSB0aGlzLnN0YXRlLmZpbHRlcmVkLFxyXG5cdFx0XHRyZXZlcnNlID0gdGhpcy5zdGF0ZS5yZXZlcnNlO1xyXG5cclxuXHRcdGlmKGlzRmlsdGVyZWRbZmlsdGVyVGFyZ2V0XSl7XHJcblx0XHRcdHVzZXJzID0gZmlsdGVyZWRbZmlsdGVyVGFyZ2V0XTtcclxuXHRcdFx0dXNlcnMucmV2ZXJzZSgpO1xyXG5cdFx0XHRmaWx0ZXJlZFtmaWx0ZXJUYXJnZXRdID0gdXNlcnM7XHJcblxyXG5cdFx0XHRyZXZlcnNlW2ZpbHRlclRhcmdldF0gPSAhcmV2ZXJzZVtmaWx0ZXJUYXJnZXRdO1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHt1c2VyczogdXNlcnMsIGZpbHRlcmVkOiBmaWx0ZXJlZCwgcmV2ZXJzZTogcmV2ZXJzZX0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3dpdGNoKGZpbHRlclRhcmdldCl7XHJcblx0XHRcdFx0Y2FzZSAnZmlyc3ROYW1lJzpcclxuXHRcdFx0XHRcdHVzZXJzID0gdXNlcnMuc29ydChzb3J0Rmlyc3ROYW1lKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ2xhc3ROYW1lJzpcclxuXHRcdFx0XHRcdHVzZXJzID0gdXNlcnMuc29ydChzb3J0TGFzdE5hbWUpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnZ2VuZGVyJzpcclxuXHRcdFx0XHRcdHVzZXJzID0gdXNlcnMuc29ydChzb3J0R2VuZGVyKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3Bob25lJzpcclxuXHRcdFx0XHRcdHVzZXJzID0gdXNlcnMuc29ydChzb3J0UGhvbmUpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnYWdlJzpcclxuXHRcdFx0XHRcdHVzZXJzID0gdXNlcnMuc29ydChzb3J0QWdlKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpc0ZpbHRlcmVkW2ZpbHRlclRhcmdldF0gPSB0cnVlO1xyXG5cdFx0XHRmaWx0ZXJlZFtmaWx0ZXJUYXJnZXRdID0gdXNlcnM7XHJcblx0XHRcdHJldmVyc2VbZmlsdGVyVGFyZ2V0XSA9ICFyZXZlcnNlW2ZpbHRlclRhcmdldF07XHJcblxyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHt1c2VyczogdXNlcnMsIGlzRmlsdGVyZWQ6IGlzRmlsdGVyZWQsIGZpbHRlcmVkOiBmaWx0ZXJlZCwgcmV2ZXJzZTogcmV2ZXJzZX0pO1xyXG5cclxuXHRcdH1cclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gc29ydEZpcnN0TmFtZSh1c2VyQSwgdXNlckIpe1xyXG5cdFx0XHRyZXR1cm4gdXNlckEuZmlyc3ROYW1lID4gdXNlckIuZmlyc3ROYW1lO1x0XHRcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIHNvcnRMYXN0TmFtZSh1c2VyQSwgdXNlckIpe1xyXG5cdFx0XHRyZXR1cm4gdXNlckEubGFzdE5hbWUgPiB1c2VyQi5sYXN0TmFtZTtcdFx0XHJcblx0XHR9XHJcblx0XHRmdW5jdGlvbiBzb3J0R2VuZGVyKHVzZXJBLCB1c2VyQil7XHJcblx0XHRcdHJldHVybiB1c2VyQS5nZW5kZXIgPiB1c2VyQi5nZW5kZXI7XHRcdFxyXG5cdFx0fVxyXG5cdFx0ZnVuY3Rpb24gc29ydFBob25lKHVzZXJBLCB1c2VyQil7XHJcblx0XHRcdHJldHVybiB1c2VyQS5waG9uZSA+IHVzZXJCLnBob25lO1x0XHRcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIHNvcnRBZ2UodXNlckEsIHVzZXJCKXtcclxuXHRcdFx0cmV0dXJuIHVzZXJBLmFnZSAtIHVzZXJCLmFnZTtcdFx0XHJcblx0XHR9XHJcblx0fSwgXHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHZhciB0YWJsZUl0ZW0gPSB0aGlzLnN0YXRlLnVzZXJzLm1hcChmdW5jdGlvbih1c2VyKXtcclxuXHRcdFx0cmV0dXJuIDxUYWJsZUl0ZW0gdXNlcj17dXNlcn0gb25EZWxldGU9e3NlbGYub25EZWxldGV9IC8+XHJcblx0XHR9KTtcclxuXHRcdHZhciBidG5DbGFzcyA9IHtcclxuXHRcdFx0Zmlyc3ROYW1lOiB0aGlzLnN0YXRlLnJldmVyc2UuZmlyc3ROYW1lID8gJ2J0biBidG4teHMgZHJvcHVwJyA6ICdidG4gYnRuLXhzJyxcclxuXHRcdFx0bGFzdE5hbWU6IHRoaXMuc3RhdGUucmV2ZXJzZS5sYXN0TmFtZSA/ICdidG4gYnRuLXhzIGRyb3B1cCcgOiAnYnRuIGJ0bi14cycsXHJcblx0XHRcdHBob25lOiB0aGlzLnN0YXRlLnJldmVyc2UucGhvbmUgPyAnYnRuIGJ0bi14cyBkcm9wdXAnIDogJ2J0biBidG4teHMnLFxyXG5cdFx0XHRnZW5kZXI6IHRoaXMuc3RhdGUucmV2ZXJzZS5nZW5kZXIgPyAnYnRuIGJ0bi14cyBkcm9wdXAnIDogJ2J0biBidG4teHMnLFxyXG5cdFx0XHRhZ2U6IHRoaXMuc3RhdGUucmV2ZXJzZS5hZ2UgPyAnYnRuIGJ0bi14cyBkcm9wdXAnIDogJ2J0biBidG4teHMnXHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGFibGUtcmVzcG9uc2l2ZVwiPlxyXG5cdFx0XHRcdDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZVwiPlxyXG5cdFx0XHRcdFx0PHRoZWFkPlxyXG5cdFx0XHRcdFx0XHQ8dHI+XHJcblx0XHRcdFx0XHRcdFx0PHRoPkZpcnN0IE5hbWUgPGJ1dHRvbiBkYXRhLWZpbHRlcj0nZmlyc3ROYW1lJyBvbkNsaWNrPXt0aGlzLmZpbHRlckJ0bn0gY2xhc3NOYW1lPXtidG5DbGFzcy5maXJzdE5hbWV9PjxzcGFuIGNsYXNzTmFtZT0nY2FyZXQnPjwvc3Bhbj48L2J1dHRvbj48L3RoPlxyXG5cdFx0XHRcdFx0XHRcdDx0aD5MYXN0IE5hbWUgPGJ1dHRvbiBkYXRhLWZpbHRlcj0nbGFzdE5hbWUnIG9uQ2xpY2s9e3RoaXMuZmlsdGVyQnRufSBjbGFzc05hbWU9e2J0bkNsYXNzLmxhc3ROYW1lfT48c3BhbiBjbGFzc05hbWU9J2NhcmV0Jz48L3NwYW4+PC9idXR0b24+PC90aD5cclxuXHRcdFx0XHRcdFx0XHQ8dGg+UGhvbmUgPGJ1dHRvbiBkYXRhLWZpbHRlcj0ncGhvbmUnIG9uQ2xpY2s9e3RoaXMuZmlsdGVyQnRufSBjbGFzc05hbWU9e2J0bkNsYXNzLnBob25lfT48c3BhbiBjbGFzc05hbWU9J2NhcmV0Jz48L3NwYW4+PC9idXR0b24+PC90aD5cclxuXHRcdFx0XHRcdFx0XHQ8dGg+R2VuZGVyIDxidXR0b24gZGF0YS1maWx0ZXI9J2dlbmRlcicgb25DbGljaz17dGhpcy5maWx0ZXJCdG59IGNsYXNzTmFtZT17YnRuQ2xhc3MuZ2VuZGVyfT48c3BhbiBjbGFzc05hbWU9J2NhcmV0Jz48L3NwYW4+PC9idXR0b24+PC90aD5cclxuXHRcdFx0XHRcdFx0XHQ8dGg+QWdlIDxidXR0b24gZGF0YS1maWx0ZXI9J2FnZScgb25DbGljaz17dGhpcy5maWx0ZXJCdG59IGNsYXNzTmFtZT17YnRuQ2xhc3MuYWdlfT48c3BhbiBjbGFzc05hbWU9J2NhcmV0Jz48L3NwYW4+PC9idXR0b24+PC90aD5cclxuXHRcdFx0XHRcdFx0XHQ8dGg+PC90aD5cclxuXHRcdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHRcdDwvdGhlYWQ+XHJcblx0XHRcdFx0XHQ8dGJvZHk+XHJcblx0XHRcdFx0XHRcdHt0YWJsZUl0ZW19XHJcblx0XHRcdFx0XHQ8L3Rib2R5PlxyXG5cdFx0XHRcdDwvdGFibGU+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRhYmxlOyIsInZhciBUYWJsZUl0ZW0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0b25EZWxldGU6IGZ1bmN0aW9uKGUpe1xyXG5cdFx0dGhpcy5wcm9wcy5vbkRlbGV0ZShlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSk7XHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHVzciA9IHRoaXMucHJvcHMudXNlcjtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDx0cj5cclxuXHRcdFx0XHQ8dGQ+e3Vzci5maXJzdE5hbWV9PC90ZD5cclxuXHRcdFx0XHQ8dGQ+e3Vzci5sYXN0TmFtZX08L3RkPlxyXG5cdFx0XHRcdDx0ZD57dXNyLnBob25lfTwvdGQ+XHJcblx0XHRcdFx0PHRkPnt1c3IuZ2VuZGVyfTwvdGQ+XHJcblx0XHRcdFx0PHRkPnt1c3IuYWdlfTwvdGQ+XHJcblx0XHRcdFx0PHRkPjxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbSBidG4tZGFuZ2VyXCIgZGF0YS1pZD17dXNyLmlkfSBvbkNsaWNrPXt0aGlzLm9uRGVsZXRlfT54PC9idXR0b24+PC90ZD5cclxuXHRcdFx0PC90cj5cclxuXHRcdCk7XHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRhYmxlSXRlbTsiLCJ2YXIgQmFzZUZvcm0gPSByZXF1aXJlKCcuL0Jhc2VGb3JtJyk7XHJcbnZhciBUYWJsZSA9IHJlcXVpcmUoJy4vVGFibGUnKTtcclxuXHJcbnZhciBVc2VyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcclxuXHRcdHZhciBVU0VSX0lURU1TID0gW1xyXG5cdFx0XHR7Zmlyc3ROYW1lOidWYXN5YScsIGxhc3ROYW1lOiAnUGV0cm92JywgcGhvbmU6ICcwOTk1NTY2NjYnLCBnZW5kZXI6J21hbGUnLCBhZ2U6IDE4LCBpZDogMX0sXHJcblx0XHRcdHtmaXJzdE5hbWU6J1Nhc2hhJywgbGFzdE5hbWU6ICdBbGV4ZWV2JywgcGhvbmU6ICc2NjYnLCBnZW5kZXI6J21hbGUnLCBhZ2U6IDMzLCBpZDogMn0sXHJcblx0XHRcdHtmaXJzdE5hbWU6J05hc3R5YScsIGxhc3ROYW1lOiAnVmFsYWJ1ZXZhJywgcGhvbmU6ICc5OTk5OTk4JywgZ2VuZGVyOidmZW1hbGUnLCBhZ2U6IDI3LCBpZDogM31cclxuXHRcdF07XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR1c2VyczogVVNFUl9JVEVNUyxcclxuXHRcdFx0dXNlcklkOiBVU0VSX0lURU1TLmxlbmd0aFxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdG9uTmV3VXNlcjogZnVuY3Rpb24odXNlcil7XHJcblx0XHR1c2VyLmlkID0gKyt0aGlzLnN0YXRlLnVzZXJJZDtcclxuXHRcdHZhciBuZXdVc2VycyA9IHRoaXMuc3RhdGUudXNlcnMuY29uY2F0KFt1c2VyXSk7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0dXNlcnM6IG5ld1VzZXJzLFxyXG5cdFx0XHR1c2VySWQ6IHVzZXIuaWRcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0cmVmcmVzaFVzZXI6IGZ1bmN0aW9uKHVzZXJzKXtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe3VzZXJzOiB1c2Vyc30pO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxzZWN0aW9uPlxyXG5cdFx0XHRcdDxzZWN0aW9uIGNsYXNzTmFtZT0ncGFuZWwgcGFuZWwtcHJpbWFyeSc+XHJcblx0XHRcdFx0XHQ8QmFzZUZvcm0gb25OZXdVc2VyPXt0aGlzLm9uTmV3VXNlcn0gLz5cclxuXHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHJcblx0XHRcdFx0PHNlY3Rpb24gY2xhc3NOYW1lPSdwYW5lbCBwYW5lbC1pbmZvJz5cclxuXHRcdFx0XHRcdDxUYWJsZSB1c2Vycz17dGhpcy5zdGF0ZS51c2Vyc30gcmVmcmVzaFVzZXI9e3RoaXMucmVmcmVzaFVzZXJ9IC8+XHJcblx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXI7Il19
