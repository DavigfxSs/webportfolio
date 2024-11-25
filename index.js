<form id="contactForm" action="/send-email" method="POST">
    <input type="text" name="clientname" id="clientname" placeholder="Seu Nome">
    <input type="email" name="clientmail" id="clientmail" placeholder="Seu Melhor E-mail">
    <button type="submit">Enviar</button>
</form>

<script>
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio tradicional do formulário
    
    const clientname = document.getElementById('clientname').value;
    const clientmail = document.getElementById('clientmail').value;

    // Verifica se ambos os campos foram preenchidos
    if (!clientname || !clientmail) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            clientname: clientname,
            clientmail: clientmail,
        }),
    })
    .then(response => response.text())
    .then(data => {
        if (data !== 'E-mail enviado com sucesso!') {
            alert(data);  // Mostra erro do servidor
        } else {
            alert('E-mail enviado com sucesso!');  // Sucesso no envio
        }
    })
    .catch(error => {
        alert('Erro ao enviar e-mail: ' + error);  // Mostra erro de rede
    });
});
</script>
