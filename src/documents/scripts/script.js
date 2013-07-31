YUI({
//	filter: 'debug', combine: false,
	gallery: 'gallery-2013.06.26-23-09'
}).use(
	'gallery-accordion-horiz-vert',
	'anim-base',
	'node-focusmanager','node','event',
function(Y)
{
	Y.all('.main .l-box').on({
		mouseover: function(){
			Y.one('#Shape_8 path').addClass('path-over');
			Y.one('#Shape_8 path').removeClass('path-off');
			Y.one('.second-section .pure-u-1-3').setStyle('border-bottom','16px solid rgba(25, 25, 112, 0.8)');
			Y.one('#Shape_8 path').removeClass('notransition');
		},
		mouseout: function(){
			Y.one('#Shape_8 path').removeClass('path-over');
			Y.one('#Shape_8 path').addClass('path-off');
			Y.one('.second-section .pure-u-1-3').setStyle('border-bottom','16px solid #bdc3c7');
			Y.one('#Shape_8 path').addClass('notransition');
		}
	});

	function onTitleClicked(e, a)
	{
		var t = e.target;
		var i = a.findSection(e.target);
		if (i >= 0)
		{
			a.toggleSection(i);
		}
	}

	function updateFocusMgr()
	{
		var a    = this;

		var node = a.get('contentBox');
		node.unplug(Y.Plugin.NodeFocusManager);
		node.plug(Y.Plugin.NodeFocusManager,
		{
			descendants: '.yui3-accordion-title a',
			circular:    false,
			focusClass:
			{
				className: a.getClassName('title', 'focused'),
				fn: function (node)
				{
					return node.get('parentNode');
				}
			}
		});
	}

	// create accordions

	var vm = new Y.Accordion(
	{
		srcNode: '#accordion-test-vert-markup-content',
		replaceTitleContainer:   false,
		replaceSectionContainer: false,
		allowMultipleOpen:       true
	});

	var accordions = [ vm ];

	Y.on('domready', function()
	{
		vm.render('#accordion-test-vert-markup');
		Y.delegate('click', onTitleClicked, '#accordion-test-vert-markup', '.my-title-vert', null, vm);

		Y.each(accordions, function(a)
		{
			updateFocusMgr.call(a);

			a.on('insert', function()
			{
				Y.later(1, this, updateFocusMgr);
			});
			a.on('remove', updateFocusMgr);
		});
	});

	// test inserting sections

	var count = 6;

	function addSectionHandlers(
		/* object */	a,
		/* object */	s)
	{
		Y.on('click', function(type, a, el)
		{
			var i = a.findSection(el);
			if (i >= 0)
			{
				a.removeSection(i);
			}
		},
		s.content, null, a, s.content);
	};

	function insertVertSection(
		/* accordion */	obj,
		/* string */	c1,
		/* string */	c2)
	{
		count++;

		var s = obj.insertSection(1, '<div class="'+c1+'"><a href="javascript:void(0);">#'+count+'</a></div>',
								  '<div class="'+c2+'"><p>inserted content #'+count+'<br>click to delete</p></div>');
		addSectionHandlers(obj, s);
	};

	Y.on('click', function()
	{
		insertVertSection(vm, 'my-title-vert', 'my-section-vert');
	},
	'#insert-section');
});