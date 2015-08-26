var TableItem = require('./TableComponent/TableItem');

var Table = React.createClass({
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
			return <TableItem user={user} onDelete={self.onDelete} />
		});
		var btnClass = {
			firstName: this.state.reverse.firstName ? 'btn btn-xs dropup' : 'btn btn-xs',
			lastName: this.state.reverse.lastName ? 'btn btn-xs dropup' : 'btn btn-xs',
			phone: this.state.reverse.phone ? 'btn btn-xs dropup' : 'btn btn-xs',
			gender: this.state.reverse.gender ? 'btn btn-xs dropup' : 'btn btn-xs',
			age: this.state.reverse.age ? 'btn btn-xs dropup' : 'btn btn-xs'
		};

		return (
			<div className="table-responsive">
				<table className="table">
					<thead>
						<tr>
							<th>First Name <button data-filter='firstName' onClick={this.filterBtn} className={btnClass.firstName}><span className='caret'></span></button></th>
							<th>Last Name <button data-filter='lastName' onClick={this.filterBtn} className={btnClass.lastName}><span className='caret'></span></button></th>
							<th>Phone <button data-filter='phone' onClick={this.filterBtn} className={btnClass.phone}><span className='caret'></span></button></th>
							<th>Gender <button data-filter='gender' onClick={this.filterBtn} className={btnClass.gender}><span className='caret'></span></button></th>
							<th>Age <button data-filter='age' onClick={this.filterBtn} className={btnClass.age}><span className='caret'></span></button></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{tableItem}
					</tbody>
				</table>
			</div>
		)
	}
});

module.exports = Table;