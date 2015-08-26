var TableItem = React.createClass({
	onDelete: function(e){
		this.props.onDelete(e.target.getAttribute('data-id'));
	},
	render: function() {
		var usr = this.props.user;
		return (
			<tr>
				<td>{usr.firstName}</td>
				<td>{usr.lastName}</td>
				<td>{usr.phone}</td>
				<td>{usr.gender}</td>
				<td>{usr.age}</td>
				<td><button className="btn btn-sm btn-danger" data-id={usr.id} onClick={this.onDelete}>x</button></td>
			</tr>
		);
	}

});

module.exports = TableItem;