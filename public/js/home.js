$(document).ready(function() {
	var mailchimp_api = "https://us14.api.mailchimp.com/3.0"
	var list_id = 72807
	var $btn = $('#mail-signup');
	var $input = $('#email');
	var $promo = $('p.promo');

	function displayThanks(res, e) {
		$('.top-cta').hide();
		$btn.text('Subscribed!').addClass('success').off('click');
		$promo
			.css('opacity', '0')
			.addClass('thanks')
			.removeClass('invalid animated flash')
			.html('<br />');
		setTimeout(function() {
			$promo
				.css('opacity', '1')
				.html('Thanks, heathen! Now follow us on Twitter: <a href="https://twitter.com/gotohellbook" target="_blank">@gotohellbook</a>')
		}, 0)		
	}

	function displayInvalid() {
		$promo
			.html('Lying is a sin. Please enter a real email address!')
			.addClass('invalid animated flash');

		setTimeout(function() {
			$promo.removeClass('animated flash');
		}, 1000)
	}

	$btn.on('click', function(e) {
		e.preventDefault();
		var email = $input.val();
		console.log(email);
		if (!email) {
			return false;
		}

		var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!email.match(emailRegex)) {
			displayInvalid();
			return false;
		}

		/*setTimeout(function() {
			displayThanks();
		}, 600);*/

		$.ajax({
			method: 'POST',
			url: 'https://hooks.zapier.com/hooks/catch/1806823/thrq9h/',
			//url: `${mailchimp_api}/lists/${list_id}/members/`,
			data: {
				"email_address": email
			}
		}).then(function(res, e) {
			displayThanks(res, e);
		});
	});

	$input.on('keypress', function(e) {
		if (e.which === 13) {
			$btn.trigger('click');
		}
	});
});