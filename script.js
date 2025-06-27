let audioContext;
let oscillator;

document.getElementById('playButton').addEventListener('click', () => {

   if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }

 // Garante que o contexto esteja em estado 'running'
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }

            // Se já houver um oscilador tocando, para ele primeiro para evitar sobreposição
            if (oscillator) {
                oscillator.stop();
                oscillator.disconnect(); // Desconecta para liberar recursos
            }

   // 1. Cria um nó osoncilador
            oscillator = audioContext.createOscillator();
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);

oscillator.frequency.setValueAtTime(document.getElementById("nota").value, audioContext.currentTime);
  
   // 3. Define o tipo de onda (senoide é a mais comum para tons puros)
            oscillator.type = 'sine'; // Outros tipos: 'square', 'sawtooth', 'triangle'

         
       const gainNode = new GainNode(audioContext, { gain: 0.7 });

        // Connect both nodes to the speakers

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Now that everything is connected, starts the sound
        oscillator.start(0);

});

document.getElementById('StopButton').addEventListener('click', () => {
  oscillator.stop();
  oscillator.disconnect();
   
});
