const form = document.getElementById("quizForm");

document.addEventListener('DOMContentLoaded', function () {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(el => new bootstrap.Tooltip(el));
});

questions.forEach((question, index) => {
    const div = document.createElement("div");
    div.className = `question ${index === 0 ? 'active' : ''} ${question.type === 'unica' ? 'unica' : ''}`;

    const h3 = document.createElement("h3");
    h3.textContent = question.title;
    h3.className = "title";

    const choiceType = document.createElement("span");
    choiceType.className = "badge badge-pill bg-danger text-white small-text";
    choiceType.textContent = question.type === 'unica' ? 'Única' : 'Múltiplas';

    h3.appendChild(choiceType);
    div.appendChild(h3)

    const progressWrapper = document.createElement("div");
    progressWrapper.className = "progress";
    progressWrapper.setAttribute("role", "progressbar");
    progressWrapper.setAttribute("aria-valuenow", 0);
    progressWrapper.setAttribute("aria-valuemin", 0);
    progressWrapper.setAttribute("aria-valuemax", 100);
    progressWrapper.style.marginTop = "25px";
    progressWrapper.style.marginBottom = "25px";
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar progress-bar-striped progress-bar-animated bg-primary";
    progressBar.style.width = "0%";
    progressWrapper.appendChild(progressBar);
    div.appendChild(progressWrapper);
    const formCheck = document.createElement("div");
    formCheck.className = "form-check text-start";

    question.options.forEach((option, i) => {
        const id = `${question.id}-${i}`;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input";
        checkbox.id = id;
        checkbox.dataset.points = option.score;
        checkbox.dataset.name = option.name;
        checkbox.dataset.question = question.title;

        const label = document.createElement("label");
        label.className = "form-check-label d-flex justify-content-between w-100 text";
        label.setAttribute("for", id);
        label.innerHTML = `<span>${option.name}
        <span class="points" style="visibility: hidden;">+${option.score}</span>
        <p class="text-muted" style="font-size: x-small">${option.example || ""}</p>`;

        formCheck.appendChild(checkbox);
        formCheck.appendChild(label);
    });

    div.appendChild(formCheck);

    const btnWrapper = document.createElement("span");
    btnWrapper.setAttribute('data-bs-toggle', 'tooltip');
    btnWrapper.setAttribute('data-bs-placement', 'top');
    btnWrapper.setAttribute('title', 'Selecione pelo menos uma opção para continuar');

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-primary mt-3 next text-white text";
    btn.textContent = "Próximo";
    btn.disabled = true;

    btnWrapper.appendChild(btn);
    div.appendChild(btnWrapper);

    form.appendChild(div);
});

const resultDiv = document.createElement("div");
resultDiv.className = "question result text";
resultDiv.innerHTML = `
    <p id="scoreDisplay" class="fw-bold fs-4"></p>
    <p id="message"></p>
    <button type="button" class="btn btn-success mb-2" id="shareBtn">Gerar Imagem</button><br>
  `;

form.appendChild(resultDiv);