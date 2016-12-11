$(document).ready(function() {
	var mailchimp_api = "https://us14.api.mailchimp.com/3.0"
	var list_id = 72807
	var $btn = $('#mail-signup');
	var $input = $('#email');

	$btn.on('click', function(e) {
		e.preventDefault();
		var email = $input.val();
		console.log(email);
		if (!email) {
			return false;
		}

		$.ajax({
			method: 'POST',
			url: 'https://hooks.zapier.com/hooks/catch/1806823/thrq9h/',
			//url: `${mailchimp_api}/lists/${list_id}/members/`,
			data: {
				"email_address": email
			}
		}).then(function(res, e) {
			console.log(res, e);
			$btn.text('Subscribed!').addClass('success').off('click');
		});
	});

	$input.on('keypress', function(e) {
		if (e.which === 13) {
			$btn.trigger('click');
		}
	});
});