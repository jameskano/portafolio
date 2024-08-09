// jshint esversion:9

const topBTN = $(".top");
const submit = $(".submit-btn");
const win = $(window);
const name = $("#nombre");
const email = $("#email");
const message = $("#mensaje");
const contactForm = $("#contact-form");



// Scroll button
win.scroll(function() {
  if (win.scrollTop() > 350) {
    topBTN.addClass("show");
  } else {
    topBTN.removeClass("show");
  }
});

topBTN.click(function() {
  $("html, body").animate({scrollTop: 0}, "400");
});



// Active navigation bar element
$(document).ready(function() {
  let url = window.location;
  $('a[href="' + url + '"]').parent().addClass('active');
  $('a').filter(function() {
    return this.href == url;
  }).parent().addClass('active');
});



// zoom image:
const overlay = $("<div id='overlay' class='overlay'></div>");
const nextBTN = $("<div id='next-btn' class='next-btn'><i class='fas fa-chevron-right fa-2x'></i></div>");
const prevBTN = $("<div id='prev-btn' class='prev-btn'><i class='fas fa-chevron-left fa-2x'></i></div>");
const exitBTN = $("<div id='exit-btn' class='exit-btn'><i class='fas fa-times fa-3x'></i></div>");
const img = $("<img>");
const credits = $("<p class='credits'></p>");

// add overlay
overlay.append(img);
overlay.append(credits);
$(".gallery").append(overlay.hide());

overlay.hide();

// image clicked
$(".card").click(function() {
  let imgLocation = $(this).attr("src");
  $(".overlay img").attr("src", imgLocation);
  $(".overlay").fadeIn(400);

  let imgCredits = $(`p[name='${imgLocation}']`);
  $(".overlay p").text(`${imgCredits.text()}`);
});

// exit image clicking overlay
$(".overlay").click(function() {
  $(".overlay").fadeOut(400);
});

// prev button
prevBTN.click(function(e) {
  let currentImgSrc = $(".overlay img").attr("src");
  let currentImg = $(".card[src='" + currentImgSrc + "']");
  let newSrc = currentImg.prev().attr("src");

  img.attr("src", newSrc);

  e.stopPropagation();
});
// next button
nextBTN.click(function(e) {
  let currentImgSrc = $(".overlay img").attr("src");
  let currentImg = $(".card[src='" + currentImgSrc + "']");
  let newSrc = currentImg.next().attr("src");

  img.attr("src", newSrc);

  e.stopPropagation();
});

// exit button
exitBTN.click(function(e) {
  overlay.fadeOut(400);

  e.stopPropagation();
});



// Submit contact form:
function failure(input, text) {
  input.removeClass("success");
  input.addClass("failure");
  let small = $(`.${input.attr("id")}`);
  small.text(text);
}

function success(input) {
  input.removeClass("failure");
  input.addClass("success");
  let small = $(`.${input.attr("id")}`);
  small.text("");
}

// Inpur Required
function inputRequired(arr) {
  let required = false;
  arr.forEach(function(input) {
    if ($.trim(input.val()) === "") {
      failure(input, `El ${input.attr("id")} es necesario`);
    } else {
      success(input);
      required = true;
    }
  });
  return required;
}

// Email Validation
function emailValidation(input) {
  let required = false;
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.val().toLowerCase())) {
    success(input);
    required = true;
  } else {
    failure(input, "El email no es válido");
  }
  return required;
}

submit.click(function(e) {
  // e.preventDefault();
  inputRequired([name, email, message]);
  if (name.hasClass("success") && email.hasClass("success") && message.hasClass("success")) {
    if (emailValidation(email)) {
      return;
    }
  }
  e.preventDefault();
});
