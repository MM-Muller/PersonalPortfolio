document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');
    const submitButton = document.querySelector('.button-confirm');

    if (form && submitButton) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (response.ok) {
                        alert('Formulário enviado com sucesso!');

                        form.reset();

                        window.location.href = '#home';

                        document.getElementById('home').scrollIntoView({
                            behavior: 'smooth'
                        });
                    } else {
                        throw new Error('Erro no envio do formulário');
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert('Erro ao enviar o formulário. Tente novamente.');
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Enviar';
                });
        });
    }
});