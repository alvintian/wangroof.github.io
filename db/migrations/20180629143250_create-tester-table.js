exports.up = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users')
		.dropTableIfExists('admin').dropTableIfExists('comments')
		.dropTableIfExists('picture')
		.then(createUserTable)
		.then(createAdminTable)
		.then(createCommentsTable)
		.then(createPictureTable)
		.then(createDummyData);

	function createUserTable() {
		return knex.schema.createTable('users', table => {
			table.increments('id').primary()
			table.string('name')
			table.string('email')
			table.string('phone')
			table.string('address')
			table.string('postal_code')
			table.string('message')
			table.integer('rating')

		})
	};

	function createCommentsTable() {
		return knex.schema.createTable('comments', table => {
			table.increments('id').primary()
			table.string('feedback')
		})
	};
	function createPictureTable() {
		return knex.schema.createTable('picture', table => {
			table.string('src')
			table.string('thumbnail')			
		})
	};
	function createAdminTable() {
		return knex.schema.createTable('admin', table => {
			table.increments('id').primary()
			table.string('name')
			table.string('password')
		})
	};
	function createDummyData() {
		return Promise.all([knex('users').insert([{
				name: "DoDo",
				email: "alvintian2003@yahoo.ca",
				phone: "416-345-6788",
				address: "123 bean str, Toronto",
				postal_code: "W2D 3F6",
				message: "my roof needs replacement"
			}, {
				name: "Jeff",
				email: "JeffBezo@yahoo.ca",
				phone: "647-123-4567",
				address: "33 wall st",
				postal_code: "A1A 1A1",
				message: "i need 10 new roofs"
			}]),
			knex('admin').insert([{
				name: "wong",
				password: "abc123"
			}]),
			knex('picture').insert([{
				src: "/images/file-1537247126746.jpeg",
				thumbnail: "/images/file-1537247126746.jpeg"
			}])
			
		])
	};
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users')
		.dropTableIfExists('admin').dropTableIfExists('comments')
		.dropTableIfExists('picture')
};