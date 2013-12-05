YUI().use('node','event',
function(Y)
{
	function scrolledPast(){
		Y.all('#main-header').addClass('main-header-scrolled');
		Y.all('#iconmonstrNav > svg').addClass('iconmonstr-head-nav-scrolled');
		Y.all('#phone').addClass('phone-scrolled');
		Y.all('#head-nav').addClass('head-nav-scrolled');
		Y.all('#logoSVG').addClass('logoSVG-scrolled');
		Y.one('.mobile-menu').setStyle('margin', '-2px 0 0 0');
	}

	function scrolledTop(){
		Y.all('#main-header').removeClass('main-header-scrolled');
		Y.all('#iconmonstrNav > svg').removeClass('iconmonstr-head-nav-scrolled');
		Y.all('#phone').removeClass('phone-scrolled');
		Y.all('#head-nav').removeClass('head-nav-scrolled');
		Y.all('#logoSVG').removeClass('logoSVG-scrolled');
		Y.one('.mobile-menu').setStyle('margin', '14px 0 0 0');
	}

	Y.one('#main-header').on({
		mouseover : function(){ if(document.body.scrollTop > 111) scrolledTop();},
		mouseout  : function(){ if(document.body.scrollTop > 111) scrolledPast();}
	});

	Y.on('scroll', function(){
		document.documentElement.scrollTop || document.body.scrollTop < 111 ?
			scrolledTop()
		:   scrolledPast();
	});

	Y.on('domready', function()
	{
		function iconHover(hoverElm, icon1, icon2){
			Y.one(icon1).hide();	
			Y.one(hoverElm).on({
				mouseover : function(){
					Y.one(icon2).hide();
					Y.one(icon1).show();	
				},
				mouseout  : function(){
					Y.one(icon2).show();
					Y.one(icon1).hide();
				}
			});	
		}

		iconHover('#footPin','#footPin15','#footPin16');
		iconHover('#footCall','#footPhone5','#footPhone');
		iconHover('#footMail','#footEmail8','#footEmail');
		iconHover('#twIcon','#footTwitter5','#footTwitter4');
		iconHover('#fbIcon','#footFacebook5','#footFacebook4');
		iconHover('#gpIcon','#footGplus5','#footGplus4');
		iconHover('#inIcon','#footLinkedin5','#footLinkedin4');
	
	});

	// Mobile menu
	Y.one('select').on('change', function(){
		var selIndex = this.get("selectedIndex");
		var attrOpts = this.get("options");
		window.location = attrOpts.item(selIndex).get('value');
	});
	// http://yuilibrary.com/yui/docs/attribute/attribute-event.html

});