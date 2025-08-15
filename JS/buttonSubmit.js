document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');
    const submitButton = document.querySelector('.button-confirm');

    if (form && submitButton) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Desabilitar o botão para evitar múltiplos envios
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            // Obter os dados do formulário
            const formData = new FormData(form);

            // Enviar o formulário via fetch
            fetch(form.action, {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (response.ok) {
                        // Mostrar mensagem de sucesso
                        alert('Formulário enviado com sucesso!');

                        // Limpar o formulário
                        form.reset();

                        // Redirecionar para a página inicial
                        window.location.href = '#home';

                        // Scroll suave para o topo
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
                    // Reabilitar o botão
                    submitButton.disabled = false;
                    submitButton.textContent = 'Enviar →';
                });
        });
    }
});