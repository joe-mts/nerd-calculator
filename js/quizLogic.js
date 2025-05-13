let currentStep = 0;
let totalScore = 0;

const questionElements = document.getElementsByClassName("question");

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("next")) {
        const currentQuestion = questionElements[currentStep];
        const checkedInputs = currentQuestion.querySelectorAll('input[type="checkbox"]:checked');

        if (checkedInputs.length === 0) {
            const tooltip = bootstrap.Tooltip.getInstance(e.target) || new bootstrap.Tooltip(e.target);
            tooltip.show();

            setTimeout(() => {
                tooltip.hide();
            }, 2000);
            return;
        }

        currentQuestion.classList.remove("active");

        let nextStep = currentStep + 1;
        while (nextStep < questionElements.length - 1) {
            const question = questions[nextStep];
            if (question.dependsOn) {
                const dependentId = question.dependsOn;
                const dependentInputs = document.querySelectorAll(`input[id^="${dependentId}-"]:checked`);
                let points = 0;
                dependentInputs.forEach(input => points += parseInt(input.dataset.points));
                if (points === 0) {
                    nextStep++;
                    continue;
                }
            }
            break;
        }

        currentStep = nextStep;

        if (currentStep < questionElements.length - 1) {
            questionElements[currentStep].classList.add("active");
        } else {
            totalScore = 0;
            const checked = document.querySelectorAll('input[type="checkbox"]:checked');
            checked.forEach(input => {
                totalScore += parseInt(input.dataset.points);
            });

            questionElements[currentStep].classList.add("active");
            document.getElementById("scoreDisplay").textContent = `Sua pontuação: ${totalScore}`;
            document.getElementById("mainTitle").classList.add("d-none");
            document.getElementById("credits").classList.add("d-none");
            document.getElementById("resultTitle").classList.remove("d-none");

            let msg = '';
            if (totalScore <= 50) msg = 'Nível iniciante!';
            else if (totalScore <= 100) msg = 'Nível intermediário!';
            else msg = 'Nível avançado!';

            document.getElementById("message").textContent = msg;
        }
        const progressValue = (currentStep / (questionElements.length - 1)) * 100;
        const currentProgressBar = questionElements[currentStep].querySelector('.progress-bar');
        currentProgressBar.style.width = `${progressValue}%`;
        currentProgressBar.setAttribute('aria-valuenow', progressValue);
    }
});

document.addEventListener('change', function (e) {
    if (e.target.matches('.form-check-input')) {
        const currentInput = e.target;
        const label = currentInput.nextElementSibling;
        const span = label.querySelector('.points');
        if (span) span.style.visibility = currentInput.checked ? 'visible' : 'hidden';

        const allInputs = currentInput.closest('.question').querySelectorAll('.form-check-input');

        if (currentInput.closest('.question').classList.contains('unica')) {
            if (currentInput.checked) {
                allInputs.forEach(input => {
                    if (input !== currentInput) {
                        input.checked = false;
                        const lbl = input.nextElementSibling;
                        const sp = lbl?.querySelector('.points');
                        if (sp) sp.style.visibility = 'hidden';
                    }
                });
            }
        }
        const isZero = parseInt(currentInput.dataset.points) === 0;

        if (isZero && currentInput.checked) {
            allInputs.forEach(input => {
                if (input !== currentInput) {
                    input.checked = false;
                    const lbl = input.nextElementSibling;
                    const sp = lbl?.querySelector('.points');
                    if (sp) sp.style.visibility = 'hidden';
                }
            });
        } else {
            const zeroInput = [...allInputs].find(input => parseInt(input.dataset.points) === 0);
            if (zeroInput && zeroInput.checked) {
                zeroInput.checked = false;
                const lbl = zeroInput.nextElementSibling;
                const sp = lbl?.querySelector('.points');
                if (sp) sp.style.visibility = 'hidden';
            }
        }
    }
});

document.querySelectorAll('.question').forEach((question) => {
    const inputs = question.querySelectorAll('.form-check-input');
    const nextBtn = question.querySelector('.next');

    if (nextBtn) {
        nextBtn.disabled = true;
    }

    inputs.forEach(input => {
        input.addEventListener('change', () => {
            const checkedAny = [...inputs].some(i => i.checked);
            if (nextBtn) {
                nextBtn.disabled = !checkedAny;

                const wrapper = nextBtn.closest('span');
                const tooltipInstance = bootstrap.Tooltip.getInstance(wrapper);

                if (checkedAny && tooltipInstance) {
                    tooltipInstance.dispose();
                    wrapper.removeAttribute('data-bs-toggle');
                    wrapper.removeAttribute('title');
                }
            }
        });
    });
});