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

   // 1. Cria um nó oscilador
            oscillator = audioContext.createOscillator();
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);

oscillator.frequency.setValueAtTime(document.getElementById("nota").value, audioContext.currentTime);
  
   // 3. Define o tipo de onda (senoide é a mais comum para tons puros)
            oscillator.type = 'sine'; // Outros tipos: 'square', 'sawtooth', 'triangle'

            // 4. Conecta o oscilador ao destino (seus alto-falantes)
            oscillator.connect(audioContext.destination);

            // 5. Inicia o oscilador
            oscillator.start();
});

document.getElementById('StopButton').addEventListener('click', () => {
  oscillator.stop();
  oscillator.disconnect();
   
});
