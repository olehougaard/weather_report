export default window => {
    const document = window.document
    const table_body = document.getElementById('weather_data')
    const listeners = []

    const listen = l => listeners.push(l)

    const displayError = e => {
        const msg_board = document.getElementById('error_messages')
        msg_board.innerText = e
    }

    const prompt = window.prompt.bind(window)

    return { listen, prompt, displayError }
}