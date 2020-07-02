const kms = require('./kms')

const validate = hook => {
    try {
        return Promise.resolve(new URL(hook))
    } catch (e) {
        return Promise.reject(`${hook} is not a valid URL`)
    }
}

exports.hook = () => {
    const encrypted_hook = process.env.KMS_ENCRYPTED_SLACK_HOOK
    const hook = encrypted_hook
        ? kms.decrypt(encrypted_hook)
        : Promise.resolve(process.env.SLACK_HOOK)
    return hook.then(validate)
}

exports.name = () => process.env.NAME ? process.env.NAME : '𒀭𒊩𒌆𒋚'

exports.avatar_url = () => process.env.AVATAR_URL ? process.env.AVATAR_URL : 'https://raw.githubusercontent.com/artamonovkirill/ninshubur/master/ninshubur.jpg'