<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Frequência das Notas Musicais no Canvas</title>
    <!-- Inclui Tailwind CSS para estilização -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f0f4f8; /* Cor de fundo suave */
        }
        canvas {
            border: 2px solid #cbd5e1; /* Borda leve para o canvas */
            background-color: #ffffff; /* Fundo branco para o canvas */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave */
            border-radius: 0.75rem; /* Cantos arredondados */
            display: block; /* Garante que o canvas ocupa sua própria linha */
            margin: 2rem auto; /* Centraliza o canvas e adiciona margem */
        }
    </style>
</head>
<body class="flex flex-col items-center justify-center min-h-screen p-4">
    <div class="max-w-4xl w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 class="text-4xl font-bold text-gray-800 mb-6 text-center">Frequência das Notas Musicais</h1>
        <p class="text-lg text-gray-600 mb-8 text-center">Este canvas ilustra a frequência (em Hz) das notas musicais (apenas tons da escala maior de Dó) no eixo horizontal (x), começando da nota C3 e de 0 Hz.</p>

        <!-- O elemento Canvas onde as frequências serão desenhadas -->
        <canvas id="frequencyCanvas" width="1000" height="300"></canvas>

        <div class="mt-8 text-center text-gray-500 text-sm">
            <p>As notas são mapeadas linearmente ao longo da largura do canvas (1000px).</p>
            <p>As frequências exibidas são aproximadas e baseadas na temperamento igual.</p>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('frequencyCanvas');
            const ctx = canvas.getContext('2d');

            // Define todas as notas musicais e suas frequências aproximadas (em Hz)
            const allNotes = [
                { name: 'C3', frequency: 130.81 },
                { name: 'C#3/Db3', frequency: 138.59 },
                { name: 'D3', frequency: 146.83 },
                { name: 'D#3/Eb3', frequency: 155.56 },
                { name: 'E3', frequency: 164.81 },
                { name: 'F3', frequency: 174.61 },
                { name: 'F#3/Gb3', frequency: 185.00 },
                { name: 'G3', frequency: 196.00 },
                { name: 'G#3/Ab3', frequency: 207.65 },
                { name: 'A3', frequency: 220.00 },
                { name: 'A#3/Bb3', frequency: 233.08 },
                { name: 'B3', frequency: 246.94 },
                { name: 'C4', frequency: 261.63 },
                { name: 'C#4/Db4', frequency: 277.18 },
                { name: 'D4', frequency: 293.66 },
                { name: 'D#4/Eb4', frequency: 311.13 },
                { name: 'E4', frequency: 329.63 },
                { name: 'F4', frequency: 349.23 },
                { name: 'F#4/Gb4', frequency: 369.99 },
                { name: 'G4', frequency: 392.00 },
                { name: 'G#4/Ab4', frequency: 415.30 },
                { name: 'A4 (La 440 Hz)', frequency: 440.00 },
                { name: 'A#4/Bb4', frequency: 466.16 },
                { name: 'B4', frequency: 493.88 },
                { name: 'C5', frequency: 523.25 },
                { name: 'C#5/Db5', frequency: 554.37 },
                { name: 'D5', frequency: 587.33 },
                { name: 'D#5/Eb5', frequency: 622.25 },
                { name: 'E5', frequency: 659.25 },
                { name: 'F5', frequency: 698.46 },
                { name: 'F#5/Gb5', frequency: 739.99 },
                { name: 'G5', frequency: 783.99 },
                { name: 'G#5/Ab5', frequency: 830.61 },
                { name: 'A5', frequency: 880.00 },
                { name: 'A#5/Bb5', frequency: 932.33 },
                { name: 'B5', frequency: 987.77 },
                { name: 'C6', frequency: 1046.50 },
            ];

            // Define as notas da escala maior de Dó (sem sustenidos/bemóis)
            const cMajorScaleNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

            // Filtrar as notas para incluir apenas as 7 notas da escala maior de Dó a partir de C3
            const notes = allNotes.filter(note => {
                const noteLetter = note.name.charAt(0); // Obtém a letra da nota (C, D, E, F, G, A, B)
                const octave = parseInt(note.name.charAt(note.name.length - 1)); // Obtém a oitava

                // Verifica se a letra da nota está na escala maior de Dó
                // e se a oitava é maior que 3, ou se é a oitava 3 e a nota é C3 ou superior
                return cMajorScaleNotes.includes(noteLetter) &&
                       !note.name.includes('#') && !note.name.includes('b') &&
                       (octave > 3 || (octave === 3 && noteLetter === 'C')); // Começa em C3
            });


            // Encontra a frequência mínima como 0 para iniciar o eixo X em 0
            const minFrequency = 0;
            // A frequência máxima é a frequência mais alta das notas para o fim do eixo X
            const maxFrequency = notes[notes.length - 1].frequency;
            // O intervalo de frequência é agora da mínima (0) até a máxima
            const frequencyRange = maxFrequency - minFrequency;

            // Cores para as linhas das notas
            const noteLineColor = '#3b82f6'; // Azul primário
            const textColor = '#1f2937'; // Cinza escuro para texto

            // Desenha as frequências no canvas
            notes.forEach((note) => {
                // Calcula a posição x com base na frequência
                // Normaliza a frequência para o intervalo [0, 1] e escala para a largura do canvas
                const xPosition = ((note.frequency - minFrequency) / frequencyRange) * canvas.width;

                // Garante que a posição x esteja dentro dos limites do canvas
                const clampedXPosition = Math.max(0, Math.min(canvas.width - 1, xPosition));

                // Desenha uma linha vertical para a nota
                ctx.beginPath();
                ctx.moveTo(clampedXPosition, 0);
                ctx.lineTo(clampedXPosition, canvas.height);
                ctx.strokeStyle = noteLineColor;
                ctx.lineWidth = 1;
                ctx.stroke();

                // Adiciona o texto da nota e sua frequência
                ctx.fillStyle = textColor;
                ctx.font = '10px Inter'; // Tamanho e fonte do texto

                // Posiciona o texto da nota e frequência na parte superior
                ctx.fillText(note.name, clampedXPosition + 2, 15);
                ctx.fillText(`${note.frequency.toFixed(2)} Hz`, clampedXPosition + 2, 30);
            });

            // Adiciona rótulos aos extremos do eixo X
            ctx.fillStyle = '#ef4444'; // Cor para os rótulos de frequência extrema
            ctx.font = '12px Inter';
            // Agora o rótulo inicial é 0 Hz
            ctx.fillText(`${minFrequency.toFixed(2)} Hz (Início)`, 5, canvas.height - 10);
            ctx.textAlign = 'right';
            ctx.fillText(`${maxFrequency.toFixed(2)} Hz (Fim)`, canvas.width - 5, canvas.height - 10);
            ctx.textAlign = 'left'; // Redefine para o padrão
        });
    </script>
</body>
</html>
