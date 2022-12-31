const crypto = require('crypto')

// 암호화에 사용할 키
const ENCRYPTION_KEY =
    process.env.ENCRYPTION_KEY || 'abcdefghijklmnop'.repeat(2) // Must be 256 bits (32 characters)
const IV_LENGTH = 16 // For AES, this is always 16


// 암호화 해주는 함수.
function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        Buffer.from(ENCRYPTION_KEY),
        iv,
    )
    const encrypted = cipher.update(text)

    return (
        iv.toString('hex') +
        ':' +
        Buffer.concat([encrypted, cipher.final()]).toString('hex')
    )
}


// 복호화 해주는 함수
function decrypt(text) {
    const textParts = text.split(':')
    const iv = Buffer.from(textParts.shift(), 'hex')
    const encryptedText = Buffer.from(textParts.join(':'), 'hex')
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(ENCRYPTION_KEY),
        iv,
    )
    const decrypted = decipher.update(encryptedText)

    return Buffer.concat([decrypted, decipher.final()]).toString()
}


console.log(encrypt("noggong"))
// -> 8b304ed7708a21f860a259c09e0f70f7%3Ac6e74360fc62ebfd246e158f4142b47d

console.log(decrypt("8b304ed7708a21f860a259c09e0f70f7%3Ac6e74360fc62ebfd246e158f4142b47d"))
// -> noggong