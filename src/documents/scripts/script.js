YUI({
//	filter: 'debug', combine: false,
	gallery: 'gallery-2013.06.26-23-09'
}).use(
	'gallery-accordion-horiz-vert',
	'anim-base',
	'node-focusmanager','node','event',
function(Y)
{

	function scrolledPast(){
		Y.all('#main-header').addClass('main-header-scrolled');
		Y.all('#iconmonstrNav > svg').addClass('iconmonstr-head-nav-scrolled');
		Y.all('#phone').addClass('phone-scrolled');
		Y.all('#head-nav').addClass('head-nav-scrolled');
		Y.all('#logoSVG').addClass('logoSVG-scrolled');
	}

	function scrolledTop(){
		Y.all('#main-header').removeClass('main-header-scrolled');
		Y.all('#iconmonstrNav > svg').removeClass('iconmonstr-head-nav-scrolled');
		Y.all('#phone').removeClass('phone-scrolled');
		Y.all('#head-nav').removeClass('head-nav-scrolled');
		Y.all('#logoSVG').removeClass('logoSVG-scrolled');
	}

	var toggy = 0;
	function toggyZero(){
		toggy = 0;
		return toggy;
	}
	function toggyOne(){
		toggy = 1;
		return toggy;
	}
		
	document.getElementById('main-header').onmouseover = toggyOne;
	document.getElementById('main-header').onmouseout = toggyZero;

		Y.on('scroll', function(){
			toggy === 0 && document.documentElement.scrollTop || document.body.scrollTop > 111 ?
				scrolledPast()
				: scrolledTop();
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

	// create accordion

	var vm = new Y.Accordion(
	{
		srcNode: '#accordion-test-vert-markup-content',
		replaceTitleContainer:   false,
		replaceSectionContainer: false,
		allowMultipleOpen:       true
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

		Y.all('.main .l-box').on({
			mouseover: function(){
				Y.one('#Shape_8 path').addClass('path-over');
				Y.one('#Shape_8 path').removeClass('path-off');
				Y.one('.second-section .pure-u-1-3').addClass('second-over');
				Y.one('#Shape_8 path').removeClass('notransition');
			},
			mouseout: function(){
				Y.one('#Shape_8 path').removeClass('path-over');
				Y.one('#Shape_8 path').addClass('path-off');
				Y.one('.second-section .pure-u-1-3').removeClass('second-over');
				Y.one('#Shape_8 path').addClass('notransition');
			}
		});
	});

});