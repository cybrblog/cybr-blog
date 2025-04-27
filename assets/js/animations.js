$(document).ready(function () {

    // Function to animate counters
    function animateCounter($counter) {
        $counter.each(function () {
            const $this = $(this);
            const target = parseInt($this.text().replace(/,/g, ''), 10); // Remove commas
            $this.prop('Counter', 0).animate({
                Counter: target
            }, {
                duration: 4000,
                easing: 'swing',
                step: function (now) {
                    $this.text(Math.ceil(now).toLocaleString()); // Adds comma formatting
                }
            });
        });
    }

    // Using IntersectionObserver to animate only when visible
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const $section = $(entry.target);
                animateCounter($section.find('.counter'));
                obs.unobserve(entry.target); // Prevents re-triggering
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe the target section
    document.querySelectorAll('.who-we-are-section').forEach(section => {
        observer.observe(section);
    });

});
