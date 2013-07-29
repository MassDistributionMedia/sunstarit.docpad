YUI({
    //Last Gallery Build of this module
    gallery: 'gallery-2013.01.30-21-00'
}).use('gallery-accordion-horiz-vert', function(Y)
{
	function onTitleClicked(e, a)
	{
		var t = e.target;
		var i = a.findSection(e.target);
		if (i !== false)
		{
			a.toggleSection(i);
		}
	}
 
	var accordion = new Y.Accordion(
	{
		boundingBox: '#my-vert-accordion',
		titles:
		[
			'<div class="my-title-vert"><a href="javascript:void(0);">#1</a></div>',
			'<div class="my-title-vert"><a href="javascript:void(0);">#2</a></div>',
			'<div class="my-title-vert"><a href="javascript:void(0);">#3</a></div>'
		],
		sections:
		[
			'<p>testing</p>',
			'<p>testing testing</p>',
			'<p>testing</p><p>testing</p><p>testing</p>'
		]
	});
 
	accordion.after('render', function()
	{
		Y.on('click', onTitleClicked, '#my-vert-accordion .my-title-vert', null, accordion);
	});
});