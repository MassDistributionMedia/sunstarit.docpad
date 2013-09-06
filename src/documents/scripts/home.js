YUI({
//	filter: 'debug', combine: false,
	gallery: 'gallery-2013.06.26-23-09'
}).use(
	'gallery-accordion-horiz-vert',
	'anim-base',
	'node-focusmanager','node','event',
function(Y)
{
	// accordion start
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
		var keys = a.get('horizontal') ?
			{ next: "down:39", previous: "down:37" } :
			{ next: "down:40", previous: "down:38" };

		var node = a.get('contentBox');
		node.unplug(Y.Plugin.NodeFocusManager);
		node.plug(Y.Plugin.NodeFocusManager,
		{
			descendants: '.yui3-accordion-title a',
			keys:        keys,
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

	var vm = new Y.Accordion(
	{
		srcNode: '#accordion-test-vert-markup-content',
		replaceTitleContainer:   false,
		replaceSectionContainer: false,
		allowMultipleOpen:       true
	});

	Y.one('.pure-menu').setStyle('opacity', 0.8);
	Y.one('.pure-menu').on({
		mouseover : function(){
			this.setStyle('opacity', 1);
		},
		mouseout  : function(){
			this.setStyle('opacity', 0.8);
		}
	});

	Y.on('domready', function()
	{
		vm.render('#accordion-test-vert-markup');
		Y.delegate('click', onTitleClicked, '#accordion-test-vert-markup', '.my-title-vert', null, vm);

		updateFocusMgr.call(vm);

		vm.on('insert', function()
		{
			Y.later(1, this, updateFocusMgr);
		});
		vm.on('remove', updateFocusMgr);

		Y.one('.vision-vert').ancestor().addClass('vision-title');
		Y.one('.vision-inner').ancestor().addClass('vision-title');
		Y.one('.mission-vert').ancestor().addClass('mission-title');
		Y.one('.mission-inner').ancestor().addClass('mission-title');
		Y.one('.job-vert').ancestor().addClass('job-title');
		Y.one('.job-inner').ancestor().addClass('job-title');
		// accordion end

		function secondHover(hoverElm,shape,third){
			Y.one(hoverElm).on({
				mouseover: function(){
					Y.all(third).addClass('second-over');
					Y.all(shape).setStyles({
						'-webkit-animation-name': 'rotate',
    					'-webkit-animation-duration': '3.77s', 
    					'-webkit-animation-iteration-count': 'infinite',
    					'-webkit-animation-timing-function': 'linear'
					});
				},
				mouseout: function(){
					Y.all(third).removeClass('second-over');
					Y.all(shape).setStyle('-webkit-animation-name', 'auto');					
				}
			});
		}

		secondHover('#techRec','#techPath','#techThird');
		secondHover('#devOut','#devPath','#devThird');
		secondHover('#projMan','#projPath','#projThird');

		Y.one('#careerNav').on('click', function(){
			Y.one('.job-vert').simulate('click');
		});

	});
});