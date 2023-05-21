document.querySelector('.form__microphone-icon').addEventListener("click",voiceSearchModalOpen);
document.querySelector(".voice-search__close-modal").addEventListener("click",voiceSearchModalClose);
document.querySelector(".voice-search__microphone-border").addEventListener("click",voiceRecognition)
let microAceptado = false;

function voiceSearchModalOpen() {

	    document.querySelector(".voice-search").style.display = "flex";
	
		document.querySelector(".voice-search").style.animation = "aparecer 0.5s forwards";
	
		voiceRecognition();
}


function voiceSearchModalClose() {

	    document.querySelector(".voice-search").style.animation = "desaparecer 0.25s forwards";
	    
		setTimeout(() => {
	    
			document.querySelector(".voice-search").style.display = "none";
	    },250);
}

function voiceRecognition() {

	if (microAceptado == false) {

		window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
		
		if (!'SpeechRecognition' in window) {

			alert("que pena, no podes usar la API");
		}
	}

	document.querySelector(".voice-search__result-text").innerHTML = "Habla ahora";

    const recognition = new webkitSpeechRecognition();

	recognition.lang = 'es-ES';

	recognition.continuous = true;

    recognition.onresult = (event) => {

    	voiceText = event.results[0][0].transcript;
    
		document.querySelector(".voice-search__result-text").innerHTML = voiceText;
    
		recognition.stop();
    
		window.open("https://google.com/search?q="+voiceText);
	}
    
	recognition.start();
}