let audioContext;
let oscillator;

audioContext = new AudioContext();


document.getElementById('playButton').addEventListener('click', () => {

  oscillator = audioContext.createOscillator();


  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);

oscillator.frequency.setValueAtTime(document.getElementById("nota").value, audioContext.currentTime);
  
  
oscillator.connect(audioContext.destination);

            // 5. Inicia o oscilador
            oscillator.start();
})

document.getElementById('StopButton').addEventListener('click', () => {
  oscillator.stop();
  oscillator.disconnect();
   
})
