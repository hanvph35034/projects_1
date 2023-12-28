import { message } from "antd"
const Message = (messageName: string, text: string) => {
    switch (messageName) {
        case 'success':
            return message.success(text)
        case 'error':
            return message.error(text)
        case 'warning':
            return message.warning(text)
        default:
            return message.info(text)

    }
}

export default Message