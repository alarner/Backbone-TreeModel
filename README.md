Backbone-TreeModel
==================

Extends backbone model to allow for collections within the model.

Example use:
<pre>
<code>
// Extend TreeModel
// For any collections that you'd like to include in the model,
// simply set an attribute equal to the collection class that  
// you'd like to use when data is loaded (in this case
// FieldCollection).
var TableModel = TreeModel.extend({
  'defaults': {
		'table_id': null,
		'name': null,
		'engine': null,
		'charset': null
	},
	'collections': {
		'fields': FieldCollection
	}
	'idAttribute': 'table_id'
});

var data = {
	'table_id': 1,
	'name': 'example_table',
	'engine': 'InnoDb',
	'charset': 'utf8',
	'fields': [
		{
			'field_id': 1,
			'name': 'example_field1'
		},
		{
			'field_id': 2,
			'name': 'example_field2'
		}
	]
};

// Load the data into the model.
var tableModel = new TableModel(data);

// Use getc or getCollection to grab the fields collection.
var fieldCollection = tableModel.getc('fields');
var fieldModel = fieldCollection.get(1); // Will grab the field with id of 1

// Use setAll to set attributes and/or collections on the model
tableModel.setAll({
	'engine': 'MyISAM',
	'fields': [
		{
			'field_id': 1,
			'name': 'example_field1'
		},
		{
			'field_id': 2,
			'name': 'example_field2'
		},
		{
			'field_id': 3,
			'name': 'example_field3'
		}
	]
})
</code>
</pre>
