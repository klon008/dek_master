import $ from 'jquery';
import _ from 'lodash';
import popper from 'popper.js';
import bootstrap from 'bootstrap';
import 'slick-carousel'

$(document).ready(function () {
	const init = () => {
		let target = $("#wood_board  .modal-articles .custom-article.active");
		let template = target.find('template').eq(0).html();
		let html = _.template(template);
		$("#wood_board-descition").html(html);
		//SLICK
		$('.slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: false,
			asNavFor: '.slider-nav',
			autoplay: true,
		});
		$('.slider-nav').slick({
			slidesToShow: 4,
			variableWidth: true,
			slidesToScroll: 1,
			dots: false,
			centerMode: false,
			focusOnSelect: true,
			asNavFor: '.slider',
			infinite: true,
			
		});
	};
	init();

	// Плавный скролл
	$("#vanbarMainTop").on("click", "a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id = $(this).attr('href'),

			//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;

		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({
			scrollTop: top
		}, 1500);
	});



	$("#modal-wood-1").click(() => {
		$('#wood_board').modal();
	});
	$("#wood_board.modal .modal-articles .custom-article").click((e) => {
		$("#wood_board .modal-articles .custom-article").removeClass('active');
		let target = $(e.currentTarget);
		target.addClass('active');
		let template = target.find('template').eq(0).html();
		let html = _.template(template);
		$("#wood_board-descition").html(html);
	})

	//
    $('.header__burger').click(function (event) {
            $('.header__burger, .menu-container__burger').toggleClass('active_b');
    })


    $('.nav-item a').click(function () {
        $('.header__burger, .menu-container__burger').toggleClass('active_b');
    })
	//
});

var quizGo = (pageNumber) => {
	var firstElementWithClass = document.querySelector('.quiz_item');
	firstElementWithClass.style.marginLeft = "-" + ((pageNumber - 1) * 100) + "%";
}
window.quizGo = quizGo;