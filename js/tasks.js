define(['text!../tasks/tasks.json'], function (list) {
	var tasks = JSON.parse(list);
	var path = '../tasks';


	// Export
	return ({

		init: function () {
			var el = this.el = document.createElement('div');

			el.id = 'tasks';
			el.innerHTML = Object.keys(tasks).map(function (name) {
				var task = tasks[name];
				return '<a href="#' + name + '">' + task.name + '</a>';
			}).join('<br/>');

			el.addEventListener('click', function () {
				el.classList.toggle('collapse');
			}, false);

			document.body.appendChild(el);

			window.addEventListener('hashchange', this, false);

			return this;
		},

		handleEvent: function () {
			var name = location.toString().split('#')[1];

			if (tasks[name]) {
				require('.js .html .tests.js'.split(' ').map(function (ext) {
					return 'text!' + path + '/' + name + '/' + name + ext;
				}), this._onselect);
			}
		},

		onselect: function (callback) {
			this._onselect = callback;
			this.handleEvent();
		}

	}).init();
});
