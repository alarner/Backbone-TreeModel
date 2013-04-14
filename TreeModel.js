define([], function() {
	return Backbone.Model.extend({
		'c_data_attribute': '_tree_model_data',
		'c_classes_attribute': '_tree_model_classes',
		'c_init_attribute': 'collections',
		'initialize': function(data) {
			this[this.c_data_attribute] = {};
			this[this.c_classes_attribute] = {};
			this._init(data);
		},
		'_init': function(data) {
			// Copy everything in the [c_init_attribute] object to the 
			// this[c_classes_attribute] so that it doesn't get lost
			// after initialization
			for(var i in this[this.c_init_attribute]) {
				if(this[this.c_init_attribute].hasOwnProperty(i)) {
					this[this.c_classes_attribute][i] = this[this.c_init_attribute][i];
				}
			}

			for(var i in data) {
				if(data.hasOwnProperty(i)) {
					if(!this.__proto__.defaults.hasOwnProperty(i) && this[this.c_classes_attribute][i] != undefined) {
						var collectionClass = this[this.c_classes_attribute][i];
						this[this.c_data_attribute][i] = new collectionClass(data[i]);
						this.unset(i);
					}
				}
			}
		},
		setAll: function(data) {
			var regularData = {};
			for(var i in data) {
				if(data.hasOwnProperty(i)) {
					if(!this.__proto__.defaults.hasOwnProperty(i) && this[this.c_classes_attribute][i] != undefined) {
						if(this[this.c_data_attribute][i] != undefined) {
							this[this.c_data_attribute][i].reset(data[i]);
						}
						else {
							var collectionClass = this[this.c_classes_attribute][i];
							this[this.c_data_attribute][i] = new collectionClass(data[i]);
						}
					}
					else if(this.__proto__.defaults.hasOwnProperty(i)) {
						regularData[i] = data[i];
					}
				}
			}
			this.set(regularData);
		},
		'getCollection': function(name) {
			if(this[this.c_data_attribute][name] != undefined) {
				return this[this.c_data_attribute][name];
			}
			return null;
		},
		'getc': function(name) {
			return this.getCollection(name);
		}
	});
});