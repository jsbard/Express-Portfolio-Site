'use strict';

/**
 * Handle mobile menu functionality to hide/reveal sidebar on mobile layouts
 */
const body = document.querySelector('body');
const iframe = document.querySelector('.project-embed');
const menuIcon = document.getElementById("menu-icon");
const contactSidebarCloseBtn = document.querySelector(".close-contact-sidebar");
const contactSidebar = document.getElementById('contact-sidebar');
const socialButtons = document.querySelector(".contact.social-icons");
const socialSections = document.querySelectorAll(".social-info div");
let headerBtnClicked = false;
let contactToggleClicked = false;


/** Stop see-through loading icon in project iframe **/

if (iframe) {
  (() => iframe.onload = () => {
    iframe.style.background = "none";
  })();
}

/** Handle toggle event for right sidebar **/

if (contactSidebar) {
  document.querySelector('.contact-toggle').addEventListener('click', e => {
    if (!contactToggleClicked){
      contactSidebar.style.width = "300px";
      contactSidebar.style.padding = "20px";
      contactSidebarCloseBtn.style.display = "block";
    } else {
      contactSidebar.style.width = "0px";
      contactSidebar.style.padding = "0px";
      contactSidebarCloseBtn.style.display = "none";
    }
    return contactToggleClicked = !contactToggleClicked;
  });

  // Handle toggle events for social contact buttons
    const githubButton = document.querySelector(".contact.social-icons .icon-github");
    const linkedinButton = document.querySelector(".contact.social-icons .icon-linkedin");
    const twitterButton = document.querySelector(".contact.social-icons .icon-twitter");
    const github = document.querySelector(".social-info .github");
    const linkedin = document.querySelector(".social-info .linkedin");
    const twitter = document.querySelector(".social-info .twitter");

    socialButtons.addEventListener("click", (e) => {
      socialSections.forEach(section => {
        section.style.display = "none";
        section.style.maxHeight = "0";
      });

      if (e.target === githubButton){
        github.style.display = "block";
        github.style.maxHeight = "auto";
      }

      if (e.target === linkedinButton){
        linkedin.style.display = "block";
        linkedin.style.maxHeight = "auto";
      }

      if (e.target === twitterButton){
        twitter.style.display = "block";
        twitter.style.maxHeight = "auto";
      }
  });

    //Contact form client configurations
  const contactFormEmail = document.querySelector("#contact-form-email");
  contactFormEmail.addEventListener("submit", (e) => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/contact-email", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4){
        console.log("Nice!");
      }
    }
    xhr.send();
    // xhr.send(JSON.stringify({
    //   value: value
    // }));
  });
}

if (document.querySelector(".portfolio-intro")) {
  document.querySelector('.portfolio-intro').addEventListener('click', e => {
    if (headerBtnClicked) {
      menuIcon.classList.remove("icon-chevron-thin-left");
      menuIcon.style.borderTop = "2px solid #fefefe";
      menuIcon.style.borderBottom = "2px solid #fefefe";
      menuIcon.style.position = "relative";
      body.style.transform = 'translateX(0px)';
    }
    return headerBtnClicked = !headerBtnClicked;
  });
}

document.querySelector('#menu-icon').addEventListener('click', e => {

  if (headerBtnClicked) {
    menuIcon.style.borderTop = "0px";
    menuIcon.style.borderBottom = "0px";
    menuIcon.classList.add("icon-chevron-thin-left");
    menuIcon.style.position = "static";
    body.style.transform = 'translateX(300px)';
  } else {
    menuIcon.classList.remove("icon-chevron-thin-left");
    menuIcon.style.borderTop = "2px solid #fefefe";
    menuIcon.style.borderBottom = "2px solid #fefefe";
    menuIcon.style.position = "relative";
    body.style.transform = 'translateX(0px)';
  }
  return headerBtnClicked = !headerBtnClicked;
});
