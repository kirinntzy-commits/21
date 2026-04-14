// ЖИ-ге сұраныс жіберу функциясы
async function sendMessage() {

    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const userText = input.value;

    if (userText === "") return;

    // Пайдаланушы хабарын көрсету
    chatBox.innerHTML += "<p><b>Сіз:</b> " + userText + "</p>";

    input.value = "";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_API_KEY"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "user", content: userText }
                ]
            })
        });

        const data = await response.json();

        const botReply = data.choices[0].message.content;

        // ЖИ жауабын көрсету
        chatBox.innerHTML += "<p><b>ЖИ:</b> " + botReply + "</p>";

    } catch (error) {
        chatBox.innerHTML += "<p style='color:red;'>Қате: API жұмыс істемеді</p>";
    }
}