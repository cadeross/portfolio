// Create an object to store preloaded videos
const preloadedVideos = {};

document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.link-with-icon');
    const video = document.getElementById('hover-video');
    const videoSource = video.querySelector('source');
    const offset = 10; // Adjust offset as needed

    // Preload videos
    links.forEach(link => {
        const videoSrc = link.getAttribute('data-video');
        if (videoSrc && !preloadedVideos[videoSrc]) {
            const preloadVideo = document.createElement('video');
            preloadVideo.src = videoSrc;
            preloadVideo.preload = 'auto';
            preloadVideo.load();
            preloadedVideos[videoSrc] = preloadVideo;
        }
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const videoSrc = link.getAttribute('data-video');
            if (videoSrc) {
                if (preloadedVideos[videoSrc]) {
                    video.src = preloadedVideos[videoSrc].src;
                } else {
                    video.src = videoSrc;
                }
                video.style.display = 'block';
                video.play();
            } else {
                video.style.display = 'none';
            }
        });

        link.addEventListener('mouseleave', () => {
            video.style.display = 'none';
            video.pause();
            video.currentTime = 0;
        });

        link.addEventListener('mousemove', (e) => {
            const videoSrc = link.getAttribute('data-video');
            if (videoSrc) {
                let x = e.pageX + offset;
                let y = e.pageY + offset;
                const videoWidth = video.offsetWidth;
                const videoHeight = video.offsetHeight;
                const pageWidth = document.documentElement.clientWidth;
                const pageHeight = document.documentElement.clientHeight;

                if (x + videoWidth > pageWidth) {
                    x = e.pageX - videoWidth - offset;
                }
                if (y + videoHeight > pageHeight) {
                    y = e.pageY - videoHeight - offset;
                }
                video.style.left = `${x}px`;
                video.style.top = `${y}px`;
            }
        });
    });
});