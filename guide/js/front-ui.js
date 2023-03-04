
$(document).ready(function(){
	if($("#snb .inner div").length > 0)
	{
		var prevMenu = $("#snb .selected").find(".dep2").children("li").eq(0);
		var nowSection = $("#snb .selected").find("div > a").attr('href');
		var nowMenu  = $("#snb .inner li:first div > a");
		var nowClick = false;
		
		$("#snb .inner div > a").click(function(event){
			window.scrollTo(0,0);
			nowClick = true;
			nowMenu = $(this);			
			nowSection = $(this).attr('href');
			$(nowSection).show();

			var move_target;
			move_target = nowSection+" .contField"; 		
			nowClick = false;

			$('#snb .dep2 > li').removeClass('active');
			$(this).parents('li').find('.dep2>li:eq(0)').addClass('active');
		});	

		$('#snb .dep2 > li').click(function(){
			$('#snb .dep2 > li').removeClass('active');
			if(prevMenu) prevMenu.removeClass("active");
			prevMenu = $(this);
			prevMenu.addClass('active');

			nowSection = $(this).parents('.selected').find("div > a").attr('href');
						
			var move_target = nowSection+" .contField"; 
			nowClick = true;
			$("html, body").stop().animate({ scrollTop : $(move_target+($(this).index()+1)).offset().top }, 0, "easeOutCubic", function(){
				nowClick = false;
			});
		});
		
		$(window).scroll(function(e) {	
			prevMenu = scrollHandler_p(nowMenu, nowSection, prevMenu, nowClick);

			var $this = $('#snb'),
				$opts_scroll_top = $(window).scrollTop();			
				if($(window).scrollTop() < $('#header').height()+57)
				{
					$('#snb').css('top',($('#header').height()+57-$(window).scrollTop())+'px');
				}else{
					$('#snb').css('top',0);
				}	
		}).resize(function(){
			prevMenu = scrollHandler_p(nowMenu, nowSection, prevMenu, nowClick);
		});		
	}

	$('.top').click(function(e){
    	e.preventDefault();
		window.scrollTo(0,0);			
    });
	Navisnb();
});

function scrollHandler_p(nowMenu, nowSection, prevMenu, nowClick)
{
	if(!nowClick)
	{
		var obj; 
		move_target = " .contField"; 
		obj = $(nowSection + move_target);
		
		obj.each(function(index,value) {
			if($(window).scrollTop()+($(window).innerHeight()/2)>$(value).offset().top && $(window).scrollTop()+($(window).innerHeight()/2)<$(value).offset().top+$(value).height())
			{
				if(prevMenu.index() != index)
				{
					$('.selected .dep2').children("li").removeClass('active');
					prevMenu = $('.selected .dep2').children("li").eq(index);
					prevMenu.addClass('active');
				}
			}
		});
	}
	return prevMenu;
}

 function Navisnb(){
	var dep1 =$('#snb > ul > li div a');
	var dep2 =$('#snb > ul ul');

	$('#snb > ul > li').each(function() {		
		if($(this).hasClass('selected')){
			$(this).find('.dep2').css('display','block');
			$(this).find('.dep2>li:first-child').addClass('active');
		}
		if($(this).find('.dep2').length == 0){
			$(this).addClass("nodep");
		}		
	});

	dep1.click(function(e){
		$('.contents').hide();
		var id = $(this).attr('href');
		$(id).show();

		$('#snb > ul > li').removeClass('selected');
		$(this).parents('li').addClass('selected').siblings().find('.dep2').slideUp('slow','swing');
		$(this).parents('li').find('.dep2>li:first-child').addClass('active');

		if($(this).parent().next('ul').css("display")=="none"){
			$(this).parent().next('ul').slideDown('slow','swing');
		} else{
			 $(this).parent().next('ul').slideUp('slow','swing');
		}
		e.preventDefault();
	});
}