document.addEventListener("DOMContentLoaded", function() {
    const translateBtn = document.getElementById("translate-btn");
    const songTitleInput = document.getElementById("song-title");
    const lyricsOutput = document.getElementById("lyrics-output");
    const delaySlider = document.getElementById("delay-slider");
    const delayValue = document.getElementById("delay-value");

    delaySlider.addEventListener("input", function() {
        delayValue.textContent = `${delaySlider.value}ms`;
    });

    translateBtn.addEventListener("click", function() {
        const songTitle = songTitleInput.value.trim().toLowerCase();
        if (songTitle === "") {
            lyricsOutput.textContent = "Please enter a song title.";
            return;
        }

        fetch("lyrics.json")
            .then(response => response.json())
            .then(data => {
                if (data[songTitle]) {
                    displayLyrics(data[songTitle]);
                } else {
                    lyricsOutput.textContent = "Lyrics not found.";
                }
            })
            .catch(error => console.error("Error fetching lyrics:", error));
    });

    function displayLyrics(lyrics) {
        lyricsOutput.textContent = "";
        let index = 0;

        function showNextLetter() {
            if (index < lyrics.length) {
                lyricsOutput.textContent += lyrics[index];
                index++;
                setTimeout(showNextLetter, parseInt(delaySlider.value));
            }
        }
        showNextLetter();
    }
});
