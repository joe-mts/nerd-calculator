document.addEventListener("click", function (e) {
    if (e.target.id === "shareBtn") {
        const checked = document.querySelectorAll('input[type="checkbox"]:checked');
        const container = document.getElementById("imageResult");
        container.innerHTML = `<h4>Nerd Calculator 🧠</h4><p class="fw-bold">Pontuação: ${totalScore} pontos</p>`;

        const answersByQuestion = {};

        checked.forEach(input => {
            const question = input.dataset.question;
            const name = input.dataset.name;

            if (!answersByQuestion[question]) {
                answersByQuestion[question] = [];
            }

            const points = input.dataset.points;
            answersByQuestion[question].push(`${name} (+${points} pts)`);
        });

        for (const question in answersByQuestion) {
            const block = document.createElement("div");
            block.innerHTML = `<strong>${question}</strong><ul>${answersByQuestion[question].map(r => `<li>${r}</li>`).join('')}</ul>`;
            container.appendChild(block);
        }

        const footer = document.createElement("div");
        footer.style.marginTop = "20px";
        footer.style.fontSize = "0.85rem";
        footer.style.color = "#555";
        footer.style.textAlign = "center";
        footer.innerHTML = "";
        container.appendChild(footer);

        container.style.display = 'block';

        html2canvas(container).then(canvas => {
            const link = document.createElement('a');
            link.download = "nerd_calculator.png";
            link.href = canvas.toDataURL("image/png");
            link.click();

            const toast = document.getElementById("toast");
            toast.style.display = 'block';
            setTimeout(() => toast.style.display = 'none', 3000);
        });
    }
});