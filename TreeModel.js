define([], function() {
	return Backbone.Model.extend({
		'initialize': function(data) {
			this._init(data);
		},
		'_init': function(data) {
			var collectionsUsed = [];
			for(var i in data) {
				if(data.hasOwnProperty(i)) {
					if(!this.__proto__.defaults.hasOwnProperty(i) && this[i] != undefined) {
						var collectionClass = this[i];
						this[i] = new collectionClass(data[i]);
					}
				}
			}
		},
		'getCollection': function(name) {
			if(this[name] && !_.isFunction(this[name])) {
				return this[name];
			}
			return null;
		},
		'getc': function(name) {
			return this.getCollection(name);
		},
		'setCollections': function(data) {
			for(var i in data) {
				if(data.hasOwnProperty(i)) {
					if(this[i]) {
						if(_.isFunction(this[i])) {
							var collectionClass = this[i];
							this[i] = new collectionClass(data[i]);
						}
						else {
							this[i].reset(data[i]);
						}
					}
				}
			}
		},
		'setc': function(data) {
			return this.setCollections(data);
		}
	});
});