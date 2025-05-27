const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

const videoList = [video1, video2, video3].filter(Boolean);

// Sidebar elements //
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon')


const hoverSigns = document.querySelectorAll('.hover-sign');

videoList.forEach((video, index) => {
  video.addEventListener('mouseover', () => {
    video.play();
    hoverSigns[index]?.classList.add('active');
  });
  video.addEventListener('mouseout', () => {
    video.pause();
    hoverSigns[index]?.classList.remove('active');
  });
});

// Sidebar elements //
menu.addEventListener("click", function(){
    sideBar.classList.remove("close-sidebar")
    sideBar.classList.add("open-sidebar")
});

closeIcon.addEventListener("click", function(){
    sideBar.classList.remove("open-sidebar");
    sideBar.classList.add("close-sidebar");
    
})