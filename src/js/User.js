var BaseForm = require('./BaseForm');
var Table = require('./Table');

var User = React.createClass({
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
			<section>
				<section className='panel panel-primary'>
					<BaseForm onNewUser={this.onNewUser} />
				</section>
	
				<section className='panel panel-info'>
					<Table users={this.state.users} refreshUser={this.refreshUser} />
				</section>
			</section>
		);
	}
});

module.exports = User;